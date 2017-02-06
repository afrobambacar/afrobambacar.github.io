---
title: 마크다운 블로그 포스트에 html/ccs/js 포함하기
description: include를 이용하자.
date: 2017-02-06
---

### 지킬 포스트에 HTML 삽입하기

질문: Web Audio Api HTML5 코드를 지킬 포스트에 삽입하고 싶은데 어떻게 할 수 있죠?

답변: 만약 당신이 포스트를 만들 때 마크다운을 이용하고 있다면 ```include``` 태그를 이용할 수 있어요. 

블로그 프로젝트 루트에 ```_include``` 라고 폴더를 만든 후 그 안에 html 파일들을 생성하세요. 예를들어 ```mycomponent.html```을 만들었다고 하고 그것을 포스트에 삽입하고 싶다면 다음과 같이 쓰면 됩니다. 

{% highlight javascript %}
	{% include mycomponent.html %}
{% endhighlight %}

당연히 mycomponent.html 파일은 HTML/CSS/JS를 포함할 수 있어요.

[Insert HTML to Jekyll post]: http://stackoverflow.com/questions/28178532/insert-html-to-jekyll-post