---
title: AWS ECS에서 블루그린 배포와 문제들
date: 2018-10-25
description: Minimum Healthy percent & Maximun percent
---

### Blue Green Deployment

무중단 서비스를 가능하게 하는 것이 블루 그린 배포다. 서버가 여러대 있을 때 배포를 모든 서버에 한번에 한다면 배포되는 동안은 서비스를 유지할 수 없기 때문에 배포 대상 서버를 나누어 운영중인 서버를 일부 살려둔 채 배포를 한 후, 배포가 완료된 서버를 서비스에 넣고 나머지 서버에 배포를 하는 방식이다.

AWS CodeDeploy에서는 블루그린을 한대씩 할지, 절반씩 할지 정할 수 있는데, ECS에 배포는 이것을 클러스터에 등록된 서비스의 %로 결정을 한다.

### Minimum Healthy percent & Maximun percent

ECS의 클러스터의 트리는 클러스터 > 서비스 > 태스크 구조로 되어 있다. 하나의 서비스에는 동일한 태스크들이 여러개 실행될 수 있다. 태스크란 결국 실행되는 도커 컨테이너이다. 태스크의 수 만큼 컨테이너가 클러스터에 등록된 ec2 내에서 실행되고 있는 것이다. 

ECS는 이 컨테이너의 미니멈 헬씨 퍼센트와 맥시멈 퍼센트로 블루 그린 배포를 결정한다. 서비스를 생성할 때 기본값은 미니멈 100%, 맥시멈 200% 이다. 이것이 의미하는 것은 배포가 될때 동작중인 컨테이너가 그대로 서비스를 유지하도록 한다는 것이고 - 100% - 똑같은 수량만큼 새로 띄운 후에 - 200% - 기존의 컨테이너를 종료하도록 정의한 것이다.

클러스터 > 서비스 > Deployment 탭에 보면 이것이 동작하는 것을 볼 수 있다. (물론 새로고침을 열심히 해야겠지만...). 새로고침이 귀찮다면 EC2 인스턴스에 접속하여 다음 명령어를 치자. 

```bash
$ docker logs -f ecs-agent
```

### ECS Deployment Hangs Case #1

> I figured out after days that the problem was the `MaximumPercent` configuration value for the service deployment. It was set to 150%. So, I had a single task running. ECS attempted to add another task during the deployment but could not because that would be 200% tasks, which is over the 150% max. So, it just hung........ I changed it to 250% and it deploys fine.

[ECS Deployment Hangs](https://forums.aws.amazon.com/thread.jspa?threadID=278101)

위 값들은 배포 상황에서 가끔 문제를 일으킨다. 예를들어 위의 케이스는 아마도 미니멈을 100%으로 설정해두고 맥시멈을 150%으로 설정하여 새로운 컨테이너가 실행되지 않았던 케이스이다. 

### ECS Deployment Hangs Case #2

```
(service rj-api-service) was unable to place a task because no container instance met all of its requirements. The closest matching (container-instance bbbc23d5-1a09-45e7-b344-e68cc408e683) is already using a port required by your task.
```
[Best Practice for Updating AWS ECS Service Tasks](https://stackoverflow.com/questions/46018883/best-practice-for-updating-aws-ecs-service-tasks)

만약 인스턴스 1대, 미니멈을 100%로 설정한 상황에서 다이나믹 포트 매핑을 사용하지 않고 특정 호스트 포트를 지정했을 때는 포트가 겹치는 문제가 발생한다. 이런 경우 인스턴스를 늘리거나, 미니멈을 0%, 맥시멈을 100%로 설정을 하면 먼저 떠있는 컨테이너를 죽인 후에 배포를 완료한다. 물론 이 경우 서비스는 잠시 죽는다.

### ECS Deployment Hangs Case #3

미니멈, 맥스 값은 CPU 유닛을 고려해야만 한다. t2 micro의 경우 1 vCPU이며 CPU 한개의 유닛은 1,024다. 만약 컨테이너의 cpu 유닛을 하드리밋 256으로 지정했다면 t2 micro에 띄울 수 있는 최대 컨테이너 수는 4개가 된다. 이 중에 하나는 이미 `ecs-agent`가 차지하고 있으니 많아야 3개 정도 띄울 수 있다. 이것을 초과하게 되면 새로운 컨테이너가 뜨지 못하고 배포를 마무리 짓지 못하게 된다.

[What does 'cpu' parameter mean in aws container service?](https://stackoverflow.com/questions/40657002/what-does-cpu-parameter-mean-in-aws-container-service)

### 여담. 그런데 배포는 언제 동작할까?

ecs-agent는 주기적으로 태스크의 변경 상태를 한번에 하나씩 체크한다. EC2 인스턴스에 3개의 컨테이너가 실행중이라면 한번에 하나씩 상태를 체크하여 작업을 해야할지 말아야 할지를 결정하는 것이다. 배포한 태스크의 순서가 와야 그제서야 변경사항을 확인하고 배포를 실행한다. 

