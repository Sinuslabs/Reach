#!/bin/bash -eu

# Start timing
start_time=$(date +%s)

source ../../info.env

project=$NAME
script_root=$PWD
projucer_path=~$HISE_PATH/tools/projucer/Projucer
project_root=$(cd "$script_root"/../.. && pwd)

output=$project_root/builds/OSX

echo $project_root

mkdir -p "$script_root"/build
cd "$script_root"/build

"$HISE_PATH" set_project_folder -p:"$project_root"
"$HISE_PATH" set_version -v:$VERSION

echo Making the Projucer accessible for this project
chmod +x "$projucer_path"

echo Building the plugins
"$HISE_PATH" clean -p:"$workspace" --all

"$hise_path" compile_networks -c:Release

"$HISE_PATH" export_ci XmlPresetBackups/$project.xml -t:instrument -p:VST3
//chmod +x "$workspace"/Binaries/batchCompileLinux.sh
//sh "$workspace"/Binaries/batchCompileLinux.sh

#!/bin/bash -eu

source ../../info.env

config="Release"
clean=true
build=true
copy=true
plugin_type=VST3
# deactivates link time optimisation. The resulting binary is not as optimized
# but the build time is much shorter
optimization=false

project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
projucer_path=~$HISE_PATH/tools/projucer/Projucer
hise=$HISE_PATH/projects/standalone/Builds/MacOSX/build/Release/HISE.app/Contents/MacOS/HISE
output=$project_root/build/

"$hise" set_hise_folder -p:"$HISE_PATH"
"$hise" set_project_folder -p:"$project_root"

# Cleaning old build files
if [[ "$clean" = true ]]; then
    echo "Cleaning the plugins"
    rm -rf "$project_root"/build
    mkdir -p "$project_root"/build
    rm -rf $project_root/Binaries
fi

# Building the plugins
if [[ "$build" = true ]]; then
    echo "Building the plugins"
    "$hise" set_hise_folder -p:"$HISE_PATH"
    "$hise" set_project_folder -p:"$project_root"

    echo "Making the Projucer accessible for this project"
    chmod +x "$projucer_path"

    "$hise" compile_networks -c:$config
    if [[ "$optimization" = true ]]; then
        "$hise" export_ci XmlPresetBackups/$project.xml -t:'effect' -p:"$plugin_type"
    else
        "$hise" export_ci XmlPresetBackups/$project.xml -t:'effect' -p:"$plugin_type" -nolto
    fi
    chmod +x "$project_root"/Binaries/batchCompileOSX
    sh "$project_root"/Binaries/batchCompileOSX
fi

# Copying built plugins to the output directory
if [[ "$copy" = true ]]; then
    echo "Copying built plugins to the output directory"
    cp -r "$project_root"/Binaries/Builds/MacOSX/build/Release/Reach.component "$output"
    cp -r "$project_root"/Binaries/Builds/MacOSX/build/Release/Reach.vst3 "$output"
fi

# Check for build success
if [[ $? -eq 0 ]]; then
    echo "Build succeeded."
else
    echo "Build failed."
    exit 1
fi

echo "Version: $VERSION"

