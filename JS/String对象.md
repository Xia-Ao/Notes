# JavaScript  String对象

### 参考：

[JavaScript字符串所有API全解密](http://louiszhai.github.io/2016/01/12/js.String/)

### String 对象属性

| 属性 | 描述 |
| :--- | :--- |
| [constructor](http://www.runoob.com/jsref/jsref-constructor-string.html) | 对创建该对象的函数的引用 |
| [length](http://www.runoob.com/jsref/jsref-length-string.html) | 字符串的长度 |
| [prototype](http://www.runoob.com/jsref/jsref-prototype-string.html) | 允许您向对象添加属性和方法 |

### String 对象方法

| 方法 | 描述 |
| :--- | :--- |
| [charAt\(\)](http://www.runoob.com/jsref/jsref-charat.html) | 返回在指定位置的字符。 |
| [charCodeAt\(\)](http://www.runoob.com/jsref/jsref-charcodeat.html) | 返回在指定的位置的字符的 Unicode 编码。 |
| [fromCharCode\(\)](http://www.runoob.com/jsref/jsref-fromcharcode.html) | 将 Unicode 编码转为字符。 |
| [toLowerCase\(\)](http://www.runoob.com/jsref/jsref-tolowercase.html) | 把字符串转换为小写。 |
| [toUpperCase\(\)](http://www.runoob.com/jsref/jsref-touppercase.html) | 把字符串转换为大写。 |
| trim\(\) | 去除字符串两边的空白 |
| [concat\(\)](http://www.runoob.com/jsref/jsref-concat-string.html) | 连接两个或更多字符串，并返回新的字符串。如果有多个空格，则视为一个 |
| [indexOf\(\)](http://www.runoob.com/jsref/jsref-indexof.html) | 返回某个指定的字符串值在字符串中首次出现的位置。 |
| [lastIndexOf\(\)](http://www.runoob.com/jsref/jsref-lastindexof.html) | 从后向前搜索字符串，并从起始位置（0）开始计算返回字符串最后出现的位置。 |
| [**search\(\)**](http://www.runoob.com/jsref/jsref-search.html) | 查找与正则表达式相匹配的值。 |
| [**match\(\)**](http://www.runoob.com/jsref/jsref-match.html) | 查找找到一个或多个正则表达式的匹配。这个蛮有用 |
| [**replace\(\)**](http://www.runoob.com/jsref/jsref-replace.html) | 在字符串中查找匹配的子串， 并替换与正则表达式匹配的子串。 |
| [**split\(\)**](http://www.runoob.com/jsref/jsref-split.html) | 把字符串分割为字符串数组。**注意参数为负的情况** |
| [slice\(start,end\)](http://www.runoob.com/jsref/jsref-slice-string.html) | 提取字符串的片断，并在新的字符串中返回被提取的部分。 |
| [substr\(start,length\)](http://www.runoob.com/jsref/jsref-substr.html) | 从起始索引号提取字符串中指定数目的字符。 |
| [substring\(from , to\)](http://www.runoob.com/jsref/jsref-substring.html) | 提取字符串中两个指定的索引号之间的字符。 |
| [valueOf\(\)](http://www.runoob.com/jsref/jsref-valueof-string.html) | 返回某个字符串对象的原始值。 |

### String HTML 包装方法

| 方法 | 描述 |
| :--- | :--- |
| [anchor\(\)](http://www.runoob.com/jsref/jsref-anchor.html) | 创建 HTML 锚。 |
| [big\(\)](http://www.runoob.com/jsref/jsref-big.html) | 用大号字体显示字符串。 |
| [blink\(\)](http://www.runoob.com/jsref/jsref-blink.html) | 显示闪动字符串。 |
| [bold\(\)](http://www.runoob.com/jsref/jsref-bold.html) | 使用粗体显示字符串。 |
| [fixed\(\)](http://www.runoob.com/jsref/jsref-fixed.html) | 以打字机文本显示字符串。 |
| [fontcolor\(\)](http://www.runoob.com/jsref/jsref-fontcolor.html) | 使用指定的颜色来显示字符串。 |
| [fontsize\(\)](http://www.runoob.com/jsref/jsref-fontsize.html) | 使用指定的尺寸来显示字符串。 |
| [italics\(\)](http://www.runoob.com/jsref/jsref-italics.html) | 使用斜体显示字符串。 |
| [link\(\)](http://www.runoob.com/jsref/jsref-link.html) | 将字符串显示为链接。 |
| [small\(\)](http://www.runoob.com/jsref/jsref-small.html) | 使用小字号来显示字符串。 |
| [strike\(\)](http://www.runoob.com/jsref/jsref-strike.html) | 用于显示加删除线的字符串。 |
| [sub\(\)](http://www.runoob.com/jsref/jsref-sub.html) | 把字符串显示为下标。 |
| [sup\(\)](http://www.runoob.com/jsref/jsref-sup.html) | 把字符串显示为上标。 |

#### charAt

charAt\(\) 方法返回字符串中指定位置的字符。

语法：`str.charAt(index)` index 为字符串索引（取值从0至length-1），如果超出该范围，则返回空串。

#### charCodeAt

charCodeAt\(\) 返回指定索引处字符的 Unicode 数值。

语法：`str.charCodeAt(index)`。index 为一个从0至length-1的整数。如果不是一个数值，则默认为 0，如果小于0或者大于字符串长度，则返回 NaN。

#### concat

concat\(\) 方法将一个或多个字符串拼接在一起，组成新的字符串并返回。

语法：`str.concat(string2, string3, …)`. concat 的性能表现不佳，强烈推荐使用赋值操作符（+或+=）代替 concat

#### indexOf / lastIndexOf

indexOf\(\) 方法用于查找子字符串在字符串中首次出现的位置，没有则返回 -1。lastIndexOf 则从右往左查找，其它与前者一致

语法：`str.indexOf(searchValue [, fromIndex=0])，str.lastIndexOf(searchValue [, fromIndex=0])`

#### localeCompare

localeCompare\(\) 方法用来比较字符串，如果指定字符串在原字符串的前面则返回负数，否则返回正数或0，其中0 表示两个字符串相同

#### match

match\(\) 方法用于测试字符串是否支持指定正则表达式的规则，即使传入的是非正则表达式对象，它也会隐式地使用new RegExp\(obj\)将其转换为正则表达式对象。

语法：`str.match(regexp)`.该方法返回包含匹配结果的数组，如果没有匹配项，则返回 null。

* 若正则表达式没有 g 标志，则返回同 RegExp.exec\(str\) 相同的结果。而且返回的数组拥有一个额外的 input 属性，该属性包含原始字符串，另外该数组还拥有一个 index 属性，该属性表示匹配字符串在原字符串中索引（从0开始）。
* 若正则表达式包含 g 标志，则该方法返回一个包含所有匹配结果的数组，没有匹配到则返回 null。

#### replace 使用最多的方法

该方法并不改变调用它的字符串本身，而只是返回替换后的字符串.

语法： `str.replace( regexp | substr, newSubStr | function[, flags] )`

简单概括,replace拥有两个参数,第一个是需要替换的字符串或者正则表达式;  
第二个是新的字符串或者一个function,这样参数便有四种组合.

* regexp: 一个 RegExp 对象. 该正则所匹配的内容会被第二个参数的返回值替换掉。
* substr: 一个要被 newSubStr 替换的字符串.
* newSubStr: 替换掉第一个参数在原字符串中的匹配部分. 该字符串中可以内插一些特殊的变量名.
* function: 一个用来创建新子字符串的函数, 该函数的返回值将替换掉第一个参数匹配到的结果. 该函数的参数描述请参考 指定一个函数作为参数 小节.
* flags: 注意：flags 参数在 v8 内核（Chrome and NodeJs）中不起作用. 方法中使用 flags 参数不是符合标准的并且不赞成这样做.

#### search

search\(\) 方法用于测试字符串对象是否包含某个正则匹配，相当于正则表达式的 test 方法，且该方法比 match\(\) 方法更快。如果匹配成功，search\(\) 返回正则表达式在字符串中首次匹配项的索引，否则返回-1。

语法：`str.search(regexp)`

#### slice

slice\(\) 方法提取字符串的一部分，并返回新的字符串。该方法有些类似 Array.prototype.slice 方法。

语法：`str.slice(start, end)`

#### split

split\(\) 方法把原字符串分割成子字符串组成数组，并返回该**数组**。

语法：`str.split(separator, limit)`

两个参数均是可选的，其中 separator 表示分隔符，它可以是字符串也可以是正则表达式。如果忽略 separator，则返回的数组包含一个由原字符串组成的元素。如果 separator 是一个空串，则 str 将会被分割成一个由原字符串中字符组成的数组。limit 表示从返回的数组中截取前 limit 个元素，从而限定返回的数组长度。

#### substr

substr\(\) 方法返回字符串指定位置开始的指定数量的字符。

语法：`str.substr(start[, length])`

#### subString

substring\(\) 方法返回字符串两个索引之间的子串。

语法：`str.substring(indexA[, indexB])`  
indexA、indexB 表示字符串索引，其中 indexB 可选，如果省略，则表示返回从 indexA 到字符串末尾的子串。

* 若 indexA == indexB，则返回一个空字符串；
* 若 省略 indexB，则提取字符一直到字符串末尾；
* 若 任一参数小于 0 或 NaN，则被当作 0；
* 若 任一参数大于 length，则被当作 length。
* 如果 indexA &gt; indexB，则 substring 的执行效果就像是两个参数调换一般

#### toLocaleLowerCase、toLocaleUpperCase

toLocaleLowerCase\(\) 方法返回调用该方法的字符串被转换成小写的值，转换规则根据本地化的大小写映射。而toLocaleUpperCase\(\) 方法则是转换成大写的值。

#### toLowerCase 、toUpperCase

这两个方法分别表示将字符串转换为相应的小写，大写形式，并返回

#### trim

trim\(\) 方法清除字符串首尾的空白并返回。

#### includes\(ES6\)

includes\(\) 方法基于ECMAScript 2015（ES6）规范，它用来判断一个字符串是否属于另一个字符。如果是，则返回true，否则返回false。  
语法：`str.includes(subString [, position])`

#### endsWith\(ES6\) 、startsWith\(ES6\)

endsWith\(\) 方法基于ECMAScript 2015（ES6）规范，它基本与 contains\(\) 功能相同，不同的是，它用来判断一个字符串是否是原字符串的结尾。若是则返回true，否则返回false。

### 小结

* substr 和 substring，都是两个参数，作用基本相同，两者第一个参数含义相同，但用法不同，前者可为负数，后者值为负数或者非整数时将隐式转换为0。前者第二个参数表示截取字符串的长度，后者第二个参数表示截取字符串的下标；同时substring第一个参数大于第二个参数时，执行结果同位置调换后的结果。
* search方法与indexOf方法作用基本一致，都是查询到了就返回子串第一次出现的下标，否则返回-1，唯一的区别就在于search默认会将子串转化为正则表达式形式，而indexOf不做此处理，也不能处理正则。

### 字符串对象遍历

参照[各种遍历方法以及使用对象](/JS/遍历.md)

