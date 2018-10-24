---
title: AWS의 Taget Group에 https 프로토콜?
date: 2018-10-24
description: http를 사용하는 것이 속 편하다.
---

### 봉착한 문제 

https를 이용하여 서비스를 하고 싶었다.

* ALB에서 443 포트 리스너 구성
* Target Group을 생성할 때 https 프로토콜 선택
* ALB 443 리스너에 새로 생성한 타겟 그룹 등록

결과. health check이 무한 실패한다. 

### 왜 이런거지???

타겟그룹의 프로토콜을 https로 설정한다는 것은 타겟그룹이 로드밸런서에서 받은 요청을 인스턴스에 요청할 때 https 프로토콜로 한다는 것이다. 중요한 거라서 한번 더 말하자면 타겟그룹이 인스턴스에 요청할 때 443번을 사용한다. 그렇다. 인스턴스 자체에 443 요청을 처리하기 위한 certification이 없다면 이 요청은 수락되지 않는다. 잘 생각해보면 로드밸런서에서 443 리스너를 생성할 때는 AWS의 Certificate Manager를 통해 발급받은 인증서를 등록하는 과정을 거친다. 그런데 타겟그룹은 이런 설정이 없다. 

따라서 다음과 같은 선택지가 남는다. 

* AWS Certificate Manger에서 인증서를 다운받은 후 인스턴스마다 설정을 해준다. 
* 타겟 그룹에서 인스턴스에 요청 시 http(80)을 사용하자. <- 이게 속 편함.

후자를 선택한다고 해도 주소창에 https를 사용하는 것은 문제가 되지 않는다.

ref. 

[ELB health checks failing only for HTTPS](https://serverfault.com/questions/858704/elb-health-checks-failing-only-for-https)

