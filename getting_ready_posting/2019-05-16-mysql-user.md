---
layout: post
title: MySQL 계정 생성하기
author: Yangeok
categories: Database
comments: true
cover:
---

## mysql 기본 계정 종류 확인

```
mysql> use mysql
Database changed
mysql> select user, host from user;
+------------------+-----------+
| user             | host      |
+------------------+-----------+
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
+------------------+-----------+
```

## 랜섬웨어 공격후 계정 생성 오류

`Operation CREATE USER failed for 'username'@'host';` 메시지가 뜰 경우 계정 생성 및 권한 부여를 db상에서가 아닌 파일상에서 직접 했기때문에 발생한다. `delete`쿼리를 사용해서 유저를 삭제한 후에 `flush privileges;`를 하고 나서 유저 생성을 하면 오류가 나타나지 않는다.

### 참조

- [ERROR 1396 (HY000): Operation CREATE USER failed for](https://hsunnystory.tistory.com/75)
