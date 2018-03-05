# CSS选择器

标签（空格分隔）： css选择器

---

CSS的选择器，我想大家并不会陌生吧，因为天天在使用，但对于CSS3的选择器，要运用的灵活到位，我想对很多朋友还是一定的难度，特别是CSS3中的:nth选择器。那么从现在开始我们先丢开他们版本的区别，从头一起来看看CSS选择器的运用。著作权归作者所有。

下文是我基于图解CSS3和网上相关博文整理处理关于`CSS3选择器`的相关总结！

![](http://images0.cnblogs.com/blog2015/790963/201507/282324267509975.jpg)



### 1、基本选择器 ###

| 选择器        | 类型           |功能描述  |
|:-------------:|:-------------:| -----|
| *     | 通配选择器 | 选择文档中所以HTML元素 |
| E     |  元素选择器     |   选择指定类型的HTML元素 |
| #id  | ID选择器      |   	选择指定ID属性值为“id”的任意类型元素  |
| .class |类选择器   |选择指定class属性值为“class”的任意类型的任意多个元素|
| selector1,selectorN   |  群组选择器  |  将每一个选择器匹配的元素集合并  |

####实例：
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>使用CSS3基本选择器</title>
	<style type="text/css">
		*{margin: 0;padding:0;}
		.clearfix:after,.clearfix:before{display:table;content:""}
		.clearfix:after{clear:both;overflow:hidden}
		.demo { width: 250px; border: 1px solid #ccc; padding: 10px;margin: 20px auto}  
		li {list-style:none outside none; float: left; height: 20px; line-height: 20px; width: 20px;border-radius: 10px; text-align: center; background: #f36; color: green; margin-right: 5px; }
		.demo *{background: orange}
		ul {background:grey}
		#first{background:lime;color:#000}
		#last {background:#000;color:lime}
		.item {background: green;color: #fff;font-weight:bold}
		.item.important {background:red;}
	</style>
</head>
<body>
	<ul class="clearfix demo">
		<li class="first" id="first">1</li>
		<li class="active">2</li>
		<li class="important item">3</li>
		<li class="important">4</li>
		<li class="item">5</li>
		<li>6</li>
		<li>7</li>
		<li>8</li>
		<li>9</li>
		<li class="last" id="last">10</li>
	</ul>
</body>
</html>
```
### 2、层次选择器 ###

####实例：
| 选择器        | 类型           |功能描述  |
|:-------------:|:-------------:| -----|
| E F     | 后代选择器 | 选择匹配的F元素，且匹配的F元素被包含在匹配的E元素内 |
| E>F     |  子选择器     |  选择匹配的F元素，且匹配的F元素所匹配的E元素的子元素|
| E+F  |相邻兄弟选择器      |   	选择匹配的F元素，且匹配的F元素紧位于匹配的E元素的后面 |
| E~F |通用选择器   |选择匹配的F元素，且位于匹配的E元素后的所有匹配的F元素|
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>使用CSS3层次选择器</title>
	<style type="text/css">
		*{margin: 0;padding:0;}
		body {width: 300px;margin: 0 auto;}
		div{margin:5px;padding:5px;border: 1px solid #ccc;}
		div div {background: orange;}
		body > div {background: green;}
		.active + div {background: black;}
		.active ~ div {background: red;}
	</style>
</head>
<body>
	<div  class="active">1</div><!-- 为了说明相邻兄弟选择器，在此处添加一个类名active -->
	<div>2</div>
	<div>3</div>
	<div>4
		<div>5</div>
		<div>6</div>
	</div>
	<div>7
		<div>8
			<div>9
				<div>10</div>
			</div>
		</div>
	</div>
</body>
</html>
```

### 3、动态伪类选择器

| 选择器 | 类型 | 功能描述 |
| :---: | :---: | --- |
| E:link | 链接伪类选择器 | 选择匹配的E元素，而且匹配元素被定义了超链接并未被访问过。常用于链接描点上 |
| E:visited | 链接伪类选择器 | 选择匹配的E元素，而且匹配元素被定义了超链接并已被访问过。常用于链接描点上 |
| E:active | 用户行为选择器 | 选择匹配的E元素，且匹配元素被激活。常用于链接描点和按钮上 |
| E:hover | 用户行为选择器 | 选择匹配的E元素，且用户鼠标停留在元素E上。IE6及以下浏览器仅支持a:hover |
| E:focus | 用户行为选择器 | 选择匹配的E元素，而且匹配元素获取焦点 |

#### 说明：

一般用于适用于在鼠标点击或者移动事件上，单独进行操作，实现特殊的效果！

#### 实例：

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>使用动态伪类选择器美化按钮</title>
    <style type="text/css">
        .download-info {
            text-align: center;
        }
        /*默认状态下的按钮效果*/
        .btn {
            background-color: #0074cc;
            *background-color: #0055cc;
            background-image: -ms-linear-gradient(top, #0088cc, #0055cc);
            background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0055cc));
            background-image: -webkit-linear-gradient(top, #0088cc, #0055cc);
            background-image: -o-linear-gradient(top, #0088cc, #0055cc);
            background-image: -moz-linear-gradient(top, #0088cc, #0055cc);
            background-image: linear-gradient(top, #0088cc, #0055cc);
            background-repeat: repeat-x;
            display: inline-block;
            *display: inline;
            border: 1px solid #cccccc;
            *border: 0;
            border-color: #ccc;
            border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
            border-radius: 6px;
            color: #ffffff;
            cursor: pointer;
            font-size: 20px;
            font-weight: normal;
            filter: progid:dximagetransform.microsoft.gradient(startColorstr='#0088cc', endColorstr='#0055cc', GradientType=0);
            filter: progid:dximagetransform.microsoft.gradient(enabled=false);
            line-height: normal;
            padding: 14px 24px;
            text-align: center;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            text-decoration: none;
            vertical-align: middle;
            *zoom: 1;
        }
        /*悬浮状态下按钮效果*/    
        .btn:hover {
            background-position: 0 -15px;
            background-color: #0055cc;
            *background-color: #004ab3;
            color: #ffffff;
            text-decoration: none;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
            -webkit-transition: background-position 0.1s linear;
            -moz-transition: background-position 0.1s linear;
            -ms-transition: background-position 0.1s linear;
            -o-transition: background-position 0.1s linear;
            transition: background-position 0.1s linear;
        }
        /*点击时按钮效果*/
        .btn:active {
            background-color: #0055cc;
            *background-color: #004ab3;
            background-color: #004099 \9;
            background-image: none;
            outline: 0;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
            color: rgba(255, 255, 255, 0.75);
        }
        /*获得焦点按钮效果*/
        .btn:focus {
            outline: thin dotted #333;
            outline: 5px auto -webkit-focus-ring-color;
            outline-offset: -2px;
        }
    </style>
</head>
<body>
    <div class="download-info">
        <a href="#" class="btn">View project on GitHub</a>
    </div>
</body>
</html>
```

### 4、目标伪类选择器 ###
| 选择器        | 类型           |功能描述  |
|:-------------:|:--:| -----|
|E:target|选择匹配E的所有元素，且匹配元素被相关URL指向||


####示例：
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>垂直手风琴</title>
	<style type="text/css">
.accordionMenu {
	background: #fff;
	color:#424242;
	font: 12px Arial, Verdana, sans-serif;
	margin:0 auto;
	padding: 10px;
	width: 500px;
}
.accordionMenu h2 {
	margin:5px 0;
	padding:0;
	position: relative;
}
.accordionMenu h2:before {
	border: 5px solid #fff;
	border-color: #fff transparent transparent;
	content:"";
	height: 0;
	position:absolute;
	right: 10px;
	top: 15px;
	width: 0;
} 
.accordionMenu h2 a {
	background: #8f8f8f;
	background: -moz-linear-gradient( top, #cecece, #8f8f8f); 
	background: -webkit-gradient(linear, left top, left bottom, from(#cecece), to(#8f8f8f)); 
	background: -webkit-linear-gradient( top, #cecece, #8f8f8f); 
	background: -o-linear-gradient( top, #cecece, #8f8f8f); 
	background: linear-gradient( top, #cecece, #8f8f8f); 
	border-radius: 5px;
	color:#424242;
	display: block;
	font-size: 13px;
	font-weight: normal;
	margin:0;
	padding:10px 10px;
	text-shadow: 2px 2px 2px #aeaeae;
	text-decoration:none;
} 
.accordionMenu :target h2 a,
.accordionMenu h2 a:focus,
.accordionMenu h2 a:hover,
.accordionMenu h2 a:active {
	background: #2288dd;
	background: -moz-linear-gradient( top, #6bb2ff, #2288dd);
	background: -webkit-gradient(linear, left top, left bottom, from(#6bb2ff), to(#2288dd));
	background: -webkit-linear-gradient( top, #6bb2ff, #2288dd);
	background: -o-linear-gradient( top, #6bb2ff, #2288dd);
	background: linear-gradient( top, #6bb2ff, #2288dd);
	color:#FFF;
}
.accordionMenu p {
	margin:0;
	height: 0;
	overflow: hidden;
	padding:0 10px;
	-moz-transition: height 0.5s ease-in;
	-webkit-transition: height 0.5s ease-in;
	-o-transition: height 0.5s ease-in;
	transition: height 0.5s ease-in;
}
.accordionMenu :target p {
	height:100px;
	overflow: auto;
}
.accordionMenu :target h2:before {
	border-color: transparent transparent transparent #fff;
}
​	</style>
</head>
<body>
	<div class="accordionMenu">
    <div class="menuSection" id="brand">
			<h2><a href="#brand">Brand</a></h2>
			<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="menuSection" id="promotion">
      <h2><a href="#promotion">Promotion</a></h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div class="menuSection" id="event">
      <h2><a href="#event">Event</a></h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
  </div>
​</body>
</html>
```


### 5、语言伪类选择器 ###

语言伪类选择器是元素编码匹配元素，不能由CSS指定！
####示例：
```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>语言伪类选择器运用</title>
	<style type="text/css">
		:lang(en) {
			quotes:'"' '"';
		}
		:lang(en) q {background: red;}
	</style>
</head>
<body>
<p>WWF's goal is to: 
<q cite="http://www.wwf.org">
build a future where people live in harmony with nature
</q> we hope they succeed.</p>
</body>
</html>
```

```html
<!DOCTYPE HTML>
<html lang="fr">
<head>
	<meta charset="UTF-8">
	<title></title>
	<style type="text/css">
		:lang(fr) {
			quotes:'«' '»';
		}
		:lang(fr) q {background: green;}
	</style>
</head>
<body>
<p>WWF's goal is to: 
<q cite="http://www.wwf.org">
build a future where people live in harmony with nature
</q> we hope they succeed.</p>
</body>
</html>
```
5、语言伪类选择器
语言伪类选择器是元素编码匹配元素，不能由CSS指定！
示例：
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>语言伪类选择器运用</title>
    <style type="text/css">
        :lang(en) {
            quotes:'"' '"';
        }
        :lang(en) q {background: red;}
    </style>
</head>
<body>
<p>WWF's goal is to: 
<q cite="http://www.wwf.org">
build a future where people live in harmony with nature
</q> we hope they succeed.</p>
</body>
</html>
<!DOCTYPE HTML>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title></title>
    <style type="text/css">
        :lang(fr) {
            quotes:'«' '»';
        }
        :lang(fr) q {background: green;}
    </style>
</head>
<body>
<p>WWF's goal is to: 
<q cite="http://www.wwf.org">
build a future where people live in harmony with nature
</q> we hope they succeed.</p>
</body>
</html>

### 6、UI元素状态伪类选择器 ###
| 选择器        | 类型           |功能描述  |
|:-------------:|:-------------:| -----|
|:checked|选中状态伪类选择器|匹配选中的复选按钮或者单选按钮表单元素|
|E:enabled|启用状态伪类选择器|匹配所有启用的表单元素|
|E:disabled|不可用状态伪类选择器|匹配所有禁用的表单元素|

####示例：
```html

<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>UI元素状态伪类选择器使用</title>
	<style type="text/css">
form {
  margin: 0 0 18px;
}

fieldset {
  padding: 0;
  margin: 0;
  border: 0;
}

legend {
  display: block;
  width: 100%;
  padding: 0;
  margin-bottom: 27px;
  font-size: 19.5px;
  line-height: 36px;
  color: #333333;
  border: 0;
  border-bottom: 1px solid #e5e5e5;
}

legend small {
  font-size: 13.5px;
  color: #999999;
}

label,
input,
button,
select,
textarea {
  font-size: 13px;
  font-weight: normal;
  line-height: 18px;
}

input,
button,
select,
textarea {
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
}

label {
  display: block;
  margin-bottom: 5px;
}

select,
textarea,
input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="datetime-local"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"],
.uneditable-input {
  display: inline-block;
  height: 18px;
  padding: 4px;
  margin-bottom: 9px;
  font-size: 13px;
  line-height: 18px;
  color: #555555;
}

input,
textarea {
  width: 210px;
}

textarea {
  height: auto;
}

textarea,
input[type="text"],
input[type="password"],
input[type="datetime"],
input[type="datetime-local"],
input[type="date"],
input[type="month"],
input[type="time"],
input[type="week"],
input[type="number"],
input[type="email"],
input[type="url"],
input[type="search"],
input[type="tel"],
input[type="color"],
.uneditable-input {
  background-color: #ffffff;
  border: 1px solid #cccccc;
  border-radius: 3px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;
     -moz-transition: border linear 0.2s, box-shadow linear 0.2s;
      -ms-transition: border linear 0.2s, box-shadow linear 0.2s;
       -o-transition: border linear 0.2s, box-shadow linear 0.2s;
          transition: border linear 0.2s, box-shadow linear 0.2s;
}

/*表单元素获得焦点效果*/
textarea:focus,
input[type="text"]:focus,
input[type="password"]:focus,
input[type="datetime"]:focus,
input[type="datetime-local"]:focus,
input[type="date"]:focus,
input[type="month"]:focus,
input[type="time"]:focus,
input[type="week"]:focus,
input[type="number"]:focus,
input[type="email"]:focus,
input[type="url"]:focus,
input[type="search"]:focus,
input[type="tel"]:focus,
input[type="color"]:focus,
.uneditable-input:focus {
  border-color: rgba(82, 168, 236, 0.8);
  outline: 0;
  outline: thin dotted \9;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(82, 168, 236, 0.6);
}

input[type="radio"],
input[type="checkbox"] {
  margin: 3px 0;
  *margin-top: 0;
  line-height: normal;
  cursor: pointer;
}

input[type="submit"],
input[type="reset"],
input[type="button"],
input[type="radio"],
input[type="checkbox"] {
  width: auto;
}


select,
input[type="file"] {
  height: 28px;
  *margin-top: 4px;
  line-height: 28px;
}

select {
  width: 220px;
  border: 1px solid #bbb;
}

select[multiple],
select[size] {
  height: auto;
}
/*表单中下拉选择框、文件控件、单选按钮、复选按钮得到焦点时效果*/
select:focus,
input[type="file"]:focus,
input[type="radio"]:focus,
input[type="checkbox"]:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}

.radio,
.checkbox {
  min-height: 18px;
  padding-left: 18px;
}

.radio input[type="radio"],
.checkbox input[type="checkbox"] {
  float: left;
  margin-left: -18px;
}

.controls > .radio:first-child,
.controls > .checkbox:first-child {
  padding-top: 5px;
}

.radio.inline,
.checkbox.inline {
  display: inline-block;
  padding-top: 5px;
  margin-bottom: 0;
  vertical-align: middle;
}

.radio.inline + .radio.inline,
.checkbox.inline + .checkbox.inline {
  margin-left: 10px;
}


input,
textarea,
.uneditable-input {
  margin-left: 0;
}

/*禁用的input、select、textarea表单元素效果*/
input[disabled],/*等效于input:disabled*/
select[disabled],/*等效于select:disabled*/
textarea[disabled],/*等效于textarea:disabled*/
input[readonly],
select[readonly],
textarea[readonly] {
  cursor: not-allowed;
  background-color: #eeeeee;
  border-color: #ddd;
}
/*禁用的单选按钮和复选按钮效果*/
input[type="radio"][disabled],/*等效于input[type="radio"]:disabled*/
input[type="checkbox"][disabled],/*等效于input[type="checkbox"]:disabled*/
input[type="radio"][readonly],
input[type="checkbox"][readonly] {
  background-color: transparent;
}

.control-group.warning > label,
.control-group.warning .help-block,
.control-group.warning .help-inline {
  color: #c09853;
}
/*表单警告状态下效果*/
.control-group.warning .checkbox,
.control-group.warning .radio,
.control-group.warning input,
.control-group.warning select,
.control-group.warning textarea {
  color: #c09853;
  border-color: #c09853;
}
/*表单警告状态下并获得焦点下效果*/
.control-group.warning .checkbox:focus,
.control-group.warning .radio:focus,
.control-group.warning input:focus,
.control-group.warning select:focus,
.control-group.warning textarea:focus {
  border-color: #a47e3c;
  box-shadow: 0 0 6px #dbc59e;
}

.control-group.error > label,
.control-group.error .help-block,
.control-group.error .help-inline {
  color: #b94a48;
}
/*表单错误状态下效果*/
.control-group.error .checkbox,
.control-group.error .radio,
.control-group.error input,
.control-group.error select,
.control-group.error textarea {
  color: #b94a48;
  border-color: #b94a48;
}
/*表单错误状态并获取焦点时效果*/
.control-group.error .checkbox:focus,
.control-group.error .radio:focus,
.control-group.error input:focus,
.control-group.error select:focus,
.control-group.error textarea:focus {
  border-color: #953b39;
  box-shadow: 0 0 6px #d59392;
}

.control-group.success > label,
.control-group.success .help-block,
.control-group.success .help-inline {
  color: #468847;
}
/*表单成功状态下效果*/
.control-group.success .checkbox,
.control-group.success .radio,
.control-group.success input,
.control-group.success select,
.control-group.success textarea {
  color: #468847;
  border-color: #468847;
}
/*表单成功状态于并获得焦点下效果*/
.control-group.success .checkbox:focus,
.control-group.success .radio:focus,
.control-group.success input:focus,
.control-group.success select:focus,
.control-group.success textarea:focus {
  border-color: #356635;
  box-shadow: 0 0 6px #7aba7b;
}

input:focus:required:invalid,
textarea:focus:required:invalid,
select:focus:required:invalid {
  color: #b94a48;
  border-color: #ee5f5b;
}

input:focus:required:invalid:focus,
textarea:focus:required:invalid:focus,
select:focus:required:invalid:focus {
  border-color: #e9322d;
  box-shadow: 0 0 6px #f8b9b7;
}

.form-actions {
  padding: 17px 20px 18px;
  margin-top: 18px;
  margin-bottom: 18px;
  background-color: #f5f5f5;
  border-top: 1px solid #e5e5e5;
  *zoom: 1;
}

.form-actions:before,
.form-actions:after {
  display: table;
  content: "";
}

.form-actions:after {
  clear: both;
}

.uneditable-input {
  overflow: hidden;
  white-space: nowrap;
  cursor: not-allowed;
  background-color: #ffffff;
  border-color: #eee;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.025);
}

:-moz-placeholder {
  color: #999999;
}

:-ms-input-placeholder {
  color: #999999;
}

::-webkit-input-placeholder {
  color: #999999;
}

.help-block,
.help-inline {
  color: #555555;
}

.help-block {
  display: block;
  margin-bottom: 9px;
}

.help-inline {
  display: inline-block;
  *display: inline;
  padding-left: 5px;
  vertical-align: middle;
  *zoom: 1;
}

.form-horizontal input,
.form-horizontal textarea,
.form-horizontal select,
.form-horizontal .help-inline {
  display: inline-block;
  *display: inline;
  margin-bottom: 0;
  *zoom: 1;
}
.form-horizontal .hide {
  display: none;
}


.control-group {
  margin-bottom: 9px;
}

legend + .control-group {
  margin-top: 18px;
  -webkit-margin-top-collapse: separate;
}

.form-horizontal .control-group {
  margin-bottom: 18px;
  *zoom: 1;
}

.form-horizontal .control-group:before,
.form-horizontal .control-group:after {
  display: table;
  content: "";
}

.form-horizontal .control-group:after {
  clear: both;
}

.form-horizontal .control-label {
  float: left;
  width: 140px;
  padding-top: 5px;
  text-align: right;
}

.form-horizontal .controls {
  *display: inline-block;
  *padding-left: 20px;
  margin-left: 160px;
  *margin-left: 0;
}

.form-horizontal .controls:first-child {
  *padding-left: 160px;
}

.form-horizontal .help-block {
  margin-top: 9px;
  margin-bottom: 0;
}

.form-horizontal .form-actions {
  padding-left: 160px;
}


.btn {
  display: inline-block;
  *display: inline;
  padding: 4px 10px 4px;
  margin-bottom: 0;
  *margin-left: .3em;
  font-size: 13px;
  line-height: 18px;
  *line-height: 20px;
  color: #333333;
  text-align: center;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  vertical-align: middle;
  cursor: pointer;
  background-color: #f5f5f5;
  *background-color: #e6e6e6;
  background-image: -ms-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#ffffff), to(#e6e6e6));
  background-image: -webkit-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -o-linear-gradient(top, #ffffff, #e6e6e6);
  background-image: linear-gradient(top, #ffffff, #e6e6e6);
  background-image: -moz-linear-gradient(top, #ffffff, #e6e6e6);
  background-repeat: repeat-x;
  border: 1px solid #cccccc;
  *border: 0;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  border-color: #e6e6e6 #e6e6e6 #bfbfbf;
  border-bottom-color: #b3b3b3;
  border-radius: 4px;
  filter: progid:dximagetransform.microsoft.gradient(startColorstr='#ffffff', endColorstr='#e6e6e6', GradientType=0);
  filter: progid:dximagetransform.microsoft.gradient(enabled=false);
  *zoom: 1;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn:hover,
.btn:active,
.btn.active,
.btn.disabled,/*按钮禁用下效果，等效于.btn:disabled*/
.btn[disabled] {
  background-color: #e6e6e6;
  *background-color: #d9d9d9;
}

.btn:active,
.btn.active {
  background-color: #cccccc \9;
}

.btn:first-child {
  *margin-left: 0;
}

.btn:hover {
  color: #333333;
  text-decoration: none;
  background-color: #e6e6e6;
  *background-color: #d9d9d9;
  background-position: 0 -15px;
  -webkit-transition: background-position 0.1s linear;
     -moz-transition: background-position 0.1s linear;
      -ms-transition: background-position 0.1s linear;
       -o-transition: background-position 0.1s linear;
          transition: background-position 0.1s linear;
}

.btn:focus {
  outline: thin dotted #333;
  outline: 5px auto -webkit-focus-ring-color;
  outline-offset: -2px;
}

.btn.active,
.btn:active {
  background-color: #e6e6e6;
  background-color: #d9d9d9 \9;
  background-image: none;
  outline: 0;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.05);
}
/*表单按钮禁用状态下效果*/
.btn.disabled,/*等效于.btn:disabled*/
.btn[disabled] {
  cursor: default;
  background-color: #e6e6e6;
  background-image: none;
  opacity: 0.65;
  filter: alpha(opacity=65);
  box-shadow: none;
}
.btn-primary,
.btn-primary:hover {
  color: #ffffff;
  text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
}

.btn-primary.active {
  color: rgba(255, 255, 255, 0.75);
}

.btn {
  border-color: #ccc;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
}

.btn-primary {
  background-color: #0074cc;
  *background-color: #0055cc;
  background-image: -ms-linear-gradient(top, #0088cc, #0055cc);
  background-image: -webkit-gradient(linear, 0 0, 0 100%, from(#0088cc), to(#0055cc));
  background-image: -webkit-linear-gradient(top, #0088cc, #0055cc);
  background-image: -o-linear-gradient(top, #0088cc, #0055cc);
  background-image: -moz-linear-gradient(top, #0088cc, #0055cc);
  background-image: linear-gradient(top, #0088cc, #0055cc);
  background-repeat: repeat-x;
  border-color: #0055cc #0055cc #003580;
  border-color: rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.1) rgba(0, 0, 0, 0.25);
  filter: progid:dximagetransform.microsoft.gradient(startColorstr='#0088cc', endColorstr='#0055cc', GradientType=0);
  filter: progid:dximagetransform.microsoft.gradient(enabled=false);
}

.btn-primary:hover,
.btn-primary:active,
.btn-primary.active,
.btn-primary.disabled,
.btn-primary[disabled] {
  background-color: #0055cc;
  *background-color: #004ab3;
}

.btn-primary:active,
.btn-primary.active {
  background-color: #004099 \9;
}

button.btn,
input[type="submit"].btn {
  *padding-top: 2px;
  *padding-bottom: 2px;
}

button.btn::-moz-focus-inner,
input[type="submit"].btn::-moz-focus-inner {
  padding: 0;
  border: 0;
}

	</style>
</head>
<body>
<form class="form-horizontal">
	<fieldset>
		<div class="control-group">
			<label class="control-label" for="focusedInput">Focused input</label>
			<div class="controls">
				<input class="input-xlarge focused" id="focusedInput" type="text" value="This is focused…">
			</div>
		</div>
		<div class="control-group">
			<label class="control-label">Uneditable input</label>
			<div class="controls">
				<span class="input-xlarge uneditable-input">Some value here</span>
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="disabledInput">Disabled input</label>
			<div class="controls">
				<input class="input-xlarge disabled" id="disabledInput" type="text" placeholder="Disabled input here…" disabled="">
			</div>
		</div>
		<div class="control-group">
			<label class="control-label" for="optionsCheckbox2">Disabled checkbox</label>
			<div class="controls">
				<label class="checkbox">
				<input type="checkbox" id="optionsCheckbox2" value="option1" disabled="">
					This is a disabled checkbox
				</label>
			</div>
		</div>
		<div class="control-group warning">
			<label class="control-label" for="inputWarning">Input with warning</label>
			<div class="controls">
				<input type="text" id="inputWarning">
				<span class="help-inline">Something may have gone wrong</span>
			</div>
		</div>
		<div class="control-group error">
			<label class="control-label" for="inputError">Input with error</label>
			<div class="controls">
				<input type="text" id="inputError">
				<span class="help-inline">Please correct the error</span>
			</div>
		</div>
		<div class="control-group success">
			<label class="control-label" for="inputSuccess">Input with success</label>
			<div class="controls">
				<input type="text" id="inputSuccess">
				<span class="help-inline">Woohoo!</span>
			</div>
		</div>
		<div class="control-group success">
			<label class="control-label" for="selectError">Select with success</label>
			<div class="controls">
				<select id="selectError">
					<option>1</option>
					<option>2</option>
					<option>3</option>
					<option>4</option>
					<option>5</option>
				</select>
				<span class="help-inline">Woohoo!</span>
			</div>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-primary">Save changes</button>
			<button class="btn" disabled="disabled">Cancel</button>
		</div>
	</fieldset>
</form>
</body>
</html>
```
### 7、结构伪类选择器

| 选择器 | 类型 | 功能描述 |
| :---: | :---: | --- |
| E:fisrt-child | 作为父元素的第一个子元素的元素E。与E:nth-child\(1\)等同 |  |
| E:last-child | 作为父元素的最后一个子元素的元素E。与E:nth-last-child\(1\)等同 |  |
| E:root | 选择匹配元素E所在文档的根元素。在HTML文档中，根元素始终是html，此时该选择器与html类型选择器匹配的内容相同 |  |
| E F:nth-child\(n\) | 选择父元素E的第n个子元素F。其中n可以是整数（1，2，3）、关键字（even，odd）、可以是公式（2n+1）,而且n值起始值为1，而不是0. |  |
| E F:nth-last-child\(n\) | 选择父元素E的倒数第n个子元素F。此选择器与E:nth-child\(n\)选择器计算顺序刚好相反，但使用方法都是一样的，其中：nth-last-child\(1\)始终匹配最后一个元素，与last-child等同 |  |
| E:nth-of-type\(n\) | 选择父元素内具有指定类型的第n个E元素 |  |
| E:nth-last-of-type\(n\) | 选择父元素内具有指定类型的倒数第n个E元素 |  |
| E:first-of-type | 选择父元素内具有指定类型的第一个E元素，与E:nth-of-type\(1\)等同 |  |
| E:last-of-tye | 选择父元素内具有指定类型的最后一个E元素，与E:nth-last-of-type\(1\)等同 |  |
| E:only-child | 选择父元素只包含一个子元素，且该子元素匹配E元素 |  |
| E:only-of-type | 选择父元素只包含一个同类型子元素，且该子元素匹配E元素 |  |
| E:empty | 选择没有子元素的元素，而且该元素也不包含任何文本节点 |  |

#### 示例：

```html
 <!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>CSS3结构伪选择器的使用</title>
    <style type="text/css">
        *{
            margin: 0;
            padding: 0;
        }
        ul {
            margin: 50px auto;
            width: 400px;
            list-style: none outside none;
        }
        li {
            display:inline-block;
            margin: 5px;
            padding: 5px;
            width:50px;
            height: 50px;
            font: bold 30px/50px arial;
            background: #000;
            color: #fff;
            border-radius: 50px;
            text-align: center;
        }
        /*
        ul>li:first-child {
            background-color: green;
        }
        ul>li:last-child {
            background-color: blue;
        }
        ul>li:nth-child(3){
            background-color: yellow;
        }
        ul>li:nth-child(n){
            background-color: orange;
        }
        ul>li:nth-child(2n){
            background-color: blue;
        }
        ul>li:nth-child(2n+1){
            background-color: blue;
        }

        ul>li:nth-child(-n+5){
            background-color: blue;
        }

        ul>li:nth-child(4n+1){
            background-color: blue;
        }
        */
        ul>li:nth-last-child(even){
            background-color: green;
        }

    </style>
</head>
<body>
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
        <li>9</li>
        <li>10</li>
        <li>11</li>
        <li>12</li>
        <li>13</li>
        <li>14</li>
        <li>15</li>
        <li>16</li>
        <li>17</li>
        <li>18</li>
        <li>19</li>
        <li>20</li>
    </ul>
</body>
</html>
```

### 8、否定伪类选择器 ###
| 选择器 | 类型 |功能描述 |
|:-------------:|:-------------:| -----|
|E:not(F)|匹配所有除元素F外的E元素||


### 10、层次属性选择器

| 选择器 | 类型 | 功能描述 |
| :---: | :---: | --- |
| [\[attribute\]](http://www.w3school.com.cn/cssref/selector_attribute.asp) | 用于选取带有指定属性的元素。 |  |
| [\[attribute=value\]](http://www.w3school.com.cn/cssref/selector_attribute_value.asp) | 用于选取带有指定属性和值的元素。 |  |
| [\[attribute~=value\]](http://www.w3school.com.cn/cssref/selector_attribute_value_contain.asp) | 用于选取属性值中包含指定词汇的元素。 |  |
| [\[attribute \|=value\]](http://www.w3school.com.cn/cssref/selector_attribute_value_start.asp) | 用于选取带有以指定值开头的属性值的元素，该值必须是整个单词。 |  |
| [\[attribute^=value\]](http://www.w3school.com.cn/cssref/selector_attr_begin.asp) | 匹配属性值以指定值开头的每个元素。 |  |
| [\[attribute$=value\]](http://www.w3school.com.cn/cssref/selector_attr_end.asp) | 匹配属性值以指定值结尾的每个元素。 |  |
| [\[attribute\*=value\]](http://www.w3school.com.cn/cssref/selector_attr_contain.asp) | 匹配属性值中包含指定值的每个元素。 |  |

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>CSS3属性选择器的使用</title>
  <style type="text/css">
    .demo {
      width: 300px;
            border: 1px solid #ccc;
            padding: 10px;    
      overflow: hidden;
      margin: 20px auto;
        }

        .demo a {
            float: left;
            display: block;
            height: 50px;
            width: 50px;
            border-radius: 10px;
            text-align: center;
            background: #aac;
            color: blue;
      font: bold 20px/50px Arial;
            margin-right: 5px;
            text-decoration: none;
      margin: 5px;
        }
/* 
    a[id]{background-color:yellow;}

 a[id][title]{background-color: red;}

    a[id=first]{background-color:red;}
    a[class="links"]{background-color:yellow;}

  a[lang|=zh]{background-color: yellow;}

  a[title~=website]{background-color:yellow;}

  a[class*=links]{background-color:yellow;}

  a[href^=http]{background-color:yellow;}
 */
 a[href$=png]{background-color:yellow;}
  </style>
</head>
<body>
    <div class="demo">
        <a href="http://www.w3cplus.com" target="_blank" class="links item first" id="first" title="w3cplus">1</a>
        <a href="" class="links active item" title="test website" target="_blank" lang="zh">2</a>
        <a href="sites/file/test.html" class="links item" title="this is a link" lang="zh-cn">3</a>
        <a href="sites/file/test.png" class="links item" target="_balnk" lang="zh-tw">4</a>
        <a href="sites/file/image.jpg" class="links item" title="zh-cn">5</a>
        <a href="mailto:w3cplus@hotmail" class="links item" title="website link" lang="zh">6</a>
        <a href="/a.pdf" class="links item" title="open the website" lang="cn">7</a>
        <a href="/abc.pdf" class="links item" title="close the website" lang="en-zh">8</a>
        <a href="abcdef.doc" class="links item" title="http://www.sina.com">9</a>
        <a href="abd.doc" class="linksitem last" id="last">10</a>
    </div>
</body>
</html>
```





