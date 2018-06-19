### 企业级别CentOS6.6安装
______________________

#### 配置网卡和设置网络联网

1. 查看内核版本号
```sh
uname -r
```

2. 虚拟机网络NAT转接的设置方法
如果虚拟机的主机是设置拨号上网的，则虚拟机的网卡最好使用NAT模式，NAT模式下无需设置IPADDR、GATEWAY、NETMASK、BOOTPROTO(dhcp)，需要设置DNS1和DNS2。

3. 虚拟机网络桥接模式的设置方法
如果虚拟机的主机再局域网内是通过路由器上网的，则虚拟机除了可用NAT模式外，也可使用桥接模式上网。桥接模式下也能使用DHCP自动分配IP，这样 更简单，如果要设置静态IP则需配置IP、子网掩码、网关，并禁止DHCP自动分配，也需要配置DNS1和DNS2。
```sh
# 启动网卡
ifup eth*
# 查看网卡配置
ifconfig eth*
# 使用ifup/ifdown重启网卡
ifup eth*
ifdown eth*
# 不要使用network命令重启网卡，这会影响所有网络
/etc/init.d/network restart
```

4. 最小化安装时需要额外安装一些工具包
```sh
yum install tree telnet dos2unix sysstat lrzsz nc nmap -y
```

### CentOS6.6的连接管理和优化
__________________________

#### 远程连接Linux系统管理

1. 检查工具的安装情况
```sh
rpm -qa openssh openssl
```

2. 检查连接状态
```sh
# ping命令
ping -c 4 10.0.0.7
# windows命令tracert
tracert -d 10.0.0.7
# linux命令traceroute
traceroute 10.0.0.7 -n
# 利用telnet或nmap命令检查
telnet 10.0.0.7 22
nmap 10.0.0.7 -p 22
```

3. echo命令
```sh
# 打印文件内容
echo file
# 重定向
echo 'test' > file.txt
# 内容追加
echo 'test' >> file.txt
```

#### 安装Linux系统后的调优及安全设置

1. 关闭SELinux功能
```sh
# sed命令(永久)
sed -i 's/SELINUX=enforcing/SELINUX=disabled' /etc/selinux/config
# 手动修改配置文件(永久)
vim /etc/selinux/config
#
# 临时修改selinux配置(临时)
setenforce [ Enforcing | Permissive | 1 | 0 ]
# 获取当前设置
getenforce
# 重启后永久设置才会生效
reboot
```

2. 设置当前系统的运行级别(文本模式)
```sh
# 查看运行级别配置文件
grep 3:initdefault /etc/inittab
# 查看当前系统运行级别
runlevel
# 修改运行级别
init 5
```

3. 精简开机系统自启动  
重要的开机自启动服务：  
1) sshd -- 远程连接  
2) rsyslog -- 日志相关  
3) network -- 网络  
4) crond -- 周期地执行系统及用户配置的任务计划  
5) sysstat -- 检测系统性能和效率的一组工具  
```sh
# 查看默认Linux系统开启的服务
# 设置英文字符集
LANG=en
# 运行级别3下的开启服务
chkconfig --list | grep 3:on
#
# 使用三种方法快速定制需要保留和关闭的服务
#
# 1) 先将3级别文本模式下开启的服务都关闭，再开启需要保留的
for oldboy in `chkconfig --list|grep 3:on|awk '{print $1}'`;do
  chkconfig --level 3 $oldboy off
done
for oldboy in crond network rsyslog sshd sysstat; do
  chkconfig --level 3 $oldboy on
done
chkconfig --list | grep 3:on
#
# 2）默认情况下需要保留的服务都已经是开启状态了，因此只需要把3级别文本模式下已开启但不需要的禁用就行
for oldboy in `chkconfig --list|grep 3:on|awk 'print $1'|grep -vE "crond|network|sshd|rsyslog|sysstat"`; do
  chkconfig --level 3 $oldboy off
done
chkconfig --list | grep 3:on
#
# 3）同于2但是利用命令平截取所有要处理的命令字符串然后用bash执行
chkconfig --list | grep 3:on|grep -vE  "cron|sshd|network|rsyslog|sysstat" | awk '{print "chkconfig " $1 " off"}' | bash
chkconfig --list | grep 30:on
#
```

4. 关闭iptables防火墙  
一般有外网IP的服务器才需要开启防火墙，但iptables会损耗性能，即使有外网IP，服务器也不一定需要开启iptables
```sh
# 关闭服务
/etc/init.d/iptables stop
# 关闭开机自启
chkconfig iptables off
# 查看服务
chkconfig --list | grep iptables
```
