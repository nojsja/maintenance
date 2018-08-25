#!/bin/bash

# # 错误写法
# 管道的使用形成了shell
# 了shell中的变量无法在父shell中访问

readPasswd() {
  retval=0;
  local count=0;
  cat passwd | while read line; do
    array[$count]=$line
    if [ -z "${array[$count]}" ]; then
      retval=1 && break
    fi
    ((count++))
  done
  return $retval
}

main() {
  readPasswd
  echo "retval = $retval"
  echo "array[0] = ${array[0]}"
}

main
