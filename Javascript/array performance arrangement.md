배열 처리 정리기법
==== 

## forEach
### 패턴1
```javascript
let data = [1, 2, 3, 4, 5]
let result = [];

data.forEach(i => {
    result.push(i-1); // 모든 원소값에서 1씩 감소
});
console.log(result); // [0, 1, 2, 3, 4]
```
### 패턴2
```javascript
let data = [1, 2, 3, 4, 5]

data.forEach((val, idx, arr) => { // 매개변수는 값, 인덱스, 배열
    data[idx] = val-1; // 모든 원소값에서 1씩 감소
});
console.log(data); // [0, 1, 2, 3, 4]
```
기존 배열을 가공해서 평균, 합계를 구할때 사용한다.

## map
```javascript
let data = [1, 2, 3, 4, 5]

let result = data.map(i => {
    return i-1; // 모든 원소값에서 1씩 감소
});
console.log(result); // [0, 1, 2, 3, 4]
```

새롭게 가공후 수정된 배열을 리턴할때 사용한다.

## filter
### 패턴1
```javascript
let data = [
    {name: "a", age: 1},
    {name: "b", age: 2},
    {name: "c", age: 3},
    {name: "d", age: 4},
    {name: "e", age: 5} 
]

let result = data.filter(i => {
    return i.age >= 3; // age가 3과 같거나 클때
});
console.log(result); 
// [ { name: 'c', age: 3 },
//   { name: 'd', age: 4 },
//   { name: 'e', age: 5 } ]
```

### 패턴2
```javascript
let data = [
    {name: "a", age: 1},
    {name: "b", age: 2},
    {name: "c", age: 3},
    {name: "d", age: 4},
    {name: "e", age: 5} 
]

let result = data.filter((i, idx, arr) => {
    return idx === 3 && i.age >= 3; // 인덱스가 3이고 age가 3과 같거나 클때
});
console.log(result); // [ { name: 'd', age: 4 } ]
```
```array.prototype.filer```을 통해 더 공부해보기.

## every
```javascript
let data = [
    {name: "a", age: 1},
    {name: "b", age: 2},
    {name: "c", age: 3},
    {name: "d", age: 4},
    {name: "e", age: 5} 
]

let result = data.every(i => {
    return i.age >= 3; // age가 3과 같거나 클때
});
console.log(result); // false
```
배열 내부를 순회하며 **조건을 만족하지 않는 값(return false)**이 발견되면 순회는 중단된다. 내부 원소 모두 만족해야 true를 출력한다.

## some
```javascript
let data = [
    {name: "a", age: 1},
    {name: "b", age: 2},
    {name: "c", age: 3},
    {name: "d", age: 4},
    {name: "e", age: 5} 
]

let result = data.some(i => {
    return i.age >= 3; // age가 3과 같거나 클때
});
console.log(result); // false
```
배열 내부를 순회하며 **조건을 만족하는 값(return true)**이 발견되면 순회는 중단된다. 내부원소 하나라도 만족하면 true를 출력한다.

## reduce
### 기본형
```javascript
arr.reduce(callback[, initialValue])
```
#### callback
* previousValue : 마지막 콜백에서 반환된 값이나 initialValue
* currentValue : 현재 배열내 처리되고 있는 값
* currentIndex : 현재 배열내 처리되고 있는 값의 인덱스
* array : reduce호출에 사용되는 배열

#### initialValue
callback의 첫번째 매개변수에 사용되는 디폴트 값 

### 패턴1
```javascript
let data = [1, 2, 3, 4, 5]
let sum = data.reduce((pre, val, idx, arr) => {
    return pre + val;
}); // initialValue가 없는 경우
console.log(sum); // 15
```
총 반복횟수는 4회.

### 패턴2
```javascript
let data = [1, 2, 3, 4, 5]
let sum = data.reduce((pre, val, idx, arr) => {
    return pre + val;
}, 10); // initialValue가 있는 경우
console.log(sum); // 25
```
initialValue때문에 총 반복횟수는 5회. 

### 패턴3
```javascript
let data = ['a', 'b', 'b', 'c', 'c', 'c']
let sum = data.reduce((pre, val, idx, arr) => {
    pre[val] = ++pre[val] || 1; 
    return pre;
}, {}); // 첫번쨰 매개변수 값은 빈 객체 
console.log(sum); // { a: 1, b: 2, c: 3 }
```
중복되는 원소의 개수를 계산하는 함수.

```javascript
console.log(pre[val]);
console.log(pre);
console.log(val);
1
{ a: 1 }
a
1
{ a: 1, b: 1 }
b
2
{ a: 1, b: 2 }
b
1
{ a: 1, b: 2, c: 1 }
c
2
{ a: 1, b: 2, c: 3 }
c
3
{ a: 1, b: 2, c: 3 }
c
```
이해 안가는부분.