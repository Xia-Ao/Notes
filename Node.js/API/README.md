
Node API 笔记，边学边记

## Path

* normalize() 规范化path，并解析`.`,`..`

#### join（）
拼接path 片段

#### resolve()
相对路径转绝对路径

#### 文件名
* basename() 路径最后一部分
* dirname() 目录名
* extname() 扩展名


## Buffer

## fs 文件系统
* `fs.readFile(path, callback)` 异步读取文件内容
* `fs.readFileSync(path, callback)` 同步读取文件内容
* `fs.open(path, mode, callback)` 异步打开文件
* `fs.stat(path, cb(err, stats))` 异步获取文件相关信息，会将stats类的实例返回给其回调函数
  * `stats.isFile()`
  * `stats.isDirectory`
  * `stats.isBlockDevice` 是否块设备 ？？ 不懂
  * `stats.isCharacterDevice` 是否字符设备
  * `stats.isSymbolicLink` 是否软链接 ?? 不懂
  * `stats.isFIFO`
  * `stats.isSocket`
* `fs.writeFile(file, data[,options], cb)` 异步写入文件
* `fs.writeFileSync(file, data[,options], cb)` 同步写入文件
* `fs.read(fd, buffer, offset, length, position, callback)`  异步读取文件格式 文件的一些size信息
* `fs.close(fd, cb)` 关闭文件
* `fs.mkdir(path[,mode], cb)` 创建文件目录
* `fs.readdir(path, cb)` 创建文件目录
* `fs.rmdir(path, cb)` 删除目录
* `fs.createReadStream(path[,options])` 返回readStream流
* `fs.createWriteStream(path[,options])` 返回createStream流
* 

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

####

