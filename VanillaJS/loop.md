반복문 (Loop)
====

## for
```javascript
for (let i = 0; i < 10; i++) { // (초기값; 조건식; 증감식)
    console.log(i);
}
```
반복횟수를 정할 수 있기 때문에 몇번 반복될지 알때 사용함

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