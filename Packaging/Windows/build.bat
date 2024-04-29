@echo on

set project=Reach
set xmlFile=Reach
set workspace=C:\Users\iso\Documents\GitHub\Reach

set build_standalone=0
set build_plugin=0
set build_installer=1
set clean_project=0

set hise_source=C:\Users\iso\Documents\GitHub\HISE
set hise_path="C:\Users\iso\Documents\GitHub\HISE\projects\standalone\Builds\VisualStudio2022\x64\Release with Faust\App\HISE.exe"
set installer="C:\Program Files (x86)\Inno Setup 6\ISCC.exe"

:BuildProject
REM  ====================================================================================

%hise_path% set_hise_folder -p:%hise_source%
%hise_path% set_project_folder -p:%workspace%

echo Changing directory
cd /d %workspace%

if %clean_project%==1 (
	echo Cleaning project
	%hise_path% clean -p:%workspace% --all
)

if %build_plugin%==1 (
	echo Exporting %plugin_name% Plugins
	%hise_path% export_ci XmlPresetBackups/%xmlFile%.xml -t:effect -p:VST -a:x86x64
	call %workspace%/Binaries/batchCompile.bat
)

:CopyFiles
echo Copying files
REM  ====================================================================================

md build

xcopy /E /Y "Binaries\Compiled\*.*" build\

del /S "build\*.lib"
del /S "build\*.exp"

:BuildInstaller
echo Building installer
REM  ====================================================================================

if %build_installer%==1 (
 	%installer% C:\Users\iso\Documents\GitHub\Reach\Installer\Windows\WinInstaller.iss
	echo Cleanup
    pause
)

:end