---
layout: post
title: TypeORM에서 쓰는 용어 씹어먹기
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover: https://res.cloudinary.com/yangeok/image/upload/v1606139412/logo/posts/typeorm.jpg
---- 

## 목차
- [목차](#목차)
- [자주 쓰는 타입](#자주-쓰는-타입)
- [메서드 사용 중 발생하는 이슈 해결 방법](#메서드-사용-중-발생하는-이슈-해결-방법)
- [Entity inheritance](#entity-inheritance)
  - [Concrete table inheritance](#concrete-table-inheritance)
  - [Single table inheritance](#single-table-inheritance)
  - [Embedded entities](#embedded-entities)
- [Tree entity](#tree-entity)
  - [Adjacency list](#adjacency-list)
  - [Nested set](#nested-set)
  - [Materialized path](#materialized-path)
  - [Closure table](#closure-table)
- [Subscriber](#subscriber)

## 자주 쓰는 타입

bit, int, integer, tinyint, smallint, mediumint, bigint, float, double, double precision, dec, decimal, numeric, fixed, bool, boolean, date, datetime, timestamp, time, year, char, nchar, national char, varchar, nvarchar, national varchar, text, tinytext, mediumtext, blob, longtext, tinyblob, mediumblob, longblob, enum, set, json, binary, varbinary, geometry, point, linestring, polygon, multipoint, multilinestring, multipolygon, geometrycollection

## 메서드 사용 중 발생하는 이슈 해결 방법

- response가 update, remove는 나올 필요 없는 것 -> `return res ? successResponse : failureResponse`
- response `order by` 해서 abc 순으로 전달하기 FIXME:

## Entity inheritance

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

### Concrete table inheritance

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

### Single table inheritance

```ts
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' }})
export class BaseContent {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string
}

@ChildEntity()
export class Photo extends Content {
  @Column()
  size: string
}

@ChildEntity()
export class Question extends Content {
  @Column()
  answersCount: number
}

@ChildEntity()
export class Post extends Content {
  @Column()
  viewCount: number
}
```

### Embedded entities

```ts
export class Name {
  @Coulmn()
  first: string

  @Column()
  last: string
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column(type => Name)
  name: Name

  @Column()
  isActive: boolean
}
```

desc문을 돌리면 아래와 같이 나온다.

```
+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| nameFirst   | varchar(255) |                            |
| nameLast    | varchar(255) |                            |
| isActive    | boolean      |                            |
+-------------+--------------+----------------------------+
```

## Tree entity

### Adjacency list

자기참조를 `@ManyToOne()`, `@OneToMany()` 데코레이터로 표현할 수 있다. 이 방식은 간단한 것이 가장 큰 장점이지만, join하는데 제약이 있어 큰 트리를 로드하는데 문제가 있다.

```ts
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  description: string

  @ManyToOne(type => Category, category => category.children)
  parent: Category

  @OneToMany(type => Category, category => category.parent)
  children: Category[]
}
```


### Nested set

`@Tree()`, `@TreeChildren()`, `@TreeParent()`를 사용한 또 다른 패턴이다. 읽기 작업에는 효과적이지만 쓰기 작업에는 그렇지 않다. 여러개의 루트를 가질 수 없다는 점도 문제이다.

```ts
@Entity()
@Tree('nested-set')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category
}
```

### Materialized path

구체화된 경로 혹은 경로 열거라고 부른다. 간단하고 효율적이다.

```ts
@Entity()
@Tree('materialized-path')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category
}
```

### Closure table

부모와 자식 사이의 관계를 분리된 테이블에 특별한 방법으로 저장한다. 읽기와 쓰기 모두 효율적으로 할 수 있다.

```ts
@Entity()
@Tree('closure-table')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @TreeChildren()
  children: Category[]

  @TreeParent()
  parent: Category
}
```

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