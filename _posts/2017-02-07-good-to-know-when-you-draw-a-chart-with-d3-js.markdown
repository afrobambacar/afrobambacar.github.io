---
title: d3.js를 이용하여 차트를 그릴 때 알아두면 좋은 것들 
description: d3.js와 svg를 이용해서 그래프를 그려보자
date: 2017-02-07
---

### d3.scaleLinear()

domain 내에서 주어진 값들을 range에 맞게 변환해준다. domain은 실제 차트에 랜더링할  데이터이고 range는 해당 데이터가 화면의 어디에 위치해야하는지 알려주는 픽셀 값이라고 생각하면 된다.

```
var x = d3.scaleLinear()
    .domain([0, 10])
    .range([0, 100]);

x(10); // 100
x(5); // 50
```
