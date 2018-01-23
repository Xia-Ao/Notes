## angular.module\(\).object\(\)

[参考](http://www.cnblogs.com/sean-/p/4952183.html)：[http://www.cnblogs.com/sean-/p/4952183.html](http://www.cnblogs.com/sean-/p/4952183.html)

**1.config\(configFn\)**

利用此方法可以做一些注册工作，这些工作需要在模块加载时完成。

**2.constant\(name, object\)**

此方法会首先运行，所以你可以用它来声明整个应用范围内的常量，并且让它们在所有配置（config方法）和实例（后面的所有方法，例如controller、service等）方法中可用。

**3.controller\(name,constructor\)**

它的基本作用是配置好控制器方便后面使用。

**4.directive\(name,directiveFactory\)**

可以使用此方法在应用中创建指令。

**5.filter\(name,filterFactory\)**

允许你创建命名的AngularJS过滤器，就像前面章节所讨论的那样。

**6.run\(initializationFn\)**

如果你想要在注射器启动之后执行某些操作，而这些操作需要在页面对用户可用之前执行，就可以使用此方法。即注册一个在载入和配置所有模块之后被调用的函数。

**7.value\(name,object\)**

定义返回常量的服务。

**8.factory\(name,factoryFn\)**

如果你有一个类或者对象，需要首先为它提供一些逻辑或者参数，然后才能对它初始化，那么你就可以使用这里的factory接口。factory是一个函数，它负责创建一些特定的值（或者对象）。我们来看一个greeter\\(打招呼\\)函数的实例，这个函数需要一条问候语来初始化：

```js
function Greeter(salutation) {
  this.greet = function(name) {
  return salutation + ' ' + name;
  };
}
```

greeter函数示例如下：

```js
myApp.factory('greeter', function(salut) {
 return new Greeter(salut);
});
```

然后可以这样来调用它：

```js
var myGreeter = greeter('Halo');
```

**9.service\(name,object\)**

factory和service之间的不同点在于，factory会直接调用传递给它的函数，然后返回执行的结果；**而service将会使用"new"关键字来调用传递给它的构造方法**，然后再返回结果。所以，前面的greeter Factory可以替换成下面这个greeter Service：

```
myApp.service('greeter', Greeter);
```

每当我们需要一个greeter实例的时候，AngularJS就会调用新的Greeter\(\)来返回一个实例。

**10.provider\(name,providerFn\)**

provider是这几个方法中最复杂的部分（显然，也是可配置性最好的部分）。provider中既绑定了factory也绑定了service，并且在注入系统准备完毕之前，还可以享受到配置provider函数的好处（也就是config块）。

我们来看看使用provider改造之后的greeter Service是什么样子：

```js
myApp.provider('greeter', function() {
 var salutation = 'Hello';
 this.setSalutation = function(s) {
 salutation = s;
}

 function Greeter(a) {
 this.greet = function() {
 return salutation + ' ' + a;
}
}

 this.$get = function(a) {
 return new Greeter(a);
};
});
```

这样我们就可以在运行时动态设置问候语了（例如，可以根据用户使用的不同语言进行设置）。

```js
var myApp = angular.module(myApp, []).config(function(greeterProvider) {
greeterProvider.setSalutation('Namaste');
});
```

每当有人需要一个greeter实例时，AngularJS就会在内部调用$get方法。

##### factory service provider三者的区别

参考：[《深究AngularJS——自定义服务详解\(factory、service、provider\)》](http://blog.csdn.net/zcl_love_wx/article/details/51404390)

上文在介绍angular 的module时 已经降到了三者的区别，其实关于provider的话还是笔记哦啊好区分的，这个一个可以配置的服务，你可以在Provider对象传递到应用程序的其他部分之前在app.config函数中对其进行修改，比如在调用provider之前给provider对象里面的某个参数配置初始值等，可以参考上面的一篇博文。

重点 就是在factory 和 service 之间，用的比较多的就是**factory **，这个服务创建的是一个对象，返回的也是一个对象，只是单纯调用方法，用的比较多。

```js
app.factory('MyService', function () {
  return {
    sayHello: function () {
      console.log('hello');
    }
  }
});
```

**service **创建的是一个构建函数，在它底层创建的过程中，回去调用的一个`object.create()`方法，生成一个构造函数，因而很明显可以使用`this`指针。

```js
app.service('MyService', function() {
    this.sayHello = function() {
        console.log('hello');
        };
    });
```

更详细的代码见上方博文分享。

