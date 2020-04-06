## 块级元素  VS 行内元素/内联元素

**块级元素block**

* 总是独占一行，表现为另起一行开始，而且其后的元素也必须另起一行显示;

* 宽度(width)、高度(height)、内边距(padding)和外边距(margin)都可控制;

* 会忽略vertical-align属性。

**行内元素/内联元素**

* 和相邻的内联元素在同一行;

* 宽度(width)、高度(height)、内边距的top/bottom(padding-top/padding-bottom)和外边距的top/bottom(margin-top/margin-bottom)都不可改变，就是里面文字或图片的大小;

* 内联元素一旦浮动，就会自动变为块级元素，并且拥有块级元素的所有属性

* 可以设置vertical-align属性

_一般来讲，我们可以将任何块级元素放入嵌套在一个块级元素中，也可以将任何内联元素嵌套在块级元素中或者将内联元素嵌套在内联元素中，但是不能将块级元素放在内联元素中，有一个例外的元素是_`<a>`_，可以将任何元素放置在_`<a>`_元素中。_

**块级元素**

address , blockquote , center , dir , div , dl , fieldset , form , h1 , h2 , h3 , h4 , h5 , h6 , hr , isindex , menu , noframes , noscript , ol , p , pre , table , ul , li

**内联元素/行内元素**

a , abbr , acronym , b , bdo , big , br , cite , code , dfn , em , font , i , img , input , kbd , label , q , s , samp , select , small , span , strike , strong , sub , sup ,  textarea , tt , u , var

**替换元素/可变元素（根据上下文关系确定该元素是块元素还是内联元素）**

applet ,button ,del ,iframe , ins ,map ,object , script


## css属性继承性
#### 可继承
font相关 color line-height text-align text-decoration、text-transform、direction

#### 不可继承
display、margin、border、padding、background、height、min-height、max-height、width、min-width、max-width、overflow、position、left、right、top、bottom、z-index、float、clear、table-layout、vertical-align、page-break-after、page-bread-before和unicode-bidi


## CSS3新增属性汇总

* 1、box-shadow（阴影效果）
* 2、border-color（为边框设置多种颜色）
* 3、border-image（图片边框）
* 4、text-shadow（文本阴影）
* 5、text-overflow（文本截断）
* 6、word-wrap（自动换行）
* 7、border-radius（圆角边框）
* 8、opacity（透明度）
* 9、box-sizing（控制盒模型的组成模式）
* 10、resize（元素缩放）
* 11、outline（外边框）
* 12、background-size（指定背景图片尺寸）
* 13、background-origin（指定背景图片从哪里开始显示）
* 14、background-clip（指定背景图片从什么位置开始裁剪）
* 15、background（为一个元素指定多个背景）
* 16、hsl（通过色调、饱和度、亮度来指定颜色颜色值）
* 17、hsla（在hsl的基础上增加透明度设置）
* 18、rgba（基于rgb设置颜色，a设置透明度
