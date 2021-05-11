%{!?prefix: %global prefix /opt/allweb}

%define localbin    /usr/local/bin
%define name    rhinodisk
%define _version    1.0.0
%define _release    1000

Name:           %{name}
Version:        %{_version}
Release:        %{_release}.el7
Summary:        rhinodisk
Group:          System Environment/Daemons
License:        Commercial
URL:            http://www.datatom.com
Vendor:         Datatom Co.,Ltd.(Build %{git_commit_hash})
Source:         %{name}-%{_version}.tar.gz

BuildRequires:	gcc
Requires:       systemd dview

%description
frontend resource - rhinodisk

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

echo ">>> RhinoDisk Resource install success ! <<<"
echo

# ------------ PREUN -------------

%preun

# ------------ POSTUN -------------

%postun
if [ "$1" = "0" ] ; then
  # -- remove files and dirs
  echo '>>> remove dview-pm files ... '
  ####-anchor-[node-version]-[postun]
  sudo rm /opt/allweb/node-express-react/public/public/download/RhinoDisk*.zip -rf

  echo
  echo ">>> RhinoDisk Resource uninstall success ! <<<"
  echo
else
  echo '>>> upgrade ...'
fi
# ------------ FILES -------------

%files
%attr(755, root, root) %{prefix}/

# ------------ CHANGELOG -------------

%changelog
