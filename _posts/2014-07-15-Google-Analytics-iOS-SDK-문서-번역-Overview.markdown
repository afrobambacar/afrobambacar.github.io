---
layout: post
title:  "Google Analytics iOS SDK 문서 번역 : Overview"
date:   2014-07-15
---

# 시작하기 전에

SDK를 이용하려면 다음의 것들이 필요합니다.

* iOS Developer SDK 5.0 혹은 그 이상
* Google Analytics for Mobile Apps iOS SDK v3
* 측정하고자 하는 iOS 앱
* 구글 웹로그 분석의 프로퍼티와 앱의 데이터가 보여질 앱 뷰 (profile)

# 시작하기

SDK를 이용하기 위해서는 3 단계를 거쳐야 합니다. 

1. 프로젝트에 헤더와 라이브러리를 추가하기
2. 트래커를 초기 설정하기
3. 측정할 스크린을 추가하기

위 세가지를 완료하면 다음의 항목들을 측정할 수 있습니다.

* 앱 설치
* 액티브 유저를 비롯한 사용자들
* 스크린들과 유저 인게이지먼트
* 크래시와 익셉션

# 1. 헤더파일을 추가하고 프로젝트 설정하기

구글 웹로그 분석의 iOS SDK를 다운로드 하고 SDK 패키지에 있는 아래의 파일들을 앱에 추가하세요.

* GAI.h
* GAITracker.h
* GAITrackedViewController.h
* GAIDictionaryBuilder.h
* GAIFields.h
* GAILogger.h
* libGoogleAnalyticsServices.a

구글 웹로그 분석의 SDK는 CoreData와 SystemConfiguration 프레임웍을 이용합니다. 따라서 애플리케이션 대상의 연결된 라이브러리(application target's linked libraries)에 다음의 항목들을 추가해야 합니다.

* libGoogleAnalyticsServices.a
* AdSupport.framework
* CoreData.framework
* SystemConfiguration.framework
* libz.dylib

### CoreDate 프레임웍을 사용하는 앱이라면

알림에 응답하기, 예를 들면 : NSManagedObjectContextDidSaveNotification은 Google 웹 로그 분석 CoreData 개체에서 예외가 발생할 수 있습니다. 대신, 애플은 리스너에 매개 변수로 관리되는 개체 컨텍스트를 지정한 CoreData notifications 필터링을 권장합니다. 

# 2. 트래커 초기화

트래커를 초기화하려면 GAI.h 헤더를 앱의 delegate.m 파일에 import 시킨 후 애플리케이션 딜리게이트의 application:didFinishLaunchingWithOptions : 메소드에 다음의 코드를 추가하세요.

{% highlight Objective-C %}
- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  // Optional: automatically send uncaught exceptions to Google Analytics.
  [GAI sharedInstance].trackUncaughtExceptions = YES;

  // Optional: set Google Analytics dispatch interval to e.g. 20 seconds.
  [GAI sharedInstance].dispatchInterval = 20;

  // Optional: set Logger to VERBOSE for debug information.
  [[[GAI sharedInstance] logger] setLogLevel:kGAILogLevelVerbose];

  // Initialize tracker. Replace with your tracking ID.
  [[GAI sharedInstance] trackerWithTrackingId:@"UA-XXXX-Y"];

}
{% endhighlight %}

NOTE : 주어진 트래킹 아이디의 트래커를 만들면 트래커 인스턴스는 라이브러리에서 지속됩니다. 나중에 같은 트래킹 아이디로 trackerWithTrackingId:를 호출하면 같은 트래커 인스턴스가 반환됩니다. 또한 구글 웹로그 분석 SDK는 처음에 만들어져 설정된 트래커 인스턴스인 디폴트 트래커 인스턴스를 내놓습니다. 그것에 접근하기 위해서는 다음과 같이 하면 됩니다.

{% highlight Objective-C %}
id<GAITracker> tracker = [[GAI sharedInstance] defaultTracker];
{% endhighlight %}

위의 예제에서 "UA-XXXX-Y"에는 구글 웹로그 분석의 프로퍼티로 변경하세요. 만약 하나의 프로퍼티 아이디만 사용할 경우 디폴트 트래커 메쏘드를 사용하는 것이 가장 좋습니다. 

(디폴트 트래커 메쏘드가 뭔지 잘 모르겠다. -_-)

# 3. 자동으로 스크린 측정하기

앱에서 자동으로 뷰를 측정하게 하려면 뷰 컨트롤러에 GAITrackedViewController를 확장해서 사용하세요. 웹로그 분석 리포팅에 보여지게 할 스크린 이름을 screenName 속성으로 설정하세요.

예를 들어 "홈 스크린"이라는 것을 측정하고자 한다면 뷰 컨트롤러 헤더를 다음과 같이 하면 됩니다.

{% highlight Objective-C %}
@interface HomeViewController : UIViewController
{% endhighlight %}

위의 헤더를 다음과 같이 업데이트 하세요.

{% highlight Objective-C %}
#import "GAITrackedViewController.h"

@interface HomeViewController : GAITrackedViewController
{% endhighlight %}

또한 구글 웹로그 분석에서 보여진 뷰 이름을 적어 넣어야 합니다. 뷰 컨트롤러의 초기화 메쏘드가 있다면 그곳에 삽입하는 것이 좋습니다. 또는 viewWillAppear: 메소드에 추가하는 것도 괜찮습니다. 

{% highlight Objective-C %}
- (void)viewWillAppear:(BOOL)animated {
  [super viewWillAppear:animated];
  self.screenName = @"About Screen";
}
{% endhighlight %}

스크린 측정에 대해서 자세히 알아보시려면 [Screens Developer Guide](https://developers.google.com/analytics/devguides/collection/ios/v3/screens)를 보세요.

축하합니다! 이제 구글 웹로그 분석으로 데이터를 보낼 설정을 마쳤습니다. 



