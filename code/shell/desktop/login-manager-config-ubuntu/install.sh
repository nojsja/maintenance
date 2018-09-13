#!/bin/bash

location=`pwd`
whoami=`whoami`

# tar x
tar -xf $location/source.tar -C $location

# backup
if [ ! -f /usr/share/gnome-shell/theme/ubuntu.css-bak ]; then
    sudo cp /usr/share/gnome-shell/theme/ubuntu.css /usr/share/gnome-shell/theme/ubuntu.css-bak-origin
fi
sudo cp /usr/share/gnome-shell/theme/ubuntu.css /usr/share/gnome-shell/theme/ubuntu.css-bak

sleep 1

# replace
sudo cp $location/ubuntu.css /usr/share/gnome-shell/theme/
cp $location/SetAsWallpaper /home/$whoami/.local/share/nautilus/scripts/
sudo chmod +x /home/$whoami/.local/share/nautilus/scripts/SetAsWallpaper

sleep 1

# clean
rm -rf /home/$whoami/.cache/wallpaper/*
cp -af $location/.fonts /home/$whoami
rm -rf $location/.fonts -rf
rm -rf $location/ubuntu.css

# killall nautilus

echo
echo ">>> ubuntu login manager config done! enjoy ~ "
echo

exit
