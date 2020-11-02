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
- [type alias vs. interface](#type-alias-vs-interface)
- [type assertion](#type-assertion)

## 들어가기 앞서

typescript 코드 생산성을 높이기 위한 고급 타입들 중 일부를 소개하려고 한다. 기본 타입으로 해결하기에 무리가 있는 코드들을 하기 타입들을 사용해서 해결할 수 있다.

<br>

---

<br>

## intersection type vs. union type

다양한 타입을 하나로 결합해서 모든 기능을 갖춘 단일 타입을 얻는 방식이다. 교차 타입을 통해 서로 다른 두 객체를 섞어 두 객체의 기능을 모두 갖춘 하나의 객체를 만드는 믹스인을 구현할 수 있다.

-  믹스인: 다중 상속 대신 사용하는 방식으로 상속을 사용해 새로운 클래스를 선언하지 않으면서 클래스나 인터페이스를 변수에 포함시키고 싶은 경우에 사용한다.

아래의 `(<any>result)`는 타입 단언으로 아래에서 언급할 예정이다.

```ts
function extend<T, U>(first: T, second: U): T & U {
  let result = <T & U>{}

  for (let id in first) (<any>result)[id] = (<any>first)[id]
  for (let id in second) (<any>result)[id] = (<any>second)[id]

  return result
}

class Person {
  constructor(public name: string) {}
}
interface Loggable {
  log(name: string): void
}
class ConsoleLogger implements Loggable {
  log(name: string) {
    console.log(name)
  }
}

const foo = extend(new Person('Foo'), new ConsoleLogger())
const n = foo.name
foo.log(foo.name)
```

교차 타입은 모든 기능을 갖춘 단일 타입을 구성한다면 교차 타입과는 동작이 약간 다르게 타입들의 공통적인 멤버에만 접근이 가능하다. `|`을 구분자로 사용한다. 

```ts
type StrOrNum = string | number

let sample: StrOrNum
sample = 123 // ok
sample = '123' // ok
sample = true // error
```

보통 타입이 `string[] | string`같이 파라미터로 들어가는 경우에 사용할 수 있다. typescript지만 분기문으로 타입 가드를 치는 예시이다.

```ts
function formatCommandline(command: string[] | string) {
    let line = ''
    if (typeof command === 'string') {
        line = command.trim()
    } else {
        line = command.join(' ').trim()
    }
    return line
}
```

아래와 같은 코드로 둘을 비교해볼 수 있다. `Employee.age`는 `string`이고, `Person.age`는 `number` 타입으로 믹스인한 객체에서 `age`는 유니언 타입에서는 `string | number`가 된다. 

```ts
interface Animal {
  kind: string;
}
interface Person {
  firstName: string;
  lastName: string;
  age: number;
}
interface Employee {
  employeeCode: string;
  age: string;
}

// using union type
let employee: Animal | Person | Employee = {
  kind: 'human',
  firstName: 'Jane',
  lastName: 'Smith',
  age: 20  
}

// using intersection type
let employee: Animal & Person & Employee = {
  kind: 'human',
  firstName: 'Jane',
  lastName: 'Smith',
  age: 20
}
```

반면에 교차 타입에서는 아래와 같은 에러가 발생한다.

> Type 'number' is not assignable to type 'never'.  
> The expected type comes from property 'age' which is declared here on type 'Animal & Person & Employee'

`Person`, `Employee`간에 프로퍼티가 서로 다른 타입을 가지고 있어서 컴파일러가 해석할 수 없는 경우 `number`와 `string` 둘 중 어느 타입을 써야할지 몰라서 `never` 타입을 리턴한 경우이다.

<br>

---

<br>


## type alias vs. interface

타입 별칭은 인터페이스를 알고 있다면, 인터페이스와 비슷하다고 생각을 할 수 있지만 아래와 같은 차이가 있다.

- 마우스를 토글하면 인터페이스는 어디서나 사용되는 새로운 이름을 만들어서 보여주고, 별칭은 세부 타입까지 보여준다.
- 인터페이스는 확장, 구현 등을 클래스에서처럼 할 수 있지만, 별칭은 불가능하다.

아래와 같이 사용이 가능하다. `Alias`에 마우스를 올리면 `type Alias = { num: number }`가 나온다.

```ts
type Alias = { 
  num: number
}

function aliased(arg: Alias): Alias {
    return arg
}
```

아래와 같이 사용이 가능하다. `Interface`에 마우스를 올리면 `interface Interface`가 나온다. 

```ts
interface Interface {
  num: number
}

function interfaced(arg: Interface): Interface {
  return arg
}
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

typescript는 추론된 타입을 overriding하는 기능을 제공한다. 컴파일러에게 내가 사용하는 타입은 이것이 확실다하고, 내가 하는게 맞다고 알려주는 역할을 한다. 보통 javascript 코드를 typescript로 포트할 때 사용할 수 있다. 

아래같은 경우는 javascript에서는 에러가 발생하지 않지만 typescript에서는 객체 안에 들어있지 않은 property라서 에러가 발생한다.

```ts
const foo = {}
foo.bar = 123 // error
foo.bas = 'hello' // error
```

`foo`는 `{}`라고 컴파일러가 추론했기 때문에 `{}`는 property가 전혀 없어서 발생한 에러이다. 타입 단언으로 간단하게 에러를 해결할 수 있다.

```ts
interface Foo {
    bar: number
    bas: string
}

const foo = {} as Foo
foo.bar = 123 // ok
foo.bas = 'hello' // ok
```

타입 단언은 아래와 같이 2가지 방법이 있다.

```ts
interface Square {
    width: number
    height: number
}

// using angle bracket
const square1 = <Square>{}

// using `as` 
const square2 = {} as Square
```

위의 방법은 `<foo>`는 jsx에서 사용하는 문법이라 코드의 일관성을 위해 `as foo`을 추천한다. 타입 캐스팅과 타입 단언은 엄밀히 따지자면 다르다. 타입 캐스팅은 런타임에 실행되며, 타입 단언은 컴파일타임에 실행되는 차이점이 있다.

javascript에서 typescript로 포트할 때 손쉽게 포트할 수 있게 도와주는 매직키워드와도 같아보였다. 인터페이스에 있는 property를 추가하는 것을 아래처럼 까먹을 수 있다는 단점이 있으니 조심해서 사용해야 한다. 이중 단언은 타입 단언을 에러때문에 1번 더 래핑하고 싶은 경우에 사용한다. `unknown`이나 `any`를 사용하는데 아주 안전하지 않은 방법이니 사용을 지양해야 한다.

에러에서는 다음과 같이 말한다. `Event` 타입을 `HTMLElement`로 변경하는데 사용자의 실수가 있을 수 있다고, 의도한 바라면 `unknown`으로 타입 단언한 다음 한 번 더 해야한다고 명시한다.

> Conversion of type 'Event' to type 'HTMLElement' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

```ts
// using valid type assertion
function handler1 (event: Event) {
    // let element = event as MouseEvent // ok
    let element = event as KeyboardEvent // ok
}

// using type assertion
function handler2 (event: Event) {
    let element = event as HTMLElement // error
}

// using double assertion
function handler3 (event: Event) {
    let element = event as unknown as HTMLElement // ok
}
```