---
title: d3.js를 이용하여 차트를 그릴 때 알아두면 좋은 것들 
description: d3.js와 svg를 이용해서 그래프를 그려보자
date: 2017-02-07
---

### d3.scaleLinear()

데이터를 좌표로 변환해주는 변환기라고 생각하면 쉽다. domain 내에서 주어진 값들을 range에 맞게 변환해준다. domain은 실제 차트에 랜더링할  데이터이고 range는 해당 데이터가 화면의 어디에 위치해야하는지 알려주는 픽셀 값이라고 생각하면 된다.

```
var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 100]);

x(10); // 100
x(5); // 50
```
스케일과 관련된 d3.js의 메서드는 [d3-scale][scale]에 정의되어 있다.

### d3.axisLeft()

d3.axisLeft는 차트의 눈금을 자동으로 그려준다. [d3-axis][axis] 섹션에 있는 메써드이며 다음과 같은 것들도 함께 들어있다. 

* d3.axisTop
* d3.axisRight
* d3.axisBottom
* d3.axisLeft

```
var axis = d3.axisLeft(scale);

d3.select("body").append("svg")
    .attr("width", 1440)
    .attr("height", 30)
  .append("g")
    .attr("transform", "translate(0,30)")
    .call(axis);
```
여기서 scale은 위에 정의한 ```d3.scaleLinear()```에서 정의한 ```domain```, ```range```를 포함한 함가 된다.


[scale]: https://github.com/d3/d3-scale
[axis]: https://github.com/d3/d3-axis

