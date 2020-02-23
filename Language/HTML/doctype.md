### doctype是什么

在所有 HTML 文档中规定 DOCTYPE 是非常重要的，这样浏览器就能了解预期的**文档类型**， 告诉浏览器要通过哪一种规范（f文档类型定义，fDTD）解析文档（比如HTML或XHTML规范）；  
放在网页顶部的doctype声明是让浏览器进入正确呈现模式的关键。浏览器自动切换到恰当的呈现模式，以便正确显示由doctype声明所指定的文档种类。

HTML5中的!doctype是不区分大小写的;

#### 不同渲染模式

1. 标准的显示方式就是---**标准模式**\(strict\),
2. 不标准的显示方式---**怪异模式**\(没定义doctype或者doctype错误等等情况,都会让界面进入quirk模式\)，
3. 既可以显示标准的，也能够显示不标准的 --- **接近标准模式** \(过渡类型的文档类型定义transitional）;

#### 不同渲染模式的触发

标准未立之前，HTML 文档是没有文档头的，同时在 HTML5 之前的 HTML4/3 的文档头都有各自的特征，所以在大部分现代浏览器下触发的机制如下：

1. 无`DOCTYPE`头触发**怪异模式**

`DOCTYPE`头不正确（不是 html）也触发**怪异模式**

> 如：`<!DOCTYPE svg>`

1. `DOCTYPE`头为 HTML3 头触发**怪异模式**

2. `DOCTYPE`头为 HTML4 头则触发**接近标准模式**（或称**有限怪异模式**）

3. 常见的 HTML5 DOCTYPE 声明则使用**标准模式**

在 IE 下，除了文档头的差异可以自动触发渲染模式的选择，我们还能手动指定（在 IE8+ 适用）使用哪个版本的 IE 渲染模式来渲染我们的页面

```html
<!-- 使用当前操作系统已装的最新的 IE -->
<!-- chrome=1 是针对双核浏览器使优先使用 Chrome -->
<meta http-equiv="x-ua-compatible" content="ie=edge,chrome=1">
<!-- 使用 IE9 -->
<meta http-equiv="x-ua-compatible" content="ie=9">
<!-- 如果你需要使用 IE5 的怪异模式 -->
<meta http-equiv="x-ua-compatible" content="ie=5">
```

#### 文档模式

**文档模式**也回影响到**文档类型,** `<meta http-equiv="X-UA-Compatible">与<!DOCTYPE>`结伴影响文档模式

#### 怪异模式与标准模式

> 1. 怪异模式使用不同于标准的盒模型（也就相当于 IE8+ 下的：box-sizing: border-box）
> 2. 怪异模式下某些行内（inline）元素的垂直对齐行为表现怪异：怪异模式下对齐图片至包含它们的盒子的下边框，而 标准模式图片对其到父盒的 baseline

**详细介绍及参考来源：**

[浏览器内核、JS 引擎、页面呈现原理及其优化](https://www.zybuluo.com/yangfch3/note/671516)

[你知道什么是doctype，什么是文档模式吗](http://frontenddev.org/link/do-you-know-what-a-doctype-what-document-model-is.html)



