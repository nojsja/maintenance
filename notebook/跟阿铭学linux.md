### 安装centos
_____________

#### 设置网络
1. 自动获取ip地址
```sh
dhclient
```
2. 查看ip地址
```sh
# IP 命令
ip addr
# 安装网络工具
yum install -y net-tools
ifconfig
# ping 测试
ping -c 4 www.baidu.com
```
3. 手动配置IP
```sh
# 静态IP配置需要手动增加几行
# ip地址、子网掩码、网关、DNS
IPADDR=192.168.199.*
NETMASK=255.255.255.0
GATEWAY=192.168.199.*
DNS1=119.29.29.29
```
>静态IP需要修改ONBOOT=yes BOOTPROTO=static，
配置文件地址：vim /etc/sysconfig/network-scripts/ifcfg-en**

### Linux文件和目录管理
____________________

1. 文件操作命令
```sh
# 将新目录加入系统路径
PATH=$PATH:/some/path
# 文件查看命令
cat tac
more less
head tail
```

2. 更改文件所属组chgrp
```sh
groupadd testgroup
chgrp testgroup testfile
# 递归更改
chgrp -R testgroup testfile
```

3. 更改文件的所属者chown
```sh
useradd testuser1
chown testuser1 testfile
# 同时递归更改用户和组
chown -R testuser:testgroup testfile
```

4. 更改文件的权限chmod
```sh
# 权限：读写执行 -- r/w/x -- 4/2/1
# 对象：所有/用户/组/其它用户 -- a/u/g/o
#
chmod -R 700 target # 数字更改权限
chmod -R u=rwx,og=rx target  # 字母更改权限
chmod -R u-x target # 字母减少权限
chmod -R a+x target # 字母所有增加权限
```

5. 更改文件的默认权限umask
```sh
# umask -- 200
# 新文件预设权限666，新目录预设权限777
# umask的值表示 默认权限为预设权限减去这个值后的权限
# 权限计算不能单独做数学减法，比如666 - 033 != 633，因为可能有重复计算值
#
sudo vim /etc/bashrc
```

6. 修改文件的特殊属性chattr
```sh
# chattr [+-=][Asaci]
# a -- 只能追加不能删除
# i -- 不能更改和删除
#
chattr +i dir # 给目录新增i权限后即使是root用户也不能再dir内创建和删除文件
chattr +a dir # 给目录a权限后只能再dir内新建文件，不能删除文件
#
# 递归列出所有文件的特殊属性
lsattr -aR ./
```

7. 第四位特殊属性(rwx之外)
```sh
# set uid -- 二进制可执行文件在执行期间拥有文件所有者的权限 -- passwd
# set gid -- 针对文件和目录，功能同set uid
# sticky bit -- 防删除位，文件是否能被删除取决于该文件所属目录对该用户是否有w权限，如果
# 用户有w权限，但是要让他不能删除该目录下的其它用户文件，则可以设置此权限。
#
ls -l /usr/bin/passwd
```

8. 查找和定位文件
```sh
which # 查找文件的绝对路径
whereis  # 模糊查找
locate # 模糊查找所有目录和文件
find # 最常用的查找命令 find [路径] [参数]
```

### 用户和用户组管理
_________________

1. 用户身份切换su
>su [-] username, 加-时同时切换到该用户目录，并且会初始化当前用户的环境变量，等同于以该用户登录。

2. 临时切换到root身份sudo
>使用visudo编辑/etc/sudoers配置文件添加 $user ALL=(ALL) ALL就可以让$user用户拥有切换sudo权限。

3. 不允许远程登录root账户
>编辑配置文件/etc/ssh/sshd_config，将#PermitRootLogin 值修改为no

### 磁盘管理
__________


#### 查看磁盘或目录的容量

1. 查看磁盘分区容量df
```sh
# 查看inodes的使用情况
df -i
# 自动选择合适的单位
df -h
# 手动设置统计单位
df -[mk]
```

2. 查看目录和文件占用大小du
```sh
du -[abckmsh]
# 显示所有目录和文件空间占用大小，默认单位KB
du -a
# 设置单位bkmh -- B/KB/MB/auto
du -[bkmh]
# 所有信息之后增加总占用量统计
du -c
# 只统计总占用
du -s
```

#### 磁盘的分区和格式化

1. fdisk -l 查看分区情况

2. fdisk /dev/sd* 对磁盘进行分区

3. 分区后格式化磁盘分区  
mkesfs/mkfs.ext2/mkfs.ext3/mkfs.ext4/mkfs.xfs

#### 磁盘的挂载和卸载

1. 查看挂载 mount

2. 挂载 mount /dev/sd* /dir

3. 系统挂载配置文件 /etc/fstab

4. mount -a 自动挂载fstab配置文件里声明的设备

5. 获取分区UUID -- blkid  
让分区再开机之后自动挂载可以：  
1) 添加/etc/fstab配置文件  
2) 将挂载命令添加到/etc/rc.d/rc.local文件中去
```sh
# /etc/rc.d/rc.local
#
# 可以使用UUID和Label
/usr/bin/mount UUID="f8fa9bcd-ae3e-40e5-8bd9-7b3872259d03" /dir
```
3) 赋予可执行权限 chmod a+x /etc/rc.d/rc.local  

6. umount -l 强制卸载

7. 建立swap分区增加虚拟内存
>建立swapfile -> 格式化为swap格式 -> 启动虚拟磁盘

```sh
# 建立swap文件 -- if检测存在 of目标文件 bs块的大小 count块数量
dd if=/dev/zero of=/tmp/dir bs=1M count=8096
# 格式化为swap格式
mkswap -f /tmp/dir
# 查看内存大小
free -m
```

### 文本编辑工具vim
_________________

#### 一般模式
>此模式下可以复制、粘贴、删除  

```sh
# 上下左右
k j h l
# 下一页
ctrl + f
# 上一页
ctrl + b
# 行首 和 行尾
0 $
# 第一行
gg
# 去第n行
nG
# 最后一行
G
# 向后和向前删除字符
x X
# 向后删除n个字符
nx
# 删除/剪切光标所在
dd
# 向后删除n行
ndd

```



#### 编辑模式

#### 命令模式
