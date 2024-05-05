source ../../info.env

script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)

zip -r "${NAME}-installer.zip" "${NAME}.vst3" "${NAME}-installer.sh" "${NAME}-license.txt" "LinuxBackground.jpg"

mv -R "${NAME}-installer.zip" "$project_root/build/Linux"