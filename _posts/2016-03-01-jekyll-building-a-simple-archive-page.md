---
layout: post
title: "Building a Simple Archive Page with Jekyll"
date: 2016-03-01
author: Chris House
comments: true
tags: [jekyll]
---

I recently decided to build an archive page for my [Jekyll](http://www.jekyllrb.com/) site. Nothing fancy, just a list of posts grouped by year. I turned to the official Jekyll documentation and was surprised to come up empty handed. My next stop was Google, which brought me to [this question](http://stackoverflow.com/questions/19086284/jekyll-liquid-templating-how-to-group-blog-posts-by-year/20777475) on Stackoverflow. User [Christian Specht](http://stackoverflow.com/users/6884/christian-specht) presented an answer so good I felt the need to share it.

The first step is to create the page itself. You can either create *archive.html* at the root of your project, or you can create a directory called *archive* with a *index.html* inside of it.

Now start building your archive page like you would any other Jekyll page, starting with the front matter and a containing element for your archive list:

{% highlight markdown %}
---
layout: page
title: Archive
permalink: /archive/
---

<section class="archive-post-list">

</section>
{% endhighlight %}

Here's how I want the final archive list to look:

<div class="archive jekyll-archive-post">
	<div class="post-list">
		<h1>2016</h1>
		<ul>
			<li><a href="#"><span class="post-meta">March 3, 2016</span> - A Blog Post from March</a></li>
			<li><a href="#"><span class="post-meta">February 26, 2016</span> - Here's the Title of the Blog Post</a></li>
			<li><a href="#"><span class="post-meta">February 15, 2016</span> - Another Spectacular Article from 2016</a></li>
			<li><a href="#"><span class="post-meta">January 9, 2016</span> - The First Blog Post of the Year</a></li>
		</ul>
		<h1>2015</h1>
		<ul>
			<li><a href="#"><span class="post-meta">December 25, 2015</span> - Merry Christmas!</a></li>
			<li><a href="#"><span class="post-meta">November 10, 2015</span> - An Article from November of 2015</a></li>
			<li><a href="#"><span class="post-meta">October 31, 2015</span> - Boo!</a></li>
		</ul>
	</div>
</div>

First, here's the completed Liquid code:

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h1>{{ currentDate }}</h1>
           <ul>
           {% assign myDate = currentDate %}
       {% endif %}
       <li><a href="{{ post.url }}"><span>{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}</a></li>
       {% if forloop.last %}</ul>{% endif %}
   {% endfor %}

</section>
{% endraw %} 
{% endhighlight %}

And here's the HTML that the code outputs:

{% highlight html %}
<section class="archive-post-list">
    <h1>2016</h1>
    <ul>
        <li><a href="#"><span class="post-meta">March 3, 2016</span> - A Blog Post from March</a></li>
        <li><a href="#"><span class="post-meta">February 26, 2016</span> - Here's the Title of the Blog Post</a></li>
        <li><a href="#"><span class="post-meta">February 15, 2016</span> - Another Spectacular Article from 2016</a></li>
        <li><a href="#"><span class="post-meta">January 9, 2016</span> - The First Blog Post of the Year</a></li>
    </ul>
    <h1>2015</h1>
    <ul>
        <li><a href="#"><span class="post-meta">December 25, 2015</span> - Merry Christmas!</a></li>
        <li><a href="#"><span class="post-meta">November 10, 2015</span> - An Article from November of 2015</a></li>
        <li><a href="#"><span class="post-meta">October 31, 2015</span> - Boo!</a></li>
    </ul>
</section>
{% endhighlight %}

Now let's recreate the Liquid code line by line. I'll explain each piece as I add it.

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}

   {% endfor %}

</section>
{% endraw %} 
{% endhighlight %}

First, this `for` loop surrounds the whole thing. This is saying to loop through every *post* in the *site* object (i.e. every blog post on our site) and execute the subsequent logic for each post it finds.

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}

   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

In this new line, the `assign` command declares a new variable called `currentDate` (a name we made up) and sets its value to the date of the post. We apply a filter using the pipe ("\|") character to show only the year, specified with "%Y". So for example, if the post's date is 2016-02-10, `currentDate` will have its value set to "2016".

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           
       {% endif %}
   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

What we're doing here is using an `if` statement to check if the value of `currentDate` is equal to the value of a variable called `myDate`, *which we haven't declared yet*. Since `myDate` hasn't been declared yet, we know that this statement will evaluate to *false*, at least the first time through the loop.

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
       {% endif %}
   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

This new line uses the `unless` command along with `forloop.first` to basically say: "*Unless* this is the *first* time through this loop, do the following." Which is to print out a closing `</ul>` tag.

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h1>{{ currentDate }}</h1>
           <ul>
       {% endif %}
   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

These next two lines simply output a pair of `<h1>` tags containing the value of `currentDate` (which we know is the literal year), and an opening `<ul>` tag. This is probably the most confusing part of this code, since it seems backwards that in the previous step we wrote a *closing* tag and now we're writing an opening one. But that leads us to the final, and most important, part of the `if` statement:

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h1>{{ currentDate }}</h1>
           <ul>
           {% assign myDate = currentDate %}
       {% endif %}
   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

We declare a variable called `myDate` and set its value to that of `currentDate`, which, again, is the literal year string (i.e. "2016"). So now both variables are set to that value. So why do we do this? Because it's how we ensure that the previous three lines of code only get executed if the current post is the first of its respective year. The code inside the `if` statement outputs the following HTML:

{% highlight html %}
    </ul>
    <h1>YEAR</h1>
    <ul>
{% endhighlight %}

It's the closing `</ul>` for the preceding year list, the literal year surrounded in `<h1>` tags, and the opening `<ul>` tag for the following year list, *and we only want it to be created once for each year*. Since `currentDate` gets changed every time the year of the post changes, we know that the `if` statement will only evaluate to true for the very first item of a given year. 

Just a couple more lines and we're all done.

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h1>{{ currentDate }}</h1>
           <ul>
           {% assign myDate = currentDate %}
       {% endif %}
       <li><a href="{{ post.url }}"><span>{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}</a></li>
   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

Now we start populating the list with list items. We get the post year similarly to how we got it earlier, only now we filter it to display as "February 26, 2016" using "%B %-d, %Y". We use `post.title` to output the title of the post, and we surround it all in an anchor tag with its `href` set to `post.url`. Pretty simple.

Here's the final step:

{% highlight markdown %}
{% raw %}
<section class="archive-post-list">

   {% for post in site.posts %}
       {% assign currentDate = post.date | date: "%Y" %}
       {% if currentDate != myDate %}
           {% unless forloop.first %}</ul>{% endunless %}
           <h1>{{ currentDate }}</h1>
           <ul>
           {% assign myDate = currentDate %}
       {% endif %}
       <li><a href="{{ post.url }}"><span>{{ post.date | date: "%B %-d, %Y" }}</span> - {{ post.title }}</a></li>
       {% if forloop.last %}</ul>{% endif %}
   {% endfor %}

</section>
{% endraw %}{% endhighlight %}

We added another `if` statement to write the final closing `</ul>` tag to close out the final year list (all the previous closing `</ul>`s have been taken care of by the earlier `if` statement). Here our `forloop.last` will only evaluate to true on the very last item in the loop, giving us exactly what we need.

Pretty clever. I wish I had thought of it.