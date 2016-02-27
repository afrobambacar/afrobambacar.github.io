---
layout: post 
title:  "재사용이 가능한 Backbone.js 컴포넌트 만들기"
date:   2014-11-16
---

# Writing reusable Backbone.js components

이 블로그 포스트에서 나는 Backbone.js의 모델, 컬렉션 그리고 뷰를 재사용이 가능하도록 만들 수 있는지 소개하려고 한다. 이 기술은 코드를 분리하고 각 기능에 맞는 컴포넌트를 만드는데 도움이 될 것이다.

우리의 백본 코드를 보면 종종 델, 컬렉션 그리고 뷰에서 재사용이 필요한 비슷한 메쏘드들을 발견하곤 한다. 예를들면 ```paginationCollection``` 같은 컴포넌트를 백본의 extend에 생성하는 것을 봤다. 하지만 우리는 이 방법을 별로 좋아하지 않았다. 우리의 아키텍쳐의 다른 레이어에 추가되는 것이 아니라 단지 어떤 코드가 객체들 간에 공유가 되기를 원했다. 기본적으로 우리는 좀더 분리할 수 있는 방법을 원했고 그것을 mixins 으로 해결했다. 

## 그래서 mixin은 무엇인가?

기본적으로 mixin은 백본 컴포넌트에 유용한 기능을 공유할 수 있게 해준다. 예를들면 모든 뷰는 아니지만 꽤 많은 뷰에 pagination과 같은 것이 있다면 이 기능을 어떻게 구현할 것인가?

우리는 특별한 기능을 추가시키기 위한 용도로 다음과 같은 API가 있다.

{% highlight javascript %}
UsersView.mixin(pagination);
AppView.mixin(Transitions);
{% endhighlight %}

우리는 전에 보았던 것 보다 한단게 더 나아간 mixins의 컨셉을 채용했다. 우리가 구현한 것은 단순히 모든 프로퍼티들을 인클루딩 시키는 것 외에도 인클루딩 하는 객체의 initialize 역시 추가할 수 있도록 했다. 뿐만아니라 render와 events도 마찬가지다. 이것이 무엇을 의미하는지 다음 예제를 통해서 살펴보자.

{% highlight javascript %}
var UserView = BaseView.extend({
  events: {
    "click h1": "user"
  },
  initialize: function() {
    console.log("user init");
  },
  user: function() {
    return this.model.get("name");
  }
});

// This is our mixin:
var Pagination = {
  events: {
    "click a.next": "next"
  },
  initialize: function() {
    console.log("pagination init");
  },
  next: function() {
    return "next for: " + this.model.get("name");
  }
}

UserView.mixin(Pagination);

var model = new Backbone.Model();
model.set("name", "Kim");

var view = new UserView({ model: model });
// this initialization console.log (in order):
// "user init"
// "pagenation init"

console.log(view.user()); // "Kim"
console.log(view.next()); // "next for: Kim"
console.log(view.events); // {
                          //    "click a.next": "next",
                          //    "click h1": "user"
                          // }
{% endhighlight %}

위 코드에서 볼 수 있듯이 mixin은 모델, 컬렉션, 뷰와 동일한 방법으로 ```this```에 접근한다. 추가적으로 mixins는 스스로 동작할 수 있는 가능성을 가지고 있다. 예를들면 ```initialize```, ```render``` 그리고 ```events```가 컴포넌트에 확장될때 해당 컴포넌트는 mixin에 무엇이 있는지 알 필요가 없도록 하기 위해서다.

## 구현

이러한 mixins가 어떻게 구현되는지 다음의 예를 보자. 특히 우리는 뷰를 위한 mixins의 구현을 살펴볼 것이다.

{% highlight javascript %}
Utils = {};

Utils.viewMixin = function(from) {
  var to = this.prototype;

  // we add those methods which exists on 'from' but not on 'to'
  _.defaults(to, from);
  // ... and we do the same for events
  _.defaults(to.events, from.events);

  // we then extend 'to''s 'initialize'
  Utils.extendMethod(to, from, "initialize");
  // ... and its 'render'
  Utils.extendMethod(to, from, "render");
};

// Helper method to extend an already existing method
Utils.extendMethod = function(to, from, methodName) {

  // if the method is defined on from ...
  if (!_.isUndefined(from[methodName])) {
    var old = to[methodName];

    // ... we create a new function on to
    to[methodName] = function() {

      // wherein we first call the method which exists on 'to'
      var oldReturn = old.apply(this, arguments);

      // and then call the method on 'from'
      from[methodName].apply(this, arguments);

      // and then return the expected result,
      // i.e. what the method on 'to' returns
      return oldReturn;
    };
  }
};
{% endhighlight %}

이제 ```this```가 올바른 것을 가리킬 수 있도록 그리고 우리가 처음 예제에서 보았던 것 처럼 mixin을 포함시키는 일이 필요하다. 이것은 두 가지 방법으로 할 수 있는데 두 가지 방식 모두 위에서 만든 ```viewMixin```을 이용할 것이다.

1. Backbone 문서에 언급되어 있듯이 Backbone 컴포넌트에 직접 추가하는 것도 괜찮다. 

  {% highlight javascript %}
  Backbone.View.mixin = Utils.viewMixin;
  {% endhighlight %}

2. 만약 레이어드 아키텍쳐를 생성했다면 ```viewMixin```을 레이어중 하나에 포함시키면 된다. 나의 프로젝트는 우리가 만든 뷰의 기본이 되는 ```BaseView```가 있다. Backbone 뷰가 다음과 같이 정의되어 있음을 기억하라

  {% highlight javascript %}
  Backbone.View.extend(properties, [classProperties])
  {% endhighlight %}

  API를 생성하려고 한다면 ```BaseView```에 다음과 같이 ```mixin```을 클래스 프로퍼티로 추가할 수 있다.

  {% highlight javascript %}
  var BaseView = Backbone.View.extend({
    // lots of methods
  }, {
    mixin: Utils.viewMixin
  })
  {% endhighlight %}

나의 프로젝트는 ```BaseView```가 있었기 때문에 후자의 방법을 선택했다.

원문: [Writing reusable Backbone.js components](http://open.bekk.no/mixins-in-backbone)
