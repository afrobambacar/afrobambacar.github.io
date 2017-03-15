---
title: NodeJS의 process.env란 무엇인가?
description: 오랜 궁금증에 대한 해답
date: 2017-03-15
---

Express.js의 config 파일에 다음과 같은 것이 있다.

```
let all = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9090,
  ip: process.env.IP || '0.0.0.0',
  ...
  };
```

process.env.NODE_ENV, 이 환경변수를 통해서 Express.js 앱을 ```development```나 ```production```으로 띄울 수가 있다. 두 모드에 따라서 config를 변경하는 것도 가능하다. 나는 여태 process.env.NODE_ENV가 Express.js를 동작시킬 때 함께 설정해줘야 하는 것인 줄 알았다. 예를 들면 다음과 같이 말이다.

```
$ NODE_ENV=prodcution forever start app/app.js
```

이는 사실 매우 불편한 방법인데 환경변수를 일일이 타이핑하여 앱을 구동시키는 것이 그렇게 좋은 아이디어인 것 같지 않기 때문이었다. 결론적으로 말하면 아는게 힘이다. 사실 process.env의 비밀은 리눅스/유닉스 시스템에 기본적으로 설정되어 있는 환경변수 였던 것이다. 터미널에서 ```env``` 명령어를 타이핑해보면 현재 컴퓨터에 설정된 환경변수들이 주욱 나열되는 것을 볼 수 있다.

```
$ env
```

환경변수의 생성은 다음과 같이 한다. 

```
$ env NAME=VALUE
```

환경변수의 삭제

```
$ env -u NAME
```

즉 NodeJS에서 process.env는 서버의 환경변수를 뜻하며 서버의 환경변수가 미리 설정되어 있다면 위와 같이 타이핑하여 앱을 구동시키지 않아도 된다는 뜻이다. 만약 프로덕션 서버라면 NODE_ENV=production을 환경변수로 설정해 놓으면 앱을 구동시킬 때 일일이 환경변수를 타이핑 할 필요가 없다는 뜻이다. 

```
$ env NODE_EMV=production
```

프론트엔드 개발자도 알아야 고생을 덜 한다.

