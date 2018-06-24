
# CSS揭秘中的高级操作

### 投影
这个其实一般的需求都可以满足，在CSS揭秘一书中讲到两种用法，

单侧投影：就是利用box-shadow属性的五个值，其中第三个值表示模糊半径，第四个值表示内外延伸，复制向内延伸，正值向外延伸，，通过配合这四个值实现单侧投影。

不规则投影：box-shadow经常和border-radius一起使用，但是border-radius会对一些伪元素或半透明的装饰不起作用，这样box-shadow也就不起作用了，这怒地这种情况，可以使用添加filter滤镜。


### 染色效果
其实就是使用滤镜，关于滤镜，以前接触比较少，

```
filter: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url();
```
一个典型的应用场景：使用hover属性移入移出的时候，改变图片的颜色，方案一是使用两张图片，作用不同的背景图，问题也显而易见，方案二是使用滤镜，改变图片的色调，滤镜有很多种方法，参考： [http://www.runoob.com/cssref/css3-pr-filter.html](http://www.runoob.com/cssref/css3-pr-filter.html)，CSS揭秘中一个 [例子](http://dabblet.com/gist/0dced2852818c0f555e9),使用混合模式过滤，其他模式的过程还可以在过渡过程中添加动画。

### 毛玻璃效果
这个效果非常有用，在demo中有 [重现](https://github.com/Xia-Ao/FrontendDemo/blob/master/30-CSS/11-background/%E6%AF%9B%E7%8E%BB%E7%92%83%E6%95%88%E6%9E%9C.html) ， [线上demo](http://dabblet.com/gist/d9f243ddd7dbffa341a4)

基本原理使用一个伪元素before重新覆盖背景，然后再对背景使用blur处理，再对外毛边使用overflow隐藏，内毛边使用margin负值隐藏，实现毛玻璃效果，注意这里body和before的背景图要设置为cover和fixed，如果不死是fixed要更麻烦一点。

### 折角效果
在CSS中 之前专门用了一篇讲折角的实现，主要使用的背景的纯色渐变效果，在配上background-position实现多个角的效果。

### 自定义复选框
在使用表单的时候，用到单选框，复选框，如果不用插件的话，可能只能使用自带的复选框样式，使用CSS的方法解决这个问题，当 <label> 元素与复选框关联之后， 也可以起到触发开关的作用，考虑将之前input的内容隐藏掉，给label添加一个伪类样式，这样就可以实现自定义的复选框样式，这样的方法也可以适用于一个开关按钮。但是要注意一个问题，影藏input不能使用display:none,这样会它从键盘 tab 键切换焦点的队列中完全删除，使用`position：absolute, clip：reat(0,0,0,0)`隐藏。CSS揭秘 [代码地址](http://dabblet.com/gist/fa5c622180b232043891)


