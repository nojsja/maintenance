#!/bin/bash

# # 正确写法

readPasswd() {
  retval=0;
  local count=0;
  while read line; do
    array[$count]=$line
    if [ -z "${array[$count]}" ]; then
      retval=1 && break
    fi
    ((count++))
  done < ./passwd
  return $retval
}

main() {
  readPasswd
  echo "retval = $retval"
  echo "array[0] = ${array[0]}"
}

main
