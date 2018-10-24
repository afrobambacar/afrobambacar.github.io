---
title: AWS ECS 적응기
date: 2018-10-22
description: 두서없는 삽질기
---

> AWS ECS가 어떻게 동작하는지 확인하고 싶다면 ssh 접속 가능한 EC2를 생성하고 클러스터에 등록하라.

이게 ECS에 적응하기 위한 삽질의 결론이다. 

### 튜토리얼은 망삘이다.

ECS 튜토리얼 중에 [모놀리스에서 벗어나기](https://aws.amazon.com/ko/getting-started/container-microservices-tutorial/)라는 것이 있다. AWS 관련 학습 과정 중 하나지만 서울리전에서 실행해보면 시작부터 짜증이 날 것이다. 한가지 예로 `ecs.yml` 파일에는 서울리전의 ECS-Optimized AMI가 정의되어 있지 않다. github에 이슈도 등록되어 있지만, 풀리퀘스트도 받지 않는 것 같다. 

### 리전별로 ECS에 최적화된 AMI가 있다.

[Amazon ECS-Optimized Amazon Linux AMI](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html)

위 목록에 나온 AMI들은 기본적으로 도커가 설치되어 있다. 그리고 ecs 이벤트를 받아 처리하기 위한 esc-agent가 기본적으로 설치되어 있기 때문에 번거로움을 줄일 수 있다. codeDeploy-agent를 다뤄본 경험에 의하면 수동으로 설치하는 것 보다 이미 제공하는 AMI를 사용하는 것이 정신건강에 좋다.

### 클라우드포메이션을 이해할 수 없다면 수동으로 구성하는 것이 낫다.

다음과 같은 상황을 고려해야 한다.

* 위에서 언급한 `ecs.yml`은 새로운 VPC를 구성한다. 당연히 인터넷 게이트웨이부터 서브넷, 시큐리티 그룹 등등 VPC 구성 요소 모두를 생성한다. default VPC에 리소스가 있고 클러스터와 연결이 필요하다면 VPC 피어링을 해야한다.
* 위 템플릿으로 생성된 인스턴스는 기본적으로 ssh 접근이 불가능하다. ssh 접근을 못하니 내부에서 어떻게 동작하는지 볼 수 없었고 디버깅이 어렵다. 

### EC2 Role에 필요한 권한을 추가해야한다.

클러스터에 등록한 EC2에서 컨테이너 목록을 보면 ecs-agent라는 것이 보인다. 처음부터 이녀석이 제대로 동작한다면 좋겠지만 나는 다음과 같은 에러를 만났다. 

```
$ docker logs -f ecs-agent
...
2018-10-22T06:40:06Z [ERROR] Unable to register as a container instance with ECS: AccessDeniedException: ... 
  status code: 400, request id: <request id>
2018-10-22T06:40:06Z [ERROR] Error registering: AccessDeniedException: User: ... is not authorized to perform: ecs:RegisterContainerInstance on resource: ...
  status code: 400, request id: <request id>
```

EC2 IAM Role에 `ecs:RegisterContainerInstance` 권한이 없어서 발생하는 에러로 EC2 IAM Role에 권한을 추가해줘야 한다. IAM에서는 `AmazonEC2ContainerServiceforEC2Role` 이름으로 제공하고 있다.

ecs-agent가 하는 일은 클러스터에 발생하는 이벤트를 수신하여 동작하는 것이다. 예를들면 서비스 등록이 되었을 때 이미지를 통해 컨테이너를 실행하는 작업 등이다.

### ECS 사용 포트를 시큐리티 그룹에 추가해야 한다.

클러스터 내부에 도커들은 31000 - 61000 포트 중 임의의 포트를 사용하여 컨테이너 포트와 매핑을 한다. 정확히 어떤 포트로 매핑되었는지는 타겟그룹을 보면 알 수 있다. 만약 EC2에서 사용하는 시큐리티 그룹에 위 포트가 허용이 되어있지 않다면 타겟 그룹의 헬스체크가 계속 실패하여 컨테이너를 죽였다 살렸다 할 것이므로 반드시 지정해주어야 한다.


