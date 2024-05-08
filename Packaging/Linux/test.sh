# TESTING USING PLUGINVAL

source ../../info.env

echo Configure pluginval path

exit 1

pluginval=
project=$NAME
script_root=$PWD
project_root=$(cd "$script_root"/../.. && pwd)
plugin_path_vst3=$project_root/build/Linux/$NAME.vst3

# Log directory
log_dir="logs"
rm -rf "$log_dir"
mkdir -p "$log_dir"

# Command to run pluginval
echo "Starting plugin validation..."
$pluginval --validate "$plugin_path_vst3" --strictness-level 8 --output-dir "$log_dir" --verbose

# Check for success or failure
if [ $? -eq 0 ]; then
    echo "Plugin validation succeeded."
else
    echo "Plugin validation failed."
    exit 1
fi