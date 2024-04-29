#!/bin/bash -eu

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


