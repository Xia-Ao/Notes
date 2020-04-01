# shell 脚本
在很多时候，尤其是自动化部署，运维层面，或者工程构建的工程化过程中，我们经常会用到很多shell脚本来帮我们执行很多进程。

## 新建一个sh文件

新建一个`test.sh`文件，在里面写入你想要执行的脚本。例如：

```sh
echo "输出一段内容"
```
echo 命令
- -n 不要输出衍生的新行
- -e 启用反斜线转义解释
- -E 禁用反斜线转义解释（默认）

保存之后一定要改变权限，使脚本具有执行权限，然后再执行脚本
```bash
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```

## shell语法

### shell变量

#### 定义变量

定义变量时，变量名不加美元符号

```sh
your_name="xiaxia"
```

注意：
* 变量名和等号之间不能有空格
* 命名只能使用英文字母，数字和下划线，首个字符不能以数字开头。
* 不能使用标点符号。
* 不能使用bash里的关键字（可用help命令查看保留关键字）

除了显式地直接赋值，还可以用语句给变量赋值，如：

```sh
for file in `ls /etc`
# 或
for file in $(ls /etc)
```

#### 使用变量
只需要在定义过的变量前面加上`$`即可， 变量外面的`{}`加不加都行，只是为了辅助识别变量， 推荐加上`{}`

```sh
your_name="qinjx"
echo $your_name
echo ${your_name}
```

#### 只读变量

```sh
myUrl="http://www.google.com"
readonly myUrl
```

#### 删除变量
unset命令删除变量

```sh
unset variable_name
```
#### 变量类型
* **局部变量**：局部变量在脚本或命令中定义，仅在当前shell实例中有效，其他shell启动的程序不能访问局部变量。
* **环境变量**：所有的程序，包括shell启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候shell脚本也可以定义环境变量。
* **shell变量**： shell变量是由shell程序设置的特殊变量。shell变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了shell的正常运行

### shell字符串
shell中字符串使用单引号`''`、双引号`""`或者什么都不用都可以。

单引号有一些限制，比如不能使用变量，推荐使用双引号

**字符串拼接**

```sh
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```
**获取字符串长度**

```sh
string="abcd"
echo ${#string} #输出 4
```

**提取子字符串**

以下实例从字符串第 2 个字符开始截取 4 个字符：

```sh
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo
```

### shell数组
bash支持一维数组（不支持多维数组），并且没有限定数组的大小。

**定义数组**：

```sh
数组名=(值1 值2 ... 值n)
array_name=(value0 value1 value2 value3)

array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```
**读取数组**

```sh
${数组名[下标]}
valuen=${array_name[n]}

// 使用 @ 符号可以获取数组中的所有元素，例如：
echo ${array_name[@]}

# 取得数组元素的个数 使用@ 或 * 可以获取数组中的所有元素
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

### shell注释
- 单行注释：以 `#` 开头的行就是注释，会被解释器忽略。
- 多行注释：shell多行注释有多种方法，不同的方法性能上有一定差异。
    
    使用`:<<字符 注释内容 字符`
    
    ```sh
    :<<EOF
    注释内容...
    注释内容...
    注释内容...
    EOF

    # EOF 也可以使用其他符号:
    :<<'
    注释内容...
    注释内容...
    注释内容...
    '
    :<<!
    注释内容...
    注释内容...
    注释内容...
    !
    ```

### shell传参

```sh
echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```
执行过程与结果

```bash
$ chmod +x test.sh 
$ ./test.sh 1 2 3

Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```

几个特殊字符处理参数

参数 | 说明 
| ------- | ---
`$#` |	传递到脚本的参数个数
`$*` |	以一个单字符串显示所有向脚本传递的参数。如`$*`用`"`括起来的情况、以"`$1` `$2` … `$n`"的形式输出所有参数。
`$$` |	脚本运行的当前进程ID号
`$!` |	后台运行的最后一个进程的ID号
`$@` |	与`$*`相同，但是使用时加引号，并在引号中返回每个参数。如`$@`用`"`括起来的情况、以`$1` `$2` … `$n` 的形式输出所有参数。
`$-` |	显示Shell使用的当前选项，与set命令功能相同。
`$?` |	显示最后命令的退出状态。0表示没有错误，其他任何值表明有错误。

关于传参的高级用法详细教程请戳这里[传送门](https://www.runoob.com/linux/linux-shell-passing-arguments.html)

### shell 运算符

详细教程请戳这里[传送门](runoob.com/linux/linux-shell-basic-operators.html)

原生bash不支持简单的数学运算，但是可以通过其他命令来实现，例如`awk` 和 `expr`，`expr` 最常用。

`expr` 是一款表达式计算工具，使用它能完成表达式的求值操作。

```sh
val=`expr 2 + 2`
echo "两数之和为 : $val"

# 两数之和为 : 4
```
注意事项：
- **表达式和运算符之间要有空格**，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。这个坑当时踩过，原因找了很久
- 完整的表达式要被 ` ` 包含，注意这个字符不是常用的单引号，在 Esc 键下边。

shell支持以下**算术运算符**

* `+`
* `-`
* `*`
* `/`
* `%`
* `=`
* `==`
* `!=`

**关系运算符**
运算符 |	说明|	举例
|:----:|----|----
`-eq`   |检测两个数是否相等，相等返回 true。	            |`$a -eq $b` 返回 false。
`-ne`   |检测两个数是否不相等，不相等返回 true。             |	`$a -ne $b` 返回 true。
`-gt`	|检测左边的数是否大于右边的，如果是，则返回 true。     |	`$a -gt $b` 返回 false。
`-lt`	|检测左边的数是否小于右边的，如果是，则返回 true。     |	`$a -lt $b` 返回 true。
`-ge`	|检测左边的数是否大于等于右边的，如果是，则返回 true。|	`$a -ge $b` 返回 false。
`-le`	|检测左边的数是否小于等于右边的，如果是，则返回 true。|	`$a -le $b` 返回 true。

运算符全称，方便记忆
> - eq  （equal的缩写），表示等于为真
> - ne    (not equal的缩写），表示不等于为真
> - gt     (greater than的缩写），表示大于为真
> - ge  （greater&equal的缩写），表示大于等于为真
> - lt    （lower than的缩写），表示小于为真
> - le   （lower&equal的缩写），表示小于等于为真

**布尔运算符**

- `!`: 非运算
- `-o`：或运算
- `-a`： 与运算

**逻辑运算符**

- `&&`
- `||`
 
**字符串运算符**
运算符|	说|	举例
----|---|---
`=` |	检测两个字符串是否相等，相等返回 true。|	`$a = $b` 返回 false。
`!=` |	检测两个字符串是否相等，不相等返回 true。|	`$a != $b` 返回 true。
`-z` |	检测字符串长度是否为0，为0返回 true。|	`-z $a` 返回 false。
`-n` |	检测字符串长度是否为0，不为0返回 true。|	`-n "$a"` 返回 true。
`$` |	检测字符串是否为空，不为空返回 true。|	`$a` 返回 true。

**文件测试运算符**

操作符|	说明|	举例
---| --- |--
-b file	|检测文件是否是块设备文件，如果是，则返回 true。|	[ -b $file ] 返回 false。
-c file	|检测文件是否是字符设备文件，如果是，则返回 true。|	[ -c $file ] 返回 false。
-d file	|检测文件是否是目录，如果是，则返回 true。|	[ -d $file ] 返回 false。
-f file	|检测文件是否是普通文件（既不是目录，也不是设备文件），如果是，则返回 true。|	[ -f $file ] 返回 true。
-g file	|检测文件是否设置了 SGID 位，如果是，则返回 true。|	[ -g $file ] 返回 false。
-k file	|检测文件是否设置了粘着位(Sticky Bit)，如果是，则返回 true。|	[ -k $file ] 返回 false。
-p file	|检测文件是否是有名管道，如果是，则返回 true。|	[ -p $file ] 返回 false。
-u file	|检测文件是否设置了 SUID 位，如果是，则返回 true。|	[ -u $file ] 返回 false。
-r file	|检测文件是否可读，如果是，则返回 true。|	[ -r $file ] 返回 true。
-w file	|检测文件是否可写，如果是，则返回 true。|	[ -w $file ] 返回 true。
-x file	|检测文件是否可执行，如果是，则返回 true。|	[ -x $file ] 返回 true。
-s file	|检测文件是否为空（文件大小是否大于0），不为空返回 true。|	[ -s $file ] 返回 true。
-e file	|检测文件（包括目录）是否存在，如果是，则返回 true。|	[ -e $file ] 返回 true。

### shell函数
shell还可以定义函数，超出我的意料之外，


```sh
[ function ] funname [()]
{
    action;
    [return int;]
}
```

```sh
funWithReturn(){
    echo "这个函数会对输入的两个数字进行相加运算..."
    echo "输入第一个数字: "
    read aNum
    echo "输入第二个数字: "
    read anotherNum
    echo "两个数字分别为 $aNum 和 $anotherNum !"
    return $(($aNum+$anotherNum))
}
funWithReturn
echo "输入的两个数字之和为 $? !"
```

**函数参数**

在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 `$n` 的形式来获取参数的值，例如，`$1`表示第一个参数，`$2`表示第二个参数...

注意： 
* `$10` 不能获取第十个参数，获取第十个参数需要`${10}`。当n>=10时，需要使用`${n}来获取参数。



## shell 命令
### echo 输出

```sh
echo "It is a test"

# 换行显示
echo -e "OK! \n" # -e 开启转义 
echo "It is a test"

# 不换行
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"

# 显示结果定向至文件
echo "It is a test" > myfile

# 显示命令执行结果 
# 这里使用的是反引号 `, 而不是单引号 '。
echo `date`
# Thu Jul 24 10:08:46 CST 2014
```

### print 输出
[参考](https://www.runoob.com/linux/linux-shell-printf.html)
- 使用 printf 的脚本比使用 echo 移植性好。
- printf 使用引用文本或空格分隔的参数，外面可以在 printf 中使用格式化字符串，还可以制定字符串的宽度、左右对齐方式等。默认 printf 不会像 echo 自动添加换行符，我们可以手动添加 \n。

```sh
printf  format-string  [arguments...]

$ echo "Hello, Shell"
# Hello, Shell
$ printf "Hello, Shell\n"
# Hello, Shell
```

### test 检查条件
[test](https://www.runoob.com/linux/linux-shell-test.html)命令用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试。


```sh
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi

# 两个数相等!
```

## shell流程控制

和Java、PHP等语言不一样，sh的流程控制不可为空,[参考文档](https://www.runoob.com/linux/linux-shell-process-control.html)


**if-else-if-else**
```sh
if [ condition1 ]
then
    command1
elif condition2 
then 
    command2
else
    commandN
fi
```
**特别说明：** condition1需要用中括号包裹，并且与中括号之间**一定要有空格**，不然会有预发错误

**for循环**

```sh
for i in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

**while 语句**

```sh
int=1
while(( $int<=5 ))
do
    echo $int
    let "int++"
done
```


**case**

```sh
echo '输入 1 到 4 之间的数字:'
echo '你输入的数字为:'
read aNum
case $aNum in
    1)  echo '你选择了 1'
    ;;
    2)  echo '你选择了 2'
    ;;
    3)  echo '你选择了 3'
    ;;
    4)  echo '你选择了 4'
    ;;
    *)  echo '你没有输入 1 到 4 之间的数字'
    ;;
esac
```

**跳出循环**

Shell使用两个命令来实现该功能：break和continue。



## shell 输入/输出重定向
命令|	说明
---|--- |---
command > file	|将输出重定向到 file。
command < file	|将输入重定向到 file。
command >> file	|将输出以追加的方式重定向到 file。
> file	|将文件描述符为 n 的文件重定向到 file。
n >> file	|将文件描述符为 n 的文件以追加的方式重定向到 file。
n >& m	|将输出文件 m 和 n 合并。
n <& m	|将输入文件 m 和 n 合并。
<< tag	|将开始标记 tag 和结束标记 tag 之间的内容作为输入。


## shell include 文件包含
[文档](https://www.runoob.com/linux/linux-shell-include-file.html)

```sh
# 注意点号(.)和文件名中间有一空格
. filename   
# 或
source filename
```

