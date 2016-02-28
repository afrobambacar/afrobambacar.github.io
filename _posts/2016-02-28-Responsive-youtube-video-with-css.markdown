---
title: "반응형 사이트에 유튜브 임베드 하기"
date: 2016-02-28
description: html, css로 해결해보자.
---

이 블로그는 jekyll로 만들고 있으며 포스트를 작성할 때 마크다운을 사용한다. 하지만 html 태그를 그대로 써도 동작하고 있으니 유튜브 비디오를 붙일 때의 iframe도 역시 동작한다. 

jekyll 블로그의 경우 대부분 모바일에서도 문제없이 보이게 하기 위해 반응형 레이아웃을 사용한다. 하지만 유튜브의 embed 코드는 사이즈를 하나만 정할 수 있기 때문에 반응형 레이아웃에서는 사이즈에 따라서 embed한 비디오가 레이아웃을 벗어나는 경우가 생긴다. 

이를 해결하는 방법은 wrapper를 사용하는 것이다. 
{% highlight html %}
<div class="videoWrapper">
    <!-- Copy & Pasted from YouTube -->
    <iframe width="560" height="315" src="https://www.youtube.com/embed/WzcCzKupGUo" frameborder="0" allowfullscreen></iframe>
</div>
{% endhighlight %}

{% highlight css %}
.videoWrapper {
	position: relative;
	padding-bottom: 56.25%; /* 16:9 */
	padding-top: 25px;
	height: 0;
}
.videoWrapper iframe {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
{% endhighlight %}

css 파일에 ```videoWrapper``` 클래스를 정의해놓고, 아이프레임을 감싸는 ```videoWrapper div```를 만들면 해결된다. 
