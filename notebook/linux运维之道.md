### 无人职守自动安装linux操作系统
____________________________
* PXE技术 -- 客户端通过网络从远端服务器下载启动镜像，整个过程要求服务器分配IP地址，再用TFTP协议下载位于服务器上的启动镜像到本机内存中执行，客户端从网络启动后，剩下的服务器配置步骤仍然需要手动完成，为此需要使用kickstart技术通过读取自动应答文件来实现自动安装配置。
* kickstart可以通过 system-config-kickstart 图形界面工具自动配置生成。
* 安装服务器需要运行DHCP、TFTP、NFS三种服务。
* DHCP服务器 -- 为客户端自动分配IP和其它参数(next -> TFTP， configure /etc/dhcp/dhcpd.conf)。
* TFTP -- 简单文件传输服务(configure /etc/xinetd.d/tftp)，CentOS7使用vsftpd软件来安全地共享文件，客户机通过服务器的vsftpd来传输系统文件。

#### 自动化安装案例
* 准备两台安装服务器，boot.example.com(DHCP/TFTP)，ftp.example.com(FTP)
boot主机上安装DHCP服务，并配置好dhcp启动项，启动dhcp并设置为开机自启动，关闭防火墙，关闭SELinux防护功能。
```sh
# 安装dhcp
yum -y install dhcp
# 配置dhcp
vim /etc/dhcp/dhcpd.conf
# 启动和开机启动设置
systemctl start dhcpd
systemctl enable dhcpd
# 查看端口
netstat --nutlp | grep :67
# 关闭禁用防火墙
systemctl stop firewalld
systemctl disable firewalld
# 关闭SELinux防护功能
setenforce 0
```

* boot主机上安装tftp服务器和xinetd，编辑配置文件/etc/xinetd.d/tftp，启动tftp，配置共享路径。
```sh
yum -y install tftp-server xinetd
vim /etc/xinetd.d/tftp
```

* boot主机上将客户端所需的引导文件和镜像复制到tftp共享目录。
```sh
# 获得引导文件
yum -y install syslinux
# 引导文件复制到tftp共享目录
cp /usr/share/syslinux/pxelinux.0 /var/lib/tftpboot/
# 挂在启动镜像并复制文件
umount /dev/cdrom
mount /dev/cdrom /var/ftp/pub
cp /var/ftp/pub/isolinux/* /var/lib/tftpboot/
# 创建启动配置文件
mkdir /var/lib/tftpboot/pxelinux.cfg/
cp /var/ftp/pub/isolinux/isolinux.cfg /var/lib/tftpboot/pxelinux.cfg/default
chmod 644 /var/lib/tftpboot/pxelinux.cfg/default
```

* 修改相应的安装启动配置文件，制定kickstart启动文件
```sh
vim /var/lib/tftpboot/pxelinux.cfg/default
```
* 重启tftp服务并设置为开机启动
```sh
systemctl restart xinetd
systemctl enable xinetd
ss -nutlp | grep :69
```

* 创建kickstart自动应答文件，使用system-config-kickstart软件进行图形化配置
