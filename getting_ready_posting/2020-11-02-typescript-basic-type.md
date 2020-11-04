---
layout: post
title: Typescript 기본 타입 마스터하기
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
  - [boolean](#boolean)
  - [number](#number)
  - [string](#string)
  - [array](#array)
  - [tuple](#tuple)
  - [enum](#enum)
  - [any](#any)
  - [void](#void)
  - [null, undefined](#null-undefined)
  - [never](#never)
  - [object](#object)

## 기본 타입

javascript의 원시타입인 `number`, `string`, `object`, `undefined`, `null`, `boolean`, `symbol`을 확장해서 사용할 수 있을 뿐만 아니라 typescript에서 추가로 지원하는 타입들이 있다.

`symbol`은 유니크한 `object`의 property를 만들 수 있는 원시 데이터 타입 중에 하나로 아래와 같이 사용할 수 있다.

```ts
const obj = {}
obj[Symbol('key')] = 1
console.log(obj) // { [Symbol(key)]: 1 }

obj[Symbol('foo')] = 2
console.log(obj) // { [Symbol(key)]: 1, [Symbol(foo)]: 2 }
```

### boolean

### number

### string

### array

배열은 제네릭 배열 타입을 사용할 수도 있다. 참고로 `null`, `undefined`는 모든 타입에서 유효한 값이라 할당하는 것을 막을 수 없다. tsconfig 파일에서 `strictNullChecks` 옵션을 추가하면 `null`, `undefined`가 할당되는 것을 막을 수는 있다.

```ts
// general way
let list1: number[] = [1, 2, 3]

// way using generic
let list2: Array<number> = [1, 2, 3]

list2.push(true) // error
list2.push('foo') // error
list2.push({}) // error

list2.push(null) // ok
list2.push(undefined) // ok

console.log(list2) // [1, 2, 3, null]
```

### tuple

`tuple` 타입을 사용하면 요소의 타입과 개수가 고정된 배열을 표현할 수 있다. `tuple` 내 멤버를 수정 및 삭제하는 것이 불가능하다. 하지만 덮어쓰기까지 불가능한 것은 아니어서 재할당이 가능하다.

```ts
let tuple: [string, number]

tuple = ['hello', 10] // ok
tuple = [10, 'hello'] // error
tuple = ['foo', 2] // ok
```

정해진 인덱스 외의 다른 인덱스에 있는 요소에 접근하면 오류가 발생한다.

```ts
console.log(tuple[0]) // ok
console.log(tuple[1]) // ok

console.log(tuple[2]) // error
```

### enum

`enum` 타입은 명시적으로 지정하지 않아도 `0`부터 시작해 멤버들의 번호를 메길 수 있다. 아래처럼 첫번째 멤버에 `1`을 부여한다면 그 다음 멤버의 값은 `2`가 되는 식으로 순서대로 값이 올라간다.

```ts
enum Color { 
    Red = 1, 
    Green, // 2 
    Blue // 3
}

let c: Color = Color.Green // 2

enum Color2 {
    Red = 1,
    Green, // 2
    Blue = 4
}
let c2: string = Color[4] // Blue
```

다국어 지원을 위해 언어 코드를 저장할 변수를 만드는 상황을 가정해보자. 아래처럼 **`string`과 `number`를 이용한 타입**인 리터럴 타입을 이용할 수도 있을 것 같다. 리터럴 타입은 문자열로만 이뤄진 유니언 타입이라고 이해하면 될 것 같다.

```ts
type LanguageCode = 'ko' | 'en' | 'zh'

const code: LanguageCode = 'ko' // ok
```

하지만 국가코드가 어떤 언어를 가리키는지 외우지 쉽지 않기때문에 상수를 아래처럼 여러개 둬서 문제를 해결할 수는 있다.

```ts
const korean = 'ko'
const english = 'en'
const chinese = 'zh'

type LanguageCode = typeof korean | typeof english | typeof chinese

const code: LanguageCode = korean // ok 
```

종래에는 리터럴의 타입과 값에 이름을 붙여 가독성을 올리기 위해 `enum` 타입을 사용할 수 있다.

```ts
enum LanguageCode {
    korean = 'ko',
    english = 'en',
    chinese = 'zh'
}

const code: LanguageCode = LanguageCode.korean // korean
```

`enum`은 그 자체가 `object`라고 생각하면 된다. 하지만 타입이기때문에 `keys()`, `values()`와 같은 멤버는 가지고 있지 않아 키와 값을 알아내려고 하면 에러가 발생한다.

```ts
Object.keys(LanguageCode) // error
Object.values(LanguageCode) // error
```

아래와 같은 object라고 생각하면 좋다.

```ts
const languageCode = {
    korean: 'ko',
    english: 'en',
    chinese: 'zh'
}
```

그냥 `object`와의 차이점은 아래와 같다.

- `object`는 외부에서 속성을 변경할 수 있지만, `enum`은 외부에서 속성을 변경할 수 없다.
- `object`의 속성은 모든 원시타입을 다 사용할 수 있지만, `enum`은 리터럴 타입을 사용해야 한다.

요약하자면 같은 종류를 나타내는 여러 숫자나 문자열에 이름을 붙여서 가독성을 높이고자 한다면 사용할 수 있는 타입이 `enum`이다. 그 외의 경우는 상수, 배열, 객체 등을 사용하면 된다.

객체 리터럴에 `const assertion`을 하면 객체를 `enum`과 비슷하게 사용할 수 있다.

```ts
const languageCode = {
    korean: 'ko',
    english: 'en',
    chinese: 'zh'
} as const

type LanguageCode = typeof languageCode[keyof typeof languageCode]

const code: LanguageCode = languageCode.korean // ko
```

### any

타입의 일부만 알고 전체를 알지 못할 때 사용하면 유용하다. javascript를 typescript로 빠르게 포트할 때에도 유용하다.

### void

`any`는 어떤 타입이라도 리턴할 수 있다면, `void`는 어떤 타입도 리턴하지 않을 때 사용한다. 보통 함수 내에 `console.log()`를 사용하는 경우 리턴값이 `void`이다.

### null, undefined

`null`은 개발자가 의도해 의미없는 어떤 값을 넣은 것이고, `undefined`는 개발자가 의도하지 않아서 값이 들어가지 않은 것을 말한다.

다시 말해, `null`은 선언, 등록하는 값이고, `undefined`는 미리 선언된 전역변수이다. 위같은 차이가 있음에도 `==` 연산자를 사용하면 두 값이 같다고 나온다. 이를 구별하기 위해 `===`를 사용한다.

특별한 경우가 아니고는 함수나 변수에 직접 사용하는 타입은 아니다. 제네릭과 함께 사용하는 유틸리티 타입 중 `Nullable`이나 `NonNullable`같은 타입을 만들어 사용할 수 있다. 구현부는 생략하고, 아래와 같이 사용할 수 있다.

`NonNullable`은 `null`이나 `undefined`를 제외하고 리턴하고, `Nullable`은 `null`이나 `undefined`도 리턴을 정상적으로 하는 타입이다.

```ts
type T0 = NonNullalbe<string | number | undefined> // string | number
type T1 = NonNullable<string[] | null | undefined> // string[]

type T2 = Nullable<string | null> // string | null
```

### never

`never` 타입은 절대 발생할 수 없는 타입을 나타낸다. 함수 내에서 항상 오류를 발생시키는 경우나 무한루프에 빠지는 경우 `never` 타입으로 추론한다.

```ts
const foo = () => {
    throw new Error('error ocurred')
}

const bar = () => {
    while (true) {}
}
```

### object

`object` 타입 내부 타입을 선언할 때는 보통 `type alias`를 사용하기보다는 `interface`를 사용하는 편이다. 아래와 같이 동물이란 `object` 타입의 타입을 가져다 쓸 수 있다. 

```ts
type Animal = {
    feet: number
    tail?: number
    head: number
}

const human: Animal = {
    feet: 4,
    head: 1
}
```

동물을 좀 더 세세하게 조류, 포유류 등으로 나눠서 타입을 생산하려고 한다. 아래와 같이 type alias만 가지고 작성할 수도 있다. 

```ts
type Mammalia = {
    feet: number
    tail?: boolean
    head: number
}

type Reptiles = {
    feet: number,
    tail: boolean
    head: number
    sacle: boolean
}
```

위와 같이 일일이 object 내부 타입을 선언하다보면 코드 생산성이 떨어지기때문에 클래스처럼 확장가능한 `interface`를 사용하눈 편이다.

```ts
interface Animal {
    feet: number
    tail?: boolean
    head: number
}

interface Mammalia extends Animal {
}

interface Reptiles extends Animal {
    tail: boolean
    scale: boolean
}
```