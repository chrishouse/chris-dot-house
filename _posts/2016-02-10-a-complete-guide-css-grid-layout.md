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

###Properties for the Grid Container

<section class="grid-terms">
	<div class="grid-properties">
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
		<p>Note: <code class="highlighter-rouge">column</code>, <code class="highlighter-rouge">float</code>, <code class="highlighter-rouge">clear</code>, and <code class="highlighter-rouge">vertical-align</code> have no effect on a grid container.</p>			
	</div>

	<div class="grid-properties">
		<h4>grid-template-columns<br />grid-template-rows</h4>
		<p>Defines the columns and rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line.</p>
		<h5>Values:</h5>
		<ul class="values-list">
			<li><b>&lt;number&gt;</b> - can be a length, a percentage, or a fraction of the free space in the grid (using the <b>fr</b> unit)</li>
			<li><b>&lt;name&gt;</b> - an arbitrary name of your choosing</li>
		</ul>
{% highlight css %}
.container{
  grid-template-columns: <number> <number> <number> ...;
  grid-template-rows: <number> <number> <number> ...;
}
{% endhighlight %}	
		<p>When you leave an empty space between the track values, the grid lines are automatically assigned numerical names. But you can choose to explicitly name them:</p>	
{% highlight css %}
.container{
  grid-template-columns: <name> <number> <name> <number> <name> <number> <name> ...;
  grid-template-rows: <name> <number> <name> <number> <name> <number> <name> ...;
}
{% endhighlight %}	

<p><b>Examples</b></p>
<p>Letting the lines get named automatically:</p>
{% highlight css %}
.container{
  grid-template-columns: 40px 50px auto 50px 40px;
  grid-template-rows: 25% 100px auto;
}
{% endhighlight %}
<img src="/assets/grid-numbers.png" alt="Grid with auto named lines">
<p>Explicitly naming the lines. Note the bracket syntax for the line names:</p>
{% highlight css %}
.container{
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100% [third-line] auto [last-line];
}
{% endhighlight %}
<img src="/assets/grid-names.png" alt="Grid with user named lines">
	<p>Note that a line can have more than one name. For example:</p>
{% highlight css %}
.container{
  grid-template-rows: [row1-start] 25% [row1-end row2-start] 25% [row2-end];
}
{% endhighlight %}	
	<p>The second line will have two names: row1-end and row2-start.</p>
	</div>	

	<div class="grid-properties">
		<h4>grid-template-areas</h4>
		<p>Defines a grid template by referencing the names of the grid areas which are specified with the <code class="hilighting-rouge">grid-area</code> property. Repeating the name of a grid area causes the content to span those cells. A period signifies an empty cell. The syntax itself provides a visualization of the structure of the grid.</p>	
		<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>&lt;grid-area-name&gt;</b> - the name of a grid area specified with <code class="hilighting-rouge">grid-area</code></li>
			<li><b>.</b> - a period signifies an empty grid cell</li>
			<li><b>none</b> - no grid areas are defined</li>
		</ul>
{% highlight css %}
.container{
  grid-template-areas: "<grid-area-name> | . | none | ..."
                       "..."
}
{% endhighlight %}			
		<p><b>Example:</b></p>	
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
  grid-template-areas: "header header header header"
                       "main main . sidebar"
                       "footer footer footer footer"
}
{% endhighlight %}	
	<p>That'll create a grid that's four columns wide by three rows tall. The entire top row will be comprised of the <b>header</b> area. The middle row will be comprised of two <b>main</b> areas, one empty cell, and one <b>sidebar</b> area. The last row is all <b>footer</b>.</p>
	<img src="/assets/grid-template-areas.png" alt="Example of grid-template-areas">
	<p>Each row in your declaration needs to have the same number of cells.</p>
	<p>You can use any number of adjacent periods to declare a single empty cell. As long as the periods have no spaces between them they represent a single cell.</p>
	<p>Notice that you're not naming lines with this syntax, just areas. When you use this syntax the lines on either end of the areas are actually getting named automatically. If the name of your grid area is <b><em>foo</em></b>, the name of the area's starting row line and starting column line will be <b><em>foo</em>-start</b>, and the name of its last row line and last column line will be <b><em>foo</em>-end</b>. This means that some lines might have multiple names, such as the far left line in the above example, which will have three names: header-start, main-start, and footer-start.</p>
	</div>

	<div class="grid-properties">
		<h4>grid-template</h4>
		<p>A shorthand for setting <code class="highlighting-rouge">grid-template-columns</code>, <code class="highlighting-rouge">grid-template-rows</code>, and <code class="highlighting-rouge">grid-template-areas</code> in a single declaration.</p>	
		<h5>Values:</h5>
		<ul class="values-list">			
			<li><b>none</b> - sets all three properties to their initial values</li>
			<li><b>subgrid</b> - sets <code class="highlighting-rouge">grid-template-rows</code> and <code class="highlighting-rouge">grid-template-columns</code> to "subgrid", and <code class="highlighting-rouge">grid-template-areas</code> to its initial value</li>
			<li><b>&lt;grid-template-columns&gt; / &lt;grid-template-rows&gt;</b> - sets <code class="highlighting-rouge">grid-template-columns</code> and <code class="highlighting-rouge">grid-template-rows</code> to the specified values, respectively, and sets <code class="highlighting-rouge">grid-template-areas</code> to "none"</li>
		</ul>
{% highlight css %}
.container{
  grid-template: none | subgrid | <grid-template-columns> / <grid-template-rows>;
{% endhighlight %}		
		<p>It also accepts a more complex but quite handy syntax for specifying all three. Here's an example:</p>	
{% highlight css %}
.container{
  grid-template: auto 50px auto /
                 [row1-start] 25px "header header header" [row1-end]
                 [row2-start] "footer footer footer" 25px [row2-end]; 
}
{% endhighlight %}	
<p>That's equivalent to this:</p>
{% highlight css %}
.container{
  grid-template-columns: auto 50px auto;
  grid-template-rows: [row1-start] 25px [row1-end row2-start] 25px [row2-end];
  grid-template-areas: "header header header"
                       "footer footer footer"; 
}
{% endhighlight %}
	</div>		
</section>

###Properties for the Grid Items
<section class="grid-terms">
	<div class="grid-properties grid-properties-item">
		<h4>grid-column-start<br />grid-column-end<br />grid-row-start<br />grid-row-end</h4>
		<p>Determines a grid item's location within the grid by referring to specific grid lines. grid-column-start/grid-row-start is the line where the item begins, and grid-column-end/grid-row-end is the line where the item ends.</p>
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
		<p><b>Examples</b></p>
{% highlight css %}
.item-a{
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start
  grid-row-end: 3
}
{% endhighlight %}
	<img src="/assets/grid-start-end-a.png" alt="Example of grid-row/column-start/end">
{% highlight css %}
.item-b{
  grid-column-start: 1;
  grid-column-end: span col4-start;
  grid-row-start: 2
  grid-row-end: span 2
}
{% endhighlight %}
	<img src="/assets/grid-start-end-b.png" alt="Example of grid-row/column-start/end">
	<p>If no grid-column-end/grid-row-end is declared, the item will span 1 track by default.</p>
	</div>

<div class="grid-properties grid-properties-item">
		<h4>grid-column<br />grid-row</h4>
		<p>Shorthand for grid-column-start + grid-column-end, and grid-row-start + grid-row-end, respectively.</p>
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
		<p><b>Example</b></p>
{% highlight css %}
.item-c{
  grid-column: 3 / span 2;
  grid row: third-line / 4;
}
{% endhighlight %}
	<img src="/assets/grid-start-end-c.png" alt="Example of grid-column/grid-row">
	<p>If no end line value is declared, the item will span 1 track by default.</p>
	</div>	

<div class="grid-properties grid-properties-item">
		<h4>grid-area</h4>
		<p>Gives an item a name so that it cab be referenced by a template created with the <code class="highlighter-rouge">grid-template-areas</code> property. Alternatively, this property can be used as an even shorter shorthand for grid-row-start + grid-column-start + grid-row-end + grid-column-end.</p>
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
		<p><b>Examples</b></p>
		<p>As a way to assign a name to the item:</p>
{% highlight css %}
.item-d{
  grid-area: header
}
{% endhighlight %}
		<p>As the short-shorthand for grid-row-start + grid-column-start + grid-row-end + grid-column-end:</p>
{% highlight css %}
.item-d{
  grid-area: 1 / col4-start / last-line / 6
}
{% endhighlight %}
	<img src="/assets/grid-start-end-d.png" alt="Example of grid-area">
	</div>	
</section>	