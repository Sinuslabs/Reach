#!/bin/bash -eu

source ../../info.env

project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
projucer_path=~$HISE_PATH/tools/projucer/Projucer
hise=$HISE_PATH/projects/standalone/Builds/MacOSX/build/Release/HISE.app/Contents/MacOS/HISE
output=$project_root/build/

config="Release"

clean=false
build=false
copy=true

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
    "$hise" export_ci XmlPresetBackups/$project.xml -t:instrument -p:VST_AU

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
