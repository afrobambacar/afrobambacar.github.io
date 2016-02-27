---
layout: post
title:  "angularJS api reference : function"
date:   2014-04-23
---

# function

[angularjs.org](https://code.angularjs.org/1.2.16/docs/api)의 ng 코어 모듈, function을 요약해본다.

##### angular.copy

배열이나 객체를 복사한다.

angular.copy(source, [destination]);

{% highlight js %}
 $scope.update = function(user) {
   $scope.master = angular.copy(user);
 };
{% endhighlight %}

##### angular.element

jquery가 anuglar보다 먼저 로드된다면 jquery랑 똑같이 사용할 수 있다. jquery를 로드하지 않거나 angular 보다 뒤에 로드되면 angular에 포함되어 있는 jqLite의 메소드만 사용할 수 있다.

$element === angular.element() === jQuery() === $()

{% highlight js %}
$scope.somebtn = function () {
  angular.element('.somebtn').css('display','none');
}

// 혹은 

var myEl = angular.element( document.querySelector( '#some-id' ) );
{% endhighlight %}

##### angular.equals

Object나 value의 값이 같은지 검사하는 함수다. 같으면 true, 다르면 false를 반환한다.

{% highlight js %}
angular.equals(o1, o2);
{% endhighlight %}

##### angular.extend

오브젝트를 카피하는 함수다. src는 소스, dst는 반환될 오브젝트다. 다수의 src를 집어 넣을 수도 있다.

{% highlight js %}
angular.extend(dst, src);
{% endhighlight %}

##### angular.forEach

forEach 문 돌린다.

angular.forEach(obj, iterator, [context]);

{% highlight js %}
var values = {name: 'misko', gender: 'male'};
var log = [];
angular.forEach(values, function(value, key){
  this.push(key + ': ' + value);
}, log);
expect(log).toEqual(['name: misko', 'gender: male']);
{% endhighlight %}

##### angular.fromJson, angular.toJson

json을 스트링으로, 혹은 반대로 변환한다.

{% highlight js %}
angular.fromJson(json);
angular.toJson(json);
{% endhighlight %}

##### angular.identity

전달받은 첫번째 인자를 반환하는 함수다.

{% highlight js %}
function transformer(transformationFn, value) {
 return (transformationFn || angular.identity)(value);
};
{% endhighlight %}

##### angular.injector

서비스를 가져오거나 DI를 할 수 있는 인젝터 함수를 생성한다.

{% highlight js %}
angular.injector(modules);
{% endhighlight %}

##### angular.isArray

전달받은 인자가 배열인지 아닌지 검사한다. 배열이라면 true 반환

{% highlight js %}
angular.isArray(value);
{% endhighlight %}

##### angular.isDate

전달받은 인자가 날짜인지 아닌지 검사한다. 날짜라면 true 반환

{% highlight js %}
angular.isDate(value);
{% endhighlight %}

##### angular.isDefined

전달받은 인자가 defined 인지 아닌지 검사한다. defined라면 true 반환

{% highlight js %}
angular.isDate(value);
{% endhighlight %}

##### angular.isElement

전달받은 인자가 DOM 엘리멘트 혹은 jquery 엘리멘트인지 검사. 맞으면 true 반환

{% highlight js %}
angular.isElement(value);
{% endhighlight %}

##### angular.isFunction

전달받은 인자가 함수인지 아닌지 검사. 맞으면 true 반환

{% highlight js %}
angular.isFunction(value);
{% endhighlight %}

##### angular.isNumber

전달받은 인자가 Number 타입인지 아닌지 검사. 맞으면 true 반환

{% highlight js %}
angular.isNumber(value);
{% endhighlight %}

##### angular.isObject

전달받은 인자가 Object인지 아닌지 검사. null은 false, 자바스크립트에서는 배열도 Object로 치므로 true

{% highlight js %}
angular.isObject(value);
{% endhighlight %}

##### angular.isString

전달받은 인자가 스트링인지 아닌지 검사. 맞으면 true 반환

{% highlight js %}
angular.isString(value);
{% endhighlight %}

##### angular.isUndefined

전달받은 인자가 undefined인지 아닌지 검사. 맞으면 true 반환

{% highlight js %}
angular.isUndefined(value);
{% endhighlight %}

##### angular.lowercase, angular.uppercase

전달받은 스트링을 소문자, 혹은 대문자로 반환

{% highlight js %}
angular.lowercase(string);
angular.uppercase(string);
{% endhighlight %}

##### angular.module

앵귤러 모듈 만드는 함수. 

{% highlight js %}
// Create a new module
var myModule = angular.module('myModule', []);
 
// register a new service
myModule.value('appName', 'MyCoolApp');
 
// configure existing services inside initialization blocks.
myModule.config(['$locationProvider', function($locationProvider) {
  // Configure existing providers
  $locationProvider.hashPrefix('!');
}]);

var injector = angular.injector(['ng', 'myModule'])
{% endhighlight %}

##### angular.noop

함수 스타일로 코드 작성할 때 사용하는 함수

{% highlight js %}
function foo(callback) {
   var result = calculateResult();
   (callback || angular.noop)(result);
}
{% endhighlight %}



