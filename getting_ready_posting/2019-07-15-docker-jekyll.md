---
layout: post
title: Docker 위에서 jekyll 실행하기
author: Yangeok
categories: DevOps
comments: true
cover:
---

## 작업환경

- [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)

## 작업순서

- 도커 윈도우버전을 설치 및 실행시킨다.
- 도커 CLI에서 로그인을 한다.
- 도커 명령어로 바로 실행하는 명령어를 사용한다.
- 도커파일로 작성해서 사용하거나 쉘파일로 작성해서 커맨드를 사용한다.
- 장점
  - 도커만 설치되어 있다면 환경에 구애받지 않고 어디서나 실행시킬 수 있다.
  - 루비 개발자가 아니라면 불필요한 루비를 설치할 필요가 없어진다.
- 단점
  - 이미지 로딩속도가 조금 느리다.
  - 도커 세팅하기가 까다롭다.

##

docker에서 jekyll 실행하면 에러뜨길래 플래그 --force_polling --livereload
달아뒀당

# docker rm `docker ps -a -q`

docker run --rm --name blog -v "C:/dev/record/blog:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll jekyll serve --force_polling --livereload

# 아래 옵션은 노노~

# --watch --drafts

## 에러 핸들링

로 커맨드를 내리는데

`docker run --name blog --volume="${PWD}/test:${PWD}\jekyll" -p 4000:4000 -it jekyll/jekyll jekyll serve`

`Error response from daemon: Mount denied:` 에러가 나면 아래와 같이 절대경로로 입력하면 이미지를 받을 수 있다.

로

`docker run --name blog --volume=C:\dev\record\test:C:\dev\record\jekyll -p 4000:4000 -it jekyll/jekyll jekyll serve`

## 아래와 같은 오류가 나면

```sh
$ docker run --rm --name blog -v "C:/dev/record/blog:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll jekyll serve --force_polling --livereload

C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: driver failed programming external connectivity on endpoint blog (019ddce4631aa692553c6fd7fd15cf440dfb0abf8e2938771a7cff1a8d63281b): Error starting userland proxy: mkdir /port/tcp:0.0.0.0:4000:tcp:172.17.0.2:4000: input/output error.
```

도커가 켜지지 않는 경우 발생하는 에러입니다. 만약에 도커가 켜져 있는데도 위와 같은 에러가 발생한다면 도커를 재실행시키면 에러가 발생하지 않을 것입니다.

## 참조

[Docker won't start containers after win 10 shutdown and power up.](https://github.com/docker/for-win/issues/1038)

##

```sh
C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: driver failed programming external connectivity
on endpoint blog (ed0f8587c68ea6d0036b1dbdc313ae2cf900120053f55a9163567def303357ea): Error starting userland proxy: listen tcp 0.0.0.0:3000: bind: An attempt was made to access a socket in a way forbidden by its access permissions.
```

뜨면 포트 번호를 40000번대 이상으로 올려서 하면 된당 ㅎㅎ
[참고](https://stackoverflow.com/questions/53673801/docker-error-starting-userland-proxy-bind-for-0-0-0-050000-unexpected-error)
