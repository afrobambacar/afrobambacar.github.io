---
layout: post
title:  "yeoman disable livereload"
date:   2014-04-21
---

### 문제

* yeoman의 angular-fullstack 제네레이터를 이용하여 프로젝트를 생성
* Sublime Text 2에서 sftp로 서버에 파일 업로드 설정
* 서버쪽은 nginx로 프록시패스

근데 빌드하기 전에 grunt serve로 결과를 보고 싶을 때 livereload.js 파일이 pending 상태가 되어 사이트가 느리게 뜬다.

### 해결방법

프로젝트 루트 폴더 기준으로 lib/config/express.js 파일을 보면 development 모드에서 livereload를 호출하는 것을 볼 수 있다. 그 부분을 주석처리 하면 보통 처럼 사용할 수 있다.

{% highlight js %}
module.exports = function(app) {
  app.configure('development', function(){

  	// connect-livereload를 불러오는 것을 주석처리 해버리면 쉽게 해결!
    // app.use(require('connect-livereload')()); 

    // 중략 ...

  });
};
{% endhighlight %}
