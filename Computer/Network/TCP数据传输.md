# TCP 数据传输

一般数据传输的过程基本上分为三个步骤：
- 建立连接
- 数据传输
- 关闭连接

TCP协议当然也是这样的，下面我们从这张整体的图上来看下这个三个步骤。

![](/assets/816045-20161105220355065-482198403.png)

位码即tcp标志位，有6种标示：

- **SYN**(synchronous建立联机) 
- **ACK**(acknowledgement 确认) 
- **PSH**(push传送)
- **FIN**(finish结束) 
- **RST**(reset重置) 
- **URG**(urgent紧急)
- **Sequence number**(顺序号码) 
- **Acknowledge number**(确认号码)。

### TCP三次握手

先通俗的看一看有趣的图（来源网络）

![](/assets/tcp三次握手.png)

这张图就是tcp打招呼的步骤，就跟打电话一样，保证双方都能听到对方的消息。仔细想一想，我们在很多的场景都有遇到这样的设计。我们来具体看下三次握手做了什么。

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6DFAiAT0tMAAj72Bvvn1g126.png)

第一次握手：客户端发送syn包（syn=x）的数据包到服务器，并进入SYN\_SEND状态，等待服务器确认；

第二次握手：服务器收到syn包，必须确认客户的SYN（ack=x+1）包，给出应答，同时自己也发送一个SYN包（syn=y），询问对方建立连接，即SYN+ACK包，此时服务器进入SYN\_RECV状态；

第三次握手：客户端收到服务器的SYN＋ACK包，向服务器发送确认包ACK(ack=y+1)，此包发送完毕，客户端和服务器进入ESTABLISHED状态，完成三次握手。

握手过程中传送的包里不包含数据，三次握手完毕后，客户端与服务器才正式开始传送数据。理想状态下，TCP连接一旦建立，在通信双方中的任何一方主动关闭连接之前，TCP连接都将被一直保持下去。

### TCP 数据传输

建立连接之后就是数据传输了， 这个就是客户端需要什么，就向server端发送请求，server端收到请求之后响应就好了。

实际上在这个传输过程中，TCP采用了很多方法，用来提高传输的数据量和传输的次数，这个就涉及到协议设计相关的内容了。

### TCP四次分手

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6DFE2AT1dtAAq7z1hNh5Q642.png)

当客户端和服务器通过三次握手建立了TCP连接以后，当数据传送完毕，肯定是要断开TCP连接的啊。那对于TCP的断开连接，这里就有了神秘的“四次分手”。

第一次分手：主机1（可以使客户端，也可以是服务器端），设置Sequence Number和Acknowledgment Number，向主机2发送一个FIN报文段；此时，主机1进入FIN_WAIT_1状态；这表示主机1没有数据要发送给主机2了；

第二次分手：主机2收到了主机1发送的FIN报文段，向主机1回一个ACK报文段，Acknowledgment Number为Sequence Number加1；主机1进入FIN_WAIT_2状态；主机2告诉主机1，我“同意”你的关闭请求；

第三次分手：主机2向主机1发送FIN报文段，请求关闭连接，同时主机2进入LAST_ACK状态；

第四次分手：主机1收到主机2发送的FIN报文段，向主机2发送ACK报文段，然后主机1进入TIME_WAIT状态；主机2收到主机1的ACK报文段以后，就关闭连接；此时，主机1等待2MSL后依然没有收到回复，则证明Server端已正常关闭，那好，主机1也可以关闭连接了。  

至此，TCP的四次分手就这么愉快的完成了。当你看到这里，你的脑子里会有很多的疑问，很多的不懂，感觉很凌乱；没事，我们继续总结。

### 为什么要这么做

这里在网上看到有人提出来，TCP握手，为什么是三次，一次行不行，两次行不行，三次就一定可以了吗，
这些问题的解释参考网上的答案和《计算机网络》。

**为什么要三次握手**

- 在谢希仁著《计算机网络》中讲“三次握手”的目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误”。
- 在另一部经典的《计算机网络》一书中讲“三次握手”的目的是为了解决“网络中存在延迟的重复分组”的问题。

在谢希仁的《计算机网络》书中同时举了一个例子，如下：

> “已失效的连接请求报文段”的产生在这样一种情况下：
> client发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。
> 本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认报文段，同意建立连接。
> 假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。由于现在client并没有发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建立，并一直等待client发来数据。这样，server的很多资源就白白浪费掉了。
> 采用“三次握手”的办法可以防止上述现象发生。
> 例如刚才那种情况，client不会向server的确认发出确认。server由于收不到确认，就知道client并没有要求建立连接。”


**因此三次握手的主要目的是防止了服务器端的一直等待而浪费资源。**

#### 为什么要四次分手
那四次分手又是为何呢？TCP协议是一种面向连接的、可靠的、基于字节流的运输层通信协议。TCP是全双工模式，这就意味着，
- 当主机1发出FIN报文段时，只是表示主机1已经没有数据要发送了，主机1告诉主机2，它的数据已经全部发送完毕了；
- 但是，这个时候主机1还是可以接受来自主机2的数据；当主机2返回ACK报文段时，表示它已经知道主机1没有数据发送了，但是主机2还是可以发送数据到主机1的；
- 当主机2也发送了FIN报文段时，这个时候就表示主机2也没有数据要发送了，就会告诉主机1，我也没有数据要发送了，之后彼此就会愉快的中断这次TCP连接。

因此原因有二：
1. 保证TCP协议的全双工连接能够可靠关闭
2. 保证这次连接的重复数据段从网络中消失（关闭后重连接的情况）

先说第一点，如果Client直接CLOSED了，那么由于IP协议的不可靠性或者是其它网络原因，导致Server没有收到Client最后回复的ACK。那么Server就会在超时之后继续发送FIN，此时由于Client已经CLOSED了，就找不到与重发的FIN对应的连接，最后Server就会收到RST而不是ACK，Server就会以为是连接错误把问题报告给高层。这样的情况虽然不会造成数据丢失，但是却导致TCP协议不符合可靠连接的要求。所以，Client不是直接进入CLOSED，而是要保持TIME_WAIT，当再次收到FIN的时候，能够保证对方收到ACK，最后正确的关闭连接。

再说第二点，如果Client直接CLOSED，然后又再向Server发起一个新连接，我们不能保证这个新连接与刚关闭的连接的端口号是不同的。也就是说有可能新连接和老连接的端口号是相同的。一般来说不会发生什么问题，但是还是有特殊情况出现：假设新连接和已经关闭的老连接端口号是一样的，如果前一次连接的某些数据仍然滞留在网络中，这些延迟数据在建立新连接之后才到达Server，由于新连接和老连接的端口号是一样的，又因为TCP协议判断不同连接的依据是socket pair，于是，TCP协议就认为那个延迟的数据是属于新连接的，这样就和真正的新连接的数据包发生混淆了。所以TCP连接还要在TIME_WAIT状态等待2MSL，这样可以保证本次连接的所有数据都从网络中消失。

各种协议都是前人千锤百炼后得到的标准，规范。从细节中都能感受到精巧和严谨。每次深入都有同一个感觉，精妙。


参考来源：
- [http://www.cnblogs.com/wujing-hubei/p/5699773.html](http://www.cnblogs.com/wujing-hubei/p/5699773.html)
- [通俗大白话来理解TCP协议的三次握手和四次分手](https://github.com/jawil/blog/issues/14)
- [TCP四次分手中，主动关闭方最后为什么要等待2MSL之后才关闭连接？](https://www.zhihu.com/question/36930631)