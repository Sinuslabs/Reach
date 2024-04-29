# TESTING USING PLUGINVAL

source ../../info.env

pluginval=/Applications/Pluginval.app/Contents/MacOS/Pluginval
project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
plugin_path_vst3=$project_root/build/MacOS/$NAME.vst3
plugin_path_au=$project_root/build/MacOS/$NAME.component
home_au_path=~/Library/Audio/Plug-ins/Components

# Log directory
log_dir="logs"
# rm -rf "$log_dir"
# mkdir -p "$log_dir"

# Command to run pluginval
echo "Starting plugin validation..."
$pluginval --validate "$plugin_path_vst3" --strictness-level 10 --output-dir "$log_dir" --verbose

# registering AU Component at system registry
 cp -r $plugin_path_au $home_au_path/$NAME.component
killall -9 AudioComponentRegistrar
$pluginval --validate "$home_au_path/$NAME.component" --strictness-level 9 --output-dir "$log_dir" --verbose

# Check for success or failure
if [ $? -eq 0 ]; then
    echo "Plugin validation succeeded."
else
    echo "Plugin validation failed."
    exit 1
fi