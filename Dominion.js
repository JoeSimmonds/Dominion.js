//Dominion.js

var Dominion = Dominion || {};
Dominion.FunctionNames = Dominion.FunctionNames || {};
Dominion.FunctionNames.AppendTextBox = "appendTextBox";
Dominion.FunctionNames.AppendSelect = "appendSelect";
Dominion.FunctionNames.AppendElement = "appendElement";
Dominion.FunctionNames.AppendOption = "appendOption";
Dominion.FunctionNames.AppendDiv = "appendDiv";
Dominion.FunctionNames.AppendSpan = "appendSpan";
Dominion.FunctionNames.AppendLineBreak = "appendLineBreak";
Dominion.FunctionNames.AppendTable = "appendTable";
Dominion.FunctionNames.AppendTableRow = "appendTableRow";
Dominion.FunctionNames.AppendTableCell = "appendTableCell";
Dominion.FunctionNames.AppendTableHeaderCell = "appendTableHeaderCell";
Dominion.FunctionNames.Autoview = "autoview";

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
        } else if (functionName === Dominion.FunctionNames.AppendLineBreak) {
            return appendLineBreak;
        } else if (functionName === Dominion.FunctionNames.AppendTable) {
			return appendTable;
		} else if (functionName === Dominion.FunctionNames.AppendTableRow) {
			return appendTableRow;
		} else if (functionName === Dominion.FunctionNames.AppendTableCell) {
			return appendTableCell;
		} else if (functionName === Dominion.FunctionNames.AppendTableHeaderCell) {
			return appendTableHeaderCell;
		} else if (functionName === Dominion.FunctionNames.Autoview) {
			return autoview;
		} else {
            return null;
        };
    }

    //options looks like 
    //{elementName:"input"
    // attributes:{attribute1Name:"attribute1Value", attribute2Name, "attribute2Value"}
    // callback:function() {}
	// id:"elementId"
	// text:"text to go inside the element"
    // cssClass:"cssClass1 cssClass2"
    //}
	function appendElement(options) {
	    return this.each(function () {
            var newEl = document.createElement(options.elementName)
	        var el = $(newEl);
	        
	        for (var attributeName in options.attributes) {
	            el.attr(attributeName, options.attributes[attributeName]);
	        }

            if (options.text) {
                el.text(options.text);
            }

            if (options.id) {
                el.attr("Id", options.id);
            }

            if(options.cssClass){
                el.attr("class", options.cssClass);
            }
            
	        $(this).append(el);
	        
	        if (options.callback) {
	            options.callback.apply(newEl);
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
    
    function appendLineBreak(options) {
	    var absolutes = { elementName: "br" };
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
	
	function appendTable(options) {
	    var absolutes = { elementName: "table" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}

	function appendTableRow(options) {
	    var absolutes = { elementName: "tr" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}
	
	function appendTableCell(options) {
	    var absolutes = { elementName: "td" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}

	function appendTableHeaderCell(options) {
	    var absolutes = { elementName: "th" };
	    options = jQuery.extend(options, absolutes);
	    return appendElement.apply(this, [options]);
	}
	
	function autoview(options) {
		var defaults={mode:"standard", includeLabels:false, elementName:"div"};
		options = jQuery.extend(defaults, options);
		for (var prop in options.data){
			var elementDef = {
				text:"",
				elementName:options.elementName, 
				cssClass:"dominion-autoview " + prop };
			
			if (typeof(options.data[prop]) === "object"){
				elementDef.callback = function(){
						var newOpts = jQuery.extend({}, options, {data:options.data[prop]});
						autoview.apply($(this), [newOpts]);
					};
			} else {
				elementDef.text = options.data[prop];
			}
			
			if (options.includeLabels){
				elementDef.text = prop + "=" + elementDef.text;
			}
			
			appendElement.apply(this, [elementDef]);
		} 
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