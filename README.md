一个进击的小前端的在前端之路上的笔记，目录大纲也换过几次，从一开始的按照语言分类，到按照技术类型分类，最后按照前端需要具备的知识体系分类，也是一个学习和成长过程。

电子书[在线查看](https://xia-ao.gitbook.io/notes)

个人工程（可公开）：
- [嗷嗷图床](https://img.xiaao.xin)
- [嗷嗷发布系统](https://wukong.xiaao.xin)

## [目录](README.md)
- [Introduction](README.md)

- <span id='language'>[语言]()</span>
  - [JS](/Language/JS/README.md)
    <!-- JS基础 -->
    - [DOM对象节点介绍](/Language/JS/DOM对象节点介绍.md)
    - [DOM树遍历](/Language/JS/DOM遍历.md)
    - [String对象](/Language/JS/String对象.md)
    - [Array操作方法](/Language/JS/Array操作方法.md)
    - [JS数据结构之神奇的树](/Language/JS/data-structure.md)
    - [JS中数据类型、运算符以及容易挖坑的坑位](/Language/JS/运算符.md)
    - [JS数据结构之神奇的树](/Language/JS/data-structure.md)
    - [JS中数据类型、运算符、严格相等](/Language/JS/运算符.md)
    - [遍历方法汇总以及适用对象](/Language/JS/JS遍历.md)

    <!-- JS高级内容 -->
    - [this对象](/Language/JS/this对象.md)
    - [作用域以及变量提升](/Language/JS/作用域与变量提升.md)
    - [JS递归](/Language/JS/递归.md)
    - [JavaScript原型到原型链](/Language/JS/js从原型到原型链.md)
    - [JS继承的实现](/Language/JS/继承.md)
    - [JS闭包](/Language/JS/闭包.md)
    - [JS实现深复制](/Language/JS/JS-deep-clone.md)
    - [Promise](/Language/JS/Promise.md)
    - [正则表达式](/Language/JS/正则表达式.md)
    - [AJAX过程以及知识体系](/Language/JS/AJAX使用详细介绍.md)
    - [同源策略到前端跨域解决方案](/Language/JS/同源策略到前端跨域.md)
    - [Javascript 严格模式详解(转载)](https://www.ruanyifeng.com/blog/2013/01/javascript_strict_mode.html)
    - [JS的EventLoop](/Language/JS/JS-EventLoop.md)

    <!-- JS应用场景 -->
    - [数组、字符串中查找最大重复次数最高元素的多种方法](/Language/JS/数组、字符串中最大、重复元素查找.md)
    - [用Javascript获取页面元素的位置（client scroll offset等宽度）（转载）](http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html)
    - [js实现一个图片懒加载插件](图片懒加载实现.md)
    - [前端性能优化](/Language/JS/前端性能优化.md)
    - [JS事件流机制](/Language/JS/JS事件流机制.md)
    - [JS节流与防抖](/Language/JS/节流与防抖.md)
    - [JS设计模式](/Language/JS/JS设计模式.md)
  - [TS](/Language/TS/README.md)
    - [泛型](/Language/TS/泛型.md)
    - [枚举](/Language/TS/枚举.md)
    - [声明合并](/Language/TS/声明合并.md)
    - [类型推断]
    - [模块](/Language/TS/模块.md)
    - [命名空间]
    <!-- 实战 -->
    - [声明文件](/Language/TS/声明文件.md)
    - [项目配置](/Language/TS/项目配置.md)
  - [CSS](/Language/CSS/README.md)
    - [CSS选择器速查表](/Language/CSS/CSS-selector.md)
    - [CSS选择器详细](/Language/CSS/图解CSS3/CSS3-selcetor/README.md)
    - [CSS引入方式以及优先级计算](/Language/CSS/CSS引入方式以及优先级计算.md)
    - [position不同值定位](/Language/CSS/position.md)
    - [行内元素与块级元素](/Language/CSS/CSS元素属性易混淆点.md)
    - [BFC神奇背后的原理-文摘](/Language/CSS/BFC神奇背后的原理-文摘.md)
    - [回流reflow与重绘repaint](/Language/CSS/reflow&repaint.md）
    - [transition && animation动画属性](/Language/CSS/animation&transition.md)
    - [强大的transform](/Language/CSS/transform.md)
    - [布局知识](/Language/CSS/布局.md)
    - [flex布局](/Language/CSS/flex布局.md)
    - [三栏式布局](/Language/CSS/三栏式布局.md)
    - [垂直居中](/Language/CSS/垂直居中.md)
    - [水平居中的方法（margin/text-algin区别）](/Language/CSS/水平居中.md)
    - [长度单位、字体单位以及各种高度等易混淆的区别](/Language/CSS/长度单位、字体单位、各种高度等易混淆属性.md)
    - [清除浮动的方法](/Language/CSS/清除浮动.md)
    <!-- - [scroll滚动隐藏](/Language/CSS/滚动隐藏.md) -->
    - [移动端适配方案](/Language/CSS/移动端适配.md)
    - [纯CSS斜切角实现](/Language/CSS/斜切角实现.md)
    - [CSS揭秘](/Language/CSS/CSS揭秘.md)
    - [背景图片轮播](/Language/CSS/背景图片轮播.md)
    - [浏览器CSS兼容](/Language/CSS/浏览器CSS兼容.md)
    - [CSS绘制序列帧动画](/Language/CSS/CSS绘制序列帧动画.md)
    - [transform实现一个多面体](/Language/CSS/transform实现一个多面体.md)
  - [HTML](/Language/HTML/README.md)
    - [`<meta>`标签](https://segmentfault.com/a/1190000004279791)- 转载
    - [`<!DOCTYPE>`](/Language/HTML/doctype.md)

- <span id="es6">[ES6](/ES6/README.md)</span>
  <!-- - [class继承](/ES6/19、class继承.md)
  - [1、let&const变量解构赋值](/ES6/1、let&const变量解构赋值.md)
  - [2、变量解构赋值](/ES6/2、变量解构赋值.md)
  - [3、字符串的扩展](/ES6/3、字符串的扩展.md)
  - [4、数值扩展](/ES6/4、数值扩展.md)
  - [5、数组扩展](/ES6/5、数组扩展.md)
  - [6、函数扩展](/ES6/6、函数扩展.md)
  - [7、对象扩展](/ES6/7、对象扩展.md)
  - [9、数据结构](/ES6/9、数据结构.md)
  - [10、Proxy&Reflect](/ES6/12、Proxy%26Reflect.md)
  - [Module模块](/ES6/22、Module.md)
  - [symbol对象](/ES6/symbol.md)
  - [16、Generator函数](/ES6/16、Generator函数.md)
  - [17、Generator异步操作](/ES6/17、Generator异步操作.md)
  - [16、Generator函数](/ES6/18、async异步函数.md) -->

- <span id='nodejs'>[Node.js](/Node.js/README.md)</span>
  - [xxx]()

- <span id='frame'>[前端框架](/Frame/README.md)</span>
  - [Vue.js](Frame/Vue/README.md)
    - [Vue双向数据绑定原理](Frame/Vue/data-bind.md)
    - [Vue-Router原理及实现](Frame/Vue/vue-router.md)
  - [React](Frame/React/README.md)
  - [AngularJS](Frame/AngularJs/README.md)

- <span id='constructPrj'>[工程构建](/PrjConstruct/README.md)</span>
  - [Webpack](/PrjConstruct/Webpack/README.md)
    - [01-webpack概述及背景](/PrjConstruct/Webpack/01-webpack概述及背景.md)
    <!-- - [02-webpack工程化配置](/PrjConstruct/Webpack/02-webpack工程化配置.md) -->
    - [03-webpack热更新原理](/PrjConstruct/Webpack/03-webpack热更新原理.md)
    - [04-splitChunks原理分析](/PrjConstruct/Webpack/04-splitChunks原理分析.md)
    - [05-webpack工作流程](/PrjConstruct/Webpack/05-webpack工作流程.md)
    - [07-webpack构建流程](/PrjConstruct/Webpack/07-webpack构建流程.md)
    - [07-webpack构建流程](/PrjConstruct/Webpack/07-webpack构建流程.md)
    - [10-webpack 如何进行性能分析](/PrjConstruct/Webpack/10-webpack如何进行性能分析.md)
    <!-- - [12-tresShaking](/PrjConstruct/Webpack/12-tresShaking.md) -->
  - [Gulp](/PrjConstruct/Gulp/README.md)
  - [Lint](/PrjConstruct/Lint/README.md)
    - [ESLint](/PrjConstruct/Lint/ESLint.md)
    - [TSLint](/PrjConstruct/Lint/TSLint.md)
  - [Bable](/PrjConstruct/Bable/README.md)

- <span id='Engineering'>[工程化](/Engineering/README.md)</span>
  - [模块化]()
  - [组件化]()
  - [规范化](/Engineering/Normalize/README.md)
    - [编码规范]()
  - [自动化]()

- <span id='opManage'>[运维](/OpManage/README.md)</span>
  - [Nginx](/OpManage/Nginx/README.md)
  - [GIT](/OpManage/GIT/README.md)
  - [CDN](/OpManage/CDN/README.md)
  - [VPS](/OpManage/VPS/README.md)
  - [DBA](/OpManage/DBA/README.md)

- <span id='applets'>[小程序](/Applets/README.md)</span>
  
- <span id='crossEnd'>[跨端](/CrossEnd/README.md)</span>

- <span id='test'>[测试](/Test/README.md)</span>

- <span id='computer'>[计算机技术](/Computer/README.md)</span>
  - [计算机网络](/Computer/Network/README.md)
    - [TCP数据传输](/Computer/Network/TCP数据传输.md)
    - [TCP和UDP的区别](/Computer/Network/TCP和UDP.md)
    - [HTTP协议概述](/Computer/Network/HTTP协议概述.md)
    - [HTTP缓存详解](/Computer/Network/HTTP缓存详解.md)
    - [HTTPS以及SSL建立过程](/Computer/Network/Computer/Network/HTTPS.md)
    - [HTTPS的七个误解（译文）](http://www.ruanyifeng.com/blog/2011/02/seven_myths_about_https.html) - 阮一峰
    - [cookie与Session机制区别以及Cookie SessionStorage LocalStorage异同](/Computer/Network/cookie与Session的区别.md)
    - [HTTP状态码Status](/Computer/Network/status状态码.md) 
    - [DNS原理入门](http://www.ruanyifeng.com/blog/2016/06/dns.html) - 阮一峰 
    - [网络攻击与防御](/Computer/Network/网络攻击与防御.md)
    - [HTTP转发与重定向](/Computer/Network/HTTP转发与重定向.md)
    - [登录认证设计](/Computer/Network/登录认证.md)
  - [操作系统](/Computer/OpSystem/README.md)
    - [shell脚本命令](/Computer/OpSystem/shell脚本命令.md)
  - [Linux](/Computer/Linux/README.md)
      - [Linux命令大全](/Computer/Linux/linux命令大全.md)
      - [vim命令](/Computer/Linux/vim命令.md)
  - [浏览器](/Computer/Browser/README.md)
    - [浏览器内核、JS 引擎、页面呈现原理及其优化](https://www.zybuluo.com/yangfch3/note/671516) - 转载
    - [九种浏览器端缓存机制概览](http://www.zyy1217.com/2017/05/13/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%AB%AF%E7%BC%93%E5%AD%98%E6%9C%BA%E5%88%B6/) - 转载
    - [性能优化-网络请求方面](/Computer/Browser/如何对网站的文件和资源进行优化.md)
    - [webkit解析CSS过程详解](/Computer/Browser/webkit解析CSS.md)

- <span id='interview'>[前端面试](/Interview/README.md)</span>
  - [算法](/Interview/README.md)
    - [剑指Offer - 1](/Interview/algorithm/剑指offer-1.md)
    - [经典算法-贪心算法](/Interview/algorithm/经典算法-贪心.md)
    - [经典算法-动态规划](/Interview/algorithm/经典算法-动态规划.md)
    - [排序算法](/Interview/algorithm/数组排序算法.md)
    - [前端算法题汇总](/Interview/algorithm/前端算法题汇总.md)









