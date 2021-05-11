### fe-builder
---------
本项目是用于构建前端各资源安装包，在构建安装包时应遵循以下原则：  
* 根据不同的资源构建不同的安装包，减小单个安装包体积
* 为了方便管理和构建，以分支的形式来构建不同的安装包

#### env prepare
* install rpmbuild tools => `yum install rpm-build`
* node@^8.14.1 | npm@^6.4.1 => you can use nvm to manage node version.
* GNU Make >= 3.82 => `yum install make`
* gcc => `yum install gcc`

#### instructions
1. the default build-dist directory is `~/rpmbuild`
2. the nodejs unpack resources is `~/nodejs-[version]`
3. __the rpm package(which need to install) is `~/fe-release/nodejs-[version].x86_64.rpm`__
4. the source-package is `~/rpmbuild/SRPMS/nodejs-[version].src.rpm`

#### files
* [file] .. __chrome-builder__ => _chrome资源包构建脚本_
* [file] .. __dbuilder-v1__ => _dview项目构建脚本v1.0.0版本(针对infinity-v3.3及以下)_
* [file] .. __dbuilder-v2__ => _dview项目构建脚本v2.0.0版本(针对infinity-v3.4至v3.6)_
* [file] .. __dbuilder-v3__ => _dview项目构建脚本v3.0.0版本(针对
infinity-v3.6+)_
* [file] .. __dview-pm-builder__ => _dview资源包构建脚本_
* [file] .. __hyhive-pm-builder__ => _hyhive资源包构建脚本_
* [file] .. __nodejs-builder__ => _nodejs构建脚本_
* [file] .. __rhinodisk-builder__ => _rhinodisk资源包构建脚本_
* [file] .. __gulpfile.babel.js__ => _gulp工作流脚本_
* [file] .. __gulpfile.utils.js__ => _gulp工作流工具函数脚本_
* [dir ] .. __resources__ => 构建资源存储目录
* [dir ] .. __origin__ => dview构建文件临时处理目录
* [dir ] .. __conf__ => 构建配置文件目录
* [dir ] ....... __conf / chrome__ => chrome构建配置文件目录
* [dir ] ....... __conf /dview__ => chrome构建配置文件目录
* [dir ] ....... __conf / dview-pm__ => dview静态资源构建配置文件目录
* [dir ] ....... __conf / hyhive-pm__ => hyhive静态资源构建配置文件目录
* [dir ] ....... __conf / nodejs__ => nodejs构建配置文件目录
* [dir ] ....... __conf / rhinodisk__ => nodejs构建配置文件目录

#### command

1. build[构建]
```bash
# check help info
#   |-- tips >> run `sudo chmod +x dbuild` when exec this script for the first time.
$:  bash nodejs-build --help
```

2. install[安装]
```bash
# # INSTALL(anyone of them is OK!)
# 01 use [rpm command] to install
rpm -ivh ~/rpmbuild/RPMS/x86_64/nodejs-xxxxxx.el7.x86_64.rpm
# 02 use [yum] to install
yum install ~/rpmbuild/RPMS/x86_64/nodejs-xxxxxx.el7.x86_64.rpm -y
```

2. search[查找]
```bash
# # SEARCH the rpm package already installed
rpm -qa | grep nodejs
```

4. remove[卸载]
```bash
# # REMOVE(anyone of them is OK!)
# 01 use [rpm command] to remove
rpm -evh nodejs-xxxxxx
# 02 use [yum] to remove
yum remove nodejs-xxxxxx -y
```
