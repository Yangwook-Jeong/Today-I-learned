slice()
====

## 기본형
```array.slice(start, end)```가 기본형입니다. 
// TODO: 이미지 링크해서 도식화된 메서드 보여주기


```javascript
let items = [1, 2, 3, 4, 5];
let copy = items.slice();

copy[0] = 100; 
console.log(items); // [1, 2, 3, 4, 5]
console.log(copy); // [100, 2, 3, 4, 5]

let copy2 = items.slice(2, 3); // [3]
let copy3 = items.slice(2); // [3, 4, 5] 
let copy4 = items.slice(-2); // []
let copy5 = items.slice(1, -1); // []
```

