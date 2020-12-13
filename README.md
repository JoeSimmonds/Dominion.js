Dominion.js
===========

Maybe I'm doing it wrong but I quite often find myself building up interface elements in code, which even in jQuery can be tiresome.  To help me out I put together a little library that I have pretentiously named Dominion.js.  For those that are interested here's a quick overview of what's in version 1.

Dominion is simple and really is just a wrapper for jQuery's own append function the first thing you will need is an element to put your new stuff into.  Dominion is a jQuery plugin so it's called in the normal jQuery way with the plugin name and the method name in a string as the first parameter.

```javascript
$("#stuff").Dominion("appendDiv");
```

Will add a div element to the element with ID stuff. If your jQuery selector selects multiple elements then a div will be added to them all.  In a similar manner you can add Span, Line Break, Text box, Select Box and Option elements.

These calls are just shortcuts for the all powerful appendElement method which requires that you tell it which type of element to create. Like this.

```javascript
$("#stuff").Dominion("appendElement", {elementName:"div"});
```

Of course there are other options you can use. The full set of possible options is in the source comments and looks like this

```javascript
{
    elementName:"input",
    id:"elementId",
    text:"text to go inside the element",    
    attributes:{attribute1Name:"attribute1Value", attribute2Name, "attribute2Value"},
    cssClass:"cssClass1 cssClass2",
    callback:function() {}
}
```

So you can set the new element's Id; some inner text; any html attributes you like and the css classes. But the most interesting one is the callback option.  This will take a function that will be called when the new element has been created and the value of this will be the new element.  So you can use this to build up a tree of elements like this

```javascript
$("#stuff").Dominion("appendDiv", {callback:function(){
        $(this).Dominion("appendDiv",{text:"first inner Div"})
               .Dominion("appendDiv",{text:"second inner Div"});
    }});
```

I'll come out and say it now, I don't like JQuery's method calling syntax.  Making every call to your plugin be the same method and having the method name passed as a string parameter seems well ... naff and with some plugins leads to lots of the same code over and over again in your Javascript.  Don't get me wrong I understand why it's there and given the proliferation of JQuery plugins there's probably not many other options.  In Dominion I included some constants for the method names so they are no longer strings and an IDE with good intellisense should be able to help reduce typos. It looks a bit like this

```javascript
$("#stuff").Dominion(Dominion.FunctionNames.AppendDiv);
```

which is more verbose and messy than the strings were.  You could of course assign the method names to something more convenient first

```javascript
var $D = Dominion.FunctionNames;
$("#stuff").Dominion($D.AppendDiv);
```

Once I had the set of of constants I couldn't leave well alone and the next step seemed to come naturally.  I have added a function that will take each of these constants and promote them to first order jQuery methods.

```javascript
$.Dominion ({ promoteFunctions: true });
```

so rather than calling foo.Dominion("createDiv") you can just call foo.createDiv() this eliminates some of the syntactic noise that I was complaining about earlier, but could cause the name conflict problem that jQuery tries so hard to avoid.

Obviously, this being Javascript, the things I called constants earlier are not constants at all and you can change them and thus change the names of the methods in Dominion.js. If you change them before calling the promote function then your new function name will get promoted instead and this is probably the best compromise I can think of right now between not liking the jQuery method call syntax and needed, to avoid conflicts with other plugins.

```
Dominion.FunctionNames.AppendDiv = "addDiv";
    $.Dominion({ promoteFunctions: true });
    $("#stuff").addDiv({text:"hello world"});
```

I can see it on your face now, the question you've wanted to ask from around the third paragraph, "Why have you implemented just those elements and options?". Well those are just the ones I have needed so far.  I'm not sure if anybody else will find this useful so I haven't written it to be complete if there is any interest I will put in more work and finish it off, I believe we should all just get the code out there for others to see.

The syntax of building up even a moderately complex UI using this is still messy with terrible amounts of nesting and the curse of javacscript in trailing braces closings });});); I would like to add in functions that would allow the HTML to be built from a cleaner more declarative syntax.  Maybe a JSON object specification.

Being a firm believer in test driven development and a world class hypocrite I am also starting to write tests and to that end I'm looking at qUnit and Testswarm, maybe my next blog should be about that.

I'd be really grateful for any feedback, is this useful, is this silly, coud it be useful if only it did this as well.  Let me know your thoughts.  All support is gratefully received and it is criticism that can drive us to improve.