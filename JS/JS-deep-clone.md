JS深复制是在阿里一面的过程中遇到的，以前都不知道，所以当时一脸懵逼，回来赶紧google，发现邹大大以前写过关于深复制的实现，这里参考他的文章：[深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)

### 浅复制

复制的是存在栈内存里面的引用指针，并不是存放在堆内存中的内容，当对一个对象下面的属性值进行修改时，所有的都会变化。


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

### 深复制

深复制想实现把对象里面属性值也给复制，当修改复制后的对象某个属性值时，原对象对应的属性值不会被修改。

### 实现方法

1. JSON的全局对象`parse`和`stringify`方法。
2. jQuery的`$.clone()` 和 `$.extend()`方法。
3. Underscored的`_.clone()`
4. lodash的`_.clone()` / `_.cloneDeep()`
5. 邹润阳建议的拥抱未来的深复制方法，直接定义在prototype上面。

#### JSON的全局对象`parse`和`stringify`方法。


```js
function deepClone(source){
  return JSON.parse(JSON.stringify(source));
}
```
例子：


```js
/** 深复制 **/
let person1 = {
    'name': 'Jack',
    'age': 29
};

let person2 = JSON.parse(JSON.stringify(person1));
person2.name = "Kai";

console.log(person1.name);  //'Jack'
console.log(person2.name);  //'Kai'
```

上面这种方法好处是非常简单易用,，对于Number, String,Obejct等来说基本实现。但是坏处也显而易见,对于正则表达式类型、函数类型等无法进行深拷贝(而且会直接丢失相应的值)。还有一点不好的地方是它会抛弃对象的constructor，也就是深复制之后，无论这个对象原本的构造函数是什么，在深复制之后都会变成Object。



```js
/** 深复制 **/
let person1 = {
    'name': 'Jack',
    'age': 29,
    'fn':function (){
       console.log('fn')
    },
    'reg':new RegExp('e')
};

let person2 = JSON.parse(JSON.stringify(person1));
person2.name = "Kai";

console.log(person1.name);  //'Jack'
console.log(person2.name);  //'Kai'
console.log(person2.fn);    //undefined
console.log(person2.reg);   //Object

```








