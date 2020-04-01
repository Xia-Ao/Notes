
## 一些好用的CSS设计
#### 有content的三角形或者多边形。

![image](https://blobscdn.gitbook.com/v0/b/gitbook-28427.appspot.com/o/assets%2F-LI4XIh9ljNl7vLDogAQ%2F-LI4XSJWR6h8WVO802xk%2F-LI4X_9F7lTtc9cH7A3e%2Fdeg.png.png?generation=1532322535646931&alt=media)

使用linear-gradient函数进行颜色渐变，具体代码[参考](https://xia-ao.gitbook.io/notes/css/xie-qie-jiao-shi-xian)

```
display: inline-block;
margin-right: 50px;
width: 200px;
height: 70px;
background: #58a;
background:
            linear-gradient(45deg, transparent 25px, #58a 0)bottom left  ,
            linear-gradient(-45deg, transparent 25px, #58a 0)bottom right,
            linear-gradient(-135deg, transparent 25px, #58a 0)top right  ,
            linear-gradient(135deg, transparent 25px, #58a 0)top left  ;
background-size: 51% 51% ;
background-repeat: no-repeat;
```