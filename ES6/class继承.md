### class类

构造函数的另一种写法

```js
function Point(x, y) {
  this.x = x;
  this.y = y;
}

Point.prototype.toString = function () {
  return '(' + this.x + ', ' + this.y + ')';
};

var p = new Point(1, 2);
```

```js
//定义类
class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  toString() {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

* 定义类的方法时，不需要加上function保留字，方法之间也不要用逗号隔开。
* 在类的实例上调用方法，其实就是调用原型上的方法。
* 类的内部定义的所有方法都是不可枚举的。而ES5中定义在原型上的方法可以使用枚举。
* 类和模块的内部使用严格模式。
* 每个类必须有constructor方法，没有显式定义的话会默认添加；constructor方法默认返回实例对象（this）。
* 类必须有new来调用，否则会报错。
* 类的实例的属性除非显式的定义在其本身（this）,否则都是定义在原型上（class）。
* 类不存在变量提升，不会像ES5中var那样提升到代码前面。
* 提议用\#来表示class的私有属性。
* 类的**方法内部中this默认指向类的实例**。如果将类的方法提出来单独使用，则this指向改方法运行所在的环境。
* class的静态方法，使用static关键字，该方法不会被实例继承，直接通过类调用。
* class只有静态方法，没有静态属性。

### class继承

ES5中继承的实现是通过prototype实现，

```js
function Point () {
}
function ColorPoint () {
}
//ColorPoint 继承了Point
ColorPoint.prototype= new Point()
```

而ES6使用extends关键字实现继承

```js
class Point{
}

class ColorPoint extends Point{
}
```

后面再说prototype继承和extends继承之间的异同点。先说说extends继承的一些性质。

使用extends继承，在子类中要想使用父类，要是用super关键字，super表示父类的构造函数，用来新建父类的this对象。

子类必须在constructor方法中调用super方法，否则新建实例时会报错，这是ES6规定的。因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。

```js
class ColorPoint extends Point {
  constructor(x, y, color) {
    super(x, y); // 调用父类的constructor(x, y)
    this.color = color;
  }

  toString() {
    return this.color + ' ' + super.toString(); // 调用父类的toString()
  }
}
```

**ES5 的继承，实质是先创造子类的实例对象**`this`**，然后再将父类的方法添加到**`this`**上面（**`Parent.apply(this)`**）。**

**ES6 的继承机制完全不同，实质是先创造父类的实例对象**`this`**（所以必须先调用**`super`**方法），然后再用子类的构造函数修改**`this`。

#### super关键字

`super`这个关键字，既可以当作函数使用，也可以当作对象使用，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

1、`super`作为函数调用时，代表父类的构造函数，ES6 要求，子类的构造函数必须执行一次`super`函数。

```js
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

注意，super虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B，因此super\(\)在这里相当于A.prototype.constructor.call\(this\)。

2、`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

```js
class Parent {
  static myMethod(msg) {
    console.log('static', msg);
  }

  myMethod(msg) {
    console.log('instance', msg);
  }
}

class Child extends Parent {
  static myMethod(msg) {
    super.myMethod(msg);
  }

  myMethod(msg) {
    super.myMethod(msg);
  }
}

Child.myMethod(1); // static 1  静态方法调用

var child = new Child();
child.myMethod(2); // instance 2  普通方法调用
```

这里需要注意，由于`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。

ES6 规定，通过`super`调用父类的方法时，方法内部的`this`指向当前的子类实例。由于this指向子类实例，所以如果通过super对某个属性赋值，这时super就是this，赋值的属性会变成子类实例的属性。详细自己看例子

### prototype和\_\_proto\_\_

ES5 中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。

Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。



```js
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

### extends 的继承目标 {#extends-的继承目标}

第一种特殊情况，子类继承`Object`类。

```js
class A extends Object {
}

A.__proto__ === Object // true
A.prototype.__proto__ === Object.prototype // true
```

第二种特殊情况，不存在任何继承。

```js
class A {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```

这种情况下，`A`作为一个基类（即不存在任何继承），就是一个普通函数，所以直接继承`Function.prototype`。但是，`A`调用后返回一个空对象（即`Object`实例），所以`A.prototype.__proto__`指向构造函数（`Object`）的`prototype`属性。

第三种特殊情况，子类继承`null`。

```js
class A extends null {
}

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === undefined // true
```

### 实例的 \_\_proto\_\_ 属性

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，**子类的原型的原型，是父类的原型**。

```js
var p1 = new Point(2, 3);
var p2 = new ColorPoint(2, 3, 'red');

p2.__proto__ === p1.__proto__ // false
p2.__proto__.__proto__ === p1.__proto__ // true
```

### 原生构造函数的继承

在ES5中，原生构造函数是无法继承的。之所以会发生这种情况，是因为子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。原生构造函数会忽略`apply`方法传入的`this`，也就是说，原生构造函数的`this`无法绑定，导致拿不到内部属性。

ES5 是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。比如，`Array`构造函数有一个内部属性`[[DefineOwnProperty]]`，用来定义新属性时，更新`length`属性，这个内部属性无法在子类获取，导致子类的`length`属性行为不正常。

ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。下面是一个继承`Array`的例子。

```js
class MyArray extends Array {
  constructor(...args) {
    super(...args);
  }
}

var arr = new MyArray();
arr[0] = 12;
arr.length // 1

arr.length = 0;
arr[0] // undefined
```





参考：阮一峰ES6标准

[Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)

[Class 的继承](http://es6.ruanyifeng.com/#docs/class-extends)



