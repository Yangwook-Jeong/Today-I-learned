join
====

## 기본형
```javascript   
let names = ['a', 'b', 'c'];

// 보통방식
console.log(`${names[0]} ${names[1]} ${names[2]}`); // a b c

// join방식
console.log(names.join(' ')); // a b c
console.log(names.join('-')); // a-b-c
console.log(names.join('')); // abc

// 기본구분자는 콤마
console.log(names.join()); // a,b,c

// 다른 메소드와 같이 사용된 예제
let name = 'a b';
let upper = name.split(' ').map(x => x.charAt(0)
    .toUpperCase()+x.slice(1))
    .join(' ');

 console.log(upper); // A B
```
배열의 모든 요소를 연결해 하나의 문자열로 만들어줌. 인자로 문자열을 전달하면 구분자로 요소들을 연결시킴. 배열값이 null, undefined이면 빈문자열을 return한다.