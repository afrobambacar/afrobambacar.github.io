---
layout: post
title:  "Bitbucket POST Hook 이용하여 서버에 소스 배포 하기"
date:   2014-04-17
---

소스 관리 툴인 GitHub, Bitbucket 모두 Hook을 지원한다. Hook은 레포지토리에 어떤 변경이 있을 때 특정 액션이 일어날 수 있도록 도와주는데 예를 들면 로컬에서 git push가 일어났을 경우 이메일로 알려준다거나, 서버에 디플로이까지 할 수 있도록 해준다. 이 중 후자의 것을 구현하기 위해 많은 삽질을 했는데, 간단한 원리도 모른체 구글링 해서 나온 방법을 적용하다 보니 시행착오가 많았다. 그래서 아주 간단한 목표를 설정하고 이를 구현해보도록 했다. 

1. 목표는 로컬에서 작업 후 git push 했을 때 서버에서 자동으로 git pull 될 수 있도록 한다.
2. php 말고 nodeJS를 통해 bash를 실행시키고자 한다.

### 서버의 ssh_key를 bitbucket에 등록하기

서버에서 bitbucket에 있는 소스를 pull 하기 위해서는 로컬과 마찬가지로 ssh_key를 bitbucket에 등록해주어야 한다. git이 ssh를 통해 서로 소스가 왔다 갔다 하는 것이기 때문이다. bitbucket의 경우 레포지토리의 설정에 Deployment keys 메뉴에다가 키를 등록해주면 된다. 서버의 id_rsa.pub을 카피해서 키를 등록해주자.

### bitbucket에 POST hook 등록하기

레포지토리의 설정에 들어가보면 Hooks라는 메뉴가 있다. 그 중 POST를 선택하면 URL을 등록하라고 뜬다. 이 말은 레포지토리 업데이트가 일어났을 때 해당 URL로 POST 요청을 보내겠다는 뜻이다. 인풋박스에 POST 요청을 받을 서버 URL을 써주고 등록하면 된다. 단, 이 때 나는 nodeJS를 이용하므로 nginx에서 nodeJS를 가리키는 설정파일을 만들었고 nginx를 재시작, cname 등록하는 과정도 거쳤다.

### bitbucket의 POST hook 테스트 하기

이제 로컬에서 git push 했을 때 서버에서 POST 요청이 오는지 확인하면 된다. nodeJS로 간단하게 확인하기 위해 다음과 같은 소스를 짜고 서버를 올렸다.

{% highlight js %}
var http = require('http');

http.createServer(function (req, res) {
	
	if (req.method == 'POST') {

		console.log('POST request received!!');
        
	}

}).listen(8080, '127.0.0.1');
{% endhighlight %}

{% highlight bash %}
node hook.js & 
{% endhighlight %}

위 소스를 짜서 nodeJS를 올린다음 로컬에서 git push를 해봤다. 콘솔을 보니 'POST request received!!' 메시지가 떴다.

### git pull을 하기 위한 nodeJS 소스 다듬기

{% highlight js %}
var http = require('http');
var exec = require('child_process').exec;

http.createServer(function (req, res) {

  if (req.method == 'POST') {

        console.log('POST recieved!!');
        exec("git pull");

  }
}).listen(8080, '127.0.0.1');
{% endhighlight %}

POST 요청이 왔을 때 욕심내지 않고 그냥 git pull 해버리는 소스다. exec를 이용하여 git pull을 실행한다. 로컬에서 README.md 파일을 수정한 후에 git push 해보니 터미널에 'POST request received!!' 메시지가 떴다. 다음 서버에서 README.md 파일을 열어보니 로컬에서 고친대로 서버에 적용되었음을 알 수 있었다.

끝! 다음은 Grunt!

