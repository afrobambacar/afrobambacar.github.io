---
title: 리액트 네이티브 팁
description: 
---

#### console.log 등의 디버깅

시뮬레이터에서 cmd + control + z 단축키를 누르면 쉐이크 모드로 진입한다. 메뉴 중 Debug in chrome을 터치하면 크롬의 콘솔 창에서 디버깅을 할 수 있다.

#### No provisioning profiles found

xcode project 파일을 열였을 때 No provisioning profiles found 메시지가 뜨는 것은 애플 개발자 프로그램에 등록하지 않았기 때문이다. 참고로 애플 개발자 프로그램에 등록하지 않았다면 실제 디바이스에서도 테스트를 할 수 없다.

#### UIExplorer

React native가 제공하는 iOS UI 컴포넌트들을 열람하길 원한다면 https://github.com/facebook/react-native.git 레포지토리에 등록되어있는 UIExplorer를 살펴보면 편하다.