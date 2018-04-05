---
title: this对象.md
date: 2018-04-05 20:05:40
tags: JS
---


参考：阮一峰[《Javascript的this用法》](http://www.ruanyifeng.com/blog/archives.html)

追梦子《[彻底理解js中this的指向，不必硬背](http://www.cnblogs.com/pssp/p/5216085.html)》

### 1、**纯粹的函数调用与作为对象方法的调用**

**this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁**，**实际上this的最终指向的是那个调用它的对象。**这句话并不完全对，但是大多数时候可以用这种方法去判断this指向。

一般情况下，this指向全局对象window，因为是全局window调用

这里的`a()`是由`window.a()`调用的，所以`this`指向`window`

```js
function a(){
    var user = "追梦子";
    console.log(this.user); //undefined
    console.log(this); //Window
}
a();
```

通过其他对象调用，this指向调用对象

```js
var o = {
    user:"追梦子",
    fn:function(){
        console.log(this.user);  //追梦子
    }
}
o.fn();
```

这里 `fn()`中的this由对象o调用，则this指向对象o。

如有多层对象，this指向它上一级的对象。

```js
var o = {
    a:10,
    b:{
        // a:12,
        fn:function(){
            console.log(this.a); //undefined
        }
    }
}
o.b.fn();
```

此时this指向上一级队形b而不是指向对象o。

总结起来三种情况：

情况1：如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找。

情况2：如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。

情况3：如果一个函数中有this，**这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象**

一个特殊的例子

```js
var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a); //undefined
            console.log(this); //window
        }
    }
}
var j = o.b.fn;
j();
```

这里的this并没有指向对象b，而是window，因为最后的调用是`window.j()。`

作为纯粹的函数调用其实就是window调用，其this对象指向window，改变的欧式全局属性

作为对象方法调用，this就指向这个上级对象。

### 2、构造函数中的this

```js
function Fn(){
    this.user = "追梦子";
}
var a = new Fn();
console.log(a.user); //追梦子
```

这里这里之所以对象a可以点出函数Fn里面的user是因为new关键字可以改变this的指向，将这个this指向对象a，为什么我说a是对象，因为用了**new关键字就是创建一个对象实例**，我们这里用变量a创建了一个Fn的实例（相当于复制了一份Fn到对象a里面），此时仅仅只是创建，并没有执行，而调用这个函数Fn的是对象a，那么this指向的自然是对象a，那么为什么对象a中会有user，因为你已经复制了一份Fn函数到对象a中，用了new关键字就等同于复制了一份。

为什么this会指向a？首先new关键字会创建一个空的对象，然后会自动调用一个函数apply方法，将this指向这个空对象，这样的话函数内部的this就会被这个空的对象替代

#### 3、使用apply\(\) call\(\) bind\(\) 改变this指向

掌握三种方法的用法，了解三种方法的区别即可
call传递的是单个参数：`call(this,arg1,arg2,arg3...)`
apply可以传递的是一个数组: `apply(this,arguments[])`
bind只传递一个对象:`bind(this)`

## 几种特殊的情况

#### 1、当this遇到return时

**如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例**

请看例子

```js
function fn()  
{  
    this.user = '追梦子';  
    return {};  
    //或者 
    //return function(){};
}
var a = new fn;  
console.log(a.user); //undefined
```

```js
function fn()  
{  
    this.user = '追梦子';  
    return 1;
    //或者undefined 
}
var a = new fn;  
console.log(a.user); //追梦子
```

又一个特殊的情况

```js
function fn()  
{  
    this.user = '追梦子';  
    return null;
}
var a = new fn;  
console.log(a.user); //追梦子
```

null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊。

#### 2、闭包中的this对象

闭包的执行环境具有全局性，所以在闭包中，this一般指向window

