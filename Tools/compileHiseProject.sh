#!/bin/bash

project_name="Reach"
project_dir="/Users/oskarsh/Documents/GitHub/Reach"
hise_source="/Users/oskarsh/Documents/GitHub/HISE"
hise_path=$hise_source"/projects/standalone/Builds/MacOSX/build/Release/HISE.app/Contents/MacOS/HISE"
projucer_path=$hise_source"/tools/projucer/Projucer.app/Contents/MacOS/Projucer"

output="/Users/oskarsh/Documents/Plugins/Reach/"
echo =========================================
echo =========================================
echo Build the binaries
echo =========================================

"$hise_path" set_hise_folder -p:"$hise_source"
"$hise_path" set_project_folder -p:"$project_dir"

chmod +x "$projucer_path"

echo =========================================
echo Clean Build Folder
echo =========================================
"$hise_path" clean -p:$project_dir --all


# echo =========================================
# echo Building the standalone app
# echo =========================================
# "$hise_path" export_ci "XmlPresetBackups/$project_name.xml" -t:standalone -p:""
# chmod +x "$project_dir/Binaries/batchCompileOSX"
# sh "$project_dir/Binaries/batchCompileOSX"


# echo =========================================
# echo Building VST2 plugin
# echo =========================================
# "$hise_path" export_ci "XmlPresetBackups/$project_name.xml" -t:instrument -p:VST2
# chmod +x "$project_dir/Binaries/batchCompileOSX"
# sh "$project_dir/Binaries/batchCompileOSX"

echo =========================================
echo Compiling Networks
echo =========================================
"$hise_path" compile_networks -c:Release

echo =========================================
echo Building VST3 plugin
echo =========================================
"$hise_path" export_ci "XmlPresetBackups/$project_name.xml" -t:instrument -p:VST3
chmod +x "$project_dir/Binaries/batchCompileOSX"
sh "$project_dir/Binaries/batchCompileOSX"

# echo =========================================
# echo Building AU plugin
# echo =========================================
# "$hise_path" export_ci "XmlPresetBackups/$project_name.xml" -t:instrument -p:AU
# chmod +x "$project_dir/Binaries/batchCompileOSX"
# sh "$project_dir/Binaries/batchCompileOSX"

# echo =========================================
# echo Building AAX plugin
# echo =========================================
# "$hise_path" export_ci "XmlPresetBackups/$project_name.xml" -t:instrument -p:AAX
# chmod +x "$project_dir/Binaries/batchCompileOSX"
# sh "$project_dir/Binaries/batchCompileOSX"

echo =========================================
echo Copy all compiled plugins and standalone app to the packaging plugin set_hise_folder
echo =========================================

# cp -R "$project_dir/Binaries/Compiled/$project_name.app" "$output/$project_name.app"
# cp -R "$project_dir/Binaries/Builds/MacOSX/build/Release/$project_name.vst" "$output/$project_name.vst"
cp -R "$project_dir/Binaries/Builds/MacOSX/build/Release/$project_name.vst3" "$output/$project_name.vst3"
# cp -R "$project_dir/Binaries/Builds/MacOSX/build/Release/$project_name.aaxplugin" "$output/$project_name.aaxplugin"
# cp -R "$project_dir/Binaries/Builds/MacOSX/build/Release/$project_name.component" "$output/$project_name.component"

# Notification
osascript -e 'display notification "Build process completed successfully!" with title "HISE Build Notification"'

echo "Build process completed!"
