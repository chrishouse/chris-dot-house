---
layout: page
title: Archive
permalink: /archive/
order: 3
---

<div class="archive">

  <ul class="post-list">
    {% for post in site.posts %}
      <li>             
        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }} <span class="post-meta">{{ post.date | date: "%B %-dth, %Y" }}</span></a>            
        </h2>          
      </li>
    {% endfor %}
  </ul>

</div>