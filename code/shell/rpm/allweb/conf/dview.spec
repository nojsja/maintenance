%{!?prefix: %global prefix /opt/allweb}

%define localbin    /usr/local/bin
%define name    dview
%define _version    1.0.0
%define _release    1000

Name:           %{name}
Version:        %{_version}
Release:        %{_release}.el7
Summary:        all frontend code
Group:          System Environment/Daemons
License:        Commercial
URL:            http://www.datatom.com
Vendor:         Datatom Co.,Ltd.(Build %{git_commit_hash})
Source:         %{name}-%{_version}.tar.gz

BuildRequires:	gcc
Requires:       systemd

%description
all frontend code

# ------------ PREP -------------

%prep
# -- unzip the source code
%setup -q

# ------------ BUILD -------------

%build

# ------------ INSTALL -------------

%install
# -- install (just copy file)
make install DESTDIR=%{buildroot}

# ------------ POST -------------

%post
# -- environmental variable
echo '>>> now update /etc/profile ... '
sed '/export FrontEndDir=/'d /etc/profile -i
sudo echo "export FrontEndDir=/opt/allweb/node-express-react" >> /etc/profile
source /etc/profile

# -- symbolic links
echo '>>> create symbolic links for mongodb and node ... '
# sudo ln -s /opt/allweb/mongodb-linux-x86_64-rhel70-3.6.4/* %{localbin} -f
sudo ln -s /opt/allweb/node-v8-linux/bin/* %{localbin} -f

# -- add startup service
echo '>>> add frontend startup service ... '
systemctl daemon-reload
systemctl enable frontend

# -- start frontend service
echo '>>> start frontend service ... '
systemctl start frontend
echo
echo ">>> dview install success ! <<<"
echo

# ------------ PREUN -------------

%preun
echo '>>> stop frontend service ... '
systemctl stop frontend
systemctl disable frontend

# ------------ POSTUN -------------

%postun
if [ "$1" = "0" ] ; then
  # -- remove files and dirs
  echo '>>> remove dview files ... '
  rm /opt/allweb -rf
  # -- unset env vir
  echo '>>> unset dview env variable ... '
  sed '/export FrontEndDir=/'d /etc/profile -i
  # sudo rm %{localbin}/mongo* %{localbin}/bsondump %{localbin}/install_compass -f
  sudo rm %{localbin}/pm2* %{localbin}/node %{localbin}/npm %{localbin}/npx -f
  echo
  echo ">>> dview uninstall success ! <<<"
  echo
else
  systemctl start frontend
  systemctl enable frontend
fi
# ------------ FILES -------------

%files
%attr(755, root, root) %{prefix}/
%attr(755, root, root) /etc/frontend
%attr(755, root, root) /usr/lib/systemd/system/frontend.service
%attr(755, root, root) /etc/init.d/frontend

# ------------ CHANGELOG -------------

%changelog
