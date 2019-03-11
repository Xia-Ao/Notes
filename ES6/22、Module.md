关于ES6中的Module 的export和import，详细参考阮一峰的ES入门此书。
# Module

在目前比价流行的框架技术中，都会用到Module，之前webpack打包工具中使用的就是require命令。
其实这块是比较简单的，会用就行了

### 严格模式
ES6 的模块自动采用严格模式，不管你有没有在模块头部加上`"use strict";`。

严格模式主要有以下限制。
* 变量必须声明后再使用
* 函数的参数不能有同名属性，否则报错
* 不能使用`with`语句
* 不能对只读属性赋值，否则报错
* 不能使用前缀 0 表示八进制数，否则报错
* 不能删除不可删除的属性，否则报错
* 不能删除变量`delete prop`，会报错，只能删除属性`delete global[prop]`
* `eval`不会在它的外层作用域引入变量
* `eval`和`arguments`不能被重新赋值
* `arguments`不会自动反映函数参数的变化
* 不能使用`arguments.callee`
* 不能使用`arguments.caller`
* **禁止`this`指向全局对象**
* 不能使用`fn.caller`和`fn.arguments`获取函数调用的堆栈
* 增加了保留字（比如`protected`、`static`和`interface`）

ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

### export
`export`可以输出变量，可以输出函数

```javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;

// 或者
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};

export function multiply(x, y) {
  return x * y;
};

```
通常情况下，`export`输出的变量就是本来的名字，但是可以使用`as`**关键字**重命名。

`export`语句输出的接口，与其对应的值是**动态绑定关系**，即通过该接口，可以取到模块内部实时的值。模块内部的值发生了变化，对应输出接口的值也发生了变化

### import
`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块（`profile.js`）对外接口的名称相同。

如果想为输入的变量重新取一个名字，`import`命令要使用`as`关键字，将输入的变量重命名。

```javascript
import { lastName as surname } from './profile.js';
```

* `import`命令输入的变量都是只读的，因为它的本质是输入接口。也就是说，不允许在加载模块的脚本里面，改写接口。如果输出接口是一个对象，在语法上，是允许被改写的，但是一般都不要这样做，改写之后很难查错，使用的时候就当成只读使用。不要轻易改变他的属性。

* `import`命令具有提升效果，会**提升到整个模块的头部**，首先执行。

* `import`语句会**执行所加载的模块**，因此可以有下面的写法。如果多次重复执行同一句`import`语句，那么只会**执行一次**，而不会执行多次。因此，`import`语句是** Singleton 模式**。

```javascript
import 'lodash';
import 'lodash';
```

* `import`使用星号 `*`指定一个对象，所有的输出值都加载在这个对象上面。
```javascript
import * as circle from './circle';
```

### export default

本质上，`export default`就是输出一个叫做`default`的变量或方法，然后系统允许你为它取任意名字。所以，下面的写法是有效的。

```javascript
// modules.js
function add(x, y) {
  return x * y;
}
export {add as default};
// 等同于
// export default add;

// app.js
import { default as foo } from 'modules';
// 等同于
// import foo from 'modules';
```

使用 `export default`输出的接口， `import`不需要使用大括号`{}`,

### export 和 import 复合写法
```javascript
export { foo, bar } from 'my_module';

// 可以简单理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```
`foo`和`bar`实际上并没有被导入当前模块，只是相当于对外转发了这两个接口，导致当前模块不能直接使用`foo`和`bar`。


### import()
提案：使用 `import()`，实现动态加载

适用场景：
* 按需加载
* 条件加载
* 动态的模块路径
总而言之，`import()`会很强大。


![](/assets/es6-import1.png)

![](/assets/es6-import2.png)

export default

![](/assets/es6-import3.png)

![](/assets/es6-import4.png)

## export 与 import 的复合写法 {#export-与-import-的复合写法}

```js
export { foo ,bar } from 'my_module'

//等同于
import { foo ,bar} from 'my_module'
export { foo , bar}
```

### **继承**

![](/assets/es6-import7.png)



## import\(  \)

![](/assets/es6-import8.png)



