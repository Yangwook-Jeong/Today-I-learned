함수 (Function)
====

```javascript
function a(x) {
    const y = x + 1;
    return y; // y값을 내보내고 함수를 종료한다.
} // 끝에 ;을 붙이지 않는다.
```

```javascript
const a = function(x) { // 함수 선언시 괄호안의 값은 매개변수(parameter)라고 부름.
    const y = x + 1;
    return y;
};
```
```return``` 이후 입력한 코드는 실행되지 않는다. 

```javascript
let i = a(1); // 함수 호출시 괄호안의 값은 인자(argument)라고 부름.
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
b함수의 인자로 함수 c를 집어넣었다. 함수 c는 매개변수 func로 전달된다. ```func();```를 통해 호출된다. ```func();```가 ```c();```와 일치한다. 함수는 인자, 매개변수로 사용될 수 있다. 이런 함수를 **1급 함수**라고 부른다.