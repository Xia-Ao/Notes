---
title: ESLint检查规则.md
date: 2018-04-13 13:44:40
tags: Tools
---

ESLint的语言检查有助于提高自己的代码书写规范，推荐在项目中使用ESLint检查

[ESLint官方地址](http://eslint.cn/docs/rules/)

ESLint 附带有大量的规则。你可以使用注释或配置文件修改你项目中要使用的规则。要改变一个规则设置，你必须将规则 ID 设置为下列值之一：
* `"off"` 或 `0` - 关闭规则
* `"warn"` 或 `1` - 开启规则，使用警告级别的错误：`warn` (不会导致程序退出)
* `"error"` 或 `2` - 开启规则，使用错误级别的错误：`error` (当被触发的时候，程序会退出)

一般推荐使用数字0 1 2来开启或者关闭规则。

### 常用的ESLint规则
下面列出部分常用的ESLint检查规则，后续再开发中遇到再补充

```js
rules: {
  // allow async-await
  'generator-star-spacing': 'off', //关闭 强制 generator 函数中 * 号周围使用一致的空格
  // allow debugger during development
  'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off', //生产模式下不允许debugger
  'semi': [1, 'always'],    //总是使用分号结尾，如果没有，则警告
  'indent': 0,  //不检查缩进
  'space-before-function-paren': [1, 'always'],  //要求不管什么函数，做括号前必须要求一个空格，否则则警告
  'comma-spacing': 0,   //不检查在逗号周围使用空格
  'no-multiple-empty-lines': [1, {'max': 3}],  //最多出现3行空行，否则则警告
  'space-infix-ops': 1,  //要求操作符周围有空格，否则则警告
  'no-unused-vars': 1  //禁止出现未使用过的变量,否则则警告
}
```