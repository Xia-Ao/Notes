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

我们在读取对象属性的时候，要注意搜索顺序，

![](/assets/proto.png)

```
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

Person.name='Mack';

console.log(person1.name) // Mack
console.log(person2.name) // Nicholas

//此时执行两次搜索
person1.sysName();  //"Mack"
```

































#### 参考文章：

[JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

[详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)



