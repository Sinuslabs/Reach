source ../../info.env

script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
source_vst3="$project_root/Binaries/Builds/LinuxMakefile/build/${NAME}.vst3"

# Ensure files exist before zipping
if [ -d "$source_vst3" ] && [ -f "./Resources/installer.sh" ] && [ -f "./Resources/license.txt" ] && [ -f "./Resources/${NAME}.jpg" ]; then
    # Change directory to the parent directory of .vst3 to include only its contents
    cd "$(dirname "$source_vst3")" || exit

    # Create the zip file including only the contents of .vst3 folder
    zip -r "$script_root/${NAME}-installer.zip" "${NAME}.vst3" -i "${NAME}.vst3/*"

    # Change back to the script root directory
    cd "$script_root" || exit

    # Add other required files to the zip
    zip -j "${NAME}-installer.zip" "./Resources/license.txt" "./Resources/${NAME}.jpg"

    # Copy installer.sh to a temporary directory to set executable permissions
    mkdir -p temp
    cp "./Resources/installer.sh" temp/
    chmod +x temp/installer.sh

    # Add installer.sh from the temporary directory to the zip
    zip -j "${NAME}-installer.zip" "temp/installer.sh"

    # Remove the temporary directory
    rm -rf temp

    mv "${NAME}-installer.zip" "$project_root/build/Linux"
else
    echo "One or more files not found."
fi
