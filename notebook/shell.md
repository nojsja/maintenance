### shell基础
____________

#### shell运算符

1. shell中各种括号的使用[] () {} [[]]  
  1) 纯{}用法  
    * 拓展功能：例如：ls {name1,name2}.sh ；touch {1..3}.sh;   
    * 代码组织功能：例如：多条命令在当前shell中执行 { cmd1;cmd2;cmd3; }，注意cmd1与{之间有空格，cmd3后边有;  

  2) $结合{}用法
    * 取值拓展功能：例如：var=dreamer;echo ${var}way 输出dreamerway  
    * 替换结构：${var:-string},${var:+string},${var:=string},${var:?string}  
    ${var:-string}和${var:=string}: 若变量var为空，则用在命令行中用string来替换${var:-string}，否则变量var不为空时，则用变量var的值来替换${var:-string}；  

    对于${var:=string}的替换规则和${var:-string}是一样的，所不同之处是${var:=string}若var为空时，用string替换${var:=string}的同时，把string赋给变量var： ${var:=string}很常用的一种用法是，判断某个变量是否赋值，没有的话则给它赋上一个默认值。

    ${var:+string}的替换规则和上面的相反，即只有当var不是空的时候才替换成string，若var为空时则不替换或者说是替换成变量 var的值，即空值。(因为变量var此时为空，所以这两种说法是等价的)  

    ${var:?string}替换规则为：若变量var不为空，则用变量var的值来替换${var:?string}；若变量var为空，则把string输出到标准错误中，并从脚本中退出。我们可利用此特性来检查是否设置了变量的值。

  3) 中括号[]用法实例
    * 单中括号  
      用于条件测试语句，括号本身是一个运算符，两边需要加空格，且不可以包含逻辑运算符" && || "等，只能使用关系运算符" -eq -ne -gt -lt -ge -le " 和 布尔运算符 " -o -a ! "  
      用于数组，echo ${array[@]}
    * 双中括号  
      双中括号是bash语言的关键字，不是命令，括号中可以使用逻辑运算符。

  4) 小括号()用法实例
    * 子shell运行命令
      命令块会在子shell中运行，例如：(cmd1;cmd2;cmd3) 这三条命令的执行不会影响当前的shell环境。  
    * 数组初始化  
      例如：array=(1 2 3 4 5)  
    * for循环  
      双括号算术运算比较功能：例如：for((i=0;i<9;i++)) 如果不采用双括号可用for i in `seq 0 9`或者for i in {0..9}代替  


#### shell函数

#### shell流程控制

#### shell文件操作


### shell进阶
____________
