### 软件和源操作命令
-----------------
\> `pacman -Sy abc` # 和源同步后安装名为abc的包  
\> `pacman -S abc` # 从本地数据库中得到abc的信息，下载安装abc包  
\> `pacman -Sf abc` # 强制安装包abc  
\> `pacman -Ss abc` # 搜索有关abc信息的包  
\> `pacman -Si abc` # 从数据库中搜索包abc的信息  
\> `pacman -Q` # 列出已经安装的软件包  
\> `pacman -Q abc` # 检查 abc 软件包是否已经安装
\> `pacman -Qi abc` # 列出已安装的包abc的详细信息  
\> `pacman -Ql abc` # 列出abc软件包的所有文件  
\> `pacman -Qo /path/to/abc` # 列出abc文件所属的软件包  
\> `pacman -Syu` # 同步源，并更新系统  
\> `pacman -Sy` # 仅同步源  
\> `pacman -Su` # 更新系统  
\> `pacman -R abc` # 删除abc包  
\> `pacman -Rd abc` # 强制删除被依赖的包  
\> `pacman -Rc abc` # 删除abc包和依赖abc的包  
\> `pacman -Rsc abc` # 删除abc包和abc依赖的包  
\> `pacman -Sc` # 清理/var/cache/pacman/pkg目录下的旧包  
\> `pacman -Scc` # 清除所有下载的包和数据库  
\> `pacman -U abc` # 安装下载的abs包，或新编译的abc包  
\> `pacman -Sd abc` # 忽略依赖性问题，安装包abc  
\> `pacman -Su --ignore foo` # 升级时不升级包foo  
\> `pacman -Sg abc` # 查询abc这个包组包含的软件包  
\> `sudo pacman -R $(pacman -Qdtq)` # 清除无用的包  
