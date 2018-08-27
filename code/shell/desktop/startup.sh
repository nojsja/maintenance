#!/bin/bash
#add for chkconfig
#chkconfig:23456 80 40
#description: nojsja-startup-scripts

start() {
  # # Shadowsocks
  shadowPath=/home/nojsja/Desktop/scripts/shadowsocks
  shadowConfig=$shadowPath/shadowsocks.json

  rm $shadowPath/nohup.out -f
  bash $shadowPath/ss-start.sh $shadowConfig

  # # Battery check
  statusFile=/sys/class/power_supply/BAT0/status
  nowStatus=$(cat $statusFile)
  if [[ $nowStatus == 'Discharging' ]]; then
    echo 'Warning! Discharging!!'
    crontab -u nojsja /home/nojsja/Desktop/scripts/battery/schedule
  fi
}

stop() {
  for pid in `pgrep sslocal`; do
    kill $pid
  done
}

restart() {
  stop
  start
}

case $1 in

  start )
    start
  ;;

  stop )
    stop
  ;;

  restart )
    restart
  ;;

esac
