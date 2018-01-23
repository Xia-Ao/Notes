## $compile的一些用法

angularjs里比较重要但又很少手动调用的要属$compile服务了，通常在写组件或指令时，都是angularjs自动编译完成的，但有时我们可能需要手动编译，比如封装一个table组件，根据参数实现自定义渲染，增加一列复选框或者一列按钮啥的，这是就需要用到$compile了

参考：[http://docs.ngnice.com/api/ng/service/$compile](http://docs.ngnice.com/api/ng/service/$compile)

例子:

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>angular</title>
    <script src="libs/jquery.js"></script>
    <script src="libs/angular.js"></script>
    <script>
        angular.module('myApp', [])
            .controller('MyController', function ($scope, $compile) {
                var vm = this;
                vm.msg = 'hello';
                // 创建编译函数
                var compileFn = $compile('<p>{{appCtrl.msg}}</p>');
                // 传入scope，得到编译好的dom对象(已封装为jqlite对象)
                // 也可以用$scope.$new()创建继承的作用域
                var $dom = compileFn($scope); 
                // 添加到文档中
                $dom.appendTo('body');            
            })
    </script>
</head>
<body ng-controller="MyController as appCtrl">
</body>
</html>
```

通过$compile服务可以编译html字符串或dom对象或jqLite对象，然后得到一个编译函数，再传入$scope，就会在当前作用域进行编译，返回编译好的jqLite对象，这时就可以直接添加到文档中了（也可以先添加到文档再编译）。

编译的实质其实就是对dom对象解析，使dom对象与scope进行耦合，通过绑定可以实现数据的更新，像Vue其实也是一样的过程。

### 封装为指令 {#封装为指令}

```html
<!DOCTYPE html>
<html ng-app="myApp">
<head>
    <meta charset="UTF-8">
    <title>angular</title>
    <link rel="stylesheet" href="libs/bootstrap.css">
    <script src="libs/jquery.js"></script>
    <script src="libs/angular.js"></script>
    <script>
        angular.module('myApp', [])
            .controller('MyController', function ($scope, $compile, $timeout) {
                var vm = this;
                vm.html = '<h1>{{title}}</h1>\
                            <ul>\
                                <li ng-repeat="item in items">{{item}}</li>\
                            </ul>'

            })
            .directive('compile', function($compile) {
                return {
                    scope: {
                        compile: '='
                    },
                    link: function(scope, elem, attrs) {
                        scope.title = 'list';
                        scope.items = ['list1', 'list2', 'list3'];
                        elem.html($compile(scope.compile)(scope))
                    }
                }
            })
    </script>
</head>
<body ng-controller="MyController as appCtrl">
    <p compile="appCtrl.html"></p>
</body>
</html>
```



