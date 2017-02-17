var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//定义文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH,'app');
var BUILD_PATH = path.resolve(ROOT_PATH,'build');
var TEM_PATH = path.resolve(ROOT_PATH, 'templates');

module.exports = {
	devtool: 'eval-source-map',//配置生成Source Maps，便于调试
	//项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	//生成多个页面
	entry:{
		app:path.resolve(APP_PATH,'index.js'),
		mobile:path.resolve(APP_PATH,'mobile.js'),
		//添加要打包在vendors里面的库
		vendors:['jquery','moment']
	},
	//输出的文件名 合并之后会命名为bundle.js
	output:{
		path: BUILD_PATH,
		filename:'[name].[chunkhash:8].js',//加上hash值防止缓存
		publicPath:'/build/',
		chunkFilename:'[name].[chunkhash:8].js'//设置异步加载的文件的名称
	},
	module:{
		//处理各种类型的文件
		loaders:[
			{
				test:/\.css$/, 
				loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
				//loader:"style-loader!css-loader?modules"//处理css文件,同样可以处理sass文件,不同的loader之间使用!隔开
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
			},
			//json支持
			{
				test:/\.json$/,
				loader:'json-loader'
			}
		]
		// preLoaders:[
		// 	{
		// 		test:/\.jsx?$/,
		// 		include:APP_PATH,
		// 		loader:'jshint-loader'
		// 	}
		// ],
		// postLoaders:[
		// 	{
		// 		test:/\.jsx?$/,
		// 		include:APP_PATH,
		// 		loader:'jshint-loader'
		// 	}
		// ]
	},

	devServer:{
		// contentBase: "./build",//本地服务器所加载的页面所在的目录
  //   	colors: true,//终端中输出结果为彩色
  //   	historyApiFallback: true,//不跳转
  //   	inline: true//实时刷新
		// proxy:{
		// 	'/api/*':{
		// 		target:'http://localhost:8080',
		// 		secure:false
		// 	}
		// }
	},
	//添加自己的插件，会自动生成一个html文件
	//记得在系统变量中配置NODE_PATH变量
	plugins: [
    	//创建了两个HtmlWebpackPlugin的实例，生成两个页面
		 new HtmlwebpackPlugin({
		    title: 'Hello World app',
		    template: path.resolve(TEM_PATH, 'index.html'),
		    filename: 'index.html',
		    //chunks这个参数告诉插件要引用entry里面的哪几个入口
		    chunks: ['app', 'vendors'],
		    //要把script插入到标签里
		    inject: 'body',
		    minify:{//压缩HTML文件
		    	removeComments:false,//移除里面的注释
		    	collapseWhitespace:true//移除里面的空白行和换行符
		    }
		 }),
		 new HtmlwebpackPlugin({
		    title: 'Hello Mobile app',
		    template: path.resolve(TEM_PATH, 'mobile.html'),
		    filename: 'mobile.html',
		    chunks: ['mobile', 'vendors'],
		    inject: 'body',
		    minify:{//压缩HTML文件
		    	removeComments:false,//移除里面的注释
		    	collapseWhitespace:true//移除里面的空白行和换行符
		    }
		 }),
    	//加载第三方库，比如jquery的第三方插件
    	//通过ProvidePlugin，把一个全局变量插入到所有的代码中
    	//另外一种方式是通过imports-loader引入
    	new webpack.ProvidePlugin({
    		$:'jquery',
    		jQuery:'jquery',
    		"window.jQuery":'jquery'
    	}),
    	//压缩代码
    	new webpack.optimize.UglifyJsPlugin({minimize: true}),
    	// //把入口文件里面的数组打包成vendors.js
    	new webpack.optimize.CommonsChunkPlugin({name:'vendors',filename:'vendors.js'}),
    	new webpack.BannerPlugin("Copyright suzg inc."),//在这个数组中new一个就可以了
    	new ExtractTextPlugin('./css/style.[contenthash:8].css')
    	//new webpack.HotModuleReplacementPlugin()
  	],
  	//一些基本的配置
  	resolve:{
  		extensions:['.js','.css','.json'],//require模块的时候可以省略文件的后缀名
  		//模块别名定义，在require的时候使用
  		alias:{

  		}
  	}
};