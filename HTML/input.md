# &lt;input&gt;

input标签平时使用的频率非常高，但是对于其他属性并不是很了解，以为是那么回事，到用的时候就发现不是那么回事。

## type

不用说，这个属性肯定要用到。

高频`type`属性值

* **text **——默认。定义一个单行的文本字段（默认宽度为 20 个字符）。
* **button**—— 定义可点击的按钮（通常与 JavaScript 一起使用来启动脚本）。
* **checkbox**——定义复选框。
* **password** ——定义密码字段（字段中的字符会被遮蔽）。
* **radio** ——定义单选按钮。
* **submit **——定义提交按钮。
关于submit的值，点击执行了click事件，提交form表。使用type=button + JS效果是一样。

* **file** ——定义文件选择字段和 "浏览..." 按钮，供文件上传，可以配合accept属性使用。
* **email** ——定义用于 e-mail 地址的字段，当提交表单时会自动对 email 字段的值进行验证，检查@以及 地址。

HTML5新定义

* **colorNew** ——定义拾色器。

```html
选择你喜欢的颜色: <input type="color" name="favcolor"><br>
```

value值为颜色的6位十六进制表示法的值

* **date** ——定义 date 控件（包括年、月、日，不包括时间）,就相当于一个时间插件，功能很强大。
* **datetime** ——定义 date 和 time 控件（包括年、月、日、时、分、秒、几分之一秒，基于 UTC 时区）。
* **datetime-local** ——定义 date 和 time 控件（包括年、月、日、时、分、秒、几分之一秒，不带时区）。
* **month** ——定义 month 和 year 控件（不带时区）。

```html
生日: <input type="date" name="bday">
```

![](/assets/type1.png)

* **hidden** ——定义隐藏输入字段。
* **image**——定义图像作为提交按钮。
* **number** ——定义用于输入数字的字段。
* **range** ——定义用于精确值不重要的输入数字的控件（比如 slider 控件）。
* **reset **——定义重置按钮（重置所有的表单值为默认值）。
* **search** ——定义用于输入搜索字符串的文本字段。
* **tel**——定义用于输入电话号码的字段。
* **time** ——定义用于输入时间的控件（不带时区）。
* **url** ——定义用于输入 URL 的字段。
* **week**——定义 week 和 year 控件（不带时区）。

## value
value 属性规定 `<input>` 元素的值。
value 属性对于不同 input 类型，用法也不同：

对于 "button"、"reset"、"submit" 类型 - 定义按钮上的文本
对于 "text"、"password"、"hidden" 类型 - 定义输入字段的初始（默认）值
对于 "checkbox"、"radio"、"image" 类型 - 定义与 input 元素相关的值，当提交表单时该值会发送到表单的 action URL。
**注意**：value 属性对于 `<input type="checkbox">` 和 `<input type="radio">` 是必需的。

**注意**：value 属性不适用于 `<input type="file">`。

## placeholder
placeholder 属性规定可描述输入字段预期值的简短的提示信息（比如：一个样本值或者预期格式的短描述）。
该提示会在用户输入值之前显示在输入字段中。

**注意**：placeholder 属性适用于下面的 input 类型：text、search、url、tel、email 和 password。
## pattern 
pattern 属性规定用于验证 `<input> `元素的值的正则表达式。


```html
<form action="demo-form.php">
  Country code: <input type="text" name="country_code" pattern="[A-Za-z]{3}" title="Three letter country code">
  <input type="submit">
</form>
```

**注意**：pattern 属性适用于下面的 input 类型：text、search、url、tel、email 和 password。
## alt
alt 属性只能与 <input type="image"> 配合使用。

## checked
checked 是一个布尔值。
checked 属性适用于 `<input type="checkbox"> `和` <input type="radio">`。
checked 属性也可以在页面加载后，通过 JavaScript 代码进行设置。

## autocomplete
autocomplete 属性规定输入字段是否应该启用自动完成功能。

自动完成允许浏览器预测对字段的输入。当用户在字段开始键入时，浏览器基于之前键入过的值，应该显示出在字段中填写的选项。
