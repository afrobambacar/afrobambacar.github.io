---
title: Redux vs MobX
date: 2018-11-01
description: 무엇을 선택할 것인가? 그것이 문제로다. 
---

### 무엇을 사용해야 하는가 고민이 된다.

한달전만 해도 나는 React-Native의 데이터와 상태 관리를 위해 Redux를 공부했다. Flux에 대해서 공부하고 `state`와 `props`의 차이점, `Action`과 `Store`에 대한 이해, 그리고 Redux를 이용한 앱의 코드 작성 패턴과 컴포넌트 연결, Redux의 수많은 (적어도 그렇게 느껴지는) 미들웨어들까지 ... Backbone.js를 주로 다루었던 경험에 비추어 새로 봐야할 것들이 너무 많았다.

자, 그런데 Redux만 있는 것이 아니었다. 이제 MobX라는 것이 주목을 받는 모양이다. 아무리 급변하는 자바스크립트 생태계라지만 이건 빨라도 너무 빠르다. 무언가를 익히기 전에 새롭게 주목받는 무언가와 비교를 해야 하다니 말이다. 

나는 아직 아무것도 선택하지 못했다. 무엇으로 프로젝트를 시작해야 할지 아직도 고민중이라는 것이다. 그나마 조금 익숙해진 Redux로 프로젝트를 시작할 수도 있지만 MobX가 눈엣가시 처럼 밟힌다. 과연 둘의 차이가 무엇인지 꼭 알고 넘어가야 겠다고 생각하여 이 글을 정리하기 시작하는 것이다. 

[What's the difference between Redux and MobX?](https://www.robinwieruch.de/redux-mobx-confusion/#difference)

위의 글은 나와 같은 고민을 하는 사람들을 위한 둘의 차이점을 기술하고 있다. 블로그에 실려있는 다른 글보다 와닿는 문구가 많아서 내용을 정리하려고 한다. 

### 무엇이 다른가?

1. Redux는 함수형 프로그래밍에서 영향을 받은 라이브러리이다. OOP 백그라운드를 가진 사람들이 MobX를 친숙하게 생각하는 이유가 바로 여기에 있다.

> Redux is influenced by functional programming (FP) principles. FP can be done in JavaScript, but a lot of people come from an object-oriented background, like Java, and have difficulties to adopt functional programming principles in the first place. That adds up later on why MobX might be easier to learn as a beginner.


2. Redux는 immutable이다. 항상 새로운 상태를 반환한다. 하지만 MobX는 mutable이다. 상태를 변경할 수 있다.

> Your Redux state is immutable. Instead of mutating your state, you always return a new state. You don’t perform state mutations or depend on object references. ... In comparison, MobX by Michel Weststrate is influenced by object-oriented programming, but also by reactive programming.  ... In MobX your state is mutable.


3. Redux는 하나의 전역 스토어를 가지는 반면 MobX는 여러개의 지역 스토어를 가지도록 되어 있다. (물론 Redux도 여러개의 지역 스토어를 가지게 할 수 있지만 적어도 Best Practice로 언급되지는 않는다.)

> In Redux you keep all your state in one global store or one global state. In contrast, MobX uses multiple stores. Similar to Redux reducers, you can apply a divide and conquer by technical layers, domain etc. You might want to store your domain entities in separate stores yet also have control over the view state in on of your stores. After all, you collocate state that makes the most sense in your application.

4. Redux의 `state`는 read-only라고 한다면 MobX는 read and write 이다. 이 말은 immutable, mutable과 의미가 일맥 상통한다. getter, setter에 익숙하다면 MobX가 이해하기 편할 것이라는 말이다.

> You have seen how to update the state in both Redux and MobX. It is different. In Redux your state is read-only. You can alter the state only by using explicit actions. In contrast, in MobX the state enables read and write. You can mutate the state directly without using actions yet you can opt-in explicit actions by using the enforceActions configuration.

### 하지만 나는 Redux를 선택하기로 했다. 

Redux인가 MobX인가? 커뮤니티에서의 논쟁은 더이상 신경쓰지 않고 내 맥락에서만 생각해보자면 비교적 적은 러닝커브로 부트스트래핑하기에는 MobX가 괜찮은 것 같다. 내가 MobX를 눈여겨 본 것이 딱 그와 같은 이유였기 때문이다. 

하지만 MobX는 아직 자유분방하다. 그 말은 프로젝트의 스케일이 커지는 시점에는 어떤 형태로 사용하자는 약속이 필요해진다는 것이다. 그리고 경험상 이것을 정의하기 위해서는 꽤 많은 에너지가 소비된다. 

적어도 Redux는 그 구조가 일부 적용되어 있다. 

