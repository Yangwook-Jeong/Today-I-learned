---
layout: post
title: Docker 위에서 jekyll 실행하기
author: Yangeok
categories: DevOps
comments: true
cover:
---

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
