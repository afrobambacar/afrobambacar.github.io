---
title: d3.js를 이용하여 차트를 그릴 때 알아두면 좋은 것들 
description: d3.js와 svg를 이용해서 그래프를 그려보자
date: 2017-02-07
---

### svg

 동그라미, 네모, 라인 등을 html로 표현하기에는 부족한 부분이 많다. html은 기본적으로 문서를 다루는 형식이기 때문이다. 그래서 대부분의 d3.js 예제들을 보면 svg를 이용한다. svg는 기본적으로 absolute 포지션이기 때문에 데이터를 좌표로 변환하여 표현하기도 좋다. 슬픈일이지만 d3.js를 시작하려면 svg 형식에 대한 공부도 병행하는 것이 좋다. 

### 데이터를 좌표로 변환하는 함수, d3-scale

스케일은 쉽게 말하면 데이터를 좌표로 변환해주는 녀석이다. 입력받을 값의 범위인 domain과 출력할 값의 범위인 range를 설정하여 사용하게 된다. 

예를 들면 다음과 같다. 

```
var scale = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 100]);

scale(10); // 100
scale(5); // 50
```

결국 데이터를 랜더링하기 위한 좌표는 모두 스케일을 통해서 나오므로 꼭 알아야만 한다.

### x, y축의 눈금을 생성하는 녀석, d3-axis

axis는 차트의 눈금을 그려주는 역할을 한다. d3.js는 설정한 스케일에 따라서 차트의 눈금을 자동으로 만들어 주는 기능을 내포하고 있으므로 활용하면 좋다.

```
var axis = d3.axisLeft(scale);

d3.select("body").append("svg")
    .attr("width", 1440)
    .attr("height", 30)
  .append("g")
    .attr("transform", "translate(0,30)")
    .call(axis);
```

axis를 만들때는 scale을 넘겨줘야 한다. 스케일은 위에서 말한 ```d3.scaleLinear()``` 같은 함수다.

### svg 태그 생성 혹은 선택하기, d3-selection

jquery로 엘리먼트를 선택하는 것이 익숙하다면 이 부분은 문제가 없다. d3-selection도 그와 똑같이 동작하기 때문이다. 특정 엘리먼트를 선택하는 것도, 생성하는 것도 비슷하다. 

```
// tag selection
var svg = d3.select('svg');

// class selection
var chart = d3.select('.chart');

// id selection
var scatterChart = d3.selection('#scatter_chart');
```

### 데이터를 차트에 전달하기

데이터를 차트에 표시하는 방법은 위에서 만든 스케일을 이용한다. 차트는 svg를 통해서 그려지므로 스케일과 데이터를 svg를 핸들링 할 때 전달해주면 된다. 

```
var data = [{ x: 1, y: 1 }, { x: 2, y: 2 }];

var svg = d3.select('svg');
var g = svg.append('g');

g.append('g')
		.selectAll('.dot')
		.data(data)
	.enter().append('rect')
		.attr('class', 'dot')
		.attr('width', 8)
		.attr('height', 8)
		.attr('x', function (d) { return scale(d.x); })
		.attr('y', function (d) { return scale(d.y); });
```

### 기타 

이 밖에도 무수한 api가 있으나 아직 활용해보진 않았다. 대충 살펴보면 다음과 같은 것들이 있다.

* d3-dsv: csv, tsv 데이터를 불러오고 파싱할 때 사용하는 모듈
* d3-array: 데이터가 되는 배열 형식을 조작할 수 있는 모듈
* d3-collection: 데이터를 다룬다. getter, setter를 제공
* d3-color: 컬러를 다루는 모듈
* d3-format: 숫자 포맷을 다루는 모듈
* d3-dispatch: 이벤트에 대한 콜백을 등록할 때 사용하는 모듈
* d3-drag: 드래그 앤 드랍 모듈
* d3-brushes: 마우스, 터치 이벤트를 다루는 모듈
* d3-chord: 원형 레이아웃 모듈
* d3-force: 수치적분 모듈
* d3-ease: 애니메이션을 다루는 모듈
* d3-geo: 지도를 다룰때 사용하는 모듈
* d3-hierarchy: 클러스터, 트리 등 계층구조 모듈
* d3-interpolate: 연속성을 가진 데이터의 특정 값을 출력하는 모듈
* d3-path: svg의 모양을 만들 때 사용한다. d3-shape에 예가 있다.
* d3-polygon: 2차원 다각형
* d3-quadtree: 2차원 공간분할
* d3-queue: 대기열 생성
* d3-random: 무작위 숫자 생성
* d3-request: 리퀘스트 모듈
* d3-shape: 여러가지 모양 모듈
* d3-time-format: 시간 포맷 모듈
* d3-time: 시간 계산 모듈
* d3-timer: requestAnimationFrame, setTimeOut을 사용한 큐 모듈
* d3-transition: 애니메이션 효과 모듈
* d3-voronoi: 보로노이 다이어그램 모듈
* d3-zoom: 줌 모듈
