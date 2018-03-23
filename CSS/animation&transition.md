## CSS动画

CSS动画主要是有transition属性完成的，animation属性是解决transition属性中遇到的一些问题。动画的实质就是某些css样式随时间的变化可以慢慢改变，不再是以前那种即时完成的，跟时间没关系。现在跟时间有关系，让仍感觉到是一幅动画。

再来说一说animation，

```html
animation： <single-animation-name> || <time> || <single-animation-timing-function> || <time> 
                || <single-animation-iteration-count> || <single-animation-direction> 
                || <single-animation-fill-mode> || <single-animation-play-state>
```

注意：如果只提供一个`<time>`参数，则为 `<' animation-duration '>` 的值定义；如果提供二个`<time>`参数，则第一个为 `<' animation-duration '> `的值定义，第二个为 `<' animation-delay '> `的值定义

具体每个属性值如下：

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


