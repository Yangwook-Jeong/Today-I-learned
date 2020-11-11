---
layout: post
title: Typescript 제네릭 마스터하기
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover:
---

## 목차
- [목차](#목차)
- [제네릭이란?](#제네릭이란)
- [문법](#문법)
  - [타입상속](#타입상속)
  - [오버로드](#오버로드)
  - [2개 이상 타입 변수 선언](#2개-이상-타입-변수-선언)
  - [룩업 타입](#룩업-타입)
  - [조건부 타입](#조건부-타입)

## 제네릭이란?

특정 타입을 위해 만들어진 함수나 클래스를 여러 타입에서 사용할 수 있게 재사용성을 올려주는 문법이다. 

`any` 타입만 사용한다면 타입 안정성이 떨어져 의도치 않은 사이드이펙트가 발생할 수 있다. 그렇다고 한 가지 타입으로만 함수나 클래스를 정의하면 지정된 타입 외의 다른 타입은 받을 수 없기때문에 사용한다. 다시 말하자면 아래와 같은 특징을 갖는다.

- 컴파일시 타입 안정성을 보장해준다. 
- 타입캐스팅 관련 코드를 제거할 수 있다.

## 문법

### 타입상속

특정 타입을 `<T extends number>`의 방식으로 상속할 수 있다.

```ts
const add1 = <T extends number>(a: T, b: T) => {
  return a + b
}
function add2(a: number, b: number) {
  return a + b
}
function add3<T extends number>(a: T, b: T) {
  return a + b
}
function add4<T extends string | number>(a: T, b: T) {
  return a + b // error: Operator '+' cannot be applied to types 'T' and 'T'.
}

console.log(add1(1, 2)) // 3
console.log(add2(1, 2)) // 3
console.log(add3(1, 2)) // 3
console.log(add4(1, '2')) // error
```

제네릭 상속때는 `extends` 예약어만 사용할 수 있다. 

```ts
const add1 = <T implements number>(a: T, b: T) => { // error
  return a + b
}
```

### 오버로드

함수를 오버로딩하면 위에서 에러를 뿌렸던 `T + T`의 매개변수 연산이 가능해진다.

```ts
function add<T>(a: T, b: T): T
function add<T>(a: any, b: any){ 
  return a + b
}

console.log(add(1, 2)) // 3
console.log(add(1, '2')) // error
```

### 2개 이상 타입 변수 선언

1개를 선언하듯이 2개를 연달아 선언하면 된다. 우선 `set` 함수를 보면 1번 선언한 다음, 오버로딩할 때 파라미터에 `any`를 줘도 토글해보면 `T`, `T2` 타입으로 보이는 것을 확인할 수 있다.

실행부에서 제네릭 angle bracket 안에 유니언 타입도 사용가능한 것을 알 수 있다.

```ts
let obj = {}

function set<T, T2>(a: T, b: T2): T
function set(key: any, value: any){ 
  return obj[key] = value
}

set<string, string|number>('1', 1)
console.log(obj) // { '1': 1 }
```

`get` 함수도 마찬가지로 오버로딩할때 파라미터의 타입이 `any`지만 토글해보면 `T` 타입인 것을 확인할 수 있다. 

```ts
function get<T, T2>(key: T): T2
function get(key: any) {
  return obj[key]
}

console.log(get<string, number | string>('1')) // 1
```

### 룩업 타입

저번에 다룬 const assertion으로 열거 타입과 비슷하게 만든 타입과 비교해볼 수도 있다.

```ts
// const assertion
const languageCode2 = {
  korean: 'ko',
  english: 'en',
  chinese: 'zh'
} as const

type LanguageCode2 = typeof languageCode2[keyof typeof languageCode2]
const code2: LanguageCode2 = languageCode2.korean // ko

// lookup type
interface Language {
  ko: number
  en: number
  zh: number
}

type LanguageCode = keyof Language
const code: LanguageCode = 'ko'
```

아래 함수에서 2번째 파라미터를 객체의 key로 제한하고싶은 경우에는 아래와 같이 설계할 수 있다.

```ts
function getItem<T, K extends keyof T>(object: T, key: K) {
  return object[key]
}
function getItem2(object: object, key: string) {
  return object[key]
}

const obj2 = { a: 1, b: 2, c: 3 }

console.log(getItem(obj2, 'a')) // 1
console.log(getItem2(obj2, 'a')) // 1
```

### 조건부 타입

타입을 결정하는 새로운 방법으로 아래와 같은 구문을 사용한다. `T`가 `U`에 할당 가능한 타입이면 `X`타입을, 아니라면 `Y`타입을 반환한다.

```ts
T extends U ? X : Y
```

실제 인터페이스를 사용해 유용성 없어보이는 아래와 같은 예제를 쓸 수도 있다.

```ts
interface Human {
  intro(): void
}

interface Student extends Human {
  study(): void
}

type Person = Student extends Human ? number : string

const me: Person = 'foo' // error
const you: Person = 10 // ok
```

조건부 타입을 삼항연산자로만 보지 않고 오로지 타입끼리 조건에 따라 결정한다고 이해하는 것이 중요하다. 아래처럼 함수 오버로드를 통해 여러 타입을 인자로 받는 함수와 조건부 타입을 활용해 더 간결한 코드를 작성한 예시를 볼 수 있다.

```ts
// function overloading
function getPerson(name: string): string 
function getPerson(id: number): string
function getPerson(property: any): string { 
  if (typeof property == 'string') { 
    return "string type" 
  } else if (typeof property == 'number') { 
    return "number type"
  } 
  return 'another type' 
} 

console.log(getPerson(10)) // number type
console.log(getPerson('foo')) // string type

// conditional type
type IdOrName<T extends number | string> = T extends number ? number : string
function getPerson2(idOrName: IdOrName<number|string>): string {
  if (typeof idOrName === 'string') {
    return 'string type'
  } else if (typeof idOrName === 'number') {
    return 'number type'
  }
  return 'another type'
}

console.log(getPerson2(10)) // number type
console.log(getPerson2('foo')) // string type
```