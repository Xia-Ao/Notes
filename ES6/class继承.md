# Class

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

### class类的基本语法

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
基本上，ES6 的`class`可以看作只是一个语法糖，它的绝大部分功能，ES5 都可以做到，新的`class`写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用 ES6 的`class`改写，就是下面这样。

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
ES6 的类，完全可以看作构造函数的另一种写法。**类的数据类型就是函数，类本身就指向构造函数。**

构造函数的`prototype`属性，在 ES6 的"类"上面继续存在。事实上，**类的所有方法都定义在类的`prototype`属性上面**。

```javascript
class Point {
  constructor() {
    // ...
  }

  toString() {
    // ...
  }

  toValue() {
    // ...
  }
}

// 等同于

Point.prototype = {
  constructor() {},
  toString() {},
  toValue() {},
};
```
**在类的实例上面调用方法，其实就是调用原型上的方法。**

**类的内部所有定义的方法，都是不可枚举的**，这一点与 ES5 的行为不一致。ES5中定义在原型上的方法是 可以被枚举出来的。

### Class 的constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。**一个类必须有`constructor`方法**，如果没有显式定义，一个空的`constructor`方法会被**默认添加**。

`constructor`方法默认返回实例对象（即`this`），完全可以指定返回另外一个对象。

```javascript
class Point {
}

// 等同于
class Point {
  constructor() {}
}
```
**类必须使用`new`调用**，否则会报错。这是它跟普通构造函数的一个主要区别，后者不用`new`也可以执行。

### 类的实例对象
* 与 ES5 一样，实例的属性除非显式定义在其本身（即定义在`this`对象上,也就是`constructor`里面），否则都是定义在原型上（即定义在`class`上）。

* 与 ES5 一样，类的所有实例共享一个原型对象。

* 实例的原型都是 `prototype`， 所以他们的 `__proto__`属性是相等的，这也就意味着，可以通过实例的 `__proto__`属性为类添加方法，这这操作是不推荐的，因为会改变类的原始定义。

### Class表达式
与函数一样，类也可以使用表达式的形式定义。
```javascript
const MyClass = class Me {
  getClassName() {
    return Me.name;
  }
};
```

上面代码使用表达式定义了一个类。需要注意的是，这个类的名字是`MyClass`而不是`Me`，`Me`只在 Class 的内部代码可用，指代当前类。 `Me`只在 Class 内部有定义。如果内部没有用到的话，可以省略 `Me`, 所以使用表达的话，可以使用立即执行的Class。

#### 类不存在变量提升
```javascript
new Foo(); // ReferenceError
class Foo {}
```

### 私有方法和私有属性
ES6在类里面不提供私有属性，因此通过变通方法 模拟实现，一种是在命名上加以区别，比如前面加一下下划线 `_`，另一种是讲私有方法移出模块，内部使用 `privateFunction.call(this,arguments)`来调用，第三种是利用 `Symbol`的唯一性，将私有方法的名字命名为一个 `Symbol`值。

**提议用前缀 `#`作为私有属性的标志。**


### this指向
类的**方法内部中this默认指向类的实例**。如果将类的方法提出来单独使用，则this指向改方法运行所在的环境。


### Class的get set方法
在"类"的内部可以使用`get`和`set`关键字，对某个属性设置存值函数和取值函数，拦截该属性的存取行为。

### Class的静态方法
如果在一个方法前，加上`static`关键字，就表示该方法不会被实例继承，而是直接通过类来调用，这就称为"静态方法"。
```javascript
class Foo {
  static classMethod() {
    return 'hello';
  }
}

Foo.classMethod() // 'hello'

var foo = new Foo();
foo.classMethod()
// TypeError: foo.classMethod is not a function
```

**如果静态方法包含`this`关键字，这个`this`指的是类，而不是实例。**

```javascript
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar() // hello
```
* 父类的静态方法，可以被子类继承。
* 静态方法也是可以从`super`对象上调用的。

静态属性指的是 Class 本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性。
因为 ES6 明确规定，Class 内部只有静态方法，没有静态属性。


### new.target属性
`new`是从构造函数生成实例对象的命令。ES6 为`new`命令引入了一个`new.target`属性，该属性一般用在构造函数之中，返回`new`命令作用于的那个构造函数。如果构造函数不是通过`new`命令调用的，`new.target`会返回`undefined`，因此这个属性可以用来确定构造函数是怎么调用的。

基于这个性质，可以只允许构造函数只能通过`new`命令调用。

**Class 内部调用`new.target`，返回当前 Class**。需要注意的是，**子类继承父类时，`new.target`会返回子类**。
利用这个特点，可以写出不能独立使用、必须继承后才能使用的类。
```javascript
class Shape {
  constructor() {
    if (new.target === Shape) {
      throw new Error('本类不能实例化');
    }
  }
}

class Rectangle extends Shape {
  constructor(length, width) {
    super();
    // ...
  }
}

var x = new Shape();  // 报错
var y = new Rectangle(3, 4);  // 正确
```




```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

```javascript
class Foo {
}

Foo.prop = 1;
Foo.prop // 1
```

























## class继承
### extends继承

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

子类必须在constructor方法中调用super方法，否则新建实例时会报错，这是ES6规定的。因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。并且在子类的构造函数中，只有调用`super`之后，才可以使用`this`关键字，否则会报错。这是因为子类实例的构建，基于父类实例，只有`super`方法才能调用父类实例。


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

### super关键字

`super`这个关键字，既可以当作函数使用，也可以当作对象使用，使用super的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。

使用`super`的时候，必须显式指定是作为函数、还是作为对象使用，否则会报错。


1、**`super`作为函数调用时，代表父类的构造函数**，ES6 要求，子类的构造函数必须执行一次`super`函数。


注意，**`super`虽然代表了父类A的构造函数，但是返回的是子类B的实例，即super内部的this指的是B**，因此`super()`在这里相当于`A.prototype.constructor.call(this)`。
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
作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。


2、**`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。**

 **普通方法中调用**
```javascript
class A {
  p() {
    return 2;
  }
}

class B extends A {
  constructor() {
    super();
    console.log(super.p()); // 2
  }
}

let b = new B();
```


这里需要注意，由于`super`指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过`super`调用的。如果属性定义在父类的原型对象上，`super`就可以取到。



```javascript
class A {
  constructor() {
    this.p = 2;
  }
}


class B extends A {
  get m() {
    return super.p; 
  }
}

let b = new B();
b.m // undefined

A.prototype.x = 2;
b.m // 2
```
子类**普通方法**中通过`super`调用父类的方法时，方法内部的`this`指向当前的**子类实例**。由于this指向子类实例，所以如果通过super对某个属性赋值，这时**super就是this**，赋值的属性会变成子类实例的属性。


**静态方法**

`super`作为对象在静态方法中使用，**这时`super`将指向父类，而不是父类的原型对象。**

```javascript
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

Child.myMethod(1); // static 1  静态方法调用不能实例对象，直接类调用

var child = new Child();   // 调用原型上的
child.myMethod(2); // instance 2
```
在子类的静态方法中通过`super`调用父类的方法时，方法内部的`this`指向当前的**子类**，而不是子类的实例。









### prototype和\_\_proto\_\_

ES5 中，每一个对象都有`__proto__`属性，指向对应的构造函数的`prototype`属性。

Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链。

（1）子类的`__proto__`属性，表示构造函数的继承，总是指向父类。

（2）子类`prototype`属性的`__proto__`属性，表示方法的继承，总是指向父类的`prototype`属性。

```javascript
class A {
}

class B extends A {
}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```
这两条继承链，可以这样理解：
* 作为一个对象，子类（`B`）的原型（`__proto__`属性）是父类（`A`）；
* 作为一个构造函数，子类（`B`）的原型对象（`prototype`属性）是父类的原型对象（`prototype`属性）的实例。

* 子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性。也就是说，**子类的原型的原型，是父类的原型**。


### 原生构造函数继承
因为子类无法获得原生构造函数的内部属性，通过`Array.apply()`或者分配给原型对象都不行。原生构造函数会忽略`apply`方法传入的`this`，也就是说，原生构造函数的`this`无法绑定，导致拿不到内部属性。

* ES5 是先新建子类的实例对象`this`，再将父类的属性添加到子类上，由于父类的内部属性无法获取，导致无法继承原生的构造函数。

* ES6 允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承。下面是一个继承`Array`的例子。

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







参考：阮一峰ES6标准

[Class 的基本语法](http://es6.ruanyifeng.com/#docs/class)

[Class 的继承](http://es6.ruanyifeng.com/#docs/class-extends)



