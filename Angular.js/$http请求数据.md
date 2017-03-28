# $http请求数据

标签（空格分隔）： $http请求

---

在angular.js中，使用的是`$http`请求服务器段数据,`$http`是源生JS中对Ajax的封装使用，调用`$http`和Ajax的方法是一样的！


##常规用法

```
 $http({method: 'GET', url: '/someUrl'}).
    then(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    catch(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
```
####注意：在angularJS V1.5版本之前使用的是`success`和`error`方法，在1.5之后的版本中该方法已经废弃，使用`then`和`catch`方法。

##快捷方法

 - `$http.get`
 - `$http.post` 
 - `$http.head` 
 - `$http.put` 
 - `$http.delete` 
 - `$http.jsonp` 
 
### 使用示例 ###
```
 $http.get('/someUrl').success(successCallback);
 $http.post('/someUrl', data).success(successCallback);
```
详情可参考：[angularJS开发API有关`$http`使用](http://docs.ngnice.com/api/ng/service/$http)


----------
## $http请求本地数据 ##
有时候在前端开发的过程中，会遇到需要后台数据去渲染页面，但是此时还没有跟后台进行数据交互，就需要在本地模拟数据进行页面渲染！
常用的本地模拟数据分为两种，一种本地json文件格式数据，一种为本地js文件格式数据。
###1. 本地json数据请求
#####`studentInfo.json`文件#####
```
[
    {
    "number": "2001",
    "name": "姚飞",
    "sex": "男",
    "class": "控制2班",
    "startTime": "2016-09",
    "xueZhi": "2.5年"
  },
  {
    "number": "2002",
    "name": "魏遥",
    "sex": "男",
    "class": "控制1班",
    "startTime": "2016-09",
    "xueZhi": "2.5年"
  },
  {
    "number": "2003",
    "name": "陈安",
    "sex": "男",
    "class": "控双控2班",
    "startTime": "2016-09",
    "xueZhi": "3年"
  },
  {
    "number": "2004",
    "name": "宋焦鹏",
    "sex": "男",
    "class": "控制2班",
    "startTime": "2016-09",
    "xueZhi": "2.5年"
  },
  {
    "number": "2005",
    "name": "夏奥",
    "sex": "男",
    "class": "控制2班",
    "startTime": "2016-09",
    "xueZhi": "2.5年"
  },
  {
    "number": "2006",
    "name": "马来发",
    "sex": "男",
    "class": "双控",
    "startTime": "2016-09",
    "xueZhi": "3年"
  }
]
```


#####`controller.js`文件
```
$http({
        method: 'GET',
        url: './data/studentInfo.json'
    })
        .then(function (data, status, headers, config) {
            console.log("success...");
            console.log( "------");
            console.log(data);

    //尤其注意这个地方，function传进来的data是指整个data对象，里面呢包含：
    // Object {data: Array(6), status: 200, config: Object, statusText: "OK", headers: function}
    //等许多内容，我们需要的数据data包含在Object重大data，所以这个地方需要再对Object取内容
            var stuData=data.data;      //stuData为整个data数据的外围数组，数组里面有五个对象
            $scope.items=stuData;
            console.log($scope.items);
        })
        .catch(function (data, status, headers, config) {
            console.log("error...");
            // console.error(error);
        });
```

###2. 本地js数据请求
`studentInfo.js`文件内容和`studentInfo.json`内容是一样的，两者的区别在于`$http`请求时，请求到的`data`数据就是原本的`data`数据，不需要再对`data`进行解析，可以直接使用！


----------
## `$http`请求服务器端数据 ##
post


 

