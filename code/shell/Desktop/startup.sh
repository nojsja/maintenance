#!/bin/bash

# Shadowsocks
cd /home/nojsja/Desktop/scripts/shadowsocks/
sudo sh ss-start.sh

# Tim
# cd /home/nojsja/Desktop/software/QQ
# nohup ./TIM-x86_64.AppImage &

# Wechat
cd /home/nojsja/software/wechat/electronic-wechat-linux-x64/
nohup ./electronic-wechat &

# battery check
statusFile=/sys/class/power_supply/BAT0/status
nowStatus=$(cat $statusFile)
if [[ $nowStatus == 'Discharging' ]]; then
  echo 'Warning! Discharging!!'
  crontab -u nojsja /home/nojsja/Desktop/scripts/battery/schedule
fi
