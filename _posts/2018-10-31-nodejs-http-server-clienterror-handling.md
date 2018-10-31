---
title: NodeJS http.server 클래서의 clientError 핸들링
date: 2018-10-31
description: NodeJS 문서가 그냥 있는 것이 아니다.
---

### 증상과 실마리

프로덕션 모드로 떠 있는 express.js 앱이 뜬금없이 500을 뱉어내며 죽다 살기를 반복하는 일이 발생했다. 로그를 열심히 뒤져봤는데 단서는 facebook bot의 요청이 있은 후에 nginx가 upstream 커넥션 에러를 뱉는 것이었다. facebook bot이 범인이긴 하지만 항상 그런 것은 아니었다. 간혹 bit.ly가 다녀간 후에 동일한 증상이 발생하는 것을 발견했다.

### 원인

facebook bot과 bit.ly, 이 두 녀석이 어떤 짓을 했길래 nginx에서 upstream 에러를 뱉은 것일까? nginx 로그를 좀더 자세히 들여다보니 이상한 점이 있었다. 요청한 url에 띄어쓰기가 포함되어 있는 것이다. 그렇다 띄어쓰기가 문제였다. 

브라우저에서는 띄어쓰기가 포함되더라도 url encoding을 통해 공백을 없애지만 크롤러의 요청에는 이 작업이 없기 때문에 url에 공백이 포함되어 요청이 들어오는 것이었다. nginx는 순진하게 upstream으로 요청을 보냈고, upstream에서는 해석할 수 없다는 이유로 응답하지 않은 것이다.

터미널을 이용하여 해당 앱에 비슷한 요청을 보내보니, 앱이 500을 뱉어내며 죽는 것을 확인했다.

```
curl -A facebot https://www.example.com?utm_source=hello&utm_content=hello world
```

### 해결방법

NodeJS의 `http.server` 클래스는 위와 같은 일이 발생할 때 [clientError](https://nodejs.org/api/http.html#http_event_clienterror) 이벤트를 발생시킨다. 문서에는 친절하게도 이에 대한 핸들링 방법이 나와 있다. 

```
server.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});
```

