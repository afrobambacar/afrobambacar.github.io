---
layout: post
title:  "grunt-build-control 번역"
date:   2014-08-22
---

# grunt-build-control

> 빌드된 코드의 버전 컨트롤

### HELP WRITE TESTS FOR THIS TASK

이 라이브러리가 계속 발전하기 위해서는 테스트가 필요하다. 테스트해보는 것을 좋아하거나 이 그런트 태스크를 좋아한다면 [issue #19](https://github.com/robwierzbowski/grunt-build-control/issues/19)를 살펴보고 풀 리퀘스트를 통해 기여할 것을 고려해보라. 어떠한 도움도 고맙게 받겠다.

## Getting started

이 플러그인은 다음의 것들이 필요하다.
[Grunt](http://gruntjs.com/) '~0.4.0' and [Git](http://git-scm.com/) '> 1.8'.

[Grunt](http://gruntjs.com/)를 사용해본적이 없다면 [Getting Started](http://gruntjs.com/getting-started) 가이드를 살펴보라. 이 가이드는 어떻게 [Gruntfile](http://gruntjs.com/sample-gruntfile)을 만들고 그런트 플러그인을 설치하고 사용하는지 설명해 놓았다. 그런트가 익숙해지면 커맨드 라인으로 플러그인을 설치할 수 있다.

{% highlight bash %}
npm install grunt-build-control --save-dev
{% endhighlight %}

플러그인 설치가 완료되면 그런트 파일에 로드하라.

{% highlight js %}
grunt.loadNpmTasks('grunt-build-control');
{% endhighlight %}

## buildcontrol task

_이 태스크는 `grunt buildcontrol` 명령어로 실행된다._

프로젝트의 빌드된 코드를 위한 자동 버전 컨트롤 태스크 

빌드된 코드와 소스 코드의 싱크를 지켜준다. 빌드된 코드의 다수의 브랜치를 유지시켜준다. 커밋에 대한 자동 메시지를 붙여주며, 리모트 레포지토리에 푸시해준다.

### Setup

프로젝트는 메인 프로젝트의 서브 디렉토리에 아웃풋 코드가 생성되는 컴파일 혹은 빌드 프로세스를 가져야 한다.

메인 프로젝트의 .gitignore 파일에 빌드 디렉토리를 추가하라. 그리고 빌드 프로세스가 빌드 디렉토리 안에 있는 .git 디렉토리를 지우지 않도록 하라. [Yeoman](http://yeoman.io) 제네레이터는 이 스텝을 추가해두고있다. 

### Options

#### dir

Type: `String`  
Default: `dist`  

빌드된 코드가 들어있는 디렉토리

#### branch

Type: `String`  
Default: `dist`  

커밋되는 브랜치

#### remote

Type: `String`  
Default: `../`  

푸쉬할 리모트. 예로 헤로쿠나 스칼라, 메인 프로젝트의 리모트 (깃헙의 ph-pages 브랜치), 혹은 로컬 프로젝트의 리모트 자신 (`../`).

#### commit

Type: `Boolean`  
Default: `false`  

빌드된 코드를 `branch`에 커밋. 새로운 커밋은 빌드된 코드가 변경되었을 때만 생성된다.

#### tag

Type: `Boolean` or `String`  
Default: `false`  

스트링으로 설정하면 값이 추가된다. 프로젝트의 package.json 을 변수로 로드해보라. 그리고 `pkg.version`을 태깅해보라. 

#### push

Type: `Boolean`  
Default: `false`  

`branch`를 `remote`에 푸쉬. `tag`가 설정되어 있으면, 특정 태그로 푸쉬한다.

#### message

Type: `String`  
Default: `Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%  `

커밋할 때의 커밋 메시지. 스페셜 캐릭터나 쌍따옴표 같은 건 이스케이프 처리하는 등, 안전한 메시지를 작성하라.
메인 프로젝트의 정보를 프린트 할 때는 다음의 토큰을 이용할 수 있다. 

- `%sourceName%`: 메인 프로젝트의 이름. package.json을 읽거나 프로젝트 디렉토리를 읽거나.
- `%sourceBranch%`: 메인 프로젝트의 현재 브랜치
- `%sourceCommit%`: 메인 프로젝트의 가장 최근의 커밋

#### connectCommits

Type: `Boolean`  
Default: `true`  

빌드된 코드 브랜치의 모든 커밋이 메인 프로젝트의 브랜치와 매치되는 것을 확실히 하라? 메인 프로젝트의 워킹 디렉토리에 커밋되지 않은 변경사항이 있으면 커밋 태스크는 에러를 일으킨다.

Make sure that every commit on the built code branch matches a commit on the main project branch. If the main project's working directory has uncommitted changes, a commit task will throw an error.

### Usage

그런트-빌드-컨트롤의 일반적인 사용법은 메인 레포지토리의 깃헙 페이지스 브랜치에 빌드된 코드를 커밋하고 푸시하거나, 헤로쿠 같은 깃 기반의 배포 서버의 마스터 브랜치에 커밋하고 푸시할 때 사용한다.

{% highlight js%}
// Project configuration.
var pkg = require('./package.json');

grunt.initConfig({

  // Various Grunt tasks...

  buildcontrol: {
    options: {
      dir: 'dist',
      commit: true,
      push: true,
      message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
    },
    pages: {
      options: {
        remote: 'git@github.com:example_user/example_webapp.git',
        branch: 'gh-pages'
      }
    },
    heroku: {
      options: {
        remote: 'git@heroku.com:example-heroku-webapp-1988.git',
        branch: 'master',
        tag: pkg.version
      }
    },
    local: {
      options: {
        remote: '../',
        branch: 'build'
      }
    }
  }
});

grunt.registerTask('build', [
  // Collection of tasks that build code to the 'dist' directory...
]);
{% endhighlight %}

이 예제는 예오맨 기반의 웹앱에서 작업하는 사용자의 프로젝트 소스 코드가 `git@github.com:example_user/example_webapp.git`에서 관리되고 있는 경우이다. 배포를 위해 `grunt build`를 실행하면 앱의 최적화된 버전이 'dist' 디렉토리에 생성된다.

`grunt buildcontrol:pages`가 실행되면 빌드된 코드가 'dist/.git' 레포지토리의 hg-pages 브랜치로 커밋된다. 그리고 `git@github.com:example_user/example_webapp.git`의 gh-pages 브랜치로 푸쉬한다.

`grunt buildcontrol:heroku`가 실행되면 빌드된 코드가 'dist/.git' 레포지토리의 마스터 브랜치로 커밋될거고, 'dist/.git'의 최근 커밋에 `pkg.version`의 값이 태깅된다. 만약 그 태그가 이미 존재하지 않는다면 말이다. 그리고 레퍼런스들이 푸쉬되고, `git@heroku.com:example-heroku-webapp-1988.git`의 마스터브랜치에 태그된다.

`grunt buildcontrol:local`의 실행은 'dist/.git' 레포지토리의 build 브랜치로 빌드된 코드가 커밋될거고, 로컬 소스 코드 레포지토리의 build 브랜치로 푸쉬될거다. 로컬 프로젝트 레포지토리는 리모트와 싱크가 된다.

#### Working with .gitignores

어쩌면 당신은 전역으로 무시된 파일이나 디렉토리가 커밋되기를 원할지도 모른다. 혹은 그것이 보워 컴포넌트와 같은 소스 코드 레포지토리라던가, 혹은 파일을 포함되고 제외되는 파일을 만드 아오

You may wish to commit files or directories that are ignored globally or in the source repository (e.g., bower_compontents), or make file inclusion and exclusion the responsibility of the build process alone.

빌드 디렉토리만, 깃이그노어의 스콥을 정하려면 소스 디렉토리에 'gitignore'라는 파일을 만든다.

{% highlight bash %}
# Unignore everything
!**/*

# Re-ignore things
...your ignore rules here
{% endhighlight %}

그 다음 빌드 프로세스가 돌고 있는 동안 '.gitignore'라는 이름으로 빌드 디렉토리에 복사한다.

#### Notes

Grunt-build-control deploys to git endpoints. If you want to deploy to a private server [this tutorial by @curtisblackwell ](http://curtisblackwell.com/blog/my-deploy-method-brings-most-of-the-boys-to-the-yard) is a good place to start.

`buildcontrol` will add commits on top of the existing history of the remote branch if available.

`buildcontrol` is a synchronous task, and fetches from your remote before each commit or push. Depending on the location of your remote, the size of commits, and network speed it can be a long running task.

It's best to run `buildcontrol` manually after your build process or as the last step in a build and deploy task.

If a git conflict occurs (usually because another user has force-pushed to the deployment server) delete the built code directory and run build and build control again.

Don't check out built code branches while in the main project directory. Differences in untracked files will cause issues.
