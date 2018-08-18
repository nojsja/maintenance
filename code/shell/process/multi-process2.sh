#!/bin/bash

# 允许的进程数;
THREAD_NUM=20

# 定义描述符为9的管道;
rm tmp -f
mkfifo tmp
exec 9<> tmp

# 字方法
sub() {
  sleep 3
  echo -ne "\n" 1>&9
}

# 预先写入指定数量的换行符，一个换行符代表一个进程;
for ((i=0;i<$THREAD_NUM;i++))
do
    echo -ne "\n" 1>&9
done

# 循环执行sleep命令;
echo "执行开始: `date +%S`"
for i in `seq 1 30`; do
{
    # 进程控制;
    read -u 9
    {
      sub
    } &
} done

# 等待子进程执行完成
wait
echo "执行结束: `date +%S`"
rm tmp
