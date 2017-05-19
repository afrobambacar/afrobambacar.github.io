---
title: NodeJS의 process.env란 무엇인가?
description: 서버의 환경변수 설정
date: 2017-03-15
---

# process.env

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

# env 

이는 사실 매우 불편한 방법인데 환경변수를 일일이 타이핑하여 앱을 구동시키는 것이 그렇게 좋은 아이디어인 것 같지 않기 때문이었다. 결론적으로 말하면 이러라고 만든 process.env가 아니다. 사실 process.env는 NodeJS 앱이 동작할 리눅스/유닉스 시스템의 환경변수를 이용하는 것이다. 터미널에서 ```env``` 명령어를 타이핑해보면 현재 컴퓨터에 설정된 환경변수들이 주욱 나열되는 것을 볼 수 있다.

```
$ env
```

환경변수의 생성

```
$ env NAME=VALUE
```

환경변수의 삭제

```
$ env -u NAME
```

즉 NodeJS에서 process.env는 서버의 환경변수를 뜻하며 서버의 환경변수가 미리 설정되어 있다면 위와 같이 타이핑하여 앱을 구동시키지 않아도 된다는 뜻이다. 만약 프로덕션 서버라면 미리 NODE_ENV=production 이라는 환경변수를 만들어 놓고 동작시키면 된다는 뜻이다.

```
$ env NODE_EMV=production
```

# 응용

AWS의 AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY도 환경변수로 설정해 놓고 사용하면 번거로움이 줄어든다.

```
$ env AWS_ACCESS_KEY_ID=....
$ env AWS_SECRET_ACCESS_KEY=...
```

소스에서는 다음과 같이 활용할 수 있다. 

```
const AWS = {
  'key':    process.env.AWS_ACCESS_KEY_ID,
  'secret': process.env.AWS_SECRET_ACCESS_KEY,
  'bucket': 'dev.example.com',
  'region': 'eu-west-1'
};
```

