# 前端知识点总结（JavaScript篇）


1. **同源策略及跨域请求的方法和原理（比较JSONP和document.domain的不同及优劣，以及HTML5的跨域方案）**
2. **js的基本类型有哪些？引用类型有哪些？null和undefined的区别**
3. **JSONP原理及优缺点**
4. **XMLHttpRequest**
5. **事件委托**
6. **前端模块化（AMD和CommonJS的原理及异同，seajs和requirejs的异同和用法）**
7. **session**
8. **Cookie**
9. **this问题**
10. **JavaScript动画算法**
11. **拖拽的实现**
12. **JavaScript原型链及JavaScript如何实现继承、类的**
13. **闭包及闭包的用处，以及闭包可能造成的不良后果。**
14. **常见算法的JS实现（如快排、冒泡等）**
15. **事件冒泡和事件捕获**
16. **JavaScript代码测试**
17. **call与apply的作用及不同**
18. **bind的用法，以及如何实现bind的函数和需要注意的点**
19. **变量名提升**
20. **== 与 ===**
21. **"use strict"作用**
22. **AJAX请求的细节和原理**
23. **函数柯里化（Currying）**
24. **jQuery链式调用的原理**
25. **ES6及jQuery新引进的Promise有什么用处、Promise的原理**
26. **JS中random的概率问题**
27. **客户端存储及他们的异同（例如：cookie, sessionStorage和localStorage等）**
28. **在你的Angular App页面里随意加一个JS文件，会有什么影响**
29. **你如何测试你的JS代码**
30. **DOM1\DOM2\DOM3都有什么不同**
31. **常用数组方法和数组算法（如数组去重、求交集、并集等）**
32. **js数组去重复项**
33. **js中的垃圾回收机制**
34. **常见的JS设计模式**
35. **js获取服务器精准时间（客户端如何与服务器时间同步）**
36. **什么是js中的类数组对象**
37. **JavaScript中异步编程的几种方式**
38. **JS中判断是否为数组**
39. **统计页面中使用最多的三个标签**
40. **JS内存泄露及解决方法**
41. **在浏览器地址栏按回车、F5、Ctrl+F5刷新网页的区别**
42. **判断两个对象的相等**
43. **选取两个数的最大公约数**
44. **`escape()`, `decodeURIComponent()`, `decodeURI`之间的区别是什么？**

## 新增
2018-08-14

1. **如何判断一个变量是Array类型？如何判断一个变量是Number类型？（都不止一种）**
2. **Object是引用类型嘛？引用类型和基本类型有什么区别？哪个是存在堆哪一个是存在栈上面的？**
3. **JS常见的dom操作api**
4. **解释一下事件冒泡和事件捕获**
5. **事件委托（手写例子），事件冒泡和捕获，如何阻止冒泡？如何组织默认事件？**
6. **对闭包的理解？什么时候构成闭包？闭包的实现方法？闭包的优缺点？**
7. **this有哪些使用场景？跟C,Java中的this有什么区别？如何改变this的值？**
8. **call，apply，bind**
9. **显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有原型链**
10. **创建对象的多种方式**
11. **实现继承的多种方式和优缺点**
12. **new 一个对象具体做了什么**
13. **手写Ajax，XMLHttpRequest**
14. **变量提升**
15. **举例说明一个匿名函数的典型用例**
16. **指出JS的宿主对象和原生对象的区别，为什么扩展JS内置对象不是好的做法？有哪些内置对象和内置函数？**
17. **attribute和property的区别**
18. **document load和document DOMContentLoaded两个事件的区别**
19. **`===` 和 `==` , `[]` === `[]`, undefined === undefined,`[]` ==` []`, undefined == undefined**
20. **typeof能够得到哪些值**
21. **函数的作用域是什么？js 的作用域有几种？**
22. **JS如何实现重载和多态**
23. **常用的数组api，字符串api**
24. **原生事件绑定（跨浏览器）？**
25. **给定一个元素获取它相对于视图窗口的坐标**
26. **如何实现图片滚动懒加载**
27. **js 的字符串类型有哪些方法？ 正则表达式的函数怎么使用？**
28. **深拷贝**
29. **编写一个通用的事件监听函数**
30. **web端cookie的设置和获取**
31. **setTimeout和promise的执行顺序**
32. **JavaScript 的事件流模型都有什么？**
33. **navigator对象，location和history**
34. **内存泄漏的原因和场景**
35. **DOM事件的绑定的几种方式**
36. **DOM事件中target和currentTarget的区别**
37. **typeof 和 instanceof 区别，instanceof原理**
38. **js动画和css3动画比较**
39. **JavaScript 倒计时（setTimeout）**
40. **js处理异常**
41. **轮播图的实现，以及轮播图组件开发，轮播10000张图片过程**
42. **websocket的工作原理和机制。**
43. **手指点击可以触控的屏幕时，是什么事件？**
44. **什么是函数柯里化？以及说一下JS的API有哪些应用到了函数柯里化的实现？(函数柯里化一些了解，以及在函数式编程的应用，最后说了一下JS中bind函数和数组的reduce方法用到了函数柯里化。)**
45. **JS代码调试**


++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
<hr/>

1. **同源策略及跨域请求的方法和原理（比较JSONP和document.domain的不同及优劣，以及HTML5的跨域方案）**

   答案：同源策略是客户端脚本（尤其是Javascript）的重要的安全度量标准。它最早出自Netscape Navigator2.0，其目的是防止某个文档或脚本从多个不同源装载。这里的同源指的是：**同协议，同域名和同端口**。这里说的js跨域是指通过js在不同的域之间进行数据传输或通信，比如用ajax向一个不同的域请求数据，或者通过js获取页面中不同域的框架中(iframe)的数据。只要协议、域名、端口有任何一个不同，都被当作是不同的域。
   浏览器的同源策略，其限制之一就是第一种方法中我们说的不能通过ajax的方法去请求不同源中的文档。 它的第二个限制是浏览器中不同域的框架之间是不能进行js的交互操作的。有一点需要说明，不同的框架之间（父子或同辈），是能够获取到彼此的window对象的，但头疼的是你却不能使用获取到的window对象的属性和方法(html5中的postMessage方法是一个例外，还有些浏览器比如ie6也可以使用top、parent等少数几个属性)，总之，你可以当做是只能获取到一个几乎无用的window对象。

   **document.domain**：只要将同一域下不同子域的document.domain设置为共同的父域，则这个时候我们就可以访问对应window的各种属性和方法了。例如：www.example.com父域下的www.lib.example.com和www.hr.example.com两个子域，将对应页面的document.domain设为example.com即可。**缺点**：只能在一级域名相同时才能运用。

   **JSONP**：原理是动态添加一个script标签，而script标签的src属性是没有跨域的限制的。jquery中还提供了一个$.getJSON(url,arg,callback(data))用来进行jsonp访问。**缺点**：只支持get不支持post；只支持http请求这种情况，不能解决不同域两个页面之间如何进行JavaScript调用的问题；JSONP请求失败时不返回http状态码。

   **CORS（跨域资源共享）**：HTML5引入的新的跨域的方法，不过需要在请求头和相应头设置相应的Access-Control-属性。**缺点**：兼容性问题，适合一些新的浏览器。

   参考:
   [**同源策略到前端跨域**](https://github.com/Xia-Ao/Notes/blob/master/JS/同源策略到前端跨域.md)
   [说说JSON和JSONP](http://www.cnblogs.com/dowinning/archive/2012/04/19/json-jsonp-jquery.html)
   [js中几种实用的跨域方法原理详解](http://www.cnblogs.com/2050/p/3191744.html)
   [The Same Origin Policy: JSONP vs The document.domain Property](http://adam.kahtava.com/journal/2010/03/18/the-same-origin-policy-jsonp-vs-the-documentdomain-property/)
   [HTTP访问控制(CORS)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS)

2. **js的数据类型有哪些？引用类型有哪些？null和undefined的区别。**

   答案： JavaScript中有6种简单数据类型（也称为基本数据类型）：Undefined、Null、Boolean、Number和String以及ES6中新增的Symbol。还用一种复杂数据类型Object.
    引用类型有`Object 类型`、`Array 类型`、`Date 类型`、`RegExp 类型`、`Function 类型` 等。
    null是一个表示"无"的对象，转为数值时为0；undefined是一个表示"无"的原始值，转为数值时为NaN

3. **JSONP原理及优缺点**  

   答案：具体JSONP的原理可参考1，说白了就是插入一个script标签，其src指向跨域接口，返回对应的callback(data)，其中data是json格式，callback是页面已存在的function。
   **优点**：它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制；它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；并且在请求完毕后可以通过调用callback的方式回传结果。
   **缺点**：它只支持GET请求而不支持POST等其它类型的HTTP请求；它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

4. **XMLHttpRequest**

   答案：XmlHttp是一套可以在Javascript、VbScript、Jscript等脚本语言中通过http协议传送或从接收XML及其他数据的一套API。XmlHttp最大的用处是可以更新网页的部分内容而不需要刷新整个页面。
[轻松掌握XMLHttpRequest对象](http://www.cnblogs.com/beniao/archive/2008/03/29/1128914.html)

5. **事件委托**

   答案：使用事件委托技术能让你避免对特定的每个节点添加事件监听器；相反，事件监听器是被添加到它们的父元素上。事件监听器会分析从子元素冒泡上来的事件，找到是哪个子元素的事件。

6. **前端模块化（AMD和CommonJS的原理及异同，seajs和requirejs的异同和用法**

   答案：
   [使用AMD\CommonJS\ES Harmony编写模块化的JavaScript](http://justineo.github.io/singles/writing-modular-js/)
   [RequireJS中文网](http://www.requirejs.cn/)

   SeaJS对模块的态度是懒执行,SeaJS只会在真正需要使用(依赖)模块时才执行该模块；而RequireJS对模块的态度是预执行；会先尽早地执行(依赖)模块, 相当于所有的require都被提前了, 而且模块执行的顺序也不一定
   [SeaJS和RequireJS最大的不同](http://www.douban.com/note/283566440/)，其中AMD和CMD的区别可以看[玉伯在知乎上的回答](http://www.zhihu.com/question/20351507/answer/14859415)

7. **session**

    答案： [cookie与Session机制区别以及Cookie SessionStorage LocalStorage异同](/HTTP/cookie与Session的区别.md)

8. **Cookie**

   答案：8与9的知识可以参考：[参考1](http://www.cnblogs.com/shiyangxt/archive/2008/10/07/1305506.html)和[参考2](http://www.cnblogs.com/Darren_code/archive/2011/11/24/Cookie.html)

   常见的cookie操作包括创建cookie、添加cookie、删除cookie等，相应函数参考：

   ``` javascript
   //添加（daysToLive大于0）cookie/删除（daysToLive为0）cookie

   function setcookie(name,value,daysToLive){

     var cookie = name + "=" + encodeURIComponent(value);

     if(typeof daysToLive === "number"){
   	    cookie += ";max-age=" + (daysToLive*60*60*24);
     }
     document.cookie = cookie;
   }

   //解析cookie,直接getcookie()[name]获取对应的name cookie

   function getcookie(){
     var cookies = {};
     var all = document.cookie;
     if(all === ""){
   	    return false;
     }
     var list = all.split(";");
     for(var i=0;i < list.length; i++){
   	    var cookie = list[i];
   	    var p = cookie.indexOf("=");
   	    var name = cookie.substring(0,p);
    	var value = cookie.substring(p+1);
    	value = decodeURIComponent(value);
    	cookies[name] = value;
     }
     return cookies;
   }

   //删除某个cookie
   function deletecookie( name ) {
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      //或者  document.cookie = name + '=; expires=' + (new Date(1970)).toGMTString();
    }
   ```

9. **seaJS的用法及原理，依赖加载的原理、初始化、实现等**

    答案：[模块化开发之sea.js实现原理总结](http://www.lxway.com/85146452.htm)，简言之就是要解决三个问题，分别为：
    1.模块加载（插入script标签来加载模块。你在页面看不到标签是因为模块被加载完后删除了对应的script标签）；
    2.模块依赖（按依赖顺序依赖）；
    3.命名冲突（封装一层define，所有的都成为了局部变量，并通过exports暴漏出去）。

10. **this问题**

    答案：
    [**this对象**](/JS/this对象.md)

11. **JavaScript动画算法**

    答案：[JavaScript基于时间的动画算法](https://github.com/livoras/blog/issues/8)

12. **拖拽的实现**

    答案：使用 JavaScript 实现拖拽的步骤：
   * 让元素捕获事件（mousedown, mousemove & mouseup）
   * 单击并不释放，触发 mousedown，标记开始拖拽，并获取元素和鼠标的位置
   * 拖动鼠标，触发 mousemove，不断的获取鼠标的位置，并通过计算重新确定元素的位置
   * 释放师表，触发 mouseup，结束拖拽，确定元素位置并更新
   详细实现参考 [使用 JavaScript 实现简单的拖拽](http://www.ahonn.me/2016/05/14/use-javascript-to-achieve-simple-drag-and-drop/)


12. **JavaScript原型链及JavaScript如何实现继承、类的**

    答案：**原型链**：就是每个构造函数都有一个原型对象，原型对象包含一个指向构造函数的指针（prototype），而实例则包含一个指向原型对象的内部指针（__proto__），通过将子构造函数的原型指向父构造函数的实例。
    参考：
    [**JS继承的实现**](https://github.com/Xia-Ao/Notes/blob/master/JS/继承.md)
    [JS 面向对象之继承 -- 原型链](http://www.cnblogs.com/yangjinjin/archive/2013/02/01/2889368.html)
    [js 基于原型的类实现详解](http://blog.csdn.net/lihongxun945/article/details/8061311)

13. **闭包及闭包的用处，以及闭包可能造成的不良后果**

    答案：**好处**：能够实现封装和缓存等；**坏处**：就是消耗内存、不正当使用会造成内存溢出的问题。
    [**JS闭包**](https://github.com/Xia-Ao/Notes/blob/master/JS/闭包.md)
    [聊一下JS中的作用域scope和闭包closure](http://www.cnblogs.com/front-Thinking/p/4317020.html)
    [javascript 闭包的好处及坏处](http://blog.csdn.net/vuturn/article/details/43055279)

14. **常见算法的JS实现（如快排、冒泡等）**

    答案：
    [数组排序算法总结](https://github.com/Xia-Ao/Notes/blob/master/JS/数组排序算法.md)
    [常用排序算法之JavaScript实现](http://www.cnblogs.com/ywang1724/p/3946339.html#3037096)。这里有一篇阮一峰老师写的，非常不错的快排算法，[快速排序（Quicksort）的Javascript实现](http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html)。
    和[排序算法](http://javascript.ruanyifeng.com/library/sorting.html). 还有如《五大常用算法》等。

15. **事件冒泡和事件捕获**

    答案：W3C中定义事件的发生经历三个阶段：捕获阶段（capturing）、目标阶段（targeting）、冒泡阶段（bubbling）。
    阻止事件传播的方法：ie下：window.event.cancelBubble = true; 其他浏览器:e.stopPropagation()。
    **参考**：
    [事件冒泡和事件捕获](http://www.quirksmode.org/js/events_order.html#link4)

16. **浏览器检测（能力检测、怪癖检测等）**

17. **JavaScript代码测试**

    答案：平时在测试方面做的比较少，一般用JSlint检查一些常见的错误。对于功能性的可能会使用基于karma+Jasmine测试框架来做。

18. **call与apply的作用及不同**

    答案：作用是绑定this指针，设定函数中this的上下文环境。第二个参数不同，apply是类数组，而call是一些列参数。

19. **bind的用法，以及如何实现bind的函数和需要注意的点**

    答案：bind的作用与call和apply相同，区别是call和apply是立即调用函数，而bind是返回了一个函数，需要调用的时候再执行。
    一个简单的bind函数实现如下：

    ```javascript
    Function.prototype.bind = function(ctx) {
        var fn = this;
        return function() {
            fn.apply(ctx, arguments);
        };
    };
    ```
    可参考：[How is bind() different from call() & apply() in Javascript?](http://stackoverflow.com/questions/15455009/how-is-bind-different-from-call-apply-in-javascript)

20. **变量名提升 函数名提升**

    答案：通常JS引擎会在正式执行之前先进行一次预编译，在这个过程中，首先将变量声明及函数声明提升至当前作用域的顶端，然后进行接下来的处理。

21. **== 与 ===**

    答案：前者隐式类型转换，后者严格对比。
    [JS中数据类型、运算符、严格相等](https://github.com/Xia-Ao/Notes/blob/master/JS/运算符.md)

22. **"use strict"作用**

    答案：作用是为了规范js代码，消除一些不合理、不严谨的地方；提高效率；为以后新版本js做铺垫。
    主要限制：
    1. 全局变量显式声明；
    2. 禁止使用with，不推荐使用eval；
    3. 增强安全措施，比如禁止this关键字指向全局对象；
    4. 禁止删除变量；
    5. 显式报错；比如对只读属性赋值，对一个使用getter方法读取属性赋值，对禁止扩展的对象添加新属性；
    6. 重名错误，对象不能有重名的属性，函数不能有重名的参数；
    7. 禁止八进制表示法；
    8. argument对象的限制；比如禁止使用arguments.callee；
    9. 函数必须声明在顶层；
    10. 新增保留字：implements, interface, let, package, private, protected, public, static, yield

    [Javascript 严格模式详解](http://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)

23. **AJAX请求的细节和原理**
    答案：
    1、创建一个xmlHttpRequest对象
    2、使用open建立对服务器的调用，包括methods，url等
    3、使用send向服务器发送请求
    4、使用onreadystatechange来监听响应并对响应进行处理

24. **函数柯里化（Currying）**
    答案： 柯里化（Currying），是把接受多个参数的函数变换为接受单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
    **作用**:
    1.参数复用；在柯里化的外围函数中添加复用的参数即可。
    2.提前返回；参看“参考”中绑定事件的例子。
    3.延迟计算/运行；其实Function.prototype.bind的方法中延迟计算就是运用的柯里化。
    **参考**：
    [JS中的柯里化(currying)](http://www.zhangxinxu.com/wordpress/2013/02/js-currying/)


25. **jQuery链式调用的原理**
    答案：原理很简单：就是jQuery节点在调用api后都会返回节点自身


26. **ES6及jQuery新引进的Promise有什么用处、Promise的原理**

    [**Promise**](https://github.com/Xia-Ao/Notes/blob/master/JS/Promise.md)
    [JavaScript Promise](http://www.html5rocks.com/zh/tutorials/es6/promises/)
    [JavaScript Promise Mini Book](http://liubin.github.io/promises-book/)



27. **JS中random的概率问题**
    参考：[淘宝前端团队FED-Math.random() 二三事](http://taobaofed.org/blog/2015/12/07/some-thing-about-random/)


31. **客户端存储及他们的异同（例如：cookie, sessionStorage和localStorage等）**
    参考：[cookie与Session机制区别以及Cookie SessionStorage LocalStorage异同](https://github.com/Xia-Ao/Notes/blob/master/HTTP/cookie与Session的区别.md)
    共同点：都是保存在浏览器端，且同源的。
    区别：  
    1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递。而sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
    2. cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
    3. 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，一般为5M左右。
    4. 数据有效期不同，sessionStorage仅在当前浏览器窗口关闭前有效，自然也就不可能持久保持；localStorage始终有效（除非清除），窗口或浏览器关闭也一直保存，因此用作持久数据；cookie只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。
    5. 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localStorage 在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的。
    6. Web Storage 支持事件通知机制（storage事件），可以将数据更新的通知发送给监听者。Web Storage 的 api 接口使用更方便。



32. 你如何测试你的JS代码

    答案：平时在测试方面做的比较少，一般用JSlint检查一些常见的错误。对于功能性的可能会使用基于karma的Jasmine测试框架来做。

33. **DOM1\DOM2\DOM3都有什么不同**

    * DOM0：不是W3C规范。
    * DOM1：开始是W3C规范。专注于HTML文档和XML文档，DOM1级由两个模块组成：DOM核心（DOM Core）和DOM HTML。
    * DOM2：对DOM1增加了 **样式表对象模型**，新增以下内容
        * DOM视图（DOM Views）：定义了跟踪不同文档（例如，应用CSS之前和之后的文档）视图的接口；
        * DOM事件（DOM Events）：定义了事件和事件处理的接口；
        * DOM样式（DOM Style）：定义了基于CSS为元素应用样式的接口；
    * DOM3：对DOM2增加了 **内容模型** (DTD 、Schemas) 和 **文档验证** 。


34. **常用数组方法和数组算法（如数组去重、求交集、并集等）**

    [Array操作方法](https://github.com/Xia-Ao/Notes/blob/master/JS/Array操作方法.md)
    [javascript常用数组算法总结](http://www.cnblogs.com/front-Thinking/p/4797440.html)
    [Merge/flatten an Array of Arrays in JavaScript](http://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript)

35. **js数组去重复项**

    答案：[js数组去重复项的四种方法](http://www.cnblogs.com/novus/archive/2011/06/30/1921132.html)

36. **js中的垃圾回收机制**

    答案：一般使用**标记清除**，**引用计数** 。  
    [JavaScript垃圾回收机制](http://www.cnblogs.com/hustskyking/archive/2013/04/27/garbage-collection.html)

37. **常见的JS设计模式**

    JS设计模式：单例模式，策略模式，代理模式，迭代器模式，发布-订阅模式，命令模式，组合模式，模板方法模式，享元模式，职责链模式，中介者模式，装饰者模式，状态模式，适配器模式。
    具体参考：**《javaScript设计模式与实践》** 一书


38. **js获取服务器精准时间（客户端如何与服务器时间同步）**

    答案：思路：简而言之就是发送一个ajax请求，然后获取对应的HTTP Header中的time，由于时延等问题造成时间在JS客户端获取后当前时间已经不再是服务器此时的时间，然后用本地的时间减去获取的服务器的时间，这应该就是时间偏移量。再新建一个时间，加上此偏移量应该就是此时此刻服务器的时间。代码如下：

    ``` javascript
    var offset = 0;
    function calcOffset() {
      	var xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    	xmlhttp.open("GET", "http://stackoverflow.com/", false);
    	xmlhttp.send();

    	var dateStr = xmlhttp.getResponseHeader('Date');
    	var serverTimeMillisGMT = Date.parse(new Date(Date.parse(dateStr)).toUTCString());
    	var localMillisUTC = Date.parse(new Date().toUTCString());
    	offset = serverTimeMillisGMT -  localMillisUTC;
    }
    function getServerTime() {
    	var date = new Date();
    	date.setTime(date.getTime() + offset);
    	return date;
    }
    ```

    或者是：

    ``` javascript
    var start = (new Date()).getTime();

    var serverTime;//服务器时间

    $.ajax({
      url:"XXXX",
    success: function(data,statusText,res){
        	var delay = (new Date()).getTime() - start;
        	serverTime = new Date(res.getResponseHeader('Date')).getTime() + delay;
        	console.log(new Date(serverTime));//标准时间
        	console.log((new Date(serverTime)).toTimeString());//转换为时间字符串
        	console.log(serverTime);//服务器时间毫秒数
    	}
    }）
    ```

39. **什么是js中的类数组对象**

    答案：
    1、它们都有一个合法的 length 属性(0 到 2**32 - 1 之间的正整数)。  
    2、length 属性的值大于它们的最大索引(index)。



40. **JavaScript中异步编程的几种方式**

   1. 回调函数
   2. 事件监听
   3. 发布/订阅
   4. promise
    参加阮一峰前辈写的[Javascript异步编程的4种方法](http://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html)，


41. JS中判断是否为数组

    答案：isArray/typeof/instanceof,还有toString方法返回的字符串（数组返回'[Object Array]'）。


42. **统计页面中使用最多的三个标签**

    答案：思路大致是首先获取页面中所有用到的标签数组，然后依次遍历，将用到的标签放置新的hash表里，每次检测到相同标签对应的key的value值加1.最后转为数组，排序，取前三个。实现方法如下：

    ``` javascript
    function findTags(){
        var allTags = document.getElementsByTagName("*"),
            hash = {};

        for(var i = 0, j = allTags.length; i < j; i++){
            var temp = allTags[i].tagName;
            if(hash[temp]){
                hash[temp]++;
            }else{
                hash[temp] = 1;
            }
        }

        var sortable = [];
        for (var i in hash){
           sortable.push([i, hash[i]]);
         }
        sortable.sort(function(a, b) {return b[1] - a[1]});

        return sortable.splice(0,3);
     }
    ```

43. **JS内存泄露及解决方法**

    答案：
    [阮一峰-内存泄露机制](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
    [JS内存泄露及解决方法](http://www.cnblogs.com/carekee/articles/1733847.html)

44. **在浏览器地址栏按回车、F5、Ctrl+F5刷新网页的区别**

    答案：[在浏览器地址栏按回车、F5、Ctrl+F5刷新网页的区别](http://blog.csdn.net/yui/article/details/6584401)

45. **判断两个对象的相等**

    答案: [How to determine equality for two JavaScript objects?](http://stackoverflow.com/questions/201183/how-to-determine-equality-for-two-javascript-objects)

46. **选取两个数的最大公约数**

    答案：[JS how to find the greatest common divisor](http://stackoverflow.com/questions/17445231/js-how-to-find-the-greatest-common-divisor)


47. **`escape()`, `decodeURIComponent()`, `decodeURI`之间的区别是什么？**
    答案：
    * 传递参数时需要使用encodeURIComponent，这样组合的url才不会被#等特殊字符截断。
    *  进行url跳转时可以整体使用encodeURI
    * js使用数据时可以使用escape
    * escape对0-255以外的unicode值进行编码时输出%u****格式，其它情况下escape，encodeURI，encodeURIComponent编码结果相同。
    另外：
    * escape不编码字符有69个：*，+，-，.，/，@，_，0-9，a-z，A-Z
    * encodeURI不编码字符有82个：!，#，$，&，'，(，)，*，+，,，-，.，/，:，;，=，?，@，_，~，0-9，a-z，A-Z
    * encodeURIComponent不编码字符有71个：!， '，(，)，*，-，.，_，~，0-9，a-z，A-Z



--------------------------------------------------------------------------------
<hr/>



## 新增
2018-08-14

1. **如何判断一个变量是Array类型？如何判断一个变量是Number类型？（都不止一种）**

   Array判断：
   1. `Array.isArray(arr)`返回一个Boolean值， **推荐**
   2. `arr instanceof Array` 判断原型链是否指向构造函数的原型对象，返回Boolean
   3. `arr.constructor === Array` 判断构造函数是否为Array
   4. `Object.prototype.toString.call(arr) === '[object Array]'`
   5. jquery中的 `$.type(arr)` 返回array

   Number判断：
   1. `typeof num` 返回类型`'number'`
   2. `num.constructor === Number`
   3. `Object.prototype.toString.call(num) === '[object Number]'`
   4. jquery中的 `$.type(num)` 返回number


2. **Object是引用类型嘛？引用类型和基本类型有什么区别？哪个是存在堆哪一个是存在栈上面的？**
   Object肯定是引用类型

    基本类型：
   1. 基本数据类型的值是不可变的， 不可能通过方法改变
   2. 基本数据类型不可以添加属性和方法
   3. 基本类型的赋值是简单赋值
   4. 基本类型的比较是值的比较
   5. 基本类型的值是**存放在栈区**的

    引用类型：
   1. 引用类型的值是可以改变的
   2. 引用类型可以添加属性和方法
   3. 引用类型的的赋值是对象引用
   4. 引用类型的比较是引用的比较
   5. 引用类型是**同时保存在堆和栈**中的，栈区保存变量标识符和指向堆内存的地址


3. **JS常见的dom操作api**

    * 获取：`document.getElementById`,`document.getElementsByClassName`,`document.getElementsByTagName`,`document.getElementsByName`,`document.querySelector`,`document.querySelectorAll`
    * 新建： `document.createElement(div)`,`createTextNode`等等
    * 插入： `Node.appendChild`,`Node.insertBefore`,
    * 修改/移除： `Node.removeChild`,`Node.replaceChild`,
    * 节点关系： `childNodes`, `parentNode`
    纤细参考 [Javascript操作DOM常用API总结](http://luopq.com/2015/11/30/javascript-dom/)


4. **解释一下事件冒泡和事件捕获**
    [DOM事件机制](/JS/事件机制.md)



5. **事件委托（手写例子），事件冒泡和捕获，如何阻止冒泡？如何组织默认事件？**

    事件委托优点：1、减少内存消耗； 2、动态 绑定事件
    ```html
    <ul id="list">
      <li>item 1</li>
      <li>item 2</li>
      <li>item 3</li>
      ......
      <li>item n</li>
    </ul>
    // ...... 代表中间还有未知数个 li
    ```
    ```js
    // 给父层元素绑定事件
    document.getElementById('list').addEventListener('click', function (e) {
      // 兼容性处理
      var event = e || window.event;
      var target = event.target || event.srcElement;  //后者为IE下
      // 判断是否匹配目标元素
      if (target.nodeName.toLocaleLowerCase === 'li') {
        console.log('the content is: ', target.innerHTML);
      }
    });
    ```

    阻止默认行为： `preventDefault()`;  IE下 `returnValue`设置为false；  
    阻止事件捕获冒泡： `stopPropagation()`  , IE下 `cancelBubble`设置为true

6. **对闭包的理解？什么时候构成闭包？闭包的实现方法？闭包的优缺点？**

    **闭包是指有权访问另一个函数作用域中的变量的函数**， 字啊一个函数里面创建另一个函数科生成一个闭包，
    闭包十分消耗内存，其次闭包可以在父函数外部改变父函数内部的变量的值，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。  
    [JS闭包详解](https://xia-ao.gitbook.io/notes/js/bi-bao)


7. **this有哪些使用场景？跟C,Java中的this有什么区别？如何改变this的值？**
    this的使用场景其实就是指this的取值，谁调用的函数或者方法，里面的this就指向谁。  
    可以使用 `apply`， `call` ， `bind`改变this指向。  
    以下几种特殊情况：  
    1、闭包中的this指向全局；  
    2、如果一个函数的返回值是一个对象的话，那么this指向的就是这个对象，如果返回值不知一个对象，this指向的还是函数的实例。（其中null也是一个对象，如果返回是null，this指向的还是函数的实例）  
    参考：  
    [this指向详解](https://xia-ao.gitbook.io/notes/js/this-dui-xiang)  
    [this使用场景](https://blog.csdn.net/weixin_40387601/article/details/80313884)

8. **call，apply，bind**
    用于改变函数运行时this指向，因为在js函数中，定义时上下文，运行时上下文，是可以被改变的。  
    call和apply的作用是一样的，不同在于call传递参数需要一个一个传入，apply可以将多个参数转换为数组传入，最典型的应用就是 `Math.max.apply(this,arr)`  
    bind 是返回对应函数，便于稍后调用；apply 、call 则是立即调用 。

9. **显示原型和隐式原型，手绘原型链，原型链是什么？为什么要有原型链**
    答案：构造函数的prototype指显示原型，实例对象的 `__proto__`指隐式原型  
    [显示原型，隐式原型等](https://blog.csdn.net/weixin_40387601/article/details/80327955)  
    [从原型到原型链](https://xia-ao.gitbook.io/notes/js/js-cong-yuan-xing-dao-yuan-xing-lian)

10. **创建对象的多种方式**
    这一部分在《高程》第六章 6.2节创建对象上面有详细的讲解，具体可以参考，下面是一篇别人根据高程上面的内容整理的手记。  
    具体分为工厂模式，构造函数模式，原型模式，原型模式优化，组合模式，寄生构造函数模式，稳妥模式；  
    [JavaScript深入之创建对象的多种方式以及优缺点](https://github.com/mqyqingfeng/Blog/issues/15)


11. **实现继承的多种方式和优缺点**
    《高程》6.3节继承的内容，熟读熟记理解
    一种有7种方式可以实现继承，优先推荐extends继承  
    原型链继承，构造函数继承，实例继承，拷贝继承，组合继承， 寄生组合继承， extends继承
    [继承的实现以及优缺点](https://xia-ao.gitbook.io/notes/js/ji-cheng)


12. **new 一个对象具体做了什么**
    代码 `new` *`Foo`* `(...)` 执行时，会发生以下事情：
    1. 一个继承自 *`Foo`* `.prototype` 的新对象被创建。
    2. 使用指定的参数调用构造函数 `Foo` ，并将 [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this) 绑定到新创建的对象。`new` *Foo* 等同于 `new ` *`Foo`* `()`，也就是没有指定参数列表， *`Foo`* 不带任何参数调用的情况。
    3. 由构造函数返回的对象就是 `new` 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）
    详细MDN上介绍： [new运算符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

13. **手写Ajax，XMLHttpRequest**
    ```js
    // step1： 创建一xhr对象
    let xhr = new XMLHttpRequest();
    // step2: 使用open规定请求方法，url，是否异步
    xhr.open('GET', url, asyncFlag);
    // step3: 使用send发送请求
    xhr.send();
    // step4：绑定请求返回处理函数
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && (xhr.status === 200 || xhr.status === 304)) {
            let res = xhr.responseText
        }
    }
    ```

14. **变量提升**
    使用var定义的变量和函数的声明会被提升到代码执行的最前面。变量提升带来了关于作用域等诸多问题  
    ES6改用let const 声明变量，不存在变量提升，

15. **举例说明一个匿名函数的典型用例**
    匿名函数： 没有 函数名称的函数。
    匿名函数的作用是用于闭包和避免全局变量的污染以及函数名的冲突
    ```js
    //通过闭包可以 返回局部变量
    function box() {
        var user = 'Lee';
        return function () {//通过匿名函数返回box()局部变量
            return user;
    };
    }
    alert(box()());//通过box()()来直接调用匿名函数返回值
     
    var b = box();
    alert(b());//另一种调用匿名函数返回值
    ```
    参考： [匿名函数的典型用例](https://blog.csdn.net/weixin_40387601/article/details/80424956)


16. **指出JS的宿主对象和原生对象的区别，为什么扩展JS内置对象不是好的做法？有哪些内置对象和内置函数？**
    原生对象：Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError、Global

    内置对象：Global（全局对象）、Math

    宿主对象：有宿主提供的对象，在浏览器中window对象以及其下边所有的子对象(如bom、dom等等)，在node中是globla及其子对象，也包含自定义的类对象。【何为"宿主对象"？ 在web中，ECMAScript中的"宿主"当然就是我们网页的运行环境，即"操作系统"和"浏览器"。所有非本地对象都是宿主对象（host object），即由 ECMAScript 实现的宿主环境提供的对象。】

    详细参考： [原生、内置、宿主对象详解](https://blog.csdn.net/weixin_40387601/article/details/80431670)

17. **attribute和property的区别**
    attribute是特性，是HTML中的，prototype是属性，这两个不是同一个东西，并且操作，获取都不太一样，有时候值也会存在不一样的情况。  
    [attribute和property的区别](http://stylechen.com/attribute-property.html)


18. **document load和document DOMContentLoaded两个事件的区别**
    * DOMContentLoaded: DOM解析完成即触发此事件，不等待styles, images等资源的加载
    * load：依赖的资源也已加载完成
    * DOMContentLoaded绑定到document，load绑定到window
    [详细区别](https://blog.csdn.net/weixin_40387601/article/details/80500235)

19. **`===` 和 `==` , `[]` === `[]`, undefined === undefined,`[]` ==` []`, undefined == undefined**
    `===`严格相等， `==`在类型不一样的情况下，会做类型转换或者隐式转换。  
    `[]` === `[]` //false
    undefined === undefined //true  
    `[]` ==` []`  //false  
    undefined == undefined //true

20. **typeof能够得到哪些值**
    "number"、"string"、"boolean"、"object"、"function" 和 "undefined" ，"Symbol"。返回的一定是基本类型


21. **函数的作用域是什么？js 的作用域有几种？**
    JavaScript的函数作用域是指在函数内声明的所有变量在函数体内始终是可见的，可以在整个函数的范围内使用及复用，也就是说在函数体内变量声明之前就已经可用了(事实上在嵌套的作用域中也可以使用)。
    ES5具有全局作用域和块级作用域  
    [答案详解](https://blog.csdn.net/weixin_40387601/article/details/80515665)

22. **JS如何实现重载和多态**
    **重载：**  
    重载可认为是静态的多态，静态联编，发生在编译阶段；  
    重载就是一组具有相同名字、不同参数列表的函数（方法）。  
    重载，函数特征之一，表现为在一个类中同名不同参的方法分别被调用会产生不同的结果。

    **多态：**  
    多态是动态的，动态联编，发生在运行阶段；  
    多态，面向对象特征之一，表现为不同对象调用相同方法会产生不同的结果。可以理解一个方法被不同实现后 展现不同的效果及状态。  
    静态的比动态的效率高，但动态的最大优点是多态性，提高代码复用性。

    [如何实现](https://blog.csdn.net/weixin_40387601/article/details/80529351)


23. **常用的数组api，字符串api**
    **不改变原数组**
    1. contact
    2. slice
    3. indexOf
    4. lastIndexOf
    5. includes
    6. toString

    **改变原数组**
    1. push
    2. pop
    3. shift
    4. unshift
    5. sort
    6. join
    7. fill
    8. copyWithin
    9. reverse
    10. splice

    **迭代方法及其他**
    * is.Array
    * Array.from
    * Array.map
    * Array.forEach
    * Array.entries
    * Array.keys
    * Array.values
    * Array.find
    * Array.findIndex
    * Array.every
    * Array.some
    * Array.filter
    * Array.reduce
    * Array.reduceRight


    **字符串方法**
    1. charCodeAt, charAt, charPointAt
    2. contact
    3. indexOf, lastIndexOf
    4. split
    5. replace
    6. search
    7. slice
    8. repeat
    9. trim
    10. induces
    11. match
    12. substr, sub , substring ,
    13. padStart, padEnd
    14. startsWith, endsWith
    15. toLocalLowerCase, toLocalUpCase

24. **原生事件绑定（跨浏览器）？**
    ```js
    /** DOM2级事件处理程序  浏览器兼容
     * IE-attachEvent()  detachEvent()
     * 其他-addEventListener()  removeEventListener()
     * EventUtil: 全局对象
     * 使用：EventUtil.addHandler(ele,type,handler)
     * **/
    let EventUtil = {
        addHandler: (element, type, handler) => {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false)
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler)
            } else {
                element['on' + type] = handler;
            }
        },
        removeHandler: (element, type, handler) => {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false)
            } else if (element.detachEvent()) {
                element.detachEvent('on' + type, handler)
            } else {
                element['on' + type] = null;
            }
        }
    }
    ```

25. **给定一个元素获取它相对于视图窗口的坐标**
    * **innerHeight/innerWidth** 表示DOM视口的大小，包括滚动条。也就是浏览器页面显示内容大小
    * **outerHeight/outerWidth** 表示整个浏览器窗口的大小，包括窗口标题、工具栏、状态栏等
    * **clientHeight/clientWidth** 表示元素的内容部分再加上padding的所占据的视觉面积，不包括border和滚动条占用的空间。
    * **scrollHeight/scrollWidth** 表示元素包含滚动条在内的该元素的视觉面积。如果有滚动条的话，就是`clientHight`再加上滚动条的高度。
    * **offsetHeight/offsetWidth** 表示元素除了margin之外的所有，包括padding、border、水平滚动条，但不包括margin的元素的高度
    * **scrollTop、scrollLeft** 表示有滚动条时，滚动条向下或者向右滚动的距离，没有滚动条时值为0。
    * **offsetTop/offsetLeft** 表示该元素的左上角与父容器（offsetParent对象）左上角的距离。所以，只需要将这两个值进行累加，就可以得到该元素的绝对坐标。
    * JS中新加的 `getBoundingClientRect()`对象返回left，right top, bottom, width , height , x , y等属性


    [JS中位置获取](http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html)

26. **如何实现图片滚动懒加载**
    [实现](https://i.jakeyu.top/2016/11/26/%E5%AE%9E%E7%8E%B0%E5%9B%BE%E7%89%87%E6%87%92%E5%8A%A0%E8%BD%BD/)

27. **js 的字符串类型有哪些方法？ 正则表达式的函数怎么使用？**
    正则：search replace match


28. **深拷贝**
    1、使用扩展运算符针对普通对象进行深拷贝  
    2、使用Json 的parse 和stringify方法，但是正则， function不行  
    [总结](https://xia-ao.gitbook.io/notes/js/js-deep-clone)


29. **编写一个通用的事件监听函数**
    同24。


30. **web端cookie的设置和获取**
    [详解](https://segmentfault.com/a/1190000004556040)


31. **setTimeout和promise的执行顺序**
    视具体情况而看，如果promise里面执行的是同步的，则按照顺序执行了，setTimeout在后面执行。  
    可以看看这篇博文，关于JS的 [loop执行](https://www.tuicool.com/articles/MnY7N3a)

32. **JavaScript 的事件流模型都有什么？**
    事件捕获 > 事件处理 > 事件冒泡
    [事件机制](https://xia-ao.gitbook.io/notes/js/shi-jian-ji-zhi)

33. **navigator对象，location和history**
    navigator对象包含有关浏览器的信息，history对象包含访问过的url信息， location对象包含当前URL的信息  
    [详解](https://my.oschina.net/superkangning/blog/340196)

34. **内存泄漏的原因和场景**
    泄露原因：  
    1、全局变量。 2、未及时清除定时器和绑定事件 。 3、DOM以外的引用。 4、 使用闭包带来的问题。  
    查看内存是否泄露： Chrome的profile工具，抓包直接看到内存是否有非正常增长
    [详细解答](https://octman.com/blog/2016-06-28-four-types-of-leaks-in-your-javascript-code-and-how-to-get-rid-of-them/)

35. **DOM事件的绑定的几种方式**
    1. 在DOM中使用onXXX=function(){}
    2. 在js中对获取的DOM对象使用onXXX=function(){}
    3. 在js中使用addEventListener(XXX, function(){}) , IE中为attachEvent
    4. `<script for="domId" event="onXXX">fun();</script>`
    [绑定方式](https://my.oschina.net/junn/blog/113210)

36. **DOM事件中target和currentTarget的区别**
    target在事件流的目标阶段；currentTarget在事件流的捕获，目标及冒泡阶段。只有当事件流处在目标阶段的时候，两个的指向才是一样的， 而当处于捕获和冒泡阶段的时候，target指向被单击的对象而currentTarget指向当前事件活动的对象（一般为父级）。  
    currentTarget一般为事件中的this

37. **typeof 和 instanceof 区别，instanceof原理**
    `typeof`用来返回操作数 类型的 **字符串** 。  
    instanceof 运算符是用来测试一个对象是否在其原型链原型构造函数的属性。其语法是`object instanceof constructor`
    **instanceof 主要的实现原理就是只要右边变量的 prototype 在左边变量的原型链上即可，即每次取左边对象的prototype和右边对象的`__proto__`。因此，instanceof 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 prototype，如果查找失败，则会返回 false** 。  
    [区别及原理](https://blog.csdn.net/qq_38722097/article/details/80717240)

38. **js动画和css3动画比较**
    简单或者一次性的动画使用css动画。  
    复杂动画使用JS控制， 更复杂麻烦的，可以使用canvas

39. **JavaScript 倒计时（setTimeout）**



40. **js处理异常**
    通常使用try...catch...捕获并抛出


41. **轮播图的实现，以及轮播图组件开发，轮播10000张图片过程**


42. **websocket的工作原理和机制。**  
    长轮询机制类似，采用的阻塞模式，需要很高的并发  
    [WebSocket 是什么原理？为什么可以实现持久连接？](https://www.zhihu.com/question/20215561)

43. **手指点击可以触控的屏幕时，是什么事件？**
    * touchstart  当手指放在屏幕上触发。
    * touchmove  当手指在屏幕上滑动时，连续地触发。
    * touchend  当手指从屏幕上离开时触发。
    * touchcancel  当系统停止跟踪时触发，系统什么时候取消，文档没有明确的说明。


44. **什么是函数柯里化？以及说一下JS的API有哪些应用到了函数柯里化的实现？(函数柯里化一些了解，以及在函数式编程的应用，最后说了一下JS中bind函数和数组的reduce方法用到了函数柯里化。)**  
    柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术。  
    [函数柯里化](https://github.com/mqyqingfeng/Blog/issues/42)

45. **JS代码调试**
    chrome的tools














