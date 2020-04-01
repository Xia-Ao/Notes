# HTTPS

http与https区别

1. https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。
2. http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。
3. http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。
4. http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。
5. https占用更多的服务器资源。HTTP使用TCP三次握手建立连接，客户端和服务器需要交换3个包，HTTPS除了TCP的三个包，还要加上ssl握手需要的9个包，所以一共是12个包。与http相比，https占用资源主要来源于SSL/TLS本身消耗多少服务器资源。

对比参考[ HTTP 与 HTTPS 的区别](https://juejin.im/entry/58d7635e5c497d0057fae036)的总结

### SSL/STL加密的过程以及SSL协议

**握手过程**：

![](http://www.ruanyifeng.com/blogimg/asset/2014/bg2014092003.png)

第一步，client端给出协议版本号、一个客户端生成的随机数（Client random），以及客户端支持的加密方法。

第二步，server端确认双方使用的加密方法，并给出数字证书、以及一个服务器生成的随机数（Server random）。

第三步，client端确认数字证书有效，然后生成一个新的随机数（Premaster secret），并使用数字证书中的公钥，加密这个随机数，发给server端。

第四步，server端使用自己的私钥，获取client端发来的随机数（即Premaster secret）。

第五步，client端和server端根据约定的加密方法，使用前面的三个随机数，生成"对话密钥"（session key），用来加密接下来的整个对话过程。

握手成功之后使用对话密钥（对称密钥）加密数据，客户端使用对话密钥解密数据。

整个握手阶段都不加密（也没法加密），都是明文的。因此，如果有人窃听通信，他可以知道双方选择的加密方法，以及三个随机数中的两个。整个通话的安全，只取决于第三个随机数（Premaster secret）能不能被破解。

阮老师有讲到过SSL加密的过程以及SSL协议, 相关SSL的普及知识可以参考这里：

- [SSL/TLS协议运行机制的概述](http://www.ruanyifeng.com/blog/2014/02/ssl_tls.html)
- [图解SSL/TLS协议](http://www.ruanyifeng.com/blog/2014/09/illustration-ssl.html)
- [SSL延迟有多大](http://www.ruanyifeng.com/blog/2014/09/ssl-latency.html)
