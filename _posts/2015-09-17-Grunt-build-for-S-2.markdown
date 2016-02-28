---
layout: post
title:  "Grunt build for S 2.0"
date:   2015-09-17
description: 리퀘스트를 줄이기 위한 S 2.0의 빌드 방식
---

# Overview

S 2.0의 빌드는 1.0과 조금 다릅니다. 1.0에서의 빌드는 html, css, js 파일을 각각 압축하는데에 그쳤지만
S 2.0의 빌드는 html, css, js 파일을 압축하고 하나의 js 파일로 합치는 과정이 있습니다.
이는 브라우저가 서버에 요청하는 수를 줄여주는 효과가 있습니다.
이 문서에서는 위의 과정이 어떻게 진행되는지를 설명하는 문서입니다.

# Concatenating static files

S 2.0에서는 컴포넌트라는 개념이 좀 더 명확해졌습니다. 하나의 컴포넌트 클래스는 완전한 UI 컴포넌트를 의미합니다.
즉, UI 컴포넌트에 필요한 html, css 그리고 js 파일이 하나의 독립적인 컴포넌트를 구성합니다.
컴포넌트는 독립적이면서 서로 영향을 주지 않으므로 그것을 구성하는 여러 파일들을 html, css, js 파일을 하나로 합치는 것이 가능합니다.

위 작업은 Grunt를 통해서 수행하며 그에 대한 Task는 다음과 같습니다.

# About Concat task

먼저 concat 태스크는 다음과 같은 옵션을 제공합니다.
{% highlight js %}
concat: {
	options: {
		process: function (src, filepath) { 
			...
		}
	},
	basic: {
		src: ['a.html', 'a.css', 'a.js'],
		dest: 'a.js'
	},
	...
}
{% endhighlight %}

options.process는 파일을 어떻게 합칠 것인지에 대한 함수를 정의할 수 있습니다.
concat 이라는 이름의 태스크를 그냥 수행할 경우 options 외의 키에 정의된 것들은 모두 수행됩니다.
만약 특정 작업만 수행하려면 concat:basic 을 실행하면 됩니다.
예제의 동작은 다음과 같습니다.
src의 파일들을 options.process 함수에 넘깁니다. process 함수를 통해서 반환된 작업물은 a.js에 합쳐지게 됩니다. 
Custom concat task on Grunt
html, css 그리고 js 파일을 하나로 합치는 커스텀 태스크의 이름은 merge로 Gruntfile.js에 정의되어 있습니다.
merge 태스크는 동적으로 만들어지는데 이는 결국 다음과 같은 객체를 만들기 위함입니다.

{% highlight js %}
concat: {
	options: {
		process: function (src, filepath) {
			...
			if (ext === 'html') {
				src = src.replace(/'/g, "\\'");
				return 'S.Loader.loadComponentHtml(\'' + componentName + '\', \'' + src + '\');';
			} else if (ext === 'css') {
				return 'S.Loader.loadComponentCss(\'' + componentName + '\', \'' + src + '\');';
			} else {
				return src
			}
 
		}
	},
	'dist/client/Components/App/': {
		src: ['dist/client/Components/App/App.html', 'dist/client/Components/App/App.css', 'dist/client/Components/App/App.js'],
		dest: 'dist/client/Components/App/App.js'
	},
	...
}
{% endhighlight %}

일부는 생략했으나 위의 포맷은 앞서 소개한 concat 태스크의 포맷과 동일합니다.
src의 파일 목록들은 하나씩 process에 정의된 함수에 던져지고, 확장자에 따라서 S.Loader.loadComponentHtml() 스트링 혹은 S.Loader.loadComponentCss()와 조합되어 반환됩니다.
모든 컴포넌트는 위의 과정을 거쳐 결국 하나의 js 파일로 합쳐지게 됩니다.

# Order the tasks
빌드에 수행되는 태스크의 순서는 다음과 같습니다. 

{% highlight js %}
grunt.registerTask('build', ['clean:init', 'copy', 'useminPrepare', 'concat', 'cssmin', 'htmlmin','uglify', 'merge', 'clean:build','filerev', 'usemin', 'filerev_assets', 'buildcontrol:build']);
{% endhighlight %}

* clean:init: 로컬의 dist 디렉토리를 비웁니다.
* copy: server 디렉토리를 비롯한 CI 관련 디렉토리를 dist 디렉토리에 복사합니다.
* useminPrepare: main_script.php에 정의된 usemin 블락을 수행할 준비를 합니다.
* concat: usemin 블락의 스크립트를 concat 합니다.
* cssmin: client 디렉토리의 css 파일을 찾아 모두 압축합니다.
* htmlmin: client 디렉토리의 html 파일을 찾아 모두 압축합니다.
* uglify: client 디렉토리의 js 파일을 찾아 모두 압축합니다. 
* merge: html, css, js 파일을 하나의 js 파일로 만듭니다.
* clean:build: dist/client 디렉토리의 사용하지 않는 파일 (html, css) 파일을 제거합니다.
* filerev: js 파일들을 해싱한 후 파일명을 변경합니다.
* usemin: usemin을 수행한 main_script.php 파일을 반환합니다.
* filerev_assets: 해싱한 js 파일들이 어떤 이름으로 변경되었는지 assets.json 파일로 생성합니다.
* buildcontrol:build: build 브랜치에 push 합니다.

