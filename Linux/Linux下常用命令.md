###复制
copy ,cp，该命令的功能是将给出的文件或目录拷贝到另外一个文件或目录中。
语法： cp [选项]  源文件或目录  目标文件或目录
####1、普通复制
例如;在/TEST目录下新建test1和test2两个子文件夹。 假设复制源文件test1下的test01文件，目标目录为test2
` cp /TEST/test1/test01  /TEST/test2`
####2、对一个文件夹中的全部文件复制到另外一个文件夹中去
`cp -r /TEST/test1/.  /TEST/test2`
把test1中的文件夹及文件复制到test2中