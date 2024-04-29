source ../../info.env
source ../../.env

project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
OS="MacOS"

# Confirm all required variables are set
if [ -z "$NAME" ] || [ -z "$VERSION" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ] || [ -z "$UPLOAD_LOCATION" ]; then
    echo "Error: One or more required variables are not set."
    exit 1
fi

echo "Zipping Plugins ..."
# Change directory to the specific OS build directory
cd "${project_root}/build/${OS}"
# Zip the files from the current directory
zip -r "${NAME}.zip" "${NAME}.vst3" "${NAME}.component"
# Move the zip file to a desired location if necessary
mv "${NAME}.zip" "${project_root}/build/${OS}/"
# Return to the original script directory or any other needed directory
cd -

echo "Uploading to Storage ..."
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${OS}/${NAME}.pkg" "${UPLOAD_LOCATION}/builds/${NAME}/${VERSION}/${NAME}.pkg"
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${OS}/${NAME}.zip" "${UPLOAD_LOCATION}/builds//${NAME}/${VERSION}/${NAME}_${VERSION}_${OS}.zip"

# Clean up zip file
rm -rf "${project_root}/build/${OS}/${NAME}.zip"