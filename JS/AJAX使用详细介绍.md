关于Ajax请求这部分内容，有一篇博文江讲解的十分详细

# 地址：[路易斯-Ajax知识体系大梳理](http://louiszhai.github.io/2016/11/02/ajax/#ajax)

个人总结几个知识点

#### 1、ajax请求，浏览器线程处理过程。

![](/assets/import.png\)![]\(/assets/import2.png)

这个过程跨越了解一下浏览器[重绘和回流](http://www.cnblogs.com/luleixia/p/6306061.html)

#### 2、XMLHttpRequest属性来源于继承

```
xhr << XMLHttpRequest.prototype << XMLHttpRequestEventTarget.prototype << EventTarget.prototype << Object.prototype
```

#### 3、XMLHttpRequest属性内容

一个xhr实例对象拥有10个普通属性+9个方法.  
**readyState**

![](/assets/ajax1.png)

**onreadystatechange**  
**status**  
**statusText**  
**onloadstart**  
**onprogress**  
**onload**  
**onloadend**  
**timeout**  
**ontimeout**

#### 4、jquery封装ajax方法

$.ajax是jquery对原生ajax的一次封装. 通过封装ajax, jquery抹平了不同版本浏览器异步http的差异性, 取而代之的是高度统一的api. jquery作为js类库时代的先驱, 对前端发展有着深远的影响. 了解并熟悉其ajax方法, 不可谓不重要.

#### 5、Axios

* Axios支持node, jquery并不支持.
* Axios基于promise语法, jq3.0才开始全面支持.
* Axios短小精悍, 更加适合http场景, jquery大而全, 加载较慢.
* vue作者尤大放弃推荐vue-resource, 转向推荐Axios. 
  #### 6、 CORS跨域资源共享

  CORS是一个W3C\(World Wide Web\)标准, 全称是跨域资源共享\(Cross-origin resource sharing\).它允许浏览器向跨域服务器, 发出异步http请求, 从而克服了ajax受同源策略的限制. 实际上, **浏览器不会拦截不合法的跨域请求, 而是拦截了他们的响应,** 因此即使请求不合法, 很多时候, 服务器依然收到了请求.\(Chrome和Firefox下https网站不允许发送http异步请求除外\)
  ORS请求分为两种, ① 简单请求; ② 非简单请求.

满足如下两个条件便是简单请求, 反之则为非简单请求.\(CORS请求部分摘自阮一峰老师博客\)

1\) 请求是以下三种之一:
- HEAD
- GET
- POST

2\) http头域不超出以下几种字段:
- Accept  
- Accept-Language  
- Content-Language  
- Last-Event-ID  
- Content-Type字段限三个值 application/x-www-form-urlencoded、multipart/form-data、text/plain

对于简单请求, 浏览器将发送一次http请求, 同时在Request头域中增加 Origin 字段, 用来标示请求发起的源, 服务器根据这个源采取不同的响应策略. 若服务器认为该请求合法, 那么需要往返回的 HTTP Response 中添加 Access-Control-* 等字段.
对于非简单请求, 比如Method为POST且Content-Type值为 application/json 的请求或者Method为 PUT 或 DELETE 的请求, 浏览器将发送两次http请求. 第一次为preflight预检(Method: OPTIONS),主要验证来源是否合法. 值得注意的是:OPTION请求响应头同样需要包含 Access-Control-* 字段等. 第二次才是真正的HTTP请求. 所以服务器必须处理OPTIONS应答(通常需要返回20X的状态码, 否则xhr.onerror事件将被触发).

#### 4、跨越解决方案

跨域解决方案可以参考另一篇有关[同源策略到前端跨域](/JS/同源策略到前端跨域.md)。
ajax的跨域主要有CROS、 使用代理、JSONP、webSocket这几种方案，具体的都在上面[同源策略到前端跨域](/JS/同源策略到前端跨域.md)。










