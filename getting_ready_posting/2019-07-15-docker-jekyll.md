---
layout: post
title: Docker 위에서 jekyll 실행하기
author: Yangeok
categories: DevOps
comments: true
cover:
---

## 작업환경

- git bash
- [docker for windows](https://docs.docker.com/docker-for-windows/install/)

## 작업순서

- docker windows 버전을 설치 및 실행시킨다.
- docker CLI에서 로그인을 한다.
- docker 명령어로 바로 실행하는 명령어를 사용한다.
- Dockerfile로 작성해서 사용하거나 쉘파일로 작성해서 커맨드를 사용한다.
- 장점
  - dokcer만 설치되어 있다면 환경에 구애받지 않고 어디서나 실행시킬 수 있다.
  - ruby 개발자가 아니라면 불필요한 ruby를 설치할 필요가 없어진다.
- 단점
  - 이미지 로딩속도가 조금 느리다.
  - dokcer 세팅하기가 까다롭다.

## 본론

로컬에 다 설치하고 실행하면 생각할 필요도 없는 문제들이 계속해 발생했습니다. 문제 별로 묶어서 확인 해보겠습니다.

### 경로 및 옵션 문제

`docker run --rm --name blog -v \$(pwd -W):/srv/jekyll -p 49160:4000 -it jekyll/jekeyll jeykll serve`

위와 같은 커맨드로 실행하면 에러가 발생합니다.

(어떤 에러인지 로깅해서 보여주기)

옵션으로 `--force_polling --livereload` 달아주고 다시 컨테이너를 실행해보면 에러가 발생하지 않을겁니다. 거기다 watching까지 해줘서 저장하고 브라우저에서 새로고침하면 변경사항이 반영되어 있습니다.

현재 우리는 docker 옵션에 `--rm` 플래그를 줘서 컨테이너를 종료하면 컨테이너가 자동으로 제거되도록 설정했습니다. 이 옵션을 끄고 컨테이너를 사용하시려면 나중에 쌓인 컨테이너들을 아래의 명령어로 제거해줄 필요가 있습니다.

`docker stop $(docker ps -aq) && docker rm $(docker ps -aq)`

혹자는 `--watch --drafts` 옵션을 주면 watching이 된다고 해서 해당 옵션으로 컨테이너를 만들어봤지만, 수정사항이 반영되지는 않았습니다.

윈도우에서 파일경로 형식은 `\` 혹은 `\\`을 사용하고, 유닉스 계통에서는 `/`를 사용해서 docker 볼륨설정하는 부분에서 에러가 발생할 수 있습니다.

(에러난 부분 로그 찍어주기)

처음에는 `-v $(pwd):/srv/jekyll`로 docker 컨테이너를 생성하려니 아래와 같은 에러가 발생해 절대경로를 사용했거든요. 한 환경에서만 프로젝트를 관리하려면 절대경로를 굳이 써도 상관없지만, 여러 환경에서 관리하려면 절대경로를 쓰면 환경마다 볼륨설정하는 부분을 환경에 맞게 새로 작성해줘야 하잖아요. 집컴, 회사컴 두군데서 관리하는데 세상 불편하더라구요.

`Error response from daemon: Mount denied`

이 때까지는 windows와 unix의 파일경로 형식이 다르다는 것을 인지하지 못하고 있던 상태입니다. git bash에서 `pwd`를 찍어보면 파일경로가 `/c/dev`식으로 나오거든요. 그래서 에러가 터질 수밖에 없었던거죠. `pwd -W`를 입력해보면 파일경로가 `C:/dev`식으로 나옵니다. 그래서 볼륨 옵션부분에 `-v $(pwd -W):/srv/jekyll`로 입력하시면 위의 에러는 사라지고 컨테이너가 작동하는 것을 확인할 수 있습니다.

```sh
$ pwd
/c/dev

$ pwd -W
C:/dev
```

만약 powershell을 사용하신다면 [이런 신박한 복잡한 방법](https://stackoverflow.com/questions/39133098/how-to-mount-a-windows-folder-in-docker-using-powershell-or-cmd)도 있습니다.

## 4000번 포트로 실행되지 않을때

4000번 포트로 아무것도 돌리지 않고 있는데 에러가 발생합니다. 40000번대 이상의 포트를 쓰니 컨테이너 생성이 아주 잘됩니다.

```sh
C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: driver failed programming external connectivity
on endpoint blog (ed0f8587c68ea6d0036b1dbdc313ae2cf900120053f55a9163567def303357ea): Error starting userland proxy: listen tcp 0.0.0.0:4000: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

## 컨테이너 볼륨 에러

(스샷 찍어서 링크 배포 필요)

docker 스크립트에서 volume 경로:경로 하면 drive sharing이 되는데용
이떄 윈도우에서는 admin 비번이 설정되지 않은 경우에도 비번을 입력하라고 나온다 ㅋㅋ
어처구니
하지만 비번을 설정하고 drive sharing을 하면 아주 잘된다 ㅠㅠㅠ

## docker/지킬 타임존 설정하기

#### 도커에서 하는 방법

환경변수로 하는법

docker run ... -e TZ=Asia/Seoul ...

#### 지킬에서 하는 방법

config.yml 에서 timezone: Aisa/Seoul로 설정하기 - 이걸로 바로 성공

md파일에서 헤더에 date: YYYY-MM-DD HH:MM +GMT

## 참조

- [Docker error C:\Program Files\Docker Toolbox\docker.exe: invalid reference format: repository name must be lowercase](https://stackoverflow.com/questions/48576308/docker-error-c-program-files-docker-toolbox-docker-exe-invalid-reference-forma)
- [How to mount a Windows' folder in Docker using Powershell (or CMD)?](https://stackoverflow.com/questions/39133098/how-to-mount-a-windows-folder-in-docker-using-powershell-or-cmd)
- [Docker won't start containers after win 10 shutdown and power up.](https://github.com/docker/for-win/issues/1038)
- [Docker: Error starting userland proxy: Bind for 0.0.0.0:50000: unexpected error Permission denied on Azure VM](https://stackoverflow.com/questions/53673801/docker-error-starting-userland-proxy-bind-for-0-0-0-050000-unexpected-error)

참고로 windows hyper-v를 지원하는 버전이어야 docker를 실행할 수 있다는 사실 잊지 말아주세요. windows home 버전은 사실상 docker 실행이 안되더라구요.
