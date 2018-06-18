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

2. 列出镜像
```sh
docker image ls
# 查看体积
docker image df
```

3. 删除本地镜像
```sh
# docker image rm ubuntu:16.04
docker image rm [选项] <镜像1> [<镜像2> ...]
```

4. 关于镜像删除的不同方法: ID、摘要、标签
```sh
# 删除所有redis镜像
docker image rm $(docker image ls -q redis)
# 删除所有mongo 3.2之前的镜像
docker image rm $(docker image ls -q -f before=mongo:3.2)
```
>一个镜像ID和摘要唯一、标签可以有多个，删除行为分为两类：Untagged 和 Deleted，镜像没有依赖时方可完全删除  


#### 使用进阶

1. docker镜像定制
```sh
# 启动一个容器，映射到80端口
docker run --name webserver -d -p 80:80 nginx
# 打开容器的交互终端
docker exec -it  webserver bash
```
