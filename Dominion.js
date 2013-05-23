//Dominion.js
var Dominion = Dominion || {};

(function($) {
	$.fn.Dominion = {};
	
	//adds a text box to each element in the list
	$.fn.Dominion.AppendTextBox = function(){
				return this.each(function(){
				var depositInput = $(document.createElement("input"));
				depositInput.attr("type", "text");
				$(this).append(depositInput);
			}
	}
})(jQuery);