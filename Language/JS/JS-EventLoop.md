# JS EventLoop
JavaScript是单线程，非阻塞的。

代码执行过程中，同步代码按顺序直接入栈，异步代码（宏任务、微任务）进队列，等待入栈执行。

## 宏任务和微任务
宏任务和微任务的区别请上网学习

### 宏任务
|          任务           | 浏览器 | Node  |
| :---------------------: | :----: | :---: |
|     `setTimeout()`      |   ✅    |   ✅   |
|     `setInterval()`     |   ✅    |   ✅   |
|          `IO`           |   ✅    |   ✅   |
| `requestAnimationFrame` |   ✅    |   ❌   |
|      `postMessage`      |   ✅    |   ❌   |
|    `setImmediate()`     |   ❌    |   ✅   |


### 微任务
|        任务        | 浏览器 | Node  |
| :----------------: | :----: | :---: |
|     `Promise`      |   ✅    |   ✅   |
| `process.nextTick` |   ❌    |   ✅   |
| `MutationObserver`H5新增 |   ✅    |   ❌   |


## 浏览器的EventLoop

在当前执行栈为空时，主线程会查看微任务队列是否有事件存在
- 存在，依次执行队列中的事件对应的回调，直到微任务队列为空，然后去宏任务队列中取出最前面的事件，把当前的回调加到当前指向栈。
- 如果不存在，那么再去宏任务队列中取出一个事件并把对应的回到加入当前执行栈；

当前执行栈执行完毕后时会立刻处理所有微任务队列中的事件，然后再去宏任务队列中取出一个事件。**同一次事件循环中，微任务永远在宏任务之前执行**。

在事件循环中，每进行一次循环操作称为`tick`，每一次`tick`的任务处理模型是比较复杂的，但关键步骤如下：

1. 执行一个宏任务（栈中没有就从事件队列中获取）
2. 执行过程中如果遇到微任务，就将它添加到微任务的任务队列中
3. 宏任务执行完毕后，立即执行当前微任务队列中的所有微任务（依次执行）
4. 当前宏任务执行完毕，开始检查渲染，然后GUI线程接管渲染
5. 渲染完毕后，JS线程继续接管，开始下一个宏任务（从事件队列中获取）

![](https://image-static.segmentfault.com/110/081/1100815376-96173ef6295d6c1f)

## Node的EventLoop

### 不同点
- `Node` 中事件循环的实现依赖`libuv`引擎。
- Node10以前，microTask 在事件循环的的各个阶段执行
- Node10以后，变得和浏览器一致，一旦一个阶段里的宏任务，就立刻执行所有的microTask

### EventLoop

![](https://www.ruanyifeng.com/blogimg/asset/2014/bg2014100803.png)

node官网对于事件循环操作顺序的图解

```
   ┌───────────────────────────┐
┌─>│           timers          │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │     pending callbacks     │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
│  │       idle, prepare       │
│  └─────────────┬─────────────┘      ┌───────────────┐
│  ┌─────────────┴─────────────┐      │   incoming:   │
│  │           poll            │<─────┤  connections, │
│  └─────────────┬─────────────┘      │   data, etc.  │
│  ┌─────────────┴─────────────┐      └───────────────┘
│  │           check           │
│  └─────────────┬─────────────┘
│  ┌─────────────┴─────────────┐
└──┤      close callbacks      │
   └───────────────────────────┘
```

阶段描述：
- 定时器：本阶段执行已经被`setTimeout()`和`setInterval()`的调度回调函数。
- 待定回调：执行延迟到下一个循环迭代的`I/O`回调。
- idle, prepare：仅系统内部使用。
- 轮询：检索新的 I/O 事件;执行与 I/O 相关的回调（几乎所有情况下，除了关闭的回调函数，那些由计时器和`setImmediate()`调度的之外），其余情况`node`将在适当的时候在此阻塞。
- 检测：`setImmediate()`回调函数在这里执行。
- 关闭的回调函数：一些关闭的回调函数，如：`socket.on('close', ...)`。

对于各个阶段的具体解释和案例，参考官网。

## 参考
- [Node.js 事件循环，定时器和 process.nextTick()](https://nodejs.org/zh-cn/docs/guides/event-loop-timers-and-nexttick/)
- [JavaScript 运行机制详解：再谈Event Loop](http://www.ruanyifeng.com/blog/2014/10/event-loop.html)
- [浏览器与Node的事件循环(Event Loop)有何区别?](https://blog.fundebug.com/2019/01/15/diffrences-of-browser-and-node-in-event-loop/)
