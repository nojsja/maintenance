### 老男孩shell企业面试题合集
__________________________

#### 企业面试题1：监控Mysql
>生产实战案例）：监控MySQL主从同步是否异常，如果异常，则发送短信或者邮件给管理员。提示：如果没主从同步环境,可以用下面文本放到文件里读取来模拟。  

1. 阶段1：开发一个守护进程脚本每30秒实现检测一次。
2. 阶段2：如果同步出现如下错误号（1158,1159,1008,1007,1062），则跳过错误。
3. 阶段3：请使用数组技术实现上述脚本（获取主从判断及错误号部分）

```sh
$: mysql -uroot -p'oldboy' -S /data/3307/mysql.sock -e "show slavestatus\G;"  

# *************************** 1. row *************************** #
               Slave_IO_State:Waiting for master to send event
                  Master_Host:10.0.0.179   #当前的mysql master服务器主机
                  Master_User: rep
                  Master_Port: 3306
                Connect_Retry: 60
              Master_Log_File:mysql-bin.000013
         Read_Master_Log_Pos: 502547
               Relay_Log_File:relay-bin.000013
                Relay_Log_Pos:251
        Relay_Master_Log_File:mysql-bin.000013
             Slave_IO_Running:Yes
           Slave_SQL_Running: Yes
              Replicate_Do_DB:
         Replicate_Ignore_DB: mysql
          Replicate_Do_Table:
      Replicate_Ignore_Table:
     Replicate_Wild_Do_Table:
 Replicate_Wild_Ignore_Table:
                   Last_Errno: 0
                   Last_Error:
                 Skip_Counter: 0
         Exec_Master_Log_Pos: 502547
              Relay_Log_Space:502986
              Until_Condition:None
               Until_Log_File:
                Until_Log_Pos: 0
          Master_SSL_Allowed: No
          Master_SSL_CA_File:
          Master_SSL_CA_Path:
              Master_SSL_Cert:
           Master_SSL_Cipher:
               Master_SSL_Key:
       Seconds_Behind_Master: 0   #和主库比同步延迟的秒数，这个参数很重要
Master_SSL_Verify_Server_Cert: No
                Last_IO_Errno: 0
                Last_IO_Error:
               Last_SQL_Errno: 0
               Last_SQL_Error:
```

#### 企业面试题2：批量创建文件
>使用for循环在/oldboy目录下通过随机小写10个字母加固定字符串oldboy批量创建10个html文件，名称例如为：  

```sh
coaolvajcq_oldboy.html  qnvuxvicni_oldboy.html  vioesjmcbu_oldboy.html
gmkhrancxh_oldboy.html  tmdjormaxr_oldboy.html  wzewnojiwe_oldboy.html
jdxexendbe_oldboy.html  ugaywanjlm_oldboy.html  xzzruhdzda_oldboy.html
qcawgsrtkp_oldboy.html  vfrphtqjpc_oldboy.html
```

#### 企业面试题3：批量更改文件名
>将以上文件名中的oldboy全部改成oldgirl(用for循环实现),并且html改成大写。  

#### 企业面试题4：批量创建系统账号
>批量创建10个系统帐号oldboy01-oldboy10并设置密码（密码为随机8位字符串）。  

#### 企业面试题5：判断在线用户
>写一个脚本，实现判断10.0.0.0/24网络里，当前在线用户的IP有哪些（方法有很多）  

#### 企业面试题6：DOS
>写一个脚本解决DOS***生产案例
提示：根据web日志或者或者网络连接数，监控当某个IP并发连接数或者短时内PV达到100，即调用防火墙命令封掉对应的IP，监控频率每隔3分钟。防火墙命令为：iptables -I INPUT -s 10.0.1.10 -j DROP。  

#### 企业面试题7：Mysql
>开发mysql多实例启动脚本：
已知mysql多实例启动命令为：mysqld_safe--defaults-file=/data/3306/my.cnf &
停止命令为：mysqladmin -u root -poldboy123 -S /data/3306/mysql.sockshutdown
请完成mysql多实例启动启动脚本的编写
要求：用函数，case语句、if语句等实现。  

#### 企业面试题8：Mysql
>如何实现对MySQL数据库进行分库备份，请用脚本实现  

#### 企业面试题9：Mysql
>如何实现对MySQL数据库进行分库加分表备份，请用脚本实现    

#### 企业面试题10：字符串操作
>bash for循环打印下面这句话中字母数不大于6的单词(昆仑万维面试题)  

#### 企业面试题11：字符操作
>开发shell脚本分别实现以脚本传参以及read读入的方式比较2个整数大小。以屏幕输出的方式提醒用户比较结果。注意：一共是开发2个脚本。当用脚本传参以及read读入的方式需要对变量是否为数字、并且传参个数做判断。  

#### 企业面试题12：流程控制
>打印选择菜单，一键安装Web服务   

要求：
1. 当用户输入1时，输出“startinstalling lamp.”然后执行/server/scripts/lamp.sh，脚本内容输出"lampis installed"后退出脚本；
2. 当用户输入2时，输出“startinstalling lnmp.”然后执行/server/scripts/lnmp.sh输出"lnmpis installed"后退出脚本;
3. 当输入3时，退出当前菜单及脚本；
4. 当输入任何其它字符，给出提示“Input error”后退出脚本。
5. 要对执行的脚本进行相关条件判断，例如：脚本是否存在，是否可执行等。

#### 企业面试题13：服务监控
1. 监控web服务是否正常，不低于3种监控策略。
2. 监控db服务是否正常，不低于3种监控策略。
要求间隔1分钟，持续监控。

#### 企业面试题14：服务监控
>监控memcache服务是否正常，模拟用户（web客户端）检测，
使用nc命令加上set/get来模拟检测，以及监控响应时间及命中率。  

#### 企业面试题15：文件监控
>监控web站点目录（/var/html/www）下所有文件是否被恶意篡改（文件内容被改了），如果有就打印改动的文件名（发邮件），定时任务每3分钟执行一次(10分钟时间完成)。  

#### 企业面试题16：服务启动脚本编写
>企业案例:写网络服务独立进程模式下rsync的系统启动脚本
例如：/etc/init.d/rsyncd{start|stop|restart} 。  

要求：
1. 要使用系统函数库技巧。
2. 要用函数，不能一坨SHI的方式。
3. 可被chkconfig管理。  

#### 企业面试题17：流程控制
1. 执行脚本后，想去的同学输入英文名字全拼，产生随机数01-99之间的数字，数字越大就去参加项目实践，前面已经抓到的数字，下次不能在出现相同数字。
2. 第一个输入名字后，屏幕输出信息，并将名字和数字记录到文件里，程序不能退出继续等待别的学生输入  

#### 企业面试题18：数字字符处理
已知下面的字符串是通过RANDOM随机数变量md5sum|cut-c 1-8截取后的结果，请破解这些字符串对应的md5sum前的RANDOM对应数字？  
21029299  
00205d1c  
a3da1677  
1f6d12dd  
890684b  


#### 企业面试题19：网络
批量检查多个网站地址是否正常  
要求：shell数组方法实现，检测策略尽量模拟用户访问思路  
http://www.etiantian.org  
http://www.taobao.com  
http://oldboy.blog.51cto.com  
http://10.0.0.7  

#### 企业面试题20：字符处理
1. 按单词出现频率降序排序！
2. 按字母出现频率降序排序！  
the squid project provides a number of resources toassist users design,implement and support squid installations. Please browsethe documentation and support sections for more infomation  

#### 企业面试题21：字符处理
>输出正方形、等腰三角形、直角梯形  

#### 企业面试题22：web
>开发通过web界面展示监控Nginx代理节点状态  

#### 企业面试题23：LVS
>手工开发ipvsadm管理lvs的脚本ip_vs，实现：/etc/init.d/lvs {start|stop|restart}  

#### 企业面试题24：LVS
>模拟keepalived健康检查功能管理LVS节点，当节点挂掉（检测2次，间隔2秒）从服务器池中剔除，好了（检测2次，间隔2秒）加进来，提示：利用ipvsadm命令实现添加和减少LVS节点。  

#### 企业面试题25：LVS
>发LVS客户端设置VIP以及抑制ARP的管理脚本，实现：/etc/init.d/lvsclient {start|stop|restart}  

#### 企业面试题26：LVS
>模拟keepalved vrrp功能，监听主节点，如果主节点不可访问则备节点启动并配置LVS实现接管主节点的资源提供服务（提醒：注意ARP缓存）  

#### 企业面试题27：字符处理和流程控制
>请用shell或Python编写一个正方形(oldboy_square.sh)，接收用户输入的数字。  

```sh
Please Enter a number:5
++++++++++
++++++++++
++++++++++
++++++++++
++++++++++

Please Enter a number:9
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
■■■■■■■■■
```


#### 企业面试题28：字符处理和流程控制
>请用shell或Python编写一个等腰三角形(oldboy2_triangle.sh)，接收用户输入的数字。  

#### 企业面试题29：字符处理和流程控制
>请用shell或Python编写一个画直角梯形程序(oldboy4.sh)，接收用户输入的参数n，m  

#### 企业面试题30：部署
>写一套简单的企业代码上线发布系统案例，利用SVN对代码及配置文件进行管理，在办公室服务器上从svn取出指定版本的代码和配置，发布到IDC机房分发机服务器上，在分发服务器或者负载均衡器上或者应用服务器本地实现代码平滑发布、上线、回滚脚本（具体设计请参考课堂讲解的企业代码发布方案）。  

#### 企业面试题31：部署
>Git+Saltstack实现代码的线上发布及管理方案  
