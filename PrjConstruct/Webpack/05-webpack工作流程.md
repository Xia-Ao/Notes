大纲
- tapable
- hooks

# webpack工作流程

## 工作流程

![tapable.png](https://i.loli.net/2019/11/05/VgPbpSiGsjK7U6B.png)

### 启动分析
入口
依赖两个包`webpack-cli`必须,`webpack-command` 
```js
// ./bin/webpack.js
// 调用了webpack-cli
```
在以前webpack3时代，没有单独的webpack-cli，对应的功能就在webpack中，在webpack4中，将webpack-cli单独抽离出来成一个包。

接下来让我们看看webpack-cli里面做了什么，调用了webpack，还做了其他的处理。

webpack-cli 
```js
// webpack-cli/lib/cli.js
// 创建webpack的compiler实例
const webpack = require('webpack');
try {
	compiler = webpack(options);
}
```
看到这里，让我们再看看webpack， webpack中引用了Compiler并实例化了一个complier，将options赋值给实例对象，开始了一系列初始化操作。

然后判断options配置的是否有`watch`，如果有watch，则使用`compiler.watch()`方法启动，启用监听器。如果没有`watch`，则使用`complier.run()`方法启动。

```js
// webpack/lib/webpack.js
const Compiler = require("./Compiler");
const webpack = (options, callback) => {
	let compiler;
	compiler = new Compiler(options.context);
	compiler.options = options;
	compiler.hooks.environment.call();
	compiler.hooks.afterEnvironment.call();
	compiler.options = new WebpackOptionsApply().process(options, compiler);

	if (callback) {
		if (
			options.watch === true ||
			(Array.isArray(options) && options.some(o => o.watch))
		) {
			const watchOptions = Array.isArray(options)
				? options.map(o => o.watchOptions || {})
				: options.watchOptions || {};
			return compiler.watch(watchOptions, callback);
		}
		compiler.run(callback);
	}
	return compiler;
};

```

看到这里，我们就需要分析这个Compiler是什么。这是webpack的核心编译器，里面定义了很多方法和钩子函数，挂载在`this.hooks`上。

让我们看下Compiler的代码，从里面截取了比较简短的一部分，我们看到，在Compiler实例化的时候，就往hooks上实例化了很多的Hook，，这些钩子都来源了tapable这个库，本质上是一种发布订阅模式，稍后我们再分析这些hook的实现，我们接着往下看。

这些钩子实例化的时候都传入了一个或者多个名字。实例化时注册了这样的一个名字为传入参数的发布订阅。我们在初始化的时候订阅了相关事件，等到需要发布的时候，订阅的相关事件都会按照规则一件一件的执行。实现webpack的功能。


```js
// webpack/lib/Compiler.js

const {
	Tapable,
	SyncHook,
	SyncBailHook,
	AsyncParallelHook,
	AsyncSeriesHook
} = require("tapable");

class Compiler extends Tapable {
	constructor(context) {
		super();
		this.hooks = {
			/** @type {AsyncSeriesHook<Stats>} */
			done: new AsyncSeriesHook(["stats"]),
			/** @type {AsyncSeriesHook<Compiler>} */
			run: new AsyncSeriesHook(["compiler"]),
			/** @type {AsyncSeriesHook<Compilation>} */
			emit: new AsyncSeriesHook(["compilation"]),
			
			/** @type {AsyncSeriesHook<CompilationParams>} */
			beforeCompile: new AsyncSeriesHook(["params"]),
			/** @type {SyncHook<CompilationParams>} */
			compile: new SyncHook(["params"]),
			/** @type {AsyncParallelHook<Compilation>} */
			make: new AsyncParallelHook(["compilation"]),
			/** @type {AsyncSeriesHook<Compilation>} */
			afterCompile: new AsyncSeriesHook(["compilation"]),
		    
		    // ...
		  
		}
		watch() {
		    
		}
		run() {
		    
		}
	}
```

在上面compiler中我们看到有好多种hook，每种hook都是发布订阅，只是根据发布事件执行规则不一样，做了不同的区分，用于处理webpack中需要的不用处理，后面会有介绍。

接下来我们来看一下tapable是是怎么做到发布订阅的。

## tapable
在tapable中，最核心就是两个文件，一个是`Hook.js`，这是hook的基类，hook的自身属性都继承于Hook类，另一个是`HookCodeFactory.js`，这个是hook的工厂类，发布事件执行都是依赖了该工厂类中的各种工序，我需要加工成什么样子，就是去调用工厂类中的各种方法。

然后tapable暴露出去的各种Hook，都是先继承了基类，后执行了工厂类中的不同方法（即不同的工序组合）生成出不同功能的hook产品。

### tapable 发布订阅 模式

先说发布订阅

> 发布-订阅是一种消息范式，消息的发送者（称为发布者）不会将消息直接发送给特定的接收者（称为订阅者）。而是将发布的消息分为不同的类别，无需了解哪些订阅者（如果有的话）可能存在。同样的，订阅者可以表达对一个或多个类别的兴趣，只接收感兴趣的消息，无需了解哪些发布者（如果有的话）存在。—— 维基百科

> 发布/订阅模式与观察者模式非常类似，它们最大的区别是：发布者和订阅者不知道对方的存在。它们之间需要一个第三方组件，叫做信息中介，它将订阅者和发布者串联起来，它过滤和分配所有输入的消息。换句话说，发布/订阅模式用来处理不同系统组件的信息交流，即使这些组件不知道对方的存在

参考[来源](https://semlinker.com/node-event-emitter/#%E5%8F%91%E5%B8%83-%E8%AE%A2%E9%98%85%E6%A8%A1%E5%BC%8F)

> ![](http://cdn.semlinker.com/pubsub-pattern.png)

先看一个最基本的demo，实际上的Hook类当然要比这个复杂。
```js
// tapable/lib/Hook.js

class Hook {
    constructor(args) {
        this_args = args;
        this.taps = [];
    }
    // 订阅事件
    tap() {
        // 传递订阅事件名称和handle,存储在taps中
        this.taps.push(name, handle);
    }
    // 发布事件
    call() {
        // 遍历taps，将taps中的handle按照顺序执行
        this.taps.forEach((args) => {
            handle(arg);
        })
    }
}
```
我们看到，hook的发布订阅模式就是在注册时初始化一个taps数组，在执行tap事件，传入订阅事件名称和fn，同一个订阅事件名称可以掺入订阅多个fn，按照一定的规则存储到taps中，执行的时候调用call方法，遍历taps，找到对应的handle，遍历执行。

当然实际上的hook实现没有这么简单。

#### 订阅

在tap方法中，调用了`_insert`方法，该方法是将事件按照一定的规则存入到taps数组中。代码如下：

```js
_insert(item) {
	this._resetCompilation();
	let before;
	if (typeof item.before === "string") before = new Set([item.before]);
	else if (Array.isArray(item.before)) {
		before = new Set(item.before);
	}
	let stage = 0;
	if (typeof item.stage === "number") stage = item.stage;
	let i = this.taps.length;
	while (i > 0) {
		i--;
		const x = this.taps[i];
		this.taps[i + 1] = x;
		const xStage = x.stage || 0;
		if (before) {
			if (before.has(x.name)) {
				before.delete(x.name);
				continue;
			}
			if (before.size > 0) {
				continue;
			}
		}
		if (xStage > stage) {
			continue;
		}
		i++;
		break;
	}
	this.taps[i] = item;
}
```
简单总结一下规则，每个传进来的订阅事件，按照订阅名称区分，定了这样的几个属性
- before 在哪个之前
- stage 执行先后顺序

如果传入的事件中有before参数，则将该事件插入到对应的事件之前，之后再看是否有stage参数，这个参数决定订阅事件在发布时的执行顺序，默认为0，从小到大排序，越大越后执行。

#### 发布 以SyncHook为例

发布的时候执行call方法，在call方法中调用了内部方法`_createCall()`，里面执行了`this.compile()`方法，我们在`hook.js`中没有找到这个compile方法，原来这个方法在SyncHook继承Hook基类的时候重写了，这时候调用的是实例上的compile方法。这时候就感觉tapable的设计非常遵循语言的三大特性，是否合理。

```js
// tapable/lib/SyncHook.js

const Hook = require("./Hook");
const HookCodeFactory = require("./HookCodeFactory");

class SyncHookCodeFactory extends HookCodeFactory {
	content({ onError, onDone, rethrowIfPossible }) {
		return this.callTapsSeries({
			onError: (i, err) => onError(err),
			onDone,
			rethrowIfPossible
		});
	}
}

const factory = new SyncHookCodeFactory();

class SyncHook extends Hook {
	compile(options) {
		factory.setup(this, options);
		return factory.create(options);
	}
}
```
在这里就们就看到同步钩子SyncHook的实现，上面说到的执行compile方法，就需要调用工厂的工序来实现SyncHook的功能，同时针对于SyncHook这个钩子，定义了熟悉自己特有个一个content方法的实现，在tapable中不同功能钩子除了在compile方法中调用不用的工序之外，还有熟悉自己特殊的工序，就是这个content方法。

我们再接着看compile中调用的工序，首先是setup，这个工序是将传入的taps数组挂载到实例的`_x`属性上，方面后面操作，就像在工厂里面，产品来到工厂之后，将待加工的产品放到操作台上。

```js
// tapable/lib/HookCodeFactory.js

setup(instance, options) {
	instance._x = options.taps.map(t => t.fn);
}
```
然后再调用了`create()`方法，这个就是工厂流程了核心链路，主要实现为将发布执行的call方法对应的订阅事件名称传入，找到对应的订阅事件，判断订阅事件的类型，在tapable中事件类型分为sync和async还是promise三种，这个类型是在一开始订阅的时候就初始化了，在前面没有讲。然后根据不同的订阅事件类型执行响应的操作。

执行发布的过程是调用`callTap`方法，这里不详细说，核心就是遍历所有的订阅事件，按照订阅时的规则顺序依次执行，什么停下来取决于之前说的针对了不同hook类自己特有的工序content方法，比如SyncHook钩子中，顺序执行，上一到工序的执行结果作为下一道工序的参数。一直到将taps中的订阅事件执行完毕。


### tapable中的Hook

下面总结一些tapable中的Hook，

名称 | 钩入的方式 | 作用
---|---|---
SyncHook | tap | 同步钩子
SyncBailHook | tap | 同步钩子，只要执行的 handler 有返回值，剩余 handler 不执行
SyncLoopHook | tap | 同步钩子，只要执行的 handler 有返回值，一直循环执行此 handler
SyncWaterfallHook | tap | 同步钩子，上一个 handler 的返回值作为下一个 handler 的输入值
AsyncParallelBailHook | tap， tapAsync，tapPromise | 异步钩子，handler 并行触发，但是跟 handler 内部调用回调函数的逻辑有关
AsyncParallelHook | tap， tapAsync，tapPromise | 异步钩子，handler 并行触发
AsyncSeriesBailHook | tap， tapAsync，tapPromise | 异步钩子，handler 串行触发，但是跟 handler 内部调用回调函数的逻辑有关
AsyncSeriesHook | tap， tapAsync，tapPromise | 异步钩子，handler 串行触发
AsyncSeriesLoopHook | tap， tapAsync，tapPromise | 异步钩子，可以触发 handler 循环调用
AsyncSeriesWaterfallHook | tap， tapAsync，tapPromise | 异步钩子，上一个 handler 可以根据内部的回调函数传值给下一个 handler

[参考](https://juejin.im/post/5c12046af265da612b1377aa)



### tapable和eventemitter区别

webpack官网这样说：
> Tapable 是一个小型的库，允许你对一个 javascript 模块添加和应用插件。它可以被继承或混入到其他模块中。类似于 NodeJS 的 EventEmitter 类，专注于自定义事件的触发和处理。除此之外，Tapable 还允许你通过回调函数的参数，访问事件的“触发者(emittee)”或“提供者(producer)”

简单看了一下EventEmitter，tapable做了事情它都能做，为什么当时webpack没有使用EventEmitter。
