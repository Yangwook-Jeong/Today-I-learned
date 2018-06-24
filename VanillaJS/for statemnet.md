반복문 (Loop)
====

# for in문
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


# for of문

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

배열이 반복될 때 사용한다. 객체는 사용할 수 없고 사용하면 ```TypeError```를 출력한다.

for of문은 ES6에서 새로 나온 문법이다. forEach에서 콜백함수를 사용해야 하는 불편함을 없애기 위해 나왔다. for in문이랑 작성하는게 비슷해서 쓰기 훨씬 편한 것같다.
