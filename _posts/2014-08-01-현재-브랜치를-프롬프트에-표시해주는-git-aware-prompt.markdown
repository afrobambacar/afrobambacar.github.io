---
layout: post
title:  "현재 브랜치를 프롬프트에 표시해주는 git-aware-prompt"
date:   2014-08-01
---

Github에는 정말 유용한 소스들이 많이 있습니다. 최근 배포 프로세스를 정비하고 있는 회사에서 브랜치를 많이 활용할 것 같아 조사를 하던 도중 다음과 같은 것을 발견했습니다. 명령 프롬프트에서 현재의 브랜치를 표시해주는 녀석입니다.

<img src="https://camo.githubusercontent.com/10ac3481302ea892484f443aa6fe6b57fe81f181/68747470733a2f2f7261772e6769746875622e636f6d2f6a696d65682f6769742d61776172652d70726f6d70742f6d61737465722f707265766965772e706e67" />

# Installation

[git-aware-prompt](https://github.com/jimeh/git-aware-prompt) 페이지에 잘 설명이 되어있지만, 간단히 번역하면 다음의 과정을 통해 설치할 수 있다.

먼저 로컬의 홈 디렉토리에 있는 .bash 폴더에 해당 프로젝트를 복사합니다.

{% highlight bash %}
mkdir ~/.bash
cd ~/.bash
git clone git://github.com/jimeh/git-aware-prompt.git
{% endhighlight %}

~/.profile 혹은 ~/.bash_profile 파일의 상단에 다음의 코드를 추가합니다.

{% highlight bash %}
export GITAWAREPROMPT=~/.bash/git-aware-prompt
source $GITAWAREPROMPT/main.sh
export PS1="\u@\h \w \[$txtcyn\]\$git_branch\[$txtred\]\$git_dirty\[$txtrst\]\$ "
{% endhighlight %}

추가적으로 sudo -s 를 사용했을 때 프리티 프롬프트를 원한다면 다음의 라인도 추가합니다.

{% highlight bash %}
export SUDO_PS1="\[$bakred\]\u@\h\[$txtrst\] \w\$ "
{% endhighlight %}

만약 .profile 혹은 .bash_profile 파일을 처음 만들었거나 3번까지 했는데 잘 작동하지 않는다면
해당 파일을 로드하세요.

{% highlight bash %}
source ~/.profile
{% endhighlight %}

소스 : [git-aware-prompt](https://github.com/jimeh/git-aware-prompt)
