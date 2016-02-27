---
layout: post
title:  "Yeoman with Grunt로 빌드하기"
date:   2014-04-15
---

Yeoman을 쓰기 시작한건 순전히 angularJS의 폴더 구조를 어떻게 해야할지 머리쓰기 싫어서 였다. 근데 Yeoman을 사용하는 이유가 그것만으로는 너무 부족하다는 느낌을 받기 시작했다. Yeoman을 이해하기 위해서는 Bower와 Grunt 역시 이해가 필요했는데, Bower는 apt-get, npm, yum과 비슷한 개념이니 이해가 쉬운 반면 Grunt는 그렇지가 않다. (우선 Gruntfile.js에 너무 많은 것이 들어있다. -_-;)

### bower & npm을 통해 설치시 --save 옵션 꼭 필요.

yeoman을 사용하면서 우선 놓치고 있던 것 중 하나가 bower를 사용할 때 --save 옵션을 사용해야 한다는 것이다.

{% highlight bash %}
bower install --save PACKAGE_NAME
{% endhighlight %}

--save 옵션을 적어주면 설치한 패키지가 자동으로 bower.json 파일에 추가되며 의존성 관리를 편리하게 할 수 있다는 장점이 있다. 하지만 index.html에는 자동으로 추가되지 않아서 이는 수동으로 해줘야 한다. 추가할 때 yeoman에서 주석으로 build 라고 적어 놓은 곳에 잘 끼워넣어 줘야 grunt로 빌드할 때 minify, compress, concat 등이 수행된다.

npm을 이용하여 의존성 패키지를 설치할 때도 마찬가지이다. 마찬가지로 --save-dev 옵션을 넣어줘야 package.json 파일의 devDependencies에 자동으로 추가가 된다.

{% highlight bash %}
npm install PACKAGE_NAME --save-dev
{% endhighlight %}

### Grunt serve, test, build 차이점

grunt serve는 보통의 개발 모드다. app 폴더의 소스들을 실행하여 localhost:9000에 띄워주고 저장할 때마다 화면이 갱신되어 편리하게 이용할 수 있다.

grunt test는 유닛테스트를 할 때 쓰는 명령어란다. 근데 아직 익숙하지 않아서 사용할 일이 없었다. [여기](http://nodeqa.com/nodejs_ref/66)에 설명이 잘 되어있는데 차차 해봐야겠다. 

grunt 혹은 grunt build, 둘이 같은 명령어인지 모르겠다. 아무튼 이 명령어를 쳐주면 gruntfile.js에 정의된 대로 minify, compress, concat 등을 수행하여 dist 폴더에 저장을 해준다. 빌드한 앱이 잘 돌아가는 지 보려면 다음의 명령어를 통해 로컬에서 똑같이 확인할 수가 있다 .

{% highlight bash %}
grunt serve:dist
{% endhighlight %}

참고. 

grunt test 명령어를 쳤을 때 다음과 같은 메시지가 나온다면 [여기](http://stackoverflow.com/questions/22367059/no-provider-for-frameworkjasmine-resolving-frameworkjasmine)를 보면 해결이 가능하다.

{% highlight bash %}
Warning: No provider for "framework:jasmine"! (Resolving: framework:jasmine) Use --force to continue.
{% endhighlight %}

grunt를 이용하여 실제 deploment까지 할 때 참고할 만한 자료들이 있다.
* [grunt-build-control](https://github.com/robwierzbowski/grunt-build-control)
* [My Deploy Method Brings Most of the Boys to the Yard](http://curtisblackwell.com/blog/my-deploy-method-brings-most-of-the-boys-to-the-yard)

