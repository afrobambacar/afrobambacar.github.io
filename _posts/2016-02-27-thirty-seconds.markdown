---
title:  "Project Thirty Seconds"
date:   2016-02-27
description: 30초 음악 공유 웹 애플리케이션
---

<img src="{{ site.baseurl }}assets/images/30seconds.png" />

가끔 음악을 공유하고 싶을 때가 있다. 그걸 보는 다른 사람은 어떨지 모르지만 그냥 어딘가에 떠들고 싶은 그런 것? 트위터나 페이스북에서도 할 수 있지만 요즘 잘 쓰지 않는터라 나만을 위한 나만의 서비스에 잉여력을 발휘해보았다. 

그래서 나온 것이 Spotify web api를 이용하여 음악을 검색한 후 포스팅을 할 수 있는 웹앱. 댓글, 좋아요 등의 피드백을 추가할 수 있으며 30초 하이라이트 구간을 들어볼 수 있다. 프로필 화면이나 알림 기능도 추가를 하려고 했지만 그건 너무 가는 것 같아서 그냥 필요할 때 로컬에다 띄워놓고 음악을 포스팅해보고 있다.

사용한 라이브러리는 다음과 같다. 

* 프론트엔드 backbone.js, howler.js
* 백엔드 express.js, mongodb, spotify-web-api-node
