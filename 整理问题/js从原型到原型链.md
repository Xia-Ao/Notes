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

在javaScripts高级程序设计中，关于原型链是这么定义的：


![](/assets/pro5.png)

































#### 参考文章：

[JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

[详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)

