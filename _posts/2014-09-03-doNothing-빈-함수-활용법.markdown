---
layout: post
title:  "doNothing, 빈 함수 활용법"
date:   2014-09-03
---

```doNothing``` 함수는 말 그대로 아무것도 하지 않는 함수를 말한다. 대략 다음과 같이 생겼다.

{% highlight javascript %}
var doNothing = function () {}
{% endhighlight %}

아무것도 하지 않는 함수가 왜 필요할까? 생각해보다가 문득 떠오른 것이 만약 함수타입의 어떠한 것을 다른 브라우저에서는 부르지 못하는 상황이 떠올랐다. 예를 들면 다음과 같은 것이다.

{% highlight javascript %}
_.isUndefined(window.console) ? R.doNothing : console.log
{% endhighlight %}

```typeof console.log```는 ```function```이다. 만약 이 함수를 지원하지 않는 브라우저에서 호출할 경우 에러가 발생할 수 있다. 예를 들면 IE7에서는 잘못 배포된 ```console.log``` 한 줄 때문에 장애를 일으킬 수 있다. 이런 상황을 방지하기 위해 만약 ```window.console```이 정의되지 않은 경우 ```console.log```와 같은 타입인 함수를 할당해 놓는 것이다. 대신에 아무것도 하지 않는 함수를 말이다.

이렇게 정의해 놓으면 특정 함수를 지원하지 않는 브라우저에서도 에러가 발생하는 상황을 피할 수 있게 된다. 