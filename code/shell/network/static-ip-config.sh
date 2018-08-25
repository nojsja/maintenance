#!/bin/bash
# # using   => bash static-ip-config.sh -g [gateway] -s [segment]
# # example => bash static-ip-config.sh -g 10.0.6.1 -s 251
# # result  => ipaddr:10.0.6.251

# # 格式化参数
# set -- $(getopt -q g:s: "$@")

basic='.233'  # 默认设置的ip地址
gateway=`route -n | sed -n '3'p | awk -F " " '{print $2}'`  # 默认获取所在网关

# # 获取所有传入参数
while [ -n "$1" ]; do
  case $1 in
    -g )
      gateway=$2
      shift
    ;;
    -s )
      echo $2
      basic=.`expr $2 + 0`
      shift
    ;;
    -- )
      shift
      break
    ;;
  esac
  shift
done

# # 网络变换时自动根据网关配置
# (! test -z $2) && basic=".$2" || basic='.233' # 替换的地址

# 修改配置文件
#  param1 ipaddr  => 完整的静态ip地址
#  param2 gateway => 完整网关
#  param3 netmask => 子网掩码
#  param3 dns1    => 主dns
#  param4 path    => 要更改的脚本路径
function configNetwork() {
  ipaddr=$1; gateway=$2; netmask=$3; dns1=$4; path=$5

  sed -i '/defined configure/'d $path
  echo "# # defined configure --------" >> $path
  sed -i '/GATEWAY/'d $path ; echo "GATEWAY=$gateway" >> $path
  sed -i '/DNS1/'d $path ; echo "DNS1=$dns1" >> $path
  sed -i '/IPADDR/'d $path ; echo "IPADDR=$ipaddr" >> $path
  sed -i '/NETMASK/'d $path ; echo "NETMASK=$netmask" >> $path
  sed -i '/BOOTPROTO/'d $path ; echo "BOOTPROTO=static" >> $path
  sed -i '/ONBOOT/'d $path ; echo "ONBOOT=yes" >> $path
}

dns1='119.29.29.29'  # 主dns设置
netmask='255.255.255.0'  # 子网掩码
ipaddr=`echo $gateway | awk -v b=$basic -F '.' '{printf "%s.%s.%s",$1,$2,$3b}'`  # 组装后的ip地址

echo ">>> the gateway is: $gateway"
echo ">>> the ip is: $ipaddr"

echo ">>> updating network-scripts..."
bpath='/etc/sysconfig/network-scripts'
for path in `find $bpath -name 'ifcfg-*'`; do
  if [[ $path == "$bpath/ifcfg-lo" || $path =~ "bak" ]]; then
    continue
  fi
  echo ">>> now going to config: $path"
  configNetwork $ipaddr $gateway $netmask $dns1 $path
done

echo ">>> restarting network..."
systemctl restart network  # 重启网络
