#!/bin/bash

remote=''
password='yw020154'

if [ -z "$1" ]; then
  echo "need param -- ip !";
  exit 1
else
  remote="$1"
fi

echo '>> now transfer resources files: '
scp ./shadowsocks-remote.sh ./shadowsocks.tar root@$remote:/root
ssh -t root@$remote "echo '>> now set the new password: [$password] '; passwd root; tar -xf shadowsocks.tar; \
echo '>> now run the shadowsocks conf script: '; echo $password | sudo -S chmod a+x shadowsocks/shadowsocks-go.sh; \
bash shadowsocks/shadowsocks-go.sh"