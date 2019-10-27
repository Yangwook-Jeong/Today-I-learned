---
layout: post
title: Docker 위에서 jekyll 실행하기
author: Yangeok
categories: DevOps
date: 2019-10-28 10:08
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1572138444/logo/posts/dockyll.jpg
---

## 작업환경

- git bash
- [docker for windows](https://docs.docker.com/docker-for-windows/install/)

## 목차

- [경로 및 옵션 문제](#경로-및-옵션-문제)
- [경로 및 포트 오류](#경로-및-포트-오류)
- [컨테이너 볼륨 오류](#컨테이너-볼륨-오류)
- [타임존 문제](#타임존-문제)
- [참조](#참조)

로컬에 다 설치하고 실행하면 생각할 필요도 없는 문제들이 계속해 발생했습니다. 문제 별로 묶어서 확인 해보겠습니다.

## 경로 및 옵션 문제

`docker run --rm --name blog -v \$(pwd -W):/srv/jekyll -p 49160:4000 -it jekyll/jekeyll jeykll serve`

위와 같은 명령어로 실행하면 실행이 되기는 하되 regenerating이 되지 않습니다. 옵션으로 `--force_polling --livereload` 달아주고 다시 컨테이너를 실행시 파일을 저장하고 브라우저에서 새로고침하면 변경사항이 반영되어 있습니다.

현재 우리는 도커 옵션에 `--rm` 플래그를 줘서 컨테이너를 종료하면 컨테이너가 자동으로 제거되도록 설정했습니다. 이 옵션을 끄고 컨테이너를 사용하시려면 나중에 쌓인 컨테이너들을 아래의 명령어로 제거해줄 필요가 있습니다.

`docker stop $(docker ps -aq) && docker rm $(docker ps -aq)`

혹자는 `--watch --drafts` 옵션을 주면 watching이 된다고 해서 해당 옵션으로 컨테이너를 만들어봤지만, 수정사항이 반영되지는 않았습니다.

윈도우에서 파일경로 형식은 `\` 혹은 `\\`을 사용하고, 유닉스 계통에서는 `/`를 사용해서 도커 `-v` 옵션에서 에러가 발생할 수 있습니다.

> invalid reference format. repository name must be lowercase.

처음에는 `-v $(pwd):/srv/jekyll`로 도커 컨테이너를 생성하려니 아래와 같은 에러가 발생해 절대경로를 사용했거든요. 한 환경에서만 프로젝트를 관리하려면 절대경로를 굳이 써도 상관없지만, 여러 환경에서 관리하려면 절대경로를 쓰면 환경마다 볼륨설정하는 부분을 환경에 맞게 새로 작성해줘야 하잖아요. 집컴, 회사컴 두군데서 관리하는데 세상 불편하더라구요.

> Error response from daemon: Mount denied

이 때까지는 윈도우와 유닉스의 파일경로 형식이 다르다는 것을 인지하지 못하고 있던 상태입니다. git bash에서 `pwd`를 찍어보면 파일경로가 `/c/dev`식으로 나오거든요. 그래서 에러가 터질 수밖에 없었던거죠. `pwd -W`를 입력해보면 파일경로가 `C:/dev`식으로 나옵니다. 그래서 볼륨 옵션부분에 `-v $(pwd -W):/srv/jekyll`로 입력하시면 위의 에러는 사라지고 컨테이너가 작동하는 것을 확인할 수 있습니다.

```sh
$ pwd
/c/dev

$ pwd -W
C:/dev
```

만약 powershell을 사용하신다면 [이런 신박한 복잡한 방법](https://stackoverflow.com/questions/39133098/how-to-mount-a-windows-folder-in-docker-using-powershell-or-cmd)도 있습니다.

---

## 포트 오류

4000번 포트로 아무것도 돌리지 않고 있는데 오류가 발생합니다. 40000번대 이상의 포트를 쓰니 컨테이너 생성이 아주 잘됩니다.

> C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: driver failed programming external connectivity on endpoint blog (ed0f8587c68ea6d0036b1dbdc313ae2cf900120053f55a9163567def303357ea): Error starting userland proxy: listen tcp 0.0.0.0:4000: bind: An attempt was made to access a socket in a way forbidden by its access permissions.

---

## 컨테이너 볼륨 오류

아래와 같은 에러나 가면 drive sharing이 제대로 되지 않은 경우입니다.

> C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: Drive sharing failed for an unknown reason.
> See 'C:\Program Files\Docker\Docker\Resources\bin\docker.exe run --help

우측 하단에서 `Settings - Shared Drives`에 들어가서 컨테이너에 공유하고자 하는 드라이브를 공유설정 해줍니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572136304/docker-jekyll/docker-jekyll-01.jpg)

`Apply`를 누르면 아래와 같이 운영체제 계정 비밀번호를 입력하라고 나올겁니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572136305/docker-jekyll/docker-jekyll-02.jpg)

이 때 윈도우에서는 계정 비밀번호가 설정되지 않은 경우에도 비번을 입력하라고 나옵니다. 다른 대안은 아직 찾지 못했고, 계정 비밀번호를 설정한 다음 입력해주면 drive sharing이 됩니다.

---

## 타임존 문제

locale이 jekyll 이미지에 설치되어 있지 않아 포스팅 배포시 날짜가 금일로 설정되지 않고 9시간 전으로 설정되는 문제가 발생합니다. 그래서 [어썸데브 블로그 메일링](http://daily-devblog.com/)에도 어제 올린 글이 올라오지 않아서 넘나 슬펐습니다. 이 문제를 해결하기 위한 방법은 두 가지입니다.

도커 명령어에 `-e TZ=Asia/Seoul`를 추가합니다. 그럼 컨테이너 자체에서 시간이 한국 표준시로 맞춰집니다.

프로젝트 내에 있는 `_config.yml` 에서 `timezone: Aisa/Seoul`로 설정합니다. 물론 config파일은 서버를 껐다 다시 켜야 reload가 됩니다. 포스팅 파일에서 헤더에 `date: YYYY-MM-DD HH:MM`까지 추가해주면 내가 원하는 시간으로 외부에 노출시킬 수 있습니다.

---

참고로 windows hyper-v를 지원하는 버전이어야 docker를 실행할 수 있다는 사실 잊지 말아주세요. windows home 버전은 사실상 docker 실행이 안되더라구요.

## 참조

- [Docker error C:\Program Files\Docker Toolbox\docker.exe: invalid reference format: repository name must be lowercase](https://stackoverflow.com/questions/48576308/docker-error-c-program-files-docker-toolbox-docker-exe-invalid-reference-forma)
- [How to mount a Windows' folder in Docker using Powershell (or CMD)?](https://stackoverflow.com/questions/39133098/how-to-mount-a-windows-folder-in-docker-using-powershell-or-cmd)
- [Docker won't start containers after win 10 shutdown and power up.](https://github.com/docker/for-win/issues/1038)
- [Docker: Error starting userland proxy: Bind for 0.0.0.0:50000: unexpected error Permission denied on Azure VM](https://stackoverflow.com/questions/53673801/docker-error-starting-userland-proxy-bind-for-0-0-0-050000-unexpected-error)
