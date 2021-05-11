%{!?prefix: %global prefix /opt/allweb}

%define localbin    /usr/local/bin
%define name    hyhive-pm
%define _version    1.0.0
%define _release    1000

Name:           %{name}
Version:        %{_version}
Release:        %{_release}.el7
Summary:        hyhive-pm
Group:          System Environment/Daemons
License:        Commercial
URL:            http://www.datatom.com
Vendor:         Datatom Co.,Ltd.(Build %{git_commit_hash})
Source:         %{name}-%{_version}.tar.gz

BuildRequires:	gcc
Requires:       systemd

%description
frontend resource - hyhive-pm

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
####-anchor-[node-version]-[post]
# sudo ln -s /opt/allweb/node-8.0.0-linux/bin/* %{localbin} -f

echo ">>> hyhive pm install success ! <<<"
echo

# ------------ PREUN -------------

%preun

# ------------ POSTUN -------------

%postun
if [ "$1" = "0" ] ; then
  # -- remove files and dirs
  echo '>>> remove hyhive pm files ... '
  ####-anchor-[node-version]-[postun]
  sudo rm /opt/allweb/node-express-react/public/public/support/_book -rf

  echo
  echo ">>> hyhive pm uninstall success ! <<<"
  echo
else
  echo '>>> upgrade ...'
fi
# ------------ FILES -------------

%files
%attr(755, root, root) %{prefix}/

# ------------ CHANGELOG -------------

%changelog
