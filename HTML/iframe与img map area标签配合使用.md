# &lt;iframe&gt;&lt;img&gt;&lt;map&gt;&lt;area&gt;组合使用实现页内特殊跳转

### &lt;iframe&gt;

定义内联框架，功能非常强大，可以是本地页面，可以是外部链接页面，可以是图片等页面显示。

### &lt;img&gt;

不做过多说明，只介绍有一属性叫做`usermap="#usermap"`，将图像定义为客户器端图像映射。

### &lt;map&gt;

标签用于客户端图像映射。图像映射指带有可点击区域的一幅图像。通常与&lt;area&gt;标签嵌套使用

### &lt;area&gt;

标签定义图像映射内部的区域（图像映射指的是带有可点击区域的图像）。

&lt;area&gt;元素始终嵌套在 &lt;map&gt;标签内部。

示例：

```html
<body>
<h2>这是一张完整的图片</h2>
<img src="img.png" alt="" usemap="#usermap">
<map name="usermap">
    <area shape="rect" coords="0,0,185,160" href="http://www.10086.cn" alt="" target="iframe">
    <area shape="rect" coords="185,0,370,160" href="http://www.sinopec.com" alt="" target="iframe">
    <area shape="rect" coords="370,0,550,160" href="../piao/case3.jpg" alt="" target="iframe">
    <area shape="rect" coords="550,0,735,160" href="http://www.10000.com" alt="" target="iframe">
</map>
<hr>
<br><br><br>
<iframe src="task01.html" frameborder="0" name="iframe" height="400px" width="100%" style="border: 1px solid #CCCCCC">

</iframe>
</body>
```

![](/assets/iframe.png)

