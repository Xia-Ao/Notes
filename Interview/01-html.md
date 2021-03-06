# 前端知识点总结（HTML篇）

## HTML
1. **ie的某些兼容性问题**
2. **doctype的作用**
3. **HTML中标准模式和怪异模式有什么不同**
4. **写出你常用的HTML标签**
5. **为什么要少用iframe**
6. **HTML语义化的理解**
7. **行内元素和块级元素的异同及img类似的特殊性**
8. **盒模型，及在浏览器兼容方面的异同**

## HTML5  
1. **HTML5的新特性**  
2. **canvas画图**
3. **HTML5中引进`data-`有什么作用**
4. **canvas的性能优化**



## 新增
2018-08-14
1. **HTML5新特性，语义化**
2. **浏览器的标准模式和怪异模式**
3. **xhtml和html的区别**
4. **使用data-的好处**
5. **meta标签**
6. **meta viewport原理**
7. **canvas**
8. **TML废弃的标签**
9. **IE6 bug，和一些定位写法**
10. **css js放置位置和原因**
11. **什么是渐进式渲染**
12. **html模板语言**

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


13. **ie的某些兼容性问题**
   [IE的兼容性问题](http://fengzheqi.com/2015/10/18/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%85%BC%E5%AE%B9/)

14. **doctype的作用**  
   答案：doctype告诉浏览器它使用了什么文档类型。它指出阅读程序应该用什么		规则集来解释文档中的标记。XHTML中有三种，包括过度型、严格型、框架型。HTML4严格。随着XML的流行，HTML推出了XHTML标准，其中严格模式严格遵守了XML的规范，例如属性必须有值、标签必须闭合等，同时也抛弃了一些不推荐的标签。而XHTML过度版本，则稍微比严格模式松散些，一些不推荐的标签依然可用外。当页面有框架时，则应该使用框架型。再就是HTML5的版本。使用HTML5的Doctype会默认触发标准模式。

15. **HTML中标准模式和怪异模式有什么不同**  
   答案：由于历史的原因，各个浏览器在对页面的渲染上存在差异，甚至同一浏览器在不同版本中，对页面的渲染也不同。在W3C标准出台以前，浏览器在对页面的渲染上没有统一规范，产生了差异(Quirks mode或者称为Compatibility Mode)；由于W3C标准的推出，浏览器渲染页面有了统一的标准(CSScompat或称为Strict mode也有叫做Standars mode)，这就是二者最简单的区别。  
   W3C标准推出以后，浏览器都开始采纳新标准，但存在一个问题就是如何保证旧的网页还能继续浏览，在标准出来以前，很多页面都是根据旧的渲染方法编写的，如果用的标准来渲染，将导致页面显示异常。为保持浏览器渲染的兼容性，使以前的页面能够正常浏览，浏览器都保留了旧的渲染方法（如：微软的IE）。这样浏览器渲染上就产生了Quircks mode和Standars mode，两种渲染方法共存在一个浏览器上。火狐一直工作在标准模式下，但IE（6，7，8）标准模式与怪异模式差别很大，主要体现在对盒子模型的解释上，这个很重要，下面就重点说这个。    那么浏览器究竟该采用哪种模式渲染呢？这就引出的DTD，既是网页的头部声明，浏览器会通过识别DTD而采用相对应的渲染模式。  
   1.浏览器要使老旧的网页正常工作，但这部分网页是没有doctype声明的，所以浏览器对没有doctype声明的网页采用quirks mode解析。  
   2.对于拥有doctype声明的网页，什么浏览器采用何种模式解析，这里有一张详细列表可参考：[点击这里](http://hsivonen.iki.fi/doctype)。  
   3.对于拥有doctype声明的网页，这里有几条简单的规则可用于判断：对于那些浏览器不能识别的doctype声明，浏览器采用strict mode解析。  
   4.在doctype声明中，没有使用DTD声明或者使用HTML4以下（不包括HTML4）的DTD声明时，基本所有的浏览器都是使用quirks mode呈现，其他的则使用strict mode解析。  
   5.可以这么说，在现有有doctype声明的网页，绝大多数是采用strict mode进行解析的。  
   6.在ie6中，如果在doctype声明前有一个xml声明(比如:<?xml version=”1.0″ encoding=”iso-8859-1″?>)，则采用quirks mode解析。这条规则在ie7中已经移除了。  

16. **写出你常用的HTML标签**  
   答案：根据自己的使用和掌握来写吧。参考http://blog.csdn.net/ithomer/article/details/5277162。

17. **为什么要少用iframe**  
   答案：[为什么应该减少使用iframe](http://www.williamlong.info/archives/3136.html)  
   iframe的创建比其它包括scripts和css的 DOM 元素的创建慢了 1-2 个数量级。  
   Iframes阻塞页面加载:window 的 onload 事件需要在所有 iframe 加载完毕后(包含里面的元素)才会触发。在 Safari 和 Chrome 里，通过 JavaScript 动态设置 iframe 的 SRC 可以避免这种阻塞情况。  
   唯一的连接池:有人可能希望 iframe 会有自己独立的连接池，但不是这样的。绝大部分浏览器，主页面和其中的 iframe 是共享这些连接的。这意味着 iframe 在加载资源时可能用光了所有的可用连接，从而阻塞了主页面资源的加载。如果 iframe 中的内容比主页面的内容更重要，这当然是很好的。但通常情况下，iframe 里的内容是没有主页面的内容重要的。这时 iframe 中用光了可用的连接就是不值得的了。一种解决办法是，在主页面上重要的元素加载完毕后，再动态设置 iframe 的 SRC。

18. **HTML语义化的理解**  
   答案：用正确的标签表达正确的内容，可以增强网页的易用性（如障碍人士访问等）和搜索引擎的爬取和检索。HTML5新增的语义化标签如header\section\article\footer等。

19. **行内元素和块级元素的异同及img类似的特殊性**  
    答案：行内元素和块级元素异同如下：  
    1.行内元素与块级元素直观上的区别，行内元素会在一条直线上排列，都是同一行的，水平方向排列;  
    2.块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素;    
    3.行内元素与块级元素的属性的不同，主要是盒模型属性上(行内元素设置width无效，height无效(可以设置line-height)，margin上下无效)；  
    4.行内元素转换为块级元素,通过设置display:block

    注：img\input\textarea等是特殊的行内元素，确切的说是inline-block元素。

20. **盒模型，及在浏览器兼容方面的异同**  
    答案：浏览器的盒子模型指的是它的盒子宽度需要包括内容区宽度、内外边距和边框大小，高度类似。一般设置宽度默认是对应内容区宽度。  
    兼容性方面：在IE7以前的版本中设置宽度是包括：内边距+边框+内容区的。IE7之后跟其它浏览器一样，都是只对应内容区的宽度。可以通过修改box-sizing:border-box来修改。让设置宽度等于内容区和边框和内边距之和。

## HTML5

1. **HTML5的新特性**  
   答案：HTML5新增的特性与API
   **语义化标签**：提升Web的可用性，利于SEO和屏幕阅读器；一般有header、footer、nav、article、section等。  
   **新的音视频**：HTML中包含audio和video标签，可以播放视频和音评，不过格式有限制。  
   **Geolocation**：提供地理位置的API，获取用户的地理位置信息。  
   **WebSocket**：提供Websock的API，使得web可以实时的接受服务器响应。  
   **Communication**：HTML5中提供了CORS，可以实现跨域资源共享；还有实现了跨文档消息传输，postMessage。  
   **Form API**：增强了form表单，比如增加了input的type类型，number/tel/range等，点击查看[移动端显示](http://www.oschina.net/translate/using-html5-input-types-to-enhance-the-mobile-browsing-experience?cmp)。  
   **Webworkers**：Webworkers使得在浏览器端也可以实现多线程的应用。  
   **WebStorage**：Webstorage是为了减少http请求，在用户客户端实现缓存数据，包括localStorage和sessionStorage，还有indexDB等。  
   **OffineWeb**：浏览器借用WebStorage可以实现一些简单的离线应用，比如读写邮件、编辑文档、创建todo等
   **推荐博客**：  
   [28 HTML5 Features, Tips, and Techniques you Must Know](http://code.tutsplus.com/tutorials/25-html5-features-tips-and-techniques-you-must-know--net-13520)  [中文](http://www.zhangxinxu.com/wordpress/2010/08/%E7%BF%BB%E8%AF%91-%E4%BD%A0%E5%BF%85%E9%A1%BB%E7%9F%A5%E9%81%93%E7%9A%8428%E4%B8%AAhtml5%E7%89%B9%E5%BE%81%E3%80%81%E7%AA%8D%E9%97%A8%E5%92%8C%E6%8A%80%E6%9C%AF/)

2. **canvas画图**  

3. **HTML5中引进`data-`有什么作用**  
   答案：data-是HTML5新增的一个自定义属性。用以方便开发者在HTML中自定义一些属性来存储和操作数据，同时又不违背HTML的规范，不会带来一些副作用。data-自定义属性非常简单，如下例：

   ``` html
   <article  id="electriccars"  data-columns="3"  data-index-number="12314"  data-parent="cars">...</article>。
   ```

   通过JS去获取自定义属性非常简单，可以通过 getAttribute()传递全部名称来获取，也可以使用 dataset 属性集来获取。如：

   ``` javascript
   var article = document.querySelector('#electriccars');
   article.dataset.columns; // "3"  
   article.dataset.indexNumber ;// "12314"  
   article.dataset.parent ;//
   ```

4. **canvas的性能优化**  
   答案：主要有使用缓存、避免浮点运算、尽量减少canvas API的调用、硬件加速。  
   [canvas的性能优化](http://www.cnblogs.com/rubylouvre/p/3570636.html)
