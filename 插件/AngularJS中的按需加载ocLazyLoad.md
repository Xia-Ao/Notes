### AngularJS中的按需加载ocLazyLoad

参考来源:[http://www.cnblogs.com/BestMePeng/p/AngularJS\_ocLazyLoad.html](http://www.cnblogs.com/BestMePeng/p/AngularJS_ocLazyLoad.html)  
                [https://segmentfault.com/a/1190000009650471](https://segmentfault.com/a/1190000009650471)

#### angularJsshiyong ocLazyLoad懒加载有四种加载方式

1、路由加载文件（比较常用，接下里主要讲这种）

```js
resolve:{
    deps:["$ocLazyLoad",function($ocLazyLoad){
         return $ocLazyLoad.load([所需加载的文件]);//路径一定要正确
    }]
}
```

2、控制器加载  
引入$ocLazyLoad

```js
$ocLazyLoad.load([所需加载的文件]);
```

3、依赖加载

```js
angular.module('myapp', [[
    所需加载的文件
]])
```

4、模板template加载

```html
<div oc-lazy-load="lazyload"></div>
```

```js
 $ocLazyLoadProvider.config({
    modules: [{
        name: 'lazyload',
        files: [
            '所需加载的文件'
        ]
    }]
```

#### ui-router加载文件实例

```js
/**pos卡管理-编辑**/
.state(StateName.pos.edit, {``
    templateUrl: "views/pos/edit.html",
    controller: 'PosCardEditCtrl',
    params: {'pdaCode': null},
    resolve: {
        deps: ['$ocLazyLoad', function ($ocLazyLoad) {
            return $ocLazyLoad.load({
                files: [
                    'vender/datatables/plugins/bootstrap/dataTables.bootstrap.css',
                    'vender/datatables/all.min.js',
                    'views/pos/scripts/posCardEditCtrl.js'
                ]
            });
        }]
    }
})
```



