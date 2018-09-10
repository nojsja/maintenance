#!/bin/bash

sudo cp /usr/share/gnome-shell/theme/ubuntu.css /usr/share/gnome-shell/theme/ubuntu.bak
sleep 2
sudo cp ~/Downloads/stwaskpass/ubuntu.css /usr/share/gnome-shell/theme/
cp ~/Downloads/stwaskpass/SetAsWallpaper ~/.local/share/nautilus/scripts/
sudo chmod +x ~/.local/share/nautilus/scripts/SetAsWallpaper
sleep 2
rm -rf ~/.cache/wallpaper/*
cp -af ~/Downloads/stwaskpass/.fonts ~/
killall nautilus

exit
