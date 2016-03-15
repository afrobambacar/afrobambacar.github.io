---
title: PhantomJS를 이용하여 크롤링 대처하기
description: 페이스북, 트위터, 구글에 필요한 메타태그 반환 방법
date: 2016-03-16
---

### 개요

* express.js에서 PhantomJS 구동시키기
* PhantomJS를 통해 웹 페이지 반환하기
* userAgent가 PhantomJS일 때 동적으로 메타 태그 만들기

### express.js에서 PhantomJS 동작 시키기

### navigator.userAgent를 이용하여 메타 핸들링하기



[PhantomJS]: http://afrobambacar.github.io/2016/03/%EB%88%88%EC%97%90-%EB%B3%B4%EC%9D%B4%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-phantomjs.html
[SEO for single page apps]: https://cdnjs.com/libraries/backbone.js/tutorials/seo-for-single-page-apps
[ajax crawling]: https://developers.google.com/webmasters/ajax-crawling/docs/learn-more
[Deprecating our AJAX crawling scheme]: https://googlewebmastercentral.blogspot.kr/2015/10/deprecating-our-ajax-crawling-scheme.html
[Updating our technical Webmaster Guidelines]: https://googlewebmastercentral.blogspot.kr/2014/10/updating-our-technical-webmaster.html
[Progressive enhancement]: https://en.wikipedia.org/wiki/Progressive_enhancement