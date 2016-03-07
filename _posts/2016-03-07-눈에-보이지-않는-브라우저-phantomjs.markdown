---
title: '눈에 보이지 않는 브라우저, PhantomJS'
data: 2016-03-07
description: headless, head가 없는거 아니다.
---

### Headless browser

헤들리스 브라우저는 그래픽 유저 인터페이스가 없는 웹브라우저를 일컫는다. 헤들리스 브라우저는 웹 브라우저와 유사한 환경을 가졌지만 커맨드 라인 인터페이스를 통해 실행하고 제어할 수 있는 브라우저들을 말한다. 최근 가장 유명한 것으로는 PhantomJS가 있지만, 자바로 작성된 HtmlUnit이라는 것도 많이 사용됐었다.

### PhantomJS

요즘 가장 유명한 헤들리스 브라우저라면 PhantomJS가 있다. 이런 것이 어디에 쓰일까 싶지만 꽤 유용한 곳에서 자주 사용된다. 예를 들면 다음과 같다. 

* Jasmine, QUnit, Mocha와 같은 테스트 프레임워크에서 함수를 테스트 할 때 사용한다.
* 웹사이트의 스크린샷, 썸네일 프리뷰 등을 만들 때 사용한다. SVG, Canvas를 포함한 웹 컨텐츠도 캡쳐가 된다. 
* DOM api, jQuery와 같은 라이브러리로 웹 페이지를 조작할 때 사용한다.
* [HAR][HAR] 파일을 만들어 웹 페이지의 성능 측정을 할 때 사용한다. Jenkins나 YSlow를 통해 자동화 할 수도 있다.

또 이런 것도 할 수 있다. 

* DDOS 공격
* 광고 노출횟수 늘리기

### 설치하기

[PhantomJS 다운로드][PhantomJS 다운로드] 페이지에서 미리 빌드된 zip 파일을 다운로드 받을 수 있다. 압축을 푼 후에 ```phantomjs``` 바이너리 파일을 PATH에 추가하면 된다. 예를 들면 맥에서는 ```/usr/local/bin/``` 경로로 옮기면 어디서나 사용할 수 있게 된다. 설치가 잘 되었는지 확인해보려면 다음 명령어를 입력해보면 된다. 

```bash
$ phantomjs --version
2.1.1
```

### 스크린 캡쳐 예제

설치가 잘 됐으면 비교적 간단한 예제를 테스트 해볼수 있다. 다음은 PhantomJS로 스크린캡쳐를 할 수 있는 간단한 예제 코드이다. 

```javascript
var page = require('webpage').create();
page.open('http://www.google.com', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('google.png');
  }
  phantom.exit();
});
```
위와 같이 자바스크립트 파일을 작성한 후에 터미널에서 다음과 같이 입력하면 동일한 디렉토리에 구글 홈페이지를 캡쳐한 파일 google.png가 생긴 것을 볼 수 있다.

```dash
$ phantomjs render.js
Status: success
$ ls
render.js google.png
```

PhantomJS 공식 사이트의 [예제][PhantomJS 예제] 페이지를 보면 더 많은 활용 방법이 나와있다.


[HAR]: https://en.wikipedia.org/wiki/.har
[PhantomJS]: http://phantomjs.org/
[PhantomJS 다운로드]: http://phantomjs.org/download.html
[PhantomJS 예제]: http://phantomjs.org/examples/index.html