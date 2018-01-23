## 前端JS实现excel表格导入处理成json数组

Github：\[[SheetJS](https://github.com/SheetJS)/[**js-xlsx**](https://github.com/SheetJS/js-xlsx)\]

参考：[纯前端利用 js-xlsx 实现 Excel 文件导入导出功能示例](http://www.jianshu.com/p/74d405940305)

#### 1、安装/引用

下载`xlsx.full.min.js`到本地引用，或者 `npm install` 安装，采用哪一种方法都可以，这里不再叙述，不懂的可以自行百度

#### 2、上手

个人是在angularJS框架的控制器中使用的的，文件上传采用了已有的 `ng-file-upload` 插件上传，代码在在angular环境下的，其他环境的可以参考[纯前端利用 js-xlsx 实现 Excel 文件导入导出功能示例](http://www.jianshu.com/p/74d405940305),里面有详细的基于源生代码。

###### html中引入`angular`、`ng-file-upload`、`js-xlsx`

```html
<script src="vender/angular-1.5.6/angular.js" type="text/javascript"></script>
<script src="vender/ng-file-upload/ng-file-upload.js" type="text/javascript"></script>
<script src="vender/ng-file-upload/ng-file-upload-shim.js" type="text/javascript"></script>
<script src="vender/js-xlsx/xlsx.full.min.js" type="text/javascript"></script>
```

###### html

```html
<div class="buttonbox">
    <span class="fileNameDisplay btn" ng-if="excelNameDisplay">{{f.name}}</span>
    <button class="btn btn-sm btn-default" type="file" ngf-select="uploadFiles($file, $invalidFiles)"
            accept=".xls,.xlsx" ngf-max-size="5MB">
        <span class="glyphicon glyphicon-import font-blue-linewell"></span>导入
    </button>
    <a href="/views/gateway/excel/网关模板.xlsx">
        <button class="btn btn-sm btn-default">
                <span class="glyphicon glyphicon-export font-blue-linewell"></span>模板下载
            </button>
    </a>
</div>
```

###### JS

```js
//文件上传
$scope.uploadFiles = function (file, errFiles) {
    // debugger;
    try {
        //文件重命名规则： 00+YYMMDDHHmmss+3+（1|2|3）
        // var time = (new Date()).format("yyMMddhhmmss");
        var preff = file.name.slice(file.name.lastIndexOf("."));
        console.log(preff);
        if (preff != '.xls' && preff != '.xlsx') {
            alert('请选择xls或者xlsx格式文件');
            return;
        }
        $scope.f = file;
        // var prev = "00";
        // var newName = prev + time + "3" + preff;
        if (file) {
            console.log(2222);
            Exl_to_Json(file);
            $scope.excelNameDisplay = true;
        }
    } catch (e) {
    }
};

// 将表格内容转成json格式
function Exl_to_Json(obj) { //导入
    var wb = null;//读取完成的数据
    var rABS = false; //是否将文件读取为二进制字符串
    if (obj.files) {
        return;
    }
    var f = obj;
    var reader = new FileReader();
    // console.log(f,reader);
    reader.onload = function (e) {
        var data = e.target.result;
        // console.log(data);
        if (rABS) {
            wb = XLSX.read(btoa(fixdata(data)), {//手动转化
                type: 'base64'
            });
        } else {
            wb = XLSX.read(data, {
                type: 'binary'
            });
        }
        console.log(wb);
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        $scope.json2 = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]],
            {header: ['id', 'number', 'location', 'lat', 'long', 'state'], range: 2, raw: true, defval: null});
        // $scope.json3 = JSON.stringify(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[1]]));
        console.log($scope.json2);
        alert('导入数据成功');
    };
    if (rABS) {
        reader.readAsArrayBuffer(f);
    } else {
        reader.readAsBinaryString(f);
    }
};
//文件流转BinaryString
function fixdata(data) {
    var o = "",
        l = 0,
        w = 10240;
    for (; l < data.byteLength / w; ++l)
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
    o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
    return o;
}
```

###### 效果

![](/assets/无标题.png)

#### 3、`XLSX.utils.sheet_to_json()`函数

将读取到的文件流转化为json数组

| Option Name | Default | Description |
| :--- | :--- | :--- |
| raw | `false` | 格式化字符串 |
| range | from WS | 设置转化范围`rang: 2`表示从第二行开始导出，之前的内容不导出 |
| header |  | 控制输出json字段格式 |
| dateNF | fmt 14 | 日期输出格式 |
| defval |  | 定义空数据或者undefined内容导出格式，默认不导出，`defval: null` 表示空数据导出字段为null类型 |
| blankrows | \*\* | 输出空行（这个我也没试过）\*\* |

`range`is expected to be one of:

| `range` | Description |
| :--- | :--- |
| \(number\) | Use worksheet range but set starting row to the value |
| \(string\) | Use specified range \(A1-style bounded range string\) |
| \(default\) | Use worksheet range \(`ws['!ref']`\) |

`header`is expected to be one of:

| `header` | Description |
| :--- | :--- |
| `1` | Generate an array of arrays \("2D Array"\) |
| `"A"` | Row object keys are literal column labels |
| array of strings | Use specified strings as keys in row objects |
| \(default\) | Read and disambiguate first row as keys |



