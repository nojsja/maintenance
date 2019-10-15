### dview
---------
dview build-essential, to build [__node-express-react__] + [__web__] + [__mongodb__] + [__node__] into a single bundle package.

#### env prepare
* install rpmbuild tools => `yum install rpm-build`
* node@^8.14.1 | npm@^6.4.1 => you can use nvm to manage node version.
* GNU Make >= 3.82 => `yum install make`
* gcc => `yum install gcc`

#### instructions
1. the default build-dist directory is `~/rpmbuild`
2. the dview unpack resources is `~/dview-[version]`
3. __the rpm package(which need to install) is `~/dview-release/dview-[version].x86_64.rpm`__
4. the source-package is `~/rpmbuild/SRPMS/dview-[version].src.rpm`

#### files
* [file] -- __dview.spec__ => _rpmbuild rule file_
* [file] -- __build__ => _rpm build script_
* [file] -- __Makefile__ => _Makefile of dview.tar.gz_
* [file] -- __node-v8.11.1-linux-x64.tar.gz__ => _node package_

#### command

1. build[构建]
```bash
# check help info
#   |-- tips >> run `sudo chmod +x dbuild` when exec this script for the first time.
$:  bash dbuild --help
# build rpm package
#   |-- 1. example[路径参数webpath是必要参数,version默认为1.0.0，release默认为1001]
#        >> bash dbuild --webpath /root/github/dview
#   |     
#   |-- 2. example[设置version为1.0.1，release默认1001]
#        >> bash dbuild --webpath /root/github/dview --version 1.0.1
#   |     
#   |-- 3. example[设置release为1002，version默认为1.0.0]
#        >> bash dbuild --webpath /root/github/dview --release 1002
#   |     
#   |-- 4. example[设置version为1.0.1，同时设置release为1002]
#        >> bash dbuild --webpath /root/github/dview --version 1.0.1 --release 1002
#        
$:  bash dbuild --webpath [absolute/path/to/dview]  --version [version] --release [number]
```

2. install[安装]
```bash
# # INSTALL(anyone of them is OK!)
# 01 use [rpm command] to install
rpm -ivh ~/rpmbuild/RPMS/x86_64/dview-xxxxxx.el7.x86_64.rpm
# 02 use [yum] to install
yum install ~/rpmbuild/RPMS/x86_64/dview-xxxxxx.el7.x86_64.rpm -y
```

2. search[查找]
```bash
# # SEARCH the rpm package already installed
# dview-1.0.0-1010.el7.x86_64
rpm -q dview-1*
```

4. remove[卸载]
```bash
# # REMOVE(anyone of them is OK!)
# 01 use [rpm command] to remove
rpm -evh dview-xxxxxx
# 02 use [yum] to remove
yum remove dview-xxxxxx -y
```
