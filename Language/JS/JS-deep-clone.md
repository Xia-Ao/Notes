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

通过遍历到对象的每一层，实现深度复制。推荐使用

```js
function deepClone(obj, c) {
  let newObj = c || {}
  for (let i in obj) {
    // 引用类型拷贝
    if (obj[i] instanceof Object) {
        
      newObj[i] = obj[i].constructor === Array ? [] : {};
      deepClone(obj[i], newObj[i])
    } else {
      // 普通类型拷贝
      newObj[i] = obj[i]
    }
  }
  return newObj;
}
```

#### jQuery Underscored lodash第三方插件实现

现在不做介绍，以后用的的时候再补充进来

#### [邹润阳--拥抱未来的深复制方法](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)

#### MessageChannel
此特性在WebWorker中可用，主要用在串口通信上面，允许我们创建一个新的消息通道，并通过它的两个[`MessagePort`](https://developer.mozilla.org/zh-CN/docs/Web/API/MessagePort) 属性发送数据。


[API](https://developer.mozilla.org/zh-CN/docs/Web/API/MessageChannel)

```js
function structuralClone(obj) {  
    return new Promise(resolve => {  
        const {port1, port2} = new MessageChannel();  
        port2.onmessage = ev => resolve(ev.data);  
        port1.postMessage(obj);  
    });  
}  
var obj = {a: 1, b: {  
    c: b  
}}  
// 注意该方法是异步的  
// 可以处理 undefned 和循环引用对象  
const clone = await structuralClone(obj);

```





## 参考
- [深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)