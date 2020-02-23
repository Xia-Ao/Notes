ng-directive指令

ng的指令非常的多，具体的可以去看API，中文的也可以，这边就列出个人觉得没用过的，经常出错的，需要注意的一些指令。

# `ngNonbindable`

**ng-non-bindable**指令用于告诉 AngularJS 当前的 HTML 元素或其子元素不需要编译。

# `ngBindhtml`

通一个安全的方式将内容绑定到 HTML 元素上，直接使用的话会报一个Attempting to use an unsafe value in a safe context的安全错误，使用的时候用$sce.trustAsHtml\(\) 将html内容放进去。

# `ngBindtemplate`

用于告诉 AngularJS 将给定表达式的值替换 HTML 元素的内容，当你想在 **HTML 元素上绑定多个表达式**时可以使用`ng-bind-template`指令

# `ngBlur`

当输入框失去焦点\(onblur\)时执行表达式。

注意：**ng-blur**指令不会覆盖原生的 onblur 事件， 如果触发该事件，**ng-blur**表达式与原生的 onblur 事件都会执行。

# `ngFocus`

**ng-focus**指令用于告诉 AngularJS 在 HTML 元素获取焦点时需要执行的操作。

**ng-focus**指令不会覆盖元素的原始 onfocus 事件, 事件触发时，**ng-focus**表达式与原始的 onfocus 事件将都会执行。

# `ngChange`

**ng-change**指令需要搭配`ng-model`指令使用。

**ng-change**事件在值的每次改变时触发，它不需要等待一个完成的修改过程，或等待失去焦点的动作。

**ng-change**事件只针对输入框值的真实修改，而不是通过 JavaScript 来修改

# `ngChecked`

**ng-checked**指令用于设置复选框\(checkbox\)或单选按钮\(radio\)的 checked 属性

# `ngClass`

`ng-class`指令的值可以是字符串，对象，或一个数组。

如果是字符串，多个类名使用空格分隔。

如果是对象，需要使用** key-value **对，key 是一个布尔值，value 为你想要添加的类名。只有在 key 为 true 时类才会被添加。

如果是数组，可以由字符串或对象组合组成，数组的元素可以是字符串或对象。

# `ngClasseven`

**ng-class-even**指令用于为 HTML 元素动态的绑定一个或多个 CSS 类，但只作用于偶数行。

**ng-class-even**指令需要与**ng-repeat**指令搭配使用。

**ng-class-even**指令建议用在表格的样式渲染中，但是所有HTML元素都是支持的。

# `ngClassodd`

同理，只作用于奇数行

# `ngClick`

# `ngCloak`

AngularJS 应用在加载时，文档可能会由于AngularJS 代码未加载完而出现显示 AngularJS 代码，进而会有闪烁的效果，**ng-cloak**指令是为了防止该问题的发生，可能我的测试方法有问题，没太看出来效果。

# `ngController`

# `ngCopy`

**ng-copy**指令用于告诉 AngularJS 在 HTML 元素文本被拷贝时要执行的操作。

**ng-copy**指令不会覆盖元素的原始 oncopy 事件, 事件触发时，**ng-copy**表达式与原始的 oncopy 事件将都会执行。

# `ngCsp`

设置**ng-csp**指令为**no-unsafe-eval**, 将阻止 AngularJS 执行 eval 函数，但允许注入内联样式。

设置**ng-csp**指令为**no-inline-style**, 将阻止 AngularJS 注入内联样式，但允许 执行 eval 函数。

包括eval\( \)函数，用到的时候不多.

# `ngDblclick`

**ng-dblclick**指令用于告诉 AngularJS 在鼠标鼠标 HTML 元素时需要执行的操作。

**ng-dblclick**指令不会覆盖元素的原始 ondblclick 事件, 鼠标双击时，**ng-dblclick**表达式与原始的 ondblclick 事件将都会执行.

# `ngDisabled`

**ng-disabled**

指令设置表单输入字段的 disabled 属性\(input, select, 或 textarea\)。如果`ng-disabled`中的表达式返回 true 则表单字段将被禁用。

# `ngHide`

# `ngShowng-show`

指令在表达式为 true 时显示指定的 HTML 元素，否则隐藏指定的 HTML 元素。

# `ngIf`

**ng-if**指令用于在表达式为 false 时移除 HTML 元素。如果 if 语句执行的结果为 true，会添加移除元素，并显示。

**ng-if**指令不同于 ng-hide， ng-hide 隐藏元素，而**ng-if**是从 DOM 中移除元素。

# `ngOpen`

**ng-open**指令用于设置 details 列表的 open 属性。如果**ng-open**的表达式返回 true 则 details 列表是可见的。

# `ngInclude`

**ng-include**指令用于包含外部的 HTML 文件。包含的内容将作为指定元素的子节点。

`ng-include`属性的值可以是一个表达式，返回一个文件名。默认情况下，包含的文件需要包含在同一个域名下。

# `ngInit`

**ng-init**指令执行给定的表达式。

**ng-init**指令添加一些不必要的逻辑到 scope 中，建议你可以在控制器中[**ng-controller**](http://www.angularjs.net.cn/api/ng-ng-controller.html)指令执行它 。

# `ngKeydown   ngKeypress  ngKeyup`

要把$event传过去，一般都是要判断按了哪个按键的。

#### keydown，keypress，keydown三者区别

#### 引发事件的按键

非字符键不会引发 KeyPress 事件，但非字符键却可以引发 KeyDown 和 KeyUp 事件。

#### 事件引发的时间

KeyDown 和 KeyPress 事件在按下键时发生，KeyUp 事件在释放键时发生。

#### 事件发生的顺序

KeyDown -&gt; KeyPress -&gt; KeyUp。如果按一个键很久才松开，发生的事件为：KeyDown -&gt; KeyPress -&gt; KeyDown -&gt; KeyPress -&gt; KeyDown -&gt; KeyPress -&gt; ... -&gt; KeyUp。

* KeyDown触发后，不一定触发KeyUp，当KeyDown 按下后，拖动鼠标，那么将不会触发KeyUp事件。

* KeyPress主要用来捕获数字\(注意：包括Shift+数字的符号\)、字母（注意：包括大小写）、小键盘等除了F1-12、SHIFT、Alt、Ctrl、Insert、Home、PgUp、Delete、End、PgDn、ScrollLock、Pause、NumLock、{菜单键}、{开始键}和方向键外的ANSI字符。

* KeyDown 和KeyUp 通常可以捕获键盘除了PrScrn所有按键\(这里不讨论特殊键盘的特殊键）。

* KeyPress 只能捕获单个字符。

* KeyDown 和KeyUp 可以捕获组合键。

* KeyPress 可以捕获单个字符的大小写。

* KeyDown和KeyUp 对于单个字符捕获的KeyValue 都是一个值，也就是不能判断单个字符的大小写。

* KeyPress 不区分小键盘和主键盘的数字字符。

* KeyDown 和KeyUp 区分小键盘和主键盘的数字字符。

* 其中PrScrn 按键KeyPress、KeyDown和KeyUp 都不能捕获。

# `ngCut`

**ng-cut**指令用于告诉 AngularJS 在剪切 HTML 元素的文本时需要执行的操作。

**ng-cut**指令指令不会覆盖元素的原始 oncut 事件, 事件触发时，**ng-cut**表达式与原始的 oncut 事件将都会执行。

# `ngPaste`

**ng-paste**指令用于告诉 AngularJS 文本在 HTML 元素上粘贴时需要执行的操作。

**ng-paste**指令不会覆盖元素的原生 onpaste 事件, 事件触发时，**ng-paste**表达式与原生的 onpaste 事件将都会执行。

# `ngList`

**ng-list**指令将字符串转换为数组，并使用逗号分隔。

**ng-list**指令还有另外一种转换方式，如果你有字符串数组希望在输入框中显示，你可以在 input 上使用**ng-list**指令。

`ng-list`属性值定义了分隔符。

# `ngModel`

# `ngModeloptions`

**ng-model-options**指令绑定了 HTML 表单元素到 scope 变量中

你可以指定绑定数据触发的时间，或者指定等待多少毫秒，参数设置可以参考以下说明。不太理解

# `ngMousedown`

鼠标按下，左右中间按下都会触发

# `ngMouseup`

鼠标松开，左右中间按下都会触发

# `ngMouseenter`

鼠标进入

# `ngMouseleave`

鼠标离开

# `ngMousemove`

鼠标移动

# `ngOptions  ngSelected`

**ng-options**指令用于使用 &lt;options&gt; 填充 &lt;select&gt; 元素的选项。

**ng-options**指令使用数组来填充下拉列表，多数情况下与**ng-repeat**指令一起使用。其实就是options的angular用法，

# `ngReadonly`

**ng-readonly**指令用于设置表单域\(input 或 textarea\) 的 readonly 属性。

# `ngRepeat`

| $index | `number` | 当前索引。 |
| :--- | :--- | :--- |
| $first | `boolean` | 当循环的对象存在第一项时为true。 |
| $middle | `boolean` | 当循环的对象存在中间项时为true。 |
| $last | `boolean` | 当循环对象存在最后一项时为true。 |
| $even | `boolean` | 循环的对象在当前位置的"$index"\(索引\)是偶数则为true，否则为false。 |
| $odd | `boolean` | 循环的对象在当前位置的"$index"\(索引\)是奇数则为true，否则为false。 |

# `ngSrc`

**ng-src**指令覆盖了 &lt;img&gt; 元素的 src 属性。如果你使用了 AngularJS 代码设置图片地址，请使用**ng-src**指令替代`src`属性。

**ng-src**指令确保的 AngularJS 代码执行前不显示图片。

# `ngStyle`

**ng-style**指令为 HTML 元素添加 style 属性。

**ng-style**属性值必须是对象，表达式返回的也是对象。对象由 CSS 属性和值注册，即 key=&gt;value 对。

# `ngSwitch`

**ng-switch**指令根据表达式显示或隐藏对应的部分。

对应的子元素使用**ng-switch-when**指令，如果匹配选中选择显示，其他为匹配的则移除。

你可以通过使用**ng-switch-default**指令设置默认选项，如果都没有匹配的情况，默认选项会显示。

# `ngValue`

**ng-value**指令用于设置 input 或 select 元素的 value 属性。



