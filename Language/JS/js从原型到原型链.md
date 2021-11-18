---
title: 深入理解原型到原型链.md
date: 2018-01-05 13:05:40
tags: JS
---


# 深入理解原型到原型链
简单点用一句话描述，理清楚实例、构造函数、原型对象（也称实例原型） 三者的关系即可。他们之间关系如图：

![](/assets/prototype3.png)

下面我们来具体聊一聊
## 原型
### 构造函数
通俗一点理解，生成对象的基础，并描述对象的基本结构的函数。

与普通函数典型区别
- 需要使用`new`关键字生成对象实例才可以使用。
- 构造函数内`this`指向生成的对象实例。
- 命令上一般使用首字母大写。

示例：
```js
var Person = function() {
    this.name = 'aoao';
};
//两种写法相同。
function Person() {
    this.name = 'aoao';
}
```
我们用到的`Array`,`String`等内置对象都是构造函数。

### 原型对象（实例原型）

构造函数的 `prototype` 属性指向了一个对象，这个对象正是调用该构造函数而创建的**实例的原型**，也称为**原型对象**。关系如下：

同时，每个原型都有一个 `constructor` 属性指向关联的构造函数。

为了验证这一点，我们可以尝试：

```js
function Person() {
}
console.log(Person === Person.prototype.constructor); // true
```

### 实例
实例是通过 `new` 一个构造函数创建的，称之为实例对象。

实例有一个有一个私有属性，叫`__proto__`，这个属性会指向该对象的原型对象（prototype）。关系图如下：

为了证明这一点,我们测试：

```js
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```
最终我们得到关于篇首关于这三者的关系图：

![](/assets/prototype3.png)

既然实例对象和构造函数都可以指向原型，那么原型对象是否有属性指向构造函数或者实例呢?


## 原型链
上面我们知道，实例对象有一个私有属性`__proto__`指向它的构造函数的原型对象`prototype`，那么原型对象也有一个私有属性`__proto__`指向自己的原型对象，即该原型的原型，如此下去，就是所谓的原型链（prototype chain）。

![](/assets/prototype5.png)

上面图中看到Person原型对象的原型是`Object.prototype`，这是因为所有的引用类型默认都继承了`Object`，这个继承也是通过原型链实现的，因此默认原型都会包含一个内部指针，指向`Object.prototype`。

而`Object.prototype`的原型是原型链的尾巴，指向了`null`。

我们可以验证一下
```js
function Person() {
}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
console.log(person.__proto__.__proto__ === Object.prototype); // true
console.log(person.__proto__.__proto__.__proto__); // null
```

### 原型链查找

我们在读取实例对象属性的时候，要注意搜索顺序，

归纳一下查找顺利就是：
1. 先在实例对象上查看
2. 再在原型对象上查找
3. 沿着原型链上一直往上查找，没有的话返回`undefined`.

我们可以看个例子
```js
function Person() {
}
Person.prototype.name = 'Nicholas';
var person1 = new Person();
var person2 = new Person();

person1.name='Mack';
console.log(person1.name) // Mack
//此时执行两次搜索
console.log(person2.name) // Nicholas
```

## 原型操作
### 查看原型

#### ES5的方法`Object.getPrototypeOf`
该方法返回指定对象的原型（也就是该对象内部属性`[Prototype]`的值）。

```js
console.log(Object.getPrototypeOf({}))
//Object.prototype
```

#### ES6的方法`Object.prototype.__proto__`
一个对象的`__proto__` 属性和自己的内部属性`[Prototype]`指向一个相同的值 (通常称这个值为原型),原型的值可以是一个对象值也可以是null(比如说`Object.prototype.__proto__`的值就是null)。

```js
({}).__proto__
Object.prototype

// 这两者的结果是一样的，都是实例原型
```

### 创建原型

在下面的例子中我们将对象a的`Prototype`指向b。

#### 使用普通语法创建对象

这是最容易被大家忽略的方法，在js中你是绕不过原型的，不经意间就创建了原型

```js
var o = {a: 1};
// o ---> Object.prototype ---> null

var a = [];
// a ---> Array.prototype ---> Object.prototype ---> null

function f(){}
// f ---> Function.prototype ---> Object.prototype ---> null
```

这种方法无法让a的`Prototype`指向b。

#### 使用构造器创建对象

构造函数就是一个普通的函数，只不过这次不是直接调用函数，而是在函数前加上new关键字。

每个函数都有一个prototype属性，通过new关键字新建的对象的原型会指向构造函数的prototype属性，所以我们可以修改构造函数的prototype属性从而达到操作对象原型的目的。

为了让b继承a，需要有一个构造函数A

```js
var b = {};
function A() {};

A.prototype = b;

var a = new A();

Object.getPrototypeOf(a) === b;
// true
// a ---> A.prototype === b
```

#### 使用 Object.create 创建对象

ES5带来了Object.create接口，可以让我们直接设置一个对象原型

```js
var b = {};
var a = Object.create(b);

Object.getPrototypeOf(a) === b;
// true
// a ---> b
```

#### Object.setPrototypeOf

ES6带来了另一个接口，可以绕过创建对象的过程，直接操作原型

```js
var a = {};
var b = {};

Object.setPrototypeOf(a, b);
Object.getPrototypeOf(a) === b;
// true
// a ---> b
```

#### `__proto__`

ES6还带来了一个属性，通过这个属性也可以直接操作原型

```js
var a = {};
var b = {};

a.__proto__ = b;
Object.getPrototypeOf(a) === b;
// true
// a ---> b
```

注意这个属性在ES6规范的附录中，也就意味着不是所有的环境都会有这个属性。

#### 使用 class 关键字

ES6引入了以class语法糖，通过extends关键字我们也可以实现继承，但是无法直接操作对象的原型，而是要借助“类”，其实就是构造函数和函数的prototype属性。

```js
class B {}

class A extends B {}

var a = new A();

Object.getPrototypeOf(a) === A.prototype;
// true
// a ---> A.prototype === B的实例
```

参考：

- [JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)
- [详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)
- [全面理解面向对象的 JavaScript](https://www.ibm.com/developerworks/cn/web/1304_zengyz_jsoo/)
- 《高程》



