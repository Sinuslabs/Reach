#!/bin/bash -eu

#
# Description: Installs Sinuslabs Plugins
# Author: Oskar Schachtschneider - hello@sinuslabs.io
#

if [ "$BASH_VERSION" = '' ]; then
    echo "Please run the installer by using ./reach-installer.sh"
    ./reach-installer.sh
    exit
fi

cat << "EOF"

  #####  ### #     # #     #  #####  #          #    ######   #####
 #     #  #  ##    # #     # #     # #         # #   #     # #     #
 #        #  # #   # #     # #       #        #   #  #     # #
  #####   #  #  #  # #     #  #####  #       #     # ######   #####
       #  #  #   # # #     #       # #       ####### #     #       #
 #     #  #  #    ## #     # #     # #       #     # #     # #     #
  #####  ### #     #  #####   #####  ####### #     # ######   #####

EOF

HOME=eval echo ~$USER &>/dev/null
PLUGIN_NAME="Reach"
PLUGIN="Reach.vst3"
PLUGIN_SO=$PLUGIN_NAME/Contents/x86_64-linux/Reach.so
DEFAULT_PLUGIN_PATH=$HOME/.vst3/

# installs the plugin into the provided path
# if the path does not exist it prompts to create it
copy_file_with_confirmation() {
    local path=$1

    if [ ! -d "$path" ]; then
    read -p "Directory $path does not exist, create it? (y/n) " -n 1 -r
    echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mkdir -p "$path"
        else
            return
        fi
    fi

    cp -r "$PLUGIN" "$path"
    if [ $? -eq 0 ]; then
        echo "Sinuslabs data can be found unter $HOME/.config/Sinuslabs/ (created on first Plugin start)"
        echo
        echo "Successfully installed $PLUGIN into $path"
        echo
        echo SINUSLABS
        echo "from Berlin with <3"
        echo
    else
        echo
        echo "Error while installing $PLUGIN_NAME"
        echo
    fi
}

check_compatibility() {
    if ldd plugin.so 2>&1 | grep -q 'not found'; then
        echo "Missing required dependencies"
        exit 1
    fi
    if ! (ldconfig -p | grep -q 'libcurl.so.4'); then
        echo "Missing libcurl4. Install it using your package manager and rerun the installer."
        exit 1
    fi
}

choose_installation() {
    check_compatibility
    echo
    echo Please choose a installation method
    echo "Default -> $DEFAULT_PLUGIN_PATH"
    echo
    select option in Default Custom Quit; do
    case "$option" in
        "Default")
            echo
            echo
            copy_file_with_confirmation $DEFAULT_PLUGIN_PATH
            break ;;
        "Custom")
            echo
            read -p "Please enter a directory: " -i "$HOME/" -e custom_path
            echo
            copy_file_with_confirmation $custom_path
            break ;;
        "Quit") exit ;;
    esac
    done
}
cat license.txt
echo
echo
read -p "I have read and accept the terms and conditions? (y/n) " -n 1 -r
echo


if [[ $REPLY =~ ^[Yy]$ ]]; then
    choose_installation
else
    echo Exiting...
    exit
fi
