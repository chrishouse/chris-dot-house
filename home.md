---
layout: default
title: Home
permalink: /
---
<div class="wrapper">
  <div class="home">

    <ul class="post-list">
      {% for post in site.posts limit:10 %}
        <li>   
          <span class="post-meta">{{ post.date | date: "%B %-dth, %Y" }}</span>   
          <h2>
            <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a>
          </h2>          
          {{ post.excerpt }}<a href="{{ post.url | prepend: site.baseurl }}" class="read-more-link">(more)</a>
        </li>
      {% endfor %}
    </ul>

  </div>
</div>
