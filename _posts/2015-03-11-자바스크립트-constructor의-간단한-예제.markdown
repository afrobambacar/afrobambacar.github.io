---
layout: post
title:  "자바스크립트 constructor의 간단한 예제"
date:   2015-03-11
---


constructor는 객체를 만드는 함수를 말한다. 생성자 함수가 보통 constructor이다. 확인하는 방법은 간단하다. 브라우저 콘솔에 다음과 같이 입력하면 확인할 수 있다.

{% highlight bash %}
> var a = function () {};
// undefined
> a.constructor
// function Function() { [native code] }
{% endhighlight %}

```a```라는 함수를 선언했을 때 ```a```는 ```Function```이라는 이름을 가진 생성자 함수로 부터 생성이 되었음을 알 수 있다. ```a```역시 생성자 함수가 될 수 있는데 그것을 확인할 수 있는 방법은 ```a.prototype.constructor```이다. 

{% highlight bash %}
> var a = function () {};
// undefined
> a.constructor
// function Function() { [native code] }
> a.prototype.constructor
// function () {};
{% endhighlight %}

```a```를 생성자 함수로 ```b```라는 객체를 생성하면 ```b.constructor```는 ```a.prototype.constructor```가 된다. 그리고 ```b``` 객체를 생성할 때 ```constructor```인 ```a```함수가 실행되는 것을 볼 수 있다.

{% highlight bash %}
> var a = function (options) { console.log(options); };
// undefined
> var b = new a('hello world');
// hello world
// undefined
> b.constructor
// function (options) { console.log(options); };
{% endhighlight %}

함수만 얘기해서 어려울 수도 있겠다. 더 쉬운 예제.

{% highlight bash %}
> var a = {};
// undefined
> a.constructor
// function Object() { [native code] }
{% endhighlight %}

