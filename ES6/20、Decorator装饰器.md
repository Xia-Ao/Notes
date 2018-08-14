# ES6中的Decorator装饰器

### 类的装饰
```javascript
@testable
class MyTestableClass {
  // ...
}

function testable(target) {
  target.isTestable = true;
}

MyTestableClass.isTestable // true
```

上面代码中，`@testable`就是一个修饰器。它修改了`MyTestableClass`这个类的行为，为它加上了静态属性`isTestable`。`testable`函数的参数`target`是`MyTestableClass`类本身。

基本上，修饰器的行为就是下面这样。

```javascript
@decorator
class A {}

// 等同于

class A {}
A = decorator(A) || A;
```
修饰器函数的第一个参数，就是所要修饰的目标类。

### 方法的修饰
**修饰器不仅可以修饰类，还可以修饰类的属性。**

修饰器只能用于类和类的方法，**不能用于函数，因为存在函数提升**。类是不会提升的，所以就没有这方面的问题。

### 一些装饰器的第三方模块