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
    - [데이터베이스 및 config 파일 세팅](#데이터베이스-및-config-파일-세팅)
    - [migration:create](#migrationcreate)
    - [migration:generate](#migrationgenerate)
    - [migration:run](#migrationrun)
    - [migration:revert](#migrationrevert)
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

sequelize로 orm을 입문했다. 그들의 폴더구조인 테이블 스키마가 있는 `models`, 마이그레이션 파일이 있는 `migrations`, 가짜 데이터가 있는 `seeders`로 구성되어 있었다. `migrations`는 `models`와 거의 일치하는 코드인데 함수나 클래스 안에 `up`, `down` 메서드가 있는 것 말고는 딱히 차이가 없어 보였다.

별 차이가 없음에도 `models`와 `migrations`에 같은 코드를 2번이나 쳐야 하는 것은 불필요한 행동이라고 생각하고 있었다. 아래는 sequelize 공식문서에 언급된 migration에 대한 정의이다.

> 소스 코드의 변화를 관리하기 위한 git같은 vcs처럼 데이터베이스의 변화를 감지해 migration을 사용해 기록할 수 있습니다. migration으로 데이터베이스로 다른 상태를 옮길 수 있고 반대로도 할 수 있습니다. 이런 상태이동은 새로운 상태를 어떻게 얻을 수 있는지, 어떻게 예전 상태로 되돌리기 위해 취소할 수 있는지를 기술한 migration 파일들에 저장됩니다.

그때는 몇 번을 읽어봐도 와닿지 않았다. 테이블 스키마를 직접 수정하면 바로 데이터베이스에 수정사항이 반영되는 것을 굳이 migration 기능을 사용할 필요까진 없다고 생각했다. 그것은 오산이었다. 실제 서비스가 돌고 있는 예시를 보니 납득이 갔다. 아래와 같은 sql로 테이블을 하나 만든다.

```sql
CREATE TABLE People (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  city varchar(255),
  PRIMARY KEY (id)
);

INSERT INTO People 
  (first_name, last_name, city) 
VALUES 
  ('John', 'Doe', 'Berlin'),
  ('Warwick', 'Hawkins', 'Dublin'),
  ('Kobi', 'Villarreal', 'Peking'),
  ('Winnie', 'Roach', 'Ulaanbaatar'),
  ('Peggy', 'Ngyen', 'Hanoi');
```

테이블에 select문을 던져주면 아래와 같은 결과가 나온다.

```
mysql> SELECT * FROM People;
+----+------------+------------+-------------+
| id | first_name | last_name  | city        |
+----+------------+------------+-------------+
|  1 | John       | Doe        | Berlin      |
|  2 | Warwick    | Hawkins    | Dublin      |
|  3 | Kobi       | Villarreal | Peking      |
|  4 | Winnie     | Roach      | Ulaanbaatar |
|  5 | Peggy      | Ngyen      | Hanoi       |
+----+------------+------------+-------------+
5 rows in set (0.00 sec)
```

여기서 `People.city`를 `country`로 변경하고 싶은 경우가 있을 것이다. 칼럼명을 바꾸되 바뀐 칼럼 안에 있는 데이터는 날아가면 절대 안된다. 그럼에도 테이블 스키마를 바로 수정하면 될 것 같다고 생각했다. orm에서 작성한 스키마를 데이터베이스에 동기화하는 방법으로 가장 쉬운 방법은 synchronize가 있다. 애플리케이션을 재시작할 때마다 기존 테이블에서 열을 추가, 삭제하는 동작을 할 수 있다. 

아래는 [sequelize](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-sync), [typeorm](https://orkhan.gitbook.io/typeorm/docs/connection-api#connection-api)에서 프로그램을 재실행하면 자동으로 데이터베이스에 동기화할 수 있도록 도와주는 메서드들의 사용방법이다.


```ts
// using sequelize
await db.sequelize.sync({ alter: true })

// using typeorm
import {createConnection, getConnection} from 'typeorm'
const connection = await createConnection(options)
await getConnection().synchronize()
```

테이블 스키마를 `People.city`에서 `country`로 수정하고 코드를 저장하면, 변경한 칼럼에 들어있는 데이터가 날아가버리고 만다. 각각 synchronize를 켠 상태에서는 다음과 같이 sql 쿼리문을 날리는 것 같다. 

```sql
ALTER TABLE People DROP COLUMN city;
ALTER TABLE People ADD country varchar(255);
```

하지만 migration을 사용하면 아래와 같이 쿼리문을 날린다.

```sql
ALTER TABLE People CHANGE COLUMN city country varchar(255);
```

synchronize는 최초에 데이터와 entity를 동기화할 때는 좋은 옵션이지만 프로덕션에는 안전하지 않다. 위같은 간단한 쿼리는 어느정도 개발하는 입장에서 예상이 가능하지만, association이 엮이는 경우에는 나같은 초보개발자는 synchronize를 해서 오는 사이드이펙트를 가늠하지 못할 것이다. 라이브 환경에서 데이터가 날아가는 일은 끔찍하다. 라이브 환경에서라면 데이터베이스를 안정적으로 관리하기 위한 도구인 migration을 적극 사용하는 것을 orm 공식문서에서 하나같이 권장한다. 

### 사용법

#### 데이터베이스 및 config 파일 세팅

- ormconfig.json 혹은 env 파일 + ormconfig.ts 작성하는 방법

여기서는 다중 환경을 사용하지 않는다는 가정 하에 typeorm에서 기본적으로 제공해주는 `ormconfig.json` 파일을 사용할 예정이다. `--name` 플래그는 새로 만들 프로젝트 이름을, `--database`는 데이터베이스 이름을 적어준다.

```sh
npx typeorm init --name test-project --database test-database mysql
```

새로운 프로젝트 폴더가 만들어질 것이다. 진입해서 의존성 모듈들을 설치한다.

```sh
cd test-project && yarn
```

아래와 같이 `ormconfig.json`를 수정한다.

```json
"username": "root",
"password": "root",
"database": "test-database",
"synchronize": false
"logging": true
```

아래와 같이 `package.json`에서 `scripts`에 아래 스크립트를 추가한다.

```json
"typeorm": "ts-node ./node_modules/typeorm/cli -f ./ormconfig.json"
```

이제 docker 컨테이너로 mysql 컨테이너를 띄워야 한다. 아래와 같은 내용으로 `docker-compose.yml`을 루트에 만든다.

```yml
version: '3.8'
services:
  mysql:
    image: mysql:5.7
    volumes:
      - ./initdb:/docker-entrypoint-initdb.d/
    command:
      - --default-authentication-plugin=mysql_native_password
      - --character-set-server=utf8mb4
      - --collation-server=utf8mb4_unicode_ci
    restart: always
    ports:
      - 3306:3306
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: test-database
      MYSQL_USER: root
      MYSQL_PASSWORD: root
```

아직 끝나지 않았다. 데이터베이스를 초기화하는 작업을 하려면 컨테이너 내의 `docker-entrypoint-initdb.d`에 `.sql` 파일을 집어넣어줘야 한다. 아래와 같이 파일을 만든다.

```sh
mkdir initdb && touch initdb/init.sql
```

파일에는 다음과 같이 쿼리문을 작성한다.

```sql
SET NAMES utf8;

CREATE DATABASE IF NOT EXISTS `test-database`;
SET character_set_client = utf8mb4;

USE `test-database`;

ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'test';
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'test';
SELECT plugin FROM mysql.user WHERE User = 'root';
FLUSH PRIVILEGES;
```

이제 컨테이너를 실행하면 데이터베이스 세팅은 끝난다.

```sh
docker-compose up
```

#### migration:create

```sh
yarn typeorm migration:create -n test-migration-create
```

- `-n` 플래그는 migration 파일의 이름을 정해준다.

빈 껍데기인 migration 파일을 만들때 사용한다. 스크립트를 실행하면 `ormconfig.json`에서 `cli.migrationsDir`에 정의한 경로에 `timestamp-test-migration-create.ts`와 같이 timestamp를 포함한 파일명으로 `up`, `down` 메서드에 구현부는 비어있는 파일이 아래처럼 생성된다.

```ts
import {MigrationInterface, QueryRunner} from 'typeorm'

export class test-migration-create1605840315914 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {}
  async down(queryRunner: QueryRunner): Promise<void> {}
}
```

메서드 `up`은 migration을 실행하기 위해 필요한 코드를 적어야 한다. `down`은 지난 migration을 할 때 사용했던 `up`에서 변경된 것들을 되돌리기 위해 사용해야 한다. 위에서 언급했던 `People.city`를 `country`로 바꾸려면 아래와 같이 작성할 수 있다.

```ts
import {MigrationInterface, QueryRunner} from 'typeorm';

export class test-migration-create1605840315914 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE People CHANGE COLUMN city country varchar(255)`)
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE People CHANGE COLUMN country city varchar(255)`)
  }
}
```

다시 한 번 말하자면 `migration:create`은 빈 껍데기만 만들어주기 때문에 구현부는 직접 작성해야 한다. 

#### migration:generate

`ormconfig.json`에서 정의한 `entities`에 있는 경로에 있는 스키마의 변경사항들을 감지해서 migration 파일을 생성해주는 기능을 한다. 단, 변경사항이 있어야지만 동작하고 새로운 migration 파일을 만들어준다.

아래와 같이 `People.ts`를 정의한다.

```ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class People {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ length: 255, nullable: false })
  first_name: string
  
  @Column({ length: 255, nullable: false })
  last_name: string
  
  @Column({ length: 255 })
  city: string
}
```

위와 같은 스키마가 데이터베이스에 이미 동기화 되어있는채로 아래와 같은 명령을 날리면 아무런 변화가 없다고 로그가 찍힌다. 수정을 했는데도 불구하고 아래 로그가 찍힌다면 config 파일을 제대로 연결하지 않았을 경우에 발생하기도 하니 확인해보는 것이 좋다.

```sh
yarn typeorm migration:generate -n test-migration-generate
```

> No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command

자, 그럼 스키마를 수정해보자. `People.city`를 `country`로 아래와 같이 변경한다.

```ts
// before
@Column({ length: 255 })
city: string

// after
@Column({ length: 255 })
country: string
```

다시 아래처럼 `migration:generate` 스크립트를 날려주면 `timestamp-test-migration-generate.ts` 파일이 생성된 것을 확인할 수 있다.

```sh
yarn typeorm migration:generate -n test-migration-generate
```

만들어진 migration 파일을 열어보면 아래와 같이 쿼리가 자동으로 입력되어있는 것을 확인할 수 있다.

```ts
import {MigrationInterface, QueryRunner} from 'typeorm';

export class test-migration-generate1605840315915 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE People CHANGE city country varchar(255);`)
  }
  async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`ALTER TABLE People CHANGE country city varchar(255);`)
  }
}
```

#### migration:run

`migration:run`은 모든 migration파일들을 데이터베이스에 한꺼번에 반영한다. 

```sh
yarn typeorm migration:run
```

그와 동시에 `migrations` 테이블에 커밋로그처럼 파일명이 쌓이게 된다. `migration:create`와 `migration:generate`를 해서 migration 파일이 2개라서 아래처럼 `migrations` 테이블에 기록된다.

```sql
mysql> SELECT * FROM migrations;
+----+---------------+-------------------------------------+
| id | timestamp     | name                                |
+----+---------------+-------------------------------------+
| 1 | 1605840315914 | test-migration-create1605840315914   |
| 2 | 1605840315915 | test-migration-generate1605840315915 |
+----+---------------+-------------------------------------+
2 row in set (0.00 sec)
```

다시 한 번 강조하자면 `migration:run`은 모든 migration파일들의 `up` 메서드를 실행한다. `up` 메서드의 구현부가 중복된 내용이라도 그냥 실행한다.

#### migration:revert

`migration:run`을 통해 동기화한 내용들을 하나씩 걷어내는 역할을 한다. 가장 마지막에 쌓인 migration부터 스택처럼 `down` 메서드를 실행한다. 아직까지는 `migration:revert:all`같은 솔루션은 없다.

```sh
yarn typeorm migration:revert
```
### TypeORM vs. Sequelize

sequelize에서 제공하는 migration은 아쉽게도 typeorm에서 제공하는 `entities`의 변화를 자동감지해서 migration하는 기능은 가지고 있지 않다. sequelize의 `migration:generate` 커맨드는 typeorm의 `migration:create`와 같다. 

`entities`의 변경사항을 서버를 실행하지 않고 cli로만 synchronize시키는 `schema:sync`도 제공한다. 다만 조심해서 사용해야 한다.

반대로 typeorm에서는 되지 않는 `migration:revert:all`을 sequelize에서는 `db:migrate:undo:all`을 사용해서 모든 migration 파일들의 `down` 메서드를 실행할 수 있다. 

sequelize는 seeding을 cli에서 지원해줘서 정해진 인터페이스에 맞는 데이터들만 `up`, `down` 메서드에 아래와 같이 집어넣어주면 손쉽게 사용할 수 있다.

```ts
import People from 'src/seeders/People'

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('People', People)
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {})
  }
}
```

반면에 typeorm을 사용할때 seeding을 하려면 아래처럼 직접구현해야 하는 불편함이 있다.

```ts
export default async function seedPeople(numFake = 10) {
  const entities = await Promise.all([Array(numFake).fill(0).map(fakeUser)])
  
  await People.insert(entities)
}
```

typeorm의 장점은 다음과 같다.

- 테이블 스키마가 바뀐만큼 migration 파일로 만들 수 있다.
- 서버 실행 없이 cli만으로 테이블 스키마의 변화를 synchronize할 수 있다.

sequelize의 장점은 다음과 같다.

- `migration:undo:all`을 실행할 수 있어 migration을 모두 되돌릴 때 편하다.
- seeding을 cli에서 지원해서 간편하게 up, down할 수 있다.

### 타언어 ORM과 비교

### Doctrine (PHP)

- 테이블 스키마의 변화를 자동감지해서 migration 파일 생성하는 기능을 제공한다.
- sequelize의 umzug처럼 migration hook이 있어서 cli용 플러그인을 만들기 용이하다. 

#### Active record (Ruby)

- ror의 그 active record가 맞다.
- 테이블 스키마의 변화를 자동감지해서 [migration 파일](https://github.com/aviflombaum/activerecord-cli-example/blob/master/db/schema.rb) 생성하는 기능을 제공한다.
- timestamp를 `YYYYMMDDHHMMS` 포맷으로 찍어 파일명에 표기한다. (예: `20201120120000_test-migration-create.rb`)

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