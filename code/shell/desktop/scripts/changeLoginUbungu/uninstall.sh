#!/bin/bash

sudo rm -rf /usr/share/gnome-shell/theme/ubuntu.css
sleep 3
sudo mv /usr/share/gnome-shell/theme/ubuntu.bak /usr/share/gnome-shell/theme/ubuntu.css
killall nautilus
exit
