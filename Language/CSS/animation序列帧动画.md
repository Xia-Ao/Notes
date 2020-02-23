---
title: animation实现序列帧动画.md
date: 2018-06-02 12:05:40
tags: CSS
---

## PC端常规序列帧动画

代码[github](https://github.com/Xia-Ao/FrontendDemo/blob/master/30-CSS/03-animation/%E5%BA%8F%E5%88%97%E5%B8%A7%E5%8A%A8%E7%94%BB.html)

使用sprite图和background-position，再加上animation的step函数，可以实现序列帧动画，但是在移动端不推荐，因为移动端进行适配之后会出现序列帧抖动

### 实现

```css
.ex1 {
        width: 750px;
        height: 41px;
        background: url("tips.png");
        overflow: hidden;
        animation: tips 2s infinite steps(25);
    }

    @keyframes tips {
        from {
            background-position: 0 0px;
        }
        to {
            background-position: 0 -1025px;
        }
    }
```

使用step函数进行步进，你有多少帧动画，step步进数量就是多少，下面有一张很形象的图表示,steps() 会根据你指定的步进数量，把整个动画切分为多帧，而且整个动画会在帧与帧之间硬切，不会做任何插值处理。通常，这种硬切效果是我们极力避免的，因此我们很少听到关于steps() 的讨论。在CSS调速函数的世界里，基于贝塞尔曲线的调速函数就像是处处受人追捧的白天鹅，而steps()则是旁人避之唯恐不及的丑小鸭。不过，在这个案例中，后者却是我们通向成功的关键。一旦把整个动画的代码修改为下面的形式，这个加载提示就瞬间变成我们想要的样子了：
![](../assets/step.png)

## 可缩放的序列帧动画
一次需求，好多个重复的动画，但是每个图片动画的大小不一样，提供一个序列帧图片，有什么办法可以实现一张sprite图做成可缩放的序列帧动画，一开始想到就是background-size，这个思路没有错，但是使用绝对像素就不对了。

当然，这种问题网上肯定有大神解答，腾讯前端团队就开发出一个插件gka进行制作可缩放的雪碧帧动画[地址](http://www.alloyteam.com/2017/07/12948/)，

原理剖析
当背景图片设置 background-size:100% 100% 时，百分比是以元素宽高为基准的，应用到雪碧图上会将整张雪碧图拉伸填充整个元素，例如我们有一个5帧的雪碧图，当我们设置`background-size: 100% 500%`时，高度就可以只显示一张图片，同理，background-position也可以设置为百分比，动画的过程从0%到500%，刚刚好显示完五张帧图片。

具体的列子：
```
.btn2 {
    width: 600px;
    height: 600px;
    background: url("btn.png");
    background-size: 100% 2500%;
    overflow: hidden;
    animation: btn2 1s infinite steps(25);
}

@keyframes btn2 {
    from {
        background-position: 0 0;
    }
    to {
        background-position: 0 -2500%;
    }
}

```


## 移动端抖动的原因以及解决
在pc端上的时候，计算的就是绝对像素，不会出现抖动的问题，但是在移动端的时候，因为有时候进行移动端适配的时候对图片大小进行了缩放，导致子啊计算position的时候，因为缩放的原因出现了小数，终端的光点都是以自然数的形式出现的，这里需要做取整处理。取整一般是三种方式：`round/ceil/floor`，自然就出现了盈亏，导致我们在看到的时候因为位置有偏差，所以发生抖动。

### 方案一：单帧图片
就是一帧对应一张图片，不使用雪碧图，这样增加了HTTP请求，不推荐

### 方案二：transform：scale()
对于不同屏幕的尺寸，计算出原图片需要适配的图片大小比例，根据这个比例设置缩放。
```css
.steps_anim {
    position: absolute;
    width: 360px;
    height: 540px;
    background: url(//misc.aotu.io/leeenx/sprite/m.png) 0 0 no-repeat;
    background-size: 1800px 540px;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    margin: -5.625rem 0 0 -5.625rem;
    transform: scale(.5);
    animation: step 1.2s steps(5) infinite;
}

@keyframes step {
    100% {
        background-position: -1800px;
    }
}

/* 写断点 */
@media screen and (width: 320px) {
    .steps_anim {
        transform: scale(0.4266666667);
    }
}

@media screen and (width: 360px) {
    .steps_anim {
        transform: scale(0.48);
    }
}

@media screen and (width: 414px) {
    .steps_anim {
        transform: scale(0.552);
    }
}
```
这种方式就是比较麻烦了，每一个尺寸都需要一个断点，聪明人一般都不这么干，改进一下，使用js计算

css：
```css
.steps_anim {
    position: absolute;
    width: 360px;
    height: 540px;
    background: url(//misc.aotu.io/leeenx/sprite/m.png) 0 0 no-repeat;
    background-size: 1800px 540px;
    top: 50%;
    left: 50%;
    transform-origin: left top;
    margin: -5.625rem 0 0 -5.625rem;
    transform: scale(.5);
    animation: step 1.2s steps(5) infinite;
}

@keyframes step {
    100% {
        background-position: -1800px;
    }
}
```
js:
```js
document.write("<style id='scaleStyleSheet'>.steps_anim {scale(.5); }</style>"); 
function doResize() {  
    scaleStyleSheet.innerHTML = ".steps_anim {-webkit-transform: scale(" + (document.documentElement.clientWidth / 750) + ")}"; 
}
window.onresize = doResize; 
doResize(); 
```

你会发现，在一个css代码中使用的js，总归感觉是不太好的，所以，肯定还会有更好的方法，
### 方案三：svg缩放
我们的目的是想让img随着我们的适配进行缩放，这里就可以使用svg和img标签一样的缩放性质，缺点是不利于自动化工具的处理。
```html
<svg viewBox="0, 0, 360, 540" class="steps_anim">
  <image xlink:href="//misc.aotu.io/leeenx/sprite/m.png" width="1800" height="540" />
</svg>
```

```sass
.steps_anim {
    position: absolute;
    width: 9rem;
    height: 13.5rem;
    top: 50%;
    left: 50%;
    margin: -5.625rem 0 0 -5.625rem;
    image {
        animation: step 1.2s steps(5) infinite;
    }
}
@keyframes step {
    100% {
        transform: translate3d(-1800px, 0, 0);
    }
}
```