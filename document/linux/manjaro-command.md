#### video card
---------------
* What gpu(s) do you have?  
`inxi -G`

* What driver are you currently running?  
`mhwd -li`

* To show a list of available drivers for your gpu hardware  
`mhwd -l`  
`inxi -Fxx`

#### Pacman 使用
---------------

* 同步仓库  
只下载已改列表：  
`sudo pacman -Sy`  
有时你可能想要强制下载软件包列表。 为此，请输入：  
`sudo pacman -Syy`

* 更新软件  
更新已安装软件  
`sudo pacman -Su`  
更新软件前检查包列表是否最新:  
`sudo pacman -Syu`  
更新前强制下载包列表：  
`sudo pacman -Syyu`

* 查找软件  
`sudo pacman -Ss leafpad`

* 安装软件  
`sudo pacman -S leafpad`

* 卸载软件  
`sudo pacman -R leafpad`  
卸载同时移除未被其他软件使用的依赖项  
`sudo pacman -Rs leafpad`  
同时再移除软件的配置文件  
`sudo pacman -Rns leafpad`  
在以后再删这些文件也是可以的  
`sudo pacman -Rns $(pacman -Qtdq)`

#### 更新源
---------

* 自动：  
自动设置最快的源  
`sudo pacman-mirrors -g`  
`sudo pacman -Syyu`

* 手动：  
选择源：  
`sudo pacman-mirrors -i`  
重置为自动选择：  
`sudo pacman-mirrors -g -c all`  
切换testing分支  
`sudo pacman-mirrors -g -b testing`  
`sudo pacman -Syyu`  
退回稳定版  
`sudo pacman-mirrors -g -b stable`  
`sudo pacman -Syyuu`
查找中国的源并针对访问速度排序  
`sudo pacman-mirrors -i -c China -m rank`
