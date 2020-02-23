## Vue中常用的插件及其用法

[better-scroll滚动](#1)


<h3 id='1'>better-scroll滚动插件</h3>

[better-scroll Github地址](https://github.com/ustbhuangyi/better-scroll)

#### 使用方法



```js
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  
  let show = !this.fold;
  if (show) {
          this.$nextTick(() => {
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.scroll.refresh();
            }
          });
        }
</script> 
```


```html
<div class="list-content" ref="listContent">
  <ul>
    <li class="food" v-for="food in selectFoods">
      <span class="name">{{food.name}}</span>
      <div class="price">
        <span>￥{{food.price * food.count}}</span>
      </div>
      <div class="cartcontrol-wrapper">
        <cartcontrol :food="food"></cartcontrol>
      </div>
   </li>
  </ul>
 </div>
```


