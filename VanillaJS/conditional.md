조건문 (Conditional)
====

## if문
```javascript
if (0) {
    console.log('do not run');
}
if ('') {
    console.log('do not run');
}
if ([]) {
    console.log('run');
}
```
if문의 기본구조는 ```if (조건) {내용}```이다.

## switch문
```javascript
switch (a) {
    case 1: // a가 1이라면
        console.log('c = 1');
        break;
    case 2: // a가 2라면
        console.log('c = 2');
        break;
    case 3: // a가 3이라면
        console.log('c = 3');
        break;
    default: // 어떤 조건에도 해당하지 않을떄 
        console.log('not applicable')
}
```
switch, case, break가 if, else if, else와 치환된다.

```javascript
if (a === 1) {
    console.log('c = 1');
} else if (c === 2) {
    console.log('c = 2');
} else if (c === 3) {
    console.log('c = 3');
} else {
    console.log('not applicable');
}
```
이라고 바꿀 수 있다.