---
layout: post
title:  "Why CSS Custom Properties (a.k.a. CSS Variables) are Awesome"
date:   2016-03-09
updated: 
author: Chris House
comments: true
tags: [css, css custom properties]
excerpt_separator: <!-- excerpt-end -->
---

CSS custom properties (or CSS variables, as they'll likely be referred to by most people) have gained a lot of attention lately with the releases of Chrome 49 and Firefox 43, both of which support them without the need for a prefix. Rob Dodson from Google recently wrote [an excellent article on them](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care?hl=en). Like many people, my instant reaction was something like, *why would I need in-browser CSS variables if I use Sass?* But after fiddling with them for a few days I now understand that their usefulness extends beyond what Sass (or any other preprocessor) is capable of.<!-- excerpt-end -->

###How CSS Variables Work

CSS variables work much the same as the variables you're using in other languages. You make up a name, assign it a value, and then refer to that name later in your code. Here's how you do it in CSS:

{% highlight css %}
:root{
  --myColor: #bada55;	
}
.my-element{
  background-color: var(--myColor);
}
{% endhighlight %}

This will set the value of `background-color` to `#bada55`. Some important things to note:

* The variable name begins with two dashes. **This is mandatory**. Also, the name is case sensitive. `--myColor` is different from `--mycolor`.
* The variable is set on a selector, in this case the pseudo class `:root`. But it can be any element that's a parent of the elements that will use the variable. `html` would work pretty well too if you want your variable global.
* The way you call the variable is with the `var()` function.

###Stop Thinking About Sass

I know you still are. Let me show you why you need to start looking at CSS variables as a whole new beast. Think about this example:

{% highlight css %}
*{
  width: var(--myWidth);	
}
#element{
  --myWidth: 32px;	
}
.widget{
  --myWidth: 25%;	
}
section{
  --myWidth: 50%
}
{% endhighlight %}

Every element will have its width set to `--myWidth` (via the star selector). But the value of `--myWidth` will change on a per-element basis if the element's specificity is great enough. In other words, CSS variables follow the *cascade*, which is something Sass variables don't even attempt to do.

Here's another trick CSS variables have up their sleeve:

{% highlight css %}
:root{
  --myWidth: 75%;	
}
.main-content{
  width: var(--myWidth);	
}
@media (max-width: 700px){
  :root{
    --myWidth: 100%;
  }	
}
{% endhighlight %}

Yep, you can declare variables inside of media queries. We're through the looking glass here people...

###More Cool Stuff

####Variables Within Variables

CSS variables can get their value from other variables:

{% highlight css %}
body{
  --accentColor: #666;	
  --logoColor: var(--accentColor);
}
{% endhighlight %}

####Fallback Values

The `var()` function allows you to set not only the variable, but any fallback values to use in case the variable is invalid.

{% highlight css %}
:root{
  --myFont: 'Helvetica';	
}
p{
  font-family: var(--myFont, arial, sans-serif);
}
{% endhighlight %}

####Using calc()

You can use your variables inside of the calc() function, like this:

{% highlight css %}
html{
  --spacer: 30;	
}
.widget p{
  margin-bottom: calc(var(--spacer + 10px));	
}
{% endhighlight %}

####CSS Variables in JavaScript

Perhaps what separates CSS variables from Sass variables more than anything else is the ability to work with them inside JavaScript. You can use the JavaScript methods `getPropertyValue()` and `setProperty()` to retrieve or set a CSS variable, respectively. [Rob's article](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care?hl=en) has some excellent examples.

###Browser Support

This is always the bummer part. But fortunately things aren't too bad for CSS variables. Chrome and Firefox are a go! And Safari 9.1 and iOS Safari 9.3 will also introduce support.

<section class="browser-support">
	<div class="browser-support-cell">
		<div class="browser-support-name">Internet Explorer/Edge</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Firefox</div>
		<div class="browser-support-info yes">43+</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Chrome</div>
		<div class="browser-support-info yes">49+ (48 behind flag)</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Safari</div>
		<div class="browser-support-info yes">9.1+</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Opera</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">iOS Safari</div>
		<div class="browser-support-info yes">9.3+</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Chrome for Android</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
</section>

###Conclusion

I hope you can see how incredibly useful CSS variables are. I also hope you see that CSS variables and Sass variables are definitely *not* in some sort of battle for dominance. Their functionality barely overlaps, and you'll likely find that they fit nicely side-by-side in your web toolbox. Start using them today. If you need to support IE/Edge you'll need to use caution, but it shouldn't be too tricky to concoct a workable fallback.  