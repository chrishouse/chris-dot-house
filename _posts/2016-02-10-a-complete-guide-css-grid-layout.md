---
layout: post
title:  "A Complete Guide to CSS Grid Layout"
date:   2016-02-10 09:03:54 -0600
author: Chris House
categories: css
tags: css
excerpt_separator: end-excerpt
---

There are two primary things that inspired me to create this guide. The first is Rachel Andrew's awesome book [Get Ready for CSS Grid Layout](http://abookapart.com/products/get-ready-for-css-grid-layout). It's a thorough, clear introduction to Grid and is the basis of this entire article. I _highly_ encourage you to buy it and read it.

My other big inspiration is Chris Coyier's [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/), which has been my go-to resource for everything flexbox. It's helped a ton of people, evident by the fact that it's the top result when you Google "flexbox." You'll notice many similarities between his post and mine, because why not steal from the best? end-excerpt

###Background and Browser Support

CSS Grid Layout (aka "Grid"), is a two-dimensional grid-based layout system that aims to do nothing less than completely change the way we design grid-based user interfaces. CSS has always been used to lay out our web pages, but it's never done a very good job of it. First we used tables, then floats, positioning and inline-block, but all of these methods were essentially hacks and left out a lot of important functionality (vertical centering, for instance). Flexbox helped out, but it's intended for simpler one-dimensional layouts, not complex two-dimensional ones (Flexbox and Grid actually work very well together). Grid is the very first CSS module created specifically to solve the layout problems we've all been hacking our way around for as long as we've been making websites.

An important thing to understand about Grid is that it's not ready to be used in production yet. It's currently a [W3C Working Draft](https://www.w3.org/TR/css-grid-1/) and isn't supported correctly in any browsers yet by default. Internet Explorer 10 and 11 support it, but it's an old implementation with an outdated syntax. In order to experiment with Grid today, your best bet is to use Chrome, Opera or Firefox with special flags enabled. In Chrome, navigate to [chrome://flags](chrome://flags/#enable-experimental-web-platform-features) and enable "experimental web platform features". That method also works in Opera ([opera://flags](opera://flags/#enable-experimental-web-platform-features)). In Firefox, enable the **layout.css.grid.enabled** flag.

Here's a browser support table which I'll keep up-to-date:
<table class="browser-support">
	<tr class="browser-support-header">
		<th>Internet Explorer/Edge</th>
		<th>Firefox</th>
		<th>Chrome</th>
		<th>Safari</th>
		<th>Opera</th>
		<th>iOS Safari</th>
		<th>Chrome for Android</th>
	</tr>
	<tr class="browser-support-cell">
		<td class="partial">10+ (Outdated Syntax)</td>
		<td class="flagged">40+ (Behind Flag)</td>
		<td class="flagged">29+ (Behind Flag)</td>
		<td class="no">Not Supported</td>
		<td class="flagged">28+ (Behind Flag)</td>
		<td class="no">Not Supported</td>
		<td class="no">Not Supported</td>
	</tr>
</table>

It's only a matter of time before you can use Grid in production. But the time to learn it is now.

###Important Terminology