---
title: d3.js를 이용하여 차트를 그릴 때 알아두면 좋은 것들 
description: d3.js와 svg를 이용해서 그래프를 그려보자
date: 2017-02-07
---

### svg

 동그라미, 네모, 라인 등을 html로 표현하기에는 부족한 부분이 많다. html은 기본적으로 문서를 다루는 형식이기 때문이다. 그래서 대부분의 d3.js 예제들을 보면 svg를 이용한다. svg는 기본적으로 absolute 포지션이기 때문에 데이터를 좌표로 변환하여 표현하기도 좋다. 슬픈일이지만 d3.js를 시작하려면 svg 형식에 대한 공부도 병행하는 것이 좋다. 

### d3-scale

스케일은 쉽게 말하면 데이터를 좌표로 변환해주는 녀석이다. 입력받을 값의 범위인 domain과 출력할 값의 범위인 range를 설정하여 사용하게 된다. 

예를 들면 다음과 같다. 

```
var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 100]);

x(10); // 100
x(5); // 50
```

결국 데이터를 랜더링하기 위한 좌표는 모두 스케일을 통해서 나오므로 꼭 알아야만 한다.

### d3-axis

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
### 기타 

* d3-dsv: csv, tsv 데이터를 불러오고 파싱할 때 사용하는 모듈이다.
* d3-array: 데이터가 되는 배열 형식을 조작할 수 있는 다양한 메소드가 있다. 
* d3-collection: 데이터를 다룬다. getter, setter를 제공한다.
* d3-color: 컬러를 다루는 모듈로 데이터에 맞는 컬러값을 찾아주는데 사용한다. 
* d3-format: 숫자 포맷을 다루며 정확한 혹은 다양한 형식의 데이터 값을 얻을 때 사용한다. 
* d3-dispatch: 이벤트에 대한 콜백을 등록할 때 사용한다.
* d3-drag: 차트 내의 드래그 앤 드랍 이벤트를 다룬다.
* d3-brushes: 랜더링 된 차트의 마우스 혹은 터치 이벤트를 다룬다.
* d3-chord: 원형 레이아웃에 네트워크나 관계를 표현할 때 사용한다.
* d3-force: 이 모듈은 수치 적분을 구현해 놓았다. 이를 통해 특정 형태의 차트를 만들 수 있다. 
* d3-ease: 애니메이션을 다루는 모듈이다.
* d3-geo: 지도를 다룰때 사용하는 모듈이다.
* d3-hierarchy: 계층구조를 만들 때 사용하는 모듈로 클러스터, 트리구조 등을 다룰때 사용한다.
* d3-interpolate: 한가지 예로 숫자에 맞는 특정 컬러를 출력하는 모듈이다. 연속성을 가진 데이터의 특정 값을 출력한다.
* d3-path: svg의 모양을 만들 때 사용한다. d3-shape에 예가 있다.
* d3-polygon: 2차원 다각형을 만들때 사용한다.
* d3-quadtree: 
* d3-queue: 
* d3-random:
* d3-request: 
* d3-scale: 
* d3-selection:
* d3-shape
* d3-time-format: 
* d3-time
* d3-timer
* d3-transition
* d3-voronoi
* d3-zoom

[scale]: https://github.com/d3/d3-scale
[axis]: https://github.com/d3/d3-axis

