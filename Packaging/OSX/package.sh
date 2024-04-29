#!/bin/bash -eu

source ../../info.env

script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)

mkdir au/
cp -R "$project_root/build/$NAME.component" au

mkdir vst3/
cp -R "$project_root/build/$NAME.vst3" vst3

pkgbuild --analyze --root "$project_root/build/$NAME.vst3/Contents" "./Info-VST3.plist"

pkgbuild --analyze --root "$project_root/build/$NAME.component/Contents" "./Info-AU.plist"

pkgbuild --root "./vst3/" --component-plist "./Info-VST3.plist" --identifier "com.sinuslabs.pkg.VST3" --version $VERSION --install-location "/Library/Audio/Plug-Ins/VST3" "${NAME}_VST3.pkg"

pkgbuild --root "./au/" --component-plist "./Info-AU.plist" --identifier "com.sinuslabs.pkg.AU" --version $VERSION --install-location "/Library/Audio/Plug-Ins/Components" "${NAME}_AU.pkg"

productbuild --distribution "./Distribution.xml" --package-path "./" --resources "./Resources"  "${NAME}_${VERSION}.pkg"

# --sign "Developer ID Installer: Sinuslabs, OÄ."

rm "Info-VST3.plist"
rm "Info-AU.plist"
rm "${NAME}_VST3.pkg"
rm "${NAME}_AU.pkg"
rm -r "./vst3"
rm -r "./au"

mv "${NAME}_${VERSION}.pkg" "$project_root/build"