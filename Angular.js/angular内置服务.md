### angular内置服务

### 总表
| 名字 | 说明 |
| :---: | :--- |
| $anchorScroll | 滚动浏览器至指定的锚点 |
| $animate | 基本的DOM操作功能 |
| $cacheFactory | 缓存服务 |
| $compile | 将HTML字符串或DOM编译为模板并生成模板函数 |
| $controller | 负责实例化控制器 |
| $document | 等同于`window.document` |
| $exceptionHandler | 处理程序中出现的异常，不常用 |
| $filter | 过滤器 |
| $http | http请求 |
| $httpBackend |  |
| $interpolate | 将一个字符串编译成一个插值函数。HTML编译服务使用这个服务完成数据绑定。可以从其他地方获取到内容，处理绑定到对应的html中 |
| $interval | window.setInterval的Angular包装形式。Fn是每次延迟时间后被执行的函数 |
| $timeout | window.setTimeout的Angular包装形式。Fn函数包装成一个try/catch块，代表$exceptionHandler服务里的任何异常。timeout函数的返回值是一个promise，当到达设置的超时时间时，这个promise将被解决，并执行timeout函数。需要取消timeout，需要调用$timeout.cancel\(promise\) |
| $location | $location服务解析地址栏中的URL（基于window.location），让你在应用代码中能获取到。改变地址栏中的URL会反应$location服务中，反之亦然 |
| $log | 日志信息， 可以到console输出 |
| $parse | 将一个AngularJS表达式转换成一个函数,其实这个功能还是很强大的，非常的有用，详细的亲看[中文ＡＰＩ](https://segmentfault.com/a/1190000002749571)　，上面有很详细的例子 |
| $q | angualar 的 Promise |
| $rootElement | 在DOM中提供根元素的入口 |
| $rootScope | 提供 顶级作用域的入口 |
| $sce | AngularJs提供的一种严格上下文转义服务 |
| $sceDelegate | 一个AngularJs为$sce服务提供严格的上下文转义服务的服务 |
| $templateCache | 第一次使用模板，它被加载到模板缓存中，以便快速检索。你可以直接将模板标签加载到缓存中，或者通过$templateCache服务 |

#### 1、$anchorScroll

滚动浏览器窗口至指定的锚点

具体参考：[API ](http://docs.ngnice.com/api/ng/service/$anchorScroll)  [Angular API 中文](http://www.jianshu.com/p/9cd7c2d2710f)

```js
$scope.gotoBottom = function() {

        // 将location.hash的值设置为
        // 你想要滚动到的元素的id
        $location.hash('bottom');

        // 调用 $anchorScroll()
        $anchorScroll();

    };
```

#### 2、$animate

$animate服务提供了基本的DOM操作功能如在DOM里插入、移除和移动元素，以及添加和删除类。这个服务是ngAnimate的核心服务，为CSS和Javascript提供了高档次的动画。

参考：[API ](http://docs.ngnice.com/api/ng/service/$animate) [API中文](http://www.cnblogs.com/ys-ys/p/4987022.html)

#### 3、$cacheFactory

用于生成一个用来存储缓存对象的服务，并且提供对对象的访问

参考：[中文API](http://www.cnblogs.com/ys-ys/p/4967404.html)

值的注意的是，这是应用程序的缓存服务，而不是浏览器本地的缓存。所以当你刷新浏览器，初始化整个应用程序的时候，之前的缓存数据都会丢失。那么问题就来了，怎么才能刷新/初始化应用程序而不丢失之前保存的数据呢，这个可以使用localStorage或者cookies.

#### 4、$compile

将HTML字符串或DOM编译为模板并生成模板函数，然后可以通过scope和模板链接在一起。

```js
let parkingAPP = require('../../../script/main.js');

parkingAPP.controller('day11Ctrl', function ($rootScope, $scope, $state, $log, $timeout, $compile) {

    let html = `<a href='www.github.com'>点击</a>`;
    let link = $compile(html);
    var node = link($scope);
    $('#html1').append(node);

});
```

$scopile 还允许接收其他参数

```js
function compile(tElement, tAttrs, transclude) { ... }
```

具体 使用方法参考： [API](http://docs.ngnice.com/api/ng/service/$compile)   以及    [邹业盛原创Compile的细节](https://checkcheckzz.gitbooks.io/angularjs-learning-notes/content/chapter18/18-5.html)

#### 5、$controller

负责实例化控制器

#### 6、$document

等同于`window.document`

#### 7、$exceptionHandler

处理程序中出现的异常，不常用

#### 8、$filter

过滤器 [中文API](http://www.cnblogs.com/ys-ys/p/5006951.html)

也可见filter过滤器介绍

#### 9、 $http

http请求

详见$http请求数据

#### 10、$httpBackend

#### 11、**$interpolate**

将一个字符串编译成一个插值函数。HTML编译服务使用这个服务完成数据绑定。可以从其他地方获取到内容，处理绑定到对应的html中

[中文API](https://segmentfault.com/a/1190000002753321)  里面有详细的例子，使用的时候一般会结合`$interpolateProvider()`中的开始`startSymbol([value])`和结束`endSymbol([value])`标志方法使用，这个服务一般是特定场合才会使用，个人感觉使用场合不是很高

#### 12、$interval

window.setInterval的Angular包装形式。Fn是每次延迟时间后被执行的函数

note:备注：当你执行完这项服务后应该把它销毁。特别是当controller或者directive元素被销毁时而$interval未被销毁。你应该考虑到在适当的时候取消interval事件。

```js
/** $interval **/
$interval(function () {
    console.log('interval');
}, 1000, [3], [false])
```

#### 13、$timeout

window.setTimeout的Angular包装形式。Fn函数包装成一个try/catch块，代表$exceptionHandler服务里的任何异常。timeout函数的返回值是一个promise，当到达设置的超时时间时，这个promise将被解决，并执行timeout函数。需要取消timeout，需要调用$timeout.cancel\(promise\);

#### 14、$location

$location服务解析地址栏中的URL（基于window.location），让你在应用代码中能获取到。改变地址栏中的URL会反应$location服务中，反之亦然

[中文API](http://www.cnblogs.com/ys-ys/p/4992711.html)

#### 15、$log

日志信息， 可以到console输出

#### 16、$parse

将一个AngularJS表达式转换成一个函数,其实这个功能还是很强大的，非常的有用，详细的亲看[中文ＡＰＩ](https://segmentfault.com/a/1190000002749571)　，上面有很详细的例子

#### 17、$q

angualar 的 Promise ，使用方法基本上和Promise大同小异，可以参考下面一篇博文，[http://xiaoyu2er.github.io/2016/01/08/angular-q-complete-guide/](http://xiaoyu2er.github.io/2016/01/08/angular-q-complete-guide/)，注意$q里面和Promise有一个$q.when\(\)方法，稍微有点区别，不过用的也不是很多。

#### 18、$rootElement

在DOM中提供根元素的入口。

#### 19、$rootScope

提供 顶级作用域的入口

#### 20、$sce

$sce 服务是AngularJs提供的一种严格上下文转义服务。

#### 21、`$sceDelegate`

$sceDelegate是一个AngularJs为$sce服务提供严格的上下文转义服务的服务

#### 22、$templateCache

第一次使用模板，它被加载到模板缓存中，以便快速检索。你可以直接将模板标签加载到缓存中，或者通过$templateCache服务。

