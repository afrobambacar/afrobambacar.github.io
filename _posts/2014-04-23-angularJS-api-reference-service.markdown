---
layout: post
title:  "angularJS api reference : service"
date:   2014-04-23
---

# $anchorScroll

앵커에 id가 있는 곳을 찾아서 스크롤 된다.

$anchorScroll();

{% highlight js %}
function ScrollCtrl($scope, $location, $anchorScroll) {
  $scope.gotoBottom = function (){
    // set the location.hash to the id of
    // the element you wish to scroll to.
    $location.hash('bottom');
 
    // call $anchorScroll()
    $anchorScroll();
  };
}
{% endhighlight %}

# $animate 

애니메이션 적용할 때 사용한다. 모든 애니메이션을 사용하려면 ngAnimate 모듈을 로드해야 한다.

### method

###### enter(element, parent, after, [done]);
DOM에 추가 애니메이션 적용. parent 요소 밑으로 append, after는 형제요소, 완료되면 done 콜백 실행
###### leave(element, [done]);
DOM에서 element 삭제. 
###### move(element, parent, after, [done]);
element 이동.
###### addClass(element, className, [done]);
###### removeClass(element, className, [done]);
###### setClass(element, add, remove, [done]);

# $cacheFactory

캐시 오브젝트를 구축하고 접근할 수 있는 메소드 제공

### method

###### info();
캐시 정보 반환

###### get(cacheId);
key로 저장되어 있는 cacheId의 value를 반환

[예제](http://plnkr.co/edit/ngdoc:example-example4@snapshot?p=preview)

# $compile

템플릿에 html 스트링이나 DOM을 컴파일하고 템플릿 함수를 통해 스콥과 템플릿을 연결함. directive에서 사용하는 듯.

# $controller

패스 

# $document

$document = window.document 이라고 이해하면 됨.

{% highlight js %}
function MainCtrl($scope, $document) {
  $scope.title = $document[0].title;
  $scope.windowTitle = angular.element(window.document)[0].title;
}
{% endhighlight %}

# $exceptionHandler

예외 발생시 콘솔에 로그 남김

{% highlight js %}
angular.module('exceptionOverride', []).factory('$exceptionHandler', function () {
    return function (exception, cause) {
      exception.message += ' (caused by "' + cause + '")';
      throw exception;
    };
  });
{% endhighlight %}

# $filter

사용자에게 보여질 데이터를 재구성하는데 사용됨

# $http

XMLHttpRequest 혹은 JSONP 같은 것으로 리모트 서버와 통신할 때 사용 (jquery.ajax라고 보면 됨) 

### config

* method : get, head, post, put, delete, jsonp
* url
* params : 넘길 파라미터들, 스트링이 아니면 json으로 보냄
* data
* headers
* xsrfHeaderName
* xsrfCookieName
* transformRequest
* transformResponse
* cache
* timeout
* withCredentials
* responseType

### shortcut

* $http.get
* $http.head
* $http.post
* $http.put
* $http.delete
* $http.jsonp

{% highlight js %}
$http({method: 'GET', url: '/someUrl'}).
    success(function(data, status, headers, config) {
      // this callback will be called asynchronously
      // when the response is available
    }).
    error(function(data, status, headers, config) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });
{% endhighlight %}

# $interpolate

{{ hash }} 마크업을 해결해주는 놈인 듯

# $interval

$interval = window.setInterval, 입력한 시간만큼 지연시켰다가 실행, 제공하는 메쏘드로는 cancel(promise); 가 있다. promise는 $interval 함수에 의해 반환되는 값이다.

# $location

$location은 url 관련 도구

### method

* absUrl(); : 현재 url 반환
* url([url], [replace]); : path를 기준으로 뒤에 붙은 파라미터, 해쉬까지 얻거나 변경
* protocol(); : 프로토콜 반환
* host(); : 호스트 반환
* port(); : 포트 반환 
* path([path]); : 패스를 반환하거나 설정
* search(search, [paramValue]); : 서치 파라미터를 반환하거나 설정
* hash([hash]); : 해쉬 설정
* replace(); : 

### event

* $locationChangeStart : url 변경되는 중간에 발생
* $locationChangeSuccess : url 변경 후 발생

# $log

콘솔에 로그 찍음

### method

* log();
* info();
* warn();
* error();
* debug();

# $parse

앵귤러 표현식을 함수로 변환

# $q

promise와 deferred와 관련된 내용인데 머리가 아프다. 대략 비동기로 작동하는 것들을 동기로 바꿔주는 역할을 한다. 

# $rootElement

앵귤러 앱의 루트 엘리먼트이다. ngApp이 표시된 부분

# $rootScope

루트스콥을 호출한다.

# sce

모르겠다. 

# sceDelegate

모르겠다. 

# templateCache

템플릿을 캐시에 저장해 놓고 사용할 수 있는 것 같은데 예제를 찾아봐야 함.

# $timeout

window.setTimeout

# $window

윈도우 객체다. 

