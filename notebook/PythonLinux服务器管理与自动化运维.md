#### python生态工具
1. Python内置http.server
```sh
 python3 -m http.server
```

2. json格式化工具
```sh
echo '{"job": "developer"}'
```

3. 验证第三方库是否安装
```sh
# python解释器中执行import
import paramiko
# 命令验证
python -c "import paramiko"
```

3. python包管理器pip
```sh
# pip安装
sudo apt install python-pip
# pip命令
pip install # 安装
pip download # 下载
pip uninstall # 卸载
pip freeze # 按照requirements格式输出已安装包
pip list # 列出当前系统的安装包
pip show # 查看安装包信息
pip check # 检查安装包的依赖是否完整
pip search # 查找
pip wheel # 打包软件到wheel格式
pip hash # 计算安装包的hash值
pip completion # 生成命令补全配置
pip help # 帮助
#
# 按照requirements安装包
pip install -r requirements.txt
# 使用pip命令补全
pip completion --bash >> ~/.profile
source ~/.profile
```

4. 使用第三方源安装
```sh
# 命令行指定
pip install -i https://pypi.douban.com/simple/ flask
# 创建pip的配置文件 ~/.pip/pip.conf，输入以下内容
# [global]
# index-url = https://pypi.douban.com/simple/
```

5. 将软件下载到本地安装
```sh
# 下载到本地
pip install --download=`pwd` -r requirements.txt
# 本地安装
pip install --no-index -f file://`pwd` -r requirements.txt
```

6. 使用ipython高级交互式解析器
```sh
sudo apt install ipython
```
