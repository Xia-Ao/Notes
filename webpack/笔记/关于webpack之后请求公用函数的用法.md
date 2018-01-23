## 关于webpack打包之后请求公共变量/函数的用法


`common.js`文件,定义公用函数或者变量

```js
/**
 * Created by XiaAo on 2017/5/9.
 */
var zz = {
    name: 10,           //定义变量
    aa: function () {   //定义function aa();
        alert('aaaa');
    },
    bb: function () {   //定义function bb();
        alert("bbb");
    }
}
alert('hkjhjkhh');  //不用调用，直接就会执行

module.exports = zz;    //将zz暴露出去,可以让其他文件请求到

```

`某controller.js`调用公用函数或者变量
```js
//将请求到的js赋给变量ZZ，通过ZZ去调用
var ZZ = require('../../service/common.js');    
//var ZZ = require('../../service/common'); //或者直接js名称

//使用变量名+`.`调用
var chaname=ZZ.name;
ZZ.aa();
ZZ.bb();

```


