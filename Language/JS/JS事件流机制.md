# JS事件流机制

## 事件流

### 事件流

![](/assets/event.png)

### 事件代理

事件绑定后，检测顺序就会从被绑定的DOM下滑到触发的元素，再冒泡会绑定的DOM上。也就是说，如果你监听了一个DOM节点，那也就等于你监听了其所有的后代节点。

代理的意思就是只监听父节点的事件触发，以来代理对其后代节点的监听，而你需要做的只是通过`currentTarget`属性得到触发元素并作出回应。

使用事件代理意味着你可以节省大量重复的事件监听，以减少浏览器资源消耗。还有一个好处就是让HTML独立起来，比如之后还有要加子元素的需求，也不需要再为其单独加事件监听了。

### 事件处理程序

DOM0级事件处理就是讲一个函数赋值给一个事件处理程序属性

```js
btn.onclick=function (){}
```

DOM2级事件处理程序，这里因为历史原因，IE的事件处理操作API名称和常规的不太一样，所以，一般需要考虑到浏览器兼容，高程上给出了一个扩浏览器的EventUtil对象，会检测是是否支持DOM2级事件处理，以及IE下的情况。优先推荐。  
**注意** ：addEventListener\(\)/removeEventListener\(\)最后一个参数为boolean值，true表示在捕获阶段调用事件处理函数，false表示在冒泡阶段处理。

IE下的attachEvent\(\)  detachEvent\(\)没有这个布尔值，因为早期IE只支持冒泡，所以IE处理默认冒泡。

```js
/** DOM2级事件处理程序  浏览器兼容
 * IE-attachEvent()  detachEvent()
 * 其他-addEventListener()  removeEventListener()
 * EventUtil: 全局对象
 * 使用：EventUtil.addHandler(ele,type,handler)
 * **/
let EventUtil = {
    addHandler: (element, type, handler) => {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler;
        }
    },
    removeHandler: (element, type, handler) => {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false)
        } else if (element.detachEvent()) {
            element.detachEvent('on' + type, handler)
        } else {
            element['on' + type] = null;
        }
    }
}
```

### 事件对象

在触发 DOM 上的某个事件时，会产生一个事件对象 event ，这个对象中包含着所有与事件有关的信息。包括导致事件的元素、事件的类型以及其他与特定事件相关的信息。例如，鼠标操作导致的事件对象中，会包含鼠标位置的信息，而键盘操作导致的事件对象中，会包含与按下的键有关的信息。所有浏览器都支持 event 对象，但支持方式不同。

当然，在事件对象中IE也有不一样的地方。后面再区别，先看DOM2级事件对象。

![](/assets/eventObj.png)

在事件处理程序内部，**对象 this 始终等于 currentTarget 的值**，而 target 则只包含事件的实际目标。如果直接将事件处理程序指定给了目标元素，则 this 、 currentTarget 和 target 包含相同的值。。如果事件处理程序存在于按钮的父节点中（例如 document.body ），那么这些值是不相同的。

##### IE中的事件对象

![](/assets/enevt-ie.png)

### 事件类型

![](/assets/eventType1.png)

这里面主要记住UI事件，大部分是window对象相关。

![](/assets/eventType2.png)

## 内存和性能优化

在 JavaScript 中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能。导致这一问题的原因是多方面的。首先，每个函数都是对象，都会占用内存；内存中的对象越多，性能就越差。其次，必须事先指定所有事件处理程序而导致的 DOM访问次数，会延迟整个页面的交互就绪时间。当然最直接的就是**减少页面中事件处理程序**。

#### 优化方案一：使用事件委托

事件委托利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。一个典型的应用就是比如有一批列表，给每一个列表都添加一个事件处理程序，则内存占用比较大，然后操作也比较复杂，如果在DOM中尽量高一层级上添加一个事件处理程序，利用事件冒泡，可以让每一个列表都可以获取到事件处理。这种技术对用户最终的结果与之前的方法差不多，但是需要的内存更少。

使用事件委托技术，与传统方法相比较，有如下优势：

![](/assets/eventProxy.png)

#### 优化方案二：移除时间事件处理程序

内存中保留着那些过时不用的“空事件处理程序”，也是造成Web应用程序内存和性能问题的主要原因。两种典型的情况会造成“空事件处理程序占用内存”的问题：

* 从文档中移除带有事件处理程序的元素时。
  这可能是通过纯粹的 DOM 操作，例如使用 removeChild\(\) 和 replaceChild\(\) 方法，但更多地是发
  生在使用 innerHTML 替换页面中某一部分的时候。如果带有事件处理程序的元素被 innerHTML 删除
  了，那么原来添加到元素中的事件处理程序极有可能无法被当作垃圾回收。

一般使用手工移除事件处理程序，`btn.onclick=null;`，然后再设置innerHTML。

* 卸载页面。如果在页面被卸载之前没
  有清理干净事件处理程序，那它们就会滞留在内存中。每次加载完页面再卸载页面时（可能是在两个页
  面间来回切换，也可以是单击了“刷新”按钮），内存中滞留的对象数目就会增加，因为事件处理程序
  占用的内存并没有被释放。 

一般来说，最好的做法是在页面卸载之前，先通过onunload事件处理程序移除所有事件处理程序。

说到 这里，就又可以看到事件委托技术的优势，如果事件追踪的越少，越容易移除。

## 易混淆事件区分

### mouse事件

- **mouseover与mouseenter**
  - mouseover：不论鼠标指针穿过被选元素或其子元素，都会触发 mouseover 事件。
  - mouseenter：只有在鼠标指针穿过被选元素时，才会触发 mouseenter 事件。

- **mouseout与mouseleave**
  - mouseout：不论鼠标指针离开被选元素还是任何子元素，都会触发 mouseout 事件。
  - mouseleave：只有在鼠标指针离开被选元素时，才会触发 mouseleave 事件。



