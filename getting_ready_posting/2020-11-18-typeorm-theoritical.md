---
layout: post
title: TypeORM 마이그레이션과 코딩패턴
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover:
---

## 목차
- [목차](#목차)
- [마이그레이션](#마이그레이션)
  - [정의](#정의)
  - [사용법](#사용법)
    - [config파일에서 path 설정](#config파일에서-path-설정)
    - [migrate:create](#migratecreate)
    - [migrate:generate](#migrategenerate)
    - [migrate:run](#migraterun)
    - [migrate:revert](#migraterevert)
  - [TypeORM vs. Sequelize](#typeorm-vs-sequelize)
  - [타언어 ORM과 비교](#타언어-orm과-비교)
    - [Doctrine (PHP)](#doctrine-php)
    - [Active record (Ruby)](#active-record-ruby)
- [N+1 문제](#n1-문제)
  - [정의](#정의-1)
    - [Eager loading](#eager-loading)
    - [Lazy loading](#lazy-loading)
  - [해결방법](#해결방법)
  - [TypeORM vs. Sequelize](#typeorm-vs-sequelize-1)
  - [타언어 ORM과 비교](#타언어-orm과-비교-1)
    - [Cakeorm (PHP)](#cakeorm-php)
    - [JPA (Java)](#jpa-java)
    - [ROR (Ruby)](#ror-ruby)

## 마이그레이션

### 정의

- orm 입문기부터 migration 중요하지 않게 생각한 이유 
- migration을 사용해야 하는 이유 
- synchronize만 사용하면 오는 단점들

sequelize로 orm을 입문했다. 그래서인지 그들의 폴더구조인 models, migrations, seeders에 익숙하다. models는 테이블 스키마를, seeders는 생성한 테이블에 집어넣을 가짜 데이터를 작성하는 폴더이다. migrations는 models와 거의 일치하는 코드인데 함수나 클래스 안에 `up`, `down` 메서드가 있는 것 말고는 딱히 차이가 없어보였다.

별 차이가 없음에도 models와 migrations에 같은 코드를 2번이나 쳐야하는 것은 불필요한 행동이라고 생각하고 있었다. 

(sequelize 공식문서)

위처럼 공식문서에 적혀있는 것을 읽어봤다. 와닿지 않았다. 테이블 스키마를 직접 수정하면 바로 db에 수정사항이 반영되는 것을 굳이 migration 기능을 사용할 필요까진 없다고 생각했다. 

그것은 오산이었다. 실제 서비스가 돌고 있는 예시를 보니 납득이 갔다. 

(user 테이블에 있는 데이터는 유지한채로 칼럼명만 변경하고 싶은 경우)

테이블 스키마를 바로 수정하면 될 것 같다고 생각했다. 테이블 스키마를 수정하면 변경한 칼럼에 들어있는 데이터가 날아가버리고 만다. sql 쿼리문을 다음과 같이 날리는 것 같다.

(alter table drop column문)

하지만 migration을 사용하면 아래와 같이 쿼리문을 날리는 것을 확인할 수 있다.

(alter table change column문)

라이브 환경에서 데이터베이스를 안정적으로 관리하기 위한 도구이다. orm에서 작성한 스키마를 데이터베이스에 동기화하는 방법으로 가장 쉬운 방법은 synchronize가 있다. 애플리케이션을 재시작할 때마다 기존 테이블에서 열을 추가, 삭제하는 동작을 할 수 있다.

synchronize는 최초에 데이터와 entity를 동기화할 때는 좋은 옵션이지만 프로덕션에는 안전하지 않다. 프로덕션에서 안전하게 데이터를 동기화하기 위한 좋은 대체 솔루션이 될 수 있다.

### 사용법

#### config파일에서 path 설정

- ormconfig.json 혹은 env 파일 + ormconfig.ts 작성하는 방법

아래와 같이 `package.json`에 스크립트를 추가한다.

```json
"typeorm": "ts-node ./node_modules/typeorm/cli -f ./ormconfig.json"
```

#### migrate:create

- 빈 껍데기인 migration 파일을 만들때 사용

`-n` 플래그는 migration 파일의 이름을 정해준다.

아래와 같이 스크립트를 날리면 원하는 이름으로 migration 파일을 만들어준다.

```sh
yarn typeorm migration:create -n <migration-name>
```

#### migrate:generate

- entity의 변화를 자동감지해서 sql쿼리문이 들어있는 migration을 만들어주는 것 설명

아래와 같이 스크립트를 날려주면 entity 파일에서 수정한 만큼의 쿼리를 sql로 만들어준다.

스크립트를 실행하면 아래와 같이 로그가 찍히는 경우가 있다. 이런 경우에는 npm script의 `typeorm`에 연결된 config 파일을 제대로 작성했나 확인해보면 해결할 수 있다. `.ts`로는 안되는 경우 객체를 정적으로 담은 `ormconfig.json`을 연결해보면 정상적으로 `migrate:generate`가 되는 것을 확인할 수 있다.

> No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command

```sh
yarn typeorm migration:generate -n <migration-name>
```

마이그레이션 파일이 만들어졌으면 실행할 차례다.

#### migrate:run

- 모든 migration파일들을 데이터베이스에 반영하는 것 
- migrations 테이블에 커밋로그처럼 파일명이 쌓이는 것

```sh
yarn typeorm migration:run
```

#### migrate:revert

- 시간순서대로 쌓인 migration을 가장 마지막에 쌓인 것부터 스택처럼 하나씩 걷어내는 역할 하는 것

반대로 마이그레이션을 되돌릴 수도 있다.

```sh
yarn typeorm migration:revert
```


### TypeORM vs. Sequelize

- typeorm에서 제공하는 models의 변화를 자동감지하는 기능이 빠진 점에 대한 아쉬움 
- 대신 cli의 코어인 umzug으로 커스텀이 가능한 장점은 있음

(umzug 간단 소개)

### 타언어 ORM과 비교

#### Doctrine (PHP)

- entity의 변화를 자동감지해서 migration 파일 생성해줌 
- umzug처럼 migration hook이 있어서 확장성이 좋음 

#### Active record (Ruby)

[docs](https://guides.rubyonrails.org/active_record_migrations.html)

[example](https://github.com/aviflombaum/activerecord-cli-example/blob/master/db/schema.rb)

- 그 active record 맞음 
- models의 변화를 자동감지해서 migration 파일 생성해줌

## N+1 문제

### 정의

- orm 사용 중 성능 문제가 생긴다면 이것일 가능성 높음 
- raw sql에서 반복문이 돌아 query를 n+1번 날리는 것 예시

간단히 말해서 orm단에서 알아서 lazy loading을 사용해서 자식 객체에 접근할때마다 query를 날려서 생기는 문제임!


orm을 사용할 떄 성능 문제가 있다면 들여다봐야 한다.

sequelize에서는 eager/lazy loading 관련 튜닝을 따로 해줘야하는 것 같다. typeorm에서는 eager/lazy relations라는 이름으로 기능을 실험적으로만 지원하고 있다. lazy loading을 사용하면 n+1 문제를 해결할 수 있다고 한다.

lazy loading을 sql의 join문으로도 구현할 수 있다. join문은 다음과 같이 사용할 수 있다.

```sql
SELECT fields
FROM table1_name t1
JOIN table2_name t2 
ON t1.id = t2.id;
```

typeorm도 마찬가지로 eager loading이 기본값이다. 


참고로 그냥 join은 inner join의 alias이다. 

#### Eager loading

Eager loading uses joins (where possible) to fetch data from the database in as few queries as possible.

#### Lazy loading

While this can save CPU time because possibly unused data is not hydrated into objects, it can result in many more queries being emitted to the database.

이미지 로딩에서 처음 사용한 개념인줄 알았는데, orm에서 사용하는 것을 차용했나보다. 

- eager loading: 데이터 초기화가 현장에서 일어나는 패턴이다.
  - 초기 로딩 시간이 보다 길다.
  - 불필요한 데이터를 너무 많이 로드하면 성능이 영향을 끼칠 수도 있다.
- lazy loading: 가능한 한 객체의 초기화를 지연시키는데 사용하는 패턴이다.
  - 초기 로딩 시간이 보다 짧다.
  - 메모리 소비가 적다.
  - 지연된 초기화는 원치않는 순간에 성능에 영향을 줄 수도 있다.
  - 경우에 따라 특별히 초기화된 지연 초기화 객체를 처리해야하거나 예외가 발생할 수 있다.

### 해결방법

- raw sql에서 join 사용하는 방법 
- orm문에서 include/with/promise 사용하는 방법

### TypeORM vs. Sequelize

- typeorm에서는 가능은 하지만 권장하지 않는 실험기능이라고 한다.
- sequelize에서는 eager/lazy loading 관련 튜닝을 직접 해줘야 함

### 타언어 ORM과 비교

#### Cakeorm (PHP)
#### JPA (Java)

여담으로 jpa에는 n+1 자동 감지 도구인 db-util이 있다.

#### ROR (Ruby)