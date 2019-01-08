---
title: 퀵타임 플레이어와 ffmpeg로 gif 만들기
date: 2018-11-01
description: 외울 수 없으니 적어두자
---

### 맥에서 GIF를 개발자스럽게 만들고 싶다. 

그렇다면 ffmpeg를 써보자. ffmpeg는 미디어 파일을 변환해주는 훌륭한 라이브러리다. 비디오, 오디오, 인코딩, 스트리밍, 뭐 별에 별 곳에 다 쓰이는 녀석이다. 문제는 옵션이 너무 다양해 맨날 붙잡고 늘어지지 않는 이상 이것을 외우기가 힘들다는 점이다.

그래서 아래 내가 GIF 만들 때 사용하는 명령어를 살짝 적어본다.

```bash
$ ffmpeg -i Untitled.mov -pix_fmt rgb8 -r 25 -filter:v "setpts=0.25*PTS" -f gif out.gif
```

옵션을 일일이 설명하긴 힘들지만 몇 가지 특이한 것은 짚고 넘어가자.

* -i: 입력 파일이다.
* -pix_fmt: 픽셀 포맷을 얘기한다.
* -r: 프레임을 설정할 수 있다.
* -filter: v라는 스트림에 setpts 필터를 걸겠다는 것이다. 이때 setpts는 영상의 재생스피드를 변경하는 값을 적었다.
* -f: 포맷을 gif로 하겠다는 것이다.

### GIF 만들기

맥 유저라면 quickTime Player를 통해 화면을 녹화할 수 있다. File 메뉴에서 New Screen Recording 메뉴를 찾을 수 있는데 이것은 화면을 동영상으로 녹화하는 기능이다. 이 기능을 이용하여 mov 파일을 만들 수 있다. 이렇게 녹화한 파일을 ffmpeg의 위 명령어를 통해 변환을 할 수 있다. 

![web](https://user-images.githubusercontent.com/1336102/47803381-ae4d1700-dd75-11e8-8511-d65d5a2173c6.gif)

<img src="https://user-images.githubusercontent.com/1336102/49519619-bd7b3380-f8e4-11e8-92d5-4ddc182a3f2c.gif" alt="drawing" width="250"/>

