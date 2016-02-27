---
layout: post
title:  "DEPLOYING A YEOMAN SITE 번역"
date:   2014-04-16
---

grunt build 명령어는 dist 폴더에 앱을 최적화한 버전을 생성합니다. 그리고 당신의 코드를 배포하거나 버전관리하기 위한 다양한 방법들이 있습니다. 

### GRUTN-BUILD-CONTROL TASK

[Grunt build control](https://github.com/robwierzbowski/grunt-build-control)은 yeoman 앱을 배포하기 위한 용도로 개발되었습니다. 이것은 빌드한 코드를 grunt task를 통해 자동으로 버전관리 및 배포 할 수 있도록 도와줍니다. 환경설정 옵션들은 다음을 포함합니다.

* 커밋하기 위한 브랜치의 이름을 지정할 수 있습니다. (e.g., prod, ph-pages)
* 푸시하기 위한 리모트를 지정할 수 있습니다. (e.g., Heroku instance, a GitHub remote or the local source code repo)
* 자동으로 커밋 메시지가 포함되게 할 수 있습니다.
* 소스 레포지토리가 클린한지 체크를 합니다. 그래서 빌드된 코드가 커밋한 소스 코드와 항상 일치하도록 만들어 줍니다.

### GIT SUBTREE COMMAND

git subtree 명령어를 이용하면 소스와 빌드된 코드를 같은 브랜치에서 유지할 수 있고, dist 폴더만 배포할 수도 있습니다. 

1. .gitignore 파일에서 dist 폴더를 지우세요. yeoman 프로젝트는 기본적으로 dist 폴더가 .gitignore에 포함되어 있습니다. 
2. dist 디렉토리를 레포지토리에 등록하세요.

{% highlight bash %}
git add dist && git commit -m "Initial dist subtree commit"
{% endhighlight %}

3. subtree를 다른 브랜치에 디플로이하세요. dist 디렉토리를 --prefix를 이용해서 상대경로로 지정하세요. 

{% highlight bash %}
git subtree push --prefix dist origin gh-pages
{% endhighlight %}

4. 평소처럼 개발하고 모든 레포지토리를 마스터 브랜치에 커밋하세요. 

5. 루트 디렉토리에서 subtree push 명령어를 통해 dist 디렉토리를 배포하세요.

{% highlight bash %}
git subtree push --prefix dist origin gh-pages
{% endhighlight %}

### GIT-DIRECTORY-DEPLOY 스크립트

[Git directory deploy](https://github.com/X1011/git-directory-deploy)는 grunt build control과 비슷한 원리로 작동하는 덜 자동화된 스크립트입니다. 

[원문](http://yeoman.io/deployment.html)