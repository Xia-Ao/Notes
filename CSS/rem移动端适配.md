# rem移动端适配
参考腾讯前端 AlloyTeam 团队的[移动前端适配利器rem](http://www.alloyteam.com/2016/03/mobile-web-adaptation-tool-rem/)

rem意思就是根据网页的根元素来设置字体大小，和em（font size of the element）的区别是，em是根据其父元素的字体大小来设置，而rem是根据网页的跟元素（html）来设置字体大小的.
一般浏览器默认的字体大小是16px，rem表示就是1rem，如果想设置为12px，那就是0.75rem
现在默认的基本单位是16px，这是一个不太好计算的值，所以一般我们使用100px作为单位，那么rem的换算就是，100px/16px = 6.25,

##### viewpoint设置
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0">
```
##### media查询设置初值
```css
/* mobile media-query */
html {
    font-size: 312.5%;
}

@media screen and (min-width: 360px) and (max-width: 374px) and (orientation: portrait) {
    html {
        font-size: 351.5%;
    }
}

@media screen and (min-width: 384px) and (max-width: 399px) and (orientation: portrait) {
    html {
        font-size: 375%;
    }
}

@media screen and (min-width: 400px) and (max-width: 413px) and (orientation: portrait) {
    html {
        font-size: 390.625%;
    }
}

@media screen and (min-width: 414px) and (max-width: 431px) and (orientation: portrait) {
    html {
        font-size: 404.3%;
    }
}

@media screen and (min-width: 432px) and (max-width: 479px) and (orientation: portrait) {
    html {
        font-size: 421.875%;
    }
}

@media screen and (min-width: 480px)and (max-width: 639px) and (orientation: portrait) {
    html {
        font-size: 468.75%;
    }
}

@media screen and (min-width: 640px) and (orientation: portrait) {
    html {
        font-size: 625%;
    }
}
```

##### 动态计算font-size
因为设计稿都是按照iphone678来设计的，宽度都是750px，所以通常按照750px的宽度动态计算一下font-size
```js
function initScreen() {
    if (!/iphone|ios|android|mobile/i.test(navigator.userAgent.toLowerCase())) {
        $('body').css('width', '750px');
    }
    $('html').css('font-size', ($('body').width() / 750 * 625 + '%'));
}
```