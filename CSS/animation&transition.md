## CSS动画

CSS动画主要是有transition属性完成的，animation属性是解决transition属性中遇到的一些问题。动画的实质就是某些css样式随时间的变化可以慢慢改变，不再是以前那种即时完成的，跟时间没关系。现在跟时间有关系，让仍感觉到是一幅动画。

### transition

```
transition： [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>
```

> * transition-property ：检索或设置对象中的参与过渡的属性
> * transition-duration：检索或设置对象过渡的持续时间
> * transition-timing-function ：检索或设置对象中过渡的动画类型
> * transition-delay ：检索或设置对象延迟过渡的时间

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .test{
            width: 100px;
            height: 100px;
            border:1px solid;
            transition: width  1s  cubic-bezier(.11,.88,.25,-0.91), background 1s 1s ease-out
        }
        .test:hover{
            width: 400px;
            background: red;
        }
    </style>
</head>
<body>
<div class="test"></div>
</body>
</html>
```

#### 使用注意点

（1）目前，各大浏览器（包括IE 10）都已经支持无前缀的transition，所以transition已经可以很安全地不加浏览器前缀。

（2）不是所有的CSS属性都支持transition，完整的列表查看[这里](http://oli.jp/2010/css-animatable-properties/)，以及具体的[效果](http://leaverou.github.io/animatable/)。

（3）transition需要明确知道，开始状态和结束状态的具体数值，才能计算出中间状态。比如，height从0px变化到100px，transition可以算出中间状态。但是，**transition没法算出0px到auto的中间状态**，也就是说，如果开始或结束的设置是height: auto，那么就不会产生动画效果。类似的情况还有，display: none到block，background: url\(foo.jpg\)到url\(bar.jpg\)等等。

### transition局限性

（1）transition需要事件触发，所以没法在网页加载时自动发生。

（2）transition是一次性的，不能重复发生，除非一再触发。

（3）transition只能定义开始状态和结束状态，不能定义中间状态，也就是说只有两个状态。

（4）一条transition规则，只能定义一个属性的变化，不能涉及多个属性。

因为这些局限性的存在，所以才会有animation来解决优化这些问题。


### animation

```html
animation： 
		<animation-name> || 
		<animation-duration> || 
		<animation-timing-function> || 
		<animation-delay> || 
		<animation-iteration-count> || 
		<single-animation-direction>|| 
		<animation-fill-mode> 
```

注意：
* 使用animation时，属性是有顺序的
* 如果只提供一个`<time>`参数，则为 `<' animation-duration '>` 的值定义；如果提供二个`<time>`参数，则第一个为 `<' animation-duration '>`的值定义，第二个为 `<' animation-delay '>`的值定义

具体每个属性值如下：animation属性顺序如下

* **animation-name**：检索或设置对象所应用的动画名称
* **animation-duration**：检索或设置对象动画的持续时间
* **animation-timing-function**：检索或设置对象动画的过渡类型
* **animation-delay** ：检索或设置对象动画延迟的时间
* **animation-iteration-count** ：检索或设置对象动画的循环次数
* **animation-direction**：检索或设置对象动画在循环中是否反向运动
* **animation-fill-mode** ：检索或设置对象动画时间之外的状态
* **animation-play-state** ：检索或设置对象动画的状态。w3c正考虑是否将该属性移除，因为动画的状态可以通过其它的方式实现，比如重设样式

先看一个例子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .test {
            width: 200px;
            height: 200px;
            border: 1px solid ;
        }
        .test:hover{
            animation: 5s  showColor linear;
        }
        @keyframes showColor {
            0% {background-color: red}
            20% {background-color: yellow}
            50% {background-color: orange}
            100% {background-color: black}
        }
    </style>
</head>
<body>
<div class="test"></div>
</body>
</html>
```

这里在鼠标移入的时候改变div的背景色。

使用keyframes关键字定义动画名为showColor的效果，可以定义各个状态，0%-100%，0%可以用from代表，100%可以用to代表，因此上面的代码等同于下面的形式。

```css
@keyframes showColor {
    from {background-color: red}
    20% {background-color: yellow}
    50% {background-color: orange}
    to {background-color: black}
}
```

甚至还可以把多个状态写在一行

```css
@keyframes showColor {
    from {background-color: red}
    20% ,50%  {background-color: yellow}
    to {background-color: black}
}
```

##### animation-fill-mode

通俗点来讲就是设置动画结束之后状态

> * none：默认值。不设置对象动画之外的状态
> * forwards：设置对象状态为动画结束时的状态
> * backwards：设置对象状态为动画开始时的状态
> * both：设置对象状态为动画结束或开始的状态

##### animation-direction

设置动画运动顺序，尤其是连续运动时使用比较多。如果不设置，动画运动完成之后直接**跳回**到起始状态。

> * normal：正常方向
> * reverse：反方向运行
> * alternate：动画先正常运行再反方向运行，并持续交替运行
> * alternate-reverse：动画先反运行再正方向运行，并持续交替运行

![](http://www.ruanyifeng.com/blogimg/asset/201402/bg2014021401.png)

**animation-iteration-count**

> * infinite：无限循环
> * [number](http://css.doyoe.com/values/numeric/number.htm)：指定对象动画的具体循环次数

目前，IE 10和Firefox（&gt;= 16）支持没有前缀的animation，而chrome不支持，所以必须使用webkit前缀。

关于transition和animation同一时刻共同操作同一css样式，会有不一样的情况，不要这么用

参考：[CSS动画简介-阮一峰](http://www.ruanyifeng.com/blog/2014/02/css_transition_and_animation.html)

