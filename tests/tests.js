var Dominion = Dominion || {};
Dominion.Tests = Dominion.Tests || {};

Dominion.Tests.ElementAppendTests = {
    Run : function(){
        test("Can Append A Div", function(){
            var $fixture = $("#qunit-fixture");  
            $fixture.Dominion("appendDiv");
            equal($("div", $fixture).length,1,"A div was created");
        });
        
        test("Can Append A Span", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendSpan");
            equal($("span", $fixture).length,1,"A span was created");
        });
        
        test("Can Append A Line Break", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendLineBreak");
            equal($("br", $fixture).length,1,"A br tag was created");
        });
        
        test("Can Append A Text Box", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendTextBox");
            equal($("input[type='text']", $fixture).length,1,"A text box was created");
        });
        
        test("Can Append A Select Box", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendSelect");
            equal($("select", $fixture).length,1,"A Select Box was created");
        });
        
        test("Can Append options", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendOption");
            equal($("Option", $fixture).length,1,"An option was created");
        });
        
        test("Can Append An Arbitrary Element", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendElement",{elementName:"test"});
            equal($("test", $fixture).length,1,"An test element was created");
        });
    }
};


Dominion.Tests.CanControlOutput = {
    Run : function(){
        test ("Can Set The Element's Id",function(){
            var $fixture = $("#qunit-fixture");  
            $fixture.Dominion("appendDiv",{id:"testId"});
            equal($("div#testId", $fixture).length,1,"The Id was set correctly");
        });
        
        test ("Can Set The Element's Text",function(){
            var $fixture = $("#qunit-fixture");
            var testText="here is some test text";
            $fixture.Dominion("appendDiv",{text:testText});
            equal($("div", $fixture).text(),testText,"The Text was set correctly");
        });
        
        test ("Can Set Attributes On The Element",function(){    
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendDiv",{attributes:{att1:"testValue"}});
            equal($("div[att1='testValue']", $fixture).length,1,"The attribute was set correctly");
        });
        
        test ("Can Set cssClass On The Element",function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendDiv",{cssClass:"testClass"});
            equal($("div.testClass", $fixture).length,1,"The class was set correctly");
        });
    }
};


Dominion.Tests.Callbacks = {
    Run : function(){
        test ("Callback gets called", 1, function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendDiv",{callback:function(){ok(true, "callback was called");}});
        });
        
        test ("Callback is applied to new element",3,function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendSpan",{id:"TestId",
                callback:function()
                {
                    ok(this, "'this' is defined");
                    ok($(this).is("Span"),"New element is of correct type");
                    equal($(this).attr("Id"),"TestId", "The Id is correct");
                }});
        });
        
        test ("Callback is applied to raw DOM element (not jQuery object)", function(){
            var $fixture = $("#qunit-fixture");
            $fixture.Dominion("appendSpan",{callback:function()
                {
                    ok(!(this instanceof jQuery), "Was not a jQuery object");
                }});
        });
    }
};

test ("Constant values exist", function(){
    ok(Dominion,"Dominion is defined");
    ok(Dominion.FunctionNames,"Dominion.FunctionNames is defined");
    ok(Dominion.FunctionNames.AppendTextBox,"Dominion.FunctionNames.AppendTextBox is defined");
    ok(Dominion.FunctionNames.AppendSelect,"Dominion.FunctionNames.AppendSelect is defined");
    ok(Dominion.FunctionNames.AppendElement,"Dominion.FunctionNames.AppendElement is defined");
    ok(Dominion.FunctionNames.AppendOption,"Dominion.FunctionNames.AppendOption is defined");
    ok(Dominion.FunctionNames.AppendDiv,"Dominion.FunctionNames.AppendDiv is defined");
    ok(Dominion.FunctionNames.AppendSpan,"Dominion.FunctionNames.AppendSpan is defined");
    ok(Dominion.FunctionNames.AppendLineBreak,"Dominion.FunctionNames.AppendLineBreak is defined");
});

test ("All functions get promoted", function(){
    var $fixture = $("#qunit-fixture");
    $.Dominion ({ promoteFunctions: true });
    for(var idx in Dominion.FunctionNames){
        var functionName = Dominion.FunctionNames[idx]
        equal(typeof($fixture[functionName]),"function", functionName  + "is a first class jQuery method");
    }
});

for (var testSpace in Dominion.Tests){
    module(testSpace);
    Dominion.Tests[testSpace].Run();
}




















































