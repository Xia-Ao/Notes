# Vue使用总结

### 监听事件冒泡`@`
[**API**](https://cn.vuejs.org/v2/api/#v-on)

Vue使用指令`v-on`绑定在DOM上实现监听，可以缩写为`@`，但是在使用的过程中，如果发生DOM嵌套，就会像DOM事件一样发生冒泡和捕获，Vue提供了事件修饰符来阻止冒泡等。
**修饰符** ：
* `.stop` - 调用 `event.stopPropagation()`。
* `.prevent` - 调用 `event.preventDefault()`。
* `.capture` - 添加事件侦听器时使用 capture 模式。
* `.self` - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
* `.{keyCode | keyAlias}` - 只当事件是从特定键触发时才触发回调。
* `.native` - 监听组件根元素的原生事件。
* `.once` - 只触发一次回调。
* `.left` - (2.2.0) 只当点击鼠标左键时触发。
* `.right` - (2.2.0) 只当点击鼠标右键时触发。
* `.middle` - (2.2.0) 只当点击鼠标中键时触发。
* `.passive` - (2.3.0) 以 `{ passive: true }` 模式添加侦听器


### 数组/对象更新DOM异步渲染
[**API**](https://cn.vuejs.org/v2/guide/list.html#%E6%95%B0%E7%BB%84%E6%9B%B4%E6%96%B0%E6%A3%80%E6%B5%8B)

#### 数组
由于 JavaScript 的限制，Vue 不能检测以下变动的数组：
1. 当你利用索引直接设置一个项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`

所以操作数组的想要通过检测到更新，两种方法，
1. [`vm.$set(Array|Object, key, value)`](https://vuejs.org/v2/api/#vm-set) 实例方法
2. 数组变异方法，会出大师徒更新，一下几种变异方法会触发。不过这些变异方法有些会改变原来数组，适应用新数组等于老数组，你可能认为这将导致 Vue 丢弃现有 DOM 并重新渲染整个列表。幸运的是，事实并非如此。Vue 为了使得 DOM 元素得到最大范围的重用而实现了一些智能的、启发式的方法，所以用一个含有相同元素的数组去替换原来的数组是非常高效的操作。

* `push()`
* `pop()`
* `shift()`
* `unshift()`
* `splice()`
* `sort()`
* `reverse()`

#### 对象Object
还是因为这个原因，**Vue 不能检测对象属性的添加或删除** 同样使用[`vm.$set(Array|Object, key, value)`](https://vuejs.org/v2/api/#vm-set) 方法。

在实际应用中发现一个问题，例如我是使用表单的时候，在`data`中定义一个表单对象，

```js
data() {
    return{
        form :{}
    }
}
```
```html
<el-select v-model="form.interviewer" placeholder="是否通过" size="small" filterable @change="selectChange">
    <el-option v-for="item in HrOption.interviewer" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
</el-select>
```
如果一开始要给select一个初始值，使用`form.interviewer=value`方法,发现不行选择时DOM不会实时更新，即使监听change事件使用`vm.$set`方法也不能刷新DOM
```js
selectChange( e) {
    this.$set(this.form, 'interviewer', e)
},
````
解决方案：
1. 在data中定义的时候添加上`interviewer`属性
```js
data() {
    return{
        form :{interviewer:''}
    }
}
```
2. 在赋初值的时候使用`vm.$set(Array|Object, key, value)`方法。

### 父子组件之间传对象
如果父子组件之间传递String，等一般类型的参数，使用`.sync`修饰符，父组件变化，子组件也会跟着变化，但是传对象的话不行，需要使用监听事件。




