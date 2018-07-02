반복문 (Loop)
====

## for
```javascript
for (let i = 0; i < 10; i++) { // (초기값; 조건식; 증감식)
    console.log(i);
}
```
반복횟수를 정할 수 있기 때문에 몇번 반복될지 알때 사용함.

### for in문
```javascript
const object = {1 :  'a', 2 : 'b', 3 : 'c', 4 : 'd'}; // 객체
for( let i in object ) {
	console.log(object[key]); // a, b, c, d 속성값 출력
	console.log([key]); // ['1'], ['2'], ['3'], ['4'] 속성키 출력
}

const array = ['a', 'b', 'c', 'd']; // 배열
for( let i in array ) {
	console.log(array[i]); // a, b, c, d 속성값 출력
	console.log([i]); // ['0'], ['1'], ['2'], ['3'] 인덱스 출력
}
```
객체가 반복될 때 사용한다. 배열에서도 사용할 수 있다. 

### for of문
```javascript
const array = ['a', 'b', 'c', 'd']; // 배열
for ( let i of array ) {
	console.log(array[i]); // undefined, undefined, undefined, undefined
	console.log([i]); // ['a'], ['b'], ['c'], ['d'] // 배열값 출력
}

const object = {1 :  'a', 2 : 'b', 3 : 'c', 4 : 'd'}; // 객체
for ( let i of object ) {
	console.log(obejct[i]); 
	console.log([i]); // TypeError: object is not iterable
}
```
배열이 반복될 때 사용한다. 객체는 사용할 수 없고 사용하면 ```TypeError```를 출력한다. for in문의 단점을 보완했으며 forEach문에서 지원하지 않는 break, continue, return문 사용 가능함.

for of문은 ES6에서 새로 나온 문법이다. forEach에서 콜백함수를 사용해야 하는 불편함을 없애기 위해 나왔다. for in문이랑 작성하는게 비슷해서 쓰기 훨씬 편한 것같다.

### for문 성능 향상패턴
```javascript
for (let i = 0, max = obj.length; i < max; i++) {
    // 핸들링 코드
}
```
html collection 순회처리 시에 속도향상이 가능하다.

## while
```javascript
let i = 0; // 초기값
while (i < 10) { // (조건식)
    console.log(i);
    i++; // 증감식
}
```
조건밖에 없기 때문에 몇번 반복될지 정확히 모를때 사용함.

### break, continue
```javascript

```

## do while
```javascript
let i = 0; // 초기값
do {
    console.log(i);
    i++; // 증감식
} while ( i<10 ) // (조건식)
```
내용을 먼저 실행한 다음 조건을 비교함. 때문에 최소 1번은 실행됨.