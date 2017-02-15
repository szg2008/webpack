var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
//定义文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');

module.exports = {
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry:'./app/index.js',
	//输出的文件名 合并之后会命名为bundle.js
	output:{
		path:'/build2',
		filename:'bundle.js'
	},
	module:{
		//处理各种类型的文件
		loaders:[
			{
				test:/\.css$/, 
				loader:"style-loader!css-loader"//处理css文件,同样可以处理sass文件
			},
			{
				test:/\.(png|jpg)$/,
				loader:"url-loader?limit=40000"//当图片大小小于limit时，使用base64位
			},
			//es6的支持
			{
				test:/\.jsx$/,
				loader:'babel',
				query:{
					presets:['es2015']
				}
			}
		]
	},
	//添加自己的插件，会自动生成一个html文件
	//记得在系统变量中配置NODE_PATH变量
	plugins: [
    	new HtmlwebpackPlugin({
      		title: 'Hello World App'
    	}),
    	//加载第三方库，比如jquery的第三方插件
    	//通过ProvidePlugin，把一个全局变量插入到所有的代码中
    	//另外一种方式是通过imports-loader引入
    	new webpack.ProvidePlugin({
    		$:'jquery',
    		jQuery:'jquery',
    		"window.jQuery":'jquery'
    	})
  	]
};