---
layout: post
title:  함수 (Function)
author: Yangeok
categories: Javascript
comments: true
---

```javascript
function a(x) {
    const y = x + 1;
    return y; // 함수내 기능을 반환합니다. 즉 y값을 내보내고 함수를 종료합니다
}
```

```javascript
const a = function(x) { // 함수 선언시 괄호안의 값은 매개변수(parameter)라고 부릅니다.
    const y = x + 1;
    return y; 
};
```
함수 내에서 ```return``` 이후 입력한 코드는 실행되지 않습니다. 

```javascript
let i = a(1); // 함수 호출시 괄호안의 값은 인자(argument)라고 부릅니다.
i; // 2
```

```javascript
const b = function(func) {
    func();
};
const c = function() {
    alert('alert');
};
b(c); // 'alert'
```
b함수의 인자로 함수 c를 집어 넣었습니다. 함수 c는 매개변수 func로 전달됩니다. ```func();```를 통해 호출됩니다. ```func();```가 ```c();```와 일치합니다. 함수는 인자, 매개변수로 사용될 수 있다. 이런 함수를 **1급 함수**라고 부릅니다.