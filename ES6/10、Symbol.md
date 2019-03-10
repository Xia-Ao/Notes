# Symbol 对象概述

`Symbol`是一种原始数据类型，表示独一无二的值


* `Symbol`函数的参数只是表示对当前 Symbol 值的描述，因此相同参数的`Symbol`函数的返回值是不相等的。
* Symbol 值不能与其他类型的值进行运算，会报错。

### 用途

#### 因为独一无二，作为属性名使用

```javascript
let mySymbol = Symbol();

// 第一种写法
let a = {};
a[mySymbol] = 'Hello!';

// 第二种写法
let a = {
  [mySymbol]: 'Hello!'
};

// 第三种写法
let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });

// 以上写法都得到同样结果
a[mySymbol] // "Hello!"
```

**注意**：Symbol 值作为对象属性名时，**不能用点运算符**。 同理，在对象的内部，使用 Symbol 值定义属性时，Symbol 值必须放在方括号之中。
```javascript
const mySymbol = Symbol();
const a = {};

a.mySymbol = 'Hello!';      // 当做字符串使用
a[mySymbol] // undefined    // 真正的key
a['mySymbol'] // "Hello!"   // 字符串
```


`Object.getOwnPropertySymbols`方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。

### Symbol.for()，Symbol.keyFor()

它接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。  
`Symbol.for()`每次返回的的都是同一个值， `Symbol()`每次返回的都是不同的值。

```js
Symbol.for("bar") === Symbol.for("bar")
// true

Symbol("bar") === Symbol("bar")
// false
```

`Symbol.keyFor`方法返回一个已登记的 Symbol 类型值的`key`。

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"

let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined
```


### Symbol内置的值与方法
* **`Symbol.hasInstance`**  
对象的`Symbol.hasInstance`属性，指向一个内部方法。当其他对象使用`instanceof`运算符，判断是否为该对象的实例时，会调用这个方法。
* **`Symbol.isConcatSpreadable`**  
对象的`Symbol.isConcatSpreadable`属性等于一个布尔值，表示该对象用于`Array.prototype.concat()`时，是否可以展开。
* **`Symbol.species`**  
对象的`Symbol.species`属性，指向一个构造函数。创建衍生对象时，会使用该属性
* **`Symbol.match`**  
对象的`Symbol.match`属性，指向一个函数。当执行`str.match(myObject)`时，如果该属性存在，会调用它，返回该方法的返回值。
* **`Symbol.replace`**  
对象的`Symbol.replace`属性，指向一个方法，当该对象被`String.prototype.replace`方法调用时，会返回该方法的返回值。
* Symbol.search 、 Symbol.search 同理
* **`Symbol.iterator`**
* **`Symbol.toPrimitive`**  
对象的`Symbol.toPrimitive`属性，指向一个方法。该对象被转为原始类型的值时，会调用这个方法，返回该对象对应的原始类型值。
* **`Symbol.toStringTag`**
* **`Symbol.unscopables`**


### 作用

#### 消除魔术字符串
尤其在switch-case方法中，比较频繁的使用到某一个值

```js
function getArea(shape, options) {
  let area = 0;

  switch (shape) {
    case 'Triangle': // 魔术字符串
      area = .5 * options.width * options.height;
      break;
    /* ... more code ... */
  }

  return area;
}
```

一般使用一个变量来替代魔术字符串 `Triangle`,这样这个字符串是什么并不重要，重要的是case到的是同一个变量，因此对于变量的值可以使用Symbol，便非常适合。

在实际代码中，可以使用这种Symbol代替代替以前魔术字符串的方式，使用场景非常之多。

```js
const shapeType = {
  triangle: 'Triangle'
};
function getArea(shape, options) {
  let area = 0;
  switch (shape) {
    case shapeType.triangle:
      area = .5 * options.width * options.height;
      break;
  }
  return area;
}
```

```js
const shapeType = {
  triangle: Symbol()
};
```

#### 定义对象私有，内部方法
由于以 Symbol 值作为名称的属性，不会被常规方法遍历得到。我们可以利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法。

原因是因为Symbol类型作为对象的属性，使用`Object.keys(x)`、`Object.getOwnPropertyNames(x)`都无法获取它。这就造成了一种非私有的内部方法的效果。




