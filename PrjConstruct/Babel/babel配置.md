
# babel

Babel 是 Javascript 编译器 ,将 ES6,ES7 ,ES8 转换成 浏览器都支持 的ES5 语法,并提供一些插件来兼容浏览器API的工具。是怎么实现的勒, Babel 会将源码转换 AST(抽象语法树) 之后，通过便利AST树，对树做一些修改，然后再将AST转成code，即成源码


## 版本历史

- 2015-02-15，6to5重命名为babel
- 2015-03-31，babel 5.0发布 全家桶，所有东西都在里面
- 2015-10-30，babel 6.0发布  拆分核心包和插件
- 2018-08-27, babel 7.0发布 treeshaking


## babel 特性

babel的编译过程

1. parser：通过 babylon 解析成 AST。
2. transforms：All the plugins/presets ，进一步的做语法等自定义的转译，仍然是 AST。
3. generator： 最后通过 babel-generator 生成  output string。


### polyfill VS runtime

babel-polyfill 是当前环境注入这些 es6+ 标准的垫片，好处是引用一次，不再担心兼容，而且它就是全局下的包，代码的任何地方都可以使用。缺点也很明显，它可能会污染原生的一些方法而把原生的方法重写。如果当前项目已经有一个 polyfill 的包了，那你只能保留其一。而且一次性引入这么一个包，会大大增加体积。如果你只是用几个特性，就没必要了，如果你是开发较大的应用，而且会频繁使用新特性并考虑兼容，那就直接引入吧。

transform-runtime 是利用 plugin 自动识别并替换代码中的新特性，你不需要再引入，只需要装好 babel-runtime 和 配好 plugin 就可以了。好处是按需替换，检测到你需要哪个，就引入哪个 polyfill，如果只用了一部分，打包完的文件体积对比 babel-polyfill 会小很多。而且 transform-runtime 不会污染原生的对象，方法，也不会对其他 polyfill 产生影响。所以 transform-runtime 的方式更适合开发工具包，库，一方面是体积够小，另一方面是用户（开发者）不会因为引用了我们的工具，包而污染了全局的原生方法，产生副作用，还是应该留给用户自己去选择。缺点是随着应用的增大，相同的 polyfill 每个模块都要做重复的工作（检测，替换），虽然 polyfill 只是引用，编译效率不够高效。

之前runtime对于一些属性方法，例如 `array.includes`等一些高级es6+的方法不支持，只能选用polyfill加垫片的方式，自从 `babel7` 更新了`corejs`的支持方法之后，绝大部分高级方法都可以支持了。

选型：

如果是小工程，推荐使用runtime 减小代码体积，如果是对高级语法使用场景特别多的大工程，推荐使用polyfill方式。

### presets
presets 就是 plugins 的组合，你也可以理解为是套餐... 主要有
- env
- es2015
- react
- lastet
- stage-x 具体的语法属于哪个 stage 可参照tc39

## babel 工程配置

### babel在webpack中配置

在webpack中使用`babel-loader`处理js 或者ts时，如果在webpack-loader中配置了话，`.babelrc`文件中就不用配置，因为webpack读取了loader中的babel配置，就不会再从`.babelrc`中读取配置覆盖。只需要配置一次。

自己整理的一个`.babelrc`通用配置
```js
{
    "presets": [
        [
            "@babel/preset-env",
            // Browserslist使用默认 https://github.com/browserslist/browserslist#queries
            {
                "modules": false,
                "useBuiltIns": "usage",
                "targets": "ie >= 8"
            }
        ]
    ],
    "plugins": [
        ["@babel/plugin-transform-runtime",                                     // 支持ES6+ 等以上高级方法，例如array.includes
            {"corejs": { "version": 3, "proposals": true }}
        ],
        ["@babel/plugin-proposal-decorators", {"legacy": true}],                // 支持类装饰器
        ["@babel/plugin-proposal-class-properties", {"loose": true}]            // 支持class类的写法
    ]
}
```

其实实际在工程中使用的时候，对于babel最大的问题不在于不知道这个地方应该怎么配置，而是实现同样的功能不知道使用那个包或者哪个插件更好。

比如说对es5+高级语法的支持，使用polyfill还是runtime，总结下来最后还是看工程定位，首先看项目需要哪些运行环境支持，更根据项目体积，项目后续迭代的要求去选用合适的插件。

## 参考
- [babel官网](https://babeljs.io/docs/en/)
- [你真的会用 Babel 吗?](https://juejin.im/post/59b9ffa8f265da06710d8e89)