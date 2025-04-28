#!/bin/bash -eu

# Use -e: exit immediately if a command exits with a non-zero status.
# Use -u: Treat unset variables as an error when substituting.
# Use -o pipefail: the return value of a pipeline is the status of
#                 the last command to exit with a non-zero status,
#                 or zero if no command exited with a non-zero status.
set -euo pipefail

source ../../info.env

project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)

# --- CONFIGURATION ---
# Developer ID Application certificate (for signing code)
APP_CERT_NAME="Developer ID Application: Oskar Schachtschneider (TAB2SW2F2U)"
# Developer ID Installer certificate (for signing PKG)
INSTALLER_CERT_NAME="Developer ID Installer: Oskar Schachtschneider (TAB2SW2F2U)"
# Keychain profile name for notarytool credentials
KEYCHAIN_PROFILE="dmdt-tilp-eubc-xqwb" # Make sure this is the PROFILE NAME, not the password itself

# --- PATHS ---
BUILD_DIR="$project_root/build/MacOS"
# *** IMPORTANT: Target the EXECUTABLE inside the bundle ***
VST3_EXEC_PATH="$BUILD_DIR/${NAME}.vst3/Contents/MacOS/${NAME}"
AU_EXEC_PATH="$BUILD_DIR/${NAME}.component/Contents/MacOS/${NAME}"
# Input PKG (assuming it's already built before this script runs)
INPUT_PKG_PATH="$BUILD_DIR/$NAME.pkg"
# Output signed PKG
SIGNED_PKG_PATH="$script_root/${NAME}_signed.pkg" # Save signed pkg in script dir

# --- SIGNING CODE ---
echo "Signing VST3 executable: $VST3_EXEC_PATH"
codesign --force --sign "$APP_CERT_NAME" --options runtime --timestamp "$VST3_EXEC_PATH"

echo "Signing AU executable: $AU_EXEC_PATH"
codesign --force --sign "$APP_CERT_NAME" --options runtime --timestamp "$AU_EXEC_PATH"

# --- SIGNING INSTALLER ---
echo "Signing .pkg package: $INPUT_PKG_PATH"
productsign --sign "$INSTALLER_CERT_NAME" "$INPUT_PKG_PATH" "$SIGNED_PKG_PATH"

# --- NOTARIZATION ---
echo "Submitting $SIGNED_PKG_PATH for notarization..."
# Use a variable to capture the output, including the Submission ID
NOTARY_OUTPUT=$(xcrun notarytool submit "$SIGNED_PKG_PATH" --keychain-profile "$KEYCHAIN_PROFILE" --wait)

echo "$NOTARY_OUTPUT"

# Check if notarization was successful before stapling
if echo "$NOTARY_OUTPUT" | grep -q "status: Accepted"; then
    echo "Notarization successful. Stapling ticket..."
    xcrun stapler staple "$SIGNED_PKG_PATH"
    echo "Stapling complete."
else
    echo "Notarization failed or status is not 'Accepted'. Skipping stapling."
    # **IMPORTANT**: Get the log for the failed submission ID
    SUBMISSION_ID=$(echo "$NOTARY_OUTPUT" | grep -oE 'id: [0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}' | awk '{print $2}')
    if [ -n "$SUBMISSION_ID" ]; then
        echo "To view details, run:"
        echo "xcrun notarytool log $SUBMISSION_ID --keychain-profile \"$KEYCHAIN_PROFILE\" developer_log.json"
    fi
    # Exit with an error code to indicate failure
    exit 1
fi

echo "Script finished successfully."