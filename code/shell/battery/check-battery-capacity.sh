#!/bin/bash

# ------- 检查电池容量并通知警告 ------- #

capacityFile=/sys/class/power_supply/BAT0/capacity
statusFile=/sys/class/power_supply/BAT0/status
nowCapacity=$(cat $capacityFile)
nowStatus=$(cat $statusFile)

# battery status
# # 01. Discharging
# # 02. Charging
# # 03. Full

if (($nowStatus == 'Discharging')); then

  # 提示用户
  if [ $nowCapacity -lt 50 ]; then
    notify-send "警告！" "当前电池电量为: $nowCapacity%，请及时插入充电器" -u critical
  fi

elif (($nowStatus == 'Charging' || $nowStatus == 'Full')); then
  # 清除定时器
  crontab -r
fi
