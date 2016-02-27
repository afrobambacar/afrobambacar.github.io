---
layout: post
title:  "자바스크립트 함수 내 arguments"
date:   2015-03-11
---

```arguments```는 자바스크립트 함수 내에서 선언하지 않고도 사용할 수 있는 녀석이다. 이미 ```Function.prototype```에 정의되어 있는 녀석이기 때문이다. (```function```과 ```Function```은 다르다.) ```function```을 생성한다는게 ```Function```이라는 녀석의 ```prototpye```을 사용하는 것이기 때문에 가능한 일이다. ```arguments```는 함수가 전달받은 값들을 배열로 만들어 준다. 

다음과 같다.

{% highlight bash %}
> var a = function (x, y) { console.log(arguments); };
> a(1, 2);
// [1, 2]
{% endhighlight %}

선언되지도 않은 변수가 자리잡고 있다고 해서 놀라지 말자.