---
title: Oauth 2.0에 대해 알아보자
description: access_token은 어떻게 동작하는가?
date: 2017-02-23
---

# 1 

Oauth 2.0은 사용자 인증을 어떻게 할 것이냐 이다. 쉽게 이야기 해서 사용자가 왔다고 신고하면 access_token과 refresh_token을 발급해주고 다음에 요청할 때 access_token을 같이 주면 확인된 사용자로 취급하고 응답을 하는 것이다. refresh_token의 경우에는 access_token을 갱신하거나, 삭제 할 때 필요하다.

access_token과 refresh_token을 이용한다면 persistent login도 가능하다. access_token이 만료되었다고 하더라도 refresh_token을 이용하여 갱신 후 새로운 요청을 보내면 되기 때문이다. 요즘 이런 로직을 적용한 웹 앱들을 많이 접하게 되는데, 특히 모바일 브라우저에서는 로그인이 여간 번거로운 것이 아니기 때문에 로그인 된 상태를 지속시키곤 한다. 과거라면 쿠키의 만료 기간을 늘리겠지만 이제는 그럴필요 없이 refresh_token을 이용하여 새로운 access_token을 발급받아 사용하면 된다.

# 2

jwt에 대해서 알아야 한다. jwt는 json web token의 약자로 결국 이 녀석이 인증을 담당한다. access_token도 이 녀석이 만든다. jot이라고 읽는다고 하니 발음에 유의해야 겠다. (하긴 어쩔 수 없는 발음이니 우리나라에서는 그냥 jwt라고 말하는게 낫겠다.) jwt 역시 스펙이 있다. 표준이라는 말이다. 이 표준을 이용해 만든 라이브러리들이 언어별로 나와 있으니 구현하는데 애쓸 필요 없이 그냥 사용하면 된다. 

# 3

access_token에 대해서 얘기를 했으니 refersh_token이 무언지 얘기를 해야겠다. Oauth 2.0 전략은 사실 데이터베이스가 필요하다. refresh_token을 저장해야 하기 때문이다. 순서는 이렇다. 

* 사용자가 로그인을 하면 요청에 대해 tokens 스키마에 데이터를 생성하여 token의 id를 만든다.
* token의 id와 로그인한 사용자의 id가지고 jwt로 access_token을 만든다.
* token의 id에 랜덤한 스트링을 붙여서 refresh_token을 만든다.
* token의 id로 데이터를 찾아 refresh_token을 업데이트 한다.
* 사용자에게 access_token과 refresh_token을 반환한다.

refresh_token을 통해 access_token이 갱신되는 것은 refresh_token이 데이터베이스에 저장되어 있기 때문이다. access_token이 만료되어 쓸 수 없게 되어도 refresh_token을 통해 예전에 왔던 사용자인지 확인이 가능하고 이를 통해 새로운 access_token을 발급할 수 있는 것이다. refresh_token의 생성시간을 데이터베이스에 함께 넣게 되면 이를 통해 refresh_token의 만료 시간도 로직으로 제어할 수 있다. 영구적으로 로그인이 가능하게 만들지, 일주일만 로그인 없이 사용할 수 있게 만들지 로직으로 결정할 수 있는 것이다. 
