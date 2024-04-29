#!/bin/bash -eu

# Start total execution time measurement with nanosecond precision
overall_start=$(date +%s.%N)

source ../../info.env

config="Release"
optimization=false
clean=false
build=true
copy=true
# ('VST'  | 'AU'   | 'VST_AU' | 'AAX' |)
# 'ALL'  | 'VST2' | 'VST3'   | 'VST23AU')
plugin_type=VST_AU
project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
projucer_path=~$HISE_PATH/tools/projucer/Projucer
hise=$HISE_PATH/projects/standalone/Builds/MacOSX/build/Release/HISE.app/Contents/MacOS/HISE
output=$project_root/build/MacOS/
source_component="$project_root/Binaries/Builds/MacOSX/build/Release/Reach.component"
source_vst3="$project_root/Binaries/Builds/MacOSX/build/Release/Reach.vst3"

echo "Project root: $project_root"

# Cleaning old build files
if [[ "$clean" = true ]]; then
    echo "Starting clean action..."
    rm -rf "$project_root"/build
    mkdir -p "$project_root"/build
    rm -rf $project_root/Binaries
fi

# Building the plugins
if [[ "$build" = true ]]; then
    echo "Starting plugin build..."
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
        echo "Copying built plugins to the output directory..."

    # Check and copy the .component file if it exists
    if [ -d "$source_component" ]; then
        echo "Copying Reach.component to $output..."
        cp -r "$source_component" "$output"
    else
        echo "Reach.component not found, skipping copy."
    fi

    # Check and copy the .vst3 file if it exists
    if [ -d "$source_vst3" ]; then
        echo "Copying Reach.vst3 to $output..."
        cp -r "$source_vst3" "$output"
    else
        echo "Reach.vst3 not found, skipping copy."
    fi
fi

# Check for build success
if [[ $? -eq 0 ]]; then
    echo "Build succeeded."
else
    echo "Build failed."
    exit 1
fi

echo "Version: $VERSION"

# End total execution time measurement and print
# End total execution time measurement
overall_end=$(date +%s.%N)

# Calculate the duration in seconds with millisecond precision
duration=$(echo "$overall_end - $overall_start" | bc)
echo "Total execution time: $duration s."
