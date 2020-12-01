---
layout: post
title: TypeORM에서 쓰는 용어 씹어먹기
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover:
---- 

## 목차
- [목차](#목차)
- [자주 쓰는 타입](#자주-쓰는-타입)
- [메서드 사용 중 발생하는 이슈 해결 방법](#메서드-사용-중-발생하는-이슈-해결-방법)
- [자주 쓰는 Entity 타입 상속하는 방법](#자주-쓰는-entity-타입-상속하는-방법)
- [인접리스트](#인접리스트)
- [Subscriber](#subscriber)

## 자주 쓰는 타입

`@Column()` 데코레이터의 옵션으로 타입을 정의하는 방법은 다음과 같다.

```ts
// way 1
@Column('int')

// way 2
@Column({ type: 'int' })
```

다음은 mysql 기준으로 아래와 같은 타입들을 `@Column()` 데코레이터의 인자로 사용할 수 있다.

bit, int, integer, tinyint, smallint, mediumint, bigint, float, double, double precision, dec, decimal, numeric, fixed, bool, boolean, date, datetime, timestamp, time, year, char, nchar, national char, varchar, nvarchar, national varchar, text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, set, json, binary, varbinary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection

`enum` 칼럼 타입은 아래와 같은 방식으로 사용할 수 있다.

## 메서드 사용 중 발생하는 이슈 해결 방법

TODO: 

- response가 update, remove는 나올 필요 없는 것 -> `return res ? 1 : 0`
	- 혹은 다른 래퍼런스 있으면 공유하기
- response `order by` 해서 abc 순으로 전달하기
	- 혹은 안되면 언어단에서 정렬해서 넘기기

## 자주 쓰는 Entity 타입 상속하는 방법

`id`, `title`, `description`이란 공통된 칼럼을 가진 entity인 `Photo`, `Question`, `Post`를  아래와 같이 작성해보자.

```ts
@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  size: string
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  answersCount: number
}

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  viewCount: number
}
```

위에서 중복된 칼럼인 `id`, `title`, `description`을 아래와 같이 베이스가 되는 추상 클래스를 선언한 다음 확장할 수 있다. 참고로 `BaseEntity`는 기본 쿼리 메서드인 `hasId`, `save`, `remove` 등의 메서드를 담은 클래스이므로 엄연히 다른 기능을 한다. `BaseEntity`는 표준 `Repository`가 가진 메서드를 가지고 있다. 따라서 우리가 사용할 data mapper에서는 `BaseEntity`를 사용할 필요가 없다.

```ts
export abstract class BaseContent {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
}

@Entity()
export class Photo extends BaseContent {
  @Column()
  size: string
}

@Entity()
export class Question extends BaseContent {
  @Column()
  answersCount: numbre
}

@Entity()
export class Post extends BaseContent {
  @Column()
  viewCount: number
}
```

## 인접리스트

TODO: parent-children 패턴 적기

`@Tree`는 직관적이긴 하지만, experimental이라 확실한 기능만 사용하자고 하기

## Subscriber

데이터베이스에 특화된 리스너로 crud 이벤트 발생을 리슨한다. 다음과 같은 데코레이터들을 가지고 있다. `@AfterLoad`, `@AfterInsert`, `@BeforeInsert`, `@AfterUpdate`, `@BeforeUpdate`, `@AfterRemove`, `@BeforeRemove`로 데코레이터 이름을 보면 바로 이해할 수 있다. 

logging 옵션이 있긴 하지만 쿼리만을 보여주기때문에 한 줄씩 분석하기 위해 로그를 남기는 경우에는 지양하는 것이 좋다. 아래처럼 한 줄짜리 로그를 만들 수 있다.

```ts
import { Logger } from '@nestjs/common'

Logger.log(`Price changed from 
  ${ event.databaseEntity.price } to 
  ${ event.entity.price }`, 'Product Price Updated')
```

서버에 요청을 보내면 다음과 같이 로그가 찍히는 것을 확인할 수 있다.

![](https://miro.medium.com/max/875/1*Yaxx2oKHRHpvqnwI7U5qxw.png)

- [Subscribers a.k.a Entity Listeners of TypeORM on NestJS](https://medium.com/@Semyonic/subscribers-a-k-a-entity-listeners-of-typeorm-on-nestjs-a97ac75acc2d)