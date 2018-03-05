## http与https区别

1、https协议需要到ca申请证书，一般免费证书较少，因而需要一定费用。

2、http是超文本传输协议，信息是明文传输，https则是具有安全性的ssl加密传输协议。

3、http和https使用的是完全不同的连接方式，用的端口也不一样，前者是80，后者是443。

4、http的连接很简单，是无状态的；HTTPS协议是由SSL+HTTP协议构建的可进行加密传输、身份认证的网络协议，比http协议安全。

5、https占用更多的服务器资源。HTTP使用TCP三次握手建立连接，客户端和服务器需要交换3个包，HTTPS除了TCP的三个包，还要加上ssl握手需要的9个包，所以一共是12个包。与http相比，https占用资源主要来源于SSL/TLS本身消耗多少服务器资源。

详细来源：[https://juejin.im/entry/58d7635e5c497d0057fae036](https://juejin.im/entry/58d7635e5c497d0057fae036)

