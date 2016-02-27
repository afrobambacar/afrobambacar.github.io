---
layout: post
title:  "Twitter Cards : App Installs and Deep-Linking 번역"
date:   2014-07-16
---

# 앱 설치 그리고 딥 링킹

## 소개

뉴 트위터 카드의 중요한 특징 중 하나는 사용자들이 당신의 앱을 다운로드 받게 만들거나 (만약 사용자가 앱을 설치하지 않았다면 ... ) 혹은 앱으로 딥 링크 시킬 수 있다는 것이에요. (만약 앱을 이미 설치한 경우라면). 앱 설치와 딥 링킹은 어떤 종류의 트위터 카드나 가능한데, 단지 아래에 보이는 형식의 태그만 마크업을 해주면 되요.

## 앱 설치

당신은 새로운 푸터 태그를 추가하여 트위터 카드에 앱 인스톨을 활성화 시킬 수 있어요. 태그는 모바일 기기에 앱이 설치되어 있지 않은 사용자들이 다운로드 할 때 리디렉트 되도록 정의되어 있어요. 이것은 아이폰, 아이패드, 안드로이드에서 작동합니다. 기억해야 할 것은 당신이 아이폰 앱이 있지만 아이패드에 최적화 되지 않은 앱이라면, 아이폰 앱 아이디, 이름 그리고 url을 아이폰과 아이패드 태그에 모두 입력해야 해요. 만약 값이 없다면 카드는 당신의 웹사이트를 향하는 "View on web" 링크를 보여줄거에요.

아래는 사용자가 앱을 인스톨 하지 않았을 경우 어떤 화면이 뜨는지 보여주는 예제입니다.

<img src="https://g.twimg.com/dev/sites/default/files/images_documentation/blog-image_1.png" width="600" height="400" alt="" title="">

## 딥 링킹

만약 앱을 설치한 사용자라면 앱의 리소스와 일치하는 곳으로 딥 링크 시킬 수 있어요. 사용자가 "Open in app"을 클릭했을 때 트위터는 사용자를 당신의 앱으로 보냅니다. 이 값은 "twitter:app:name:(iphone|ipad|googleplay)" 태그에 정의되어 있습니다. app url은 해당 클라이언트에서 실행하기 위해 앱에 정의된 URL Scheme 를 입력해야 해요.

<img src="https://g.twimg.com/dev/sites/default/files/images_documentation/blog-image_2.png" width="600" height="400" alt="" title="">

아래는 앱 설치와 딥 링킹을 위한 마크업 예제입니다. 이 메타데이터는 아무 카드 타입에 추가할 수 있어요.

{% highlight html %}
<meta name="twitter:app:country" content="US"/>
<meta name="twitter:app:name:iphone" content="Example App"/>
<meta name="twitter:app:id:iphone" content="306934135"/>
<meta name="twitter:app:url:iphone" content="example://action/5149e249222f9e600a7540ef"/>
<meta name="twitter:app:name:ipad" content="Example App"/>
<meta name="twitter:app:id:ipad" content="306934135"/>
<meta name="twitter:app:url:ipad" content="example://action/5149e249222f9e600a7540ef"/>
<meta name="twitter:app:name:googleplay" content="Example App"/>
<meta name="twitter:app:id:googleplay" content="com.example.app"/>
<meta name="twitter:app:url:googleplay" content="http://example.com/action/5149e249222f9e600a7540ef"/>
{% endhighlight %}

당신의 카드에 앱을 활성화 하기 위해서는 앱 디테일을 모두 포함시켜야 해요. 아이폰, 아이패드를 위해서 App ID 값은 숫자로 된 앱 스토어 ID를, 구글 플레이를 위한 App ID는 안드로이드 패키지 네임이어야 해요. Note. 만약 당신의 앱이 US app store에 올라가 있지 않다면 당신은 "twitter:app:country" 값을 설정해야 해요. 이 값은 당신의 앱이 올라간 앱 스토어의 두 글자로 된 국가 코드입니다.

딥 링킹의 두번째 컴포넌트는 당신의 앱으로 들어온 링크를 핸들링하는거에요. "twitter:app:url:(iphone|ipad|googleplay)" 값은 당신의 앱이 해석할 수 있도록 설명된 URI여야 합니다. 그래야 카드의 앱 링크를 클릭했을 때 올바른 컨텐트를 사용자가 볼 수 있어요. 당신은 아래에 기술된 것을 사용해 설정할 수 있어요. 

### For iOS

당신의 앱이 오픈 URL 요청에 정확히 응답하게 하려면 당신의 .plist 파일에 URL scheme를 설정해야 해요. 네이밍을 위한 일반적인 패턴은 reverse-DNS를 포함시키거나 간단히 myappname:// 이라고 하면 되요.

그런다음 .plist 파일에 URL Type 섹션을 보세요. 만약 없으면 만들 수 있어요. 만약 편집된 URL Type이 없으면, 그것은 딕셔너리의 키가 "URL Identifier"인 싱글 아이템이 있는 배열일거에요. "URL Schemes" 섹션을 추가하기 위해서 딕셔너리와 연결된 + 버튼을 클릭하세요. 다른 배열이 있는 부분에 당신의 스키마를 추가하세요. 이런식으로 당신이 원하는 만큼 많은 커스텀 스키마를 생성할 수 있습니다. 보다 자세한 튜토리얼은 [여기](https://dev.twitter.com/docs/cards/ios/url-scheme-configuration)서 찾을 수 있습니다. (혹은 [여기](http://blowmj.tistory.com/54))

당신의 앱에 들어오는 URL을 처리하기 위해 앱 딜리게이트에 application:openURL:sourceApplication:annotation: 메쏘드 로직을 추가할 수 있어요. 

### For Android

딥 링크 정보는 Intent data의 일부로 당신의 앱에 전달됩니다. 당신은 [Intent Filter](http://developer.android.com/guide/components/intents-filters.html)를 추가하여 처리할 수 있어요. Intent Filter는 아래와 같이 생겼습니다. 

{% highlight xml %}
<intent-filter android:label="@string/filter_title_viewcardcontent">
   <action android:name="android.intent.action.VIEW" />
   <category android:name="android.intent.category.DEFAULT" />
   <category android:name="android.intent.category.BROWSABLE" />
   <!-- Accepts URIs that begin with "example://action" -->
   <data android:scheme="example"
         android:host="action" />
</intent-filter>
{% endhighlight %}

Intent Filter에 대한 정보를 더 찾으시려면 [구글 개발자 문서](https://developers.google.com/app-indexing/webmasters/app)를 보세요.


