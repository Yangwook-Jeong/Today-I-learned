---
layout: post
title: Javascript 심볼 타입 마스터하기
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover:
---

## 목차
- [목차](#목차)
- [심볼 타입이란?](#심볼-타입이란)
- [특징](#특징)
  - [고유한 값](#고유한-값)
  - [private 멤버](#private-멤버)
  - [문자열화](#문자열화)
- [용도](#용도)
  - [표준 object property로 사용](#표준-object-property로-사용)

## 심볼 타입이란?

심볼은 고유한 값을 만들어내기 위해 사용한다. 객체의 key로 사용할 경우 private 멤버 변수처럼 동작한다.

## 특징

### 고유한 값

심볼은 고유한 값이다. 따라서 내용이 같다고 심볼이 같지는 않다. 한 번 생성하면 절대 그 누구와도 같을 수가 없다.

```ts
const a = Symbol(123)
const b = Symbol(123)

const c = Symbol('123')
const d = Symbol('123')

console.log(a === b) // false
console.log(a == b) // false

console.log(c === d) // false
console.log(c == d) // false
```

### private 멤버

열거대상에서 제외된다. 심볼을 객체의 key로 사용하면 루프에서 사용할 수 없다. 

```ts
const obj = {
  [Symbol('0')]: true,
  '1': true,
  '2': true,
  [Symbol('3')]: true
}

console.log(obj) // { '1': true, '2': true, [Symbol(0)]: true, [Symbol(3)]: true }

const keys = []
for (let key in obj) {
  keys.push(key)
}

console.log(keys) // ['1', '2']
```

또한 객체를 콘솔에 찍어서 심볼의 존재를 확인할 수는 있다. 하지만 key를 심볼로 가진 객체의 멤버에는 접근하는 것이 불가능하다.

```ts
const obj = {
  [Symbol('0')]: true,
  '1': true,
  '2': true,
  [Symbol('3')]: true
}

console.log(obj) // { '1': true, '2': true, [Symbol(0)]: true, [Symbol(3)]: true }
console.log(obj[Symbol('0')]) // undefined
```

객체에 있는 key가 심볼인 멤버에 접근하려면 심볼인 key가 변수로 선언되어있어야 한다.

```ts
const NAME = Symbol('name')
const GENDER = Symbol('gender')

const obj = {
  [NAME]: 'John Doe',
  [GENDER]: 'male',
  age: 1
}

console.log(obj) // { age: 1, Symbol(name): 'John Doe', Symbol(gender): 'male' }
console.log(obj[NAME]) // 'John Doe'
```

위처럼 private 멤버에도 변수로 할당된 심볼이라면 접근이 가능하다. 하지만 콘솔에서 `NAME`, `GENDER`는 자동완성이 되지 않는다. 아래처럼 object의 key를 뽑아봐도 private 변수로 할당되는지라 `NAME`, `GENDER`는 노출되지 않는다. 

```ts
Object.keys(obj) // ['age']
```

private 멤버 변수도 가져올 수 있는 트릭이 있긴 하다. 권장하는 방법은 아니다.

```ts
Object.getOwnPropertySymbols(obj) // [Symbol(name), Symbol(gender)] 
Reflect.ownKeys(obj) // ['age', Symbol(name), Symbol(gender)]
```

### 문자열화

심볼로 전달된 인자가 object, array, function, symbol인 경우 아래와 같이 `toString()`을 호출한다.

```ts
Symbol({ a: 1 }) // Symbol([object Object])
Symbol(null) // Symbol(null)
Symbol(undefined) // Symbol()
Symbol([]) // Symbol()
Symbol([1, 2, 3, 4]) // Symbol(1, 2, 3, 4)
Symbol(() => console.log('foo')) // Symbol(() => console.log('foo'))

Symbol(true) // Symbol(true)
Symbol('1') // Symbol(1)
```

## 용도

### 표준 object property로 사용

프로그램 동작 중 namespace 충돌 위험 없이 object의 property의 key로 쓰기 위해 사용하는 값이다. 전역변수에 심볼로 된 namespace를 부여해서 멤버 변수 간 이름에서 충돌이 발생하지 않도록 할 수 있다. 아래와 같이 `Array.prototype.isArray`라는 메서드가 있지만 위 메서드를 덮어쓰지 않고 새로운 멤버로 할당할 때 사용할 수 있다.

```ts
const isArray = Symbol('isArray')
Array[isArray] = arg => (Object.prototype.toString.call(arg) === '[object Array]') ? true : false

console.log(Array.isArray([])) // true
console.log(Array[isArray]([])) // true

const concat = (x, y) => x.concat(y)
const flatMap = Symbol('flatMap')
Array.prototype._flatMap = function (f) {
  const fn = (f, xs) => xs.map(f).reduce(concat, [])
  return fn(f, this)
}

const data = [1, 2, 3, 4]
console.log(data.flatMap(i => i)) // [1, 2, 3, 4]
console.log(data._flatMap(i => i)) // [1, 2, 3, 4]
```