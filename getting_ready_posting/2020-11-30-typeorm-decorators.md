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
  - [CreateDateColumn](#createdatecolumn)
  - [UpdateDateColumn](#updatedatecolumn)
  - [DeleteDateColumn](#deletedatecolumn)
  - [Generated](#generated)
- [Relation](#relation)
  - [OneToOne](#onetoone)
  - [ManyToOne/OneToMany](#manytooneonetomany)
  - [ManyToMany](#manytomany)
  - [JoinColumn](#joincolumn)
  - [JoinTable](#jointable)
  - [RelationId](#relationid)
- [Others](#others)
  - [Index](#index)
  - [Unique](#unique)
  - [Check](#check)
  - [Transaction/TransactionManager/TransactionRepository](#transactiontransactionmanagertransactionrepository)
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
- `database`:  선택된 DB서버의 데이터베이스 이름
- `schema`: 스키머 이름
- `engine`: 테이블 생성 중에 설정할 수 있는 DB엔진 이름
- `synchronize`: `false`로 설정할 시 스키머 싱크를 건너뛴다.
- `orderBy`: `QueryBuilder`과 `find`를 실행할 때 엔티티의 기본순서를 지정한다.

```ts
@Entity({
  name: 'users',
  engine: 'MyISAM',
  database: 'example_dev',
  schema: 'schema_with_best_tables',
  synchronize: false,
  orderBy: {
    name: 'ASC',
    id: 'DESC'
  }
})
export class User {}
```

### ViewEntity

<!-- TODO: sql view란? 다른 파일로 옮기기 -->
여기서 잠깐, view가 뭘 의미하는건지 아라보자.
- view는 하나의 가상 테이블이다.
- 실제 데이터가 저장되는 것은 아니지만, view를 통해 데이터를 가상 테이블로 관리가 가능하다.
- 1개의 view로 여러 테이블의 데이터를 조회할 수 있다.
- 복잡한 쿼리를 통해 얻을 수 있는 결과를 간단한 쿼리로 얻을 수 있게 도와준다.
- 특정 기준에 따른 사용자 별로 다른 데이터를 액세스할 수 있도록 도와줄 수도 있다.
- 조회 대상을 줄이고 싶을 때 사용할 수 있다.

데코레이터에 들어가는 인자가 아래와 같이 `@Entity()`와는 약간 다르다.

- `name`: 테이블 이름. 지정하지 않으면 테이블 이름은 엔티티 클래스명으로 생성된다.
- `database`:  선택된 DB서버의 데이터베이스 이름.
- `schema`: 스키머 이름.
- `expression`: 뷰를 정의. 꼭 있어야하는 파라미터.

`expression`은 sql문이나 `QueryBuilder`에 체이닝할 수 있는 메서드가 들어갈 수 있다. 특이점으로는 필드명 위에 들어가는 데코레이터를 id까지 전부 `@ViewColumn()`을 사용해야 한다.

## Column

### Column

entity의 속성을 테이블 칼럼으로 표시한다.

```ts
@Entity()
export class User {
@PrimaryGeneratedColumn()
id: number

@Column({ tpye: 'varchar', length: 200, unique: true })
firstName: string

@Column({ nullable: true })
lastName: string

@Column({ default: false })
isActive: boolean
}
```

`@Column()`에 들어갈 수 있는 옵션들 중 중요하다고 판단한 것들은 아래와 같다.

- `type: ColumnType`: javascript의 원시타입들을 세분화해서 사용할 수 있다.
- `length: string | number`: javascript의 원시타입들을 세분화해서 사용하기 위해 `type` 옵션과 같이 사용할 수 있다.
- `onUpdate: string`: cascading을 하기 위한 옵션으로 `ON UPDATE` 트리거이다.
- `nullable: boolean`: 칼럼을 `NULL`이나 `NOT NULL`로 만드는 옵션이다. 기본값은 `false`이다.
- `default: string`: 칼럼에 `DEFAULT` 값을 추가한다.
- `unique: boolean`: 유니크 칼럼이라고 표시할 수 있다. 유니크 constraint를 만든다. 기본값은 `false`이다.
- `enum: string[] | AnyEnum`: 칼럼의 값으로 `enum`을 사용할 수 있다.
- `enumName: string`: 다른 테이블에서 같은 `enum`을 사용하는 경우 필요하다.
- `transformer: { from(value: DatabaseType): EntityType, to(value: EntityType): DatabaseType }`: 아래와 같은 코드를 만들어내서 json을 문자열로 만들고 파싱하는 역할을 한다. 또는 boolean을 integer로 바꿔주는 일도 할 수 있다.

```ts
import { ValueTransformer } from 'typeorm'

class SomeTransformer implements ValueTransformer {
  to (value: Map<string, number>): string {
    return JSON.stringify([...value])
  }
  from (value: string): Map<string, number> {
    return new Map(JSON.parse(value))
  }
}
```

### PrimaryColumn

`@Column()`의 옵션인 `primary`를 대체할 수 있다.

### PrimaryGeneratedColumn

자동생성되는 id값을 표현하는 방식을 아래와 같이 2가지 옵션을 사용할 수 있도록 도와준다.

- `increment`: `AUTO_INCREMENT`를 사용해서 1씩 증가하는 id를 부여한다. 기본 옵션이다.
- `uuid`: 유니크한 `uuid`를 사용할 수 있다.

```ts
// using increment
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
}

// using uuid
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number
}
```

### CreateDateColumn

해당 열이 추가된 시각을 자동으로 기록한다.

```ts
@Entity()
export class User {
  @CreateDateColumn()
  createdAt: Date
}
```

### UpdateDateColumn

해당 열이 수정된 시각을 자동으로 기록한다.

```ts
@Entity()
export class User {
  @UpdateDateColumn()
  updatedAt: Date
}
```

### DeleteDateColumn

해당 열이 삭제된 시각을 자동으로 기록한다. `deletedAt`에 시각이 기록되지 않은 열들만 쿼리하기 위해 typeorm의 soft delete 기능을 활용할 수 있다. 

```ts
@Entity()
export class User {
  @DeleteDateColumn()
  deletedAt: Date
}
```

### Generated

pk로 쓰는 id 외에 추가로 uuid를 기록하기 위해서 사용할 수 있다.

```ts
@Entity()
export class User {
  @Column()
  @Generated('uuid')
  uuid: string
}
```

## Relation

### OneToOne

`User`와 `Profile` 테이블을 아래와 같이 준비한다. 둘의 관계는 1:1 관계이다. `User`에서 target relation type을 `Profile`로, `Profile`에서 target relation type은 `User`로 지정했다. 다시 언급할 `@JoinColumn()`을 사용한 필드는 외래키로 타겟 테이블에 외래키로 등록된다. `@JoinColumn()`은 반드시 한쪽 테이블에서만 사용해야 한다!

관계는 단방향과 양방향 모두 작성이 가능하다. uni-directional은 `@OneToOne()`을 한쪽에만 써주는 것을 bi-directional은 양쪽에 모두 써주는 것을 의미한다. 아래는 bi-directional이다.

```ts
@Entity()
export class Profile {    
  @PrimaryGeneratedColumn()
  id: number
  
  @Column()
  gender: string
  
  @Column()
  photo: string

  @OneToOne(() => User, user => user.profile)
  user: User
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number
    
  @Column()
  name: string

  @OneToOne(type => Profile, profile => profile.user)
  @JoinColumn()
  profile: Profile
}
```

sync 혹은 migration을 한 다음 desc문을 찍어보면 아래와 같은 결과가 나온다.

```
+-------------+--------------+----------------------------+
|                        profile                          |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| gender      | varchar(255) |                            |
| photo       | varchar(255) |                            |
| userId      | int(11)      | FOREIGN KEY                |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name        | varchar(255) |                            |
| profileId   | int(11)      | FOREIGN KEY                |
+-------------+--------------+----------------------------+
```

이것으로 끝난 것은 아니다. `user.profile`나 `profile.user`를 검색하기 위해서는 관계를 지정해주는 작업이 필요하다.

```ts
// using find* method
const userRepo = connection.getRepository(User)
const users = await userRepo.find({ relations: ['profile'] })

// using query builder
const users = await connection
  .getRepository(User)
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.profile', 'profile')
  .getMany()
```

### ManyToOne/OneToMany

`User`와 `Photo` 테이블을 아래와 같이 준비한다. 둘의 관계는 1:M 관계이다. 사용자는 여러장의 사진을 가질 수 있다.

```ts
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @OneToMany(type => Photo, photo => photo.user)
  photos: Photo[]
}


@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  url: string

  @ManyToOne(type => User, user => user.photos)
  user: User
}
```

`@OneToMany()`/`@ManyToOne()`에서는 `@JoinColumn()`을 생략할 수 있다. `@OneToMany()`는 `@ManyToOne()`이 없으면 안된다. 하지만 반대로 `@ManyToOne()`은 `@OneToMany()`이 없어도 정의할 수 있다. `@ManyToOne()`을 설정한 테이블에는 relation id가 외래키를 가지고 있게 된다. 아래의 desc문에서 확인할 수 있다.

```
+-------------+--------------+----------------------------+
|                         photo                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| url         | varchar(255) |                            |
| userId      | int(11)      | FOREIGN KEY                |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name        | varchar(255) |                            |
+-------------+--------------+----------------------------+
```

마찬가지로 `user.photos`나 `photo.user`를 검색하기 위해서는 관계를 지정해주는 작업이 필요하다. 두 객체중 어느 한 곳에서 relation을 명시해줘야 한다.

```ts
// using find* method
const userRepository = connection.getRepository(User);
const users = await userRepository.find({ relations: ['photos'] })
// or from inverse side
const photoRepository = connection.getRepository(Photo);
const photos = await photoRepository.find({ relations: ['user'] })

// using query builder
const users = await connection
  .getRepository(User)
  .createQueryBuilder('user')
  .leftJoinAndSelect('user.photos', 'photo')
  .getMany()
// or from inverse side
const photos = await connection
  .getRepository(Photo)
  .createQueryBuilder('photo')
  .leftJoinAndSelect('photo.user', 'user')
  .getMany()
```

### ManyToMany

<!-- TODO: soft delete란? 다른 파일로 옮기기 -->
- 데이터 열을 실제로 삭제하지 않고, 삭제여부를 나타내는 칼럼인 `deletedAt`을 사용하는 방식이다.
- 일반적인 삭제 대신 removed 칼럼을 갱신하는 update문을 사용하는 방식이다.
- 복구하거나 예전 기록을 확인하고자 할 때 간편하다.
- 다른 테이블과 join시 항상 removed를 점검해야 하므로 속도가 느려진다.

`Category`와 `Question` 테이블을 아래와 같이 준비한다. 둘의 관계는 N:M 관계이다. 카테고리는 여러개의 질문을 가질 수 있고, 질문 또한 여러개의 카테고리를 가질 수 있다. 관계는 단방향과 양방향 모두 작성이 가능하다. 

```ts
@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  text: string

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]
}
```

`@ManyToMany()` 관계에서는 `@JoinTable()`이 반드시 필요하다. 한쪽 테이블에만 `@JoinTable()`을 넣어주면 된다. desc문을 쳐보면 아래와 같이 나온다.

```
+-------------+--------------+----------------------------+
|                        category                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name        | varchar(255) |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                        question                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| title       | varchar(255) |                            |
| text        | varchar(255) |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|              question_categories_category               |
+-------------+--------------+----------------------------+
| questionId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
| categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
+-------------+--------------+----------------------------+
```

단 `@ManyToMany()`에서 옵션 `cascade`가 `true`인 경우 soft delete를 할 수 있다. 필요에 따라 사용할 수 있다.

마찬가지로 `question.categories`나 `categories.questions`를 검색하기 위해서는 관계를 지정해주는 작업이 필요하다. 

```ts
// using find* method
const questionRepository = connection.getRepository(Question)
const questions = await questionRepository.find({ relations: ['categories'] })

// using query builder
const questions = await connection
  .getRepository(Question)
  .createQueryBuilder('question')
  .leftJoinAndSelect('question.categories', 'category')
  .getMany()
```

### JoinColumn

외래키를 가진 칼럼명과 참조칼럼명을 설정할 수 있는 옵션을 가지고 있다. 설정하지 않으면 테이블명을 가지고 자동으로 매핑한다.

```ts
@Entity()
export class Post {
  @ManyToOne(type => Category)
  @JoinColumn({
    name: 'cat_id',
    referencedColumnName: 'name'
  })
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
```

### JoinTable

다대다 관계에서 사용하며 연결테이블을 설정할 수 있다. `@JoinTable()`의 옵션을 사용해 연결테이블의 칼럼명과 참조칼럼명을 설정할 수 있다.

```ts
@Entity()
export class Question {
  @ManyToMany(type => Category)
  @JoinTable({
    name: 'question_categories',
    joinColumn: {
      name: 'question',
      referencedColumnName: 'id'
    },
    inverseJoinColumn: {
      name: 'category',
      referencedColumnName: 'id'
    }
  })
  categories: Category[]
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
```

### RelationId

`@RelationId()`로 테이블을 조회하면 새로운 칼럼명 `categoryId`도 결과에 같이 들고올 수 있다.

```ts
// using many to one
@Entity()
export class Post {
  @ManyToOne(type => Category)
  category: Category

  @RelationId((post: Post) => post.category)
  categoryId: number
}

// using many to many
@Entity()
export class Post {
  @ManyToMany(type => Category)
  categories: Category[]

  @RelationId((post: Post) => post.categories)
  categoryIds: number[]
}
```

## Others

### Index

<!-- TODO: index란? 다른 파일로 옮기기 -->
- 테이블 쿼리 속도를 올려주는 자료구조를 말한다.
- 테이블 내 1개 혹은 그 이상의 칼럼을 이용해 생성할 수 있다.
- 인덱스는 보통 키-필드만 갖고있고, 테이블의 다른 세부항목을 갖지 않기때문에 보통 테이블을 저장하는 공간보다 더 적은 공간을 차지한다.
- 특정 칼럼 값을 가지고 있는 열이나 값을 빠르게 찾기 위해 사용한다.
- 인덱싱하지 않은 경우는 첫번째 열부터 전체 테이블을 걸쳐 연관된 열을 검색하기때문에 테이블이 클수록 쿼리비용이 커진다.
- 인덱싱을 한 경우는 모든 데이터를 조회하지 않고 데이터 파일의 중간에서 검색위치를 빠르게 잡을 수 있다.
- where절과 일치하는 열을 빨리 찾기 위해서 사용한다.
- join을 실행할 때 다른 테이블에서 열을 추출하기 위해서 사용한다.
- 데이터 양이 많고 검색이 변경보다 빈번한 경우 인덱싱을 하면 좋다.

![](https://itholic.github.io/assets/images/2018/10/23/index/10000page.png)
- 쉽게 말해 이런 책에서 transaction이 어딨는지 목차 없이 찾으려면 눈물날지도 모른다. 책의 주요내용을 가나다순으로 정리한 목록이 있으면 찾기 쉬울텐데 인덱스가 바로 그 역할을 한다.

특정 칼럼에 인덱스를 걸 수 있다. 옵션으로 고유키를 부여할 수도 있다. 단일 칼럼에 인덱스를 걸고 싶으면 칼럼마다 추가할 수도 있지만, 테이블 전체에 인덱스를 걸고싶은 경우 `@Entity()`아래 `@Index()`를 추가할 수도 있다.

```ts
// using with single column
@Entity()
export class User {
  @Index()
  @Column()
  firstName: string

  @Index({ unique: true })
  @Column()
  lastName: string
}

// using with entity
@Entity()
@Index(['firstName', 'lastName'], { unique: true })
export class User {
  @Column()
  firstName: string
  
  @Column()
  lastName: string
}
```

### Unique

특정 칼럼에 고유키 제약조건을 생성할 수 있다. `@Unique()`는 테이블 자체에만 적용하는 것이 가능하다.

```ts
@Entity()
@Unique(['firstName', 'lastName'])
export class User {
  @Column()
  firstName: string
  
  @Column()
  lastName: string
}
```

### Check

테이블에서 데이터 추가 쿼리가 날아오면 값을 체크하는 역할을 한다.

```ts
@Entity()
@Check('"age" > 18')
export class User {
  @Column()
  firstName: string
  
  @Column()
  firstName: string
  
  @Column()
  age: number
}
```

### Transaction/TransactionManager/TransactionRepository

<!-- TODO: transaction이란? 다른 파일로 옮기기 -->
- 데이터베이스 내에서 하나의 그룹으로 처리해야하는 명령문을 모아서 처리하는 작업의 단위를 말한다.
- 여러 단계의 처리를 하나의 처리처럼 다루는 기능이다.
- 여러 개의 명령어의 집합이 정상적으로 처리되면 정상종료된다.
- 하나의 명령어라도 잘못되면 전체 취소된다.
- 트랜잭션을 쓰는 이유는 데이터의 일관성을 유지하면서 안정적으로 데이터를 복구하기 위함이다.

### EntityRepository

entity repository를 커스텀할 수 있도록 도와준다. 