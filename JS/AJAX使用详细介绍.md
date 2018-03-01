关于Ajax请求这部分内容，有一篇博文江讲解的十分详细

# 地址：[路易斯-Ajax知识体系大梳理](http://louiszhai.github.io/2016/11/02/ajax/#ajax)

个人总结几个知识点

#### 1、ajax请求，浏览器线程处理过程。

![](/assets/import.png)![](/assets/import2.png)

这个过程跨越了解一下浏览器[重绘和回流](http://www.cnblogs.com/luleixia/p/6306061.html)

#### 2、XMLHttpRequest属性来源于继承

```
xhr << XMLHttpRequest.prototype << XMLHttpRequestEventTarget.prototype << EventTarget.prototype << Object.prototype
```
#### 3、XMLHttpRequest属性内容

一个xhr实例对象拥有10个普通属性+9个方法.