关于CSS3的flex布局，阮一峰的两篇讲解十分到位！

[阮一峰 & Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool)

[阮一峰 & Flex 布局教程：实例篇](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)


## 一、Flex布局是什么？

Flex是Flexible Box的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性！

任何一个容器都可以指定为Flex布局。


```css
.box{
display: flex;
}
```
行内元素也可以使用Flex布局。
```css
.box{
display: inline-flex;
}
```

##基本概念
采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

 ![](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071004.png)
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。
##  基本语法
#### 容器的六个基本属性：

* [**flex-direction** ](#flex-direction) 决定主轴的方向

      flex-direction: row | row-reverse | column | column-reverse;
* [**flex-wrap** ](#flex-wrap)  定义，如果一条轴线排不下，如何换行。

        flex-wrap: nowrap | wrap | wrap-reverse;
* [**flex-flow**](#flex-flow) flex-direction属性和flex-wrap属性的简写形式

      flex-flow: <flex-direction> || <flex-wrap>;
* [**justify-content** ](#justify-content)
 定义了项目在主轴上的对齐方式。
 
       justify-content: flex-start | flex-end | center | space-between | space-around;
* [**align-items** ](#align-items) 
定义项目在交叉轴上如何对齐。

      align-items: flex-start | flex-end | center | baseline | stretch;
* [**align-content** ](#align-content) 定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

      align-content: flex-start | flex-end | center | space-between | space-around | stretch;

#### 项目的六个基本属性：
* **order**
定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```html
.item {
  order: <integer>;
}
```


* flex-grow
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大


```html
.item {
  flex-grow: <number>; /* default 0 */
}
```


* flex-shrink
* flex-basis
* flex
* align-self




### flex水平垂直居中
父元素设定高度，将子元素水平、垂直居中
父元素`justify-content`设置为center,`align-items`设置为center


```html
<head>
    <meta charset="UTF-8">
    <title>flex</title>
    <style>
        .par{
            height:500px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .son{
            width: 200px;
            height: 200px;
            background: #cc7680;
        }
    </style>
</head>
<body>
<div class="par">
    <div class="son"></div>
</div>
</body>
```




