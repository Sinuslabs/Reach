source ../../info.env
source ../../.env

project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)

# Confirm all required variables are set
if [ -z "$NAME" ] || [ -z "$VERSION" ] || [ -z "$USERNAME" ] || [ -z "$PASSWORD" ] || [ -z "$UPLOAD_LOCATION" ]; then
    echo "Error: One or more required variables are not set."
    exit 1
fi

echo ${project_root}/build/Reach.vst3

# Zipping plugins
echo "Zipping Plugins ..."
zip -r "${project_root}/build/${NAME}.zip" "${project_root}/build/${NAME}.vst3" "${project_root}/build/${NAME}.component"

echo "Uploading to Storage ..."
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${NAME}_${VERSION}.pkg" "${UPLOAD_LOCATION}/builds/${NAME}/${NAME}_${VERSION}.pkg"
curl --progress-bar -k -u "${USERNAME}:${PASSWORD}" -T "${project_root}/build/${NAME}.zip" "${UPLOAD_LOCATION}/builds/${NAME}/${NAME}_${VERSION}.zip"

# Clean up zip file
rm -rf "${project_root}/build/${NAME}.zip"