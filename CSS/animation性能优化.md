# 渲染 性能优化

[渲染性能优化](http://www.wdshare.org/article/5770ed9753c50d1a18f64a97)

这一篇讲的比较实用，很多都是在开发中能用到的。


### animation
不是所有属性动画消耗的性能都一样，其中消耗最低的是transform和opacity两个属性（当然还有会触发Composite的其他CSS属性），其次是Paint相关属性。所以在制作动画时，建议使用transform的translate替代margin或position中的top、right、bottom和left，同时使用transform中的scaleX或者scaleY来替代width和height。

