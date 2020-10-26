---
layout: post
title: Exceljs API와 커스텀 유틸함수로 생산성 올리기
author: Yangeok
categories: Node.js
date: 2020-10-01 09:00
comments: true
tags: [excel]
cover:
---

## 목차
- [목차](#목차)
- [generic이란](#generic이란)
- [generic을 사용하는 이유](#generic을-사용하는-이유)
- [generic 기본 문법](#generic-기본-문법)
- [generic 고급 문법](#generic-고급-문법)
  - [제네릭 제약](#제네릭-제약)
  - [명시적 배열 지원](#명시적-배열-지원)
- [generic 예제](#generic-예제)

## generic이란

다양한 유형의 타입을 요소에 전달해 코드의 추상화, 재사용을 용이하게 할 수 있는 문법이다. 특정 타입을 위해 만들어진 클래스나 함수를 다른 타입을 위해 재사용할 수 있도록 도와준다. 함수, 인터페이스, 클래스에 적용이 가능하다. 

## generic을 사용하는 이유

데이터를 타입에 좀 더 안전한 방식으로 할당하는데 큰 유연성을 제공한다. 하지만 추상화가 의미 없는 경우에는 사용하지 않는 것이 좋다. 일반적으로 제네릭 사용 여부를 결정할 때는 아래와 같은 기준을 충족할 수 있어야 한다.

- 함수, 인터페이스, 클래스가 다양한 데이터 유형에서 작동할 때
- 함수, 인터페이스, 클래스가 여러 위치에서 해당 데이터 유형을 사용하는 경우

다만 프로젝트 초기에는 제네릭을 사용할 필요가 없을지도 모른다. 하지만 프로젝트가 점점 고도화 혹은 기능이 확장되는 경우 리팩토링 과정에서 제네릭을 도입한다면 더 깨끗한 코드베이스를 만들 수 있기 때문에 사용한다. 

## generic 기본 문법



## generic 고급 문법

### 제네릭 제약

`.length` 속성을 사용할 수 있다고 가정하는 문자열이나 배열을 사용하는 아래와 같은 경우에 에러가 발생한다.

```ts
function identity<T>(arg: T): T {
    console.log(arg.length)

    return arg
}
```

`T`가 `.length` 속성을 가지고 있다는 것을 컴파일러는 알지 못한다. 타입 변수에 필요한 속성이 있는 경우 해당 속성을 인터페이스로 확장하는 방법으로 해결이 가능하다. `T`는 화살 괄호 안에 `extends` 키워드 뒤에 유형을 제한해 사용한다. `Length`라는 인터페이스 내에서 속성을 구현하는 모든 유형을 지원한다고 컴파일러에게 명시한다. 컴파일러는 `.length`를 지원하지 않는 유형으로 함수를 호출할 때 알려줄 수 있다. 


```ts
interface Length {
    length: number
}

function identity<T extends Length>(arg: T): T {
    console.log(arg.length)

    return arg
}
```

제약조건을 쉼표로 구분해 여러 유형에서 확장할 수도 있다.

```ts
function identity<T extends Length, Type2, Type3>(arg: T): void {}
```

### 명시적 배열 지원

###


## generic 예제

자료구조에서 사용할 수 있다. 

```ts
class Queue {
    protected data: any = []

    constructor () {}

    push (item: any): void {
        this.data.push(item)
    }

    pop (): void {
        return this.data.shift()
    }
}

const queue = new Queue()

queue.push(0)
queue.push('1')

console.log(queue.pop().toFixed()) // 0
console.log(queue.pop().toFixed()) // Runtime error
```

`data`는 타입이 `any`이기 떄문에 어떤 타입이든 추가할 수 있지만 배열 내부 타입이 동일하지 않은 문제가 발생한다. 이런 경우에는 상속을 통해 해결하는 방법이 있다.

```ts
class NumberQueue extends Queue {
    push (item: number) {
        super.push(item)
    } 

    pop (): number {
        return super.pop()
    }
}
```

코드 양이 늘어나보니 아래처럼 제네릭을 사용할 수 있다. 제네릭은 선언 시점이 아니라 생성 시점에 타입을 명시해 타입을 다양하게 사용할 수 있다는 것을 알 수 있다.

```ts
class Queue<T> {
    protected data: Array<T> = []

    push (item: T) {
        this.data.push(item)
    }

    pop (): T {
        return this.data.shift()
    }
}

const numberQueue = new Queue<number>()
const stringQueue = new Queue<string>()
```

마찬가지로 함수에서도 사용해 컴파일 타임에 에러를 체크해줄 수 있다.

```ts
// using const
const reverse = <T> (items: T[]): T[] => {
    return items.reverse()
}

// using function declaration
function reverse<T> (items: T[]): T[] {
    return items.reverse()
}

const numberArr = [1, 2, 3, 4, 5]
const objectArr = [{ name: 'foo' }, { name: 'bar' }]

console.log(reverse(numberArr)) // [5, 4, 3, 2, 1]
console.log(reverse(objectArr)) // [{ name: 'bar' }, { name: 'foo' }]
```

인터페이스에도 아래와 같이 제네릭을 사용할 수 있다.

```ts
interface Identities<V, W> {
    foo: V
    bar: W
}

function identities<T, U> (arg1: T, arg2: U): Identities<T, U> {
    let identities: Identities<T, U> = {
        foo: arg1,
        bar: arg2
    }

    return identities
}
```