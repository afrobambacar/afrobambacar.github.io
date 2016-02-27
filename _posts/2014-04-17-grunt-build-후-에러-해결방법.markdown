---
layout: post
title:  "grunt build 후 문제 해결"
date:   2014-04-17
---

### 문제

yeoman의 angular-fullstack 제네레이터를 이용하여 프로젝트를 생성한 후에 grunt build를 통해 빌드, 빌드된 코드들이 있는 dist 폴더에서 node 서버를 실행할 때 다음과 같은 에러가 뜬다.
{% highlight bash %}
$ yo angular-fullstack
$ grunt build
$ cd dist
$ node server.js 
{% endhighlight %}

Express 에러
{% highlight bash %}
Error: Failed to lookup view "index" in views directory "/test/dist/app/views"
{% endhighlight %}

### 해결방법

원인이 무엇일까 한참 삽질했지만, 이 현상은 development 모드라서 발생하는 현상이다. node를 실행할 때 product 모드로 지정해서 실행해주면 된다.

{% highlight bash %}
$ NODE_ENV=production node server.js
{% endhighlight %}

[참고](https://github.com/DaftMonk/generator-angular-fullstack/issues/67)