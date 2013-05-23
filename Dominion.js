//Dominion.js
//Items to do
//============
// a function to configure that allows the promotion of text based function names to first class jQuery plugin functions.


var Dominion = Dominion || {};
Dominion.FunctionNames = Dominion.FunctionNames || {};
Dominion.FunctionNames.AppendTextBox = "AppendTextBox";

(function ($) {
	$.fn.Dominion = {};
	
	//adds a text box to each element in the list
	$.fn.Dominion = function (functionName) {
	    if (functionName === Dominion.functionNames.AppendTextBox) {
	        return this.each(function() {
	            var depositInput = $(document.createElement("input"));
	            depositInput.attr("type", "text");
	            $(this).append(depositInput);
	        });
	    }
	};
})(jQuery);