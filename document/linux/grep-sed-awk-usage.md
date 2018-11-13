## 一. grep和正则表达式

### grep

grep（global search regular expression(RE) and print out the line，全面搜索正则表达式并把行打印出来）是一种强大的文本搜索工具，它能使用正则表达式搜索文本，并把匹配的行打印出来。

选项

```
-d<进行动作> 当指定要查找的是目录而非文件时，必须使用这项参数，否则grep命令将回报信息并停止动作。

-i 忽略字符大小写的差别。

-l 列出文件内容符合指定的范本样式的文件名称。

-n 在显示符合范本样式的那一列之前，标示出该列的编号。

-R/-r 此参数的效果和指定“-d recurse”参数相同。

-v 反转查找。
```

1、-r递归查找

```
root@siguorui-OptiPlex-7010:/home/xhprof/trunk# grep -r XHProfRuns_Default *
examples/sample.php:$xhprof_runs = new XHProfRuns_Default();
xhprof_html/callgraph.php:$xhprof_runs_impl = new XHProfRuns_Default();
xhprof_html/typeahead.php:$xhprof_runs_impl = new XHProfRuns_Default();
```

2、-I的使用，显示文件名称

```
root@siguorui-OptiPlex-7010:~# grep -I root abc.txt 123.txt passwd
passwd:root:x:0:0:root:/root:/bin/bash
```

3、-n

```
root@siguorui-OptiPlex-7010:~# grep -n 'root' passwd
1:root:x:0:0:root:/root:/bin/bash
```

### 正则表达式

1、正则表达式单字符

* 特定字符

    * grep ‘a’ passwd

* 范围内字符

    * grep ‘[a-z]’ passwd
    * grep ‘[A-Za-z0-9]’ passwd
    * grep ‘[^0-9]’ passwd 取反,除去数字之外的字符

* 任意字符

    * grep ‘.’ passwd

但是在grep ‘[.]’中，.只是代表点这样的字符，注意区别。如果要使用.的本意，采用.的方式

* 以上三种组合

2、正则表达式其他符号

* 边界字符 头尾字符

    * ^字符，头字符，放在一串字母前边，代表以此开头。grep ‘^root’ passwd
    * $符号，如false$,代表以false字符结束
    * ^$ 代表空行，grep ‘^$’ passwd

* 元字符

    * w:匹配任何字类字符，包括下划线。相当于([A-Za-z0-9_])
    * W:大写的W，匹配任何非字类字符。相当于([^A-Za-z0-9_])
    * b 代表单词分隔。如，grep ‘\bx\b’ passwd，可以将单个前后分隔的x字符选出来，但不会选择单词中出现的x

* 正则表达式字符组合

    * 重复

```
\* : 零次或多次匹配前面的字符或子表达式。例子：grep 'se*' test.txt\
\+ : 一次或多次匹配前面的字符或表达式.例子：grep 'se\+' test.txt.注意这里加号前面要加反斜杠
? : 零次或一次匹配前面的字符或表达式.如：grep 'se\?' test.txt.注意？前面也要加反斜杠
括号的使用 ：grep '\(se\)*' test.txt。注意括号前面要加反斜杠
指定重复次数 : grep '[0-9]\{2,3\}' passwd
```

## 二.sed 行编辑器

sed是一种流编辑器，它是文本处理中非常重要的工具，能够完美的配合正则表达式使用，功能不同凡响。处理时，把当前处理的行存储在临时缓冲区中，称为“模式空间”（pattern [space](https://www.centos.bz/tag/space/)），接着用sed命令处理缓冲区中的内容，处理完成后，把缓冲区的内容送往屏幕。接着处理下一行，这样不断重复，直到文件末尾。文件内容并没有 改变，除非你使用重定向存储输出。Sed主要用来自动编辑一个或多个文件；简化对文件的反复操作；编写转换程序等。

### 命令格式

```
sed [options] 'command' file(s)
sed [options] -f scriptfile file(s)
```

options常用选项

```
-e<script>或--expression=<script>：以选项中的指定的script来处理输入的文本文件；

-n或--quiet或——silent：仅显示script处理后的结果；
```

command常用

```
a\ 在当前行下面插入文本。
i\ 在当前行上面插入文本。
c\ 把选定的行改为新的文本。
d 删除，删除选择的行。
n 读取下一个输入行，用下一个命令处理新的行而不是用第一个命令。
s 替换指定字符
p 打印模板块的行。
q 退出Sed。
r file 从file中读行。
w file 写并追加模板块到file末尾。
```

1、p 打印相关的行

```
nl passwd|sed -n '10p' //打印第10行内容
sed -n 'p' passwd
sed -n '/root/p' passwd //正则匹配打印
nl passwd|sed -n '10,20p' //打印第10行到20行
nl passwd|sed -n '/news/,/nobody/p' //用正则来指定一个行的范围
nl passwd|sed -n '10,20!p'  //不选择10到20行,!代表取反
nl passwd|sed -n '1~2p' //间隔行，会输出1,3,5....行
```

注意，这里一定要加上-n选项，否则每条数据会显示同样的2行。并且无关的其他内容也会显示出来

2、a 在行后面增加内容

```
root@siguorui-OptiPlex-7010:~# nl passwd|sed '2a **************'
     1    root:x:0:0:root:/root:/bin/bash
     2    daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
**************
     3    bin:x:2:2:bin:/bin:/usr/sbin/nologin

nl passwd|sed '1,2a **************' //在范围内的每一行后面都插入
```

3、i在行前面插入

```
root@siguorui-OptiPlex-7010:~# nl passwd|sed '1,2i **************'
**************
     1    root:x:0:0:root:/root:/bin/bash
**************
     2    daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
```

4、c把选定的行改为新的文本

```
root@siguorui-OptiPlex-7010:~# nl passwd|sed '1c abcd'
abcd
     2    daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin

 //与a,i不同的时，如果这里是一个行的范围则是把这个范围内容替换为当前内容   
root@siguorui-OptiPlex-7010:~# nl passwd|sed '1,3c abcd'
abcd
     4    sys:x:3:3:sys:/dev:/usr/sbin/nologin
```

5、d删除行

```
root@siguorui-OptiPlex-7010:~# nl passwd | sed '/root/d'
     2    daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
     3    bin:x:2:2:bin:/bin:/usr/sbin/nologin
```

应用案例

```
在文件的末尾插入2行
nl passwd | sed '$a \    abcd \n    linux'

    49    memcache:x:126:132:Memcached,,,:/nonexistent:/bin/false
    50    postfix:x:127:133::/var/spool/postfix:/bin/false
    51    mongodb:x:128:65534::/var/lib/mongodb:/bin/false
    abcd
    linux

    删除文件中的空行,^$直接相连代表空行
    nl passwd | sed '/^$/d'
```

6、s替换命令

```
sed 's/false/true/' passwd
输出：
...
sphinxsearch:x:124:131::/home/sphinxsearch:/bin/true
sshd:x:125:65534::/var/run/sshd:/usr/sbin/nologin
memcache:x:126:132:Memcached,,,:/nonexistent:/bin/true
postfix:x:127:133::/var/spool/postfix:/bin/true

sed 's/:/%/g' passwd  //加g全局替换
输出：
sphinxsearch%x%124%131%%/home/sphinxsearch%/bin/false
sshd%x%125%65534%%/var/run/sshd%/usr/sbin/nologin
memcache%x%126%132%Memcached,,,%/nonexistent%/bin/false
postfix%x%127%133%%/var/spool/postfix%/bin/false

过滤ifconfig中的ip

eno1      Link encap:以太网  硬件地址 f8:b1:56:c5:e7:44  
          inet 地址:172.19.5.175  广播:172.19.5.255  掩码:255.255.255.0
          inet6 地址: fe80::c422:e82d:ad66:7a92/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  跃点数:1
          接收数据包:35171885 错误:53864 丢弃:0 过载:0 帧数:29047
          发送数据包:25049325 错误:0 丢弃:0 过载:0 载波:0
          碰撞:0 发送队列长度:1000
          接收字节:8124495140 (8.1 GB)  发送字节:4549284803 (4.5 GB)
          中断:20 Memory:f7f00000-f7f20000

 ifconfig eno1 | sed -n '/inet /p'|sed 's/inet.*地址://'|sed 's/广播.*$//'

 输出：
 172.19.5.175
```

### 高级操作命令

1、多个sed命令，用{}包住,‘;’隔开

```
删除44-48行内容，然后将false替换为true
nl passwd|sed '{44,48d;s/false/true/}'

    41    statd:x:121:65534::/var/lib/nfs:/bin/true
    42    mysql:x:1001:1001::/home/mysql:/sbin/nologin
    43    www:x:1002:1002::/home/www:/sbin/nologin
    49    memcache:x:126:132:Memcached,,,:/nonexistent:/bin/true
    50    postfix:x:127:133::/var/spool/postfix:/bin/true
    51    mongodb:x:128:65534::/var/lib/mongodb:/bin/true
```

2、n 读取下一个输入行

```
//n的用法
root@siguorui-OptiPlex-7010:~# nl passwd|sed -n '{p;n}'
     1    root:x:0:0:root:/root:/bin/bash
     3    bin:x:2:2:bin:/bin:/usr/sbin/nologin
     5    sync:x:4:65534:sync:/bin:/bin/sync
     7    man:x:6:12:man:/var/cache/man:/usr/sbin/nologin

提示： nl passwd|sed -n '{1~2p}'  前面讲到的,~也可以实现同样的效果
```

3、&替换固定字符串,&代表前面匹配到的字符

```
//姓名和后面的内容加空格隔开
root@siguorui-OptiPlex-7010:~# sed 's/^[a-z_]\+/&     /' passwd
root     :x:0:0:root:/root:/bin/bash
daemon     :x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin     :x:2:2:bin:/bin:/usr/sbin/nologin

//用户名的首字母转换为大写
//元字符\u \l(对首字母大小写转换) \U \L(对一串字符大小写转换)，转换为大写小写字符

//小写u,替换用户名首字母
root@siguorui-OptiPlex-7010:~# sed 's/^[a-z_]\+/\u&/' passwd
Root:x:0:0:root:/root:/bin/bash
Daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
Bin:x:2:2:bin:/bin:/usr/sbin/nologin

//大写U，用户名全部替换为大写
root@siguorui-OptiPlex-7010:~# sed 's/^[a-z_]\+/\U&/' passwd
ROOT:x:0:0:root:/root:/bin/bash
DAEMON:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
BIN:x:2:2:bin:/bin:/usr/sbin/nologin
```

4、()的使用

```
//从passwd文件中，提取出username,uid,gid.  \1，\2，\3代表前面()匹配到字符
root@siguorui-OptiPlex-7010:~# sed 's/\(^[a-z_-]\+\):x:\([0-9]\+\):\([0-9]\+\):.*$/USER:\1    UID:\2   GID:\3/' passwd
USER:root    UID:0   GID:0
USER:daemon    UID:1   GID:1
USER:bin    UID:2   GID:2
USER:sys    UID:3   GID:3
USER:sync    UID:4   GID:65534
```

5、-r复制指定文件插入到匹配行。-w复制匹配行拷贝到指定文件

```
//123.txt文件中有3行，全是数字。abc.txt文件中有3行，全是字母
//下面命令的实现结果，读取123.txt的内容，复制到匹配的abc.txt文件的第一行，文件内容均不改变
root@siguorui-OptiPlex-7010:~# sed '1r 123.txt' abc.txt
qwefadssa
1232323223
32343434
23333
trwrda
asdfasdf

//下面命令的实现结果，匹配abc.txt文件的第二行，写入到123.txt文件中。123.txt文件会发生变化,abc.txt文件内容不变
root@siguorui-OptiPlex-7010:~# sed '2w 123.txt' abc.txt
qwefadssa
trwrda
asdfasdf
root@siguorui-OptiPlex-7010:~# cat 123.txt
trwrda

//总结
sed '2w或2r 文件A' 文件B
匹配的文件都是针对文件B来说的，读或写都是针对文件A来说的
```

6、q找到指定结果后就提前退出

```
root@siguorui-OptiPlex-7010:~# nl passwd |sed '2q'
     1    root:x:0:0:root:/root:/bin/bash
     2    daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
root@siguorui-OptiPlex-7010:~# nl passwd |sed '/root/q'
     1    root:x:0:0:root:/root:/bin/bash
root@siguorui-OptiPlex-7010:~#
```

## 三、awk

AWK是一种处理文本文件的语言，是一个强大的文本分析工具。特点是处理灵活，功能强大。可实现统计、制表以及其他功能。

之所以叫AWK是因为其取了三位创始人 Alfred Aho，Peter Weinberger, 和 Brian Kernighan 的Family Name的首字符。

### 格式

命令行格式  
`awk [options] 'command' file(s)`

脚本格式  
`awk -f awk-script-file file(s)`

命令形式:

```
awk [-F|-f|-v] ‘BEGIN{} //{command1; command2} END{}’ file
```

* [-F|-f|-v] 大参数，-F指定分隔符，-f调用脚本，-v定义变量 var=value

`' '` 引用代码块

* BEGIN 初始化代码块，在对每一行进行处理之前，初始化代码，主要是引用全局变量，设置FS分隔符
* // 匹配代码块，可以是字符串或正则表达式
* {} 命令代码块，包含一条或多条命令
* ； 多条命令使用分号分隔
* END 结尾代码块，在对每一行进行处理之后再执行的代码块，主要是进行最终计算或输出结尾摘要信息

### 常用内置参数

* $0，$1，$2… 表示整个当前行
* $1 每行第一个字段
* NF 字段数量变量
* NR 每行的记录号，多文件记录递增
* FILENAME 文件名

1、常用内置参数,$1,$2….。通过分隔符指定，按顺序依次为$1,$2…。默认分隔符为空格

```
awk -F ':' '{print "USERNAE:"$1"\t""UID:"$3}' passwd
```

2、NR，NF，FILENAME

```
awk -F ':' '{print "Line:"NR,"Col:"NF,"USER:"$1}' passwd
```

3、运用printf指定格式来打印

```
awk -F ':' '{printf("Line:%3s Col:%s User:%s\n",NR,NF,$1)}' passwd

root@siguorui-OptiPlex-7010:~# awk -F ':' '{printf("Line:%3s Col:%s User:%s\n",NR,NF,$1)}' passwd
Line:  1 Col:7 User:root
Line:  2 Col:7 User:daemon
Line:  3 Col:7 User:bin
Line:  4 Col:7 User:sys
...
```

4、使用if

```
awk -F ':' '{if ($3>100) printf("Line:%3s Col:%s User:%s\n",NR,NF,$1)}' passwd
```

5、正则和命令结合使用

```
awk -F ':' '/root/{print $1}' passwd

root@siguorui-OptiPlex-7010:~# awk -F ':' '/root/{print $1}' passwd
root
```

6、使用BEGIN和END来制表

```
awk -F ':' 'BEGIN{print "line col user"}{print NR" |"NF" |"$1}END{print "----------------"FILENAME}' passwd
```

7、使用BEGIN和END来统计一个目录下文件总计大小

```
ls -l|awk 'BEGIN{size=0}{size+=$5}END{print " size is "size/1024/1024"M"}'
```

8、统计passwd中不为空的行数。$1!~，~代表匹配后面的正则,!~代表不匹配。/^$/正则匹配空行

```
awk -F ':' 'BEGIN{count=0}$1!~/^$/{count++}END{print " count ="count}' passwd
```

9、统计结果放到数组中，并打印输出

```
awk -F ':' 'BEGIN{count=0}{if ($3>100) name[count++]=$1}END{for(i=0;i<count;i++) print i,name[i]}' passwd

root@siguorui-OptiPlex-7010:~# awk -F ':' 'BEGIN{count=0}{if ($3>100) name[count++]=$1}END{for(i=0;i<count;i++) print i,name[i]}' passwd
0 nobody
1 systemd-network
2 systemd-resolve
3 systemd-bus-proxy
4 syslog
```
