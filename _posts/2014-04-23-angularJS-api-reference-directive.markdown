---
layout: post
title:  "angularJS api reference : directive"
date:   2014-04-23
---

# ng
ng는 angularJS의 코어 모듈이다. 여기에는 함수, 디렉티브, 오브젝트, 필터 등등이 정의되어 있다. 이 중 ng로 시작하는 디렉티브들을 알아야 UI 핸들링할 때 유용할 것 같아서 어떤 것이 있는지 [angularjs.org](https://code.angularjs.org/1.2.16/docs/api)에 나와있는 api 레퍼런스를 살펴보았다. 문서에 나와있는 디렉티브 명칭은 lowerCamelCase를 사용하여 정의해놓았는데 템플릿에 사용할 때는 dash 스타일로 작성해야 한다. 

##### ng-bind

모델을 바인딩 한다.

{% highlight html %}
<div ng-controller="Ctrl">
  <input type="text" ng-model="name"><br>
  <span ng-bind="name"></span>
</div>
{% endhighlight %}

##### ng-bind-html

html을 바인딩 한다.

##### ng-blur

blur 이벤트 발생했을 때 행동 지정

##### ng-change

변화가 생겼을 때 함수를 호출한다.

{% highlight html %}
<input type="checkbox" ng-model="confirmed" ng-change="change()" />
{% endhighlight %}

##### ng-class

1. true, false에 따라서 클래스를 적용하거나 적용하지 않는다.
2. ng-model을 이용하여 클래스를 변경한다.

{% highlight html %}
<!-- { class : true || false } -->
<p ng-class="{strike: deleted, bold: important, red: error}"> ... </p>
<!-- [ ng-model names ] -->
<p ng-class="[style1, style2, style3]"> ... </p>
{% endhighlight %}

##### ng-class-odd, ng-class-even

홀수일 경우 붙이는 클래스, 짝수일 경우 붙이는 클래스를 다르게 할 수 있다.

{% highlight html %}
<ol ng-init="names=['John', 'Mary', 'Cate', 'Suz']">
  <li ng-repeat="name in names">
   <span ng-class-odd="'odd'" ng-class-even="'even'">
     {{name}}      
   </span>
  </li>
</ol>
{% endhighlight %}

##### ng-click

클릭했을 때 지정 함수 호출, 이벤트 객체는 $event 사용

{% highlight html %}
<button ng-click="share();"> ... </button>
{% endhighlight %}

##### ng-cloak

뭔지 모르겠음.

##### ng-controller 

컨트롤러를 지정할 때 사용한다.

{% highlight html %}
<div ng-controller="MainCtrl"> ... </div>
{% endhighlight %}

##### ng-copy, ng-cut, ng-paste

클립보드에 복사, 잘라내기, 붙이기 등의 이벤트를 감지하여 특정 작동을 수행할 수 있게 해준다.

{% highlight html %}
<input ng-copy="copied=true" ng-init="copied=false; value='copy me'" ng-model="value">
copied: {{copied}}
<input ng-cut="cut=true" ng-init="cut=false; value='cut me'" ng-model="value">
cut: {{cut}}
<input ng-paste="paste=true" ng-init="paste=false" placeholder='paste here'>
pasted: {{paste}}
{% endhighlight %}

##### ng-dblclick

더블클릭 했을 때 행동 지정

{% highlight html %}
<button ng-dblclick="count = count + 1" ng-init="count=0">
  Increment (on double click)
</button>
count: {{count}}
{% endhighlight %}

##### ng-disabled

조건에 따라서 버튼을 비활성화 시킨다.

{% highlight html %}
<button ng-disabled="currentPage == 0" ng-click="currentPage=currentPage-1">
    Previous
</button>
<button ng-disabled="currentPage >= numPages()-1" ng-click="currentPage=currentPage+1">
    Next
</button>
{% endhighlight %}

##### ng-focus

포커스 이벤트가 발생했을 때 행동 지정

##### ng-hide, ng-show

true, false에 따라서 요소를 감추거나 보여줌. css display로 처리

{% highlight html %}
<div ng-show="checked"> ... </div>
<div ng-hide="checked"> ... </div>
{% endhighlight %}

##### ng-href, ng-src, ng-srcset

href, src 혹은 srcset에 {{ hash }} 마크업을 쓸 때 필요

{% highlight html %}
<a ng-href="/{{'123'}}">
	<img ng-src="/{{'123'}}" />
</a>
{% endhighlight %}

##### ng-if

true, false에 따라서 DOM 트리에서 지우거나 추가

{% highlight html %}
<span ng-if="checked"> ... </span>
{% endhighlight %}

##### ng-include

html을 인클루드 할 때 사용한다. 

{% highlight html %}
<ng-include src="template.url"><ng-include>
<!-- 혹은 -->
<div ng-include="template.url"></div>
{% endhighlight %}

##### ng-init

잘 와닿지 않음.

{% highlight html %}
<script>
function Ctrl($scope) {
  $scope.list = [['a', 'b'], ['c', 'd']];
}
</script>
<div ng-controller="Ctrl">
	<div ng-repeat="innerList in list" ng-init="outerIndex = $index">
		<div ng-repeat="value in innerList" ng-init="innerIndex = $index">
			<span class="example-init">list[ {{outerIndex}} ][ {{innerIndex}} ] = {{value}};</span>
		</div>
	</div>
</div>
{% endhighlight %}

##### ng-keydown, ng-keypress, ng-keyup

키보드 이벤트에 대해서 특정 행동을 하는 디렉티브

{% highlight html %}
<input ng-keydown="count = count + 1" ng-init="count=0">
{% endhighlight %}

##### ng-list

배열을 구분된 문자열로 출력하거나 콤마로 배열을 만든다.

{% highlight html %}
<input ng-model="names" ng-list />
{% endhighlight %}

##### ng-model

input, select, textarea에 쓰인다.

{% highlight html %}
<input ng-model="val" />
{% endhighlight %}

##### ng-model-options

어떤 이벤트가 발생했을 때 모델을 업데이트 할 것인지 결정할 수 있다. 옵션은 updateOn, debounce 두 가지를 지원한다. debounce는 밀리세컨 단위로 입력하여 해당 시간이 지나면 이벤트가 발생할 수 있도록 도와준다.

{% highlight html %}
<input ng-model="val" ngModelOptions="{ updateOn: 'default blur', debounce: {'default': 500, 'blur': 0} }" />
{% endhighlight %}

##### ng-mousedown, ng-mouseenter, ng-mouseleave, ng-mousemove, ng-mouseover, ng-mouseup

마우스 이벤트를 바인딩 할 때 사용한다.

{% highlight html %}
<button ng-mousedown="count = count + 1" ng-init="count=0">
  Increment (on mouse down)
</button>
{% endhighlight %}

##### ng-non-bindable

앵귤러가 아무것도 바인딩하지 못하도록 만든다.

{% highlight html %}
<div>Normal: {{1 + 2}}</div>
<div ng-non-bindable>Ignored: {{1 + 2}}</div>
{% endhighlight %}

##### ng-open

true, false 값에 따라서 details 태그의 엘리먼트들을 보여주거나 감춘다.

{% highlight html %}
Check me check multiple: <input type="checkbox" ng-model="open"><br/>
<details id="details" ng-open="open">
   <summary>Show/Hide me</summary>
</details>
{% endhighlight %}

##### ng-pluralize 

페이스북의 좋아요를 생각하면 쉽다. 

{% highlight html %}
<ng-pluralize count="personCount" offset=2
              when="{'0': 'Nobody is viewing.',
                     '1': '{{person1}} is viewing.',
                     '2': '{{person1}} and {{person2}} are viewing.',
                     'one': '{{person1}}, {{person2}} and one other person are viewing.',
                     'other': '{{person1}}, {{person2}} and {} other people are viewing.'}">
</ng-pluralize>
{% endhighlight %}

##### ng-readonly

true, false 값에 따라서 인풋박스를 편집 불가능한 상태로 만들어 준다.

{% highlight html %}
Check me to make text readonly: <input type="checkbox" ng-model="checked"><br/>
<input type="text" ng-readonly="checked" value="I'm Angular"/>
{% endhighlight %}

##### ng-repeat

반복을 사용할 때 쓴다. 사용할 수 있는 변수로는 $index, $first, $middle, $last, $even, $odd가 있다.

{% highlight html %}
<li ng-repeat="post in posts"> ... </li>
{% endhighlight %}

##### ng-selected

true, false 값에 따라서 option을 골라준다. option 태그에 사용된다.

{% highlight html %}
Check me to select: <input type="checkbox" ng-model="selected"><br/>
<select>
  <option>Hello!</option>
  <option id="greet" ng-selected="selected">Greetings!</option>
</select>
{% endhighlight %}

##### ng-style 

css 스타일을 태그에 적용할 때 사용한다.

{% highlight html %}
<input type="button" value="set" ng-click="myStyle={color:'red'}">
<input type="button" value="clear" ng-click="myStyle={}">
<br/>
<span ng-style="myStyle">Sample Text</span>
<pre>myStyle={{myStyle}}</pre>
{% endhighlight %}

##### ng-submit

form 태그에서 사용

{% highlight html %}
<form ng-submit="post();"> ... </form>
{% endhighlight %}

##### ng-switch, ng-switch on, ng-switch-when

선택된 값에 따라서 엘리먼트를 보여주거나 감춘다.

{% highlight html %}
<div ng-controller="Ctrl">
  <select ng-model="selection" ng-options="item for item in items">
  </select>
  <tt>selection={{selection}}</tt>
  <hr/>
  <div class="animate-switch-container"
    ng-switch on="selection">
      <div class="animate-switch" ng-switch-when="settings">Settings Div</div>
      <div class="animate-switch" ng-switch-when="home">Home Span</div>
      <div class="animate-switch" ng-switch-default>default</div>
  </div>
</div>
{% endhighlight %}

##### ng-transclude

디렉티브와 가까운 부모 엘리먼트를 포함시킬 때 사용한다. 디렉티브에서는 transclude : true 를 설정해줘야 한다.

{% highlight html %}
<script>
  function Ctrl($scope) {
    $scope.title = 'Lorem Ipsum';
    $scope.text = 'Neque porro quisquam est qui dolorem ipsum quia dolor...';
  }
 
  angular.module('transclude', [])
   .directive('pane', function(){
      return {
        restrict: 'E',
        transclude: true,
        scope: { title:'@' },
        template: '<div style="border: 1px solid black;">' +
                    '<div style="background-color: gray">{{title}}</div>' +
                    '<div ng-transclude></div>' +
                  '</div>'
      };
  });
</script>

<div ng-controller="Ctrl">
  <input ng-model="title"><br>
  <textarea ng-model="text"></textarea> <br/>
  <pane title="{{title}}">{{text}}</pane>
</div>
{% endhighlight %}

##### ng-value 

input 태그에 value를 설정할 수 있다.

{% highlight html %}
<input type="radio"
              ng-model="my.favorite"
              ng-value="name"
              id="{{name}}"
              name="favorite">
{% endhighlight %}

##### 기타

a, form, input, script, select, textarea 태그에 대한 설명은 생략.

