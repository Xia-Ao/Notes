
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

#### 压缩及解压缩
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

#### 文件读写及权限
* `vim mongo.conf` 编辑文件
* `q!` 不保存退出
* `qw!` 强制保存退出
* `cat mongo.conf`  查看文件内容
* `ls -l 文件名` 查看linux文件的权限
* `ls -ld 文件夹名称（所在目录）` 查看linux文件夹的权限
* `sudo chmod -（代表类型）×××（所有者）×××（组用户）×××（其他用户） 文件名`
```
r=4 表示可读取，w=2 表示可写入，x=1 表示可执行
若要rwx属性则4+2+1=7；   
若要rw-属性则4+2=6；   
若要r-x属性则4+1=7。
```
* `sudo chmod 777 file` 每个人都有读和写以及执行的权限
* ``
* ``


### 端口以及进程状态检查
* `lsof -i:8080` 查看8080端口哪个进程在使用
* `netstat -apn|grep mongo` 查看mongo进程的端口ip使用
* `ps aux | less` : 查看系统中所有进程
