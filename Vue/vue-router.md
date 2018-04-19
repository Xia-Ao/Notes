
使用前端路由的优缺点：

**优点**：用户体验好，不需要每次都从服务器获取，快速展现给用户
**缺点**：1、不利于SEO。2、使用浏览器的前进后退键会重新发送请求，没有合理的利用缓存。


### 使用vue-router
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
//注册插件 如果是在浏览器环境运行的，可以不写该方法
Vue.use(VueRouter)

// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
const User = { template: '
<div>用户</div>' }
const Role = { template: '
<div>角色</div>' }

// 2. 定义路由
// Array,每个路由应该映射一个组件。
const routes = [
{ path: '/user', component: User },
{ path: '/home', component: Home }
]

// 3. 创建 router 实例，并传 `routes` 配置
const router = new VueRouter({
routes 
})

// 4. 创建和挂载根实例。
// 记得要通过 router 对象以参数注入Vue，
// 从而让整个应用都有路由功能
// 使用 router-link 组件来导航.
// 路由出口
// 路由匹配到的组件将渲染在这里
const app = new Vue({
router,
template: `
<div id="app">
    <h1>Basic</h1>
    <ul>
        <li>
            <router-link to="/">/</router-link>
        </li>
        <li>
            <router-link to="/user">用户</router-link>
        </li>
        <li>
            <router-link to="/role">角色</router-link>
        </li>
        <router-link tag="li" to="/user">/用户</router-link>
    </ul>
    <router-view class="view"></router-view>
</div>
`
}).$mount('#app')

```
### 动态路由
带参数的路由，使用`$router.params.id`的方法获取

### 嵌套路由
菜单下面还有子菜单，多级菜单的情况，使用方法一样

### 编程式路由
```js
$router.push("name")
$router.push({path:"name"})
$router.push({path:"name?id=3"})或者使用$router.push({path:"name",query:{id=3}})
```
获取的时候使用`$router.query.id`获取到传递到的参数。
### 命名式路由

### 深入剖析一下

其实也不是我深入剖析，主要是看看别人的博文，解剖出来的内脏看看，一遍看不懂就多看几遍

[【源码拾遗】从vue-router看前端路由的两种实现](https://zhuanlan.zhihu.com/p/27588422)

[vue-router源码分析-整体流程](https://zhuanlan.zhihu.com/p/24104410)


[vue-router 源码分析-history](https://zhuanlan.zhihu.com/p/24574970)


