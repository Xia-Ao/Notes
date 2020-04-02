
# webpack 构建流程


![webpack构建流程.png](https://i.loli.net/2019/11/12/rIHCtwi5pbsPqMg.png)

<!-- ## PPT大纲

- 启动流程简介
  - 流程图介绍， 一张主要的流程图，几个主要的流程
- webpack构建三大步
  - 三大步概述
  - 三大步图解
  - webpack准备阶段（以build为例，dev与build的区别我还暂时没有做）
    - 做了什么
    - 得到了什么
  - modules和chunks生成阶段
    - 先modules解析
      - 两个关键的工厂
      - 创建实例
      - 使用loader
      - 生成AST解析依赖
    - chunks生成
      - chunks生成规则
      - optimize配置应用
  - 文件生成
    - 生成hash
    - 模板渲染，使用Template渲染生成code，存在asset中
    - 生成文件
      - 监听文件变化，emit 触发done，构建完成
- dev（watch模式）的区别待深入，主流程一样，区别在于使用的plugin和loader不一样，hotTemplate
-  -->


构建流程中一些核心方法节选。

```js
const webpack = (options, callback) => {
	compiler = new Compiler(options.context);
	// WebpackOptionsApply 遍历options初始化了各种插件，订阅了plugin的事件
	compiler.options = new WebpackOptionsApply().process(options, compiler);
	return compiler;
};

// Compiler
class compiler extands Tapable{
    constructor() {
        this.hooks = '定义了各种生命周期的hook'
    }
    run () {
        // before前的工作
        this.compile();
    }
    compile() {
        const compilation = this.newCompilation(params);
    }
}
```

```js
class compiler extands Tapable{
    compile() {
        // 创建Module实例
        const params = this.newCompilationParams();
        const compilation = this.newCompilation(params);
    }
    
    newCompilationParams() {
		return {
			normalModuleFactory: this.createNormalModuleFactory(),
			contextModuleFactory: this.createContextModuleFactory(),
			compilationDependencies: new Set()
		}
	}
	
	createNormalModuleFactory() {
		const normalModuleFactory = new NormalModuleFactory();
		return normalModuleFactory;
	}
}
```

```js
class Compilation  {
    buildModule (module, dependencies) {
        this.hooks.buildModule.call(module);
        module.build();
    }
}

class NormalModule {
    build() {
        // 调用了一个第三方工具 loader-runner
        // 使用loader处理
		runLoaders()
		
		// AST解析
    }
}

```
```js
doBuild(options, compilation, resolver, fs, callback) {
	// 创建loader工作上下文
	const loaderContext = this.createLoaderContext();
	
	// 调用了一个第三方工具 loader-runner
	// 中间laoder的过程文件流是buffer格式
	runLoaders(options, compilation等各种参数);
}
```


```js
const result = this.parser.parse(
	// this._source.source()方法获取的是文件代码
	this._ast || this._source.source(),
	
	(err, result) => {
		// 处理ast结果，遇到require再递归处理
		handleParseResult(result);
	}
);
```

```js
class Compilation {
    seal() {
        buildChunkGraph();
        // optimize配置中的相关参数在下面这些步骤中生效
        this.hooks.optimize.call();
        // ...
    }
}
```

```js
seal() {
    this.hooks.beforeHash.call();
	this.createHash();
	this.hooks.afterHash.call();
	
	this.createModuleAssets();
	
	this.createChunkAssets();
}
```

```js


```


参考： 
- [细说 webpack 之流程篇](https://fed.taobao.org/blog/2016/09/10/webpack-flow/)
- [webpack 打包构建流程分析整理](https://www.goyth.com/2018/12/10/webpackFlow/)
- [玩转webpack（一）：webpack的基本架构和构建流程](https://lxzjj.github.io/2017/11/02/%E7%8E%A9%E8%BD%ACwebpack%EF%BC%88%E4%B8%80%EF%BC%89/)
- [玩转webpack（二）：webpack的核心对象](https://lxzjj.github.io/2017/11/08/%E7%8E%A9%E8%BD%ACwebpack%EF%BC%88%E4%BA%8C%EF%BC%89/)