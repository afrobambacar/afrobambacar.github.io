---
title: 터미널에서 Github Pull Request 만들기
date: 2018-10-01
description: brew install hub
---

[hub](https://github.com/github/hub)는 Github에서 관리하는 프로젝트로 github에 필요한 명령어를 git에 추가하여 사용할 수 있게 만들어 준다. 예를들어 hub에 등록된 명령어들 중에는 다음과 같은 것들이 있다.

* hub-create: 깃텁 리파지터리를 생성한다.
* hub-delete: 깃텁 리파지터리를 지운다.
* hub-fork: 깃텁 리파지터리를 `fork` 한다.
* hub-pull-request: 깃텁 풀리퀘스트를 만든다. (개인적으로는 이 기능때문에 사용한다.)

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