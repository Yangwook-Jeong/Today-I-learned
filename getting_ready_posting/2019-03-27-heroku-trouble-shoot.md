---
layout: post
title: Heroku 앱 에러 트러블슈팅하기
author: Yangeok
categories: DevOps
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1552491150/logo/posts/heroku.jpg
---

배포를 했습니다만 에러메시지만 뜹니다.

```
Application error
```

다행이도 `heroku logs --tail`로 에러메시지를 추적할 수가 있습니다.

```sh
2019-03-27T11:51:12-07:00 heroku[router]: at=error code=H10 desc="App crashed" method=GET path="/" host=myapp.herokuapp.com fwd=17.17.17.17 dyno= connect= service= status=503 bytes=
```

- heroku:

  - `heroku login`
  - 히로쿠에 앱을 생성하지 않았다면
    - `heroku app:create [앱 이름]`
  - 히로쿠에 앱을 생성했다면
    - `heroku git:remote -a [앱 이름]`
  - package.json에 node, npm 버전정보를 추가한다.

  ```json
  {
    "engines": {
      "node": "x.xx.x",
      "npm": "x.xx.x"
    }
  }
  ```

  - [r10 에러](https://devcenter.heroku.com/articles/error-codes#r10-boot-timeout)
    - [환경변수에 있는 port값을 대문자 PORT로 바꿔야 heroku app 에서 바인딩할 수 있다.](https://stackoverflow.com/questions/15693192/heroku-node-js-error-web-process-failed-to-bind-to-port-within-60-seconds-of)
    - 다른 포트 환경변수가 아니라 heroku 앱에 배포할 production 포트는 그냥 process.env.PORT이다.
  - `git push heroku master`
  - `heroku open`: heroku 앱 페이지를 브라우저에서 연다.

- todo-back:
  - `heroku logs --tail`에 나온 h10 에러 해결하기
    - heroku 기본포트는 `process.env.PORT`이고 값은 80인데 앱 기본포트는 3002이다.
  - heroku에서 bash 쉘 띄우기
    - `heroku run bash`
  - h10 에러는 db 연결일 수도 있다. config vars에 db관련 변수를 추가시켜줘야 한다.
  - linux에서 node app 죽이기
    - `kill -9 1192`
    - `pkill -f node` 또는 `pkill -f nodejs`
