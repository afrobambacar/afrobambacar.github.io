---
layout: post
title:  "자바스크립트 apply, call 간단한 예제"
date:   2015-03-11
---

자바스크립트에서 ```apply```, ```call``` 함수에 대한 간단한 예제이다. ```call```과 ```apply```는 실행할 함수에 객체와 ```arguments```를 던져서 실행한다. 함수내에서는 ```this```의 선언으로 전달받은 객체의 값을 할당할 수 있다. 다시 한번 말한다. 호출방식은 ```함수.call(객체, 전달인자)```이다.

{% highlight bash %}
> var a = { x: 1 };
> var b = function () { console.log(this.x); };
> b.call(a);
// 1
{% endhighlight %}

```call```은 ```arguments```를 콤마로 구분, ```apply```는 배열로 받는다.

{% highlight bash %}
> var a = { x: 1 };
> var b = function (y) { console.log(this.x + y); };
> b.call(a, 1);
// 2
> b.apply(a, [1]);
// 2
{% endhighlight %}

실제 서비스에서 많이 사용하는 방식은 다음과 같다. 

{% highlight javascript %}
(function () {
	
	// use strict를 선언하면 함수 내에서 전역을 설정할 수 없다.
	"use strict";
	
	// this는 window 객체가 된다.
	var root = this;

	// 요리하기

}).call(this);
{% endhighlight %}
