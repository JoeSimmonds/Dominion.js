//Dominion.js
//Items to do
//============
// a function to configure that allows the promotion of text based function names to first class jQuery plugin functions.


var Dominion = Dominion || {};
Dominion.FunctionNames = Dominion.FunctionNames || {};
Dominion.FunctionNames.AppendTextBox = "AppendTextBox";
Dominion.FunctionNames.AppendSelect = "AppendSelect";
Dominion.FunctionNames.AppendElement = "AppendElement";

(function ($) {
	$.fn.Dominion = {};
	
	//adds a text box to each element in the list
	$.fn.Dominion = function (functionName) {
	    if (functionName === Dominion.FunctionNames.AppendTextBox) {
	        return appendTextBox.apply(this);
	    } else if (functionName === Dominion.FunctionNames.AppendSelect) {
	        return appendSelect.apply(this);
	    };
	};

    //options looks like 
    //{elementName:"input"
    // attributes:{attribute1Name:"attribute1Value", attribute2Name, "attribute2Value"}
	function appendElement(options) {
	    return this.each(function () {
	        var el = $(document.createElement(options.elementName));
	        for (var attributeName in options.attributes) {
	            el.attr(attributeName, options.attributes[attributeName]);
	        }

	        $(this).append(el);
	    });
	};

	function appendTextBox() {
	    return appendElement.apply(this, [{
	        elementName: "input",
	        attributes: { type: "text" }
	    }]);
	};

	function appendSelect() {
	    return appendElement.apply(this, [{ elementName: "select" }]);
	};

})(jQuery);