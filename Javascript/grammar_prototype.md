프로토타입 (Prototype)
====

## 기본형
```javascript
function Person(name, age) {
    this.name = name;
    this.age = age;
}

let person = new Person('a', 1); // Person { name: 'a', age: 1 }
let person2 = new Person('b', 2); // Person { name: 'b', age: 2 }
```