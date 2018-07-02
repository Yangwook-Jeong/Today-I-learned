String.indexOf() method
====

## 기본형
```javascript
strObj.indexOf(subString[, startIndex])
```
subString의 값이 있으면 subString의 인덱스값을 return하고 없으면 -1을 return한다.

```javascript
let names = ['a', 'b', 'c'];

console.log(names.indexOf('a')); // 0
console.log(names.indexOf('d')); // -1

let nameExists = names.indexOf('d') > -1; // false
if (!nameExists) {
    names.push('d');
}
console.log(names); // ['a', 'b', 'c', 'd']
console.log(names.indexOf('b', 2)); // -1
console.log(names.indexOf('b', 1)); // 1
```

### 매개변수
* strObj : 필수. string 개체나 문자열 리터럴이다.
* subString : 필수. 문자열에서 검색할 부분 문자열이다.
* startIndex : 선택. string 개체의 검색을 시작할 인덱스. 생략하면 처음부터 검색을 시작함. 기본값은 0.

### 요소의 모든항목 찾기
```javascript
let indexes = [];
let array = ['a', 'b', 'a', 'c', 'a', 'd'];
let element = 'a';

let idx = array.indexOf(element);
while(idx != -1) {
    indexes.push(idx);
    idx = array.indexOf(element, idx+1);
}

array.forEach((v, i) => {
    if (v === element) {
        indexes.push(i)
    }
})

console.log(indexes); // [0, 2, 4]
```
