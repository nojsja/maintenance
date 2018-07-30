#!/bin/bash

# # Shadowsocks
cd /home/nojsja/Desktop/scripts/shadowsocks/
rm nohup.out -f
sudo sh ss-start.sh

# # Tim
# cd /home/nojsja/Desktop/software/QQ
# nohup ./TIM-x86_64.AppImage &

# # Wechat
cd /home/nojsja/software/wechat/electronic-wechat-linux-x64/
rm nohup.out -f
nohup ./electronic-wechat &

# # Battery check
statusFile=/sys/class/power_supply/BAT0/status
nowStatus=$(cat $statusFile)
if [[ $nowStatus == 'Discharging' ]]; then
  echo 'Warning! Discharging!!'
  crontab -u nojsja /home/nojsja/github/maintenance/code/shell/Desktop/scripts/battery/schedule
fi
