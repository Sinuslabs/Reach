source ../../info.env
source ../../.env

script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
OS="Linux"

# Confirm all required variables are set
if [ -z "$NAME" ] || [ -z "$VERSION" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ] || [ -z "$UPLOAD_LOCATION" ]; then
    echo "Error: One or more required variables are not set."
    exit 1
fi

echo "Uploading to Storage ..."
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${OS}/${NAME}-installer.zip" "${UPLOAD_LOCATION}/builds/${NAME}/${VERSION}/${NAME}-installer.zip"

# Clean up zip file
rm -rf "${project_root}/build/${OS}/${NAME}.zip"
