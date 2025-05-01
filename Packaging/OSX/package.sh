#!/bin/bash -eu
set -euo pipefail

# --- Configuration ---
source ../../info.env # Assuming this defines NAME and VERSION

# Certificate Names (Ensure these exactly match Keychain Access)
APP_CERT_NAME="Developer ID Application: Oskar Schachtschneider (TAB2SW2F2U)"
INSTALLER_CERT_NAME="Developer ID Installer: Oskar Schachtschneider (TAB2SW2F2U)"

# Notarytool Keychain Profile Name
KEYCHAIN_PROFILE="dmdt-tilp-eubc-xqwb" # Use the PROFILE NAME you created with store-credentials

# --- Paths ---
SCRIPT_ROOT=$PWD
PROJECT_ROOT=$(cd "$SCRIPT_ROOT"/../.. && pwd)
BUILD_DIR="$PROJECT_ROOT/Binaries/Builds/MacOSX/build/Release"


# Temporary directories for packaging within script's CWD
TEMP_AU_DIR="$SCRIPT_ROOT/au"
TEMP_VST3_DIR="$SCRIPT_ROOT/vst3"
TEMP_PKG_DIR="$SCRIPT_ROOT/temp_pkg" # Dir to store intermediate component pkgs

# Paths to built plugins (Source)
SRC_COMPONENT_PATH="$BUILD_DIR/$NAME.component"
SRC_VST3_PATH="$BUILD_DIR/$NAME.vst3"

# Paths within temporary directories
TEMP_COMPONENT_PATH="$TEMP_AU_DIR/$NAME.component"
TEMP_VST3_PATH="$TEMP_VST3_DIR/$NAME.vst3"
# *** Paths to EXECUTABLES within temp dirs ***
TEMP_COMPONENT_EXEC_PATH="$TEMP_COMPONENT_PATH/Contents/MacOS/$NAME"
TEMP_VST3_EXEC_PATH="$TEMP_VST3_PATH/Contents/MacOS/$NAME"

# Intermediate/Output Package Names
COMPONENT_VST3_PKG="${NAME}_VST3.pkg"
COMPONENT_AU_PKG="${NAME}_AU.pkg"
UNSIGNED_PRODUCT_PKG="${NAME}_unsigned.pkg" # Intermediate unsigned product
FINAL_SIGNED_PKG="${NAME}_signed.pkg"      # Final signed/notarized product in script dir

# --- Cleanup Function ---
cleanup() {
  echo "Cleaning up temporary files and directories..."
  rm -f "$SCRIPT_ROOT/Info-VST3.plist"
  rm -f "$SCRIPT_ROOT/Info-AU.plist"
  rm -f "$TEMP_PKG_DIR/$COMPONENT_VST3_PKG"
  rm -f "$TEMP_PKG_DIR/$COMPONENT_AU_PKG"
  rm -f "$SCRIPT_ROOT/$UNSIGNED_PRODUCT_PKG"
  # Keep the FINAL_SIGNED_PKG
  rm -rf "$TEMP_AU_DIR"
  rm -rf "$TEMP_VST3_DIR"
  rm -rf "$TEMP_PKG_DIR"
  rm -rf "$SCRIPT_ROOT/expanded_pkg" # If verification step is added
}
# Trap errors and temporary exit to run cleanup
trap cleanup EXIT ERR INT TERM

# --- Preparation ---
echo "Preparing temporary directories..."
mkdir -p "$TEMP_AU_DIR"
mkdir -p "$TEMP_VST3_DIR"
mkdir -p "$TEMP_PKG_DIR"

echo "Copying plugins to temporary directories..."
cp -R "$SRC_COMPONENT_PATH" "$TEMP_AU_DIR/"
cp -R "$SRC_VST3_PATH" "$TEMP_VST3_DIR/"

# --- Sign Internal Binaries ---
echo "Signing VST3 executable: $TEMP_VST3_EXEC_PATH"
codesign --force --sign "$APP_CERT_NAME" --options runtime --timestamp "$TEMP_VST3_EXEC_PATH"
echo "VERIFYING VST3 signature..."
codesign --verify --deep --strict --verbose=4 "$TEMP_VST3_EXEC_PATH"
codesign -dv --verbose=4 "$TEMP_VST3_EXEC_PATH" # Display details
echo "VST3 Verification Complete."

echo "Signing AU executable: $TEMP_COMPONENT_EXEC_PATH"
codesign --force --sign "$APP_CERT_NAME" --options runtime --timestamp "$TEMP_COMPONENT_EXEC_PATH"
echo "VERIFYING AU signature..."
codesign --verify --deep --strict --verbose=4 "$TEMP_COMPONENT_EXEC_PATH"
codesign -dv --verbose=4 "$TEMP_COMPONENT_EXEC_PATH" # Display details
echo "AU Verification Complete."

# --- Build Component Packages ---
# It's generally better to analyze the original build product if structure is identical
# Analyzing the copied version should also work
echo "Analyzing component structures..."
pkgbuild --analyze --root "$TEMP_VST3_PATH/Contents" "$SCRIPT_ROOT/Info-VST3.plist"
pkgbuild --analyze --root "$TEMP_COMPONENT_PATH/Contents" "$SCRIPT_ROOT/Info-AU.plist"

echo "Building component packages..."
pkgbuild --root "$TEMP_VST3_DIR/" \
         --component-plist "$SCRIPT_ROOT/Info-VST3.plist" \
         --identifier "com.sinuslabs.pkg.VST3" \
         --version "$VERSION" \
         --install-location "/Library/Audio/Plug-Ins/VST3" \
         "$TEMP_PKG_DIR/$COMPONENT_VST3_PKG"

pkgbuild --root "$TEMP_AU_DIR/" \
         --component-plist "$SCRIPT_ROOT/Info-AU.plist" \
         --identifier "com.sinuslabs.pkg.AU" \
         --version "$VERSION" \
         --install-location "/Library/Audio/Plug-Ins/Components" \
         "$TEMP_PKG_DIR/$COMPONENT_AU_PKG"

# --- Build Unsigned Product Package ---
echo "Building final (unsigned) product package..."
productbuild --distribution "$SCRIPT_ROOT/Distribution.xml" \
             --package-path "$TEMP_PKG_DIR/" \
             --resources "$SCRIPT_ROOT/Resources" \
             "$SCRIPT_ROOT/$UNSIGNED_PRODUCT_PKG"

# --- Sign Final Product Package ---
echo "Signing final product package: $UNSIGNED_PRODUCT_PKG"
productsign --sign "$INSTALLER_CERT_NAME" \
            "$SCRIPT_ROOT/$UNSIGNED_PRODUCT_PKG" \
            "$SCRIPT_ROOT/$FINAL_SIGNED_PKG"

# --- Notarization ---
echo "Submitting $FINAL_SIGNED_PKG for notarization..."
NOTARY_OUTPUT=$(xcrun notarytool submit "$SCRIPT_ROOT/$FINAL_SIGNED_PKG" --keychain-profile "$KEYCHAIN_PROFILE" --wait)
echo "$NOTARY_OUTPUT"

# --- Stapling (Conditional) ---
if echo "$NOTARY_OUTPUT" | grep -q "status: Accepted"; then
    echo "Notarization successful. Stapling ticket..."
    xcrun stapler staple "$SCRIPT_ROOT/$FINAL_SIGNED_PKG"
    echo "Stapling complete."
else
    echo "Notarization failed or status is not 'Accepted'. Skipping stapling."
    SUBMISSION_ID=$(echo "$NOTARY_OUTPUT" | grep -oE 'id: [0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}' | awk '{print $2}')
    if [ -n "$SUBMISSION_ID" ]; then
        echo "To view details, run:"
        echo "xcrun notarytool log $SUBMISSION_ID --keychain-profile \"$KEYCHAIN_PROFILE\" developer_log.json"
    fi
    # Exit with an error code to indicate failure - cleanup will run via trap
    exit 1
fi

# --- Final Steps ---
echo "Moving final signed package to build directory..."
# Create build dir if it doesn't exist (though it should if plugins were there)
mkdir -p "$BUILD_DIR"
# Move the signed, notarized, stapled package
mv "$SCRIPT_ROOT/$FINAL_SIGNED_PKG" "$BUILD_DIR/$FINAL_SIGNED_PKG"

echo "Script finished successfully. Final package:"
echo "$BUILD_DIR/$FINAL_SIGNED_PKG"

# Cleanup will run automatically on successful exit via trap