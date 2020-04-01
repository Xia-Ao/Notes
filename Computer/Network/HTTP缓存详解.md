# HTTP缓存
HTTP缓存是一个讨论非常多的问题 
缓存一直是一个高频的问题，在使用的过程中，一般遵循默认，静态资源一般亲强制缓存或者协商缓存

## 缓存流程

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6EMXmASb_mAAID1eIE5rM594.png)

总的来说，客户端从服务器请求数据经历如下基本步骤:
1. 检查是否已缓存（强制缓存）：如果请求命中本地缓存则从本地缓存中获取一个对应资源的副本；
2. 检查这个资源是否新鲜：是则直接返回到客户端，否则继续向服务器转发请求，进行再验证。
3. 协商判断阶段：服务器接收到请求，然后再验证判断资源是否相同，是则返回`304 not modified`，未变更。 否则返回新内容和`200`状态码。
4. 客户端更新本地缓存。

上面其实用到了两种缓存的策略
- 强制缓存
- 协商缓存

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6ENSeAey4mAAHrU5UCzq0513.png)

### 强制缓存

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6ENlyAbNDeAAF4nG3UoAo702.png)

Expires 是http响应头，表示一个时间戳，在此时间内缓存有效，但是是一个绝对时间，不同地区会不一样。

在强制缓存中，不同浏览器也有自身的缓存策略，chorme浏览器会有自身的缓存，我们经常看到从缓存中加载资源的两种方式
- from memory cache
从内存中获取更新频率较高的资源

- from disk cache
从硬盘上获取更新频率较低的资源

具体采用哪一种，取决的chrome的决策，其他浏览器一般都没有这么标识，只提供了是从缓存中获取。

### 协商缓存
当第一次请求中的返回头中没有 `Cache-Control`和`Expires`头或者`Cache-Control`设置`no-cache`(不强制缓存)或者`Expires`已经过期，强制缓存没有命中时，第二次请求会走 协商缓存。

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6EOIKAferwAAGNOO2JJYY490.png)

详细的过程可以看上面第二次请求的流程图。


下面是协商缓存第二次请求过程， 返回304状态时，请求带过去的请求头和返回的返回头。

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6EMmiAD0jdAAEc2k-EG2o701.png)

#### Last-Modified/If-Modified-Sinces

Last-Modified 也是也是一个时间戳，下一次请求会这个时间戳放到请求头中的`If-modified-since`字段上。web服务器收到请求后发现有头If-Modified-Since 则与被请求资源 **在客户端的最后修改时间 `Last-Modified`** 进行比对。若最后修改时间较新，说明资源又被改动过，则响应整片资源内容（写在响应消息包体内），响应状态码为 `HTTP 200`；若最后修改时间 `Last-Modified`较旧，说明资源无新修改，则 `响应HTTP 304` (这里只需要发送一个head头，包体内容为空，这样就节省了传输数据量)，告知浏览器继续使用所保存的cache。

![](/assets/cache.png)


#### If-None-Match /Etag

HTTP协议规格引入ETag（被请求变量的实体标记），简单点即服务器响应时给请求URL标记，并在HTTP响应头中将其传送到客户端，类似服务器端返回的格式：
* Etag：web服务器响应请求时，告诉浏览器当前资源在服务器的唯一标识（生成规则由服务器觉得）。Apache中，ETag的值，默认是对文件的索引节（INode），大小（Size）和最后修改时间（MTime）进行Hash后得到的。
* If-None-Match：当资源过期时（使用Cache-Control标识的max-age），发现资源具有Etag声明，则再次向web服务器请求时带上头If-None-Match （Etag的值）。web服务器收到请求后发现有头If-None-Match 则与被请求资源的相应校验串进行比对，决定返回200或304。


#### 既生Last-Modified何生Etag？

你可能会觉得使用Last-Modified已经足以让浏览器知道本地的缓存副本是否足够新，为什么还需要Etag（实体标识）呢？HTTP1.1中Etag的出现主要是为了解决几个Last-Modified比较难解决的问题：
* `Last-Modified`标注的最后修改只能精确到秒级，如果某些文件在1秒钟以内，被修改多次的话，它将不能准确标注文件的修改时间
* 如果某些文件会被定期生成，但内容并没有任何变化，但Last-Modified却改变了，导致文件没法使用缓存
* 有些文档可能被修改了，但所做修改并不重要。（比如对注释或拼写的修改）
* 有可能存在服务器没有准确获取文件修改时间，或者与代理服务器时间不一致等情形

Etag是服务器自动生成或者由开发者生成的对应资源在服务器端的唯一标识符，能够更加准确的控制缓存。Last-Modified与ETag是可以一起使用的， **服务器会优先验证ETag，一致的情况下，才会继续比对Last-Modified，最后才决定是否返回304。**

但是Etag也存在一些问题，比如： **分布式系统尽量关闭掉Etag(每台机器生成的etag都会不一样)** 。Etag的服务器生成规则和强弱Etag的相关内容可以参考，[《互动百科-Etag》](http://www.baike.com/wiki/Etag),这里不再深入


### "空中碰撞" Etag + If-Match
场景：多人协同编辑同一份文档的时候，点保存的时候不确定文档在你编辑的时候有没有人保存过，
- 如果没有人保存过，可以直接保存
- 有人保存过，两种策略，一种直接覆盖（可能存在保存失败的情况），一种合并后保存。
  
如何判断别人有么有保存过，就需要用到`If-Match`.

If-Match表示这是一个条件请求。在请求方法为 GET 和 HEAD 的情况下，服务器仅在请求的资源满足此首部列出的 ETag值时才会返回资源。而对于 PUT 或其他非安全方法来说，只有在满足条件的情况下才可以将资源上传。

上述情况，别人已经保存过了，生成了新的Etag，但是我们点击保存的时候，带过去的If-match还是上一版文件的Etag，然后点保存的时候客户端校验就不会通过，返回412状态码（Precondition Failed先决条件失败）。

具体的策略是怎么样的我这边没有验证过，可以参考这篇文章：[使用 ETag 避免编辑冲突](https://zhuanlan.zhihu.com/p/35727755gg)，他会分为几种情况和不同的请求方法有不同的处理。


## 缓存的注意事项
1. 只有get请求会被缓存，post请求不会

2. Etag 在资源分布在多台机器上时，对于同一个资源，不同服务器生成的Etag可能不相同，此时就会导致304协议缓存失效，客户端还是直接从server取资源。可以自己修改服务器端Etag的生成方式，根据资源内容生成同样的Etag。

3. 系统上线，更新资源时，可以在资源uri后边附上资源修改时间、svn版本号、文件md5 等信息，这样可以避免用户下载到缓存的旧的文件。

4. 观察chrome的表现发现，通过链接或者地址栏访问，会先判断缓存是否过期，再判断缓存资源是否更新；F5刷新，会跳过缓存过期判断，直接请求服务器，判断资源是否更新。


## 补充：8种浏览器缓存机制
查看浏览器缓存，直接在chrome下打开devTools，application选项下面就是浏览器的8种缓存，其实还有一种，flash缓存，这种只有在使用flash的时候才使用，一般很少用到。

![](/assets/browerCache.png)

- HTTP缓存 对应Frames
- cookies
- LocalStorage
- SessionStorage
- IndexedDB
  - IndexedDB 是一个为了能够在客户端存储可观数量的结构化数据，并且在这些数据上使用索引进行高性能检索的 API。虽然 DOM 存储 对于存储少量数据是非常有用的，但是它对大量结构化数据的存储就显得力不从心了。IndexedDB 则提供了这样的一个解决方案。
  - IndexedDB 分别为同步和异步访问提供了单独的 API 。同步 API 本来是要用于仅供 Web Workers 内部使用，但是还没有被任何浏览器所实现。异步 API 在 Web Workers 内部和外部都可以使用，另外浏览器可能对indexDB有50M大小的限制，一般用户保存大量用户数据并要求数据之间有搜索需要的场景。
- Web SQL 小型数据库，允许SQL语句查询
- Cache Storage
CacheStorage是在ServiceWorker的规范中定义的。CacheStorage 可以保存每个serverWorker申明的cache对象，cacheStorage有open、match、has、delete、keys五个核心方法，可以对cache对象的不同匹配进行不同的响应。
- Application Cache
application cache是将大部分图片资源、js、css等静态资源放在manifest文件配置中。当页面打开时通过manifest文件来读取本地文件或是请求服务器文件。



## 参考
- [《HTTP权威指南》之缓存详解](http://www.zyy1217.com/2017/05/14/HTTP%E7%BC%93%E5%AD%98%E8%AF%A6%E8%A7%A3/)
- [一文读懂http缓存（超详细）](https://www.jianshu.com/p/227cee9c8d15)
- [Cache-Control](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Cache-Control)
- [使用 ETag 避免编辑冲突](https://zhuanlan.zhihu.com/p/35727755gg)
- [If-Match](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/If-Match)