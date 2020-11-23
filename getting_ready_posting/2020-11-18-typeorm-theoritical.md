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
  - [정의 & 해결방법](#정의--해결방법)
    - [Eager loading](#eager-loading)
    - [Lazy loading](#lazy-loading)
  - [TypeORM vs. Sequelize](#typeorm-vs-sequelize-1)
  - [타언어 ORM과 비교](#타언어-orm과-비교-1)
    - [CakeORM (PHP)](#cakeorm-php)
    - [JPA (Java)](#jpa-java)
    - [Active Record (Ruby)](#active-record-ruby-1)

<br>

---

<br>

## 마이그레이션

### 정의

저는 [sequelize](https://sequelize.org/)로 ORM<sup>Object Relational Mapping</sup>을 입문했습니다. 이들의 폴더구조인 테이블 스키마가 있는 `models`, 마이그레이션 파일이 있는 `migrations`, 가짜 데이터가 있는 `seeders`로 구성되어 있었습니다. `migrations`는 `models`와 거의 일치하는 코드인데 함수나 클래스 안에 `up`, `down` 메서드가 있는 것 말고는 딱히 차이가 없어 보였습니다.

별 차이가 없음에도 `models`와 `migrations`에 같은 코드를 2번이나 쳐야 하는 것은 불필요한 행동이라고 생각하고 있었습니다. 아래는 sequelize 공식문서에 언급된 [migration](https://sequelize.org/master/manual/migrations.html)에 대한 정의입니다.

> 소스 코드의 변화를 관리하기 위한 git같은 VCS<sup>Version Control System</sup>처럼 데이터베이스의 변화를 감지해 migration을 사용해 기록할 수 있습니다. migration으로 데이터베이스로 다른 상태를 옮길 수 있고 반대로도 할 수 있습니다. 이런 상태이동은 새로운 상태를 어떻게 얻을 수 있는지, 어떻게 예전 상태로 되돌리기 위해 취소할 수 있는지를 기술한 migration 파일들에 저장됩니다.

처음 migration을 접했을 때는 몇 번을 읽어봐도 와닿지 않았습니다. 테이블 스키마를 직접 수정하면 바로 데이터베이스에 수정사항이 반영되는 것을 굳이 migration 기능을 사용할 필요까진 없다고 생각했습니다. 하지만 그것은 오산이었습니다. 실제 서비스가 돌고 있는 예시를 보니 납득이 갔습니다. 아래와 같은 SQL<sup>Structured Query Language</sup>문으로 테이블을 하나 만듭니다.

```sql
CREATE TABLE People (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  PRIMARY KEY (id)
);

INSERT INTO People 
  (first_name, last_name, city) 
VALUES 
  ('John', 'Doe', 'Berlin'),
  ('Warwick', 'Hawkins', 'Dublin'),
  ('Kobi', 'Villarreal', 'Peking'),
  ('Winnie', 'Roach', 'Ulaanbaatar'),
  ('Peggy', 'Nguyen', 'Hanoi');
```

테이블에 select 쿼리를 던져주면 아래와 같은 결과가 나옵니다.

```
mysql> SELECT * FROM People;
+----+------------+------------+-------------+
| id | first_name | last_name  | city        |
+----+------------+------------+-------------+
|  1 | John       | Doe        | Berlin      |
|  2 | Warwick    | Hawkins    | Dublin      |
|  3 | Kobi       | Villarreal | Peking      |
|  4 | Winnie     | Roach      | Ulaanbaatar |
|  5 | Peggy      | Nguyen     | Hanoi       |
+----+------------+------------+-------------+
5 rows in set (0.00 sec)
```

여기서 `People.city`를 `country`로 변경하고 싶은 경우가 있을 것입니다. 칼럼명을 바꾸되 바뀐 칼럼 안에 있는 데이터는 날아가면 절대 안됩니다. 그럼에도 저는 테이블 스키마를 바로 수정하면 될 것 같다고 생각했습니다. ORM에서 작성한 스키마를 데이터베이스에 동기화하는 방법으로 가장 쉬운 방법은 synchronize가 있습니다. 애플리케이션을 재시작할 때마다 기존 테이블에서 열을 추가, 삭제하는 동작을 할 수 있습니다. 

아래는 [sequelize](https://sequelize.org/master/class/lib/sequelize.js~Sequelize.html#instance-method-sync), [typeorm](https://orkhan.gitbook.io/typeorm/docs/connection-api#connection-api)에서 프로그램을 재실행하면 자동으로 데이터베이스에 동기화할 수 있도록 도와주는 메서드들의 사용방법입니다.

```ts
// using sequelize
await db.sequelize.sync({ alter: true })

// using typeorm
import {createConnection, getConnection} from 'typeorm'
const connection = await createConnection(options)
await getConnection().synchronize()
```

테이블 스키마를 `People.city`에서 `country`로 수정하고 코드를 저장하면, 변경한 칼럼에 들어있는 데이터가 날아가버리고 맙니다. 각각 synchronize를 켠 상태에서는 다음과 같이 SQL 쿼리문을 날리는 것 같습니다. 

```sql
ALTER TABLE People DROP COLUMN city;
ALTER TABLE People ADD country VARCHAR(255);
```

```sql
mysql> SELECT * FROM People;
+----+------------+------------+---------+
| id | first_name | last_name  | country |
+----+------------+------------+---------+
|  1 | John       | Doe        | NULL    |
|  2 | Warwick    | Hawkins    | NULL    |
|  3 | Kobi       | Villarreal | NULL    |
|  4 | Winnie     | Roach      | NULL    |
|  5 | Peggy      | Nguyen     | NULL    |
+----+------------+------------+---------+
5 rows in set (0.00 sec)
```

하지만 migration을 사용하면 아래와 같이 쿼리문을 날립니다.

```sql
ALTER TABLE People CHANGE COLUMN city country VARCHAR(255);
```

```sql
mysql> SELECT * FROM People;
+----+------------+------------+-------------+
| id | first_name | last_name  | country     |
+----+------------+------------+-------------+
|  1 | John       | Doe        | Berlin      |
|  2 | Warwick    | Hawkins    | Dublin      |
|  3 | Kobi       | Villarreal | Peking      |
|  4 | Winnie     | Roach      | Ulaanbaatar |
|  5 | Peggy      | Nguyen     | Hanoi       |
+----+------------+------------+-------------+
5 rows in set (0.01 sec)
```

synchronize는 최초에 데이터와 테이블 스키마를 동기화할 때는 좋은 옵션이지만 프로덕션에는 안전하지 않습니다. 위같은 간단한 쿼리는 어느정도 개발하는 입장에서 예상이 가능하지만, association이 엮이는 경우에는 나같은 초보개발자는 synchronize를 해서 오는 사이드이펙트를 가늠하지 못할 것입니다. 라이브 환경에서 데이터가 날아가는 일은 끔찍합니다. 라이브 환경에서라면 데이터베이스를 안정적으로 관리하기 위한 도구인 migration을 적극 사용하는 것을 ORM 공식문서에서 하나같이 권장합니다. 

<br>

---

<br>

### 사용법

#### 데이터베이스 및 config 파일 세팅

여기서는 다중 환경을 사용하지 않는다는 가정 하에 typeorm에서 기본적으로 제공해주는 `ormconfig.json` 파일을 사용할 예정입니다. `--name` 플래그는 새로 만들 프로젝트 이름을, `--database`는 데이터베이스 이름을 적어줍니다.

```sh
npx typeorm init --name test-project --database test-database mysql
```

새로운 프로젝트 폴더가 만들어질 것입니다. 진입해서 의존성 모듈들을 설치합니다.

```sh
cd test-project && yarn
```

아래와 같이 `ormconfig.json`를 수정합니다.

```json
"username": "root",
"password": "root",
"database": "test-database",
"synchronize": false
"logging": true
```

아래와 같이 `package.json`에서 `scripts`에 아래 스크립트를 추가합니다.

```json
"typeorm": "ts-node ./node_modules/typeorm/cli -f ./ormconfig.json"
```

이제 docker 컨테이너로 mysql 컨테이너를 띄워야 합니다. 아래와 같은 내용으로 `docker-compose.yml`을 루트에 만듭니다.

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

아직 끝나지 않았습니다. 데이터베이스를 초기화하는 작업을 하려면 컨테이너 내의 `docker-entrypoint-initdb.d`에 `.sql` 파일을 집어넣어줘야 합니다. 아래와 같이 파일을 만듭니다.

```sh
mkdir initdb && touch initdb/init.sql
```

파일에는 다음과 같이 쿼리문을 작성합니다.

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

이제 컨테이너를 실행하면 데이터베이스 세팅은 끝납니다.

```sh
docker-compose up
```

<br>

---

<br>

#### migration:create

```sh
yarn typeorm migration:create -n test-migration-create
```

참고로 `-n` 플래그는 migration 파일의 이름을 정해줍니다. 

빈 껍데기인 migration 파일을 만들때 사용합니다. 스크립트를 실행하면 `ormconfig.json`에서 `cli.migrationsDir`에 정의한 경로에 `timestamp-test-migration-create.ts`와 같이 timestamp를 포함한 파일명으로 `up`, `down` 메서드에 구현부는 비어있는 파일이 아래처럼 생성됩니다.

```ts
import {MigrationInterface, QueryRunner} from 'typeorm'

export class test-migration-create1605840315914 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {}
  async down(queryRunner: QueryRunner): Promise<void> {}
}
```

메서드 `up`은 migration을 실행하기 위해 필요한 코드를 적어야 합니다. `down`은 지난 migration을 할 때 사용했던 `up`에서 변경된 것들을 되돌리기 위해 사용해야 합니다. 위에서 언급했던 `People.city`를 `country`로 바꾸려면 아래와 같이 작성할 수 있습니다.

```ts
import {MigrationInterface, QueryRunner} from 'typeorm'

export class test-migration-create1605840315914 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE People CHANGE COLUMN city country varchar(255)`)
  }
  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE People CHANGE COLUMN country city varchar(255)`)
  }
}
```

다시 한 번 말하자면 `migration:create`은 빈 껍데기만 만들어주기 때문에 구현부는 직접 작성해야 합니다. 

#### migration:generate

`ormconfig.json`에서 정의한 `entities`에 있는 경로에 있는 스키마의 변경사항들을 감지해서 migration 파일을 생성해주는 기능을 합니다. 단, 변경사항이 있어야지만 동작하고 새로운 migration 파일을 만들어줍니다.

아래와 같이 `People.ts`를 정의합니다.

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

위와 같은 스키마가 데이터베이스에 이미 동기화 되어있는채로 아래와 같은 명령을 날리면 아무런 변화가 없다고 로그가 찍힙니다. 수정을 했는데도 불구하고 아래 로그가 찍힌다면 config 파일을 제대로 연결하지 않았을 경우에 발생하기도 하니 확인해보는 것이 좋습니다.

```sh
yarn typeorm migration:generate -n test-migration-generate
```

> No changes in database schema were found - cannot generate a migration. To create a new empty migration use "typeorm migration:create" command

자, 그럼 스키마를 수정해볼까요? `People.city`를 `country`로 아래와 같이 변경합니다.

```ts
// before
@Column({ length: 255 })
city: string

// after
@Column({ length: 255 })
country: string
```

다시 아래처럼 `migration:generate` 스크립트를 날려주면 `timestamp-test-migration-generate.ts` 파일이 생성된 것을 확인할 수 있습니다.

```sh
yarn typeorm migration:generate -n test-migration-generate
```

만들어진 migration 파일을 열어보면 아래와 같이 쿼리가 자동으로 입력되어있는 것을 확인할 수 있습니다.

```ts
import {MigrationInterface, QueryRunner} from 'typeorm'

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

`migration:run`은 모든 migration파일들을 데이터베이스에 한꺼번에 반영합니다. 

```sh
yarn typeorm migration:run
```

그와 동시에 `migrations` 테이블에 커밋로그처럼 파일명이 쌓이게 됩니다. `migration:create`와 `migration:generate`를 해서 migration 파일이 2개라서 아래처럼 `migrations` 테이블에 기록됩니다.

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

다시 한 번 강조하자면 `migration:run`은 모든 migration파일들의 `up` 메서드를 실행합니다. `up` 메서드의 구현부가 중복된 내용이라도 그냥 실행합니다.

#### migration:revert

`migration:run`을 통해 동기화한 내용들을 하나씩 걷어내는 역할을 합니다. 가장 마지막에 쌓인 migration부터 스택처럼 `down` 메서드를 실행합니다. 아직까지는 `migration:revert:all`같은 솔루션은 없습니다. 


```sh
yarn typeorm migration:revert
```

`migration:revert`를 한 번 실행하면 마지막 열이 하나 떨어져 나가서, 열이 하나만 남는 것을 확인할 수 있습니다.

```sql
mysql> SELECT * FROM migrations;
+----+---------------+-------------------------------------+
| id | timestamp     | name                                |
+----+---------------+-------------------------------------+
| 1 | 1605840315914 | test-migration-create1605840315914   |
+----+---------------+-------------------------------------+
1 row in set (0.00 sec)
```

### TypeORM vs. Sequelize

sequelize에서 제공하는 migration은 아쉽게도 typeorm에서 제공하는 `entities`의 변화를 자동감지해서 migration하는 기능은 가지고 있지 않습니다. sequelize의 `migration:generate` 커맨드는 typeorm의 `migration:create`와 같다. typeorm에서는 `entities`의 변경사항을 서버를 실행하지 않고 cli로만 synchronize시키는 `schema:sync`도 제공합니다. 다만 조심해서 사용해야 합니다.

반대로 typeorm에서는 되지 않는 `migration:revert:all`을 sequelize에서는 `db:migrate:undo:all`을 사용해서 모든 migration 파일들의 `down` 메서드를 실행할 수 있습니다. 

sequelize는 seeding을 cli에서 지원해줘서 정해진 인터페이스에 맞는 데이터들만 `up`, `down` 메서드에 아래와 같이 집어넣어주면 손쉽게 사용할 수 있습니다.

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

반면에 typeorm을 사용할때 seeding을 하려면 커넥션을 직접 연 다음 아래처럼 구현해야 하는 불편함이 있습니다.

```ts
export default async function seedPeople(numFake = 10) {
  const entities = await Promise.all([Array(numFake).fill(0).map(fakeUser)])
  
  await People.insert(entities)
}
```

typeorm의 장점은 다음과 같습니다.

- 테이블 스키마가 바뀐만큼 migration 파일로 만들 수 있다.
- 서버 실행 없이 cli만으로 테이블 스키마의 변화를 synchronize할 수 있다.

sequelize의 장점은 다음과 같습니다.

- `migration:undo:all`을 실행할 수 있어 migration을 모두 되돌릴 때 편하다.
- seeding을 cli에서 지원해서 간편하게 up, down할 수 있다.

<br>

---

<br>

### 타언어 ORM과 비교

#### Doctrine (PHP)

php의 doctrine은 다음과 같은 특징을 가지고 있습니다.

- 테이블 스키마의 변화를 자동감지해서 migration 파일 생성하는 기능을 제공한다.
- sequelize의 umzug처럼 migration hook이 있어서 cli용 플러그인을 만들기 용이하다. 

#### Active record (Ruby)

ruby의 active record은 다음과 같은 특징을 가지고 있습니다.

- ror의 그 active record가 맞다.
- 테이블 스키마의 변화를 자동감지해서 [migration 파일](https://github.com/aviflombaum/activerecord-cli-example/blob/master/db/schema.rb) 생성하는 기능을 제공한다.
- timestamp를 ISO<sup>International Organization for Standardization</sup> 포맷인 `YYYYMMDDHHMMS`로 찍어 파일명에 표기한다. (예: `20201120120000_test-migration-create.rb`)

<br>

---

<br>

## N+1 문제

### 정의 & 해결방법

위에서 만들었던 테이블인 `People`을 조금 수정하고 `Companies` 테이블을 아래 쿼리로 새로 만들어봅시다. `Companies`와 `People`은 1:M 관계입니다.

```sql
CREATE TABLE Companies (
  id INT NOT NULL AUTO_INCREMENT,
  department VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE People ( 
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  company_id INT, 
  INDEX comp_idx (company_id), 
  FOREIGN KEY (company_id) REFERENCES Companies(id) ON DELETE CASCADE,
  PRIMARY KEY (id)
);
```

아래와 같이 sql로 `Companies`와 `People`에 데이터를 집어넣어줍니다.

```sql
INSERT INTO Companies
  (department)
VALUES
  ('finance'),
  ('marketing'),
  ('development'),
  ('design'),
  ('planning');

INSERT INTO People 
  (first_name, last_name, city, company_id) 
VALUES 
  ('John', 'Doe', 'Berlin', 1),
  ('Warwick', 'Hawkins', 'Dublin', 1),
  ('Kobi', 'Villarreal', 'Peking', 2),
  ('Winnie', 'Roach', 'Ulaanbaatar', 3),
  ('Peggy', 'Nguyen', 'Hanoi', 5);
```

테이블에 select문을 던져주면 아래와 같은 결과가 나옵니다.

```sql
mysql> SELECT * FROM Companies;
+----+-------------+
| id | department  |
+----+-------------+
|  1 | finance     |
|  2 | marketing   |
|  3 | development |
|  4 | design      |
|  5 | planning    |
+----+-------------+
5 rows in set (0.00 sec)

mysql> SELECT * FROM People;
+----+------------+------------+-------------+------------+
| id | first_name | last_name  | city        | company_id |
+----+------------+------------+-------------+------------+
|  1 | John       | Doe        | Berlin      |          1 |
|  2 | Warwick    | Hawkins    | Dublin      |          1 |
|  3 | Kobi       | Villarreal | Peking      |          2 |
|  4 | Winnie     | Roach      | Ulaanbaatar |          3 |
|  5 | Peggy      | Nguyen      | Hanoi       |          5 |
+----+------------+------------+-------------+------------+
5 rows in set (0.00 sec)
```

서론이 너무 길었다. 본론으로 넘어가서 N+1 문제는 ORM 사용 중 성능 문제가 생긴다면 이것 때문일 가능성이 높습니다. 이런 쿼리가 있다고 가정해볼까요? `People`을 가지고 부모인 `Companies.department`를 알아내려고 합니다. 아래 의사코드처럼 작성한다면 N+1 문제가 발생하게 됩니다.

```ts
const people = await People.query(`SELECT * FROM People`)

for (let person of people) {
  const department = await Companies.query(`
    SELECT department 
    FROM Companies c
    WHERE c.id = :personId
  `)
  .setParam('personId', person.id)
}
```

순서대로 어떤 SQL 쿼리가 들어갔는지 보자면 아래와 같습니다.

```sql
SELECT * FROM People;

SELECT department FROM Companies c WHERE c.id = 1; -- finance
SELECT department FROM Companies c WHERE c.id = 1; -- finance
SELECT department FROM Companies c WHERE c.id = 2; -- marketing
SELECT department FROM Companies c WHERE c.id = 3; -- development
SELECT department FROM Companies c WHERE c.id = 5; -- planning
```

N+1이란 최초의 쿼리를 던진 다음 아래 실행된 `Companies`에서 select하는 문장만큼을 N이라고 해서 쿼리가 총 6(1+5)번 일어나는 것을 보고 N+1 문제라고 합니다.

해당 문제를 고치는 방법은 아주 간단합니다. inner join으로 쿼리를 날리면 해결이 가능하다. join은 inner join의 alias입니다. 

```ts
const people = await People.query(`
  SELECT * 
  FROM People p
  JOIN Companies c
  ON p.id = c.id
`)

for (let person of people) {
  const department = person.company.department
}
```

people에서 던진 쿼리의 결과는 아래와 같습니다.

```sql
mysql> SELECT * FROM People p JOIN Companies c ON p.id = c.id;
+----+------------+------------+-------------+------------+----+-------------+
| id | first_name | last_name  | city        | company_id | id | department  |
+----+------------+------------+-------------+------------+----+-------------+
|  1 | John       | Doe        | Berlin      |          1 |  1 | finance     |
|  2 | Warwick    | Hawkins    | Dublin      |          1 |  2 | marketing   |
|  3 | Kobi       | Villarreal | Peking      |          2 |  3 | development |
|  4 | Winnie     | Roach      | Ulaanbaatar |          3 |  4 | design      |
|  5 | Peggy      | Nguyen     | Hanoi       |          5 |  5 | planning    |
+----+------------+------------+-------------+------------+----+-------------+
5 rows in set (0.00 sec)
```

#### Eager loading

데이터베이스로부터 데이터를 가져올때 가능한 적은 쿼리를 날리기 위해 아래처럼 join을 사용하는 것을 eager loading이라고 합니다. 

```ts
const people = await People.query(`
  SELECT * 
  FROM People p
  JOIN Companies c
  ON p.id = c.id
`)
```

초기 로딩 시간이 보다 길기때문에 불필요한 데이터를 너무 많이 로드하면 성능이 영향을 끼칠 수도 있습니다. 쇼핑몰에서 배송정보를 한 화면에 주문상세, 배송지정보까지 한꺼번에 보여줘야 하는 경우를 가정해볼까요. 주문을 관리하는 부모 테이블`Orders`의 자식 테이블인 `OrderDetails`과 `Delivery`을 한꺼번에 로딩하는 것이 N+1 문제를 일으키지 않기때문에 eager loading을 사용할 수 있습니다.

#### Lazy loading

위에서 join을 사용하지 않고 반복문 안에서 아래처럼 N+1번 쿼리를 날리는 케이스를 보고 지연로딩 혹은 lazy loading이라고 합니다. 

```ts
const department = await Companies.query(`
    SELECT department 
    FROM Companies c
    WHERE c.id = :personId
  `)
  .setParam('personId', person.id)
```

초기 로딩 시간을 줄일 수 있고, 자원 소비를 줄일 수 있다는 장점이 있습니다. 사용하지 않는 데이터를 결과 객체에 포함시키지 않기때문에 cpu 타임을 절약할 수 있는 반면, 그 결과 데이터베이스로 더 많은 쿼리를 날리게 됩니다. 뿐만 아니라 원치 않는 순간에 성능에 영향을 줄 수도 있습니다.

구체적인 사용 사례로는 sns에서 **댓글 더보기** 버튼을 누르는 경우, eager loading을 사용하는 경우 **댓글 더보기**를 누르지 않았는데도 이미 댓글을 조회해버리기 때문에 성능상 이슈가 생길 수 있습니다. 이 때는 **댓글 더보기**를 클릭했을 때 댓글 목록을 호출하도록 하는 lazy loading을 사용할 수 있습니다.

<br>

---

<br>

### TypeORM vs. Sequelize

typeorm은 스키마 선언부에서 eager loading을 할지 결정할 수 있습니다.

```ts
// src/entities/People.ts
@ManyToOne(type => Company, { eager: true })
@JoinColumn()
company: Company
```

lazy loading을 스키마 선언부에서 타입에 Promise generic type으로 사용할 수는 있지만 실험기능이라 권장하지는 않는다고 합니다.

```ts
@ManyToOne(type => Company)
@JoinColumn()
company: Promise<Company>
```

sequelize는 find 메서드에 옵션으로 `include`를 아래처럼 추가해줘야 eager loading을 할 수 있습니다.

```ts
const people = await People.findOne({ include: Companies, where: { id: 1 } })
```

그럼 join을 한 것과 같이 아래의 결과가 나옵니다. 

```json
{
  "id": 1,
  "first_name": "John",
  "last_name": "Doe",
  "city": "Berlin",
  "company": {
    "id": 1,
    "department": "finance"
  }
}
```

반대로 lazy loading같은 경우에는 `include` 옵션을 사용하지 않으면 가능합니다.

<br>

---

<br>

### 타언어 ORM과 비교

#### CakeORM (PHP)

eager loading은 아래와 같이 구현한다. `contain`이라는 예약어를 사용합니다.

```php
$category = $this->Category->get(1, [
    'contain' => [
        'Posts'
    ]
]);
$category->posts
```

lazy loading은 아래와 같이 구현합니다.

```php
$category = $this->Category->get(1);
$category->posts
```
#### JPA (Java)

eager loading은 아래와 같이 구현합니다. `FetchType.EAGER`란 상수를 사용합니다.

```java
@ManyToOne(fetch = FetchType.EAGER)
@JoinColumn(name = "post_id", nullable = false)
private Post post;
```

lazy loading은 아래와 같이 구현합니다. `FetchType.LAZY`란 상수를 사용합니다.

```java
@OneToMany(mappedBy = "post", fetch = FetchType.LAZY) 
private List<Comment> commentList = new ArrayList<>();
```

#### Active Record (Ruby)

eager loading은 아래와 같이 구현합니다. sequelize와 비슷하게 `includes`라는 메서드를 추가합니다.

```ruby
@products = Product.all.includes(:variants)
```

lazy loading은 아래와 같이 구현합니다.

```ruby
@product = Product.find(params[:id])
```