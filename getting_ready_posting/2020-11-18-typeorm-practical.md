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
- [패턴](#패턴)
  - [Active record](#active-record)
    - [BaseEntity](#baseentity)
  - [Data mapper](#data-mapper)
- [환경변수 세팅](#환경변수-세팅)

## 패턴

### Active record
`Entity`에 query method를 정의하고, query method를 사용해 객체를 crud한다. 
`BaseEntity`를 사용해 새로운 클래스에 상속받아서 사용할 수도 있다.

#### BaseEntity
모든 active record entity들은 `BaseEntity`를 상속해야 한다. `BaseEntity`가 갖고 있는 메서드와 `Entity` 내에 사용자가 정의한 static 메서드를 이용할 수 이싿. `BaseEntity`는 대부분의 standard repository가 가진 mehtod를 수행할 수 있다. 

참고로 이 패턴을 사용하면 `Repository`나 `EntityManager`를 사용할 필요가 없다.

비교적 간단해서 작은 서비스에서 유지보수하면서 사용하기 좋다.

```ts
// src/entity/User
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  isActive: boolean

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany()
  }
}

// src/service/user
import { User } from 'src/entity/User'

const john = await User.findByName('John', 'Doe')
```

### Data mapper
`Repository`를 이용해 객체를 crud한다. 위 패턴과 차이점은 모델에 접근하는 방식이 아닌 `Repository`에서 데이터에 접근한다는 점이다.

큰 서비스에서 유지보수하기에 용이하다.


```ts
// src/service/user
import { EntityRepository, Repository } from 'typeorm'
import { User } from 'src/entity/User'

@EntityRepository()
export class UserRepository extends Repository<User> {
  findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', {firstName})
      .andWhere('user.lastName = :lastName', {lastName})
      .getMany()
  }
}

const userRepository = connection.getCustomRepository(UserRepository)
const john = await userRepository.findByName('John', 'Doe')
```

## 환경변수 세팅