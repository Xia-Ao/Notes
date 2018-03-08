# JavaScript  String对象
###参考：
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
charAt() 方法返回字符串中指定位置的字符。
语法：`str.charAt(index)` index 为字符串索引（取值从0至length-1），如果超出该范围，则返回空串。

#### charCodeAt
charCodeAt() 返回指定索引处字符的 Unicode 数值。
语法：`str.charCodeAt(index)`。index 为一个从0至length-1的整数。如果不是一个数值，则默认为 0，如果小于0或者大于字符串长度，则返回 NaN。
