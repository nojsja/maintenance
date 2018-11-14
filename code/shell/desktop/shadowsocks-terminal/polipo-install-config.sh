#!/usr/bin/env bash

# variable
whoami=`whoami`
allSource=("/home/$whoami/.bashrc" "/home/$whoami/.zshrc")

# polipo install
echo ">>> install polipo ... "
sudo apt-get install polipo
# create polipo configure file
echo ">>> config polipo ... "
touch config
echo "logSyslog = true" >> config
echo "logFile = /var/log/polipo/polipo.log" >> config
echo "socksParentProxy = "127.0.0.1:1080"" >> config
echo "socksProxyType = socks5" >> config
echo "logLevel=4" >> config
sudo mv config /etc/polipo/ -f
# polipo service start
echo ">>> start polipo ... "
sudo service polipo stop
sudo service polipo start
# set proxy alias
echo ">>> update user shell config ... "

setProxyAlias() {
  local sourceFile=$1

  sed -i '/# # alias for http proxy/'d $sourceFile
  sed -i '/alias hp=/'d $sourceFile
  sed -i '/gp=/'d $sourceFile
  echo "# # alias for http proxy" >> $sourceFile
  echo "alias hp='http_proxy=http://localhost:8123'" >> $sourceFile
  echo "gp='http.proxy=localhost:8123'" >> $sourceFile

  local shellFile=".`echo ${SHELL} | awk -F '/' '{print $NF}'`rc"
  local givenShellFile=$(echo $sourceFile | awk -F '/' '{print $NF}')
  echo $shellFile $givenShellFile
  if [[ $shellFile == $givenShellFile ]]; then
    echo ">>> source $sourceFile"
    echo ">>> please input $whoami's password to update $sourceFile ->"
    #su - $whoami -c "source $sourceFile"
    source $sourceFile
  fi
}

for one in ${allSource[@]}; do
  if [ -f "$one" ]; then
    setProxyAlias $one
  fi
done

# guide info
echo ">>> succeed! please restart the terminal first."
echo ">>> then try the follow commands to run a test: "
echo ">>>   tips: 'hp' == 'http_proxy=http://localhost:8123' for any command."
echo ">>>   tips: 'gp' == 'http.proxy=localhost:8123' for git proxy config."
echo ">>>   [command1] hp curl ip.gs"
echo '>>>   [command2] git clone https://android.googlesource.com/tools/repo --config $gp'
