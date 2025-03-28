---
title: About
permalink: about/
profile: true
---

### 안녕하세요, 풀스택 개발자 이재철입니다.

음악산업, 헬스케어 그리고 이커머스 분야에서 기획, 프론트엔드, 백엔드 개발로 이어지는 커리어를 쌓은 풀스택 개발자입니다. 주 언어인 Javascript를 사용하여 문제를 해결하는 것을 좋아하고 새로운 것을 만들어나가는 과정을 즐기고 있습니다. 

**주요 업무 분야**

* 웹, 모바일, API 등 비즈니스에 필요한 프로덕트 개발
* Git에서 출발하여 배포까지 자동으로, CI/CD 구축
* 용도에 맞는 AWS 리소스 선택과 모범사례에 따른 인프라 구축
* 개발팀 리드 경험, 스타트업 설립 경험

### EXPERIENCE

**샘플리어** - 대표 - _5년 5개월 (2019. 11 - 재직중)_

* 음악 저작권 분야 스타트업 설립 운영
* 유튜브 음원 마케팅 서비스, 원더레드 런칭
* 2차적저작물 이용허락 서비스, 샘플리어 런칭

**디유닛** - 개발 팀장 - _2년 5개월 (2017. 07 - 2019. 11)_

* 이커머스 서울스토어 8인 규모 개발팀 리드
* IDC에서 AWS로 전체 서비스 이전
* AuroraDB, ElasticSearch, MongoDB, Memcached 운영
* 웹앱, API 앱, 모바일 앱 런칭

**E2E HEALTH** - 팀원 - _1년 3개월 (2016. 04 - 2017. 06)_

* 미국향 원격진료 헬스케어 스타트업 1호 팀원
* 보스톤 지역 원격진료 웹서비스 기획/개발
* 삼성병원 원격진료 웹서비스 기획/개발

**소리바다** - 개발 팀장 - _1년 4개월 (2014. 06 - 2015. 09)_

* 9인 규모의 웹 개발팀 리드
* Backbone.js 기반의 소리바다 공통 SPA 웹 프레임워크 S 개발
* 소리바다 19개 호스트 관리 및 개발
* Gitlab, Gitlab-CI 도입하여 CI/CD 구현

**소리바다** - 기획 팀장 - _6년 6개월 (2007. 12 - 2014. 05)_

* 4인 규모의 기획팀 리드
* 소리바다 기획 PM
* 소리바다 서비스 스토리보딩, 와이어프레이밍
* Jira, Confluence 도입

### FEATURED SKILLS

* BBC Audiowaveform 오픈 소스를 이용한 Wavefrom data 추출 및 D3.js로 렌더링하기
* 기본에 충실한 REST API, 단위, 통합 테스트, 문서화를 포함한 스캐폴딩
* [React Native 프로젝트 배포 자동화 구현](https://afrobambacar.github.io/2019/01/react-native-ci-cd-with-travis-ci-and-fastlane.html)
* [Serverless를 이용한 이미지 리사이징 람다 함수 구현](https://afrobambacar.github.io/2018/12/image-resizing-with-lambda-edge.html)

### FEATURED PROJECTS

#### 스파이크 트래픽에 취약했던 서울스토어의 AWS 이주 프로젝트

![SEOULSTORE SPA WEB](/assets/images/2025/2025-03-28-seoulstore-web.jpg)

**개요**

온라인 쇼핑몰 서울스토어는 마케팅 메시지를 발송할 때마다 스파이크 트래픽을 견디지 못하고 서버가 다운되는 일을 겪고 있었습니다. 문제 해결을 위해 입사 후 첫번째 프로젝트로 AWS로 이주를 결정했으며, PHP로 개발된 모놀리식 서비스를 멀티 티어로 다시 개발하기로 했습니다. 

* 진행기간: 2017. 07 - 2018. 03
* 참여인원: 총 4명 - _팀장 1명 / 웹 개발 1명 / API 개발 2명_

**주안점**

* 손 쉽게 스케일 아웃이 가능하도록 AWS 인프라 구성
* 통합 검색 기능, 트래픽 분산의 목적으로 Aurora DB 외 ElasticSearch 추가
* 향후 모바일 앱 런칭을 위해서 웹, API를 분리하여 별도의 앱으로 개발
* SPA, REST API, Docker, CI/CD 셋을 선 개발하여 팀원들을 리드

**역할**

* 개발 리드: 다양한 기술 제안 및 스캐폴딩 제공
* AWS 인프라 구축: 오토스케일링, 무중단 배포에 필요한 모든 리소스 구축
* 웹 앱 스캐폴딩 및 개발: Backbone.js & Express.js
* API 앱 스캐폴딩 및 개발: Express.js & Sequelize.js
* 레거시 서비스 마이그레이션: CDN, 관리자 등 레거시 서비스, 리소스를 AWS로 마이그레이션

**성과**

* 반응형 웹으로 리뉴얼하여 데스크탑 & 모바일 동시 대응
* REST API 레이어의 분리로 모바일 앱 개발에 박차
* 스파이크 트래픽 형태의 동시접속 10,000유저 대응

#### 서울스토어 모바일 앱 출시를 위한 여정

![SEOULSTORE REACT NATIVE iOS APP](/assets/images/2025/2025-03-28-seoulstore-ios.jpg)

**개요**

REST API의 분리로 서울스토어 모바일 앱 개발이 가능하게 되었습니다. 안드로이드는 담당 개발자가 진행중이었으나, iOS는 개발자의 부재로 React Native와 Webview를 사용하여 하이브리드 앱을 만들기로 하였습니다. 여기에 더해 팀에는 모바일 앱 런칭 일정에 맞춰 사용자의 리텐션을 높일 수 있는 참여형 서비스의 개발 미션도 주어졌습니다.

* 진행기간: 2018. 05 - 2018. 07
* 참여인원: 총 8명 - _팀장 1명 / 웹 개발 2명 / API 개발 4명 / 안드로이드 1명_

**주안점**

* React Native로 원하는 앱을 만들 수 있는지 파일럿 테스트 진행
* 일정상 사용자 참여형 서비스는 웹 앱에 개발하고, iOS 앱은 웹 앱을 최대한 활용
* FCM 토큰 관리, 사용자 참여형 서비스는 MongoDB를 쓰고 이커머스 DB와 분리하여 부하 분산

**역할**

* Webview에서 전달하는 Customized User Agent에 따라 웹 앱이 다르게 동작하도록 로직 추가
* 서버로부터 AccessToken을 받는 회원가입, 로그인 등 계정 부분은 React Native에서 개발
* Universal Link를 적용하여 Push Notification 터치 시 의도한 웹뷰에 랜딩하도록 개발
* MongoDB와 REST API를 추가하여 모바일에서 전달하는 FCM 토큰을 관리하도록 개발
* MongoDB의 REST API는 ECS Fargate로 운영

**성과**

* 앱스토어에 iOS 앱, Android 앱 배포로 DAU 증가
* 사용자 참여형 서비스 "서울그램", 리워드 강화 프로그램 "친구할인코드" 런칭
* Push Notification이 적용, 사용자 참여형 서비스 적용으로 유저 리텐션 증가

#### 새로운 시장을 탐험하는 원더레드 프로젝트

![Responsive Web](/assets/images/2025/2025-03-28-wonder-red.png)

**개요**

스타트업 설립 후 음원사들과 미팅을 통해 유튜브 음원 마케팅 니즈를 파악하였고 이를 해결할 아이디어가 떠올랐습니다. 아이디어 검증을 위해 MVP 제작이 필요했고 프로젝트명 원더레드로 개발을 시작했습니다.

* 진행기간: 2024. 01 - 2024. 08
* 참여인원: 1명

**주안점**

* 원더레드는 피봇 아이템으로 기존 개발해둔 인프라, API 그리고 프론트엔드를 활용
* YouTube Data API, Reporting API에 대한 완벽한 이해 필요
* 드래그앤드랍 라이브러리, 차트 라이브러리 선정 필요
* 빠른 실행을 위해서 UI Wireframing, 디자인은 생략하고 바로 코딩 돌입

**역할**

* 기획, 디자인, 개발, 마케팅, 계약까지
* 프론트엔드는 Next.js, Redux.js, Docker로 구성
* 드래그앤드랍 React DnD 라이브러리 도입, 차트는 Apexchart.js 도입
* 백엔드는 Express.js, Monoose.js, Docker로 구성
* AWS SES로 메일링 서비스 구축, SES Template 기능을 활용하여 뉴스레터, 홍보메일 발송

**성과**

* 유튜브 유통사 2곳과 파트너쉽 체결, 총 6만곡의 수익공유 음원 제공
* 오픈 6개월만에 원더레드 제작 영상 총 조회수 1천만뷰 달성
* 237개 유튜브 채널 등록하여 이용 중

### TECH STACK

![Tech Stack](/assets/images/2025/2025-03-28-1-22-32-PM.png)

**Javascript**

프론트엔드부터 백엔드까지, OOP, Functional Programing, Typescript 까지, 애플리케이션 레벨에서 10년 이상 꾸준히 사용하고 있는 언어입니다. 최근에는 Next.js / React-Query / Zustand / Tailwind CSS 조합으로 프론트엔드를 만들고 있습니다.

**SPA**

Backbone.js에서 React.js까지, Single Page Web Application을 오랫동안 다뤄온 만큼 SPA에서 주로 발생하는 문제들을 해결한 경험이 있습니다. 또한 Javascript 생태계의 확장에 따라 함께 등장한 React Native, Electron까지 다양한 프레임워크를 사용한 경험이 있습니다.

**REST API**

Express.js와 데이터베이스에 맞는 ORM을 사용하여 REST API 앱을 만들어왔습니다. Jest와 Mocking 라이브러리를 이용한 테스트 코드를 작성하여 결과를 확인하는 습관이 있습니다. 

**CI/CD**

애플리케이션의 테스트, 빌드 그리고 배포를 위한 자동화 툴로 다양한 서비스를 사용한 경험이 있습니다. 설치형인 Gitlab CI를 시작으로 CircleCI, TravisCI 그리고 Github Actions을 사용했습니다. Webpack이 나오기 전, 웹 애플리케이션의 빌드는 태스크 러너인 Grunt.js와 Gulp.js를 통해 해결했으며, 배포 시 캐싱 이슈를 고려하여 js 정적 파일들은 S3에 업로드, CloudFront에 캐싱되도록 하고 있습니다.

**AWS**

오토스케일링, CDN, 모니터링 등 웹 서비스에 필요한 다양한 인프라를 AWS의 적절한 서비스를 선택하여 모범사례에 따라 구현하고 있습니다. Lambda 함수는 Serverless 프레임워크를 통해 관리하고, 인프라 리소스는 Terraform을 사용하여 팀원과 공유 및 IaC 코드 재사용을 하고 있습니다.

### EDUCATION

**명지대학교** - 학사 / _1998. 03 - 2005. 09_

전기공학, 건축공학 복수 전공

### CONTACT

* Email: jclee.dev@gmail.com
* LinkedIn: 











