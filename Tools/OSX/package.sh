name="REACH"
version="1.6.0"

mkdir au/
cp -R "/Library/Audio/Plug-Ins/Components/${name}.component" au

mkdir vst3/
cp -R "/Library/Audio/Plug-Ins/VST3/${name}.vst3" vst3

pkgbuild --analyze --root "../Binaries/Builds/MacOSX" "./Info-VST3.plist" \

pkgbuild --analyze --root "../Binaries/Builds/MacOSX" "./Info-AU.plist" \

pkgbuild --root "./vst3/" --component-plist "./Info-VST3.plist" --identifier "com.sinuslabs.pkg.VST3" --version $version --install-location "/Library/Audio/Plug-Ins/VST3" "${name}_VST3.pkg"

pkgbuild --root "./au/" --component-plist "./Info-AU.plist" --identifier "com.sinuslabs.pkg.AU" --version $version --install-location "/Library/Audio/Plug-Ins/Components" "${name}_AU.pkg"

productbuild --distribution "./Distribution.xml" --package-path "./" --resources "./Resources" --sign "Developer ID Installer: Audio Damage, Inc." "OSX_${name}_${version}.pkg"

rm "${name}_VST3.plist"
rm "${name}_AU.plist"
rm "${name}_VST3.pkg"
rm "${name}_AU.pkg"
rm -r "./vst3"
rm -r "./au"