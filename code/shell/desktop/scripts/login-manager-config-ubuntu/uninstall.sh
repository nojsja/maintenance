#!/bin/bash

whoami=`whoami`

sudo rm -rf /usr/share/gnome-shell/theme/ubuntu.css
sudo rm /home/$whoami/.local/share/nautilus/scripts/SetAsWallpaper

sleep 1

sudo cp /usr/share/gnome-shell/theme/ubuntu.css-bak-origin /usr/share/gnome-shell/theme/ubuntu.css

# killall nautilus

echo
echo ">>> ubuntu login manager restored! bye ~ "
echo

exit
