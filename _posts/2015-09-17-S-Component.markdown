---
layout: post
title:  "S.Component"
date:   2015-09-17
description: S.Component 객체가 하는 일
---

# Overview

S.Component는 UI 컴포넌트를 만드는 클래스로 Backbone.View를 상속받아 생성한 클래스입니다.
S.Component는 컴포넌트 클래스의 등록부터 화면에 엘리먼트가 삽입되기 까지의 전반적인 사이클을 관리합니다.

# Rendering cycle on App.js
App.js에서 하는 일은 크게 두 가지 입니다.

* 컴포넌트 인스턴스 생성
* 컴포넌트의 render 함수 호출, 이때 DOM에 HTML 조각을 인서트 하는 콜백을 같이 던집니다.

나머지 사이클은 S.Component 내부적으로 실행되며 render 함수를 시작으로 callback을 실행하는 것으로 종료합니다.

* 렌더 함수 시작
* 모델 확인 및 패치
* 자식 컴포넌트 인스턴스 생성
* 자식 컴포넌트 랜더 함수 시작
* 모델 확인 및 패치
* 템플레이팅
* 부모 엘리먼트에 HTML 조각 인서트
* 템플레이팅
* HTML 조각을 DOM에 인서트하는 콜백 실행

# Trigger functions name on S.Component

S.Component에서는 사이클 중간 중간 트리거 하는 함수가 있으므로 컴포넌트에서는 진행 상황을 확인할 수 있습니다.

* onModelCreated: initialize에 이미 this.model이 있는 상황이거나 fetch가 완료되었을 때 호출합니다.
* createChildComponents: 이 함수는 모델이 fetch 된 후 템플레이팅 하기 전에 자식이 있는 지 확인하는 용도로 호출합니다.
* onRendered: 렌더링 & 템플레이팅이 완료된 시점에 호출합니다.
* onInserted: DOM에 인서트 후 호출합니다.
* onDetached: S.app.history에 컴포넌트가 추가되었을 때 호출합니다.
* onDestroyed: S.app.history에서 컴포넌트가 삭제되었을 때 호출합니다.

# Trigger event name on S.Component

사실 S.Component에서는 모델 페치부터 랜더까지 중간 중간 trigger하는 이벤트 이름들이 있습니다.
그 중에 대표적인 것이 fetchError 입니다. 이는 Tutorial: 컴포넌트에서 모델 fetchError 핸들링하기 예제에 설명되어 있으니 참고하시길 바랍니다.

다음은 S.Component에서 trigger하는 이벤트 이름들입니다.

* fetchError: 모델 fetch 실패 후 발생하는 이벤트 입니다. 
* render: 일반적으로 브라우저에 랜더링을 마친 후 발생시키는 이벤트입니다.
* childRender: renderNewChild 메서드에서 발생시키는 이벤트입니다.
* insert: 브라우저에 랜더링을 마친후 _inserted를 true로 만든 후 발생시키는 이벤트 입니다.
* detach: 컴포넌트가 제거될 때 발생하는 이벤트 중 하나로 컴포넌트의 _inserted 를 false로 만든 후 발생시키는 이벤트 입니다.
* destory: 컴포넌트 제거 중간에 발생하는 이벤트입니다. S.app.history 배열에서 빠질 때 주로 발생합니다.









