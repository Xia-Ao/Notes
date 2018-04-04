### outline

- 使用方法和border很相似，具`outline-width`, `outline-style`, `outline-color`三个属性。
- outlines相关属性不占据布局空间，不会影响元素的尺寸；
- 没有outline-top outline-bottom属性

### text-overflow

- clip：当内联内容溢出块容器时，将溢出部分裁切掉。
- ellipsis：当内联内容溢出块容器时，将溢出部分替换为（...）。

通常与换行，word-warp等一起使用

### box-sizing

- 默认值：content-box
- 适用于：所有接受 ' width ' 和 ' height ' 的元素

取值：
- **content-box**：
padding和border不被包含在定义的width和height之内。对象的实际宽度等于设置的width值和border、padding之和，即 ( Element width = width + border + padding )
此属性表现为标准模式下的盒模型。
- **border-box**：
padding和border被包含在定义的width和height之内。对象的实际宽度就等于设置的width值，即使定义有border和padding也不会改变对象的实际宽度，即 ( Element width = width )
此属性表现为怪异模式下的盒模型。

### resize

- 适用于：所有 ' overflow ' 设置为**非visible**的元素

取值：
- none：不允许用户调整元素大小。
- both：用户可以调节元素的宽度和高度。
- horizontal：用户可以调节元素的宽度
- vertical：用户可以调节元素的高度。