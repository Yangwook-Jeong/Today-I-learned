slice()
====

## 기본형
```javascript
let items = [1, 2, 3, 4, 5];
let copy = items.slice();

copy[0] = 100;
console.log(items);
console.log(copy);

let copy2 = items.slice(2, 3);
let copy3 = items.slice(2);
let copy4 = items.slice(-2);
let copy5 = items.slice(1, -1);
```