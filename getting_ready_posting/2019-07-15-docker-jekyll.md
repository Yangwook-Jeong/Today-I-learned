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

### ㅇㅇ

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
$ docker run --rm --name blog -v "C:/dev/record/blog:/srv/jekyll" -p 4000:4000 -it jekyll/jekyll jekyll serve --force_polling --livereloa
d
C:\Program Files\Docker\Docker\Resources\bin\docker.exe: Error response from daemon: driver failed programming external connectivity on endpoint blog (019ddce4631aa692553c6fd7fd15cf440dfb0abf8e2938771a7cff1a8d63281b): Error starting userland proxy: mkdir /port/tcp:0.0.0.0:4000:tcp:172.17.0.2:4000: input/output error.
```

반드시 도커를 재실행하면 된다.

[Docker won't start containers after win 10 shutdown and power up.](https://github.com/docker/for-win/issues/1038)
