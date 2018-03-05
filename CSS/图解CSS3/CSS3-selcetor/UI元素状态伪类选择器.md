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