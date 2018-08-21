# Proxy  Reflect

## proxy
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
1、用法

代理对象操作
```js
let obj = {
    time: '2017-8-11';
    name: 'net';
    _r: 123
}

let moniter = new Proxy(obj.{
    // 拦截对象的读写
    get(target, key){
        return tatget[key].replace('2017','2018')
    }
    
    // 拦截设置属性
    set(target , key , value){
        if(key==='name'){
            return target[key]=value;
        }else{
            return target[key];
        }
    } 
})

```

### proxy方法
1、get()  
2、set()  
3、apply()  
4、has()  
5、`construct`方法用于拦截`new`命令，下面是拦截对象的写法。
```javascript
var handler = {
  construct (target, args, newTarget) {
    return new target(...args);
  }
};
```
6、 `eleteProperty`方法用于拦截`delete`操作，如果这个方法抛出错误或者返回`false`，当前属性就无法被`delete`命令删除。
7、 `defineProperty`方法拦截了`Object.defineProperty`操作。
8、`getOwnPropertyDescriptor`方法拦截`Object.getOwnPropertyDescriptor()`，返回一个属性描述对象或者`undefined`。

9、`getPrototypeOf`方法主要用来拦截获取对象原型。具体来说，拦截下面这些操作。
  * `Object.prototype.__proto__`
  * `Object.prototype.isPrototypeOf()`
  * `Object.getPrototypeOf()`
  * `Reflect.getPrototypeOf()`
  * `instanceof`
10、`ownKeys`方法用来拦截对象自身属性的读取操作

### Proxy this指向
Proxy 代理的情况下，目标对象内部的`this`关键字会指向 Proxy 代理。

### 实例应用场景：Web 服务的客户端
Proxy 对象可以拦截目标对象的任意属性，这使得它很合适用来写 Web 服务的客户端。

```javascript
const service = createWebService('http://example.com/data');

service.employees().then(json => {
  const employees = JSON.parse(json);
  // ···
});
```

上面代码新建了一个 Web 服务的接口，这个接口返回各种数据。Proxy 可以拦截这个对象的任意属性，所以不用为每一种数据写一个适配方法，只要写一个 Proxy 拦截就可以了。

```javascript
function createWebService(baseUrl) {
  return new Proxy({}, {
    get(target, propKey, receiver) {
      return () => httpGet(baseUrl+'/' + propKey);
    }
  });
}
```



## Reflect
为操作对象定义新的API，作用有以下几个。
（1） 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法。

（2） 修改某些`Object`方法的返回结果，让其变得更合理。

（3） 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`让它们变成了函数行为。


（4）`Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。



### 静态方法

`Reflect`对象一共有 13 个静态方法。
* Reflect.apply(target, thisArg, args) 等同于`Function.prototype.apply.call(func, thisArg, args)`，用于绑定`this`对象后执行给定函数。
* Reflect.construct(target, args) 等同于`new target(...args)`，这提供了一种不使用`new`，来调用构造函数的方法。
* Reflect.get(target, name, receiver) 查找并返回`target`对象的`name`属性，如果没有该属性，则返回`undefined`。
* Reflect.set(target, name, value, receiver) 设置`target`对象的`name`属性等于`value`
* Reflect.defineProperty(target, name, desc) 等同于`Object.defineProperty`，用来为对象定义属性。未来，后者会被逐渐废除，请从现在开始就使用`Reflect.defineProperty`代替它。
* Reflect.deleteProperty(target, name) 等同于`delete obj[name]`，用于删除对象的属性。
* Reflect.has(target, name) 对应`name in obj`里面的`in`运算符。
* Reflect.ownKeys(target) 用于返回对象的所有属性，基本等同于`Object.getOwnPropertyNames`与`Object.getOwnPropertySymbols`之和。
* Reflect.isExtensible(target) 对应`Object.isExtensible`，返回一个布尔值，表示当前对象是否可扩展。
* Reflect.preventExtensions(target) 对应`Object.preventExtensions`方法，用于让一个对象变为不可扩展。它返回一个布尔值，表示是否操作成功。
* Reflect.getOwnPropertyDescriptor(target, name) 等同于`Object.getOwnPropertyDescriptor`，用于得到指定属性的描述对象，将来会替代掉后者。
* Reflect.getPrototypeOf(target) 用于读取对象的`__proto__`属性，对应`Object.getPrototypeOf(obj)`。
* Reflect.setPrototypeOf(target, prototype) 用于设置目标对象的原型（prototype），对应`Object.setPrototypeOf(obj, newProto)`方法


### 应用 Proxy实现观察者模式


