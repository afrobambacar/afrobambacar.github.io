---
layout: post
title:  "구글 웹로그 분석 수집 제한 (Collection limits)"
date:   2014-05-26
---

[Google Analytics Collection Limits and Quotas](https://developers.google.com/analytics/devguides/collection/protocol/v1/limits-quotas) 번역

# 구글 웹로그 분석 수집 제한과 할당 

## 개요 

구글 웹로그 분석은 수백만개의 사이트에서 이용하고 있다. 처리할 수 있는 것 보다 더 많은 데이터를 수신하는 시스템을 보호하고, 시스템 자원의 공평한 분배를 보장하기 위해서 제한 사항이 존재한다. 제한에 대한 정책은 다음과 같으며 이것은 변경 될 수 있다. 

다음 할당량과 제한은 구글 웹로그 분석의 수집 태그, 라이브러리 그리고 SDKs에 적용된다. 여기에는 프로퍼티와 클라이언트 라이브러리 제한이 있다.

## 프로퍼티 제한

이 제한은 웹 프로퍼티 / 프로퍼티 / 트래킹 ID에 적용된다. 

* 프로퍼티당 월 1,000만 hits

이 한도를 초과할 경우 구글 웹로그 분석팀은 프리미엄으로 업그레이드 할 것을 권유하거나, 구글 웹로그 분석으로 전송되는 데이터의 양을 줄이기 위해 클라이언트 샘플링을 적용할 수 있다. 

월간 총 프리미엄 리밋을 위해서는 어카운트 관리자나 서비스 대표에게 연락하시라.

### ga.js 혹은 레거시 라이브러리

ga.js, 모바일 스니펫 그리고 여러 레거시 트래킹 라이브러리는 다음의 제한이 있다. 

* 세션당 500 hits (이커머스의 item, transaction hit 타입은 포함하지 않는다.)

이 한도를 초과할 경우 추가적인 hits는 해당 세션에서 제외된다. 이 제한은 프리미엄도 동일하다.

### Universal Analytics

analytics.js, 안드로이드, iOS SDK 그리고 Measurement Protocol에는 다음이 적용된다. 

* 유저당 하루에 200,000 hits
* 세션당 500 hits (이커머스의 item, transaction hit 타입은 포함하지 않는다.)

이 한도를 초과할 경우 추가적인 hits는 그날의 해당 세선에서 제외된다. 이 제한은 프리미엄도 동일하다.

## 클라이언트 라이브러리 / SDK의 Rate Limits

클라이언트 라이브러리들은 너무 많은 hits를 한번에 보낼 수 없도록 rate limiting 매커니즘으로 구현되어 있다. 이 매커니즘은 토큰 버킷 알고리즘을 기반으로 되어있다. 

트래커는 동시에 보낼 수 있는 요청의 수에 대한 최대값을 가지고 있따. 또한 트래커는 전송된 hits 수의 카운트를 세고 있다. hit가 구글 웹로그 분석으로 전송될 때마다 카운트는 1씩 감소한다. 카운트가 0이 되면 최대값에 도달한 것이며, 새로운 요청은 전송되지 않는다. 그 후 짧은 시간 동안 카운트 데이터가 다시 보내질 수 있도록 원래의 카운트가 다시 증가한다. 

다음은 각 라이브러리가 rate limits를 처리하는 방법을 설명한 것이다. 이러한 제한 중 하나라도 도달할 경우 hits는 구글 웹로그 분석 서버로 전송되지 않으며 보고서로 처리되지 않는다. 이러한 제한은 프리미엄 역시 동일하다. 

### ga.js

프로퍼티는 10개의 hits로 시작하며 1초에 1 hit 씩 증가한다. 이는 event 타입에만 적용된다. 

### analytics.js

프로퍼티는 20개의 hits로 시작하며 1초에 2개의 hit씩 증가한다. item, transaction의 이커머스를 제외하고 모든 hits에 적용된다. 

### 안드로이드 SDK

디바이스 각각의 트래커 인스턴스, 각각의 앱 인스턴스는 60 hits로 시작하여 2초마다 1 hit씩 증가한다. 이커머스를 제외하고 모든 hits에 적용된다. 

### 아이폰 SDK

각각의 프로퍼티는 60 hits로 시작하며 2초에 1 hit씩 증가한다. 이커머스를 제외한 모든 hits에 적용된다. 



