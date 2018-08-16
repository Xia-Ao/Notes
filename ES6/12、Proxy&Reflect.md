## Proxy  Reflect

### proxy
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
1、用法

代理对象操作
```js
let obj = {
    time: '2017-8-11';
    name: 'net';
    _r: 123
}

let moniter = new Proxy(obj.{
    // 拦截对象的读写
    get(target, key){
        return tatget[key].replace('2017','2018')
    }
    
    // 拦截设置属性
    set(target , key , value){
        if(key==='name'){
            return target[key]=value;
        }else{
            return target[key];
        }
    } 
})

```


### Reflect

使用方法类似Proxy

###实例



```js
{
    function validator(target, validator){
        return new Proxy(target,{
            _validator : validator,
            set(target,key, value, proxy){
                if(target.hasOwnProperty(key)){
                    let va=this._validator[key];
                    if(~~va(value)){
                        return Reflect.set(target.key, value,proxy)    
                    }else{
                        throw Error('不能设置')
                    }
                }else{
                    throw Error(`${key} 不存在`)
                }
            }
        })
    }
    
    const personValidator={
        name(val){
            return typeof val ==='string'
        },
        age(val){
            return typeof val === 'number' && val>18
        }
    }
    
    class Person{
        constructor(name,age){
            this.name=name;
            this.age =age;va
            return validator(this.personValidators)
        }
    }
}


```


