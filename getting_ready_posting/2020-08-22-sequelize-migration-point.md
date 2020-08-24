---
layout: post
title: Sequelize 모던하게 세팅하는 법과 그 도구들
author: Yangeok
categories: Node.js
date: 2020-08-22 09:00
comments: true
tags: [sequelize, sequelizejs, orm, migrations, migration, models, model, table, schema]
cover:
---

## 개발환경
- nodejs
- sequelize
- sequelize-automate
- sequelize-auto-migrate-v3
- umzug

## 서론

맨 처음 프로젝트 할 때는 /migrations, /models 두 군데서에서 테이블 스키마를 관리해주는게 당연한 줄로만 알았습니다.
typeorm을 접하면서 /entities 혹은 /entity에서만 스키마를 관리하는걸 보고 푸욱 빠졌습니다.
하지만 최근 시작한 프로젝트에서는 nodejs를 javascript로 쓰기때문에 sequelize를 쓰면서 다시 한 번 고통받고 있습니다.

## 본론

`/models`, `/migrations`를 따로 관리해줘야 합니다.

db가 비어있을 때 `models/*.js`를 작성하고 `snyc()`시키면 최초 1회는 db에 테이블 정보가 반영됩니다. 다만 그 다음부터는 `sync()`를 실행해도 반영되지 않습니다. 위와 같은 이유로 실제 db에 테이블을 동기화시키기 위해서는 `sequelize-cli`를 통해 `/migrations`에 있는 파일을 이용해 migration을 해줘야 합니다.

최초 1회 말고는 db에 반영도 되지 않기때문에 `/models`에서는 테이블 스키마를 관리할 필요가 없다고 판단했습니다. migration에서는 `umzug`과 `sequelize-automate`를 사용합니다.

`migrate:undo`만을 하고싶은 경우는 `--b` 플래그를 사용합니다.

```sh
yarn migrate --b
```

`migrate:undo`만을 실행한 경우 다음과 같은 일들이 발생합니다.

- db에는 `SequelizeMeta` 테이블만이 남게 된다.

  ```mysql
  mysql> show tables;
  +-------------------------------+
  | Tables_in_database_production |
  +-------------------------------+
  | SequelizeMeta                 |
  +-------------------------------+
  1 row in set (0.00 sec)
  ```

- `SequelizeMeta` 테이블은 빈 테이블로 남는다.
  ```mysql
  mysql> select * from SequelizeMeta;
  Empty set (0.00 sec)
  ```
- `/models`에 `migrate:undo`된 파일들이 포맷에 맞게 추가된다.
  ```sh
  $ ls
  daum.js
  firebase_auth.js
  firebase_userfeedlist.js
  naver.js
  index.js
  ```

`migrate:undo && migrate`를 사용하고 싶은 경우에는 플래그를 사용하지 않습니다.

```sh
yarn migrate
```

그저 테이블 스키마를 수정한 다음 db에 반영하고자 하는 경우 사용하면 됩니다. `migrate --b`를 실행한 다음 `migrate`를 실행하는 경우는 아래와 같은 일들이 발생합니다.

- db에는 `/migrations`에서 작성한 파일명을 가진 테이블이 생성된다.
  ```mysql
  mysql> show tables;
  +-------------------------------+
  | Tables_in_database_production |
  +-------------------------------+
  | SequelizeMeta                 |
  | daum                          |
  | daum_copy                     |
  | firebase_auth                 |
  | firebase_userfeedlist         |
  | naver                         |
  +-------------------------------+
  6 rows in set (0.00 sec)
  ```
- `SequelizeMeta` 테이블에는 `/migrations`에 있는 파일명이 남는다.
  ```mysql
  mysql> select * from SequelizeMeta;
  +--------------------------+
  | name                     |
  +--------------------------+
  | daum copy.js             |
  | daum.js                  |
  | firebase-auth.js         |
  | firebase-userfeedlist.js |
  | naver.js                 |
  +--------------------------+
  5 rows in set (0.00 sec)
  ```
- index.js를 제외한 `/models/`에 추가되었던 파일들이 삭제된다.
  ```sh
  $ ls
  index.js
  ```

이제는 `typeorm`에서처럼 테이블 스키마 관리포인트가 1군데로 줄었습니다.
