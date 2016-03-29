---
layout: post
title:  "A Complete Guide to CSS Grid Layout"
date:   2016-03-04
author: Chris House
tags: [css, css grid]
comments: true
excerpt: "<p>CSS Grid Layout (aka “Grid”), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it’s never done a very good job of it. First we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it’s intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we’ve all been hacking our way around for as long as we’ve been making websites.</p>"
---

<h3 class="collapsible-control collapsed">Introduction</h3>

<div class="collapsible-section">
	<p>CSS Grid Layout (aka "Grid"), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it's never done a very good job of it. First we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it's intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we've all been hacking our way around for as long as we've been making websites.</p>

	<p>There are two primary things that inspired me to create this guide. The first is Rachel Andrew's awesome book <a href="http://abookapart.com/products/get-ready-for-css-grid-layout">Get Ready for CSS Grid Layout.</a> It's a thorough, clear introduction to Grid and is the basis of this entire article. I <em>highly</em> encourage you to buy it and read it. My other big inspiration is Chris Coyier's <a href="https://css-tricks.com/snippets/css/a-guide-to-flexbox/">A Complete Guide to Flexbox</a>, which has been my go-to resource for everything flexbox. It's helped a ton of people, evident by the fact that it's the top result when you Google "flexbox." You'll notice many similarities between his post and mine, because why not steal from the best?</p>	

	<p>My intention with this guide is to present the Grid concepts as they exist in the very latest version of the specification. So I won't be covering the out of date IE syntax, and I'll do my best to update this guide regularly as the spec matures.</p>
</div>

<h3 id="basics" class="collapsible-control collapsed">Basics and Browser Support</h3>

<div class="collapsible-section">
	<p>Getting started with Grid is easy. You just define a container element as a grid with <a href="#prop-display"><code>display: grid</code></a>, set the column and row sizes with <a href="#prop-grid-template-columns-rows"><code>grid-template-columns</code></a> and <a href="#prop-grid-template-columns-rows"><code>grid-template-rows</code></a>, and then place its child elements into the grid with <a href="#prop-grid-column-row"><code>grid-column</code></a> and <a href="#prop-grid-column-row"><code>grid-row</code></a>. Similarly to flexbox, the source order of the grid items doesn't matter. Your CSS can place them in any order, which makes it super easy to rearrange your grid with media queries. Imagine defining the layout of your entire page, and then completely rearranging it to accommodate a different screen width all with only a couple lines of CSS. Grid is one of the most powerful CSS modules ever introduced.</p>

	<p><strong>An important thing to understand about Grid is that it's not ready to be used in production yet</strong>. It's currently a <a href="https://www.w3.org/TR/css-grid-1/">W3C Working Draft</a> and isn't supported correctly in any browsers yet by default. Internet Explorer 10 and 11 support it, but it's an old implementation with an outdated syntax. In order to experiment with Grid today, your best bet is to use Chrome, Opera or Firefox with special flags enabled. In Chrome, navigate to <a href="chrome://flags/#enable-experimental-web-platform-features">chrome://flags</a> and enable "experimental web platform features". That method also works in Opera (<a href="opera://flags/#enable-experimental-web-platform-features">opera://flags</a>). In Firefox, enable the layout.css.grid.enabled flag.</p>

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

<p>Aside from Microsoft, browser manufacturers appear to be holding off on letting Grid loose in the wild until the spec is fully cooked. This is a good thing, as it means we won't have to worry about learning multiple syntaxes.</p>

<p>It's only a matter of time before you can use Grid in production. But the time to learn it is now.</p>
</div>

<h3 class="collapsible-control collapsed">Important Terminology</h3>
<div class="collapsible-section">
	<p>Before diving into the concepts of Grid it's important to understand the terminology. Since the terms involved here are all kinda conceptually similar, it's easy to confuse them with one another if you don't first memorize their meanings defined by the Grid specification. But don't worry, there aren't many of them.</p>

	<section class="grid-terms">
		<div class="grid-term-container">
			<div class="grid-terms-term">
				<h4>Grid Container</h4>
				<span>The element on which <code>display: grid</code> is applied. It's the direct parent of all the grid items. In this example <code>container</code> is the grid container.</span>
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
				<span>The children (e.g. <em>direct</em> descendants) of the grid container. Here the <code>item</code> elements are grid items, but <code>sub-item</code> isn't.</span>
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


<h3 class="collapsible-control expanded">Grid Properties Table of Contents</h3>
<div class="props-table-of-contents-container collapsible-section">
	<div class="props-table-of-contents-left">
		<h4>Properties for the Grid Container</h4>
		<ul>
			<li><a href="#prop-display">display</a></li>
			<li><a href="#prop-grid-template-columns-rows">grid-template-columns</a></li>
			<li><a href="#prop-grid-template-columns-rows">grid-template-rows</a></li>
			<li><a href="#prop-grid-template-areas">grid-template-areas</a></li>
			<li><a href="#prop-grid-column-row-gap">grid-column-gap</a></li>
			<li><a href="#prop-grid-column-row-gap">grid-row-gap</a></li>
			<li><a href="#prop-grid-gap">grid-gap</a></li>
			<li><a href="#prop-justify-items">justify-items</a></li>
			<li><a href="#prop-align-items">align-items</a></li>
			<li><a href="#prop-justify-content">justify-content</a></li>
			<li><a href="#prop-align-content">align-content</a></li>
			<li><a href="#prop-grid-auto-columns-rows">grid-auto-columns</a></li>
			<li><a href="#prop-grid-auto-columns-rows">grid-auto-rows</a></li>
			<li><a href="#prop-grid-auto-flow">grid-auto-flow</a></li>			
			<li><a href="#prop-grid">grid</a></li>
		</ul>
	</div>
	<div class="props-table-of-contents-right">
		<h4>Properties for the Grid Items</h4>
		<ul>
			<li><a href="#prop-grid-column-row-start-end">grid-column-start</a></li>
			<li><a href="#prop-grid-column-row-start-end">grid-column-end</a></li>
			<li><a href="#prop-grid-column-row-start-end">grid-row-start</a></li>
			<li><a href="#prop-grid-column-row-start-end">grid-row-end</a></li>
			<li><a href="#prop-grid-column-row">grid-column</a></li>
			<li><a href="#prop-grid-column-row">grid-row</a></li>
			<li><a href="#prop-grid-area">grid-area</a></li>
			<li><a href="#prop-justify-self">justify-self</a></li>
			<li><a href="#prop-align-self">align-self</a></li>			
		</ul>
	</div>
</div>	


<h3 class="collapsible-control expanded">Properties for the Grid Container</h3>

<section class="grid-terms collapsible-section">
	<div id="prop-display" class="grid-properties">
		<h4>display</h4>
		<p>Defines the element as a grid container and establishes a new <em>grid formatting context</em> for its contents.</p>	
		<h5>Values:</h5>
		<ul class="values-list">
			<li><b>grid</b> - generates a block-level grid</li>
			<li><b>inline-grid</b> - generates an inline-level grid</li>
		</ul>
{% highlight css %}
.container{
  display: grid | inline-grid	
}
{% endhighlight %}			
		<p>Note: <code>column</code>, <code>float</code>, <code>clear</code>, and <code>vertical-align</code> have no effect on a grid container.</p>			
		<a class="top-link" href="#top">[top]</a>		
	</div>	

	<div id="prop-grid-template-columns-rows" class="grid-properties">
		<h4>grid-template-columns<br />grid-template-rows</h4>
		<p>Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.</p>
		<h5>Values:</h5>
		<ul class="values-list">
			<li><b>&lt;track-size&gt;</b> - can be a length, a percentage, or a fraction of the free space in the grid (using the <a href="#fr-unit"><code>fr</code></a> unit)</li>
			<li><b>&lt;line-name&gt;</b> - an arbitrary name of your choosing</li>
			<li><b>subgrid</b> - if your grid container is itself a grid item (i.e. nested grids), you can use this property to indicate that you want the sizes of its rows/columns to be taken from its parent rather than specifying its own.</li>
		</ul>
{% highlight css %}
.container{
  grid-template-columns: <track-size> ... | <line-name> <track-size> ... | subgrid;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ... | subgrid;
}
{% endhighlight %}	

<p>Examples:</p>
<p>When you leave an empty space between the track values, the grid lines are automatically assigned numerical names:</p>
{% highlight css %}
.container{
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
{% endhighlight %}
<img src="/images/grid-numbers.png" alt="Grid with auto named lines">
<p>But you can choose to explicitly name the lines. Note the bracket syntax for the line names:</p>
{% highlight css %}
.container{
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100% [third-line] auto [last-line];
}
{% endhighlight %}
<img src="/images/grid-names.png" alt="Grid with user named lines">
	<p>Note that a line can have more than one name. For example, here the second line will have two names: row1-end and row2-start:</p>
{% highlight css %}
.container{
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
{% endhighlight %}

	<p>If your definition contains repeating parts, you can use the <code>repeat()</code> notation to streamline things:</p>	
{% highlight css %}
.container{
  grid-template-columns: repeat(3, 20px [col-start]) 5%;
}
{% endhighlight %}	

<p>Which is equivalent to this:</p>

{% highlight css %}
.container{
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start] 5%;
}
{% endhighlight %}	
<p id="fr-unit">The <code>fr</code> unit allows you to set the size of a track as a fraction of the free space of the grid container. For example, this will set each item to one third the width of the grid container:</p>
{% highlight css %}
.container{
  grid-template-columns: 1fr 1fr 1fr;
}
{% endhighlight %}
<p>The free space is calculated <em>after</em> any non-flexible items. In this example the total amount of free space available to the <code>fr</code> units doesn't include the 50px:</p>
{% highlight css %}
.container{
  grid-template-columns: 1fr 50px 1fr 1fr;
}
{% endhighlight %}

	<a class="top-link" href="#top">[top]</a>	
	</div>	

	<div id="prop-grid-template-areas" class="grid-properties">
		<h4>grid-template-areas</h4>
		<p>Defines a grid template by referencing the names of the grid areas which are specified with the <a href="#prop-grid-area"><code>grid-area</code></a> property. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell. The syntax itself provides a visualization of the structure of the grid.</p>	
		<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>&lt;grid-area-name&gt;</b> - the name of a grid area specified with <a href="#prop-grid-area"><code>grid-area</code></a></li>
			<li><b>.</b> - a period signifies an empty grid cell</li>
			<li><b>none</b> - no grid areas are defined</li>
		</ul>
{% highlight css %}
.container{
  grid-template-areas: "<grid-area-name> | . | none | ..."
                       "..."
}
{% endhighlight %}			
		<p>Example:</p>	
{% highlight css %}
.item-a{
  grid-area: header;
}
.item-b{
  grid-area: main;
}
.item-c{
  grid-area: sidebar;
}
.item-d{
  grid-area: footer;
}

.container{
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas: "header header header header"
                       "main main . sidebar"
                       "footer footer footer footer"
}
{% endhighlight %}	
	<p>That'll create a grid that's four columns wide by three rows tall. The entire top row will be comprised of the <b>header</b> area. The middle row will be comprised of two <b>main</b> areas, one empty cell, and one <b>sidebar</b> area. The last row is all <b>footer</b>.</p>
	<img src="/images/grid-template-areas.png" alt="Example of grid-template-areas">
	<p>Each row in your declaration needs to have the same number of cells.</p>
	<p>You can use any number of adjacent periods to declare a single empty cell. As long as the periods have no spaces between them they represent a single cell.</p>
	<p>Notice that you're not naming lines with this syntax, just areas. When you use this syntax the lines on either end of the areas are actually getting named automatically. If the name of your grid area is <b><em>foo</em></b>, the name of the area's starting row line and starting column line will be <b><em>foo</em>-start</b>, and the name of its last row line and last column line will be <b><em>foo</em>-end</b>. This means that some lines might have multiple names, such as the far left line in the above example, which will have three names: header-start, main-start, and footer-start.</p>
	<a class="top-link" href="#top">[top]</a>	
	</div>

	<div id="prop-grid-column-row-gap" class="grid-properties">
	<h4>grid-column-gap<br />grid-row-gap</h4>
	<p>Specifies the size of the grid lines. You can think of it like setting the width of the gutters between the columns/rows.</p>
	<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>&lt;line-size&gt;</b> - a length value</li>
		</ul>
{% highlight css %}
.container{
  grid-column-gap: <line-size>;
  grid-row-gap: <line-size>;
}
{% endhighlight %}
	<p>Example:</p>
{% highlight css %}
.container{
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px;	
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
{% endhighlight %}	
	<img src="/images/grid-column-row-gap.png" alt="Example of grid-column-gap and grid-row-gap">
	<p>The gutters are only created <em>between</em> the columns/rows, not on the outer edges.</p>			

	<a class="top-link" href="#top">[top]</a>
	</div>


	<div id="prop-grid-gap" class="grid-properties">
	<h4>grid-gap</h4>
	<p>A shorthand for <a href="#prop-grid-column-row-gap"><code>grid-column-gap</code></a> + <a href="#prop-grid-column-row-gap"><code>grid-row-gap</code></a>.</p>
	<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>&lt;grid-column-gap&gt; &lt;grid-row-gap&gt;</b> - length values</li>
		</ul>
{% highlight css %}
.container{
  grid-gap: <grid-column-gap> <grid-row-gap>;
}
{% endhighlight %}
	<p>Example:</p>
{% highlight css %}
.container{
  grid-template-columns: 100px 50px 100px;
  grid-template-rows: 80px auto 80px;	
  grid-gap: 10px 15px;
}
{% endhighlight %}	
	<p>If no <a href="#prop-grid-column-row-gap"><code>grid-row-gap</code></a> is specified, it's set to the same value as <a href="#prop-grid-column-row-gap"><code>grid-column-gap</code></a></p>		

	<a class="top-link" href="#top">[top]</a>
	</div>


<div id="prop-justify-items" class="grid-properties">
	<h4>justify-items</h4>
	<p>Aligns the content inside a grid item along the <em>column</em> axis (as opposed to <a href="#prop-align-items"><code>align-items</code></a> which aligns along the <em>row</em> axis). This value applies to all grid items inside the container.</p>
	<h5>Values:</h5>
		<ul class="values-list">						
			<li><b>start</b> - aligns the content to the left end of the grid area</li>
			<li><b>end</b> - aligns the content to the right end of the grid area</li>
			<li><b>center</b> - aligns the content in the center of the grid area</li>
			<li><b>stretch</b> - fills the whole width of the grid area (this is the default)</li>
		</ul>
{% highlight css %}
.container{
  justify-items: start | end | center | stretch;
}
{% endhighlight %}
	<p>Examples:</p>
{% highlight css %}
.container{
  justify-items: start;
}
{% endhighlight %}	
	<img src="/images/grid-justify-items-start.png" alt="Example of justify-items set to start">
{% highlight css %}
.container{
  justify-items: end;
}
{% endhighlight %}	
	<img src="/images/grid-justify-items-end.png" alt="Example of justify-items set to end">
	{% highlight css %}
.container{
  justify-items: center;
}
{% endhighlight %}	
	<img src="/images/grid-justify-items-center.png" alt="Example of justify-items set to center">
{% highlight css %}
.container{
  justify-items: stretch;
}
{% endhighlight %}	
	<img src="/images/grid-justify-items-stretch.png" alt="Example of justify-items set to stretch">	
	<p>This behavior can also be set on individual grid items via the <a href="#prop-justify-self"><code>justify-self</code></a> property.</p>		

	<a class="top-link" href="#top">[top]</a>
	</div>	


	<div id="prop-align-items" class="grid-properties">
	<h4>align-items</h4>
	<p>Aligns the content inside a grid item along the <em>row</em> axis (as opposed to <a href="#prop-justify-items"><code>justify-items</code></a> which aligns along the <em>column</em> axis). This value applies to all grid items inside the container.</p>
	<h5>Values:</h5>
		<ul class="values-list">						
			<li><b>start</b> - aligns the content to the top of the grid area</li>
			<li><b>end</b> - aligns the content to the bottom of the grid area</li>
			<li><b>center</b> - aligns the content in the center of the grid area</li>
			<li><b>stretch</b> - fills the whole height of the grid area (this is the default)</li>
		</ul>
{% highlight css %}
.container{
  align-items: start | end | center | stretch;
}
{% endhighlight %}
	<p>Examples:</p>
{% highlight css %}
.container{
  align-items: start;
}
{% endhighlight %}	
	<img src="/images/grid-align-items-start.png" alt="Example of align-items set to start">
{% highlight css %}
.container{
  align-items: end;
}
{% endhighlight %}	
	<img src="/images/grid-align-items-end.png" alt="Example of align-items set to end">
	{% highlight css %}
.container{
  align-items: center;
}
{% endhighlight %}	
	<img src="/images/grid-align-items-center.png" alt="Example of align-items set to center">
{% highlight css %}
.container{
  align-items: stretch;
}
{% endhighlight %}	
	<img src="/images/grid-align-items-stretch.png" alt="Example of align-items set to stretch">	
	<p>This behavior can also be set on individual grid items via the <a href="#prop-align-self"><code>align-self</code></a> property.</p>		

	<a class="top-link" href="#top">[top]</a>
	</div>


	<div id="prop-justify-content" class="grid-properties">
		<h4>justify-content</h4>
		<p>Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like <code>px</code>. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the <em>column</em> axis (as opposed to <a href="#prop-align-content"><code>align-content</code></a> which aligns the grid along the <em>row</em> axis).</p>
		<h5>Values:</h5>
		<ul class="value-list">
			<li><b>start</b> - aligns the grid to the left end of the grid container</li>
			<li><b>end</b> - aligns the grid to the right end of the grid container</li>
			<li><b>center</b> - aligns the grid in the center of the grid container</li>
			<li><b>stretch</b> - resizes the grid items to allow the grid to fill the full width of the grid container</li>
			<li><b>space-around</b> - places an even amount of space between each grid item, with half-sized spaces on the far ends</li>
			<li><b>space-between</b> - places an even amount of space between each grid item, with no space at the far ends</li>
			<li><b>space-evenly</b> - places an even amount of space between each grid item, including the far ends</li>
		</ul>
{% highlight css %}
.container{
  justify-content: start | end | center | stretch | space-around | space-between | space-evenly;	
}
{% endhighlight %}	
	<p>Examples:</p>
{% highlight css %}
.container{
  justify-content: start;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-start.png" alt="Example of justify-content set to start">
{% highlight css %}
.container{
  justify-content: end;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-end.png" alt="Example of justify-content set to end">
{% highlight css %}
.container{
  justify-content: center;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-center.png" alt="Example of justify-content set to center">
{% highlight css %}
.container{
  justify-content: stretch;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-stretch.png" alt="Example of justify-content set to stretch">
{% highlight css %}
.container{
  justify-content: space-around;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-space-around.png" alt="Example of justify-content set to space-around">
{% highlight css %}
.container{
  justify-content: space-between;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-space-between.png" alt="Example of justify-content set to space-between">
{% highlight css %}
.container{
  justify-content: space-evenly;	
}
{% endhighlight %}		
	<img src="/images/grid-justify-content-space-evenly.png" alt="Example of justify-content set to space-evenly">
	<a class="top-link" href="#top">[top]</a>								
	</div>


<div id="prop-align-content" class="grid-properties">
		<h4>align-content</h4>
		<p>Sometimes the total size of your grid might be less than the size of its grid container. This could happen if all of your grid items are sized with non-flexible units like <code>px</code>. In this case you can set the alignment of the grid within the grid container. This property aligns the grid along the <em>row</em> axis (as opposed to <a href="#prop-justify-content"><code>justify-content</code></a> which aligns the grid along the <em>column</em> axis).</p>
		<h5>Values:</h5>
		<ul class="value-list">
			<li><b>start</b> - aligns the grid to the top of the grid container</li>
			<li><b>end</b> - aligns the grid to the bottom of the grid container</li>
			<li><b>center</b> - aligns the grid in the center of the grid container</li>
			<li><b>stretch</b> - resizes the grid items to allow the grid to fill the full height of the grid container</li>
			<li><b>space-around</b> - places an even amount of space between each grid item, with half-sized spaces on the far ends</li>
			<li><b>space-between</b> - places an even amount of space between each grid item, with no space at the far ends</li>
			<li><b>space-evenly</b> - places an even amount of space between each grid item, including the far ends</li>
		</ul>
{% highlight css %}
.container{
  align-content: start | end | center | stretch | space-around | space-between | space-evenly;	
}
{% endhighlight %}	
	<p>Examples:</p>
{% highlight css %}
.container{
  align-content: start;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-start.png" alt="Example of align-content set to start">
{% highlight css %}
.container{
  align-content: end;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-end.png" alt="Example of align-content set to end">
{% highlight css %}
.container{
  align-content: center;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-center.png" alt="Example of align-content set to center">
{% highlight css %}
.container{
  align-content: stretch;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-stretch.png" alt="Example of align-content set to stretch">
{% highlight css %}
.container{
  align-content: space-around;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-space-around.png" alt="Example of align-content set to space-around">
{% highlight css %}
.container{
  align-content: space-between;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-space-between.png" alt="Example of align-content set to space-between">
{% highlight css %}
.container{
  align-content: space-evenly;	
}
{% endhighlight %}		
	<img src="/images/grid-align-content-space-evenly.png" alt="Example of align-content set to space-evenly">
	<a class="top-link" href="#top">[top]</a>								
	</div>	


	<div id="prop-grid-auto-columns-rows" class="grid-properties">
		<h4>grid-auto-columns<br />grid-auto-rows</h4>
		<p>Specifies the size of any auto-generated grid tracks (aka <em>implicit grid tracks</em>). Implicit grid tracks get created when you explicitly position rows or columns (via <a href="#prop-grid-template-columns-rows"><code>grid-template-rows</code></a>/<a href="#prop-grid-template-columns-rows"><code>grid-template-columns</code></a>) that are out of range of the defined grid.</p>	
		<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>&lt;track-size&gt;</b> - can be a length, a percentage, or a fraction of the free space in the grid (using the <a href="#fr-unit"><code>fr</code></a> unit)</li>
		</ul>
{% highlight css %}
.container{
  grid-auto-columns: <track-size> ...;
  grid-auto-rows: <track-size> ...;
}
{% endhighlight %}	
		<p>To illustrate how implicit grid tracks get created, think about this:</p>
{% highlight css %}
.container{
  grid-template-columns: 60px 60px;
  grid-template-rows: 90px 90px
}
{% endhighlight %}
<img src="/images/grid-auto.png" alt="Example of 2 x 2 grid">
<p>This creates a 2 x 2 grid.</p>
<p>But now imagine you use <a href="#prop-grid-column-row"><code>grid-column</code></a> and <a href="#prop-grid-column-row"><code>grid-row</code></a> to position your grid items like this:</p>		
{% highlight css %}
.item-a{
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.item-b{
  grid-column: 5 / 6;
  grid-row: 2 / 3;
}
{% endhighlight %}
	<img src="/images/implicit-tracks.png" alt="Example of implicit tracks">
	<p>We told .item-b to start on column line 5 and end at column line 6, <em>but we never defined a column line 5 or 6</em>. Because we referenced lines that don't exist, implicit tracks with widths of 0 are created to fill in the gaps. We can use <a href="#prop-grid-auto-columns-rows"><code>grid-auto-columns</code></a> and <a href="#prop-grid-auto-columns-rows"><code>grid-auto-rows</code></a> to specify the widths of these implicit tracks:</p>
{% highlight css %}
.container{
  grid-auto-columns: 60px;
}
{% endhighlight %}	
	<img src="/images/implicit-tracks-with-widths.png" alt="Example of implicit tracks">
	<a class="top-link" href="#top">[top]</a>	
	</div>


	<div id="prop-grid-auto-flow" class="grid-properties">
		<h4>grid-auto-flow</h4>
		<p>If you have grid items that you don't explicitly place on the grid, the <em>auto-placement algorithm</em> kicks in to automatically place the items. This property controls how the auto-placement algorithm works.</p>
		<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>row</b> - tells the auto-placement algorithm to fill in each row in turn, adding new rows as necessary</li>
			<li><b>column</b> - tells the auto-placement algorithm to fill in each column in turn, adding new columns as necessary</li>
			<li><b>dense</b> - tells the auto-placement algorithm to attempt to fill in holes earlier in the grid if smaller items come up later</li>
		</ul>
{% highlight css %}
.container{
  grid-auto-flow: row | column | row dense | column dense
}
{% endhighlight %}	
		<p>Note that <b>dense</b> might cause your items to appear out of order.</p>
		<p>Examples:</p>
		<p>Consider this HTML:</p>
{% highlight html %}
<section class="container">
    <div class="item-a">item-a</div>
    <div class="item-b">item-b</div>
    <div class="item-c">item-c</div>
    <div class="item-d">item-d</div>
    <div class="item-e">item-e</div>
</section>
{% endhighlight %}
		<p>You define a grid with five columns and two rows, and set <code>grid-auto-flow</code> to <code>row</code> (which is also the default):</p>	
{% highlight css %}
.container{
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px;
    grid-template-rows: 30px 30px;
    grid-auto-flow: row;
}
{% endhighlight %}
		<p>When placing the items on the grid, you only specify spots for two of them:</p>
{% highlight css %}
.item-a{
    grid-column: 1;
    grid-row: 1 / 3;
}
.item-e{
    grid-column: 5;
    grid-row: 1 / 3;
}
{% endhighlight %}		
		<p>Because we set <code>grid-auto-flow</code> to <code>row</code>, our grid will look like this. Notice how the three items we didn't place (<b>item-b</b>, <b>item-c</b> and <b>item-d</b>) flow across the available rows:</p>
		<img src="/images/grid-auto-flow-row.png" alt="Example of grid-auto-flow set to row">
		<p>If we instead set <code>grid-auto-flow</code> to <code>column</code>, <b>item-b</b>, <b>item-c</b> and <b>item-d</b> flow down the columns:</p>
{% highlight css %}
.container{
    display: grid;
    grid-template-columns: 60px 60px 60px 60px 60px;
    grid-template-rows: 30px 30px;
    grid-auto-flow: column;
}
{% endhighlight %}	
		<img src="/images/grid-auto-flow-column.png" alt="Example of grid-auto-flow set to column">	
		<a class="top-link" href="#top">[top]</a>	
	</div>

	<div id="prop-grid" class="grid-properties">
		<h4>grid</h4>
		<p>A shorthand for setting all of the following properties in a single declaration: <a href="#prop-grid-template-columns-rows"><code>grid-template-rows</code></a>, <a href="#prop-grid-template-columns-rows"><code>grid-template-columns</code></a>, <a href="#prop-grid-template-areas"><code>grid-template-areas</code></a>, <a href="#prop-grid-auto-columns-rows"><code>grid-auto-rows</code></a>, <a href="#prop-grid-auto-columns-rows"><code>grid-auto-columns</code></a>, and <a href="#prop-grid-auto-flow"><code>grid-auto-flow</code></a>. It also sets <a href="#prop-grid-column-row-gap"><code>grid-column-gap</code></a> and <a href="#prop-grid-column-row-gap"><code>grid-row-gap</code></a> to their initial values, even though they can't be explicitly set by this property.</p>
		<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>none</b> - sets all sub-properties to their initial values</li>
			<li><b>subgrid</b> - sets <a href="#prop-grid-template-columns-rows"><code>grid-template-rows</code></a> and <a href="#prop-grid-template-columns-rows"><code>grid-template-columns</code></a> to <code>subgrid</code>, and all other sub-properties to their initial values</li>
			<li><b>&lt;grid-template-rows&gt; / &lt;grid-template-columns&gt;</b> - sets <a href="#prop-grid-template-columns-rows"><code>grid-template-rows</code></a> and <a href="#prop-grid-template-columns-rows"><code>grid-template-columns</code></a> to the specified values, respectively, and all other sub-properties to their initial values</li>
			<li><b>&lt;grid-auto-flow&gt; [&lt;grid-auto-rows&gt; [ / &lt;grid-auto-columns&gt;] ] </b> - accepts all the same values as <a href="#prop-grid-auto-flow"><code>grid-auto-flow</code></a>, <a href="#prop-grid-auto-columns-rows"><code>grid-auto-rows</code></a> and <a href="#prop-grid-auto-columns-rows"><code>grid-auto-columns</code></a>, respectively. If <a href="#prop-grid-auto-columns-rows"><code>grid-auto-columns</code></a> is omitted, it is set to the value specified for <a href="#prop-grid-auto-columns-rows"><code>grid-auto-rows</code></a>. If both are omitted, they are set to their initial values</li>
		</ul>
{% highlight css %}
.container{
    grid: none | subgrid | <grid-template-rows> / <grid-template-columns> | <grid-auto-flow> [<grid-auto-rows> [/ <grid-auto-columns>]];
}
{% endhighlight %}			
		<p>Examples:</p>
		<p>The following two code blocks are equivalent:</p>
{% highlight css %}
.container{
    grid: 200px auto / 1fr auto 1fr;
}
{% endhighlight %}	
{% highlight css %}
.container{
    grid-template-rows: 200px auto;
    grid-template-columns: 1fr auto 1fr;
    grid-template-areas: none;
}
{% endhighlight %}
		<p>And the following two code blocks are equivalent:</p>	
{% highlight css %}
.container{
    grid: column 1fr / auto;
}
{% endhighlight %}
{% highlight css %}
.container{
    grid-auto-flow: column;
    grid-auto-rows: 1fr;
    grid-auto-columns: auto;        
}
{% endhighlight %}	

		<p>It also accepts a more complex but quite handy syntax for setting everything at once. You specify <a href="#prop-grid-template-areas"><code>grid-template-areas</code></a>, <a href="#prop-grid-auto-columns-rows"><code>grid-auto-rows</code></a> and <a href="#prop-grid-auto-columns-rows"><code>grid-auto-columns</code></a>, and all the other sub-properties are set to their initial values. What you're doing is specifying the line names and track sizes inline with their respective grid areas. This is easiest to describe with an example:</p>	
{% highlight css %}
.container{
  grid: [row1-start] "header header header" 1fr [row1-end]
        [row2-start] "footer footer footer" 25px [row2-end]; 
        / auto 50px auto
}
{% endhighlight %}	
<p>That's equivalent to this:</p>
{% highlight css %}
.container{  
  grid-template-areas: "header header header"
                       "footer footer footer"
  grid-template-rows: [row1-start] 1fr [row1-end row2-start] 25px [row2-end];
  grid-template-columns: auto 50px auto;; 
}
{% endhighlight %}


		<a class="top-link" href="#top">[top]</a>	
	</div>

</section>


<h3 class="collapsible-control expanded">Properties for the Grid Items</h3>

<section class="grid-terms collapsible-section">
	<div id="prop-grid-column-row-start-end" class="grid-properties grid-properties-item">
		<h4>grid-column-start<br />grid-column-end<br />grid-row-start<br />grid-row-end</h4>
		<p>Determines a grid item's location within the grid by referring to specific grid lines. <code>grid-column-start</code>/<code>grid-row-start</code> is the line where the item begins, and <code>grid-column-end</code>/<code>grid-row-end</code> is the line where the item ends.</p>
		<h5>Values:</h5>
		<ul class="values-list">
			<li><b>&lt;line&gt;</b> - can be a number to refer to a numbered grid line, or a name to refer to a named grid line</li>
			<li><b>span &lt;number&gt;</b> - the item will span across the provided number of grid tracks</li>
			<li><b>span &lt;name&gt;</b> - the item will span across until it hits the next line with the provided name</li>
			<li><b>auto</b> - indicates auto-placement, an automatic span, or a default span of one</li>
		</ul>
{% highlight css %}
.item{
  grid-column-start: <number> | <name> | span <number> | span <name> | auto
  grid-column-end: <number> | <name> | span <number> | span <name> | auto
  grid-row-start: <number> | <name> | span <number> | span <name> | auto
  grid-row-end: <number> | <name> | span <number> | span <name> | auto
}
{% endhighlight %}	
		<p>Examples:</p>
{% highlight css %}
.item-a{
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start
  grid-row-end: 3
}
{% endhighlight %}
	<img src="/images/grid-start-end-a.png" alt="Example of grid-row/column-start/end">
{% highlight css %}
.item-b{
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2
  grid-row-end: span 2
}
{% endhighlight %}
	<img src="/images/grid-start-end-b.png" alt="Example of grid-row/column-start/end">
	<p>If no <code>grid-column-end</code>/<code>grid-row-end</code> is declared, the item will span 1 track by default.</p>
	<p>Items can overlap each other. You can use <code>z-index</code> to control their stacking order.</p>
	<a class="top-link" href="#top">[top]</a>	
	</div>

<div id="prop-grid-column-row" class="grid-properties grid-properties-item">
		<h4>grid-column<br />grid-row</h4>
		<p>Shorthand for <a href="#prop-grid-column-row-start-end"><code>grid-column-start</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-column-end</code></a>, and <a href="#prop-grid-column-row-start-end"><code>grid-row-start</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-row-end</code></a>, respectively.</p>
		<h5>Values:</h5>
		<ul class="values-list">
			<li><b>&lt;start-line&gt; / &lt;end-line&gt;</b> - each one accepts all the same values as the longhand version, including span</li>
		</ul>
{% highlight css %}
.item{
  grid-column: <start-line> / <end-line> | <start-line> / span <value>;
  grid-row: <start-line> / <end-line> | <start-line> / span <value>;
}
{% endhighlight %}	
		<p>Example:</p>
{% highlight css %}
.item-c{
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}
{% endhighlight %}
	<img src="/images/grid-start-end-c.png" alt="Example of grid-column/grid-row">
	<p>If no end line value is declared, the item will span 1 track by default.</p>
	<a class="top-link" href="#top">[top]</a>	
	</div>	

<div id="prop-grid-area" class="grid-properties grid-properties-item">
		<h4>grid-area</h4>
		<p>Gives an item a name so that it can be referenced by a template created with the <a href="#prop-grid-template-areas"><code>grid-template-areas</code></a> property. Alternatively, this property can be used as an even shorter shorthand for <a href="#prop-grid-column-row-start-end"><code>grid-row-start</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-column-start</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-row-end</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-column-end</code></a>.</p>
		<h5>Values:</h5>
		<ul class="values-list">
			<li><b>&lt;name&gt;</b> - a name of your choosing</li>
			<li><b>&lt;row-start&gt; / &lt;column-start&gt; / &lt;row-end&gt; / &lt;column-end&gt;</b> - can be numbers or named lines</li>
		</ul>
{% highlight css %}
.item{
  grid-area: <name> | <row-start> / <column-start> / <row-end> / <column-end>;
}
{% endhighlight %}	
		<p>Examples:</p>
		<p>As a way to assign a name to the item:</p>
{% highlight css %}
.item-d{
  grid-area: header
}
{% endhighlight %}
		<p>As the short-shorthand for <a href="#prop-grid-column-row-start-end"><code>grid-row-start</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-column-start</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-row-end</code></a> + <a href="#prop-grid-column-row-start-end"><code>grid-column-end</code></a>:</p>
{% highlight css %}
.item-d{
  grid-area: 1 / col4-start / last-line / 6
}
{% endhighlight %}
	<img src="/images/grid-start-end-d.png" alt="Example of grid-area">
	<a class="top-link" href="#top">[top]</a>	
	</div>


<div id="prop-justify-self" class="grid-properties grid-properties-item">
	<h4>justify-self</h4>
	<p>Aligns the content inside a grid item along the <em>column</em> axis (as opposed to <a href="#prop-align-self"><code>align-self</code></a> which aligns along the <em>row</em> axis). This value applies to the content inside a single grid item.</p>
	<h5>Values:</h5>
		<ul class="values-list">						
			<li><b>start</b> - aligns the content to the left end of the grid area</li>
			<li><b>end</b> - aligns the content to the right end of the grid area</li>
			<li><b>center</b> - aligns the content in the center of the grid area</li>
			<li><b>stretch</b> - fills the whole width of the grid area (this is the default)</li>
		</ul>
{% highlight css %}
.item{
  justify-self: start | end | center | stretch;
}
{% endhighlight %}
	<p>Examples:</p>
{% highlight css %}
.item-a{
  justify-self: start;
}
{% endhighlight %}	
	<img src="/images/grid-justify-self-start.png" alt="Example of justify-self set to start">
{% highlight css %}
.item-a{
  justify-self: end;
}
{% endhighlight %}	
	<img src="/images/grid-justify-self-end.png" alt="Example of justify-self set to end">
	{% highlight css %}
.item-a{
  justify-self: center;
}
{% endhighlight %}	
	<img src="/images/grid-justify-self-center.png" alt="Example of justify-self set to center">
{% highlight css %}
.item-a{
  justify-self: stretch;
}
{% endhighlight %}	
	<img src="/images/grid-justify-self-stretch.png" alt="Example of justify-self set to stretch">	
	<p>To set alignment for <em>all</em> the items in a grid, this behavior can also be set on the grid container via the <a href="#prop-justify-items"><code>justify-items</code></a> property.</p>		

	<a class="top-link" href="#top">[top]</a>
	</div>	


<div id="prop-align-self" class="grid-properties grid-properties-item">
	<h4>align-self</h4>
	<p>Aligns the content inside a grid item along the <em>row</em> axis (as opposed to <a href="#prop-justify-self"><code>justify-self</code></a> which aligns along the <em>column</em> axis). This value applies to the content inside a single grid item.</p>
	<h5>Values:</h5>
		<ul class="values-list">						
			<li><b>start</b> - aligns the content to the top of the grid area</li>
			<li><b>end</b> - aligns the content to the bottom of the grid area</li>
			<li><b>center</b> - aligns the content in the center of the grid area</li>
			<li><b>stretch</b> - fills the whole height of the grid area (this is the default)</li>
		</ul>
{% highlight css %}
.item{
  align-self: start | end | center | stretch;
}
{% endhighlight %}
	<p>Examples:</p>
{% highlight css %}
.item-a{
  align-self: start;
}
{% endhighlight %}	
	<img src="/images/grid-align-self-start.png" alt="Example of align-self set to start">
{% highlight css %}
.item-a{
  align-self: end;
}
{% endhighlight %}	
	<img src="/images/grid-align-self-end.png" alt="Example of align-self set to end">
	{% highlight css %}
.item-a{
  align-self: center;
}
{% endhighlight %}	
	<img src="/images/grid-align-self-center.png" alt="Example of align-self set to center">
{% highlight css %}
.item-a{
  align-self: stretch;
}
{% endhighlight %}	
	<img src="/images/grid-align-self-stretch.png" alt="Example of align-self set to stretch">	
	<p>To align <em>all</em> the items in a grid, this behavior can also be set on the grid container via the <a href="#prop-align-items"><code>align-items</code></a> property.</p>		

	<a class="top-link" href="#top">[top]</a>
	</div>

</section>