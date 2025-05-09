---
title: "BBC Audiowaveform 오픈 소스를 이용한 Wavefrom data 추출 및 D3.js로 렌더링하기"
date: 2020-03-28
description: Github엔 없는 게 없고 개발자 도구 열면 다 나와
---

![Tracklib](/assets/images/2025/2025-03-28-5-25-32-PM.png)

![Soundcloud](/assets/images/2025/2025-03-28-5-24-58-PM.png)

아티스트명, 곡명 등의 Metadata와 앨범커버는 음악을 인식하는데 도움을 주는 정보들입니다. 그리고 위와 같이 트랙립과 사운드클라우드는 한 가지 정보를 더 표시합니다. 바로 Audio Waveform UI 입니다. 인터렉티브 한 Audio Waveform UI를 만들기 위해서 몇 가지 배제한 조건들이 있습니다. 

1. Javascript 혹은 NodeJS로 구현이 가능할 것
2. 인터렉티브 해야하므로 Audio Waveform을 이미지로 제작하는 라이브러리는 배제함
3. 브라우저에서 Audio Waveform data를 추출해서 렌더링하는 라이브러리는 퍼포먼스 이슈로 배제함
4. 가능하다면 Audio Waveform의 형태를 커스터마이징 할 수 있어야 함

트랙립과 사운드클라우드의 콘솔을 뒤적거리고 구글링을 통해 이 문제를 해결하기 위한 단서들을 발견했습니다.

* BBC의 오픈 소스인 [audiowaveform](https://github.com/bbc/audiowaveform)은 오디오 파일에서 data를 추출할 수 있습니다. 
* [wav2json](https://github.com/beschulz/wav2json)도 마찬가지로 data를 추출할 수 있습니다. 
* D3.js로 Audio Waveform을 그리는 데모를 [발견](https://observablehq.com/@radames/audio-waveform-generator-with-d3)

> Waveform data files are saved in either binary format (.dat) or JSON (.json). Given an input waveform data file, audiowaveform can also render the audio waveform as a PNG image at a given time offset and zoom level.

최종적으로는 C++로 개발된 BBC의 audiowaveform 라이브러리를 선택했고, D3.js로 렌더링하는 것을 프로젝트의 목표로 삼았습니다. C++로 개발됐음에도 BBC의 audiowaveform 라이브러리를 선택한 이유는 왠지모를 신뢰감... json으로 뽑을 수 있다면 어마무시한 데이터를 DB에 저장하지 않아도 된다는 생각이 있었기 때문입니다. 저는 json 데이터를 CloudFront에 캐싱해서 마치 이미지를 불러오듯 프론트에서 호출하는 상상을 했습니다. (나중에 트랙립의 API 응답을 보니 DB에서 데이터를 내려주고 있더군요!)

### 1부 C++ 라이브러리, Dockerizing

C++로 만들어진 audiowaveform 라이브러리를 프로덕션 레벨에서도 사용할 수 있게 Dockerfile을 만들었습니다.

```
FROM node:20-alpine

RUN apk add \
    git \
    make \
    cmake \
    gcc \
    g++ \
    libmad-dev \
    libid3tag-dev \
    libsndfile-dev \
    boost-program_options \
    gd-dev \
    boost-dev \
    libgd \
    libpng-dev \
    zlib-dev \
    zlib-static \
    libpng-static \
    boost-static \
    autoconf \
    automake \
    libtool \
    gettext

RUN apk add --update ffmpeg

RUN wget https://github.com/xiph/flac/archive/1.3.3.tar.gz \
    && tar xzf 1.3.3.tar.gz \
    && cd flac-1.3.3 \
    && ./autogen.sh \
    && ./configure --enable-shared=no \
    && make \
    && make install

RUN git clone https://github.com/bbc/audiowaveform.git \
    && cd audiowaveform \
    && wget https://github.com/google/googletest/archive/release-1.11.0.tar.gz \
    && tar xzf release-1.11.0.tar.gz \
    && ln -s googletest-release-1.11.0 googletest \
    && mkdir build \
    && cd build \
    && cmake .. \
    && make \
    && make install \
    && audiowaveform --help
```

제가 만든 도커의 저장소는 [여기](https://github.com/samdbox/nodio) 있습니다. 아래와 같이 당겨서 쓰셔도 됩니다.

```
docker pull ghcr.io/samdbox/nodio:latest
```

이제 audiowaveform data를 추출하고자 하는 앱에서 위 도커 이미지를 기본 이미지로 설정하여 앱을 올리면 될 것입니다. 예를 들면 아래와 같이 할 수 있습니다.

```
FROM ghcr.io/samdbox/nodio:latest

# 도커라이징 하고자 하는 앱의 명령어
...
```

그리고 애플리케이션 레벨에서는 NodeJS의 child_process 모듈을 활용해서 라이브러리를 사용할 수 있습니다. 아래 코드는 지정된 경로에 json 파일을 만드는 NodeJS 코드입니다.

```
import { promisify } from 'util'
import { exec } from 'child_process'

const run = promisify(exec)

export const waveform = () => path =>
  run(`audiowaveform -i ${path} -o ${path}.json -z 256 -b8`)
    .then(({ stdout, stderr }) => {
      /* eslint-disable no-console */
      console.log('stdout:', stdout)
      console.log('stderr:', stderr)
      return path
    })
```

생성된 json 파일을 열어보면 아래와 같은 정보가 담겨있고, 제가 구현한 것과 같이 json 파일을 CDN에 캐싱하거나, 트랙립처럼 data 부분을 DB에 저장해서 렌더링 할 때 사용할 수 있습니다.

```
{
  "sample_rate": 44100,
  "samples_per_pixel": 256,
  "bits": 8,
  "length": 32504,
  "data": [0,0,0 ....]
}
```

### 2부 D3.js를 이용한 audio waveform 렌더링

![Tracklib polygon](/assets/images/2025/2025-03-28-6-34-40-PM.png)

집념을 가지고 웹 인스펙터를 열어보면 렌더링을 어떻게 하는지 힌트를 얻을 수 있습니다. 렌더링의 결과는 SVG 파일이며 ploygon이라는 사실이 눈에 띕니다. 하면서 알게 된 사실인데 json 파일을 호출해서 받은 데이터를 그대로 쓰기에는 앞서 언급했던 4번 Waveform의 형태를 커스터마이징 하기에 어려움이 있었습니다. json의 data를 적절하게 변경시켜줄 라이브러리를 찾던 중 waveform-data.js 모듈을 발견했고 D3.js로 렌더링하는 예제도 수록되어 있어서 모듈을 추가했습니다.

```
yarn add waveform-data
```

아래는 waveform-data.js에 수록된 예제 코드 입니다.

```
const waveform = WaveformData.create(raw_data);
const channel = waveform.channel(0);
const container = d3.select('#waveform-container');
const x = d3.scaleLinear();
const y = d3.scaleLinear();
const offsetX = 100;

const min = channel.min_array();
const max = channel.max_array();

x.domain([0, waveform.length]).rangeRound([0, 1000]);
y.domain([d3.min(min), d3.max(max)]).rangeRound([offsetX, -offsetX]);

const area = d3.svg.area()
  .x((d, i) => x(i))
  .y0((d, i) => y(min[i]))
  .y1((d, i) => y(d));

const graph = container.append('svg')
  .style('width', '1000px')
  .style('height', '200px')
  .datum(max)
  .append('path')
  .attr('transform', () => `translate(0, ${offsetX})`)
  .attr('d', area)
  .attr('stroke', 'black');
```

아래는 제가 구현한 리액트 함수의 일부입니다.

```
function renderWaveform(svgRef) {
  const { d3 } = window

  // CDN에 저장한 json 파일 불러오기
  fetch(`https://cdn.example.com/${model.get('waveform')}`)
    .then((response) => (response.status === 200 ? response.json() : null))
    .then((json) => {
      if (!json) return
      // waveform-data.js를 이용하여 data를 적절하게 변환
      const waveform = WaveformData.create(json)
      const resampleWaveform = waveform.resample({ width: 512 })
      const channel = resampleWaveform.channel(0)
      const min = channel.min_array()
      const max = channel.max_array()

      /**
       * d3.scaleLinear
       * domain: 미니멈, 맥시멈 스케일을 지정합니다.
       * rangeRound: 전달받은 값을 지정한 범위의 값으로 변환합니다.
       * polygon의 좌표는 `x, y`값이 `0, 0`을 기준으로 잡기 때문에 양수로 모두 변환될 수 있도록 rangeRound를 지정
       */
      const layout = d3.select(svgRef.current)
      const x = d3.scaleLinear().domain([0, resampleWaveform.length]).rangeRound([0, maxWidth])
      const y = d3
        .scaleLinear()
        .domain([d3.min(min), d3.max(max)])
        .rangeRound([0, maxHeight])

      /**
       * polygon에 전달할 points는 역순으로 만들어져야 하므로 `reverse()` 사용
       * eg. [[0 ,1], [4, 10], [8, 100], [8, 100], [4, 10], [0, 1]]
       */
      const maxPoints = max.map((d, i) => [x(i), y(d)])
      const minPoints = min.map((d, i) => [x(i), y(d)])
      const points = maxPoints.concat(minPoints.reverse())

      /**
       * polygon svg render
       * - base waveform
       * - clip-path
       */
      layout.append('polygon').attr('points', points).attr('fill', '#3C4855')
      layout
        .append('polygon')
        .attr('points', points)
        .attr('fill', '#adb7bf')
        .attr('clip-path', `url(#progress-clip-path-${model.get('_id')})`)
    })
}
```

샘플 테스트 결과

![Sampleer](/assets/images/2025/2025-03-30-2-51-55-PM.png)

### 결론

SVG로 렌더링이 되어 있으므로 이미지를 불러오는 것 보다 훨신 자유도 높은 인터렉션을 추가 할 수 있습니다. 클릭했을 때 재생되는 효과를 추가하거나, 재생된 부분 만큼 색을 변경 할 수도 있습니다. Player와 연동하여 Seeking 기능을 추가할 수도 있습니다. 

막연하게 사이트에 Audio Waveform UI를 도입하고 싶어서 열심히 찾아본 기술인데 해외에서도 웹 음악 기술이 인기 항목은 아닌 것 같습니다. 그런데 찾으면 다 나온다는 사실, 못 찾으면 인스펙터를 통해서 어떻게 했는지 추적할 수 있다는 사실!

