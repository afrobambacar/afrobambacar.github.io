---
title: Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 (1)
date: 2019-01-15
description: Fastlane과의 혈투 1편
crosspost_to_medium: true
---

이 글은 React Native 프로젝트의 iOS 빌드 및 Test Flight에 업로드하는 것을 자동화 할 수 없을까?에 대한 궁금증에서 출발했습니다. 여기서 말하는 자동화의 범위는 `git push origin master` 이후의 모든 태스크는 기계가 알아서 하도록 만드는 것을 말합니다. 

* [Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 1편](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane.html)
* [Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 2편](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane-2.html)

## 문제들

`git push origin master` 만으로 테스트 플라이트 업로드까지 자동화 하고자 하는 소소한 목표를 달성하기 위해 넘어야 할 산들을 간략하게 소개합니다. 

* CI 툴에서 빌드하기 위해서는 Xcode의 Signing 이슈를 해결해야 합니다. 자동으로 설정하셨던 분들은 특정 인증서를 사용하도록 수정해야 합니다.
* Code Signing 에서의 문제는 인증서를 어떻게 관리할 것이냐 입니다. 이를 해결하기 위한 툴로 _Fastlane_ 이 있는데, 러닝커브에 대한 고통은 여러분의 몫입니다.
* _Fastlane_ 은 인증서 뿐만 아니라 테스트 플라이트에 업로드도 함께 할 수 있도록 여러가지 도구를 지원합니다. 이와 친해지신다면 CI에서 배포까지 하는 것도 문제가 없습니다.

## Code Signing

Xcode를 통해 앱을 개발할 때 _signing_ 은 매우 골치아픈 관리 대상입니다. 애플 개발자센터에 등록 가능한 인증서 수량이 제한되어 있기도하거니와 저의 목표인 CI 툴에서 _Signing_ 문제를 해결하려면 자동으로 관리해주는 옵션, _Automatically manage signing_ 을 사용할 수가 없습니다. 이런 케이스를 회피하기 위해 공용 계정을 만들고 공용 계정으로 개발자 및 배포 인증서를 만들어 함께 사용하는 방식을 많이 쓰는 것 같네요. 

물론 이 방법도 쉽지는 않습니다. 공용으로 사용하기로 한 인증서를 프로젝트를 실행하고자 하는 맥의 키체인에 등록하여 인증을 해야하기 때문입니다. 키체인에 등록하는 방법에 대해서 조금만 찾아보면 이 작업이 얼마나 고된 일인지 스크린 샷만 봐도 느끼실 수 있을 겁니다. 하지만 정말 다행히도 _fastlane match_ 가 이 번거로운 절차를 줄여줍니다. 

### Fastlane

_Fastlane_ 은 앱을 개발하고 배포하는데 필요한 일들을 자동화 시켜주는 도구입니다. _Fastlane_ 은 [홈페이지](https://fastlane.tools/)에서 설명하기를 크게 4가지의 도구를 제공한다고 합니다. 

* Code Signing
* Beta Deployment
* App Store Deployment
* Automate Screenshots

다른 것은 몰라도 _Code Signing_ 과 _Beta Deployment_ 는 정말 유용합니다. _Code Signing_ 은 여러 머신에서 개발과 빌드를 가능하게 해주고 _Beta Deployment_ 는 CI 툴과 연동하여 CI/CD를 구현할 수 있게 해줍니다. 물론 이 새로운 녀석과 씨름하며 고통받는 일은 우리들의 몫이 되겠죠. 

### Disabling 2FA on Apple ID

공용으로 사용할 계정이야 그냥 만들면 되지 않나 생각하시겠지만, 고통을 먼저 경험한 제가 미리 조언을 드리자면 해당  계정은 2 Factor Authentication(2FA)을 비활성화 시켜두는 것이 좋습니다. 이는 _Fastlane_ 에서도 추천하는 것인데 _Fastlane_ 에서 애플 계정을 통해 무언가를 하려고 할 때마다 2FA를 거쳐야 하기 때문입니다. 이는 CI 툴에서는 할 수 없는 것이므로 미리 꺼두시는 것이 정신건강에 좋습니다. 물론 이 옵션을 끄는 과정도 정신건강을 해치지만요.

### Fastlane Match

다시 _Fastlane_ 으로 돌아와서 _Fastlane Match_ 는 Code Signing 관리 도구입니다. 인증서를 **비공개** 깃 리파지터리에 저장하여 함께 사용하자는 [아이디어](https://codesigning.guide/)에서 출발했습니다. _Match_ 액션은 개발과 배포 인증서를 자동으로 생성하기도 하고 다른 머신에서 복사하여 사용하도록 도와주기도 합니다. 심지어 현재 애플 개발자 센터에 등록되어 있는 인증서를 모두 삭제하는 것도 가능합니다. 

_Fastlane_ 을 사용하기 위해서는 먼저 _Xcode command line tool_ 을 먼저 설치해야 합니다.

```
xcode-select --install
```

그리고 _gem_ 혹은 _brew_ 를 이용하여 _fastlane_ 을 설치할 수 있습니다. 

```
# Using RubyGems
sudo gem install fastlane -NV

# Alternatively using Homebrew
brew cask install fastlane
```

#### Creating and saving the certificates into the git repository

인증서로 공용으로 사용하기 위한 첫 단계는 **비공개** 깃 저장소를 만드는 것 입니다. 가상으로 _certificates_ 라는 깃 저장소를 만들었다고 하죠. 저장소를 만드 후에 임시 디렉토리를 하나 만들고 그곳으로 이동하여 다음 명령어를 타이핑 하면 _match_ 를 위한 준비를 합니다. 

```
fastlane match init
```

중간에 _git_url_ 을 묻는 프롬프트가 뜰텐데 위에서 생성한 git 주소를 입력하면 됩니다. 그러면 아래와 같이 _Match_ 파일이 만들어 집니다. 여기에 설정된 계정으로, 설정된 _app_identifier_ 의 인증서를 관리하게 됩니다. 

```
git_url("https://github.com/org/certificates.git")

storage_mode("git")

type("development") # The default type, can be: appstore, adhoc, enterprise or development

app_identifier(["tools.fastlane.app", "tools.fastlane.app2"]) # 개발, 빌드 대상 app_identifier
username("user@fastlane.tools") # 애플 개발자 포털 아이디
```

아직 Fastlane을 도입하지 않았다면 언제든지 자동으로 다시 생성할 수 있으므로 시험삼아 기존에 만든 인증서를 모두 삭제해보세요. 심지어 출시했던 앱의 인증서를 폐기하더라도 아무런 문제가 되지 않습니다.

```
fastlane match nuke development
fastlane match nuke distribution
```

터미널 명령어 한줄로 애플 개발자 포털의 인증서가 모두 삭제되는 놀라운 경험을 할 수 있습니다. 앞서 언급한대로 만약 2FA가 활성화 된 계정으로 애플 개발자 포털에 접근하게 된다면 핸드폰으로 인증 요구를 하는 얼럿이 뜨는 경험도 하실 수 있습니다;;

새로운 인증서를 생성하기 위해서는 다음 명령어를 타이핑하면 됩니다. 

```
fastlane match development
fastlane match appstore
fastlane match adhoc
```

인증서를 Git에 보관하는 경우 _passphrase_ 를 물어보는데 타이핑 한 것을 잊지 말고 잘 기억해두시기 바랍니다. 나중에 CI 툴 환경변수로 사용할 때 다시 한번 만나게 됩니다. 

중간에 다음과 같은 에러 문구가 보일 수 있지만 일단 생성은 잘 될겁니다. 

```
Could not configure imported keychain item (certificate) to prevent UI permission popup when code signing
```

위의 문구가 뜨는 이유는 키체인에 인증서를 등록하기 위해서 현재 맥의 비밀번호를 입력하라는 것인데 터미널에서 비밀번호 창을 띄울 수가 없어서 나오는 문구입니다. 제대로 하기 위해서는 _keychain_password_ 옵션을 이용할 수 있습니다. 

```
fastlane match development --keychain_password [YOUR LOCAL MACHINE PASSWORD]
fastlane match appstore --keychain_password [YOUR LOCAL MACHINE PASSWORD]
fastlane match adhoc --keychain_password [YOUR LOCAL MACHINE PASSWORD]
```

이제 브라우저를 열어서 아까 생성한 Git 저장소를 열어보세요. 프로비저닝 프로파일과 인증서가 들어있는 놀라운 광경을 목격하실 수 있습니다. 또한 애플 개발자 포털에도 같은 것이 등록되어있는 것을 보실 수 있습니다.

끝으로 임시 디렉토리에 생성한 _Match_ 파일을 _certificates_ 깃 저장소에 함께 등록을 해두면 관리하기 편할 것 같습니다.

### Xcode 프로젝트 설정

원래의 목표를 다시 상기시켜드리면 지금 제가 하려는 일은 Travis CI에서 빌드를 하는 일 입니다. Travis CI는 매번 새로운 인스턴스가 준비될 것이고 이런 환경에서 _Signing_ 을 해결해야 합니다. 그렇기 때문에 _Automatically manage signing_ 옵션은 사용할 수 없고 특정 인증서를 수동으로 지정해야 합니다. 

Xcode 프로젝트의 _Automatically manage signing_ 옵션을 끄세요. _Signing_ 바로 밑의 섹션을 보면 _Signing (Debug)_, _Signing (Release)_ 를 설정할 수 있는 UI가 나타나게 됩니다. 여기서 키체인에 등록한 인증서를 설정해주어야 합니다. _Signing (Debug)_ 에는 Development 인증서를, _Signing (Release)_ 에는 AppStore 인증서를 선택하세요.

<img width="727" alt="screen shot 2019-01-15 at 7 11 23 pm" src="https://user-images.githubusercontent.com/1336102/51173754-762b8e00-18f9-11e9-8d1f-e7c4ce1acb0f.png">

위와 같은 그림이 되도록 설정을 했을 때 아무런 에러가 없다면 정상적으로 등록된 것입니다. 인증서를 이렇게 지정한 상태로 _Match_ 파일과 함께 github에 일단 올려두시면 다른 머신에서 동일한 인증서를 사용할 준비를 마치게 됩니다. 

**Note.** 단 이 때 테스트 타겟들은 Automatically manage signing 옵션을 사용하도록 놔두세요.

### 다른 머신에 인증서 설치하기

다른 머신에도 똑같이 _fastlane_ 을 설치하고 인증서가 있는 _certificates_ 깃 저장소를 클론 받은 후에 _certificates_ 디렉토리로 이동해서 다음을 타이핑 해보세요. `--readonly` 옵션은 등록된 인증서를 변경하지 않고 읽어와서 현재 머신의 키체인에 등록합니다.

개발 인증서 키체인 등록
```
fastlane match development --readonly --keychain_password [YOUR LOCAL MACHINE PASSWORD]
```

배포 인증서 키체인 등록
```
fastlane match appstore --readonly --keychain_password [YOUR LOCAL MACHINE PASSWORD]
```

인증서를 설치 후 프로젝트에 인증서가 정상적으로 보이는지 확인해보세요. 만약 이렇게 했을 때 정상적으로 동작한다면 CI 툴에서도 할 수 있다는 것이겠죠? 이제 1부가 끝났습니다. 계속해서 저와 함께 고통을 나눠보아요.

다음은 _Fastlane_ 을 이용하여 CI 툴에서 빌드하고 테스트 플라이트에 업로드 하는 방법에 대해서 포스팅하겠습니다. 

[Fastlane, Travis-CI로 React Native 프로젝트 배포 자동화 만들기 2편](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane-2.html)


### Ref.

* [fastlane을 적용하여 팀원간 인증서 동기화 하기](https://littleshark.tistory.com/35?category=678123)
* [iOS Continuous Deployment with Fastlane](https://medium.com/coletiv-stories/ios-continuous-deployment-with-fastlane-36892ab66cb0)
* [[번역] Fastlane으로 리액트 네이티브 앱 배포하기](https://afrobambacar.github.io/2019/01/fastlane-%EC%9C%BC%EB%A1%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%84%A4%EC%9D%B4%ED%8B%B0%EB%B8%8C-%EC%95%B1-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0.html)
* [[번역] 리액트 네이티브 앱을 패스트래인과 트래비스CI를 사용하여 배포하기](https://afrobambacar.github.io/2019/01/fastlane-react-native-travis-ci.html)

