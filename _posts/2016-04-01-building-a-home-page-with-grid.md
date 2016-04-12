---
layout: post
title:  "Building a Home Page with Grid"
date:   2016-04-12
updated: 
author: Chris House
comments: true
tags: [css, css grid]
excerpt_separator: <!-- excerpt-end -->
---

When I begin a project and start planning how to lay out the home page, my brain jumps to floats and positioning. Some of you might go with Bootstrap or another framework. This is because it's the year 2016 and that's still how we do things. But I'd like to do some mental time traveling. Let's pretend it's the year 2018 and the CSS Grid Layout module is supported by all major browsers. Our page layout paradigm has shifted completely, and CSS capabilities are finally in harmony with our design goals. It's a great time to be a web developer. Let's create a home page using our awesome new tool.<!-- excerpt-end -->

### The Design

Here's the page we'll be creating:

![Complete Design](/images/grid-page-complete.jpg)

Before we actually start coding we need to get into the grid mindset. The first step is to look at our design and divide it into major grid components. Here's how I've chosen to do it for this design:

![Complete Design Highlighted](/images/grid-page-highlight.jpg)

You can see we're working with seven top-level grid areas. I say "top-level" because we're able to nest grids, which is exactly what we'll be doing with the `hero` section:

![Hero Highlighted](/images/grid-page-hero-highlight.jpg)

### The HTML

Here's the basic structure of the HTML. I'll show the entire completed file later, but for now I've left out most of the minutia. The important parts to take note of here are the seven elements that are direct descendants of `body`: `top-bar`, `main-header`, `hero`, `blog-posts`, `news`, `side-bar` and `main-footer`. `body` is going to be our grid container and its children will be the grid items.

As I mentioned, we'll also be setting `hero` as a grid container. It has two children which will be grid items: `message` and `award`.

{% highlight html %}
<body>

  <header class="top-bar">
    <!-- social links and contact info -->
  </header>

  <header class="main-header">
    <!-- logo and main navigation -->
  </header>

  <section class="hero">
    <div class="message">
      <!-- circular element -->
    </div>
    <div class="award">    
      <!-- award image and quote -->			
    </div>
  </section>

  <section class="blog-posts">
    <!-- blog posts and excerpts -->
  </section>

  <section class="news">
    <!-- news headlines and excerpts -->
  </section>

  <aside class="side-bar">
    <!-- critter of the month info -->
  </aside>

  <footer class="main-footer">
    <!-- footer menu and copyright -->
  </footer>

</body>  
{% endhighlight %} 

### The CSS

Alright, let's do this. As we go along I'm not going to show all the CSS used to style our elements. At the end I'll show the entire completed file, but for now we'll only focus on the juicy grid stuff and any styling directly related to it.

Let's start by defining the main grid on `body`:

{% highlight css %}
body{
  display: grid;
  grid-template-columns: 12% auto 400px 12%;
  grid-template-rows: auto auto 950px auto auto auto;
}

{% endhighlight %}

We've just created a grid that's four columns wide by six rows high. The first and last columns will act as padding on either side of the main content. I set the third column to 400px because that's where we'll be placing the `side-bar` element, and we want that to be a fixed width. The `hero` element (the third row) will have a fixed height of 950px.

Now let's define which grid area will go where using `grid-template-areas`. This is the really fun part:

{% highlight css %}
body{
  display: grid;
  grid-template-columns: 12% auto 400px 12%;
  grid-template-rows: auto auto 950px auto auto auto;
  grid-template-areas: "top-bar     top-bar     top-bar     top-bar"
                       "main-header main-header main-header main-header"
                       "hero        hero        hero        hero"
                       ".           blog-posts  side-bar    ."
                       ".           news        side-bar    ."
                       "main-footer main-footer main-footer main-footer";  
}
{% endhighlight %}

`grid-template-areas` lets us place our elements wherever we want, and it gives us a nice visualization of how it'll all look. Remember that the values used here ("top-bar", "main-header", "hero", etc.) aren't referring to the class names of those elements, but rather to the names we give them with the `grid-area` property, which we'll do in a moment.

When a grid area name is repeated, that element will span across those columns/rows. For instance, `top-bar` spans across all four columns, and `side-bar` spans down rows four and five. The periods represent empty cells. If you refer to the complete design back at the top, you'll see how this definition matches our grid pattern.

Assuming we've applied all of our styling but haven't yet assigned grid area names to our grid items, right now our page is looking pretty funky:

![Grid Page Broken](/images/grid-page-broken.jpg)

Until we assign grid area names to the grid items, the grid is going to automatically place our elements in the grid based on their source order. Obviously this isn't what we want. In order for our layout to work as expected we need to define our grid areas. So let's go ahead and do that:

{% highlight css %}
.top-bar{
  grid-area: top-bar;
}	
.main-header{
  grid-area: main-header;
}	
.hero{
  grid-area: hero;
}
.blog-posts{
  grid-area: blog-posts;
}
.news{
  grid-area: news;
}
.side-bar{
  grid-area: side-bar;
}
.main-footer{
  grid-area: main-footer;
}
{% endhighlight %}	

Remember that these names can be anything you want. I chose to have them match the class names purely for convenience. 

Now that we've assigned grid area names to our grid items, they'll fall into place on our grid. This single step makes a world of difference:

![Grid Page Fixed](/images/grid-page-fixed.jpg)

With the exception of the items in the `hero` section, everything is laying out exactly like it should. We're almost finished. 

But before we fix the `hero` section, I want to explain something that might not be totally clear: the padding on either side of the main content. As a reminder, we sized our columns like this:

{% highlight css %}
body{
  grid-template-columns: 12% auto 400px 12%;
}
{% endhighlight %}

The two columns set to 12% are used for padding around the main content, *but they're only utilized for the fourth and fifth rows*. As you recall, we told our `top-bar`, `main-header`, `hero` and `main-footer` elements to span across all the columns, including these two "padding" columns. Why did we do this? Because we want the backgrounds of these elements to span 100% of the viewport width with no white space on either side. We only want white space around the `blog-post`/`news` and `sidebar` elements (rows four and five).

In order to stretch our elements across the full width of the grid while still maintaining padding on either side of the content, we need to explicitly set padding on those elements:

{% highlight css %}
.top-bar{
  padding: 4px 12%;	
}
.main-header{
  padding: 12px 12%;
}
.hero{	
  padding: 55px 12% 0 12%;
}
.main-footer{
  padding: 25px 12%;
}
{% endhighlight %}

We chose 12% for the horizontal padding because it exactly matches the width of the first and last columns in our `grid-template-areas` definition. Now the elements that need to fill the full width will do so, and all the content has 12% of space on either side of it. Beautiful.

Okay, let's fix the `hero` section. It'll be a grid container, so we define it as a grid just like we've done before:

{% highlight css %}
.hero{
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto auto;
 }
{% endhighlight %}

It's a 3 x 3 grid with everything set to `auto` except for the middle column. We give the middle column a size of `1fr` because we want it to completely fill whatever space is left after the first and last columns are populated with stuff.

We have only two elements within `hero`: `message` and `award`. We want `message` to occupy the first column of the second row, and we want `award` to occupy the third column of the first row. So our complete grid definition should look like this:

{% highlight css %}
.hero{
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto auto;
  grid-template-areas: ".       .  award"
                       "message .  .    "
                       ".       .  .    ";  
 }
{% endhighlight %}

Then all we need to do is name our elements:

{% highlight css %}
.message{
  grid-area: message;
}
.award{
  grid-area: award;
}
{% endhighlight %}

With that, `message` and `award` snap into place and our page is complete:

![Complete Design](/images/grid-page-complete.jpg)

### Making It Responsive

CSS Grid makes it incredibly easy to rearrange your entire layout with media queries. All you do is re-place your grid items. For our design we'll keep things fairly simple and only use two breakpoints, one at 1600px and one at 1050px. There'll be a handful of minor formatting adjustments we'll need to make to some elements (padding, margin, etc.), but I won't show all of that here. I'll present the entire code at the end, for now focusing on the grid stuff.

Our 1600px breakpoint is the simpler one. It's where we'll reduce the outer padding of the site. I chose 1600px because that's right around the point where the 12% padding starts to look funny. So let's fix that. What we need to do is change the value of `grid-template-columns` on `body`, reducing the first and last columns to 2%. We'll also need to adjust the padding on our other elements to match:

{% highlight css %}
@media (max-width: 1600px) {
  body{
    grid-template-columns: 2% auto 400px 2%;
  }
  .top-bar{
    padding: 4px 2%;
  }
  .main-header{
    padding: 12px 2%;
  }
  .hero{
    padding: 55px 2% 0 2%;
  }
  .main-footer{
    padding: 25px 2%;
  }
}
{% endhighlight %}

Now for the next breakpoint. We'll be rearranging the grid items to make them lay out in a single column. As a reminder here's how our original code looked for `body`:

{% highlight css %}
body{
  display: grid;
  grid-template-columns: 12% auto 400px 12%;
  grid-template-rows: auto auto 950px auto auto auto;
  grid-template-areas: "top-bar     top-bar     top-bar     top-bar"
                       "main-header main-header main-header main-header"
                       "hero        hero        hero        hero"
                       ".           blog-posts  side-bar    ."
                       ".           news        side-bar    ."
                       "main-footer main-footer main-footer main-footer";  
}
{% endhighlight %}

And here's our new media query:

{% highlight css %}
@media (max-width: 1050px) {
  body{
    grid-template-columns: 3% auto 3%;
    grid-template-rows: auto auto auto auto auto auto auto;
    grid-template-areas: "top-bar     top-bar     top-bar"
                         "main-header main-header main-header"
                         "hero        hero        hero"
                         ".           blog-posts  ."
                         ".           news        ."
                         ".           side-bar    ."
                         "main-footer main-footer main-footer";
  }
}  
{% endhighlight %}

We've made a few important changes here: reduced the number of columns from four to three, changed the values of the first and last columns to `3%` (3% works better than 2% at the narrower widths), added an additional row, changed the length of all the rows to `auto`, and moved the side-bar to its own row. Now our page elements fit nicely at narrow widths:

![Grid Page Narrow](/images/grid-page-narrow.jpg)

### The Live Code

Here's our home page, live and working, as well as the complete HTML and CSS files. To properly view this you'll need a grid-capable browser. I suggest Chrome 49+ with the *Experimental Web Platform Features* flag enabled (browse to chrome://flags and scroll down to "Experimental Web Platform Features"). 

The embedded page below will appear in mobile view by default, so be sure to click "Edit on Codepen" to see the page at full width:

<p data-height="268" data-theme-id="0" data-slug-hash="dMdKqw" data-default-tab="result" data-user="chrishouse" class="codepen">See the Pen <a href="http://codepen.io/chrishouse/pen/dMdKqw/">Building a Home Page with Grid</a> by Chris House (<a href="http://codepen.io/chrishouse">@chrishouse</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>