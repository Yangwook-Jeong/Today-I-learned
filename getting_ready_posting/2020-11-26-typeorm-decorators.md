---
layout: post
title: TypeORM 데코레이터 씹어먹기
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover:
---- 

## 목차

- [목차](#목차)
- [Entity](#entity)
  - [Entity](#entity-1)
  - [ViewEntity](#viewentity)
- [Column](#column)
  - [Column](#column-1)
  - [PrimaryColumn](#primarycolumn)
  - [PrimaryGeneratedColumn](#primarygeneratedcolumn)
  - [ObjectIdColumn](#objectidcolumn)
  - [CreateDateColumn](#createdatecolumn)
  - [UpdateDateColumn](#updatedatecolumn)
  - [DeleteDateColumn](#deletedatecolumn)
  - [VersionCOlumn](#versioncolumn)
  - [Generated](#generated)
- [Relation](#relation)
  - [OneToOne](#onetoone)
  - [ManyToOne](#manytoone)
  - [OneToMany](#onetomany)
  - [ManyToMany](#manytomany)
  - [JoinColumn](#joincolumn)
  - [JoinTable](#jointable)
  - [RelationId](#relationid)
- [Subscriber & Listener](#subscriber--listener)
  - [AfterLoad](#afterload)
  - [BeforeInsert](#beforeinsert)
  - [AfterInsert](#afterinsert)
  - [BeforeUpdate](#beforeupdate)
  - [AfterUpdate](#afterupdate)
  - [BeforeRemove](#beforeremove)
  - [AfterRemove](#afterremove)
  - [EventSubscriber](#eventsubscriber)
- [Others](#others)
  - [Index](#index)
  - [Unique](#unique)
  - [Check](#check)
  - [Exclusion](#exclusion)
  - [Transaction](#transaction)
  - [TransactionManager](#transactionmanager)
  - [TransactionRepository](#transactionrepository)
  - [EntityRepository](#entityrepository)

## Entity

### Entity

데이터베이스 테이블을 정의하기 전에 실행해야하는 데코레이터이다. 테이블명을 지정할 수 있다.

```ts
@Entity('users')
export class User {}
```

아래와 같이 옵션을 추가적으로 지정할 수 있다.

- `name`: 테이블 이름. 지정하지 않으면 테이블 이름은 엔티티 클래스명으로 생성된다.
- `database`:  선택된 DB서버의 데이터베이스 이름.
- `schema`: 스키머 이름.
- `engine`: 테이블 생성 중에 설정할 수 있는 DB엔진 이름.
- `synchronize`: `false`로 설정할 시 스키머 싱크를 건너뛴다.
- `orderBy`: `QueryBuilder`과 `find`를 실행할 때 엔티티의 기본순서를 지정한다.

```ts
@Entity({
    name: "users",
    engine: "MyISAM",
    database: 'example_dev',
    schema: 'schema_with_best_tables',
    synchronize: false,
    orderBy: {
        name: "ASC",
        id: "DESC"
    }
})
export class User {}
```

### ViewEntity

데코레이터에 들어가는 인자가 아래와 같이 `Entity`와는 약간 다르다.

- `name`: 테이블 이름. 지정하지 않으면 테이블 이름은 엔티티 클래스명으로 생성된다.
- `database`:  선택된 DB서버의 데이터베이스 이름.
- `schema`: 스키머 이름.
- `expression`: 뷰를 정의. 꼭 있어야하는 파라미터.

## Column

### Column

### PrimaryColumn

### PrimaryGeneratedColumn

### ObjectIdColumn

### CreateDateColumn

### UpdateDateColumn

### DeleteDateColumn

### VersionCOlumn

### Generated


## Relation

### OneToOne

### ManyToOne

### OneToMany

### ManyToMany

### JoinColumn

### JoinTable

### RelationId


## Subscriber & Listener

### AfterLoad

### BeforeInsert

### AfterInsert

### BeforeUpdate

### AfterUpdate

### BeforeRemove

### AfterRemove

### EventSubscriber


## Others

### Index

### Unique

### Check

### Exclusion

### Transaction

### TransactionManager

### TransactionRepository

### EntityRepository