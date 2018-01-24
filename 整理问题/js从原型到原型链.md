## 深入理解原型到原型链

说到原型，肯定离不开对象，在JS中，关于原型对象，javaScript高级程序设计中写道：

> 我们创建的每一个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

![](/assets/prototype.png)

上述 图述的代码如下所示，创建一个构造函数，为此构造函数添加prototype属性，person1,person2对象是Person的实例，Person上面的属性和方法共享。

```js
function Person() {
}
Person.prototype.name = 'Nicholas';
Person.prototype.age=29;
Person.prototype.job="Software Engineer";
Person.prototype.syaName=function(){
    alert(this.name);
}
var person1 = new Person();
var person2 = new Person();

console.log(person1.name===person2.name) // true
//此时执行两次搜索
person1.sysName();  //"Nicholas"
```

## prototype

函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的**实例**的原型，也就是这个例子中的 person1 和 person2 的原型。

#### ![](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/prototype1.png)

## \_\_proto\_\_

这是每一个JavaScript对象\(除了 null \)都具有的一个属性，叫\_\_proto\_\_，这个属性会指向该对象的原型。

为了证明这一点,我们测试：

```js
function Person() {

}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

于是我们更新下关系图：

#### ![](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/prototype2.png)

既然实例对象和构造函数都可以指向原型，那么原型是否有属性指向构造函数或者实例呢？

## constructor

指向实例倒是没有，因为一个构造函数可以生成多个实例，但是原型指向构造函数倒是有的，这就要讲到第三个属性：constructor，每个原型都有一个 constructor 属性指向关联的构造函数。

为了验证这一点，我们可以尝试：

```js
function Person() {

}
console.log(Person === Person.prototype.constructor); // true
```

此时我们更新关系图：

#### ![](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/prototype3.png)

## 实例与原型

我们在读取对象属性的时候，要注意搜索顺序，

![](/assets/proto.png)

```js
function Person() {
}
Person.prototype.name = 'Nicholas';
Person.prototype.age=29;
Person.prototype.job="Software Engineer";
Person.prototype.syaName=function(){
    alert(this.name);
}
var person1 = new Person();
var person2 = new Person();

person1.name='Mack';

console.log(person1.name) // Mack
console.log(person2.name) // Nicholas

//此时执行两次搜索
person1.sysName();  //"Mack"
```

## 原型的原型

在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是：

```
var obj = new Object();
obj.name = 'Kevin'
console.log(obj.name) // Kevin
```

其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 \_\_proto\_\_ 指向构造函数的 prototype ，所以我们再更新下关系图：

![](https://raw.githubusercontent.com/mqyqingfeng/Blog/master/Images/prototype4.png)

## 原型链

在 ECMAScript 中，每个由构造器创建的对象拥有一个指向构造器 prototype 属性值的 隐式引用（implicit reference），这个引用称之为 原型（prototype）。进一步，每个原型可以拥有指向自己原型的 隐式引用（即该原型的原型），如此下去，这就是所谓的 原型链（prototype chain）  
可以在浏览器控制台下一直打印自己的原型，返回的都是一样的。

在javaScripts高级程序设计中，关于原型链是这么定义的：

![](/assets/chain1.png)

下面我们看一下书上实现原型链的一个例子

```js
function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function () {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

//继承了SuperType
SubType.prototype = new SuperType();

SuperType.prototype.getSubValue = function () {
    return this.subproperty;
};
var instance = new SubType();
console.log(instance.getSuperValue());
console.log(instance.getSubValue());
```

例子定义了两个类型：SuperType和SubType，每个类型分别有一个属性和一个方法。它们的主要区别是 SubType 继承了 SuperType ，而继承是通过创建 SuperType 的实例，并将该实例赋给SubType.prototype 实现的。实现的本质是重写原型对象，代之以一个新类型的实例。换句话说，原来存在于 SuperType 的实例中的所有属性和方法，现在也存在于 SubType.prototype 中了。在确立了继承关系之后，我们给 SubType.prototype 添加了一个方法，这样就在继承了 SuperType 的属性和方法的基础上又添加了一个新方法。

关系图如下所示：

![](/assets/chain2.png)  
实际上，所有的引用类型默认都继承了Object，这个继承也是通过原型链实现的。记住，所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针，指向Object.peototype。所以完整的关系如下所示：

![](/assets/chain3.png)

关于理解js中原型与原型链，其实主要记住这张图就好了，对象的原型属性指向原型对象，原型对象中又有一个属性constructor又指向这个对象，因为这层关系的存在，所以，才会有原型链，进而有继承，正向来说，因为js语言中要设计继承属性，所以才会设计有这么一层关系，都知道js语言设计参考于C++、java等语言，不知道这些语言中关于继承是怎么设计的，但是js的这种设计一开始我看的很迷糊。

后面再会说一下关于对象原型的一个操作方法

## 原型操作

### 查看原型

es5带来了查看对象原型的方法——Object.getPrototypeOf，该方法返回指定对象的原型（也就是该对象内部属性\[\[Prototype\]\]的值）。

```js
console.log(Object.getPrototypeOf({}))
//Object.prototype
```

es6带来了另一种查看对象原型的方法——Object.prototype.**proto**，一个对象的**proto** 属性和自己的内部属性\[\[Prototype\]\]指向一个相同的值 \(通常称这个值为原型\),原型的值可以是一个对象值也可以是null\(比如说Object.prototype.**proto**的值就是null\)。

```js
({}).__proto__
>>> Object.prototype
```

### 创建原型的方式

在下面的例子中我们将对象a的\[\[Prototype\]\]指向b。

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

这种方法无法让a的\[\[Prototype\]\]指向b。

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

#### proto

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

#### 参考文章：

[JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

[详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)

