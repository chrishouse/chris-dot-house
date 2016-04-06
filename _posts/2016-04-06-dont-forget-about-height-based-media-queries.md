---
layout: post
title:  "Don't Forget About Height-Based Media Queries"
date:   2016-04-06
updated: 
author: Chris House
comments: true
tags: [css, responsive web design]
excerpt_separator: <!-- excerpt-end -->
---

I like to think I'm getting pretty good at working with media queries. After all, they're arguably the most integral part of responsive web design, and I've been building mobile-friendly sites for years now. But when I think about it, it's really only *width*-based media queries that I'm good at. I'm an absolute viking with `max-width` and `min-width`, but yesterday I ran across a situation where I needed to control the content of my design based on the *height* of the device. This was a first for me. My initial thought was, *I'll just use vertical media queries... wait, do those even exist?* Google soon informed me that, thankfully, yes they do. They may never be as utilized as their width-based counterparts, but they play an important role for specific types of designs.<!-- excerpt-end -->

### When You Might Need Them

I'll use yesterday's experience as an example. My project's design incorporates a scroll-free home page, which means everything on the page must fit within the viewport, and the user never sees a scrollbar. Once the device width gets down below 800px, the layout snaps into a traditional vertical-scrolling design. It may at first seem reasonable that the width-based media queries (i.e. `max-width: 800px`) will take care of things, but what about the *heights* of all the displays that are wider than 800px? My design looks great on my 1920x1080 monitor, but what about smaller but relatively common sizes like 1280x800 or 1366x768?

### How I Used Them

Here's how my page looks at 1300 x 860:

![scroll-free page at 1300 x 860](/images/goamp-screenshot-1.jpg)

Everything lays out nicely. 

But now look at what happens if I shorten the viewport height down to 730px:

![scroll-free page at 1300 x 730, broken](/images/goamp-screenshot-2.jpg)

The bottom area begins to cut into the main area, and the three buttons are eclipsed. Not good. This is when `max-height` and `min-height` come to the rescue.

To help everything fit nicely at this height, I chose to do three things: spread the "Innovative assessment..." text out from 66% to 100%, reduce the size of the paragraph text in the bottom area, and reduce the size of the "Learn More" links. My CSS looks something like this:

{% highlight css %}
@media (max-height: 850px){
  .home-message{
    width: 100%;
  }
  .home-bottom p{
    font-size: 1.6rem;
  }
  .learn-more{
    font-size: 1.9rem;
  }
}
{% endhighlight %}

And the result is much better:

![scroll-free page at 1300 x 730, fixed](/images/goamp-screenshot-3.jpg)

### Conclusion

Although vertical breakpoints aren't very common, it's nice to know media queries are versatile enough to make them work. I definitely couldn't have built this page without them. 

Have you used height-based media queries? Share your experience in the comments.