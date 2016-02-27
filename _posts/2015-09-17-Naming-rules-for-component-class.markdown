---
layout: post
title:  "Naming rules for component class"
date:   2015-09-17
---

# Overview

S 2.0에서 컴포넌트 클래스의 네이밍은 엄격하게 지켜져야 합니다.

* S 2.0에서 컴포넌트 클래스의 이름은 파일의 위치를 나타냅니다.
* html 에서 어떤 컴포넌트가 사용되었는지 나타냅니다.
* CSS의 적용 범위를 제한합니다.
* 클래스를 모아놓은 전역 객체 S.Components에 접근하기 쉽게 만들어줍니다.

이 문서에서는 컴포넌트의 이름이 위에 열거한 내용에 어떻게 영향을 미치는 지 설명합니다.

# Rules

우선 규칙부터 설명하자면 다음과 같습니다.

* 컴포넌트의 이름은 UpperCamelCase로 작성
* 공통으로 사용하지 않는 자식 컴포넌트는 Mom.Child로 dot를 활용
* 자식의 자식 컴포넌트는 다음과 같이 표기 Mom.Child.GrandChild

## 컴포넌트 이름에 따른 파일의 위치

{% highlight bash %}
client
|--Components
|--|--Mom
|--|--|--Child
|--|--|--|--GrandChild
|--|--|--|--|--GrandChild.css
|--|--|--|--|--GrandChild.html
|--|--|--|--|--GrandChild.js // 컴포넌트의 이름: Mom.Child.GrandChild
|--|--|--|--Child.css
|--|--|--|--Child.html
|--|--|--|--Child.js // 컴포넌트의 이름: Mom.Child
|--|--|--Mom.css
|--|--|--Mom.html
|--|--|--Mom.js // 컴포넌트의 이름: Mom
{% endhighlight %}

컴포넌트의 이름을 Mom이라고 지었다면 이 파일의 위치는 client/Components/Mom/ 디렉토리에 있어야 합니다.
또한 Mom.Child의 컴포넌트 디렉토리는 client/Components/Mom/Child/ 입니다. 
위 패스에는 UI 컴포넌트를 구성하기위한 html, css, js 파일이 있어야 합니다.
우선은 S.loaderJSON을 이용하여 파일의 위치를 별도로 적어주고 있지만 
이 규칙을 따를 경우 S.Component에서 컴포넌트의 이름을 토대로 패스를 만들고 자동으로 로드할 수 있도록 만들 수 있습니다.

# HTML에서 컴포넌트 클래스의 표기

S.Component를 상속받은 컴포넌트는 생성될 때 html 엘리먼트에 클래스 이름을 자동으로 붙입니다.
만약 컴포넌트 이름이 Mom 이었다면 html 엘리먼트에 Mom 이라는 클래스를 추가합니다.
만약 컴포넌트 이름이 Mom.Child라면 html 엘리먼트에 Mom_Child 라는 클래스를 추가합니다. (dot 클래스를 추가할 수 없으므로)

위와 같은 규칙을 고려해본다면 App_Header라는 html 조각은 App.Header라는 클래스로 부터 생성되었음을 유추할 수 있습니다. 또한 이 파일의 위치는 client/Components/App/Header/Header.js 라는 것도 유추할 수 있습니다. 스크린샷에 회색으로 하이라이팅 되어 있는 App, App_Kpop 처럼 클래스가 두개 붙는 경우가 있습니다.
이것이 나타내는 의미는 App.Kpop을 생성하였으나 App.Kpop은 App이라는 컴포넌트를 상속받았다는 것을 의미합니다.
즉, class App.Kpop < App < S.Component < Backbone.View 를 의미합니다.

# CSS의 적용범위 제한

컴포넌트가 위와 같이 HTML 조각들을 만든다면 CSS가 다른 컴포넌트에 영향을 미치는 것을 막을 수 있습니다.
클래스 이름 하위 요소에만 CSS를 적용하면 되기 때문입니다.
{% highlight js %}
.App_Header .logo {
	float: left;
	width: 270px;
	padding: 29px 0 0 23px
}
{% endhighlight %}

# 클래스를 모아놓은 전역 객체 S.Components에 담아지는 형태

S.Component.create 함수는 컴포넌트 클래스를 S.Components라는 네임스페이스에 추가합니다.
{% highlight js %}
(function () {
	S.Component.create('App.Header', {
		// prototype properties here
	});
})();
{% endhighlight %}

App이라는 컴포넌트는 S.Components.App에 등록되며 App.Header라는 컴포넌트는 S.Components.App.Header에 등록됩니다.그러므로 인스턴스 생성, 혹은 슈퍼클래스에 접근하는 용도로 사용할 수 있습니다.

{% highlight js %}
(function () {
	S.Component.create('App.Kpop', {
		superClass: 'App',
		template: _.template(S.Loader.get('App/Kpop/Kpop', 'Kpop')),
		initialize: function () {
			// 슈퍼클래스의 함수 실행
			S.Components.App.Kpop.callSuper(this, 'initialize');
		},
		createChildComponents: function () {
			// 인스턴스 생성 예
			this.header = this.addChild(new S.Components.App.Header());
			this.footer = this.addChild(new S.Components.App.Footer());
		}
	});
})();
{% endhighlight %}

