#!/bin/bash

PLUGIN_NAME="Reach.so"

echo "Please enter the location to install the plugin file."
read plugin_path

until [ -d "$plugin_path" ]; do
    echo "The entered path does not exist. Please enter a different path."
    read plugin_path
done

cp -i "$PLUGIN_NAME" "$plugin_path"

echo "The software installation is complete. Please launch the plugin or standalone version and click Install Samples when prompted to install the instrument samples."
