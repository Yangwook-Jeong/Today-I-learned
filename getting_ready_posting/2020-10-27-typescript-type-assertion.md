---
layout: post
title: 
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover:
---

## 목차
- [목차](#목차)
- [들어가기 앞서](#들어가기-앞서)
- [intersection type vs. union type](#intersection-type-vs-union-type)
  - [intersection type](#intersection-type)
  - [union type](#union-type)
- [type alias vs. interface](#type-alias-vs-interface)
  - [type alias](#type-alias)
- [type assertion](#type-assertion)

## 들어가기 앞서

javascript에서는 정상적으로 동작하는 코드를 typescript에서 돌리는 경우 컴파일 타임에 

<br>

---

<br>

## intersection type vs. union type

### intersection type

다양한 타입을 하나로 결합해서 모든 기능을 갖춘 단일 타입을 얻는 방식이다. 교차 타입을 통해 서로 다른 두 객체를 섞어 두 객체의 기능을 모두 갖춘 하나의 객체를 만드는 믹스인을 구현할 수 있다.

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}

  for (let id in first) {
    (<any>result)[id] = (<any>first)[id]
  }

  for (let id in second) {
    if (!result.hasOwnProperty(id)) {
      (<any>result)[id] = (<any>second)[id]
    }
  }

  return result
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(name: string): void
}
class ConsoleLogger implements Loggable {
  log(name) {
    console.log(name)
  }
}

const foo = extend(new Person('Foo'), new ConsoleLogger())
const n = foo.name
foo.log(foo.name)
```

### union type

교차 타입과는 동작이 약간 다르다. 

<br>

---

<br>


## type alias vs. interface

interface를 알고 있다면 interface와 비슷하다는 생각을 할 수도 있다. 

- 마우스를 토글하면 인터페이스는 어디서나 사용되는 새로운 이름을 만들어서 보여주고, 별칭은 세부 타입까지 보여준다.
- 인터페이스는 확장, 구현 등을 클래스에서처럼 할 수 있지만, 별칭은 불가능하다.

### type alias

아래와 같이 사용이 가능하다. `Alias`에 마우스를 올리면 `type Alias = { num: number }`가 나온다.

```ts
type Alias = { num: number }

function aliased(arg: Alias): Alias
```

아래와 같이 사용이 가능하다. `Interface`에 마우스를 올리면 `interface Interface`가 나온다. 

```ts
interface Interface {
  num: number
}

function interfaced(arg: Interface): Interface
```

가장 중요한 차이점으로는 확장성이 있다. `interface`만 `extends`, `implements` 등 키워드를 사용해서 확장, 구현할 수 있다. `interface`만 쓰는 것을 선호하는 경우도 있다.

```ts
type B = { num: number }
interface C { num: number }

interface A extends B {} // error
interface A extends C {} // ok

type B extends C {} // error
type B implements C = {} // error
```

<br>

---

<br>

## type assertion

```ts
// using angle bracket
const square = <Square>{}

// using `as` 
const square = {} as Square
```

assertion이 안좋은 이유