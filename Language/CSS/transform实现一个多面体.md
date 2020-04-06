transform的功能是在是太强大了，不知道该怎么说，自己也不是很懂，反正就是各种2d 3d变换，只要你想的到，就能实现。

![](/assets/3d.png)

```html
<!DOCTYPE html>
<html lang="zh-cmn-Hans">
<head>
    <meta charset="utf-8"/>
    <title>transform-style_CSS参考手册_web前端开发参考手册系列</title>
    <meta name="author" content="Joy Du(飘零雾雨), dooyoe@gmail.com"/>
    <meta name="copyright" content="www.doyoe.com"/>
    <style>
        body {
            -webkit-perspective: 1000px;
            perspective: 1000px;
        }

        .cube {
            position: relative;
            font-size: 80px;
            width: 2em;
            margin: 1.5em auto;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            -webkit-transform: rotateX(-30deg) rotateY(30deg);
            transform: rotateX(-30deg) rotateY(30deg);
        }

        .cube > div {
            position: absolute;
            width: 2em;
            height: 2em;
            background: rgba(0, 0, 0, .1);
            border: 1px solid #999;
            color: white;
            text-align: center;
            line-height: 2em;
        }

        .front {
            -webkit-transform: translateZ(1em);
            transform: translateZ(1em);
        }

        .top {
            -webkit-transform: rotateX(90deg) translateZ(1em);
            transform: rotateX(90deg) translateZ(1em);
        }

        .right {
            -webkit-transform: rotateY(90deg) translateZ(1em);
            transform: rotateY(90deg) translateZ(1em);
        }

        .left {
            -webkit-transform: rotateY(-90deg) translateZ(1em);
            transform: rotateY(-90deg) translateZ(1em);
        }

        .bottom {
            -webkit-transform: rotateX(-90deg) translateZ(1em);
            transform: rotateX(-90deg) translateZ(1em);
        }

        .back {
            -webkit-transform: rotateY(-180deg) translateZ(1em);
            transform: rotateY(-180deg) translateZ(1em);
        }
    </style>
</head>
<body>
<div class="cube">
    <div class="front">1</div>
    <div class="back">2</div>
    <div class="right">3</div>
    <div class="left">4</div>
    <div class="top">5</div>
    <div class="bottom">6</div>
</div>
</body>
</html>
```

参考文章：

- [CSS3 Transform](https://www.w3cplus.com/content/css3-transform)
- [菜鸟教程API-2D](http://www.runoob.com/css3/css3-2dtransforms.html)
- [菜鸟教程API-3D](http://www.runoob.com/css3/css3-3dtransforms.html)

