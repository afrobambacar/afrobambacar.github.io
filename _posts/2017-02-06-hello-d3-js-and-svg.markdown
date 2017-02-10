---
title: Hello d3.js and svg
description: d3.js와 svg를 이용해서 그래프를 그려보자
date: 2017-02-06
---

d3.js를 이용하여 svg를 다루는 첫 번째 테스트

{% include 2017/d3.html %}

```
var svg = d3.select('svg');
	
svg.selectAll('circle')
	.data([32, 57, 112])
	.enter().append('circle')
	.style('fill', 'steelblue')
	.attr('cy', 60)
	.attr('cx', function (d, i) {
		return i * 100 + 30;
	})
	.attr('r', function (d) {
		return Math.sqrt(d);
	});
```

* ```svg``` svg 시작 태그
* ```g``` 그룹 태그 
* ```rect``` 사각형
* ```circle``` 원
* ```line``` 라인



