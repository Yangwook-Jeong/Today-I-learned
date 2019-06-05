---
layout: post
title: 데이터베이스 해킹당한 후키
author: Yangeok
categories: Database
comments: true
cover:
---

## 포트 변경하기

- mongodb 설정파일 포트 변경하기

  - 설정 파일 변경하기

  ```sh
  vim /etc/mongod.conf

  net:
  port: 27017 # 이 부분을 다른 포트로 수정해야 한다.
  bindIp: 0.0.0.0

  (...)

  auth = false # 이 부분을 true로 수정해야 한다.
  ```

  - mongo 쉘에 접속하기: `mongo --port <변경된 포트번호>`

- 인스턴스 내부 포트 설정하기
  - `netstat -tlnp`
- 프로젝트 내부 포트 설정 변경하기
  - `.env`
- PaaS 포트 변경하기

  - 환경변수

## 계정별 권한 생성하기

- 계정생성

  - admin 생성하기

  ```sh
  > use admin
  > db.createUser({
      user: "계정이름",
      pwd: "비밀번호",
      roles: [
          "userAdminAnyDatabase",
          "dbAdminAnyDatabase",
          "readWriteAnyDatabase"
          ]
  })
  ```

  - 관리자 권한을 갖는 사용자 생성하기

  - db에 접속해서 만들기

  ```sh
  > use test
  > db.createUser({
      user: "사용자 계정이름",
      pwd: "비밀번호",
      roles: [ "userAdmin", "readWrite" ]
  })
  ```

  - 아무데서나 만들기

  ```sh
  > db.createUser({
      user: "사용자 계정이름",
      pwd: "비밀번호",
      roles: [{
          role: "read",
          db: "test"
      }]
  })
  ```

- db별 권한 확인하기
  ```sh
  use test
  db.getRole()
  ```

* mongod 서버 재시작하기: `service mongod restart`
* 보안설정된 db에 접근하기:

  - `mongo <host:port> -u 계정이름 -p '비밀번호' --authenticationDatabase "유저db명"`
  - admin 권한 접속: `--authenticationDatabase`는 첫번쨰 방법으로 접근되지 않는 경우에 사용한다.
    - `mongo admin -u 계정이름 -p '비밀번호'`
    - `mongo admin -u 계정이름 -p '비밀번호' --authenticationDatabase admin`

* 서버에서 접근하기: `mongodb://사용자명:비밀번호@서버주소:포트번호/유저db이름`
