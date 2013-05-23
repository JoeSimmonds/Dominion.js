//Dominion.js
//Items to do
//============
// a function to configure that allows the promotion of text based function names to first class jQuery plugin functions.


var Dominion = Dominion || {};
Dominion.FunctionNames = Dominion.FunctionNames || {};
Dominion.FunctionNames.AppendTextBox = "appendTextBox";
Dominion.FunctionNames.AppendSelect = "appendSelect";
Dominion.FunctionNames.AppendElement = "appendElement";
Dominion.FunctionNames.AppendOption = "appendOption";

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
        } else if (functionName === Dominion.FunctionNames.AppendOption) {
            return appendOption;
        }else {
            return null;
        };
    }

    //options looks like 
    //{elementName:"input"
    // attributes:{attribute1Name:"attribute1Value", attribute2Name, "attribute2Value"}
    // callback:function() {}
    //}
	function appendElement(options) {
	    return this.each(function () {
	        var el = $(document.createElement(options.elementName));
	        for (var attributeName in options.attributes) {
	            el.attr(attributeName, options.attributes[attributeName]);
	        }

            if (options.text) {
                el.text(options.text);
            }

	        $(this).append(el);
	        
	        if (options.callBack) {
	            options.callBack.apply(el);
	        }
	    });
	};

	function appendTextBox(options) {
	    var absolutes = { elementName: "input", attributes: { type: "text" } };
	    options = jQuery.extend(true, options, absolutes);
        return appendElement.apply(this, [options]);
	};

	function appendSelect(options) {
	    var absolutes = { elementName: "select" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	};
    
	function appendOption(options) {
	    var absolutes = { elementName: "option" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}
    
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