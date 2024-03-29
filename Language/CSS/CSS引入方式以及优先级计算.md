# CSS引入方式以及优先级计算

## 优先级

### 优先级是如何计算的？

优先级就是分配给指定的CSS声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。

而当优先级与多个CSS声明中任意一个声明的优先级相等的时候，CSS中最后的那个声明将会被应用到元素上。

当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的CSS规则总是会接管/覆盖（take over）该元素从祖先元素继承而来的规则。

### 选择器的优先级

**序号越大，优先级越高**

**important > 内联 > ID > 类 > （标签 = 伪类 = 属性选择） > 伪对象 > 通配符 > 继承**

1. 低优先级
   * **类型选择器**（type selectors）（例如, `h1`）
   * **伪元素**（pseudo-elements）（例如, `::before`）
2. 中优先级
   * **类选择器**（class selectors） (例如,`.example`)
   * **属性选择器**（attributes selectors）（例如, `[type="radio"]`）
   * **伪类**（pseudo-classes）（例如, `:hover`）
3. 高优先级
   * **ID选择器**（例如, `#example`）
4. 例外的最高优先级
   * **!important**此声明将覆盖任何其他声明。虽然技术上!important与优先级无关，但它与它直接相关。

通配选择符（universal selector）(*), 关系选择符（combinators） (`+, >, ~, ' '`)  和 否定伪类（negation pseudo-class）(`:not()`) 对优先级没有影响。（但是，在 `:not()` 内部声明的选择器是会影响优先级）。

## HTML中引入CSS的方式
### 引入方式

1. **内联样式**


```html
<div style="background: red"></div>
```


2. **嵌入样式**
```html
  <head>
   <style>
   .content {
       background: red;
   }
   </style>
  </head>
```


3. **外链方式**
```html
<head>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
```
4. **导入样式**


```html
<style>
    @import url(style.css);
</style>
```
#### `link`链接方式和`@import`导入方式区别

- link 属于 HTML，通过 <link> 标签中的 href 属性来引入外部文件，而 @import 属于 CSS，所以导入语句应写在 CSS 中，要注意的是**导入语句应写在样式表的开头**，否则无法正确导入外部文件；
- `@import` 是 CSS2.1 才出现的概念，所以如果浏览器版本较低，无法正确导入外部样式文件；
- 当 HTML 文件被加载时，link 引用的文件会同时被加载，而 `@import` 引用的文件则会等页面全部下载完毕再被加载；

**小结**：我们应尽量使用 <link> 标签导入外部 CSS 文件，避免或者少用使用其他三种方式。

### 引入方式优先级排序

内联样式 > （嵌入样式 = 外链形式 = 导入样式）

其中，嵌入样式 = 外链形式 = 导入样式 按照CSS样式顺序确定优先级，同一个样式，前面的的样式会被后面的样式覆盖

1. 最高优先级**内联样式**
例如, `style="font-weight:bold"` 总会覆盖外部样式表的任何样式 ，因此可看作是具有最高的优先级。

2. 嵌入样式、外部样式
   按照引用顺序，引用在后面的会覆盖引用在前面的样式
   * **嵌入样式**
      ```html
      <head>
      <style>
      .content {
            background: red;
      }
      </style>
      </head>
      ```
   * **外部样式** 外部样式分两种引用方式，一种是`link` 一种的`@import` ，后面有介绍
      ```html
      <head>
      <link rel="stylesheet" type="text/css" href="style.css">
      </head>
      ```



## 参考


