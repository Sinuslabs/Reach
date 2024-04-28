# GNU BUILD SCRIPT

project=Reach
version=1.5
xmlFile=Reach
workspace=~/Development/Reach

build_plugin=1
build_installer=1

hise_path=~/Development/HISE/projects/standalone/Builds/LinuxMakefile/build/HISE\ Standalone
projucer_path=~/Development/HISE/tools/projucer/Projucer

#Create temp directory for packaging
output="$workspace"/Packaging/Linux/temp
mkdir -p "$package"

mkdir -p "$workspace"/Binaries
cd "$workspace"/Binaries

# STEP 1: BUILDING THE BINARIES
# ====================================================================
if (($build_plugin == 1))
then

  "$hise_path" set_project_folder -p:"$workspace"
  "$hise_path" set_version -v:$version

  echo Making the Projucer accessible for this project
  chmod +x "$projucer_path"

  echo Building the plugins
  "$hise_path" clean -p:"$workspace" --all
  "$hise_path" export_ci XmlPresetBackups/$xmlFile.xml -t:instrument -p:VST -a:x64
  chmod +x "$workspace"/Binaries/batchCompileLinux.sh
  sh "$workspace"/Binaries/batchCompileLinux.sh
  cp "$workspace"/Binaries/Builds/LinuxMakefile/build/"$project".so "$output"
fi

# STEP 2: BUILDING INSTALLER
# ====================================================================

if (($build_installer==1))
then
  echo "Build Installer"

  ./reach-installer.sh

else
  echo "Skip Building Installer"
fi

echo Cleanup
cd "$workspace"
rm -rf "$workspace"/Packaging/GNU/temp
