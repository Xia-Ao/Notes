
# Generator 异步操作

## 异步封装
下面看看如何使用 Generator 函数，执行一个真实的异步任务。
```
var fetch = require('node-fetch');

function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);
  console.log(result.bio);
}
```
上面代码中，Generator 函数封装了一个异步操作，该操作先读取一个远程接口，然后从 JSON 格式的数据解析信息。就像前面说过的，这段代码非常像同步操作，除了加上了yield命令。

执行这段代码的方法如下。
```
var g = gen();
var result = g.next();

result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```
上面代码中，首先执行 Generator 函数，获取遍历器对象，然后使用next方法（第二行），执行异步任务的第一阶段。由于Fetch模块返回的是一个 Promise 对象，因此要用then方法调用下一个next方法。

可以看到，虽然 Generator 函数将异步操作表示得很简洁，但是流程管理却不方便（即何时执行第一阶段、何时执行第二阶段）。