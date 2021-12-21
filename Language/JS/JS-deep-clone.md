# JS实现深度拷贝

js对象是引用类型，对于`=`直接赋值的场景，复制的是存在栈内存里面的引用指针，并不是存放在堆内存中的内容，当对一个对象下面的属性值进行修改时，所有的都会变化。

```js
/** 浅复制 **/
let person1 = {
  'name': 'Jack',
  'age': 29
};
let person2 = person1;
person2.name = "Kai";

console.log(person1.name);  //'Kai'
console.log(person2.name);  //'Kai'
```

## 浅拷贝

可以解决一般问题，如果对象只有一层，可以使用浅拷贝。以下几种方式可以实现浅拷贝：

- `Object.assign()`
- `...`扩展运算符

### `Object.assign`

```js
let a = {
  age: 1,
};
let b = Object.assign({}, a);
a.age = 2;
console.log(b.age); // 1
```

### `...`扩展运算符

```js
let a = {
  age: 1,
};
let b = { ...a };
a.age = 2;
console.log(b.age); // 1
```

## 深复制

深复制想实现把对象里面属性值也给复制，当修改复制后的对象某个属性值时，原对象对应的属性值不会被修改。

有以下几种:

1. JSON的全局对象`parse`和`stringify`方法(有限制)
2. 遍历实现深度复制

### JSON的全局对象`parse`和`stringify`方法

这种方法好处是非常简单易用，对于`Number`, `String`,`Object`等来说基本实现。但是坏处也显而易见,对于**正则表达式类型、函数类型等**无法进行深拷贝(而且会直接丢失相应的值)。还有一点不好的地方是它会抛弃对象的constructor，也就是深复制之后，无论这个对象原本的构造函数是什么，在深复制之后都会变成`Object`。

```js
function deepClone(source){
  return JSON.parse(JSON.stringify(source));
}

let person1 = {
  'name': 'Jack',
  'age': 29,
  'fn':function (){
      console.log('fn')
  },
  'reg': new RegExp('e')
};

let person2 = deepClone(person1);
console.log(person1.name);  // 'Jack'
console.log(person2.name);  // 'Kai'
console.log(person2.fn);    // undefined
console.log(person2.reg);   // Object 
```

#### 递归遍历实现深复制

通过遍历到对象的每一层，实现深度复制，对引用类型中的function，reg，Date特殊处理。推荐使用

```js
function deepClone(obj, c) {
  let newObj = c || {}
  for (let i in obj) {
    // 引用类型拷贝
    if (obj[i] instanceof Object) {
      if (obj[i] instanceof Function) {
        // function
        newObj[i] = function () {
          return obj[i].call(this, ...arguments);
        }
      } else if (obj[i] instanceof RegExp) {
        // reg
        newObj[i] = new RegExp(obj[i]);
      } else if (obj[i] instanceof Date) {
        // Date
        newObj[i] = new Date(obj[i]);
      } else {
        // 普通对象和数组
        newObj[i] = obj[i] instanceof Array ? [] : {};
        deepClone(obj[i], newObj[i]);
      }
    } else {
      // 普通类型拷贝
      newObj[i] = obj[i];
    }
  }
  return newObj;
}
```
