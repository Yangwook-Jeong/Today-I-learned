---
layout: post
title: TypeORM 데코레이터 씹어먹기
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover: https://res.cloudinary.com/yangeok/image/upload/v1606139412/logo/posts/typeorm.jpg
---- 

## 목차

- [목차](#목차)
- [Entity](#entity)
  - [Entity](#entity-1)
    - [Entity inheritance](#entity-inheritance)
      - [Concrete table inheritance](#concrete-table-inheritance)
      - [Single table inheritance](#single-table-inheritance)
      - [Embedded entities](#embedded-entities)
  - [ViewEntity](#viewentity)
- [Column](#column)
  - [Column](#column-1)
  - [PrimaryColumn](#primarycolumn)
  - [PrimaryGeneratedColumn](#primarygeneratedcolumn)
  - [Generated](#generated)
  - [DateColumn](#datecolumn)
    - [CreateDateColumn](#createdatecolumn)
    - [UpdateDateColumn](#updatedatecolumn)
    - [DeleteDateColumn](#deletedatecolumn)
- [Relation](#relation)
  - [OneToOne](#onetoone)
  - [ManyToOne/OneToMany](#manytooneonetomany)
  - [ManyToMany](#manytomany)
  - [Tree entity](#tree-entity)
    - [Adjacency list](#adjacency-list)
    - [Tree entity](#tree-entity-1)
      - [Nested set](#nested-set)
      - [Materialized path](#materialized-path)
      - [Closure table](#closure-table)
  - [JoinColumn/JoinTable](#joincolumnjointable)
    - [JoinColumn](#joincolumn)
    - [JoinTable](#jointable)
  - [RelationId](#relationid)
- [Subscriber](#subscriber)
- [Others](#others)
  - [Index](#index)
  - [Unique](#unique)
  - [Check](#check)
  - [Transaction/TransactionManager/TransactionRepository](#transactiontransactionmanagertransactionrepository)

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

#### Entity inheritance

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

##### Concrete table inheritance

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
  answersCount: number
}

@Entity()
export class Post extends BaseContent {
  @Column()
  viewCount: number
}
```

##### Single table inheritance

`@TableInheritance()`, `@ChildEntity()`를 사용하는 방법이다. 이 방법은 데이터베이스에 `Content` 테이블이 생성된다.

```ts
@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' }})
export class Content {
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

##### Embedded entities

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

`expression`은 sql문이나 `QueryBuilder`에 체이닝할 수 있는 메서드가 들어갈 수 있다. 특이점으로는 필드명 위에 들어가는 데코레이터를 id까지 전부 `@ViewColumn()`을 사용해야 한다. join을 쳐서 테이블끼리 연결을 시키냐, 아니면 view를 통해 나중에 자주 사용할 가상 테이블을 미리 만들어두냐의 차이로 생각할 수 있겠다.

아래와 같이 코드를 작성할 수 있다.

```ts
@ViewEntity({ 
    expression: `
        SELECT "post"."id" AS "id", "post"."name" AS "name", "category"."name" AS "categoryName"
        FROM "post" "post"
        LEFT JOIN "category" "category" ON "post"."categoryId" = "category"."id"
    `
})
export class PostCategory {
  @ViewColumn()
  id: number

  @ViewColumn()
  name: string

  @ViewColumn()
  categoryName: string
}
```

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

- `type: ColumnType`: javascript의 원시타입들을 세분화해서 사용할 수 있다. 타입을 정의하는 방법은 다음과 같다.

```ts
// way 1
@Column('int')

// way 2
@Column({ type: 'int' })
```

다음은 mysql 기준으로 아래와 같은 타입들을 `@Column()` 데코레이터의 인자로 사용할 수 있다.
`enum` 칼럼 타입은 아래와 같은 방식으로 사용할 수 있다.

- `length: string | number`: javascript의 원시타입들을 세분화해서 사용하기 위해 `type` 옵션과 같이 사용할 수 있다.
- `onUpdate: string`: cascading을 하기 위한 옵션으로 `ON UPDATE` 트리거이다.
- `nullable: boolean`: 칼럼을 `NULL`이나 `NOT NULL`로 만드는 옵션이다. 기본값은 `false`이다.
- `default: string`: 칼럼에 `DEFAULT` 값을 추가한다.
- `unique: boolean`: 유니크 칼럼이라고 표시할 수 있다. 유니크 constraint를 만든다. 기본값은 `false`이다.
- `enum: string[] | AnyEnum`: 칼럼의 값으로 `enum`을 사용할 수 있다. `enum`은 db단에서 처리할 수도, orm단에서 처리할 수도 있다. 

```ts
@Column({ enum: AnyEnum })
data: AnyEnum
```

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

`@Column()`의 옵션인 `primary`를 대체할 수 있다. pk를 만드는 역할을 한다.

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
  id: string
}
```

### Generated

- pk로 쓰는 id 외에 추가로 uuid를 기록하기 위해서 사용할 수 있다.

```ts
@Entity()
export class User {
  @Column()
  @Generated('uuid')
  uuid: string
}
```

### DateColumn

#### CreateDateColumn 

해당 열이 추가된 시각을 자동으로 기록한다. 옵션을 적지 않을시 `datetime` 타입으로 기록된다.

```ts
@Entity()
export class User {
  @CreateDateColumn()
  createdAt: Date
}
```

#### UpdateDateColumn

해당 열이 수정된 시각을 자동으로 기록한다. 옵션을 적지 않을시 `datetime` 타입으로 기록된다.

```ts
@Entity()
export class User {
  @UpdateDateColumn()
  updatedAt: Date
}
```

#### DeleteDateColumn

<!-- TODO: soft delete란? 다른 파일로 옮기기 -->
- 데이터 열을 실제로 삭제하지 않고, 삭제여부를 나타내는 칼럼인 `deletedAt`을 사용하는 방식이다.
- 일반적인 삭제 대신 삭제된 열을 갱신하는 update문을 사용하는 방식이다.
- 복구하거나 예전 기록을 확인하고자 할 때 간편하다.
- 다른 테이블과 JOIN시 항상 삭제된 열을 검사해서 성능이 떨어진다.

해당 열이 삭제된 시각을 자동으로 기록한다. `deletedAt`에 시각이 기록되지 않은 열들만 쿼리하기 위해 typeorm의 soft delete 기능을 활용할 수 있다. 옵션을 적지 않을시 `datetime` 타입으로 기록된다.

```ts
@Entity()
export class User {
  @DeleteDateColumn()
  deletedAt: Date
}
```

## Relation

IMPT: 1:1/1:N/M:N 관계 예시 적기
- 1:1은 회원정보:프로필정보, 사원번호:주민번호, 학생:연락처정보
- M:N은 사원:업무, 영화:영화배우, 학생:수업
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

### Tree entity

IMPT: 셀프조인 설명하기
- 상품 카테고리(소,중,대분류), 사원(사원,관리자,상위관리자), 지역(읍/면/동,구/군,시/도)
#### Adjacency list

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


#### Tree entity 

##### Nested set 

- `@Tree()`, `@TreeChildren()`, `@TreeParent()`를 사용한 또 다른 패턴이다. 
- 읽기 작업에는 효과적이지만 쓰기 작업에는 그렇지 않다. 
- 여러개의 루트를 가질 수 없다는 점도 문제이다.
- `@Tree()`의 인자로 `nested-set`이 들어간다.

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

##### Materialized path 

- 구체화된 경로 혹은 경로 열거라고 부른다. 
- 간단하고 효율적이다.
- nested set과 사용방법은 같다.
- `@Tree()`의 인자로 `materialized-path`이 들어간다.

##### Closure table

- 부모와 자식 사이의 관계를 분리된 테이블에 특별한 방법으로 저장한다. 
- 읽기와 쓰기 모두 효율적으로 할 수 있다.
- nested set과 사용방법은 같다.
- `@Tree()`의 인자로 `closure-table`이 들어간다.

### JoinColumn/JoinTable

IMPT: 내용 약간 추가!
- `eager` 옵션이 있어서  N+1 문제를 제어할 수 있음
- `cascade`, `onDelete` 옵션이 있어 관계가 연결된 객체를 추가/수정/삭제되도록 할 수 있음. 버그를 유발할 수 있으니 주의해서 사용하는 것이 좋음
- `@JoinColumn()`을 사용하면 테이블에 자동으로 property name + referenced column name을 가진 칼럼을 만들어냄. 
- `@JoinTable()`은 다대다 관계에서 사용하고 연결테이블에 들어갈 칼럼을 선언할 수 있음.  참조할 칼럼명과 테이블명을 내부 옵션에서 설정할 수 있음
#### JoinColumn



외래키를 가진 칼럼명과 참조칼럼명을 설정할 수 있는 옵션을 가지고 있다. 설정하지 않으면 테이블명을 가지고 자동으로 매핑한다. 아래와 같은 경우에는 `categoryId`라고 매핑되야 할 것을 `category_id`로 이름을 직접 지정할 수 있다. 주의할 점으로는 `@ManyToOne()`에서는 꼭 적지 않아도 `categoryId`를 칼럼을 자동으로 만들어주지만, `@OneToOne()`에서는 반드시 적어줘야 한다.

```ts
@Entity()
export class Post {
  @ManyToOne(type => Category)
  @JoinColumn({
    name: 'category_id',
    referencedColumnName: 'name'
  })
  category: Category
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string
}
```

#### JoinTable

IMPT: 내용 약간 추가!
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

IMPT: 내용 약간 추가!
1:N/M:N 관계에서 entity에 명시적으로 관계가 있는 테이블의 칼럼 id를 적고싶은 경우, `@RelationId()`를 사용하면 됨

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
- 격리성 수준 설정을 통해 트랜잭션이 열려있는 동안 외부에서 해당 데이터에 접근하지 못하도록 락을 걸 수도 있다.

격리성 수준은 다음과 같이 분류할 수 있다. 아래로 갈수록 격리성 수준이 높아진다.

- `READ UNCOMMITTED`
- `READ COMMITTED` 
- `REPEATABLE READ`
- `SERIALIZABLE`

global connection을 열어서 트랜젝션을 사용하는 경우는 아래와 같이 사용한다.

```ts
await getManager().transaction('SERIALIZABLE', transactionalEntityManager => {})
```

하지만 global connection은 사이드이펙트가 많은 방법이기때문에 데코레이터나 `queryRunner`를 사용한 방법을 추천한다. 아래는 데코레이터 `@Transaction()`, `@TransactionManager()`, 
`@TransactionRepository()`를 사용한 패턴이다.

```ts
// using transaction manager
@Transaction({ isolation: 'SERIALIZABLE' })
save(@TransactionManager() manager: EntityManager, user: User) {
    return manager.save(user)
}

// using transaction repository
@Transaction({ isolation: 'SERIALIZABLE' })
save(user: User, @TransactionRepository(User) userRepository: Repository<User>) {
    return userRepository.save(user) 
}
```

아래는 `queryRunner`를 사용한 방법이다. 다만 이 방법에서는 격리성 수준 설정이 불가능하다.

- `startTransaction`은 트랜잭션을 시작하는 메서드임
- `commitTransaction`는 모든 변경사항을 커밋하는 메서드임
- `rollbackTransaction`는 모든 변경사항을 되돌리는 메서드임

```ts
await queryRunner.startTransaction()

try {
  await queryRunner.manager.save(user)
  await queryRunner.manager.save(photos)
  
  await queryRunner.commitTransaction() 
} catch (err) {
  await queryRunner.rollbackTransaction()
} finally {
  await queryRunner.release()
}
```