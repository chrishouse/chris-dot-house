---
layout: post
title:  "One Week with Jekyll"
date:   2016-02-26
updated: 
author: Chris House
comments: true
tags: [jekyll, static site generators]
excerpt_separator: <!-- excerpt-end -->
---

I love WordPress. It's robust, mature, community-backed, and easy to use. I've used it on numerous projects and it always does me good when I need all the bells and whistles of a complete content management system. But where do I go when all I need is a basic, simple, no frills blog? In that case WordPress, or any other popular full-featured CMS, is overkill. The solution: [Jekyll][jekyll-site]. Or more generally, static site generators. But Jekyll is billed as a "blog-aware static site generator". It's also the most popular one, which is why I decided to sit down, learn it, and create a website with it. In fact this very site you're reading is my maiden voyage Jekyll project. I've been tinkering with it for a week now. Here are my thoughts. <!-- excerpt-end -->

### A Bit About Static Site Generators

The first thing to understand about static site generators is that they are precisely that: tools that spit out nothing but static websites. No databases here, just HTML, CSS, JavaScript and resource files. The benefit of this is, primarily, the speed of the final product. The web was initially intended solely for static files, and while it's come a log way in optimizing for data-driven sites and apps, there's still nothing speedier for a browser to load than a static .html document. This was my main motivation to try out Jekyll. As nice as WordPress is, every page must be dynamically generated via database calls, which makes it *feel* bloated, even sluggish at times.

### Beauty in Simplicity

As speedy as Jekyll is, there's more to love about it than just performance. There's a refreshing satisfaction in its simpleness. Everything from initial installation to final post publishing is stripped down, streamlined and utterly intuitive. After installing Jekyll (which is simply a matter of running `gem install jekyll`), the process of getting a site up and running is trivially easy. Just initialize a new site with `jekyll new mysite`, `cd` to the directory it just created, and run `jekyll serve`. That last command does a few really neat things: it spins up a development server that you can immediately start using by browsing to localhost:4000. It also builds a basic stock site that you can use as a reference. And it runs a watch task that automatically updates the site whenever changes are made, similar to something like `sass watch`. Pretty cool.

When I went in and started exploring the directory structure of my site, the first thing that caught my attention was the numerous underscore-prepended directory names, such as *_layouts*. These directories are a part of the Jekyll build process and don't get included directly in the final site. When you run the command `jekyll build` (or `jekyll serve`), what happens is all the underscore directories get computed as components for building the final site, which is placed in the directory called *_site*. *_site* is your entire final website. If you wanted to deploy your site to a remote server, the *_site* directory is all you'd need.

Jekyll uses an intuitive template system to piece together sites. Using [YAML front matter](http://jekyllrb.com/docs/frontmatter/), you simply point a page to a particular layout, which are included in the *_layouts* directory. Then you can add some logic to your pages via [Liquid](https://github.com/Shopify/liquid/wiki), a templating language created by Shopify. Site configuration is done within the *_config.yml* file, which allows for all sorts of site customization. Then it's just a matter of styling your site with CSS just like you would any other site. There's an enormous amount of freedom here.

### Jekyll as a Blogging Platform

It didn't take me long to appreciate the efficiency of the way Jekyll pieces itself together. But what about blogging? If Jekyll had a weakness, I assumed this would be it. Well, it turns out that's where Jekyll *really* shines. Included in the project structure is a directory called *_posts*. This is, not surprisingly, where you put your blog posts. You simply add some YAML to the top of your post to specify the author, date, and other information, and then just write your post, save your file, build your site, and you're finished. The really cool thing about writing posts is that it's all done in markdown, which, if you don't know, is an incredibly easy and time-efficient method for writing text that gets converted into HTML. It couldn't be simpler.

### Bad Things About Jekyll

I figured I should balance out my gushing about Jekyll with some of its disadvantages. The biggest point that might cause some people to dislike Jekyll is its reliance on the command line. This isn't a concern for people, like me, who feel at home on the command line, but it could definitely be an issue for some.

Similarly, Jekyll isn't the kind of blogging platform that I would feel comfortable shipping off to a client. It'd be hard to imagine training a user on how to format YAML, run the Jekyll commands in the terminal, and write markdown. Not that these things are complicated, just that they're much better suited for developers who live and breathe this stuff. 

And that's really the bottom line: Jekyll is, as far as I'm concerned, a blogging platform for developers. This is either a disadvantage or an asset, depending on your point of view.

### Final Thoughts

I've had a blast the past week learning Jekyll. The site you're on now is a result of my exploration, and I'm pretty happy with the results. I realize that Jekyll isn't a replacement for the big CMSs, and it doesn't intend to be. They're very different tools that serve different purposes. Some projects require a rocket launcher, but other times a bow and arrow is all you need.  

[jekyll-site]: http://www.jekyllrb.com