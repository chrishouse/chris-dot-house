---
layout: post
title:  "Grunt Configuration for React + Browserify + Babelify"
date:   2016-03-11
updated: 
author: Chris House
comments: true
tags: [grunt, react]
excerpt_separator: <!-- excerpt-end -->
---

[React](https://facebook.github.io/react/) is awesome. I recently began using it on a side project and it has quickly proven itself to be a great way to create fast, dynamic user interfaces with code that's easy to reason about (I love that expression). It relies on the idea of components, which matches nicely with the practice of splitting your JavaScript into separate smaller files, each representing an individual component. This keeps your code super organized and manageable.<!-- excerpt-end -->

To achieve this modularity, I use a tool called [Browserify](http://browserify.org/). This allows us to create a chain of dependencies using the Node.js syntax "require()". If you're using React's JSX syntax (which you should be), you'll need [Babelify](https://github.com/babel/babelify), which is a [Babel](https://babeljs.io/) transformer specifically made for Browserify. Each time you save a .js in your React application, Babelify will convert your JSX syntax into JavaScript, and Browserify will compile all your separate .js modules together into one file that the browser understands (check out Browserify's documentation if you don't know how to implement it in your code). I use [Grunt](http://gruntjs.com/) to automate these tasks.

I realize there are many different ways and many different tools to accomplish what I'm doing here. Webpack instead of Browserify, Reactify instead of Babelify, Gulp instead of Grunt, etc. If those are your tools, Google can help you. The purpose of this article is to show a sample configuration using specific tools: React, Browserify, Babelify and Grunt.

Besides Grunt and React, here's what you'll need:

* [Browserify Grunt plugin](https://github.com/jmreidy/grunt-browserify)
* [Babelify](https://github.com/babel/babelify)
* [ES2015 preset](http://babeljs.io/docs/plugins/preset-es2015/)
* [React preset](http://babeljs.io/docs/plugins/preset-react/)
* [Grunt Watch plugin](https://github.com/gruntjs/grunt-contrib-watch)

And here's my gruntfile:

{% highlight javascript %}
/*gruntfile.js*/

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      browserify: {
        files: ['src/scripts/**/*.js'],
        tasks: ['browserify']
      }
    },

    browserify: {
      dist: {
        options: {
           transform: [['babelify', {presets: ['es2015', 'react']}]]
        },        
        src: ['src/scripts/app.js'],
        dest: 'dist/scripts/app.js',
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');  
  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('default', ['browserify']);

};
{% endhighlight %}

The part that tripped me up initially is the `transform: [['babelify', {presets: ['es2015′, 'react']}]]` property within the browserify options. You must load Babelify's **es2015** and **react** presets exactly like I've done here (**note the double square brackets around the value**), or else you'll receive errors.

Hopefully this helps some people in the same situation as myself.