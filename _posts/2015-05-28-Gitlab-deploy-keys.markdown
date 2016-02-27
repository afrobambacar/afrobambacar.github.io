---
layout: post
title:  "Gitlab deploy keys"
date:   2015-05-28
---

# Deploy keys

Deploy keys는 하나의 SSH key로 여러개의 프로젝트에 read-only로 접근할 수 있게 해준다.

이 키는 CI 서버에 리파지토리를 복사할 때 매우 유용하다. 디플로이 키를 사용하면 더미 사용자 계정을 설정할 필요가 없다.

만약 당신이 프로젝트 마스터 혹은 소유자라면 프로젝트 설정 하위의 Deploy Keys 섹션에 키를 추가할 수 있다. New Deploy Key 버튼을 누르고 SSH 공개 키를 업로드하라. 그러면 프라이빗 키를 사용하는 서버에서 프로젝트에 read-only 접근을 할 수 있다.

당신은 New Deploy Key 옵션에 의해서 같은 deploy key를 두번 등록할 수 없다. 만약 다른 프로젝트에 같은 키를 추가하고 싶다면, "Deploy keys from projects available to you"라고 적혀있는 섹션에 보이는 목록에서 활성화 하라. 당신이 접근 가능한 모든 프로젝트의 디플로이 키 모두가 사용 가능하다. 자세한 내용은 ```app/models/user.rb```파일 안의 ```accessible_deploy_keys```를 보라. 