---
title: 터미널에서 Github Pull Request 만들기
date: 2018-10-01
description: brew install hub
---

hub 설치
```
$ brew install hub
```

hub를 git으로 별칭 만들기 `.profile`같은 곳에 추가하면 좋다.
```
$ alias git=hub
```

설치 및 별칭이 잘만들어 졌는지 확인
```
$ git --version
git version 2.17.0
hub version 2.3.0 # ← it works!
```

CLI에서 풀 리퀘스트 생성
```
$ git pull-request -b [OWNER:]BRANCH
```

다음에 나오는 화면에서 첫번째 줄은 풀 리퀘스트의 제목, 나머지는 내용으로 채우면 된다.

### ref

* [hub github page](https://hub.github.com/)
* [hub on github](https://github.com/github/hub)