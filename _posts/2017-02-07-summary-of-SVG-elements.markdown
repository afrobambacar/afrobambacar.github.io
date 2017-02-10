---
title: svg 엘리먼트들 요약
description: 익숙하지 않은 새로운 태그들을 정리해둔다.
date: 2017-02-07
---

```
<svg width="400" height="200">
	<g>
		<rect></rect>
		<circle></circle>
		<line></line>
	</g>
</svg>
```

* ```svg``` - svg 시작 태그
	```width``` - 가로 넓이
	```height``` - 세로 높이
* ```defs``` - 재사용이 가능하도록 
* ```g``` - 그룹 태그 이 태그가 하는 역할은 [SVG Group Element and D3.js][SVG Group Element and D3.js] 여기에 아주 잘 설명이 되어 있다. 엘리먼트들을 그룹으로 묶어서 영역을 이동시키기에 딱 좋은 태그이다.
	```transform``` - 그룹의 위치를 지정할 수 있다.
* ```rect``` 사각형
* ```circle``` 원
* ```line``` 라인

[SVG Group Element and D3.js]: https://www.dashingd3js.com/svg-group-element-and-d3js