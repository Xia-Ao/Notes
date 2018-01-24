## 深入理解原型到原型链

说到原型，肯定离不开对象，在JS中，关于原型对象，javaScript高级程序设计中写道：

> 我们创建的每一个函数都有一个prototype属性，这个属性是一个指针，指向一个对象，而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。

![](/assets/prototype.png)

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

console.log(person.name) // Kevin
```

#### 参考文章：

[JavaScript深入之从原型到原型链](https://github.com/mqyqingfeng/Blog/issues/2)

[详解JavaScript中的原型和继承](http://yanhaijing.com/javascript/2016/07/24/prototype-and-inheritance-of-js/)

