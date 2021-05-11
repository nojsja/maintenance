%{!?prefix: %global prefix /opt/allweb}

%define localbin    /usr/local/bin
%define name    nodejs
%define _version    8.0.0
%define _release    1000

Name:           %{name}
Version:        %{_version}
Release:        %{_release}.el7
Summary:        nodejs
Group:          System Environment/Daemons
License:        Commercial
URL:            http://www.datatom.com
Vendor:         Datatom Co.,Ltd.(Build %{git_commit_hash})
Source:         %{name}-%{_version}.tar.gz

BuildRequires:	gcc
Requires:       systemd

%description
frontend resource - nodejs

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
# -- symbolic links
echo '>>> create symbolic links for mongodb and node ... '
####-anchor-[node-version]-[post]
sudo ln -s /opt/allweb/node-linux/bin/* %{localbin} -f

echo ">>> nodejs install success ! <<<"
echo

# ------------ PREUN -------------

%preun

# ------------ POSTUN -------------

%postun
if [ "$1" = "0" ] ; then
  # -- remove files and dirs
  echo '>>> remove nodejs files ... '
  ####-anchor-[node-version]-[postun]
  sudo rm /opt/allweb/node-linux -rf
  sudo rm ~/.pm2 -rf

  # -- unset env vir
  echo '>>> unset dview env variable ... '
  sudo rm %{localbin}/pm2* %{localbin}/node %{localbin}/npm %{localbin}/npx -f
  echo
  echo ">>> nodejs uninstall success ! <<<"
  echo
else
  echo '>>> upgrade ...'
fi
# ------------ FILES -------------

%files
%attr(755, root, root) %{prefix}/

# ------------ CHANGELOG -------------

%changelog
