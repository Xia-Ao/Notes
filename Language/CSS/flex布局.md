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


* **flex-grow**

定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大


```html
.item {
  flex-grow: <number>; /* default 0 */
}
```


* **flex-shrink**

定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。


```html
.item {
  flex-shrink: <number>; /* default 1 */
}
```


* **flex-basis**

定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。length可以向width/height一样设置px、%等。


```html
.item {
  flex-basis: <length> | auto; /* default auto */
}
```


* **flex**

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。


```html
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

* **align-self**

允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch


```html
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```






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




