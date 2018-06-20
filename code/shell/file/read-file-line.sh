#!/bin/bash

# 写法一：
# ----------------------------------------------------------------------------

while read line
do
    echo $line
done < file(待读取的文件)


# 写法二：
# ----------------------------------------------------------------------------

cat file(待读取的文件) | while read line
do
    echo $line
done


# 写法三：
# ----------------------------------------------------------------------------
for line in `cat file(待读取的文件)`
do
    echo $line
done

# 说明：
# for逐行读和while逐行读是有区别的,如:
# ----------------------------------------------------------------------------

$ cat file
aaaa
bbbb
cccc dddd

$ cat file | while read line; do echo $line; done
aaaa
bbbb
cccc dddd

$ for line in $(<file); do echo $line; done
aaaa
bbbb
cccc
dddd
