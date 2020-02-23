
## 常见兼容问题
1. IE margin双边距bug，使用float引起的，
2. 3px像素问题，IE浮动后产生3px像素间距，使用display：inline -3px
3. 超链接hover点击之后失效，使用正确的顺序，link，visited，hover， active
4. IE 的z-index问题，向父元素添加position：relative
5. min-height IE不认，使用！important
6. png透明，使用js代码
7. select在IE6下遮盖，使用iframe嵌套
8. opacity,使用兼容写法
9. 浏览器默认的margin padding不同，使用css初始化取消浏览器css默认样式
