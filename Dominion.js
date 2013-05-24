//Dominion.js

var Dominion = Dominion || {};
Dominion.FunctionNames = Dominion.FunctionNames || {};
Dominion.FunctionNames.AppendTextBox = "appendTextBox";
Dominion.FunctionNames.AppendSelect = "appendSelect";
Dominion.FunctionNames.AppendElement = "appendElement";
Dominion.FunctionNames.AppendOption = "appendOption";
Dominion.FunctionNames.AppendDiv = "appendDiv";
Dominion.FunctionNames.AppendSpan = "appendSpan";

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
        } else if (functionName === Dominion.FunctionNames.AppendDiv) {
            return appendDiv;
        } else if (functionName === Dominion.FunctionNames.AppendSpan) {
            return appendSpan;
        }else {
            return null;
        };
    }

    //options looks like 
    //{elementName:"input"
    // attributes:{attribute1Name:"attribute1Value", attribute2Name, "attribute2Value"}
    // callback:function() {}
	// id:"elementId"
	// text:"text to go inside the element"
    // class:"cssClass1 cssClass2"
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

            if (options.id) {
                el.attr("Id", options.id);
            }

            if(options.class){
                el.attr("class", options.class);
            }
            
	        $(this).append(el);
	        
	        if (options.callback) {
	            options.callback.apply(el);
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
    
	function appendDiv(options) {
	    var absolutes = { elementName: "div" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}
	
	function appendSpan(options) {
	    var absolutes = { elementName: "span" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}
	
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