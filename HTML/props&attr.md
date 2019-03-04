# HTML中属性（property） 特性（attribute）

这两个是一个相爱相杀的属性，尤其在jQuery中，有两个方法 `prop()` 和 `attr()`，乍一看以为两个有获取的是同一个东西，既然设计了两个方法，自然有这两个方法不同之处。

```html
<input type="checkbox" checked="checked" />
```
| 操作 |	 结果 |
|---|----|
| elem.checked |	true (Boolean) Will change with checkbox state |
|$( elem ).prop( "checked" ) |	true (Boolean) Will change with checkbox state |
|elem.getAttribute( "checked" )|	"checked" (String) Initial state of the checkbox; does not change|
|$( elem ).attr( "checked" ) (1.6)	|"checked" (String) Initial state of the checkbox; does not change|
|$( elem ).attr( "checked" ) (1.6.1+)|	"checked" (String) Will change with checkbox state|
|$( elem ).attr( "checked" ) (pre-1.6)|	true (Boolean) Changed with checkbox state|

我们可以看到，使用prop()当于直接使用了DOM元素对象的属性，而attr()相当于使用了DOM元素的getAttribute()或setAttribute()方法（而1.6前和1.6后的效果比较特殊，下面会解释）。这两种不同的实现，决定了两种方法获取到的值并不一样，这就得涉及到DOM元素属性（property）和特性（attribute）间的区别了。

**区别分析**
* 属性和特性两者不是一一对应的：Attr节点对应的就是HTML各标签中的特性，这些特性有的未必会被内置为DOM元素的属性，比如HTML5的data-*特性等自定义特性；而DOM元素的属性也未必都是HTML中的特性，比如一些DOM元素的操作方法

* 即使特性节点名和DOM元素的属性名一致，这两者的操作和行为也是不同的：

  * DOM元素的属性是DOM对象原生实现的，符合一般对象属性的行为；这些属性操作和同名的HTML特性节点无关，但可以在显示上覆盖HTML特性节点的设置
  * 对于特性节点的操作都是针对HTML文档上的特性；对特性的操作不会改变同名属性值，只是改变HTML的文档内容而已
  
  
#### 结论
**DOM元素的属性（property）是该对象所拥有的属性，而特性（attribute）则是该元素在HTML中的所拥有的特性节点。property是对象属性，本身不操作特性节点，但可以覆盖HTML中的同名特性的效果，是js操作；attribute是DOM节点对象，只用于获取和设置HTML特性，是文本操作。**

`prop()`方法是jQuery1.6之后加入的方法，所以在1.6之前的jQuery，只有 `attr()`方法，获取的内容对属性和特性没有做严格区分。


#### 不同作用
* property的操作是纯js操作，用于获取和设置原生的一些特性；并且对于事件属性如onclick可以获得处理函数、对于style属性可以获得一个对象。

* attribute的操作是文本操作，用于获取和设置HTML文档中的特性内容，注意这些内容都是字符串形式；同时它能操作的特性也不只是原生限定的那几种，对于一些拓展特性如data-*也可以操作。


参考：
* [DOM元素的属性（property）和特性（attribute）](https://segmentfault.com/a/1190000006907973)