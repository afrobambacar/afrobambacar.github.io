---
title: 리액트 네이티브 UI 컴포넌트 및 API
date: 2016-03-23
description: 페이스북에서 친절하게도 예제를 올려주셨다.
---

### UIExplorer

보통의 자바스크립트 개발자가 리액트 네이티브를 활용하고자 할 때 가장 귀찮은 점은 iOS의 네이티브 UI 컴포넌트, API 목록들을 알아야 한다는 점일 것 같다. 리액트 네이티브 문서에서 구지 설명하고 있진 않지만 사실 페이스북은 문서보다 더 친절한 예제를 이미 제공하고 있다. 다음의 Git repository에서 말이다. 

```bash
$ git clone https://github.com/facebook/react-native.git
```

위 레포지토리를 클론받아보면 Examples 디렉토리에 리액트 네이티브의 튜토리얼로 소개된 영화앱을 비롯하여 간단한 게임 앱의 소스가 들어있다. 그리고 무엇보다 리액트 네이티브로 할 수 있는 것들을 소개해 놓은 UIExplorer 앱이 들어있다. UIExplorer 앱을 실행해보면 리액트 네이티브에서 사용할 수 있는 UI 컴포넌트의 예제와 API 예제가 들어있는데 한번 스윽 보기만 해도 리액트 네이티브로 할 수 있는 일들을 파악하는데 도움이 된다. 

다음은 UIExplorer에 소개되어 있는 UI 컴포넌트 및 API에 대한 대략적인 설명이다. 백문이불여일견이라고 사실 한번 실행해서 직접 보는 것이 더 와닿을 것이다.

### UI Components

* <ActivityIndicatorIOS> : 로딩 표시
* <DatePicker> : 날짜 선택 인풋
* <Image> : 이미지 표시
* <ListView> : 목록을 표시할 때 사용, 그리드 레이아웃, 페이징 예제가 담겨있다.
* <MapView> : 맵을 표시할 때 사용
* <Modal> : 레이어드 팝업 표시
* <Navigator> : 화면 전환 애니메이션
* <NavigatorIOS> : 상단 네비게이션 바의 커스터마이징 예제
* <PickerIOS> : 커스텀 선택 인풋
* <RefreshControl> : 스크롤뷰에서의 pull-to-refresh 효과
* <ScrollView> : 스크롤뷰는 리스트뷰와 다르게 특정 영역을 스크롤 할 수 있다.
* <SegmentedControlIOS> : 주로 탭, 서브 네비게이션 바로 사용되는 UI
* <SliderIOS> : 볼륨바와 같은 슬라이더 UI
* <StatusBar> : 상태바 변경 api, 네트워크 사용중, 컬러 변경 등
* <Switch> : true 혹은 false를 선택할 수 있는 스위치
* <TabBarIOS> : iOS에서 주로 사용하는 하단 탭 바
* <Text> : 텍스트 표기
* <TextInput> : 싱글 혹은 멀티라인 텍스트 인풋
* <Touchable*> : 터치 이벤트의 처리 예제, 롱 프레스, 포스 터치 등을 구분해낸다.
* <TransparentHitTestExample> : 효과를 잘 모르겠다.
* <View> : 기본적인 블락요소
* ProgressViewIOS : 프로그레스바
* Layout Events는 레이아웃 애니메이션 효과를 줄 때 사용한다. 

### APIs

* Accessibility: Accessibility 예제
* ActionSheetIOS: 액션쉿은 iOS에서 공유 UI를 생각하면 된다.
* Advertising ID: ad support API
* AlertIOS: iOS의 얼럿창을 띄운다.
* Animated: 페이드인, 트랜스폼 등의 엘리멘트에 적용되는 애니메이션, 뷰 전환, 드래그 등의 애니메이션
* AppStateIOS: iOS 백그라운드 상태 API
* AsyncStorage: 로컬 디스크 동기화
* Border: View의 보더 설정의 다양한 예제
* Box Shadow: View에서 가능한 쉐도우 예제
* Camera Roll: 사용자의 사진을 사용할 수 있는 기능
* Clipboard: 클립보드
* Geolocation: 현재 위치를 알려주는 API
* ImageEditor: 이미지의 스케일 변경, 크롭 할 수 있는 API
* Layout - Flexbox: 플렉스박스 API
* Linking: 외부 url을 여는 기능
* Navigation: 화면 전환 API
* NetInfo: 온라인, 와이파이 등 네트워크 상태 파악
* PanResponder Sample: 
* Pointer Events: 포인터 이벤트 데모
* PushNotificationIOS: 애플 푸시 노티피케이션, 뱃지 밸류
* RCTRootView: 네이티브 애플리케이션과 리액트 네이티브의 통신 메소드
* Snapshot / Screenshot: 캡쳐 API
* StatusBarIOS: iOS 상태바 조작 모듈
* Timers, TimerMixin: 타이머 관련 함수들
* Transforms: 뷰의 각도, 스케일 변환
* Vibration: 진동 API
* XMLHttpRequest: 파일 다운로드, 업로드, 헤더 가져오기 등 

