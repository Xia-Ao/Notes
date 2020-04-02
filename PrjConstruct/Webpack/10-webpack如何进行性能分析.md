
# webpack 如何进行性能分析
- 使用webpack内置的stats
- 速度分析：使用speed-measure-webpack-plugin
- 体积分析：使用webpack-bundle-analyzer


## 分析工具
分析工具可以参考[webpack小书](https://www.timsrc.com/article/30/build-analysis)里面构建分析一节，里面介绍了目前主流的webpack分析工具。

下面简单摘录几个常用的。

- `webpack-unused`：`webpack-unused` 打印出未使用的文件，可用于了解哪些资源不再使用，可以从项目中删除。
- `webpack-bundle-tracker`：可以在 Webpack 编译时捕获数据，并把这些数据以 JSON 格式输出。

  ![](https://cdn.timsrc.com/webpack-bundle-analyzer-1556070577092)

- `webpack-bundle-size-analyzer`: 提供了文本形式的打包结果统计信息。
- `speed-measure-webpack-plugin`: 为每个插件和 loader 提供更细粒度的信息 分析打包速度，看打包时间具体消耗在什么环节。


## bb_h5工程beiji目录分析

- 多页面打包
- 页面总数 27个
- 目前打包时间 47s左右
- 目前打包大小 32M

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6GElWAb7WCAABHRH19ETg329.png)

单个文件体积，使用`webpack-bundle-tracker`插件分析

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6GEleAfQu1AAO7xeYLAM0081.png)

以下优化方案就是使用上述文件进行优化对比结果，有些结果不明显原因是不同的工程有些优化的点不一样，需要分析之后有针对性的进行优化。

## 优化


#### 升级webpack loader等工具

没有实际对比过，网上说看情况的。没有一个一定的标准。

#### happyPack  文件级并行

这个在时间上效果明显，一般工程里面已经配置了，这里就不做对比不使用的对比了，在工程中改起来还是比较麻烦的。

####  特定loader优化
> - 在开发过程中跳过某些 loader 的执行。特别是如果您使用的是现代浏览器，您可以完全跳过 babel-loader。
> - 对于特定 loader 应用 include 或 exclude 规则。Webpack 默认遍历_node_modules_ 并对其中的文件执行 babel-loader，除非我们额外进行配置。
> - 使用 cache-loader 将花销较大的 loader（例如，图像处理）的结果缓存到磁盘。
> - 使用 thread-loader 并行执行一些花销较大的 loader。鉴于 worker 在 Node 中存在一些开销，我们仅仅在并行任务较为繁重时才使用 thread-loader。
> - 缓存loader的执行结果(cacheDirectory/cache-loader)

vue文件使用thread-loader，实测发现在此工程中效果不明显：

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6GEl6ABNZ6AAFAZcJgOxU622.png)

使用cache-loader，发现在此工程中效果不明显：

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6GElaAXh2XAAFx1vgdgwY817.png)

#### 低层级优化
> 特定的低层级优化可能很有用，其中的关键就是让 Webpack 做更少的工作。在前面几章其实你已经实现了其中几个，这里我们较为完整地列举一下：
> 
> - 考虑在开发期间使用更快的源映射变体或跳过它们。如果您不以任何方式处理代码，则可以跳过源代码。
> - 在开发过程中使用 @babel/preset-env 代替源映射，以便在现代浏览器减少特定的语法转换，并使代码更易读，更舒适。
> - 在开发过程中跳过 polyfill。将诸如 @babel/polyfill 之类的包附加到应用程序的开发版本会增加开销。
> - 禁用开发期间不需要的应用程序部分。编译您正在处理的一小部分可能是一个有效的想法，因为您可以减少打包尺寸。
> - 减少基于 Node 的 polyfill 或者完全禁用它们。例如，一个包使用了 Node process，这样你的包就会变得很大。要禁用它，请设置 node.process 为false。要完全禁用它们，可以将 node 直接设置为 false。请参阅webpack文档查看相关的默认值。
> - 将不怎么变动的包制作成动态链接库（DLL）以避免不必要的执行过程。在官方的 WebPack 案例文章中谈到了这一点，同时 Rob Knight’s blog post 进一步解释了这种思想。autodll-webpack-plugin 可以自动制作动态链接库。

#### 特定插件优化
> - 可以使用 hard-source-webpack-plugin这样的插件来利用缓存，以避免不必要的工作。
> - 在开发过程中使用功能相同但更轻量的插件替代品。我们可以使用 HtmlPlugin 替换 HtmlWebpackPlugin。

#### splitChunks
因为之前是多页打包，每个页面都是相对独立的资源，体积会比较大。使用chunks之后，效果十分明显。

体积由 32M变为3.9M，文件也发生了变化。

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6GEmGAdrVVAAPDXVG_KpA089.png)

打包时间上也有很明显的变化。由43s变成17s

![](https://img.xiaao.xin/image/M00/00/01/L2Kexl6GEmCAHKIkAAHukxYkCsg985.png)


参考：
- [让你的Webpack起飞—考拉会员后台Webpack优化实战](https://zhuanlan.zhihu.com/p/42465502)
- [webpack小书](https://www.timsrc.com/article/30/build-analysis)