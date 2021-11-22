# this对象

## this指向
函数的调用方式决定了 this 的值（运行时绑定）

### 通常情况下
this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，**实际上this的最终指向的是那个调用它的对象**。这句话并不完全对，但是大多数时候可以用这种方法去判断this指向。

一般情况下，this指向全局对象window，因为是全局window调用.

这里的`a()`是由`window.a()`调用的，所以`this`指向`window`

```js
function a(){
  var user = "Nike";
  console.log(this.user); //undefined
  console.log(this); //Window
}
a();
```

通过其他对象调用，this指向调用对象

```js
var o = {
  user: "Nike",
  fn: function(){
      console.log(this.user);
  }
}
o.fn(); // Nike
// 这里 `fn()`中的this由对象o调用，则this指向对象o。
```


如有多层对象，this指向它上一级的对象。
```js
var o = {
  a:10,
  b:{
    a:12,
    fn:function(){
        console.log(this.a);
    }
  }
}
o.b.fn(); // 12
// 此时this指向上一级队形b而不是指向对象o。
```
#### 结论
总结起来三种情况：

1. 如果一个函数中有this，但是它没有被上一级的对象所调用，那么this指向的就是window，这里需要说明的是在js的严格版中this指向的不是window，但是我们这里不探讨严格版的问题，你想了解可以自行上网查找。
2. 如果一个函数中有this，这个函数有被上一级的对象所调用，那么this指向的就是上一级的对象。
3. 如果一个函数中有this，这个函数中包含多个对象，尽管这个函数是被最外层的对象所调用，this指向的也只是它上一级的对象

一个容易错的例子

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

### 构造函数中的this

```js
function Fn(){
    this.user = "Nike";
}
var a = new Fn();
console.log(a.user); //Nike
```

这里这里之所以对象a可以点出函数Fn里面的user是因为new关键字可以改变this的指向，将这个this指向对象a，为什么我说a是对象，因为用了**new关键字就是创建一个对象实例**，我们这里用变量a创建了一个Fn的实例（相当于复制了一份Fn到对象a里面），此时仅仅只是创建，并没有执行，而调用这个函数Fn的是对象a，那么this指向的自然是对象a，那么为什么对象a中会有user，因为你已经复制了一份Fn函数到对象a中，用了new关键字就等同于复制了一份。

为什么this会指向a？首先new关键字会创建一个空的对象，然后会自动调用一个函数apply方法，将this指向这个空对象，这样的话函数内部的this就会被这个空的对象替代


### 箭头函数

### class中
### 使用apply() call() bind() 改变this指向
说到this，肯定会使用bind，call，apply来改变this指向，尤其是函数调用的使用，经常使用call和apply。

掌握三种方法的用法，了解三种方法的区别即可
- call传递的是单个参数：`call(this,arg1,arg2,arg3...)`
- apply可以传递的是一个数组: `apply(this,arguments[])`
- bind只传递一个对象:`bind(this)`

bind返回一个函数，这是与call和apply最根本的区别，call apply返回一个函数之后并立即调用。

#### 为什么 call 比 apply 快？
从博文里看到，有人说经常在源码里面看到使用call，而不是使用apply，因为call比apply要快，在 [这篇博文](https://juejin.im/post/59c0e13b5188257e7a428a83) 里面，从call和apply方法定义使用的层面分析，这里直接说结论:

- 由于 apply 中定义的参数格式（数组），使得被调用之后需要做更多的事，需要将给定的参数格式改变。 
- 同时也有一些对参数的检查，在 call中却是不必要的。
- 另外一个很重要的点：在 apply 中不管有多少个参数，都会执行初始化`argList`数组，并遍历数组参数，在 call 中是有需要才会被执行。

**结论**：
call 方法比 apply 快的原因是 call 方法的参数格式正是内部方法所需要的格式。

## 几种特殊的情况

#### 当this遇到return时

- 如果返回值是一个对象，那么this指向的就是那个返回的对象，
- 如果返回值不是一个对象那么this还是指向函数的实例

请看例子

```js
function fn()  
{  
    this.user = 'Nike';  
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
    this.user = 'Nike';  
    return 1;
    //或者undefined 
}
var a = new fn;  
console.log(a.user); //Nike
```

又一个特殊的情况 `return null`

```js
function fn()  
{  
    this.user = 'Nike';  
    return null;
}
var a = new fn;  
console.log(a.user); //Nike
```

null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊。

#### 闭包中的this对象

闭包的执行环境具有全局性，所以在闭包中，this一般指向window


参考：
- [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [Javascript的this用法](http://www.ruanyifeng.com/blog/archives.html)- 阮一峰
- [彻底理解js中this的指向，不必硬背](http://www.cnblogs.com/pssp/p/5216085.html)