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

# Zipping plugins
echo "Zipping Plugins ..."
zip -r "${project_root}/build/${OS}/${NAME}.zip" "${project_root}/build/${OS}/${NAME}.vst3" "${project_root}/build/${OS}/${NAME}.component"

echo "Uploading to Storage ..."
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${OS}/${NAME}.pkg" "${UPLOAD_LOCATION}/builds/${NAME}/${VERSION}/${NAME}.pkg"
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${OS}/${NAME}.zip" "${UPLOAD_LOCATION}/builds//${NAME}/${VERSION}/${NAME}_${VERSION}_${OS}.zip"

# Clean up zip file
rm -rf "${project_root}/build/${OS}/${NAME}.zip"