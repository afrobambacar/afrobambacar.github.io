---
title: Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 (2)
date: 2019-01-15
description: Fastlane과의 혈투 2편
crosspost_to_medium: true
---

이 글은 React Native 프로젝트의 iOS 빌드 및 Test Flight에 업로드하는 것을 자동화 할 수 없을까?에 대한 궁금증에서 출발했습니다. 여기서 말하는 자동화의 범위는 `git push origin master` 이후의 모든 태스크는 기계가 알아서 하도록 만드는 것을 말합니다. 

* [Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 1편](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane.html)
* [Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 2편](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane-2.html)

### 이번에 할일

* 프로젝트에 Fastlane 설정
* 테스트 플라이트 메뉴얼 업로드 
* 테스트 플라이트 CI 업로드
* Travis CI에 환경변수 설정 
* .travis.yml 작성

바로 [전편](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane.html)에서 이야기 했던 _Fastlane_ 의 역할 중에서 _Beta Deployment_ 기능을 기억하시나요? _Fastlane_ 을 프로젝트에 설정해두면 Xcode를 사용하지 않더라도 터미널에서 테스트 플라이트로 업로드 하는 일이 가능합니다. 개인의 맥에서 이것이 가능하다면 CI 툴이라고 안될 일은 없겠죠? 이 일을 하기 위해서는 프로젝트에 먼저 _Fastlane_ 을 설정해야 합니다. 

### 프로젝트에 Fastlane 설정

NOTE: 앱스토어 테스트 플라이트에 빌드를 자동으로 올리는 것이 처음이라면 먼저 수동으로 한번은 업로드를 해준 후에 시작할 수 있습니다. 

_Fastlane_ 설정을 위해서는 리액트 네이티브 프로젝트 루트에 _fastlane_ 디렉토리를 만들어야 합니다. 그리고 그 안에 _Appfile_ 과 _Fastfile_ 을 만들어야 합니다. 이 두개의 파일에는 다음과 같은 내용이 담기게 됩니다. 

_Appfile_ 에는 프로젝트의 `app_identifier`와 `apple_id` 가 있어야 합니다. 만약 여러분이 사용하는 `apple_id`가 여러 팀에 속해 있다면 추가로 어떤 팀의 프로젝트인지 확실히 하기 위해서 `itc_team_id`와 `team_id` 를 추가로 작성해야 합니다. 

_Appfile_
```
app_identifier("com.example.sandbox") # The bundle identifier of your app
apple_id("apple@example.com") # Your Apple email address

itc_team_id("111111111") # App Store Connect Team ID
team_id("D23GPGDW1A") # Developer Portal Team ID
```

### 로컬에서 테스트 플라이트에 업로드 하는 스크립트

_Fastfile_ 파일은 태스크를 정의하는 파일입니다. 이 파일 역시 _fastlane_ 디렉토리 안에 위치해 있으면 됩니다. 일단 CI가 아닌 로컬 맥에서 테스트 플라이트로 업로드 하는 것을 정의하면 다음과 같이 작성할 수 있습니다. 

```
default_platform(:ios)

platform :ios do
  
  desc "Push Example to TestFlight Manually"
  lane :manual_testflight do
    
    # Fetch the necessary certificates and 
    # provisioning profiles into default keychain.
    match(
      readonly: true,
      type: "appstore"
    )
    
    # Increment the build number using the
    # latest Testflight build number.
    increment_build_number(
      build_number: latest_testflight_build_number() + 1,
      xcodeproj: "./ios/example.xcodeproj"
    )

    # Build the application using the
    # specified scheme.
    build_app(
      scheme: "example",
      project: "./ios/example.xcodeproj",
      export_method: "app-store"
    )

    # Upload the application to Testflight
    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )
  end

end
```

이 스크립트는 다음과 같은 동작을 합니다. 

* _match_ 액선은 빌드에 필요한 인증서를 내려받습니다.
* _increment_build_number_ 는 앱스토어 커넥트에 마지막으로 업로드 된 빌드 넘버를 확인한 후에 1을 증가시킵니다.
* _build_app_ 앱을 빌드하여 _.ipa_ 파일을 만듭니다. 
* _upload_to_testflight_ 는 _.ipa_ 파일을 테스트 플라이트로 업로드를 합니다. 

이 스크립트를 실행하기 전에 match와 upload에 필요한 환경변수를 로컬에 설정을 해야 합니다. 특히 인증서를 Git에 올리기 위해 만들었던 _passphrase_ 값을 _MATCH_PASSWORD_ 에 지정해야 하는 것을 잊지 마세요. 

```
export FASTLANE_PASSWORD="YOUR_APPLE_ID_PASSWORD"
export MATCH_PASSWORD="YOUR_CERTIFICATES_PASSPHRASE"
```

이제 이 스크립트는 다음과 같은 CLI 명령어를 통해 실행할 수 있습니다. 

```
fastlane manual_testflight
```

### 자동으로 테스트 플라이트에 업로드하는 스크립트

이제 CI 툴에서 동작하는 스크립트를 만들 차례입니다. 대부분 위에서 작성한 것과 비슷하지만 약간만 수정을 하면 됩니다. 이번에 만들 _lane_ 은 _travis_testflight_ 라고 정하도록 하겠습니다. 

```
default_platform(:ios)

platform :ios do
  
  desc "Push Example to TestFlight with Travis CI"
  lane :travis_testflight do
    
    # Fetch the keychain env variables
    # securely stored in the travis.yml.
    keychain_name = ENV["MATCH_KEYCHAIN_NAME"]
    keychain_password = ENV["MATCH_KEYCHAIN_PASSWORD"]

    # Create a temporary keychain to 
    # store the certificates.
    create_keychain(
      name: keychain_name,
      password: keychain_password,
      default_keychain: true,
      unlock: true,
      timeout: 3600,
      add_to_search_list: true
    )

    # Fetch the necessary certificates and 
    # provisioning profiles.
    match(
      keychain_name: keychain_name,
      keychain_password: keychain_password,
      git_url: match_git_url,
      type: "appstore",
      readonly: true
    )
    
    # Increment the build number using the
    # latest Testflight build number.
    increment_build_number(
      build_number: latest_testflight_build_number() + 1,
      xcodeproj: "./ios/Example.xcodeproj"
    )

    # Build the application using the
    # specified scheme.
    build_app(
      scheme: "Example",
      project: "./ios/Example.xcodeproj",
      export_method: "app-store"
    )

    # Upload the application to Testflight
    upload_to_testflight(
      skip_waiting_for_build_processing: true
    )

    # Remove the temporary keychain leaving
    # no trace.
    delete_keychain(
      name: keychain_name
    )
  end

end
```

이 스크립트는 `manual_testflight` 와 거의 비슷하게 동작합니다. 단지 CI 인스턴스에 키체인을 생성하고 인증서를 저장하는 것이 다르고 맨 마지막에 해당 케체인과 함께 다운로드 받은 인증서를 제거하는 절차가 추가되었을 뿐 입니다. 단, 개인 맥에서 이 스크립트를 실행하지는 마세요. 만약 개인 맥에서 실행하는 경우 원래의 키체인 데이터가 망가질 수도 있습니다. 그러니 CI 머신에서만 실행하도록 주의하세요. 

### Travis CI Setup

`manual_testflight` 스크립트는 필요한 환경변수를 로컬 맥에 설정했지만 Travis CI에서는 프로젝트 설정에서 환경변수를 입력할 수 있습니다. 필요한 환경변수는 다음과 같습니다. 

* CI_USER_TOKEN: GitHub Personal Access Token with repo permissions. 프라이빗 저장소에 접근하기 위한 권한이 필요합니다. [여기](https://github.com/settings/tokens)서 생성할 수 있습니다.
* FASTLANE_USER: 앱스토어 커넥트, 애플 개발자 포털 사용자 아이디 입니다.
* FASTLANE_PASSWORD: 앱스토어 커넥트, 애플 개발자 포털 사용자 패스워드 입니다. 
* LANG: Fastlane은 UTF-8에서 정상적으로 동작합니다. CI 툴에서 이 값이 ASCII로 설정되어 있는 경우가 있어서 다음과 같은 값을 입력해주어야 합니다. `en_US.UTF-8`
* LC_ALL: `en_US.UTF-8`
* MATCH_PASSWORD: _match_ 를 통해 생성한 인증서의 `passphrase` 
* MATCH_KEYCHAIN_NAME: 키체인 이름
* MATCH_KEYCHAIN_PASSWORD: 키체인 패스워드
* MATCH_GIT_URL: `certificates`가 있는 프라이빗 깃헙 저장소 주소입니다. _eg. https://github.com/example/certificates.git_

이 환경변수들은 _.travis.yml_ 을 실행할 때 사용하기도 하고 앞서 정의한 _Fastlane_ 파일을 실행할 때 사용하기도 합니다. Travis CI 작업정의 파일인 _.travis.yml_ 은 다음과 같이 작성할 수 있습니다.

```
cache:
  yarn: true
  directories:
    - $HOME/.yarn-cache
    - node_modules
branches:
  only:
  - master
notifications:
  email:
    on_success: never
    on_failure: always

matrix:
  include:
    - language: objective-c
      os: osx
      osx_image: xcode10.1
      node_js: false
      before_install:
        - nvm install 10
        - node --version
        - npm install -g yarn
        - yarn -version
        - gem install fastlane --no-rdoc --no-ri --no-document --quiet
        - echo -e "machine github.com\n  login $CI_USER_TOKEN" >> ~/.netrc
      install:
        - yarn install
      script:
        - fastlane ios travis_testflight
```

### Time Saving Tip

Travis CI를 동작시킨 후에 앱스토어 커넥트에 _Missing Compliance_ 경고가 뜨는 경우에는 _Info.plist_ 파일을 수정하여 해결할 수 있습니다. _Info.plist_ 파일에 `ITSAppUsesNonExemptEncryption` 값을 추가하고 `NO` 로 설정하세요. 이에 대한 내용은 [스택오버플로우](https://stackoverflow.com/questions/35841117/missing-compliance-in-status-when-i-add-built-for-internal-testing-in-test-fligh)에서 찾을 수 있습니다. 

### Ref.

* [Fastland Docs Continuous Integration](https://docs.fastlane.tools/best-practices/continuous-integration/)
* [iOS Continuous Deployment with Fastlane](https://medium.com/coletiv-stories/ios-continuous-deployment-with-fastlane-36892ab66cb0)

