### allweb
---------
allweb build-essential, to build [__node-express-react__] + [__web__] + [__mongodb__] + [__node__] into a single bundle package.

#### env prepare
* install rpmbuild tools => `yum install rpm-build`
* node@^8.14.1 | npm@^6.4.1 => you can use nvm to manage node version.
* GNU Make >= 3.82 => `yum install make`
* gcc => `yum install gcc`

#### instructions
1. the default build-dist directory is `~/rpmbuild`
2. the allweb unpack resources is `~/allweb-[version]`
3. __the rpm package(which need to install) is `~/rpmbuild/RPMS/x86_64/allweb-[version].x86_64.rpm`__
4. the source-package is `~/rpmbuild/SRPMS/allweb-[version].src.rpm`

#### files
* [file] -- __allweb.spec__ => _rpmbuild rule file_
* [file] -- __build__ => _rpm build script_
* [file] -- __install__ => _rpm install script_
* [file] -- __Makefile__ => _Makefile of allweb.tar.gz_
* [file] -- __mongodb-linux-x86_64-rhel70-3.6.4.tar.gz__ => _mongodb package_
* [file] -- __node-v8.11.1-linux-x64.tar.gz__ => _node package_

#### command

1. build[构建]
```bash
# check help info
#   |-- tips >> run `sudo chmod +x build` when exec this script for the first time.
$: bash build --help
# build rpm package
#   |-- 1. example[路径参数webpath是必要参数,version默认为1.0.0，release默认为1001]
#        >> bash build --webpath /root/github/allweb
#   |     
#   |-- 2. example[设置version为1.0.1，release默认1001]
#        >> bash build --webpath /root/github/allweb --version 1.0.1
#   |     
#   |-- 3. example[设置release为1002，version默认为1.0.0]
#        >> bash build --webpath /root/github/allweb --release 1002
#   |     
#   |-- 4. example[设置version为1.0.1，同时设置release为1002]
#        >> bash build --webpath /root/github/allweb --version 1.0.1 --release 1002
#        
$: bash build --webpath [path/to/allweb]  --version [version] --release [release]
```

2. install[安装]
```bash
# method 1: run install script (not recommended, because the version number change sometimes.)
#  |-- tips >> run `sudo chmod +x install` when exec this script for the first time.
$: bash install
# method 2: directly run rpm install command(recommended), same to `bash install`
$: rpm -ivh ~/rpmbuild/RPMS/x86_64/allweb-1.0.0-1001.el7.x86_64.rpm --nodeps --force
```

3. uninstall[卸载]
```bash
# method 1: run uninstall script (not recommended, because the version number change sometimes.)
#  |-- tips >> run `sudo chmod +x uninstall` when exec this script for the first time.
$: bash uninstall
# method 2: directly run rpm uninstall command(recommended), same to `bash uninstall`
#  [01]check installed allweb-[version] package info
$: rpm -q allweb-*
#  [02]uninstall allweb-[version]
$: rpm -evh allweb-1.0.0
```
