## mongodb-centos7
> mongodb scripts used in centos7.

#### Instruction
----------------
* 用于Centos7安装mongodb服务和yapi服务，并且使用chkconfig分别将mongodb和yapi注册为开机自启动服务

* 安装文件`mongodb-linux-x86_64-rhel70-3.6.4.tgz、node-v8.11.1-linux-x64.gzip`需要与文件夹mongodb-centos7位于同级目录下，进入 mongodb-centos7/startup 下执行`bash init.sh`即可执行安装，安装不会覆盖已有数据库文件。

* mongodb-centos7/startup 下的其它脚本文件会自动注册为对应名字的系统开机服务，包括yapi和mongodb，系统重启后可以通过systemctl查看这些服务。

#### Install
------------
进入mongodb-centos7目录下执行`bash init`  
脚本会执行下列操作:  
* 安装node环境并设置npm镜像源
* 安装mongodb环境并启动mongodb服务
* 设置mongodb开机自启服务和定时备份任务
* 启动yapi服务

#### Catalog & Files
--------------------
[dir ] ..... startup -- 管理脚本目录  
[file] .......... startup/init -- 环境安装初始化脚本  
[file] .......... startup/mongodb -- mongodb服务管理脚本  
[file] .......... startup/rsync -- mongodb备份任务脚本  
[file] .......... startup/rsync-schedule -- mongodb定时备份规则  
[file] .......... startup/yapi -- yapi服务管理脚本  

#### Tips
--------
如果要使用远程备份mongodb数据功能的话，请将本文件夹拷贝到目标主机下，并在相应目录下执行`bash rsync --init`命令来初始化rsync服务。

#### Manage
-----------

1. yapi manage
```sh
# # 1. 通过注册服务的系统命令管理 ---------------
#
# # 启动
systemctl start yapi
# # 停止
systemctl stop yapi
# # 重启
systemctl restart yapi
# # 重载
systemctl reload yapi
# # 删除
systemctl delete yapi
#
# # 2. 手动执行脚本文件(指定目录下) ------------------------
#
# # startup目录下
# # 启动
bash yapi --start
# # 停止
bash yapi --stop
# # 重启
bash yapi --restart
# # 重载
bash yapi --reload
# # 删除
bash yapi --delete
```

2. mongodb manage
```sh
# # 1. 通过注册服务的系统命令管理 ---------------
#
# # 启动
systemctl start mongodb
# # 停止
systemctl stop mongodb
# # 重启
systemctl restart mongodb
# # 清除数据
systemctl clean mongodb
#
# # 2. 手动执行脚本文件(指定目录下) ------------------------
# # 查看帮助信息
bash mongodb --help
# # startup目录下
# # 启动
bash mongodb --start
# # 停止
bash mongodb --stop
# # 重启
bash mongodb --restart
# # 重载
bash mongodb --clean
# # 备份数据到本地和远程主机
bash mongodb --backup [ip]
# # 从本地或远程恢复数据
bash mongodb --restore [ip]
# # 设置备份定时任务
bash mongodb --crontab [schedule]
# # 取消备份定时任务
bash mongodb --drontab
```
