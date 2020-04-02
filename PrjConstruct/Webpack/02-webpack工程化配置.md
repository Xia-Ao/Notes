
# 课时 2: webpack 工程化配置


之前使用webpack时的一些疑问：
- 为什么把loader放在module.rule中
- webpack.conf.js中，使用单引号还是双引号
- 在一些配置选项中，不确定选用哪一种，比如，devtool，生成sourcemap，有很多选项，我应该选用哪一种适合目前的工程
- 目前很多脚手架工具，将工程中webpack配置隐藏，这样做的目的什么，减轻了工作量还是增加了工作量

## 什么时webpack工程化
略，后续补充

## 工程配置-以Vue工程为例


### `webpack.base.conf.js`

#### 入口

Vue工程一般都是SPA页面，只有一个入口。

```js
entry: './src/index.js'
```

#### 输出output

输出的配置一般根据情况划分，有以下几种情况
- 打包出一个js文件
- 由于JS文件过大，拆分出多个JS文件打包
- CSS文件打包输出
- 多页面打包输出，对应多个输出

我们先说SPA页面打包，一般配置输出路径和输出的文件名称这两个选项，文件名称根据需要看是否hash。

区分一下hash ，trunkhash ， contenthash
- hash： hash是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的hash值都会更改，并且全部文件都共用相同的hash值
- trunkhash： chunkhash和hash不一样，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的chunk，生成对应的哈希值。如果公用文件单独打包的话，文件没有改变，生成的hash值不会变化
- contenthash： 在有引用关系的打包后文件中，比如index.js中引用index.css,如果js变化了，css没见变化，js和css的都会重新打包构建，使用contenthash的话，css就不会重新构建

参考： [webpack中的hash、chunkhash、contenthash区别](https://juejin.im/post/5a4502be6fb9a0450d1162ed)

```js
output: {
    filename: 'main.[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
}
```


在说到多页面打包输出


#### module 模块 

在模块配置中，官方提供了很多了的配置，但是在一般的工程中，用到比较多的是Rule中的loader，这个是webpack的核心功能之一

##### JS处理

```js
rules: [
	{
		test: /.js$/,
		include: path.resolve(__dirname, 'src'),
		exclude: 'node_modules',
		use: {
			loader: 'babel-loader',
		}
	},
]
```
一般情况下，js语法使用`babel-loader`可以处理大部分ES6语法，但是对于一些特殊的ES6 ES7语法，比如`class`, 装饰者等， 需要使用一些插件处理。

```js
use: {
    options: {
    	// ??	
    	presets: [
    		'@babel/preset-env',
    	],
    	// js高级语法支持
    	plugins: [
    		['@babel/plugin-proposal-decorators', {'legacy': true}], // 
    		['@babel/plugin-proposal-class-properties', {'loose': true}], // ES6 Class支持
    		['@babel/plugin-transform-runtime'],
    	],
    }
}

```

##### CSS 处理
css的处理十分简单，常规就是使用`css-loader`进行处理就好了，不过在工程化里面，一般会再将css进行压缩。

```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
rules: [
    {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
		    'css-loader',
        ]
    }
]
```

######  less、sass、scss、stylus 等与处理器处理
上述都是css预处理器，不同的css预处理器会有不同的loader进行处理，需要注意的地方在于，loader的处理是有顺序的，需要安装顺序将文件一步一步处理成最终的css，在loader配置语法上，从后往前执行。

先解析`less-loader` -> `postcss-loader` -> `css-loader`, -> `MiniCssExtractPlugin.loader`

以less为例
```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
rules: [
    {
        test: /\.less/,
        use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'less-loader',
        ]
    }
]
```

##### HTML处理
html的一般不需要在loader中处理，通常是使用一些htmlPlugin模板承载Html，会在后面的Plugin环节讲到。

##### 资源文件处理
例如图片资源，在前端工程中使用的比较多，对这些资源文件的处理一般是
- 检查资源大小
- 图片格式转化
- 整合输出资源
- 雪碧图处理
- 。。。

下面是一个简单的示例

```js
rules: [
    {
        test: '/\.(png|jpg|jepg|gif)$/',
        use: [
            {
                loader: 'url-loader',
                options: {
                    limit: 10 *1024, // 设置图片限制，超过的使用 file-loader 加载 未超过的转base加载到
                    outputPath: 'img/', // 输出到一个文件夹中
                }
            }
        ]
    }
]
```

#### plugins处理

base文件中，首先需要处理的是hmtl文件，使用HtmlWebpackPlugin这个插件生成html模板，同时对css进行处理，习惯选择将css单独打包成一个文件，通过`<link>`的方式插入到html中。


```js
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
	new HtmlWebpackPlugin({
		template: './public/index.html',
		hash: true,
	}),
	new MiniCssExtractPlugin({
		filename: 'css/index.[trunkhash].css',
		hash: true,
	}),
],
```

还有vue文件的处理
```js
const VueLoaderPlugin = require('vue-loader/lib/plugin');
pulgins: [
    new VueLoaderPlugin(),
]
```


### `webpack.dev.conf.js`



### `webpack.prod.conf.js`

生产模式同样适用mergre合并base和production

生产模式和dev首先最不同的是mode不一样，`mode: 'production'`

一般在生产模式下，会对文件进行进一步的压缩。如果你在base下已经做了处理，则不需要。

```js
const merge = require('webpack-merge');

const baseConfig = require('./webpack.base.conf');

module.exports = merge(baseConfig, {
    mode: 'production',
})
```

<!-- 从以下几个方面学习

- 开发、生产环境
- Html处理
- Js的处理
- Css的处理
- 提取页面公共资源
- 多页面打包
- 其他，不局限以上内容 -->


