
### mongoose插件

node服务使用这个插件访问数据库，能够省很多事，主要参考 [官网API](http://mongoosejs.com/docs/index.html) 和 [中文API](https://mongoose.shujuwajue.com/guide/schemas.html)
```
$ npm install mongoose
```

```lang-javascript
// getting-started.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
```
建立连接
```lang-javascript
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});
```
Mongoose的一切都始于一个Schema。每个schema映射到MongoDB的集合(collection)和定义该集合(collection)中的文档的形式。
```lang-javascript
var kittySchema = mongoose.Schema({
  name: String
});
```
将Schema转化为可用的模型
```lang-javascript
var Kitten = mongoose.model('Kitten', kittySchema);
```
查询数据库并返回
```lang-javascript
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens);
})
```

