## Array对象

### 数组属性

[`constructor`](http://www.runoob.com/jsref/jsref-constructor-array.html) 返回创建数组对象的原型函数。

[`length`](http://www.runoob.com/jsref/jsref-length-array.html)` `设置或返回数组元素的个数。

[`prototype`](http://www.runoob.com/jsref/jsref-prototype-array.html)` `允许你向数组对象添加属性或方法。

### Array 对象属性

改变自身值的方法一共有9个，分别为pop、push、reverse、shift、sort、splice、unshift，以及两个ES6新增的方法copyWithin 和 fill

##### 添加修改删除等操作

[`concat()`](http://www.runoob.com/jsref/jsref-concat-array.html) 连接两个或更多的数组，并返回结果。

[`copyWithin( )`](http://www.runoob.com/jsref/jsref-copywithin.html)` `从数组的指定位置拷贝元素到数组的另一个指定位置中。

[`slice( start, end )`](#)选取数组的的一部分，并返回一个新数组。即克隆部分数组

[`fill()`](#)使用一个固定值来填充数组。

[`join()`](#)` `把数组的所有元素放入一个字符串。

[`push()`](http://www.runoob.com/jsref/jsref-push.html) 向数组的末尾添加一个或更多元素，并返回新的长度，**改变了原数组**。

[`unshift()`](http://www.runoob.com/jsref/jsref-unshift.html)` `向数组的开头添加一个或更多元素，并返回新的长度。

[`shift()`](http://www.runoob.com/jsref/jsref-shift.html) 删除数组第一个元素，并返回数组的第一个元素，会**改变原数组**。

[`splice()`](http://www.runoob.com/jsref/jsref-splice.html) 从数组中添加或删除元素。

[`pop()`](#)删除数组的最后一个元素并返回删除后的元素，**改变了原数组**。

##### 查询数组

[`every()`](http://www.runoob.com/jsref/jsref-every.html)` ` 检测数值元素的每个元素是否都符合条件。返回Boolean值。

[`filter()`](http://www.runoob.com/jsref/jsref-filter.html) 检测数值元素，并返回符合条件所有元素的数组。

[`find()`](http://www.runoob.com/jsref/jsref-find.html) 返回符合传入测试（函数）条件的数组元素。当数组中的元素在测试条件时返回 true 时, find\(\) 返回符合条件的元素，之后的值不会再调用执行函数。

[`some()`](#)` `检测数组元素中是否有元素符合指定条件。返回布尔值

[`findIndex()`](http://www.runoob.com/jsref/jsref-findindex.html) 返回符合传入测试（函数）条件的数组元素索引。同样，检测到第一个的时候，然后返回，不在执行后面的。

[`indexOf(item,start)`](#)搜索数组中的元素，并返回它所在的位置。

[`lastIndexOf()`](#)返回一个指定的字符串值最后出现的位置，在一个字符串中的指定位置从后向前搜索。

##### 遍历

[`forEach(function(currentValue,index,arr),thisValue)`](http://www.runoob.com/jsref/jsref-foreach.html)  数组每个元素都执行一次回调函数。

[`map()`](#)通过指定函数处理数组的每个元素，并返回处理后的数组。

**计算转换**

[`reduce()`](http://www.runoob.com/jsref/jsref-reduce.html)` `将数组元素计算为一个值（从左到右）。如遇到字符串，执行字符串拼接。

[`reduceRight()`](http://www.runoob.com/jsref/jsref-reduceright.html)` `将数组元素计算为一个值（从右到左）。

[`toString()`](http://www.runoob.com/jsref/jsref-tostring-array.html)` `把数组转换为字符串，并返回结果。

[`valueOf()`](http://www.runoob.com/jsref/jsref-valueof-array.html)` `返回数组对象的原始值。

##### 排序

[`sort( )`](http://www.runoob.com/jsref/jsref-sort.html)` `对数组的元素进行排序。使用数字排序，你必须通过一个函数作为参数来调用。


[`reverse()`](#)反转数组的元素顺序，该方法返回对数组的引用，会**改变原数组**。

#### Array.of

`Array.of`用于将参数依次转化为数组中的一项，然后返回这个新数组，而不管这个参数是数字还是其它，它基本上与Array构造器功能一致，唯一的区别就在单个数字参数的处理上.

```js
Array.of(8.0); // [8]
Array(8.0); // [undefined × 8]
```
#### Array.from
只要一个对象有迭代器，Array.from就能把它变成一个数组（当然，是返回新的数组，不改变原对象）。
语法：`Array.from(arrayLike[, processingFn[, thisArg]])`
Array.from拥有3个形参，第一个为类似数组的对象，必选。第二个为加工函数，新生成的数组会经过该函数的加工再返回。第三个为this作用域，表示加工函数执行时this的值。后两个参数都是可选的。
**注意**:一旦使用加工函数，必须明确指定返回值，否则将隐式返回undefined，最终生成的数组也会变成一个只包含若干个undefined元素的空数组。

#### Array.isArray()
判定一个对象是数组的五种方法，前四种都不保险，如果将某个对象的对象的`__proto__`属性为`Array.prototype`，便导致了该对象继承了Array对象，前四种方法就会判定为true.

```js
var a = [];
// 1.基于instanceof
a instanceof Array;
// 2.基于constructor
a.constructor === Array;
// 3.基于Object.prototype.isPrototypeOf
Array.prototype.isPrototypeOf(a);
// 4.基于getPrototypeOf
Object.getPrototypeOf(a) === Array.prototype;
// 5.基于Object.prototype.toString
Object.prototype.toString.apply(a) === '[object Array]';
```
所以严格意义上判定一个对象是否是数组，推荐使用第五种方法，再说到`Array.isArray()`，实际上就是推荐使用的第五种toString方法。

典型问题：

### 数组去重
实际上有很多种方法，其实都大同小异，只要熟悉数组操作的API方法，你就可以写出很多种，但是本质都是一样的。优先推荐使用ES6中Set属性不重复的特征去重。

 1. 两层for循环，一层遍历数组，一层循环对比，对相同的元素从数组中删除，或者新建一个res数组，将不同的元素push到新数组中，返回新数组。效率低，当数组比较长时不合适。
 ```js
 let arr = [0, 3, 4, 3, 4, 6, 2, 4];
 for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                arr.splice(j, 1);
                console.log(arr)
            }
        }
    }
    
    // [0, 2, 3, 4, 6]
 ```
 2. 使用IndexOf或者includes检查是否重复，其实跟第一种方法比较就是将第二层循环使用了IndexOf这种有遍历接口的API操作，这个操作的本质是不是跟第一种方法一样使用循环遍历，这个就是要看源码了。
 ```js
 let arr = [0, 3, 4, 3, 4, 6, 2, 4];
 let res = [];
 for (let i = 0, len = arr.length; i < len; i++) {
       let current= arr[i];
       if(res.indexOf(current)===-1){
           res.push(current)
       }
       
       //或者使用includes
       if(!res.includes(current)){
           res.push(current)
       }
    
    }
    
    // [0, 2, 3, 4, 6]
 ```
 3. 先用`sort`排序，后比较相邻两个是否相等。
 ```js
    let arr = [0, 3, 4, 3, 4, 6, 2, 4];
    arr.sort();
    let temp;
    let res=[]
    console.log(temp)
    for (let i = 0, len = arr.length; i < len; i++) {
        if (!i || temp !== arr[i]) {
            res.push(arr[i])
        }
        temp=arr[i]
    }
    console.log(res);
    
    // [0, 2, 3, 4, 6]
 ```
 4. ES6中Set属性
 ```js
 // 去除数组的重复成员
  [...new Set(array)]
  
  let arr = [0, 3, 4, 3, 4, 6, 2, 4];
  let res=[...new Set(arr)]

  // [0, 2, 3, 4, 6]
 ```
**注意**：
1、以上去重只对数组中同一种数据类型进行比较去重，如果有不同的数据类型，要区别对待
2、向 Set 加入值的时候，不会发生类型转换，Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于精确相等运算符（===），主要的区别是NaN等于自身，在 Set 内部，它认为两个NaN是相等。
3、indexOf内部使用的精确相等运算符（===），`NaN===NaN 的结果是 false`
4、includes内部也是使用的类似精确相等运算符（===），`NaN===NaN 的结果是 true`




### 1、单数组操作

### 2、数组遍历方法

### 3、多数组操作



