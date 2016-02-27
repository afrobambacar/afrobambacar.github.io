---
layout: post
title:  "자바스크립트 가우시안블러 처리, Stack Blur"
date:   2014-04-09
---

[Rdio.com](http://rdio.com)의 자바스크립트 라이브러리 파일을 보면 [StackBlur](http://www.quasimondo.com/StackBlurForCanvas/StackBlurDemo.html)가 포함되어 있다. 이는 플레이어 백그라운드 이미지에 가우시안 블러 효과를 주는데 사용된다. 사용 방법은 매우 단순하다. 3개의 파라미터만 넘기면 된다.

1. img 태그의 id 값
2. canvas 태그의 id 값
3. 원하는 가우시안 블러의 값

{% highlight html %}
<img id="img" src="data:image/png;base64, ...." />
<canvas id="canvas"></canvas>
{% endhighlight %}

{% highlight js %}
stackBlurImage("img", "canvas", 100);
{% endhighlight %}

이 때 img 태그의 src에는 base64로 인코딩 된 data uri여야 한다. php를 사용한다면 다음의 메쏘드를 이용하여 on the fly 상태에서 변환할 수 있다. 

{% highlight php%}
<?php echo base64_encode(file_get_contents("../images/folder16.gif")) ?>
{% endhighlight %}

혹은 [여기](http://jpillora.com/base64-encoder/)에서 이미지 파일을 드래그앤드랍하면 base64-encode된 스트링을 얻을 수 있다.
