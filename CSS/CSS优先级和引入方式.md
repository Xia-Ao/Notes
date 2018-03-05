### 优先级是如何计算的？

优先级就是分配给指定的CSS声明的一个权重，它由 匹配的选择器中的 每一种选择器类型的 数值 决定。

而当优先级与多个CSS声明中任意一个声明的优先级相等的时候，CSS中最后的那个声明将会被应用到元素上。

当同一个元素有多个声明的时候，优先级才会有意义。因为每一个直接作用于元素的CSS规则总是会接管/覆盖（take over）该元素从祖先元素继承而来的规则。

### 选择器优先级

**序号越大，优先级越高**

1. 低优先级
   * **类型选择器**（type selectors）（例如, `h1`）
   * **伪元素**（pseudo-elements）（例如, `::before`）
2. 中优先级
   * **类选择器**（class selectors） \(例如,`.example`\)
   * **属性选择器**（attributes selectors）（例如, `[type="radio"]`）
   * **伪类**（pseudo-classes）（例如, `:hover`）
3. 高优先级
   * **ID选择器**（例如, `#example`）
4. 例外的最高优先级
   * **!important**此声明将覆盖任何其他声明。虽然技术上!important与优先级无关，但它与它直接相关。

通配选择符（universal selector）\(\*\), 关系选择符（combinators） \(`+, >, ~, ' '`\)  和 否定伪类（negation pseudo-class）\(`:not()`\) 对优先级没有影响。（但是，在 `:not()` 内部声明的选择器是会影响优先级）。

### 选择器优先级

**序号越大，优先级越高**  
内联样式 &gt;   
1. 按照引用顺序，引用在后面的会覆盖引用在前面的样式

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
2. 最高优先级
   * **内联样式** \(例如, style="font-weight:bold"\) 总会覆盖外部样式表的任何样式 ，因此可看作是具有最高的优先级。.

### HTML 中引入 CSS 的方式

1. 内联样式


```html
<div style="background: red"></div>
```


2. 嵌入样式
```html
  <head>
   <style>
   .content {
       background: red;
   }
   </style>
  </head>
```


3. 链接方式
```html
<head>
<link rel="stylesheet" type="text/css" href="style.css">
</head>
```
4. 导入样式


```html
<style>
    @import url(style.css);
</style>
```
### `link`链接方式和`@import`导入方式区别




