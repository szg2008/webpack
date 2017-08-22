function generateText(){
	var element = document.createElement('h2');
	element.innerHTML = 'Hello h2 World!';
	return element;
}

module.exports = generateText;

// export default function(){
// 	var element = document.createElement('h2');
// 	element.innerHTML = 'Hello h2 World haha!';
// 	return element;
// }
