#!/usr/bin/env bash

location=`pwd`
whoami=`whoami`

# # 链接脚本文件
link() {
  local target="$1"

  if [ ! -e "$location/$target" ]; then
    echo ">>> invalid target!"
    exit 1
  fi

  cp $location/$target /home/$whoami/.local/share/nautilus/scripts/
  sudo chmod +x /home/$whoami/.local/share/nautilus/scripts/$target

  echo
  echo ">>> link $target done!"
  echo
  exit 0
}

# # 取消脚本文件链接
unlink() {
  local target="$1"
  local abTarget="/home/$whoami/.local/share/nautilus/scripts/$target"

  if [ ! -e "/home/$whoami/.local/share/nautilus/scripts/$target" ]; then
    echo ">>> invalid target!"
    exit 1
  fi

  rm "$abTarget"

  echo
  echo ">>> unlink $target done!"
  echo
  exit 0
}

# # usage
showUsage() {
  echo
  echo "Deskcription: make user-scripts link to right-click menu in nautilus(file manager)"
  echo "Main: bash nauLink.sh [action]"
  echo "|____ action: 【-l | --link  】【name】   => set scripts [name] bond"
  echo "|____ action: 【-u | --unlink】【name】   => unset scripts [name] bond"
  echo "|____ action: 【-h | --help  】    => show usage"
  echo "|"
  echo "|____ example: bash nauLink.sh --link   'open-in-terminal'"
  echo "|____ example: bash nauLink.sh --unlink 'open-in-terminal'"
  echo
  exit 0
}

while [ -n "$1" ]; do
  case  "$1" in
    -l | --link )
      link "$2"
      shift
    ;;
    -u | --unlink )
      unlink "$2"
      shift
    ;;
    -h | --help )
      showUsage
    ;;
  esac
  shift
done
