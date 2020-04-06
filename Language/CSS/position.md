# position定位

position属性值参考[http://www.cnblogs.com/theWayToAce/p/5264436.html](http://www.cnblogs.com/theWayToAce/p/5264436.html)

### `static`
（静态定位）：默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）
### `relative`
（相对定位）：生成相对定位的元素，通过top,bottom,left,right的设置相对于其正常（原先本身）位置进行定位。可通过z-index进行层次分级。　　

### `absolute`
（绝对定位）：生成绝对定位的元素，相对于 **static 定位以外的第一个父元素**进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。

### `fixed`
（固定定位）：生成绝对定位的元素，相对于**浏览器窗口**进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。可通过z-index进行层次分级。

fixed很适合用于固定某个div或者侧边栏在页面中不随页面滚动而滚动。

### `sticky` 
（粘连定位）

对象在常态时遵循常规流。它就像是relative和fixed的合体，当在屏幕中时按常规流排版，当卷动到屏幕外时则表现如fixed。该属性的表现是现实中你见到的吸附效果。

css3加入的属性，很好的解决了topbar顶部吸附的问题。使用时注意浏览器的支持程度