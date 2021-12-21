# JS中多变的this
## this指向
在绝大多数情况下，函数的调用方式决定了 this 的值（运行时绑定），同时，严格模式和肥严格模式也会有一些差别。

下面按照使用场景区分。
### 普通函数中的this
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
当一个函数用作构造函数时（使用new关键字），它的this被绑定到正在构造的新对象。

```js
function Fn(){
  this.user = "Nike";
}
var a = new Fn();
console.log(a.user); // Nike
```

为什么实例`a`执行中的`this`会指向构造函数`Fn`？ 这是`new`操作产生的，我们回忆一下[`new`操作符](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)的执行过程:

1. 创建一个空的简单JavaScript对象（即`{}`）；
2. 为步骤1新创建的对象添加属性`__proto__`，将该属性链接至构造函数的原型对象, 即 `newObj.__proto__ = Fn.prototype`；
3. 将步骤1新创建的对象作为`this`的上下文 ；
4. 如果该函数没有返回对象，则返回`this`。

注意：
>构造函数返回的默认值是`this` 所指的那个对象，但它仍可以手动返回其他的对象(不包括null)，如果返回值是一个对象，则返回`this`对象。

```js
function Fn() {  
  this.user = 'Nike';  
  return {};  
  //或者 
  //return function(){};
}
var a = new Fn();  
console.log(a.user); //undefined
```

```js
function Fn() {  
    this.user = 'Nike';  
    return 1; //或者return undefined , null 等
    
}
var a = new Fn();
console.log(a.user); // undefined
```

### 箭头函数中的this
箭头函数创建时没有自己的`this`对象, 因此，`this`与封闭词法环境的`this`保持一致,通俗一点理解就是箭头函数中的`this`指向箭头函数创建时所在的`this`。


### DOM事件处理函数中的this
当函数被用作事件处理函数时，它的`this`指向触发事件的元素（一些浏览器在使用非 addEventListener 的函数动态地添加监听函数时不遵守这个约定）。

### 其他场景
这里不一一列出，请参考[this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)

## bind apply call 改变this指向

- `bind()`方法创建一个新的函数，在`bind()`被调用时，这个新函数的`this`被指定为`bind()`的第一个参数，而其余参数将作为新函数的参数，供调用时使用。


- `apply()`和`call()`是给定一个具体`this`对象的函数调用。它们的区别是
  - call传递的是单个参数：`call(this,arg1,arg2,arg3...)`
  - apply可以传递的是一个数组: `apply(this,arguments[])`


参考：
- [this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)
- [new](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)
- [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
- [Javascript的this用法](http://www.ruanyifeng.com/blog/archives.html)- 阮一峰
- [彻底理解js中this的指向，不必硬背](http://www.cnblogs.com/pssp/p/5216085.html)