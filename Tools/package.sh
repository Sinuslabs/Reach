name="REACH"
version="1.6.0"

mkdir au/
cp -R "/Library/Audio/Plug-Ins/Components/${name}.component" au

mkdir vst3/
cp -R "/Library/Audio/Plug-Ins/VST3/${name}.vst3" vst3

pkgbuild --analyze --root "./vst3/" "${name}_VST3.plist" \

pkgbuild --analyze --root "./au/" "${name}_AU.plist" \

pkgbuild --root "./vst/" --component-plist "./${name}_VST.plist" --identifier "com.audiodamage.pkg.VST" --version $version --install-location "/Library/Audio/Plug-Ins/VST/Audio Damage" "${name}_VST.pkg"

pkgbuild --root "./vst3/" --component-plist "./${name}_VST3.plist" --identifier "com.audiodamage.pkg.VST3" --version $version --install-location "/Library/Audio/Plug-Ins/VST3" "${name}_VST3.pkg"

pkgbuild --root "./au/" --component-plist "./${name}_AU.plist" --identifier "com.audiodamage.pkg.AU" --version $version --install-location "/Library/Audio/Plug-Ins/Components" "${name}_AU.pkg"

pkgbuild --root "./aax/" --component-plist "./${name}_AAX.plist" --identifier "com.audiodamage.pkg.AAX" --version $version --install-location "/Library/Application Support/Avid/Audio/Plug-Ins" "${name}_AAX.pkg"

productbuild --distribution "./Distribution.xml" --package-path "./" --resources "./Resources" --sign "Developer ID Installer: Audio Damage, Inc." "OSX_${name}_${version}.pkg"

rm "${name}_VST.plist"
rm "${name}_VST3.plist"
rm "${name}_AU.plist"
rm "${name}_AAX.plist"
rm "${name}_VST.pkg"
rm "${name}_VST3.pkg"
rm "${name}_AU.pkg"
rm "${name}_AAX.pkg"
rm -r "./aax"
rm -r "./vst"
rm -r "./vst3"
rm -r "./au"