#ng-click传递参数

标签（空格分隔）： 指令 `ng-click` `ng-repat`

---

## 基本用法 ##
####HTML文件：
```
<div ng-repeat='item in items'>   循环数组内容

<button ng-click="functionName(parameter)">{{item.name}}</button>   
<a ng-click="showDetail(hotel.id)">
<img ng-src='{{item.src}}'/></a> 
</div>  
```
使用`ng-click`事件传递参数，自定义一个函数，`ng-click="functionName(parameter)"`，其中parameter为传递参数。

####JS文件：
```
$scope.showItemId = function(itemId){        
    alert("Item Id 是 "+itemId); 
};
```
在控制器中接收传回的数据！

###实例：
####HTML文件：
```
<table class="table table-striped stuInfoTab">
    <thead>
    <tr>
        <th>序号</th>
        <th>学号</th>
        <th>姓名</th>
        <th>性别</th>
        <th>班级</th>
        <th>入学时间</th>
        <th>学制</th>
        <th>操作</th>
    </tr>
    </thead>

    <tbody>

    <tr ng-repeat="item in items">
        <td>{{$index+1}}</td>
        <td class="tableId">{{item.number}}</td>
        <td>{{item.name}}</td>
        <td>{{item.sex}}</td>
        <td>{{item.class}}</td>
        <td>{{item.startTime}}</td>
        <td>{{item.xueZhi}}</td>
        <td>
            <button class="btn btn-sm btn-info" data-toggle="modal" data-target="#editStu" ng-click="send(item)">编辑
            </button>
            <button class="btn btn-sm btn-danger" data-toggle="modal" data-target="#delStu" ng-click="send(item)">删除
            </button>
        </td>
    </tr>
    </tbody>
    </table>
```
这里`ng-click=send(item)`将一行数组内容都传递给控制器，在控制器中调用。
####JS文件：
```
$scope.send = function (arr) {
        $scope.tableList=arr;
        console.log($scope.tableList.name);
    };
```
`tableList`是整个数组对象！

## 传递多个参数 ##
####HTML文件：
```
<div ng-repeat='item in items'>   循环数组内容

<button ng-click="functionName(parameter1，parameter2)">{{item.name}}</button>   
<a ng-click="showDetail(hotel.id)">
<img ng-src='{{item.src}}'/></a> 
</div>  
```
####JS文件：
```
$scope.showItemId = function(parameter1，parameter2){        
    alert("Item Id 是 "+itemId); 
};
```
