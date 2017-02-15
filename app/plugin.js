(function($){
	const shade = '#556b2f';
	$.fn.greenify = function(){
		this.css('color',shade).css('font-weight','bold');
		return this;
	}
})(jQuery);