---
layout: post
title:  "Thinking About the :has() CSS Selector"
date:   2016-03-17
updated: 
author: Chris House
comments: true
tags: [css]
excerpt_separator: <!-- excerpt-end -->
---

There's a handful of really awesome new CSS Level 4 selectors on the horizon. You can read about them all in the most recent [W3C Editor's Draft](https://drafts.csswg.org/selectors-4/). I'll likely write about more of them in the future, but there's one in particular that I'd like to focus on for this post: `:has()`. All of the CSS Level 4 selectors do some pretty cool stuff, but `:has()` strikes me as having the most exciting possibilities.<!-- excerpt-end -->

`:has()` is a *functional* pseudo-class, which means it uses parentheses to take an argument. The argument it takes is a list of selectors that are descendants of the element. Here's an example:

{% highlight css %}
article:has(p){
  background-color: red;	
}
{% endhighlight %}

{% highlight html %}
<article> <!-- This article matches -->
  <p>Lorem ipsum dolor sit amet.</p>
</article>

<article> <!-- But this article doesn't -->
  <div>Vestibulum eu erat quis nibh.</div>
</article>
{% endhighlight %}

Since the first `article` *has* a `p` element, it matches the selector. We could use any type of selector inside the parentheses. As long as our element contains at least one of them, then we get a match:

{% highlight css %}
article:has(.my-class, .another-class, span){
  background-color: red;	
}
{% endhighlight %}

{% highlight html %}
<article> <!-- This article matches -->
  <section class="my-class">Lorem ipsum dolor sit amet.</p>
</article>

<article> <!-- But this article doesn't -->
  <div>Vestibulum eu erat quis nibh.</div>
</article>
{% endhighlight %}

In essence this accomplishes what many consider to be the holy grail of missing CSS selectors: the parent selector.

### More than Descendants

I previously stated that if our element *contains* one of the selector arguments, then we get a match. I phrased it that way for the sake of simplicity, but it's not totally accurate. The selectors within the parentheses don't necessarily need to be *descendants* of the element. They can be any selectors *scoped* by our element. To clarify what I mean by scope, think about this CSS:

{% highlight css %}
.main-header + span{
  color: blue;	
}
{% endhighlight %}

Here we're targeting the `span` element, which is "scoped" by the `.main-header` class selector but is not a descendant of it. 

If we wanted to target `.main-header` in a similar fashion, that's where `:has()` comes in:

{% highlight css %}
.main-header:has(+ span){
  display: block;
}
{% endhighlight %}

Here we're saying, "select all `.main-header`s that have an adjacent sibling `span` element." And now the real power of `:has()` begins to reveal itself. It's as if we're able to write our selectors in reverse, selecting the leftmost element instead of the rightmost. 

A few more examples:

`div:has(> input)` - selects all `div`s that are direct parents of `input`s

`header:has(~ #my-id)` - selects all `header` elements that are general siblings of an element with an id of `my-id`.

`.area:has(span, aside)` - selects all elements with a class of `area` that have *either* a `span` or an `aside` as descendants.

### Getting Headscratchy with :not()

`:not()` is another useful CSS Level 4 selector that works exactly as you'd expect:

{% highlight css %}
h3:not(.main-heading){
  font-weight: light;
}
{% endhighlight %}

That selects all `h3` elements that *don't* have `main-heading` as a class name.

`:not()` and `:has()` can work together to achieve some interesting results:

{% highlight css %}
footer:not(:has(div)){
  background: #eee;
}
{% endhighlight %}

This selects all `footer` elements that don't contain any `div`s.

But note the difference between that example and this one:

{% highlight css %}
footer:has(:not(div)){
  background: #eee;
}
{% endhighlight %}

Now we're selecting all footer elements that contain something that isn't a `div`. It's a subtle but important difference: in the first example the footer simply needed to not contain any `div`s, but it didn't necessarily need to contain anything. In the second example the footer must contain *something*, and that something mustn't be a `div`. Phew.


### Browser Support

<section class="browser-support">
	<div class="browser-support-cell">
		<div class="browser-support-name">Internet Explorer/Edge</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Firefox</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Chrome</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Safari</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Opera</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">iOS Safari</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Chrome for Android</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
</section>

As with many of the new CSS selectors, browser support for `:has()` is currently non-existent. But that shouldn't stop you from learning it now so that you're in on the ground floor once it's ready to use.