
- 课时 3: 热更新
  - 热启动
  - 热更新原理

# webpack热启动原理

## 热启动配置
在webpack的dev模式下，devserver这样配置就可以启动热更新。
```js
const webpack = require('webpack');
devServer: {
    hot: true,
    open: false,
    port: 8080,
},
plugins: [
    new webpack.HotModuleReplacementPlugin(),
],
```
注意，必须有 `webpack.HotModuleReplacementPlugin` 才能完全启用 HMR。如果 `webpack` 或 `webpack-dev-server` 是通过 `--hot` 选项启动的，那么这个插件会被自动添加，所以你可能不需要把它添加到 `webpack.config.js` 中.

## HMR原理

### 为什么要用HMR

> 在 Webpack HMR 功能之前，已经有很多 live reload 的工具或库，比如 live-server，这些库监控文件的变化，然后通知浏览器端刷新页面，那么我们为什么还需要 HMR 呢？
> 
> - live reload 工具并不能够保存应用的状态（states），当刷新页面后，应用之前状态丢失，还是上文中的例子，点击按钮出现弹窗，当浏览器刷新后，弹窗也随即消失，要恢复到之前状态，还需再次点击按钮。而 Webapck HMR 则不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。
> - 在古老的开发流程中，我们可能需要手动运行命令对代码进行打包，并且打包后再手动刷新浏览器页面，而这一系列重复的工作都可以通过 HMR 工作流来自动化完成，让更多的精力投入到业务中，而不是把时间浪费在重复的工作上。
> - HMR 兼容市面上大多前端框架或库，比如React Hot Loader，Vue-loader，能够监听 React 或者 Vue 组件的变化，实时将最新的组件更新到浏览器端。Elm Hot Loader 支持通过 webpack 对 Elm 语言代码进行转译并打包，当然它也实现了 HMR 功能。

放上参考文章的一张HMR过程图解

> ![HMR原理](https://pic1.zhimg.com/v2-f7139f8763b996ebfa28486e160f6378_r.jpg)

> 1. 第一步，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包，并将打包后的代码通过简单的 JavaScript 对象保存在内存中。
> 1. 第二步是 webpack-dev-server 和 webpack 之间的接口交互，而在这一步，主要是 dev-server 的中间件 webpack-dev-middleware 和 webpack 之间的交互，webpack-dev-middleware 调用 webpack 暴露的 API对代码变化进行监控，并且告诉 webpack，将代码打包到内存中。
> 1. 第三步是 webpack-dev-server 对文件变化的一个监控，这一步不同于第一步，并不是监控代码变化重新打包。当我们在配置文件中配置了devServer.watchContentBase 为 true 的时候，Server 会监听这些配置文件夹中静态文件的变化，变化后会通知浏览器端对应用进行 live reload。注意，这儿是浏览器刷新，和 HMR 是两个概念。
> 1. 第四步也是 webpack-dev-server 代码的工作，该步骤主要是通过 sockjs（webpack-dev-server 的依赖）在浏览器端和服务端之间建立一个 websocket 长连接，将 webpack 编译打包的各个阶段的状态信息告知浏览器端，同时也包括第三步中 Server 监听静态文件变化的信息。浏览器端根据这些 socket 消息进行不同的操作。当然服务端传递的最主要信息还是新模块的 hash 值，后面的步骤根据这一 hash 值来进行模块热替换。
> 1. webpack-dev-server/client 端并不能够请求更新的代码，也不会执行热更模块操作，而把这些工作又交回给了 webpack，webpack/hot/dev-server 的工作就是根据 webpack-dev-server/client 传给它的信息以及 dev-server 的配置决定是刷新浏览器呢还是进行模块热更新。当然如果仅仅是刷新浏览器，也就没有后面那些步骤了。
> 1. `HotModuleReplacement.runtime` 是客户端 HMR 的中枢，它接收到上一步传递给他的新模块的 hash 值，它通过 JsonpMainTemplate.runtime 向 server 端发送 Ajax 请求，服务端返回一个 json，该 json 包含了所有要更新的模块的 hash 值，获取到更新列表后，该模块再次通过 jsonp 请求，获取到最新的模块代码。这就是上图中 7、8、9 步骤。
> 1. 而第 10 步是决定 HMR 成功与否的关键步骤，在该步骤中，HotModulePlugin 将会对新旧模块进行对比，决定是否更新模块，在决定更新模块后，检查模块之间的依赖关系，更新模块的同时更新模块间的依赖引用。
> 1. 最后一步，当 HMR 失败后，回退到 live reload 操作，也就是进行浏览器刷新来获取最新打包代码。


以上内容都是摘录于[Webpack Hot Module Replacement 的原理解析](https://github.com/Jocs/jocs.github.io/issues/15)， 下面我们按照上述步骤，从源码中看webapck HMR的实现过程。

这里我使用的是自己手搭的基于webpack的vue工程，方便以后使用vue开发项目开箱即用，在工程中webpack该有的配置都有, 目录如下，详细工程请到xxx下载。

```js
├── README.md
├── build
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   └── config.js
├── dist
│   ├── css
│   ├── index.html
│   └── main.5a165ef23bd780984099.js
├── package.json
├── postcss.config.js
├── public
│   └── index.html
├── src
│   ├── App.vue
│   ├── index.js
│   ├── router.js
│   └── views
├── yarn-error.log
└── yarn.lock
```
在webpack dev配置中，配置了`devServer`的hot模式，由于没有在package.json中的`script`脚本命令中配置`--hot`,所有这里手动添加`webpack.HotModuleReplacementPlugin()`插件。
```js
module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        hot: true,
        open: false,
        port: 8081,
    },
    devtool: 'cheap-eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true,
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 500,
        ignored: /node_moudles/,
    }
})
```

下面我们对文件进行修改，来看webpackHMR的过程。

##### 第一步：webpack watch 打包到内存中

webpack-dev-middleware 调用 webpack 的 api 对文件系统 watch， 当文件变化时，webpack重新编译文件

```js
// webpack-dev-middleware/lib/index.js
// 先设置hook钩子
setupHooks(context);
setupRebuild(context);
setupLogger(context);

// start watching
if (!options.lazy) {
context.watching = compiler.watch(options.watchOptions);
}
// 将outputFileSystem替换为memory-fs的MemoryFileSystem，这样代码就输出到内存中，
setupOutputFileSystem(compiler, context);
```
在webpack中，dev环境下webpack打包编译的输出结果是内存文件，没有将文件写道`output.path`目录下，这样的原因是因为节省了代码写和读的开销，在内存中访问代码比在文件中访问代码更快。

说到这里，我们顺带说一下memory-fs，就是这个东西将webpack的FileSystem替换为MemoryFileSystem，让代码输入到内存里面。接上面讲到，watch到文件变化之后编译出的结果context，下一步就是转化文件，

```js
//  webpack-dev-middleware/lib/utils/setupOutputFileSystem.js
const MemoryFileSystem = require('memory-fs');
function setupOutputFileSystem(compiler, context) {
  // 判断
  // store our files in memory
  // 判断fileSystem是否已经是MemoryFileSystem的实例，如果不是，用 MemoryFileSystem 的实例替换 compiler 之前的 outputFileSystem。
  // 这样 bundle.js 文件代码就作为一个简单 javascript 对象保存在了内存中，当浏览器请求 bundle.js 文件时，devServer就直接去内存中找到上线保存的 javascript 对象返回给浏览器端。
  const isConfiguredFs = context.options.fs;
  const isMemoryFs =
    !isConfiguredFs &&
    !compiler.compilers &&
    compiler.outputFileSystem instanceof MemoryFileSystem;

  if (isMemoryFs) {
    fileSystem = compiler.outputFileSystem;
  } else {
    // 如果不是，用 MemoryFileSystem 的实例替换 compiler 之前的 outputFileSystem。
    fileSystem = new MemoryFileSystem();

    // eslint-disable-next-line no-param-reassign
    compiler.outputFileSystem = fileSystem;
  }

  // eslint-disable-next-line no-param-reassign
  context.fs = fileSystem;
}
```

##### 第二步：devServer 通知浏览器端文件发生变化

在通知文件之前，webpack已经通过sockjs建立了于浏览器之间的websocket通信，这块相关内容可以参考`webpack-dev-serber/lib/Server.js`中`createServer`方法。这稍微说下，socket连接创建之前是根据支持协议https/spdy创建的http连接，之后在listen中创建的socket连接。



```js
// webpack-dev-serber/lib/Server.js
const { compile, invalid, done } = compiler.hooks;
done.tap('webpack-dev-server', (stats) => {
    this._sendStats(this.sockets, this.getStats(stats));
    this._stats = stats;
});

// send stats to a socket or multiple sockets
_sendStats(sockets, stats, force) {
  const shouldEmit =
    !force &&
    stats &&
    (!stats.errors || stats.errors.length === 0) &&
    stats.assets &&
    stats.assets.every((asset) => !asset.emitted);

  if (shouldEmit) {
    return this.sockWrite(sockets, 'still-ok');
  }

  // 调用 sockWrite 方法将 hash 值通过 websocket 发送到浏览器端
  this.sockWrite(sockets, 'hash', stats.hash);

  if (stats.errors.length > 0) {
    this.sockWrite(sockets, 'errors', stats.errors);
  } else if (stats.warnings.length > 0) {
    this.sockWrite(sockets, 'warnings', stats.warnings);
  } else {
    this.sockWrite(sockets, 'ok');
  }
}
```

##### 第三步：Client接收服务端消息做出相应
> 可能你又会有疑问，我并没有在业务代码里面添加接收 websocket 消息的代码，也没有在 webpack.config.js 中的 entry 属性中添加新的入口文件，那么 bundle.js 中接收 websocket 消息的代码从哪来的呢？原来是 webpack-dev-server 修改了webpack 配置中的 entry 属性，在里面添加了 webpack-dev-client 的代码，这样在最后的 bundle.js 文件中就会有接收 websocket 消息的代码了

在client端，接收到`type=hash`的消息会将hash暂存起来，当接收到`type=ok`的消息时，执行接收ok的消息之后执行reloadApp操作。在reloadApp中，如果配置了模块热更新，就调用 webpack/hot/emitter emit一个`webpackHotUpdate`事件，将最新 hash 值发送给 webpack，然后将控制权交给 webpack 客户端代码。如果没有配置模块热更新，就直接调用 location.reload 方法刷新页面。

```js
// webpack-dev-server/client-src/default/index.js

// 接收ok的消息之后对hash进行暂存
hash(hash) {
    status.currentHash = hash;
},

// 接收ok的消息之后执行reloadApp
ok() {
    sendMessage('Ok');
    reloadApp(options, status);
},

function reloadApp(
  { hotReload, hot, liveReload },
  { isUnloading, currentHash }
) {
  if (hot) {
    log.info('[WDS] App hot update...');
    const hotEmitter = require('webpack/hot/emitter');
    hotEmitter.emit('webpackHotUpdate', currentHash);
  }
  // allow refreshing the page only if liveReload isn't disabled
  // 其他情况下再做判断，执行页面刷新rootWindow.location.reload();
  else if (liveReload) {
    // ...
    log.info('[WDS] App updated. Reloading...');
    rootWindow.location.reload();
    // ...
  }
}
```

这里我们看到一次更新websocket对应发送的内容

![websocket](http://h0.hucdn.com/open201944/b5fc9cd0223f4490_1844x1044.png)


##### 第四步：webpack 接收到最新 hash 值验证并请求模块代码

接下来就是webpack的操作了，首先是`webpack/hot/dev-server.js`中监听上一步中`webpack-dev-server/client-src/default/index.js`中emit出来的`webpackHotUpdate`事件，然后触发check方法。

```js
// webpack/hot/dev-server.js
hotEmitter.on("webpackHotUpdate", function(currentHash) {
	lastHash = currentHash;
	if (!upToDate() && module.hot.status() === "idle") {
		log("info", "[HMR] Checking for updates on the server...");
		check();
	}
});

var check = function check() {
  module.hot
	.check(true)
	.then(function(updatedModules) {
	    // 如果不是更新模块，重载页面
		if (!updatedModules) {
			window.location.reload();
			return;
		}

        // 判断是否更新过了，如果没有更新，调用check进行更新
		if (!upToDate()) {
			check();
		}
        
        // 热替换日志
		require("./log-apply-result")(updatedModules, updatedModules);

		if (upToDate()) {
			log("info", "[HMR] App is up to date.");
		}
	})
	.catch(function(err) {
	    // 出错刷新页面
		window.location.reload();
	});
};
```

在check过程中,调用挂载在`module.hot.checkout`方法，会用到`webpack/lib/hmr/HotModuleReplacement.runtime.js`中的`hmrDownloadManifest`和`hmrDownloadUpdateHandlers`两个核心方法，这两个方法是被注入到webpack全局变量`RuntimeGlobals`中的。

> `hotDownloadManifest`方法是调用AJAX向服务端请求是否有更新的文件，如果有将发更新的文件列表返回浏览器端，`hmrDownloadUpdateHandlers`方法是通过 jsonp 请求最新的模块代码，然后将代码返回给 HMR runtime，HMR runtime 会根据返回的新模块代码做进一步处理，可能是刷新页面，也可能是对模块进行热更新。

由于没有在源码中定位到对应方法的定义，直接在devtools下找的编译后的代码

![](http://h0.hucdn.com/open201944/f59ea6a3ee1afba3_1506x1426.png)

下面是从服务端获取变化文件

`hotDownloadManifest`获取的文件变化名称

![](http://h0.hucdn.com/open201944/3036fa98fba3f1bc_1744x824.png)

hmrDownloadUpdateHandlers将上面的文件名称拼接，生成一个script标签，插入到dom中，然后发起请求，获取到对应的js代码块，然后将新的代码块返回给 HMR runtime，进行模块热更新。

![](http://h0.hucdn.com/open201944/3c3e0b5f4a8f1a29_1898x1476.png)


> 还记得 HMR 的工作原理图解 中的问题 3 吗？为什么更新模块的代码不直接在第三步通过 websocket 发送到浏览器端，而是通过 jsonp 来获取呢？我的理解是，功能块的解耦，各个模块各司其职，dev-server/client 只负责消息的传递而不负责新模块的获取，而这些工作应该有 HMR runtime 来完成，HMR runtime 才应该是获取新代码的地方。再就是因为不使用 webpack-dev-server 的前提，使用 webpack-hot-middleware 和 webpack 配合也可以完成模块热更新流程，在使用 webpack-hot-middleware 中有件有意思的事，它没有使用 websocket，而是使用的长轮询。综上所述，HMR 的工作流中，不应该把新模块代码放在 websocket 消息中。


##### 第五步：HotModuleReplacement.runtime 对模块进行热更新 

在HotModuleReplacement.runtime 中，我们看到了有这样的一个方法，`createModuleHotObject`，该方法create之后的赋给了全局的`module.hot`，并且使用`interceptModuleExecution`注入到全局（==具体怎么注入的没有细看， 留到后面有时间再回过来看==），在`createModuleHotObject`方法中我们看到,定义了接下来我们要用到和hot相关的moduleAPI方法。


```js
// webpacl/lib/hmr/HotModuleReplacement.runtime.js

$interceptModuleExecution$.push(function(options) {
	module.hot = createModuleHotObject(options.id, module);
});

function createModuleHotObject(moduleId, me) {
	var hot = {
		// Module API
		active: true,
		accept: function(dep, callback) {
			//
		},
		decline: function(dep) {
		    //
		},
		dispose: function(callback) {
			hot._disposeHandlers.push(callback);
		},
		addDisposeHandler: function(callback) {
			hot._disposeHandlers.push(callback);
		},
		removeDisposeHandler: function(callback) {
			var idx = hot._disposeHandlers.indexOf(callback);
			if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
		},

		// Management API
		check: hotCheck,
		apply: hotApply,
		status: function(l) {
		    //
		},
		addStatusHandler: function(l) {
			//
		},
		removeStatusHandler: function(l) {
		    //
		},
	};

	return hot;
}
```

在这里我们先看几个状态，后面看runtime代码的时候可以方便理解：

status | description
---|---
idle | 该进程正在等待调用 check（见下文）
check | 该进程正在检查以更新
prepare | 该进程正在准备更新（例如，下载已更新的模块）
ready | 此更新已准备并可用
dispose | 该进程正在调用将被替换模块的 dispose 处理函数
apply  | 该进程正在调用 accept 处理函数，并重新执行自我接受(self-accepted)的模块
abort | 更新已中止，但系统仍处于之前的状态
fail | 更新已抛出异常，系统状态已被破坏


在上一步，我们使用check方法的时候调用了`module.hot.check`,在这里我们看到了实际上调用了hotApply方法。我们来看一下`hotCheck`方法,

```js

function hotCheck(apply) {
	// apply 传入为true
	hotApplyOnUpdate = apply;
	// 状态修改
	hotSetStatus("check");
	// 获取hash和trunkId
	return hotDownloadManifest(hotRequestTimeout).then(function(update) {
	    
	    // 定义的一些列变量，webpack5中就没有了，优化掉了
		hotRequestedFilesMap = {};
		hotWaitingFilesMap = {};
		hotAvailableFilesMap = update.c;
		hotUpdateNewHash = update.h;

        // 状态修改,每执行一步，改变状态
		hotSetStatus("prepare");
	    // 这里还定义了一个返回用的promise
		// 下面两个方法检测不同的更新方式，获取几个代码段等，最后都是会调用 hotAddUpdateChunk方法，
		{
			// 调用 hotDownloadUpdateChunk 方法将代码片段通过script标签的方式插入到dom中
			// 这里传入的chunkId是全局trunkId，在方法中会判断
			hotEnsureUpdateChunk(chunkId);
		}
		if (hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
			hotUpdateDownloaded();
		}
		return promise;
	});
}
```

下面我们来看下hotAddUpdateChunk方法， 
```js
// webpacl/lib/hmr/HotModuleReplacement.runtime.js

// 添加更新的chunk代码， 然后调用hotUpdateDownloaded
function hotAddUpdateChunk(chunkId, moreModules) {
	// 一些列遍历操作，没看懂作用是什么，webpack5中优化掉了
	// 
	if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
		hotUpdateDownloaded();
	}
}

// 不干别的，拦截错误状态，正常的更新都会调用hotApply
function hotUpdateDownloaded() {
	hotSetStatus("ready");
	if (hotApplyOnUpdate) {
		Promise.resolve()
			.then(function() {
				return hotApply(hotApplyOnUpdate);
			})
			// ...
	} 
	// ...
}
```

上面的一大堆操作其实就是为了做一件事，拿到代码段，执行hotApply代码。webpack4的hotApply写的替换过程根本没看懂。直接放别人的成果。

```js
// webpack/lib/HotModuleReplacement.runtime
function hotApply() {
  	// ...
  	var idx;
	var queue = outdatedModules.slice();
	while(queue.length > 0) {
		moduleId = queue.pop();
		module = installedModules[moduleId];
		// ...
		// remove module from cache
		delete installedModules[moduleId];
		// when disposing there is no need to call dispose handler
		delete outdatedDependencies[moduleId];
		// remove "parents" references from all children
		for(j = 0; j < module.children.length; j++) {
			var child = installedModules[module.children[j]];
			if(!child) continue;
			idx = child.parents.indexOf(moduleId);
			if(idx >= 0) {
				child.parents.splice(idx, 1);
			}
		}
	}
	// ...
  	// insert new code
	for(moduleId in appliedUpdate) {
		if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
			modules[moduleId] = appliedUpdate[moduleId];
		}
	}
  	// ...
}
```
> 从上面 hotApply 方法可以看出，模块热替换主要分三个阶段，第一个阶段是找出 outdatedModules 和 outdatedDependencies，这儿我没有贴这部分代码，有兴趣可以自己阅读源码。第二个阶段从缓存中删除过期的模块和依赖，如下：

> delete installedModules[moduleId];
> 
> delete outdatedDependencies[moduleId];

> 第三个阶段是将新的模块添加到 modules 中，当下次调用 _webpack_require_ (webpack 重写的 require 方法)方法的时候，就是获取到了新的模块代码了。


以上就是webpack HMR的主要过程。

附：

webpack5中hotApply的核心方法
```js
// webpacl/lib/hmr/HotModuleReplacement.runtime.js

// 如果状态不是ready(此更新已准备并可用)，执行internalApply()
function hotApply(options) {
	if (currentStatus !== "ready") {
		return Promise.resolve().then(function() {
			throw new Error("apply() is only allowed in ready status");
		});
	}
	return internalApply(options);
}

function internalApply(options) {
	options = options || {};

	var results = currentUpdateApplyHandlers.map(function(handler) {
		return handler(options);
	});

	var errors = results
		.map(function(r) {
			return r.error;
		})
		.filter(Boolean);

	if (errors.length > 0) {
		setStatus("abort");
		return Promise.resolve().then(function() {
			throw errors[0];
		});
	}

	// Now in "dispose" phase
	setStatus("dispose");

	results.forEach(function(result) {
		if (result.dispose) result.dispose();
	});

	// Now in "apply" phase
	setStatus("apply");

	currentHash = currentUpdateNewHash;

	var error;
	var reportError = function(err) {
		if (!error) error = err;
	};

	var outdatedModules = [];
	results.forEach(function(result) {
		if (result.apply) {
			var modules = result.apply(reportError);
			if (modules) {
				for (var i = 0; i < modules.length; i++) {
					outdatedModules.push(modules[i]);
				}
			}
		}
	});

	// handle errors in accept handlers and self accepted module load
	if (error) {
		setStatus("fail");
		return Promise.resolve().then(function() {
			throw error;
		});
	}

	setStatus("idle");
	return Promise.resolve(outdatedModules);
}
```



参考：
- [Webpack Hot Module Replacement 的原理解析](https://github.com/Jocs/jocs.github.io/issues/15)
- [HRM](https://webpack.docschina.org/concepts/hot-module-replacement/)
- [HRM API](https://webpack.docschina.org/api/hot-module-replacement)
- [webpack源码解析六之HMR热更新原理](https://www.mybj123.com/4764.html)
- [使用webpack替换热模块](https://github.com/webpack/docs/wiki/hot-module-replacement-with-webpack#how-does-it-work)官方文档
