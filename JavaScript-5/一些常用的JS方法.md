
###  filter() 方法实例
javascript filter() 方法使用指定的函数测试所有元素，并创建一个包含所有通过测试的元素的新数组。

```js
arr.filter(callback,[ thisArg])
```
### indexOf() 方法
可返回某个指定的字符串值在字符串中首次出现的位置。
语法

```js
stringObject.indexOf(searchvalue,fromindex)
```
### assign() 方法
assign() 方法可加载一个新的文档。

```
location.assign(URL)
```
### Object.assign()方法
特点：浅拷贝、对象属性的合并

var nObj = Object.assign({},obj,obj1);//花括号叫目标对象，后面的obj、obj1是源对象。对象合并是指：将源对象里面的属性添加到目标对象中去，若两者的属性名有冲突，后面的将会覆盖前面的

### 文件流转BinaryString


```js
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
### unshift() 方法
unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。    
语法：


```js
arrayObject.unshift(newelement1,newelement2,....,newelementX)
```

参数	描述
newelement1	必需。向数组添加的第一个元素。
newelement2	可选。向数组添加的第二个元素。
newelementX	可选。可添加若干个元素。


