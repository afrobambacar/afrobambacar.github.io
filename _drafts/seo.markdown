---
title: PhantomJS를 이용하여 페이스북 og 태그 반환하기
description: 페이스북, 트위터, 구글에 필요한 메타태그 반환 방법
date: 2016-03-16
---

### PhantomJS는

[PhantomJS][PhantomJS]는 Headless Browser라고 해서 눈에 보이지 않는 브라우저 중 하나다. 서버에서 작동하는 자바스크립트라는 측면에서 NodeJS의 모듈 쯤으로 인식하는 분도 있으나 사실 NodeJS와는 다른 서버측 자바스크립트 언어라고 생각하면 된다. 그러니까 서버 언어로 NodeJS를 사용하지 않더라도 PHP나 JAVA에서도 PhantomJS를 구동시킬 수 있다는 말이 된다.

PhantomJS가 하는 일은 서버에서 브라우저를 동작시키는 일이다. 서버에서 브라우저를 동작시켜서 무엇을 하냐면 대충 다음과 같은 일들을 할 수 있다. 

* 특정 웹 페이지의 스크린 샷을 찍어서 파일로 남길 수 있다.
* 특정 웹 페이지를 서버에서 로딩하여 HAR 파일을 만들 수 있다. 
* 프론트엔드의 자바스크립트 테스트 코드를 서버에서 수행할 수 있다.
* 프론트엔드의 자바스크립트 코드를 서버에서 수행할 수 있으므로 크롤링에 대처할 수 있다.

이 밖에도 정말 다양한 일을 할 수 있는데 자세한 것은 [PhantomJS 사이트][PhantomJS]에서 찾아보면 된다.

### PhantomJS를 크롤링에 쓸 수 있다.

위에서 언급한 PhantomJS가 할 수 있는 일 중 내가 가장 효과적으로 사용하는 것은 크롤링이다. 싱글 페이지 앱에서는 사용자가 사이트에 처음 접속할 때 서버로부터 페이지를 단 한번만 받아오므로 크롤링에 문제가 생긴다. 보통 index.html을 반환받는데 og 등의 메타태그를 동적으로 설정한 index.html을 반환하는 것은 매우 번거로운 일이기 때문이다. 이 문제를 해결할 수 있는 도구가 PhantomJS다. 프론트 엔드에서 자바스크립트로 메타태그를 동적으로 변경하도록 해놓고 PhantomJS로 구동시키면 각종 bot이 웹 페이지에 방문했을 때 메타태그를 올바르게 반환할 수 있기 때문이다. 

### 예제



[PhantomJS]: http://afrobambacar.github.io/2016/03/%EB%88%88%EC%97%90-%EB%B3%B4%EC%9D%B4%EC%A7%80-%EC%95%8A%EB%8A%94-%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80-phantomjs.html
[phantomjs-prebuilt]: https://github.com/Medium/phantomjs
[SEO for single page apps]: https://cdnjs.com/libraries/backbone.js/tutorials/seo-for-single-page-apps
[ajax crawling]: https://developers.google.com/webmasters/ajax-crawling/docs/learn-more
[Deprecating our AJAX crawling scheme]: https://googlewebmastercentral.blogspot.kr/2015/10/deprecating-our-ajax-crawling-scheme.html
[Updating our technical Webmaster Guidelines]: https://googlewebmastercentral.blogspot.kr/2014/10/updating-our-technical-webmaster.html
[Progressive enhancement]: https://en.wikipedia.org/wiki/Progressive_enhancement