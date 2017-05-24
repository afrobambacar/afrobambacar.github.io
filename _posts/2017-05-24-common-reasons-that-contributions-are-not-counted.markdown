---
title: 깃텁에 컨트리뷰션이 찍히지 않는 일반적인 이유
date: 2017-05-24
description: 깃텁 문서를 이제 봤다.
---

비공개 리파지터리가 제공되는 bitbucket을 주로 사용하긴 하지만 간간히 깃텁에도 커밋을 하긴 한다. 대단한 것은 아니고 테스트 겸 장난친 것들이긴 하지만 말이다. 얼마전에 yeoman-generator를 이용해서 S 프레임워크를 만들어 올렸는데 컨트리뷰션이 남지 않는 것을 보고 궁금증이 생겨서 [찾][github_doc]아보니 다음의 이유 중에 답이 있을거라는 안내

* You haven't added your local Git commit email to your profile
* Commit was not made in the default or gh-pages branch
* Commit was made in a fork
* Commit was made in a pull request that was merged and squashed

나의 경우는 1번에 해당했다. 깃텁의 이메일과 로컬 깃 설정의 이메일이 서로 달랐던 것. 주 메일을 변경하면서 깃텁의 메일을 변경했는데 로컬 깃의 이메일을 변경해주지 않았던 것이다. 로컬 깃의 이메일 설정을 바꿔서 

```
$ git config --global user.email jclee.dev@gmail.com
```

커밋을 해보니 카운트가 잘 찍힌다. 그동안 내 커밋들... 아깝다.

[github_doc]: https://help.github.com/articles/why-are-my-contributions-not-showing-up-on-my-profile/#common-reasons-that-contributions-are-not-counted