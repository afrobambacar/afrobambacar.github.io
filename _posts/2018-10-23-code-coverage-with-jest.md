---
title: jest와 함께 코드 커버리지
date: 2018-10-23
description: jest --coverage
---

### 테스트 코드를 작성하는 이유

> 이제 수정하지 못하는 코드는 오래된 코드, 작성자가 퇴사한 코드가 아니라 테스트가 없는 코드가 되었다.

[코드 커버리지 80% 넘긴 썰](https://brunch.co.kr/@leehosung/43)

저 말은 진짜다. 개발자가 다루는 코드는 "오래되고 작성자가 퇴사한 코드"인 경우가 대부분이고 이를 유지보수 하는 건 정말 힘든일이다. 코드 수정으로 인해 빈번하게 사이드 이펙트가 발생한다면 테스트 코드를 작성하여 방어하는 습관을 들이면 좋다.

### Jest - Zero configuration

[jest](https://jestjs.io/)는 mocha, jasmine과 같은 테스트 툴이다. 최근에 jest가 각광받고 있는 이유는 "Zero configuration"이 아닐까 한다. 최근에 작업하고 있는 api 앱에서 jest를 사용하고 있는데 리퀘스트 모듈인 supertest와 함께 사용해보니 정말 편했다. 물론 다른 테스트 도구들을 사용하면서 겪은 러닝커브가 알게 모르게 도움이 되긴 했을 것이다. 

### 코드 커버리지

jest에서 코드 커버리지를 확인하는 건 정말 쉽다. 다음 명령어만 타이핑 하면 된다.

```bash
$ jest --coverage
```

위 명령어는 jest를 통해 테스트를 한 후에 코드의 어떤 부분이 테스트에서 빠져있는지 한눈에 보여준다. 만약 테스트가 되지 않은 코드가 있다면 Uncovered Line에 몇 번째 줄인지 까지 표시해준다. 

```bash
Test Suites: 10 passed, 10 total
Tests:       96 passed, 96 total
Snapshots:   0 total
Time:        21.836s
Ran all test suites.
----------------------------|----------|----------|----------|----------|-------------------|
File                        |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
----------------------------|----------|----------|----------|----------|-------------------|
All files                   |    92.34 |     82.8 |    92.91 |    94.32 |                   |
 src                        |      100 |       90 |      100 |      100 |                   |
  config.js                 |      100 |       90 |      100 |      100 |                23 |
 src/api/album              |      100 |      100 |      100 |      100 |                   |
  controller.js             |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 src/api/audio              |    88.89 |      100 |    66.67 |    88.89 |                   |
  controller.js             |    83.33 |      100 |    66.67 |    83.33 |                13 |
  index.js                  |      100 |      100 |      100 |      100 |                   |
  model.js                  |      100 |      100 |      100 |      100 |                   |
 src/api/auth               |      100 |      100 |      100 |      100 |                   |
  controller.js             |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 src/api/password-reset     |      100 |       90 |      100 |      100 |                   |
  controller.js             |      100 |       90 |      100 |      100 |                24 |
  index.js                  |      100 |      100 |      100 |      100 |                   |
  model.js                  |      100 |      100 |      100 |      100 |                   |
 src/api/track              |    87.84 |       75 |       80 |    88.89 |                   |
  controller.js             |    86.57 |       75 |       80 |    87.69 |... 23,124,150,152 |
  index.js                  |      100 |      100 |      100 |      100 |                   |
  model.js                  |      100 |      100 |      100 |      100 |                   |
 src/api/user               |     95.7 |    91.11 |       90 |    95.45 |                   |
  controller.js             |    91.49 |    87.88 |     87.5 |    91.11 |       17,19,20,21 |
  index.js                  |      100 |      100 |      100 |      100 |                   |
  model.js                  |      100 |      100 |      100 |      100 |                   |
 src/services/aws           |       90 |    66.67 |      100 |      100 |                   |
  index.js                  |       90 |    66.67 |      100 |      100 |                18 |
 src/services/error-handler |    61.11 |       50 |      100 |    66.67 |                   |
  index.js                  |    61.11 |       50 |      100 |    66.67 |... 36,37,45,46,53 |
 src/services/express       |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 src/services/facebook      |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 src/services/ffmpeg        |      100 |      100 |       80 |      100 |                   |
  index.js                  |      100 |      100 |       80 |      100 |                   |
 src/services/jwt           |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 src/services/mongoose      |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 src/services/passport      |    95.92 |    88.89 |      100 |      100 |                   |
  index.js                  |    95.92 |    88.89 |      100 |      100 |          18,29,35 |
 src/services/response      |      100 |       95 |      100 |      100 |                   |
  index.js                  |      100 |       95 |      100 |      100 |                12 |
 src/services/sendgrid      |      100 |      100 |      100 |      100 |                   |
  index.js                  |      100 |      100 |      100 |      100 |                   |
 test                       |    96.88 |       50 |      100 |      100 |                   |
  setup.js                  |    96.88 |       50 |      100 |      100 |                30 |
----------------------------|----------|----------|----------|----------|-------------------|
```

### 코드 커버리지를 관리하는 툴도 있다.

코드 커버리지를 관리하는 툴로는 [codecov.io](https://codecov.io/), [coveralls.io](https://coveralls.io/) 등이 있다. 이 서비스들은 코드 커버리지의 변화를 추적하여 그래프로 보여준다. codecov.io에서는 1개의 저장소까지는 무료로 사용할 수 있도록 제공하고 있다.

