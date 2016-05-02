---
layout: post
title:  "Misconceptions I Once Had About JavaScript"
date:   2016-05-01
updated: 
author: Chris House
comments: true
tags: [javascript]
excerpt_separator: <!-- excerpt-end -->
---

By "once" I mean very recently, like until three weeks ago when I read Kyle Simpson's [*You Don't Know JavaScript*](https://github.com/getify/You-Dont-Know-JS) series. In the books he takes a no-nonsense approach to diving deep into the inner workings of JavaScript, along the way laying to rest some common misconceptions about the language. I was enlightened. I want to share some of his myth busts which I found most interesting and helpful. <!-- excerpt-end -->

### Stuff I Had Wrong

#### JavaScript is an Interpreted Language

JavaScript is very commonly labeled a "dynamic, interpreted language". An interpreted language is one in which the code is translated line by line every time the program is run. This is different from a compiled language, where the code is translated ahead of time and what runs is pre-compiled code. Since the browser runs our JavaScript code without us needing to compile it first, most people consider it to be an interpreted language. But the truth is that it's actually compiled.

JavaScript engines actually perform the same compilation steps as other languages traditionally labeled as compiled. These steps - tokenizing, parsing and code generation - are all performed *before* the program is executed. The main differences, and the reason JS is often considered interpreted instead of compiled, is that this compilation happens in such close conjunction with the final execution that the two phases are seamless. It all happens by the JS engine mere milliseconds before our program runs.

Admittedly this seems like a fairly negligible distinction in terms of practicality. But if you're concerned about technical accuracy in the way you describe things, then it's an important distinction to make.

#### The "this" Identifier Refers to the Function Itself

I had always thought that `this` refers to the function in which it lives. But that's not how it works. As Kyle explains it, `this` "usually points to an `object`. But which `object` it points to depends on how the function was called." I'll take his examples straight from the book because they do most of the explaining:

{% highlight javascript %}
function foo() {
  console.log( this.bar );    	
}

var bar = "global";

var obj1 = {
 bar: "obj1",
 foo: foo	
};

var obj2 = {
 bar: "obj2"	
};

foo();            // "global" (or undefined in strict mode)
obj1.foo();       // "obj1"
foo.call( obj2 ); // "obj2"
new foo();        // undefined

{% endhighlight %}

The four techniques shown here demonstrate the four rules that determine what `this` refers to. It's all about how the function was called.

#### "===" Checks for Type Equality

Equality comparisons are one of the first things taught to people learning JavaScript (or most any language). I, like many people, was taught that `==` checks for equality of the value only, while `===` checks for equality of both the value and *type*. `42 == "42" //true`, but `42 === "42" //false`. But this isn't actually what's going on. While it's true that `42 === "42"` is false, it's not because the `===` is checking for type; it's because `===` is checking for value equality without *coercion* allowed. 

Coercion is the process of converting from one type to another. When you use the `==` comparison with different types - like `42` (a number) and `"42"` (a string) - JS sees that they're different types and begins coercing one or both values until the types match. But when you use `===` to compare two values of different types, this coercion step never occurs. Thus it should be thought of that `==` checks for value equality with coercion allowed, and `===` checks for value equality *without* coercion allowed.  

Is this splitting hairs? Possibly. But again, I find it valuable to truly understand what's happening with my code and to be able to describe it accurately. Saying that `===` checks for "type equality" is a technical mis-characterization which I'm glad has been set straight for me.

#### Two Arrays with the Same Contents Are == Equal

They are, in fact, NOT equal:

{% highlight javascript %}
var a = [1,2,3];
var b = [1,2,3];

a == b  // false
{% endhighlight %}

Despite that fact that the values of both `a` and `b` are arrays with the same contents, they are still *references* to different arrays. And that's the key - we're not comparing two sets of contents, we're checking if two `objects` are the same object. Obviously `a` is different than `b`, so they're not equal.

Some of you may be saying "duh" on this one, but it just never occurred to me.

#### NaN !== NaN is a JavaScript Bug

{% highlight javascript %}
console.log(NaN === NaN);  // false
{% endhighlight %}

This should be `true`, right? Nope, not really. A lot of people consider this a quirk, or worse a bug, of JavaScript. But when you think about what you're comparing it couldn't be any other way. The `NaN` property is a symbol, similar to infinity, that describes a concept rather than a value. More specifically, it describes what something *isn't* (not-a-number), rather than what something *is*. If value A isn't a number and value B isn't a number, is value A necessarily equal to value B? Of course not.

There are some behaviors of JS that are legit quirks ( `typeof(null);  // "object"` what? ), but this isn't one of them. 