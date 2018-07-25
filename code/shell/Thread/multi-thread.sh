#!/bin/bash
#———————————————————————————–
# 此例子说明了一种用wait、read命令模拟多线程的一种技巧
# 此技巧往往用于多主机检查，比如ssh登录、ping等等这种单进程比较慢而不耗费cpu的情况
# 还说明了多线程的控制
#———————————————————————————–


function a_sub { # 此处定义一个函数，作为一个线程(子进程)
  sleep 3 # 线程的作用是sleep 3s
}


tmp_fifofile="/tmp/$$.fifo"
mkfifo $tmp_fifofile      # 新建一个fifo类型的文件
exec 6<>$tmp_fifofile      # 将fd6指向fifo类型
rm $tmp_fifofile

thread=15 # 此处定义线程数
for ((i=0;i<$thread;i++)); do
  echo
done >&6 # 事实上就是在fd6中放置了$thread个回车符


for ((i=0;i<50;i++)); do # 50次循环，可以理解为50个主机，或其他

read -u6
# 一个read -u6命令执行一次，就从fd6中减去一个回车符，然后向下执行，
# fd6中没有回车符的时候，就停在这了，从而实现了线程数量控制

{ # 此处子进程开始执行，被放到后台
      a_sub && { # 此处可以用来判断子进程的逻辑
       echo "a_sub is finished"
      } || {
       echo "sub error"
      }
      echo >&6 # 当进程结束以后，再向fd6中加上一个回车符，即补上了read -u6减去的那个
} &

done

wait # 等待所有的后台子进程结束

exec 6>&- # 关闭df6

exit 0
