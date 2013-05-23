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
	
	$.fn.Dominion = function (functionName, options) {
	    var f = functionLookup(functionName);
        if (f) {
            return f.apply(this, [options]);
        } else {
            return this;
        }
	};

    $.Dominion = function(options) {
        initialise(options);
    };
    
    function functionLookup(functionName) {
        if (functionName === Dominion.FunctionNames.AppendTextBox) {
            return appendTextBox;
        } else if (functionName === Dominion.FunctionNames.AppendSelect) {
            return appendSelect;
        } else if (functionName === Dominion.FunctionNames.AppendElement) {
            return appendElement;
        } else {
            return null;
        };
    }

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
    
    function initialise(options) {
        if (options.promoteFunctions === true) {
            for (var functionNameKey in Dominion.FunctionNames) {
                var fName = Dominion.FunctionNames[functionNameKey];
                if ($.fn[fName]) {
                    throw "jQuery function nameclash with " + fName + " you will need to rename this dominion function before functions can be promoted";
                }
            }
            for (var functionNameKey in Dominion.FunctionNames) {
                var functionName = Dominion.FunctionNames[functionNameKey];
                $.fn[functionName] = functionLookup(functionName);
            }
            
        }
        return this;
    }

})(jQuery);