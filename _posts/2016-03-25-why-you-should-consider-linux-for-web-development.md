---
layout: post
title:  "Why You Should Consider Linux for Web Development"
date:   2016-03-22
updated: 
author: Chris House
comments: true
tags: [linux]
excerpt_separator: <!-- excerpt-end -->
---

If you design and/or develop for the web, chances are you're using a Mac running OS X. There's a slightly less, but still rather good, chance that you're using Windows. Whichever it may be, you're probably happy with your environment. And that's fine, because both OS X and Windows make fine development environments. My intention with this post is *not* to try to convince you why your operating system of choice is poor and mine is superior. But rather I simply want to present a third option, one that you've likely not tried and possibly not even considered. <!-- excerpt-end -->

In my experience, Linux is a fantastic fit for web development for numerous reasons. I'd like to present some of these reasons in an attempt to enlighten and inform those of you who enjoy trying out new things. Maybe you'll find that Linux isn't right for you, and that's fine. But you might just discover a whole new world of convenience and efficiency, make the switch to Linux and never look back. You wouldn't be the first. 

### Misconceptions About Linux

First I want to lay to rest some of the common myths and misconceptions about Linux.

#### Linux is Difficult to Install and Use

The first thing a new Linux user needs to understand is that there is no operating system called "Linux". Linux is an operating system *kernel* - the fundamental core component of an OS. When we talk about using Linux, we're talking about using one of many *distributions* of Linux. A Linux distribution (or "distro") is an operating system that's built around the Linux kernel. We often refer to the OS itself as "Linux" for simplicity's sake. 

No two distros are exactly alike, and they vary wildly in terms of barrier to entry. Some are created for hardcore Linux geeks who feel right at home configuring boot loaders, installing file systems and manually compiling software. It's this flavor of Linux that has given it the reputation of being extremely difficult to use. But other distros are geared towards users who want a fully-functioning, full-featured system that just works without any manual configuration or deep system know-how. Most popular Linux distros fall into this second category. 

I'm going to assume that most web developers who might consider switching to a Linux OS fall into the second category. In that case I recommend any of these distributions: [Linux Mint](https://linuxmint.com/), [Ubuntu](http://www.ubuntu.com/), [elementary OS](http://elementary.io/), [Zorin OS](http://zorinos.com/), and [openSuse](http://zorinos.com/). All of these will make either Windows or OS X users feel right at home. Everything will *just work*.

#### Linux is "Cheap"

A strange thing happens when you tell someone that something they think should cost a lot money is, in fact, free. Their first instinct is to assume it's of lesser quality than the similar thing they paid loads of cash for. I guess it's understandable. If I pay $30,000 for a new Jeep and then somebody presents me with a similar looking, similar functioning vehicle that costs nothing, I'm going to assume there's a major catch. But the truth about Linux is that there isn't a catch. Software distribution simply doesn't work the same way as the automobile industry (or most other industries, for that matter). Sometimes people just want to create something awesome and share it with the world. As web developers, this concept should be familiar to us, as many of us embrace and contribute to open source software. Do we think of jQuery as being "cheap" because we don't have to pay for it? Nope. It's the same deal with Linux.

#### Everything is Done on the Command Line

This is similar to the first point. There are developers out there - and no shame if you're one of them - who would sooner get a root canal than work on the command line. While I don't personally understand this disdain of the terminal, I can offer good news. The distributions I recommended above (and many others) don't require any more command line use than what you're already used to. Many tasks, like installing new software or working with build tools, are faster and easier with the command line once you're accustomed to it, but the tasks that absolutely require it are the exception rather than the rule.

#### Linux isn't Compatible with My Keyboard/Mouse/Printer/Graphics Card/USB Drive/Whatever

This may have been partially true ten years ago, but most modern Linux distros are just as plug-and-play capable as Mac or Windows. I've experienced more difficulty installing new hardware on Windows than I ever have on Linux. The creators and contributors to modern Linux distros typically make device compatibility one of their top priorities.

### Why I Use Linux for Web Development

Let's get to it. Here are the things I love most about Linux.

#### You Can Make the Environment Your Own

Ask any fan what they love most about Linux and their first answer will likely be "customizability". As a designer I love to create unique things. And as a developer I want my environment to be *just so*. If you're like me in that regard, then you'll love the amount of customizability Linux affords you. And we're not just talking about desktop wallpapers and icon sizes. *Everything* is customizable in Linux, from changing the placement of the menu panels to picking an entirely different desktop environment. Don't like the command used to launch Sublime Text? Change it. Don't like the way your windows lay against each other? Change it. And if you ever find yourself limited by the options presented, you can crack open the code and create your own options. That's the beauty of working in an open source OS. 

#### Linux is Free

 Most distros are released under the [GNU General Public License (GPL)](http://www.gnu.org/licenses/gpl-3.0.en.html), which means they're free to use and free to copy, distribute and modify. Trying out a Linux OS is as easy as downloading the image file of the distro you're interested in, burning it to a CD and popping it in your computer. If you like what you see, you can install it right alongside your existing OS. If you get sick of it, just download a different distro and give that one a whirl.

 And like I mentioned before, don't confuse free with cheap. "You get what you pay for" typically holds true in life, but not here. Modern Linux distros are fast, elegant, feature-rich, stable and highly usable.

#### Your Development Environment Will Match Your Production Environment 

This is a biggie. There's a pretty darn good chance your production server is running Apache on Linux. When you're running Linux locally you can mimic this production environment *exactly*. Same file system permissions, same version of PHP/Ruby, same web server, etc. This means that when you test your site locally, you can be assured that it's running precisely as it will after you deploy it, and you're much less likely to run into platform-specific issues. This makes deployment a simpler, more predictable, more bug-free process.

#### Linux Runs Great on Lesser Hardware

Linux OSs are lighter and less resource-hungry than Windows or OS X, which means you can fire up that old Dell Inspiron laptop from 2003, boot up Linux, and you'll be sailing smoothly with all your development tasks. There are even [some Linux distros so lightweight](http://puppylinux.org/main/Overview%20and%20Getting%20Started.htm) they can reside entirely on a small USB drive. This point is amplified when you consider the price of Linux (zero dollars). Linux makes it cheap and easy to breathe life into hardware that would have otherwise been destined for the garbage.

#### Linux is Stable as Hell

Nothing's worse than having your code editor crash right when you're in the middle of solving a tricky problem. Or worse, the OS itself freezes up and needs to be rebooted. Now, every operating system and every piece of software has the potential to crash, but in my experience, Linux OSs are by far the least prone to unexpected software crashes and buggy performance. It's the main reason so many people use them as web servers. 

Some distros are more stable than others. [Debian](https://www.debian.org/) has the reputation of being one of the most stable distros available. I've had great luck with [Xubuntu](http://xubuntu.org/) in terms of rock solid performance. Running Xubuntu, I haven't had to reboot my computer in at least nine months.

#### Many of Your Tools Will Work Better on Linux

Many of the popular web development tools and languages were designed for Unix-like systems (e.g. Linux). Ruby, Jekyll, Grunt, Git (which was created by Linus Torvalds, the creator of Linux), to name just a few, all play nicer with Unix and Unix-based systems. You won't need to install extra shell software or worry about system compatibility. Everything will run smooth as silk on Linux. Okay, stop screaming at your screen - I realize that Mac OS X is a Unix system and that just about everything that works in Linux will work the same on a Mac. So to be fair this point only really applies to Windows users.

### Why You Shouldn't Use Linux

I can only think of one reason, but it's a doozy:

#### You Can't Run Adobe Software on Linux

Ouch. This one hurts. But let me present you with some consolation: You can run the VM software [VirtualBox](https://www.virtualbox.org/wiki/Downloads) in Linux with no problems. You can then install Windows as a virtual machine inside VirtualBox, install any Adobe software you'd like and it'll run just fine inside your virtual Windows installation. This is what I do, and I use Photoshop nearly everyday. Since you're effectively running an operating system within an operating system, you'll need a machine with a decent amount of memory (I'd say 8GB minimum). 

You may think this solution is a bit cumbersome, and I'd understand why. Running software natively just feels nicer than running it inside a VM. But here's why, at least for me, this solution is totally adequate: I need to run VMs *anyway* for my Internet Explorer testing. I have four different virtual installations of Windows, each with a different version of IE. Since I live inside these virtual machines so much anyway, using one as my Photoshop machine is no sweat. I usually keep my Photoshop VM running constantly, so switching over to it is trivially easy.

### Conclusion

If you're happy with your current OS and have no desire (or time) to try something new, there's nothing wrong with that. I really believe that the best software is that in which you're the most productive. But if you're anything like me, you feel a constant desire to push your skills forward, to learn new things and to break out of your comfort zone for the sake of gaining new experiences. If that's you, give Linux a try. You may hate it, you may love it, but at least you'll be able to say you did it. 