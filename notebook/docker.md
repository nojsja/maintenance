### docker环境配置
________________
> 要求内核版本高于3.1

#### 使用脚本安装docker

1. 获取最新版安装脚本
```sh
wget -qO- https://get.docker.com/ | sh
```

2. 将当前非root用户加入docker用户组避免权限问题
```sh
sudo usermod -aG docker `whoami`
reboot
```

3. 启动docker后台服务
```sh
sudo service docker start
```

4. 运行hello-world
```sh
docker run hello-world
```

### docker基本命令和使用
______________________

#### 常用命令
1. 获取镜像
```sh
# exp: docker pull ubuntu:16.04
docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]
```

#### 使用进阶
