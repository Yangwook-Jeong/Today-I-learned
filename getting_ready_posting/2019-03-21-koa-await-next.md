---
layout: post
title: Koa 미들웨어 만들어 사용하기
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1552474849/logo/posts/sequelize.jpg
---

- jwt 인증순서
  - request header에 키는 Authorization 밸류는 Bearer로 시작하는 jwt를 입력한다.
  - jwt인증 미들웨어를 돌린다.
    - 라우터가 돌기 전에 jwt인증 미들웨어를 돌려야 한다.
    - 생성된 jwt를 브라우저단에서 요청을 보낼때마다 헤더 authorization에 붙여 보낸다.
    - jwt가 맞는지 검증을 한다.
    - jwt가 맞다면 `verify()`로 유저데이터인 `payload`를 불러온다.
    - `payload`값이 없으면 `request.user.authenticated`를 빈객체로 두고 있으면 true로 하고 `payload`값을 user객체에 삽입한다.
    - 이때 http 상태를 설정하지 않으면 자동으로 404가 붙으니 따로 200으로 설정해야한다.
    - 따로 인증이 필요하지 않은 페이지는 여기서 넘어가는데 `next()`를 사용할떄 await 키워드를 사용해야한다.
    - 인증이 필요한 페이지는 `request.user.authenticated`가 있는지 확인하고 다음 라우터로 넘어가고 없으면 에러메시지대로 돌게 한다.

koa-jwt사용하기
테스트케이스 작성하기

- koa: 기본 상태 404이므로 원하는 상태를 따로 설정해야한다.
- [NodeJs / Koa - Error payload not defined inside unit tests](https://stackoverflow.com/questions/52665302/nodejs-koa-error-payload-not-defined-inside-unit-tests)
- 미들웨어에서 next()할떄 await반드시 붙이고 하기
- [Why do we await next when using koa routers?](https://stackoverflow.com/questions/42532534/why-do-we-await-next-when-using-koa-routers/42670232)

다른 관련글

- [An async middleware seems to sometimes return an empty response](https://github.com/koajs/koa/issues/928)
