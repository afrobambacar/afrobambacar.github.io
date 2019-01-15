---
title: 터미널에서 Github Pull Request 만들기
date: 2018-10-01
description: brew install hub
crosspost_to_medium: true
---

[hub](https://github.com/github/hub)는 Github에서 관리하는 프로젝트로 github에 필요한 명령어를 git에 추가하여 사용할 수 있게 만들어 줍니다. 예를들어 hub에 등록된 명령어들 중에는 다음과 같은 것들이 있습니다.

* hub-create: 깃텁 리파지터리를 생성
* hub-delete: 깃텁 리파지터리를 지우기
* hub-fork: 깃텁 리파지터리를 `fork`
* hub-pull-request: 깃텁 풀리퀘스트 (개인적으로는 이 기능때문에 사용합니다.)

맥의 경우 hub는 _brew_ 를 통해 설치할 수 있습니다.
```
$ brew install hub
```

설치를 마쳤으면 hub 명령어를 git 명령어에 추가 하기 위해서 별칭을 만듭니다. `~/.profile`이나 `~/.bash_profile` 같은 곳에 추가해두면 터미널을 열 때 자동으로 추가되게 할 수 있습니다.
```
$ alias git=hub
```

별칭이 잘만들어 졌는지 확인하려면 다음 명령어를 입력해보세요.
```
$ git --version
git version 2.17.0
hub version 2.3.0 # ← it works!
```

이제 터미널에서 커맨드 라인 명령어로 풀 리퀘스트 생성을 할 수 있습니다.
```
$ git pull-request -b [OWNER:]BRANCH
```

다음에 나오는 화면에서 첫번째 줄은 풀 리퀘스트의 제목, 그 다음줄 부터는 내용을 작성하신 후에 `:wq` 를 타이핑하면 Github에 풀리퀘스트가 생성된 것을 보실 수 있어요.

### ref

* [hub github page](https://hub.github.com/)
* [hub on github](https://github.com/github/hub)
