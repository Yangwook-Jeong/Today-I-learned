concat
=====

## 기본형
```javascript
let items = [1, 2];
let newItems = items.concat(3, 4, 5, 'str', undefined);
console.log(newItems); // [1, 2, 3, 4, 5, 'str', undefined]

let newItems2 = items.concat([3, 4], [5, 6, 7]);
console.log(newItems2); // [1, 2, 3, 4, 5, 6, 7]

let newItems3 = items.concat([3, 4], [5, 6, [7]]);
console.log(newItems3); // [1, 2, 3, 4, 5, 6, [7]]
```
매개변수로 주어진 배열이나 값을 기존 배열에 합쳐 새로운 배열을 reutrn함.

## concat vs. forEach
```javascript
let people = [{name: 'a'}, {name: 'b'}];
let people2 = [{name: 'c'}, {name: 'd'}];

// forEach * 2
people.forEach((person) => {
    console.log(person.name);
});
people2.forEach((person) => {
    console.log(person.name);
});

// concat + forEach
people.concat(people2).forEach((person) => {
    console.log(person.name);
});
```