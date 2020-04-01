
## 常用
* `whereis file/folder`用于查找文件/文件夹
* `history` 查看历史执行命令


* `wget url`
* `wget -c url -O 重命名文件名`  下载文件


### 文件文件夹操作
#### 复制
* `cp  [源文件或目录]  [目标文件或目录]`
* ` cp /TEST/test1/test01  /TEST/test2` 假设复制源文件test1下的test01文件，目标目录为test2

* `cp -r /TEST/test1/.  /TEST/test2` 把test1中的文件夹及文件夹中所有文件复制到test2中

#### 移动
* `mv [源文件或目录]  [将要移动到的目录]`
* `mv  mongo.conf /etc` 将mongo.conf文件移动到`/etc`目录下
* `mv -r  /usr/local/mongodb  /etc` 将`/usr/local`路径下的mongodb文件夹移动到`/etc`目录下

#### 删除
* `rm file` 删除文件
* `rm -r folder`  删除文件夹
* `rm -f  file` 强制删除

#### 新建
* `touch file` 新建空白文件
* `mkdir folder` 在当前目录下生成a目录


#### 文件读写及权限
* `vim mongo.conf` 编辑文件
* `q!` 不保存退出
* `qw!` 强制保存退出
* `cat mongo.conf`  查看文件内容
* `ls -l 文件名` 查看linux文件的权限
* `ls -la 文件夹名称（所在目录）` 查看linux文件夹的权限
* `ll` 查看当前目录下各文件和目录的属性
* `sudo chmod -（代表类型）×××（所有者）×××（组用户）×××（其他用户） 文件名`
```
r=4 表示可读取，w=2 表示可写入，x=1 表示可执行
若要rwx属性则4+2+1=7；   
若要rw-属性则4+2=6；   
若要r-x属性则4+1=7。
```
* `sudo chmod 777 file` 每个人都有读和写以及执行的权限

### 压缩及解压缩
```
-c: 建立压缩档案
-x：解压
-t：查看内容
-r：向压缩归档文件末尾追加文件
-u：更新原压缩包中的文件
这五个是独立的命令，压缩解压都要用到其中一个，可以和别的命令连用但只能用其中一个。

下面的参数是根据需要在压缩或解压档案时可选的。
-z：有gzip属性的
-j：有bz2属性的
-Z：有compress属性的
-v：显示所有过程
-O：将文件解开到标准输出

参数-f是必须的
-f: 使用档案名字，切记，这个参数是最后一个参数，后面只能接档案名。
```
* `tar --cvf jpg.tar *.jpg` //将目录里所有jpg文件打包成tar.jpg
* `tar --czf jpg.tar.gz *.jpg` //将目录里所有jpg文件打包成jpg.tar后，并且将其用gzip压缩，生成一个gzip压缩过的包，命名为jpg.tar.gz
* `tar --cjf jpg.tar.bz2 *.jpg` //将目录里所有jpg文件打包成jpg.tar后，并且将其用bzip2压缩，生成一个bzip2压缩过的包，命名为jpg.tar.bz2
* `tar --cZf jpg.tar.Z *.jpg` //将目录里所有jpg文件打包成jpg.tar后，并且将其用compress压缩，生成一个umcompress压缩过的包，命名为jpg.tar.Z


* `tar --xvf file.tar` //解压 tar包
* `tar -xzvf file.tar.gz` //解压tar.gz
* `tar -xjvf file.tar.bz2` //解压 tar.bz2tar --xZvf file.tar.Z //解压tar.Z


* `tar -tf aaa.tar.gz`在不解压的情况下查看压缩包的内容

### scp 
用于Linux之间复制文件和目录

[详细介绍](https://www.runoob.com/linux/linux-comm-scp.html)

```
scp [可选参数] file_source file_target 

// 从本地复制到远程
scp [参数] local_file remote_username@remote_ip:remote_folder

// 远程复制到本地
scp [参数] remote_username@remote_ip:remote_folder local_folder
```
* -q： 不显示传输进度条。
* -C： 允许压缩。（将-C标志传递给ssh，从而打开压缩功能）
* -r： 递归复制整个目录。
* -v：详细方式显示输出。scp和ssh(1)会显示出整个过程的调试信息。这些信息用于调试连接，验证和配置问题。

### tree
```
tree -L n   // 展示n层结构
tree -d     // 只展示目录
```
- -a 显示所有文件和目录。
- -C 在文件和目录清单加上色彩，便于区分各种类型。
- -d 显示目录名称而非内容。
- -D 列出文件或目录的更改时间。
- -i 不以阶梯状列出文件或目录名称。。
- -l 如遇到性质为符号连接的目录，直接列出该连接所指向的原始目录。
- -n 不在文件和目录清单加上色彩。
- -N 直接列出文件和目录名称，包括控制字符。
- -p 列出权限标示。
- -P <范本样式> 只显示符合范本样式的文件或目录名称。
- -q 用”?”号取代控制字符，列出文件和目录名称。
- -s 列出文件或目录大小。
- -t 用文件和目录的更改时间排序。

### curl
[参考](https://man.linuxde.net/curl)

curl命令是一个利用URL规则在命令行下工作的文件传输工具。它支持文件的上传和下载，所以是综合传输工具，但按传统，习惯称curl为下载工具。作为一款强力工具，curl支持包括HTTP、HTTPS、ftp等众多协议，还支持POST、cookies、认证、从指定偏移处下载部分文件、用户代理字符串、限速、文件大小、进度条等特征。

#### 示例

选项-o将下载数据写入到指定名称的文件中，并使用--progress显示进度条：
```
curl http://man.linuxde.net/test.iso -o filename.iso --progress
######################################### 100.0%
```

使用--cookie "COKKIES"选项来指定cookie，多个cookie使用分号分隔：
```
curl http://man.linuxde.net --cookie "user=root;pass=123456"
```

#### 参数说明
- `-a/--append`	上传文件时，附加到目标文件
- `-o/--output`	把输出写到该文件中
- `-O/--remote-name`	把输出写到该文件中，保留远程文件的文件名
- `-u/--user <user[:password]>`	设置服务器的用户和密码
- `-U/--proxy-user <user[:password]>`	设置代理用户名和密码



### 端口以及进程状态检查
* `lsof -i:8080` 查看8080端口哪个进程在使用
* `netstat -apn|grep mongo` 查看mongo进程的端口ip使用
* `ps aux | less` : 查看系统中所有进程
* `netstat -apn|grep a` 检查a服务的监听等信息
* `telnet xxx.xxx.xxx.xxx` port 端口测试



### 小技巧
* `ctrl+a` 光标快速移动到行首
* `ctrl+e` 光标快速移动到行尾
* `ctrl+u` 快速删除光标到行首的命令
* `ctrl+k` 快速删除光标到行尾的命令
* `按一下Esc，放手在按一次右ctrl`，可以调用上次命令的参数
* `lsb_release -a` 查看系统版本

