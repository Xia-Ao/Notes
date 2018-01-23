关于ES6中的Module 的export和import，详细参考阮一峰的ES入门此书。

在ES6中，要特别注意和node.js中的require进行区分

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



