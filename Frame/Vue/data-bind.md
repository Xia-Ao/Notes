## Vue的双向数据绑定

暂时先参考这篇博文，[剖析Vue原理&实现双向绑定MVVM](https://github.com/DMQ/mvvm)，后续深究VUE的时候自己动手实践

原理是使用 `Object.definePrototype`方法，监听set个get方法，使用**发布-订阅模式**
