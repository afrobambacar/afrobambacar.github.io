---
title: "[번역] 리액트 네이티브 앱을 패스트래인과 트래비스CI를 사용하여 배포하기"
date: 2019-01-12
description: Fastlane과의 혈투
---

원문: [Shipping React Native apps with Fastlane and Travis](https://carloscuesta.me/blog/shipping-react-native-fastlane-travis/)

약 일년 전에 Fastlane을 이용하여 리액트 네이티브 앱의 배포 프로세스를 설명한 [블로그 포스트](https://carloscuesta.me/blog/shipping-react-native-apps-with-fastlane/)를 쓴 적이 있습니다. 그 블로그 포스트에서는 앱을 배포하기 위해 로컬 머신에서 자동화 하는 방법에 대해 적었습니다. 오늘은 이것을 더 발전시켜 Travic CI를 이용하여 더 편리하게 배포하는 방법에 대해서 알아보려고 합니다. 

## 과정

무엇이 문제인지 설명하기 전에 복잡한 배포 프로세스가 어떻게 진행되는 지 알아보려고 합니다. 요컨대 리액트 네이티브는 iOS, Android가 있고, 플랫폼 별로 각각 두개의 앱을 컴파일 해야 합니다. 예를들면 베타 테스트 앱과 프로덕션 앱 입니다. 

기본적으로 모든 플랫폼은 다음과 같은 lane 설정을 해야 합니다.

* 코드 사인 설정
* 버전 관리
* 네이티브 빌드
* 베타 테스트 배포
* 스토어 배포
* 소스맵
* 커뮤니케이션

이제 우리가 해야할 일이 무엇인지 이해하기 위해 배포 과정의 각 단계를 깊이 들여다 보겠습니다. 

### 코드 사인 설정

네이티브 애플리케이션의 _Singing_ 은 특히 번거로운 부분입니다. 특히 자바스크립트 에코시스템에서는요. _Certificates_, _Provisioning profiles_, _key_ 등은 팀 단위로 작업을 할 땐 완벽하게 해결해야하는 부분입니다.

우리는 _Fastlane_ 을 통한 [codesigning.guid](https://codesigning.guide/) 컨셉을 채택했습니다. 기본적으로 이 아이디어는 팀 단위에서 작업할 때 _distrubute certificates_ 를 Git 저장소에 저장하는 것에서 출발했습니다. 마찬가지로 우리도 iOS와 안드로이드의 암호화한 _code signing_ 파일을 프라이빗 Git 저장소에 저장하여 사용합니다. 

그 다음 우리의 CI 머신은 배포할 때마다 해당 저장소를 클론받고 복호화한 인증서(certificates)를 설치합니다. 특히 iOS 배포일 때는 CI가 인증서가 설치된 위치에 OS X 키체인을 생성해야 합니다.

### 버전 관리

네이티브 빌드와 앱스토어 배포는 코드 버전이 필요합니다.

모든 플랫폼은 버전과 빌드 넘버를 다루는 각자의 방법이 있습니다. 버전과 빌드 넘버는 차이가 있는데 버전은 새로운 릴리즈를 구분하는 사용자에게 공개된 번호이고, 빌드 넘버는 모든 빌드 때마다 하나씩 증가하여 각 빌드를 구분짓는 식별자 입니다. 

**안드로이드**

* Public version number: `versionName`
* Build numbers: `VERSION_CODE`

**iOS**

* Public version number: `CFBundleShortVersionString`
* Build numbers: `CFBundleVersion` and `CURRENT_PROJECT_VERSION`

이 어트리뷰츠는 _.plist_, _.pbxproj_, _.properties_ 그리고 _.gradle_ 파일에 저장됩니다. 이를 자동화하고 버전 관리를 하기 위해서 우리는 `package.json` 버전 넘버를 사용할 수 있습니다. 이것은 우리가 버전관리를 위해 `npm version` cli 명령어를 사용할 수 있도록 해줍니다.

### 네이티브 빌드

우리는 앱을 빌드하기 위해 두대의 머신을 준비해야 합니다. iOS를 위해서는 Xcode와 macOS를 설정해야 합니다. 왜냐하면 그것이 앱을 컴파일 하기 위해 유일하게 제공되는 수단이기 때문이죠. 안드로이드의 경우에는 Android Studio, packages와 tools가 갖추어진 리눅스 시스템을 준비해야 합니다. 

이 머신들은 CI툴에서 생성할 수 있습니다. 그 말은 모든 빌드가 clean environment 인스턴스에서 동작할 수 있다는 얘기입니다.

### 베타 테스트 배포

베타 테스트 앱의 배포를 위해 우리는 iOS의 경우 TestFlight를, 안드로이드일 경우에는 HockeyApp을 사용할 수 있습니다. 구글 플레이 베타를 이용할 수도 있지만 HockeyApp과 비교하면 너무 느립니다.

### 스토어 배포

앱 스토어에 앱을 배포하기 위해서는 iOS의 경우 프로덕션으로 빌드된 앱을 테스트플라이트에 업로드 할 수 있습니다. 그리고 안드로이드의 경우에는 구글 플레이 스토어에 업로드 할 수 있습니다. 릴리즈는 사람이 수동으로 하게 되어 있습니다. 

### 소스맵

크래쉬와 에러에 대한 정보를 사람이 읽을 수 있게 하기 위해서 Bugsnag을 이용할 수 있습니다. 새로운 빌드를 배포할 때마다 우리는 디버그 심볼인 `.dSYM`과 소스맵을 Bugsnag에 업로드 해야 합니다. 

### 커뮤니케이션

마지막으로 앱이 배포되었을 때 우리는 베타테스터, 릴리즈 매니저 그리고 개발자들에게 새로운 버전이 나왔음을 알려줘야 합니다. 이것은 슬랙봇으로 채널에 노티피케이션을 전송할 수 있습니다. 

## 문제점

릴리즈를 하려고 할 때마다 우리는 Fastlane deployment lanes에 수동으로 불을 지펴야 했습니다. 이 말은 사람의 손이 꼭 필요했다는 말입니다. 코드 사인은 자주 실패하고 편향된 환경, 소프트웨어 업데이트, 네이티브 플랫폼 디펜던시 등 시간을 축내는 요소는 많이 있습니다. 

> 기계는 일을 해야하고 사람은 생각을 해야한다.

우리는 배포에 필요한 모든 것을 자동화 함으로써 이런 문제들을 끝내기로 결정했습니다.

## 해결방법

해결방법은 우리의 마스터 브랜치 푸쉬가 앱 스토어까지 갈 수 있도록 CD(continous delivery)를 구현하는 것 입니다. 이제 우리는 _Travis_, _Fastlane_ 을 통해 이 과정을 어떻게 자동화 하는 지 살펴보려고 합니다.

### Fastlane

우리는 두개의 `deployment` _lane_ 이 있습니다. 하나는 안드로이드 앱이고 하나는 iOS 앱 입니다. 저는 중요한 파트에 촛점을 맞춰 설명하기 위해 lanes를 단순화 시켰습니다. 첫번째로 우리는 안드로이드 플랫폼에 배포할 것이고 다음은 iOS에 배포할 것 입니다. 

여기에 사용할 _lane_ 은 `package.json` 으로부터 버전 넘버를 받습니다. 앞서 얘기했지만 이것은 npm 버전을 그대로 사용할 수 있도록 해줍니다. 

첫번째로 우리가 해야할 일은 버전 넘버와 빌드 넘버를 해결하는 것 입니다. iOS _lane_ 에서 우리는 인증서를 키체인에 저장하고 앱 사인을 할 수 있도록 하기 위해 `setup_certificates`가 필요합니다. 

그 다음 우리는 _canary_ 와 _production_ _lanes_ 작성을 시작합니다. 이 두 가지는 네이티브 앱을 빌드 하는 역할을 합니다. 

* Canary: 베타 테스팅 빌드. 테스트 플라이트와 HockeyApp으로 전달합니다. 
* Production: 프로덕션 빌드. 테스트 플라이트와 구글 플레이로 전달합니다. 

그 다음 우리는 모든 소스맵과 디버그 심볼 파일을 _Bugsnag_ 에 업로드 합니다. 

다음으로 우리는 `commit_and_push_version_bump` _lane_ 을 통해 버전 변경을 커밋할 Git 브랜치를 생성합니다. iOS의 경우 나중에 이 브랜치는 `git_flow_merge` _lane_ 을 통해 `master` 브랜치와 머지합니다. 배포와 함께 버전을 관리하려면 변경사항을 커밋해야 합니다. 그렇지 않으면 앱스토어는 이미 업로드 한 버전이 존재한다고 에러를 보여줍니다. 

마지막으로 우리는 슬랙에 배포 사실을 알리도록 할 수 있습니다. 

**안드로이드**

```ruby
lane :deployment do |version: version|
  bump_version_number(version: version)
  canary
  production
  sh 'npm run repositories:upload:android'
  commit_and_push_version_bump
  slack_notification(platform: 'Android', version: version)
end
```

**iOS**

```ruby
lane :deployment do |version: version|
  setup_certificates
  bump_version_number(version: version)
  canary
  production
  sh 'npm run repositories:upload:ios'
  commit_and_push_version_bump
  git_flow_merge(version: version)
  slack_notification(platform: 'iOS', version: version)
end
```

다음은 깃 로그가 어떻게 남는 지 보여줍니다. _master_ 브랜치로 머지 후 배포까지 되는 모습입니다.

![gitlog](https://res.cloudinary.com/carloscuesta/image/upload/ghlog.png)

## Travis CI

트래비스에서는 배포를 위한 빌드 스테이지를 세 단계로 구성했습니다. 배포는 테스트가 통과된 후에 _master_ 브랜치에서만 발생을 합니다. 

아래에 빌드 스테이지를 살펴 보세요.

![travis-build-stages](https://res.cloudinary.com/carloscuesta/image/upload/travis-build-stages.png)

모든 빌드 스테이지는 그에 맞는 환경에서 실행합니다. 예를들면 iOS 배포는 macOS와 Xcode 그리고 NodeJS 환경에서 실행하고 안드로이드 배포에서는 우분투, JDK, AndroidSDK 그리고 NodeJS 환경에서 실행합니다.

### Test stage

첫번째 스테이지에서는 _lint_ 와 _test suites_ 를 수행합니다. 만약 이것이 실패할 경우 배포가 되지 않도록 해야합니다. 

```
- stage: Test and lint
  language: node_js
  node_js: 8.5.0
  install: yarn
  script: npm run test:lint && npm run test:unit
```

### Android stage

안드로이드 스테이지에서는 우분투와 빌드에 필요한 각 종 디펜던시들을 준비해야 합니다. 그리고나서 카나리와 프로덕션 앱을 빌드합니다. 빌드를 마친 후에는 배포를 수행합니다. 약 15분정도면 안드로이드 앱이 준비됩니다.

```
- stage: Deploy Android
  if: branch = master AND type = push
  language: android
  jdk: oraclejdk8
  android:
    components:
      - tools
      - platform-tools
      - android-26
      - extra-google-m2repository
      - extra-google-google_play_services
  before_install:
    - nvm install 8.5.0
    - gem install bundler
    - bundle install
  before_script:
    - ./internals/scripts/travis/gitconfig.sh
  install: yarn
  script: npm run deployment:android
```

### iOS stage

iOS 스테이지에서는 macOS에 Xcode 그리고 필요한 디펜던시들을 설치해야 합니다. 안드로이드와 마찬가지로 카나리와 프로덕션 앱을 빌드하고 배포 합니다.

```
- stage: Deploy iOS
  if: branch = master AND type = push
  language: node_js
  node_js: 8.5.0
  os: osx
  osx_image: xcode9.2
  before_install: bundle install
  before_script:
    - ./internals/scripts/travis/gitconfig.sh
  install: yarn
  script: npm run deployment:ios
```

## 배운점

* 자동화를 통해서 사람의 손이 필요한 일을 줄일 수 있습니다.
* JS 개발자에게 네이티브 에코시스템은 힘들고 짜증나지만 받아들이는게 좋을거에요. 같은 경험을 한 많은 사람들이 남긴 문서가 도움이 될거에요.
* 프로세스를 만드세요. 

