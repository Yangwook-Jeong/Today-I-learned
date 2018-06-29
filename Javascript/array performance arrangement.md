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
reduce는 javascript 배열 메소드중 가장 활용도가 높다.

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
중복되는 원소의 개수를 계산하는 함수. 배열의 첫번째 순회때 값은 initialValue, 즉 {}이다. pre.a = 1이 되기 때문에 ```{ a: 1 }```을 return한다. 두번째 순회때 pre의 값은 앞서 전달받은 ```{ a: 1 }```이고, val은 배열의 두번째 값인 ```data[1]```인 'b'이다.     

```javascript
consol.log(arr);
['a', 'b', 'b', 'c', 'c', 'c']

console.log(pre[val]);
console.log(pre);
console.log(val);
console.log(idx);
1 // pre[val]
{ a: 1 } // pre
a // val
0 // idx

1
{ a: 1, b: 1 }
b
1

2
{ a: 1, b: 2 }
b
2

1
{ a: 1, b: 2, c: 1 }
c
3

2
{ a: 1, b: 2, c: 3 }
c
4

3
{ a: 1, b: 2, c: 3 }
c
5
```
이해 안가는부분.

### 패턴4
```javascript
let data = ['a', 'b', 'b', 'c', 'c', 'c']
let reducer = function(pre, val, idx, arr) {
    if (pre.hasOwnProperty(val)) {
        pre[val] = pre[val] + 1;
    } else {
        pre[val] = 1;
    }
    return pre;
};
let initialValue = {};
let sum = data.reduce(reducer, initialValue); 
console.log(sum); // { a: 1, b: 2, c: 3 }
```
훨씬 이해가 쉽게가는데 코드기이가 길어졌다. return한 값들을 계속 전달받아서 사용할 수 있고, 최종적인 return값이 string, integer가 될 수도 있고 array, object가 될 수도 있다.

### initialValue 주의하기
```javascript

```
### flatten
```javascript

```
### flattenMap
```javascript

```
### reduceRight
```javascript

```
### reduce를 활용한 함수형 프로그래밍
```javascript

```

## 다른 메소드와 차이점
### reduce vs. map
```javascript
let data = [1, 2, 3, 4, 5]

let initialValue = [];
let reducer = (pre, val) => {
    pre.push(val*2);
    return pre;
}
let result = data.reduce(reducer, initialValue);
console.log(result); // [2, 4, 6, 8, 10]

let result2 = data.map(x => x*2);
console.log(result); // [2, 4, 6, 8, 10]
```
원래 배열 값들이 2배씩 커진 값을 return한다. map이 훨씬 짧고 직관적이다. 

### reduce vs. filter
```javascript
let data = [1, 2, 3, 4, 5]

let initialValue = [];
let reducer = (pre, val) => {
    if (val%2 != 0) {
        pre.push(val);
    }
    return pre;
}
let result = data.reduce(reducer, initialValue);
console.log(result); // [1, 3, 5]

let result2 = data.filter(x => x%2 != 0);
console.log(result2); // [1, 3, 5]
```
원래 배열 값들을 2로 나눈 나머지가 0이 아닌 값을 return한다. filter가 훨씬 적관적으로 보인다. 하지만 map과 filter를 동시에 작업해야 한다면 reduce로 하는게 훨씬 편할지도 모른다. 원래 배열 값들을 2로 나눈 나머지가0이 아닌 값들을 골라서 2배씩 한 배열을 return하고자 한다면 말이다.

### reduce vs. filter + map
```javascript
let data = [1, 2, 3, 4, 5]

let initialValue = [];
let reducer = (pre, val) => {
    if (val%2 != 0) {
        pre.push(val*2);
    }
    return pre;
}
let result = data.reduce(reducer, initialValue);
console.log(result); // [2, 6, 10]

let result2 = data.filter(x => x%2 != 0).map(x => x*2);
console.log(result2); // [2, 6, 10]
```
reduce는 배열을 1번만 순회하면 되지만, filter + map의 조합은 2번 순회해야 한다. filter + map이 더 직관적으로 보이지만, 함수 reducer로 로직이 빠져있는 reduce가 더 재사용성이 좋아보인다.

### getMean (평균 구하기)
```javascript
let data = [1, 2, 3, 4, 5]

let reducer = (pre, val, idx, arr) => {
    let sumOfPreAndVal = pre + val;
    if (idx === arr.length-1) { 
        return (sumOfPreAndVal) / arr.length; // 배열의 길이로 나눈다.
    }
    return sumOfPreAndVal;
};

let getMean = data.reduce(reducer, 0); // 초기값 셋팅하지 않아도 됨. 그러면 1이 pre로 넘어감.
console.log(getMean); // 3
```