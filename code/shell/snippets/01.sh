#!/bin/bash

# # 查看网关
route -n | sed -n '3'p | awk -F " " '{print $2}'
netstat -rn | sed -n '3'p | awk -F " " '{print $2}'
cat /etc/sysconfig/network-scripts/ifcfg-enp0s3 | sed -n '/GATEWAY/'p | awk -F "=" '{print $2}'
ip route show | sed -n '1'p | awk -F " " '{print $3}'
