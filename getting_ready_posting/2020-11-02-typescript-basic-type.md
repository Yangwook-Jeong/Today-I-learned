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
- [기본 타입](#기본-타입)

## 기본 타입

### boolean

### number

### string

### array

배열은 제네릭 배열 타입을 사용할 수도 있다.

```ts
let list: Array<number> = [1, 2, 3]
```

### tuple

튜플 타입을 사용하면 요소의 타입과 개수가 고정된 배열을 표현할 수 있다.

```ts
let x: [string, number]

x = ['hello', 10] // ok
x = [10, 'hello'] // error
```

### enum

열거 타입은 값의 집합에 더 나은 이름을 붙일 수 있지만 퍼포먼스 이슈가 있으니 사용을 지양하는 것이 좋다.

```ts
enum Color { 
    Red = 1, 
    Green, 
    Blue 
}

let c: Color = Color.Green // ok
```

### any

### void

### null, undefined

### never

never 타입은 절대 발생할 수 없는 타입을 나타낸다.

### object

<br>

---

<br>

## interface

## 
