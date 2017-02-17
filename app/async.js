function async() {
	setTimeout(function(){
		var element = document.createElement('p');
		element.innerHTML = 'Hello async';
		document.body.appendChild(element);
	},2000);
}
module.exports = async;