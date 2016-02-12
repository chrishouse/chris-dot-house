---
layout: post
title:  "A Complete Guide to CSS Grid Layout"
date:   2016-02-10 09:03:54 -0600
author: Chris House
excerpt: "<p>CSS Grid Layout (aka “Grid”), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it’s never done a very good job of it. First we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it’s intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we’ve all been hacking our way around for as long as we’ve been making websites.</p>"
---

<h3 class="collapsible-control collapsed">Introduction</h3>

<div class="collapsible-section">
	<p>There are two primary things that inspired me to create this guide. The first is Rachel Andrew's awesome book <a href="http://abookapart.com/products/get-ready-for-css-grid-layout">Get Ready for CSS Grid Layout.</a> It's a thorough, clear introduction to Grid and is the basis of this entire article. I <em>highly</em> encourage you to buy it and read it.</p>

	<p>My other big inspiration is Chris Coyier's <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">A Complete Guide to Flexbox</a>, which has been my go-to resource for everything flexbox. It's helped a ton of people, evident by the fact that it's the top result when you Google "flexbox." You'll notice many similarities between his post and mine, because why not steal from the best?</p>
</div>

<h3 class="collapsible-control collapsed">Background and Browser Support</h3>

<div class="collapsible-section">
	<p>CSS Grid Layout (aka "Grid"), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it's never done a very good job of it. First we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it's intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we've all been hacking our way around for as long as we've been making websites.</p>

	<p>An important thing to understand about Grid is that it's not ready to be used in production yet. It's currently a <a href="https://www.w3.org/TR/css-grid-1/">W3C Working Draft</a> and isn't supported correctly in any browsers yet by default. Internet Explorer 10 and 11 support it, but it's an old implementation with an outdated syntax. In order to experiment with Grid today, your best bet is to use Chrome, Opera or Firefox with special flags enabled. In Chrome, navigate to <a href="chrome://flags/#enable-experimental-web-platform-features">chrome://flags</a> and enable "experimental web platform features". That method also works in Opera (<a href="opera://flags/#enable-experimental-web-platform-features">opera://flags</a>). In Firefox, enable the <b>layout.css.grid.enabled</b> flag.</p>

Here's a browser support table which I'll keep up-to-date:

<section class="browser-support">
	<div class="browser-support-cell">
		<div class="browser-support-name">Internet Explorer/Edge</div>
		<div class="browser-support-info partial">10+ (Old Syntax)</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Firefox</div>
		<div class="browser-support-info flagged">40+ (Behind Flag)</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Chrome</div>
		<div class="browser-support-info flagged">29+ (Behind Flag)</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Safari</div>
		<div class="browser-support-info no">Not Supported</div>
	</div>
	<div class="browser-support-cell">
		<div class="browser-support-name">Opera</div>
		<div class="browser-support-info flagged">28+ (Behind Flag)</div>
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

<p>It's only a matter of time before you can use Grid in production. But the time to learn it is now.</p>
</div>

<h3 class="collapsible-control collapsed">Important Terminology</h3>
<div class="collapsible-section">
	<p>Before diving into the concepts of Grid it's important to understand the terminology. Since the terms involved here are all kinda conceptually similar, it's easy to confuse them with one another if you don't first memorize their meanings defined by the Grid specification. But don't worry, there aren't many of them.</p>

	<section class="grid-terms">
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Container</h4>
				<span>The element on which <code class="highlighter-rouge">display: grid</code> is applied. It's the direct parent of all the grid items. In this example <code class="highlighter-rouge">container</code> is the grid container.</span>
			</div>
			<div class="grid-terms-diagram">
{% highlight html %}
<div class="container">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
</div>
{% endhighlight %}
			</div>
		</div>
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Item</h4>
				<span>The children (e.g. <em>direct</em> descendants) of the grid container. Here the <code class="highlighter-rouge">item</code> elements are grid items, but <code class="highlighter-rouge">sub-item</code> isn't.</span>
			</div>
			<div class="grid-terms-diagram">
{% highlight html %}
<div class="container">
  <div class="item"></div> 
  <div class="item">
  	<p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
{% endhighlight %}				
			</div>
		</div>		
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Line</h4>
				<p>The dividing lines that make up the structure of the grid. They can be either vertical ("column grid lines") or horizontal ("row grid lines") and reside on either side of a row or column. Here the yellow line is an example of a column grid line.</p>
			</div>
			<div class="grid-terms-diagram">
				<div class="grid-diagram grid-diagram-line">
					<div class="cell-1"></div>
					<div class="cell-2"></div>
					<div class="cell-3"></div>
					<div class="cell-4"></div>
					<div class="cell-5"></div>
					<div class="cell-6"></div>
				</div>
			</div>
		</div>
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Track</h4>
				<p>The space between two adjacent grid lines. You can think of them like the columns or rows of the grid. Here's the grid track between the second and third row grid lines.</p>
			</div>
			<div class="grid-terms-diagram">
				<div class="grid-diagram grid-diagram-track">
					<div class="cell-1"></div>
					<div class="cell-2"></div>
					<div class="cell-3"></div>
					<div class="cell-4"></div>
					<div class="cell-5"></div>
					<div class="cell-6"></div>
				</div>
			</div>
		</div>
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Cell</h4>
				<p>The space between two adjacent row and two adjacent column grid lines. It's a single "unit" of the grid. Here's the grid cell between row grid lines 1 and 2, and column grid lines 2 and 3.</p>
			</div>
			<div class="grid-terms-diagram">
				<div class="grid-diagram grid-diagram-cell">
					<div class="cell-1"></div>
					<div class="cell-2"></div>
					<div class="cell-3"></div>
					<div class="cell-4"></div>
					<div class="cell-5"></div>
					<div class="cell-6"></div>
				</div>				
			</div>
		</div>
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Area</h4>
				<p>The total space surrounded by four grid lines. A grid area may be comprised of any number of grid cells. Here's the grid area between row grid lines 1 and 3, and column grid lines 1 and 3.</p>
			</div>
			<div class="grid-terms-diagram">
				<div class="grid-diagram grid-diagram-area">
					<div class="cell-1"></div>
					<div class="cell-2"></div>
					<div class="cell-3"></div>
					<div class="cell-4"></div>
					<div class="cell-5"></div>
					<div class="cell-6"></div>
				</div>				
			</div>
		</div>
	</section>
</div>