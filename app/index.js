import styles from '../style/main.css';
import generateText from './sub';
//import './plugin';//第一种引入的方式
import 'imports-loader?jQuery=jquery!./plugin.js';//第二种引入的方式,安装imports-loader
import $ from 'jquery';
import moment from 'moment';
import config from '../json/config.json';
// var async = require('./async.js');

let app  = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((number) => {//异步操作，本阶段最后执行
  $('body').append('<p>promise result is ' + number + ' now is ' + moment().format() + '</p>');
  //call our jquery greenify
  $('p').greenify();

  $('body').append('<p>'+config.greetText+'</p>');
});
app.innerHTML = '<h1>Hello World it</h1>';
document.body.appendChild(app);     
app.appendChild(generateText());
// async();
//异步加载
require.ensure(['./async.js'],function(){
	var async = require('./async.js');
	async();
},'async');
