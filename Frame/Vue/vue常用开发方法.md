---
title: vue常用开发方法汇总.md
date: 2018-04-17 19:05:40
tags: Vue
---

### 使用[绑定 HTML Class](https://cn.vuejs.org/v2/guide/class-and-style.html#%E7%BB%91%E5%AE%9A-HTML-Class "绑定 HTML Class")实现菜单标识

作为菜单标识，一般常用的方法就是，设置一个class样式，当选中菜单时，给这个菜单动态的添加这个class，使之具有选中样式。在vue中也经常使用这种方法，`v-bind:class=""`是对象语法，如下面这个例子。
```html
<li class="price" v-for="(price,index) in priceFilter" :key="price.index"
    @click="setPriceFilter(index)" v-bind:class="{'curPrice':priceChecked===index}">
  <span class="price-list">{{price.startPrice}} - {{price.endPrice}}</span>
</li>

//js部分
setPriceFilter (index) {
  this.priceChecked = index;
}
```