### allweb
---------
allweb build-essential, to tar [__node-express-react__] + [__web__] + [__mongodb__] + [__node__] into a single bundle package.

#### env
* install rpmbuild tools => `yum install rpm-build`

#### instructions
1. the default build-dist directory is `~/rpmbuild`
3. the rpm-package(need to install) is `~/rpmbuild/RPMS/x86_64/allweb-[version].x86_64.rpm`
4. the source-package is `~/rpmbuild/SRPMS/allweb-[version].src.rpm`
5. GNU Make >= 3.82

#### files
* [file] -- __allweb.spec__ => _rpmbuild rule file_
* [file] -- __build__ => _rpm build script_
* [file] -- __install__ => _rpm install script_
* [file] -- __Makefile__ => _Makefile of allweb.tar.gz_
* [file] -- __mongodb-linux-x86_64-rhel70-3.6.4.tar.gz__ => _mongodb package_
* [file] -- __node-v8.11.1-linux-x64.tar.gz__ => _node package_

#### command

1. build
```bash
# check help info
#   |-- tips >> run `sudo chmod +x build` when exec this script for the first time.
$: bash build --help
# build rpm package
#   |-- example >> bash build --webpath /root/github/allweb
$: bash build --webpath [path/to/allweb]
```

2. install
```bash
# run install script
#  |-- tips >> run `sudo chmod +x install` when exec this script for the first time.
$: bash install
#  |-- or you can also run rpm command, it's same to `bash install`
$: rpm -ivh ~/rpmbuild/RPMS/x86_64/allweb-1.0.0-1.el7.x86_64.rpm --nodeps
```

3. uninstall
```bash
# run uninstall script
#  |-- tips >> run `sudo chmod +x uninstall` when exec this script for the first time.
$: bash uninstall
#  |-- or you can also run rpm command, it's same to `bash uninstall`
#  [01]check installed allweb-[version] package info
$: rpm -q allweb-*
#  [02]uninstall allweb-[version]
$: rpm -evh allweb-1.0.0
```
