## pattern


- 생성자함수: 기존에 있던 함수를 `new`명령어를 이용해 새로운 객체를 만들 수 있다. 다른 언어에서의 `class`역할을 한다.

  ```js
  function ES5(name) {
    this.name = name;
  }
  class ES6 {
    constructor(name) {
      this.name = name;
    }
  }
  const es5 = new ES5('ES5');
  const es6 = new ES6('ES6');
  console.log(es5.name, es6.name); // ES5 ES6
  ```

  1. ES6 `class`의 `constructor`는 기존의 생성자함수와 동일한 동작을 한다.

  ```js
  function ES5(name) {
    this.name = name;
    return name + ' es5';
  }
  class ES6 {
    constructor(name) {
      this.name = name;
      return name + ' es6';
    }
  }
  console.log(ES5('ES5')); // ES5 es5
  console.log(ES5.prototype.constructor('ES5')); // ES5 es5
  console.log(ES6('ES6')); // Uncaught TypeError
  console.log(ES6.prototype.constructor('ES6')); // Uncaught TypeError

  console.log(new ES6('ES6')); // ES6 { name: "ES6" }
  console.log(new ES6.prototype.constructor('ES6')); // ES6 { name: "ES6" }
  const es6 = new ES6('ES6');
  console.log(new es6.constructor('ES6 awesome')); // ES6 { name: "ES6 awesome" }
  ```

  2. 하지만 ES5에서는 생성자로서의 기능과 일반함수의 기능을 모두 수행할 수 있다.
  3. 하지만 ES6의 `constructor`에 같은 방법을 시도하면 오류가 생긴다. `class`의 `constructor`는 `new`명령어 없이는 호출할 수가 없다. 오직 생성자로서만 기능을 수행할 수 있다.

  ```js
  class ES6 {
    constructor(name, age) {
      this.name = name;
      return name + ' es6';
      this.age = age;
    }
  }
  const es6 = new ES6('es6', 2015);
  console.log(es6); // ES6 { name: "es6" }
  ```

  4. `constructor`메소드 내의 `return`값은 `return`값 및 그 이후 값이 모두 무시된다. 끗.

- `prototype`: 함수나 객체의 원형으로 함수나 객체 밖에서 사용할 수 있다.

  ```js
  // 객체 밖에서 prototype을 이용한 방법
  function Person(name, gender) {
    this.name = name;
    this.gender = gender;
  }
  Person.prototype.sayHello = function() {
    alert(this.name + ' said "hello"');
  };

  // 객체 내에서 this를  이용한 방법
  function Person(name, gender) {
    this.name = name;
    this.gender = gender;
    this.sayHello = function() {
      alert(this.name + ' said "hello"');
    };
  }
  ```

  1. `Person.prototype`이라는 빈객체가 어딘가 있고, `Person`함수로부터 생성된 객체들을 사용할 수 있다.

- generateor: `funtion*`/`yield`= `async`/`await`
- 디자인패턴:

  1. strategy: prototype을 이용해서 함수의 인자만 바꿔 코드 재활용성을 높이는 패턴이다.
     d


     ## prototype
     
- prototype:
  1. prototype link:
  2. prototype object: 항상 객체로 생성된다. 프로토타입이 생성되기 전 원래 있던 함수에 생성자 자격이 부여된다. 이 자격이 부여되면 `new`를 통해 객체를 만들어낼 수 있게 된다. 함수를 생성하면 함수만 생성되는 것이 아니라 프로토타입 객체도 함께 생성된다. (`new Person() = Person.prototype`)

<img src="https://cdn-images-1.medium.com/max/1600/1*PZe_YnLftVZwT1dNs1Iu0A.png" width="500">

- `constructor`: 프로토타입 객체와 함께 생성된 함수를 가리킨다.
- `__proto__`: 프로토타입 객체를 가리키고 모든 객체가 빠짐없이 가지고 있는 속성이다.

<img src="https://cdn-images-1.medium.com/max/1600/1*jMTxqTYDZGhykJQoimmb0A.png" width="500">

- prototype chain: 프로토타입 객체 밑에 있는 프로토타입 객체와 연결시켜주는 속성이 `__proto__`속성이다. 하위 프로토타입 객체의 `__proto__`는 연결된 객체가 없기 때문에 값이 `null`이다.

<img src="https://cdn-images-1.medium.com/max/1600/1*mwPfPuTeiQiGoPmcAXB-Kg.png" width="500">

## on event

window 객체 중 on 이벤트류: onblur, onchange, onfocus, onclick, ondblclick, onerror, onkeydown, onkeypress, onkeyup, onmouseout, onreset, onresize, onscroll, onsubmit

함수의 숨겨진 속성:
arguments: 함수에 들어온 인자를 유사배열로 반환, 배열의 메소드는 사용 불가함.
call(), apply(), bind()

## method 

매서드는 객체에서만 작동하는 함수이다. 함수에서 매개변수 뒤에 매서드가 있으면 이 매개변수는 무조건 배열 혹은 유사배열이다.

## hashing

- 해시함수 구현:

```javascript
funtion hash(password) {
  return crypto
    .createHmac('sha256', process.env.SECRET_KEY)
    .update(password)
    .digest('hex');
}
```

- 해시함수 사용:

```
password,
hash(password)
```

## scheduling

- setInterval: 함수가 시작하고 일정간격마다 실행된다.
- setTimeout: 함수가 끝나고 일정간격마다 실행된다.

## convention

- 유지보수성:

  1.  `forEach`,`map` 또는 상수를 선언할때는 무슨의미인지 설명해야 한다.
  2.  함수의 인자가 3개 이상이면 객체로 넘겨준다.
  3.  큰 객체를 복사할때는 Immutable.js를 사용해야 한다.
  4.  조건문이 길 경우 함수로 만들고, 부정조건문은 사용하지 않는 것이 좋다.
  5.  에러가 발생했을때 **에러** 형태로 두지않는다.
  6.  배열을 복사할 경우 스프레드 연산자(`...`)를 사용한다.
  7.  재할당 하는 것은 `let`으로, 재할당하지 않는 것은 `const`를 사용한다.
  8.  인라인은 되도록 쓰지말고 중괄호를 애용한다.
  9.  조건문, 반복문을 쓸때 한칸 띄어쓰고 괄호를 쓴다.
  10. 설정파일은 변수 안에 객체로 넣어 사용한다.
  11. 변수 줄맞추기를 한다.
  12. 객체, 배열을 선언할때 `new`를 사용하기보다는 `{}`, `[]`를 사용한다.

## asynchronous

- async: promise객체를 만들어주는 문법적 설탕이다.
- await: promise를 실행하기 전까지 기다리는 키워드이다.

## es6


- ES5: ES6 형식의 모듈을 불러올때 `.default`를 써줘야 읽어들일 수 있다.

## es9


- `Promise { <pending> }`: `resolve`나 `reject`를 호출하지 않을 때 발생하는 상태이다.
- ES9:

  - Object Rest/Spread properties: 값은 복사를 객체는 참조를 하는 기능.

  ```js
  // case 1
  const input = { x: 1, y: 2, a: 3, b: 4}
  const {x, y, ...z} = input

  console.log(x)
  console.log(y)
  console.log(z) // ...z = { a: 3, b: 4 }
  console.log(input)

  // result
  1
  2
  { a: 3, b: 4 }
  { x: 1, y: 2, a: 3, b: 4 }

  // case 2
  const input = { x: 1, y: 2, a: 3, b: 4}
  const newInput = {
      x: 2,
      z: 3,
      ...input
  }
  console.log(newInput)

  // result
  { x: 1, z: 3, y: 2, a: 3, b: 4 } // 중복된 키가 있으면 나중에 들어오는 키의 값으로 덮어쓰기한다.
  ```

  - Asynchronous Iteration: for of문에서 `await` 키워드를 이용해 비동기를 반복자 형태로 반환시킨다. 성능하락에 대한 문제가 발생할 여지가 보인다.

  ```js
  (async () => {
    const promises = ['1000', '2000', '3000', '4000'].map(
      timer =>
        new Promise((res, rej) => {
          setTImeout(() => res(timer), timer);
        })
    );
    for await (const result of promises) {
      console.log(result);
    }
  })();

  // result
  1000;
  2000;
  3000;
  4000;
  ```

  - `Promise.prototype.finally()`: promise가 성공, 실패 여부에 상관없이 무조건 실행되는 부분이다. try catch문과 조합해서 사용한다.

- `map()`: 배열 내의 모든 요소에 함수를 계산한 결과를 새로운 배열에 반환한다.

## syntax


- javascript:
  - class: 같은 이름의 class를 여러개 사용할 수 있다.
  - id: 같은 이름의 id를 한 문서에 단 하나만 가질 수 있다.


- javascript:
  - NaN(Not a Number): 숫자가 아니다.
  - 배열메소드:
    - `push([배열값])`
    - `splice([기준인덱스], [삭제할 배열수], [추가할 배열])`


- javascript: 
  - 배열 메서드:
    - `reduce()`: `map()`, `filter()`, `find()`로 구현할 수 있는 문제들은 모두 구현할 수있는 유연한 메서드이다.
      - `reduce(callbackFunction(accumulator, currentValue[, currentIndex, array]){...}[, initialValue])`
      - accumulator: 직전의 콜백이 리턴한 계산값
      - currentValue: 현재 콜백, 배열의 요소값
      - currentIndex: 현재 콜백이 진행되고 있는 시점의 배열의 인덱스값
      - array: 작업을 수행하는 배열 자체
      - initialValue: 콜백의 첫번째 호출에서 첫번쨰 인수로 사용되는 값

    - `indexOf()`: 
      - `indexOf(searchValue[, fromIndex])`
      - searchValue: 필수요소이며 찾으려는 문자열을 넣는다.
      - fromIndex: 선택요소이며 검색을 시작할 인덱스값이다. 입력하지 않으면 처음부터 검색한다.
      - 대소문자를 구별한다.
      - 찾으려는 문자열이 없으면 -1을 반환한다.

    - `filter()`: 배열의 요소들을 걸러내는 것이 목적이다.
      - `filter(callback(element[, index[, array]])[, thisArg])`
      - element: 처리할 현재 요소값
      - index: 처리할 현재 요소의 인덱스값
      - array: filter를 호출한 배열 자체
      - thisArg: 콜백을 실행할 때 `this`로 사용하는 값

    - `map()`: 배열의 요소를 일괄적으로 변경하는데 효과적이다.
      - `map(callback(currentValue[, index[, array]])[, thisArg])`
      - currentValue: 처리할 현재 요소값
      - index: 처리할 현재 요소의 인덱스값
      - array: forEach를 호출한 배열 자체
      - thisArg: 콜백을 실행할 때 `this`로 사용하는 값

    - `find()`: `filter()`와 비슷하지만 단 하나의 요소만 리턴한다.
      - find(callback(element[, index, array])[, thisArg])
      - element: 처리할 현재 요소값
      - index: 처리할 현재 요소의 인덱스값
      - array: find를 호출한 배열 자체
      - thisArg: 콜백을 실행할 때 `this`로 사용하는 값

    - `forEach()`: 
      - `forEach(callback(currentValue[, index, array])[, thisArg])`
      - currentValue: 처리할 현재 요소값
      - index: 처리할 현재 요소의 인덱스값
      - array: forEach를 호출한 배열 자체
      - thisArg: 콜백을 실행할 때 `this`로 사용하는 값

    ```js
    // for문
    let arr = [3, 9, 4, 2, 7, 6];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] % 2 == 0) {
        console.log(arr[i]);
      }
    }
    // [4, 2, 6]

    // forEach()
    let arr = [3, 9, 4, 2, 7, 6];
    arr.forEach((n) => {
      if (n % 2 == 0) {
        console.log(n);
      }
    });
    // [4, 2, 6]
    ```

      - for문을 사용할때는 배열의 인덱스를 저장하기 위한 임시변수 `i`를 사용하면서 가독성이 떨어지게 된다.
      - 요서 접근방법이 `arr[i]`와 `n`으로 다르다.

    - `Object.keys(obj)`:
      - obj: 처리될 객체 

      ```js
      let obj = { a: 1, b: 2, c: 3 }
      let arr = Object.keys(obj)
      
      console.log(arr) // ['a', 'b', 'c']
      ```

  - jsDoc: python의 docstring이나 java의 javadoc과 비슷하다. `/**`을 입력하면 자동으로 vscode에서 생성해준다. 아래와 같이 파라미터나 생성자를 작성한다. 
  
  ```js
  /**
   * Example
   * @param {integer} example - example
   */
  ```


  ## convention
  
- airbnb style javascript:
  - 객체 메서드는 줄여서 적는다.

  ```js
  // bad
  const atom = {
    addValue: function (value) {
      return atom.value + value;
    },
  };

  // good
  const atom = {
    addValue(value) {
      return atom.value + value;
    },
  };
  ```

  - 기본 매개변수는 항상 뒤에 위치한다.

  ```js
  // bad
  function handleThings(opts = {}, name) {
    // ...
  }

  // good
  function handleThings(name, opts = {}) {
    // ...
  }
  ```


  ## regexp

  
  - js: 정규표현식을 위한 `RegExp`객체가 JS에서는 제공된다. 리터럴 방식과 생성자함수를 사용할 수 있다.
    - 정규식을 이용하는 메서드:
      - `exec()`: `g`플래그를 지정해도 첫번쨰 매치 결과만 반환한다.
      - `test()`:
      - `match()`
      - `replace()`:
      - `search()`:
      - `split()`:

  ```js
  let targetStr = 'This is a pen.';
  let regxr = /is/gi;

  console.log(regexr.exec(targetStr)); // [ 'is', index: 2, input: 'This is a pen.' ]
  console.log(regexr.test(targetStr)); // true

  console.log(targetStr.match(regexr)); // [ 'is', 'is' ]
  console.log(targetStr.replace(regexr)); // ThIS IS a pen.
  console.log(targetStr.search(regexr)); // 2
  console.log(targetStr.split(regexr)); // [ 'Th', ' ', ' a pen.' ]
  ```

  - 플래그:

    - `g`(Global):
      - 문자열내 모든 패턴을 검색한다.
      - 하위 문자열을 포함하는 배열을 반환하고 일치하는 것이 없으면 `null`을 반환한다.
      - `g`플래그가 포함되지 않으면 반환되는 배열에 원래 문자열의 값을 가지는 `input`속성과 인덱스를 나타내는 `index`속성이 포함된다.
    - `i`(Ignore Case): 대소문자 구별없이 검색한다.
    - `m`(Multi Line): 문자열의 행이 바뀌더라도 검색을 계속한다.

  - 패턴: 찾고자 하는 대상을 문자열로 지정한다. 이때 따옴표를 포함하면 따옴표까지 검색하기 때문에 문자열의 따옴표는 생략한다.

    - `.`:
      - `.`은 임의의 문자 한개를 의미한다.
      - `.`을 연속해서 작성했을 경우에는 추출을 반복하지 않기 때문에 `g`플래그를 같이 사용한다.
      - 모든 문자를 선택하려면 `.`와 `g`를 동시에 지정한다.

    ```js
    let targetStr = 'AA BB Aa Bb';
    let regexr = /.../g;
    let regexrAll = /./g;

    console.log(targetStr.match(regexr)); // ['AA', 'BB', 'Aa'];
    console.log(targetStr.match(regexrAll)); // [ 'A', 'A', ' ', 'B', 'B', ' ', 'A', 'a', ' ', 'B', 'b' ]
    ```

    - 문자 혹은 문자열: 지정된 문자나 문자열을 추출한다. 이때 대소문자를 구별해서 반환한다.
    - `*`: 앞선 패턴이 최소 0번 반복되는 문자열을 추출한다. `{0,}`과 같다.
    - `+`: 앞선 패턴이 최소 한번 반복되는 문자열을 추출한다. `{1,}`과 같다.
    - `?`: 앞선 패턴이 0 또는 한번 반복되는 문자열을 추출한다. `{0, 1}`과 같다.
    - `{n}`: 앞선 패턴이 n번 반복되는 문자열을 추출한다.
    - `{n, m}`: 앞선 패턴이 n번 이상 m번 이하 반복되는 문자열을 추출한다.

    ```js
    let targetStr = 'AA AAA BB Aa Bb';
    let regexr = /A/gi;
    let regexrAll = /A+/g;

    console.log(targetStr.match(regexr)); // [ 'A', 'A', 'A', 'A', 'A', 'A', 'a' ]
    console.log(targetStr.match(regexrAll)); // [ 'AA', 'AAA', 'A' ]
    ```

    - `|`: or의 의미로 `[]`로도 똑같이 표현할 수 있다.

    ```js
    let regexr = /A|B/;
    regexr = /[AB]/;
    ```

    - `-`: 범위를 지정하려면 `[]`내에 `-`를 사용한다.
    - 알파벳 추출:
      - `/[A-Z]/g`: 대문자 추출을 할 수 있다.
      - `/[A-Za-z]/g`: 대소문자 모두 추출을 할 수 있다.
        - `\w`: 알파벳과 숫자를 의미한다.
        - `\W`: 반대로 알파벳과 숫자가 아닌 것을 의미한다.
    - `0-9`: 숫자 추출을 할 수 있다.
      - `\d`: 간단히 다음과 같이 표현할 수 있다.
      - `\D`: 숫자가 아닌 문자를 검색하는 패턴이다.

    ```js
    let targetStr = 'AA BB Aa Bb 24,000';
    let regexr = /[0-9]+/g;
    let regexrNew = /[0-9,]+/g;

    console.log(targetStr.match(regexr)); // [ '24', '000' ]
    console.log(targetStr.match(regexrNew)); // [ '24,000' ]
    ```

    - `^`: 특정 단어로 시작하는지 검사한다.
    - `$`: 특정 단어로 끝나는지 검사한다.

    ```js
    let url = 'https://example.com';
    let fileName = 'index.html';
    let regexrFirst = /^https/;
    let regexrLast = /html$/;

    console.log(regexrFirst.test(url)); // true
    console.log(regexrLast.test(fileName)); // true
    ```

    -`\s`: 공백이 있는지 검사한다.

    ```js
    let targetStr = ' Hi!';
    let regexr = /^[\s]+/;

    console.log(regexr.test(targetStr)); // true
    ```

    - `()`: 특정 패턴을 묶어서 반복기호와 함꼐 사용할 수 있다.

    - 형식검사:

      - 아이디: 알파벳 대소문자나 숫자로 시작하고 끝나며 4~10자리인지 검사한다.

      ```js
      let id = 'abc123';
      let regexr = /^[A-Za-z0-9]{4, 10}$/;

      console.log(regexr.test(id)); // true
      ```

      - 메일주소:

      ```js
      let email = 'wooky92@naver.com';
      let regexr = /^[0-9a-zA-Z]([[-_\.]?][0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

      console.log(regexr.test(email)); // true
      ```

      - 전화번호:

      ```js
      let phone = '010-1234-5678';
      let regexr = /^\d{3}-\d{3, 4}-\d{4}%/;

      console.log(regexr.test(phone)); // true
      ```

      - 특수번호 포함여부:

      ```js
      let targetStr = 'abc#123';

      // A-Za-z0-9 이외의 문자가 있는지 검사한다.
      let regexr = /[^A-Za-z0-9]/gi;
      console.log(regexr.test(targetStr)); // true

      // 특수문자를 선택적으로 검사할 수 있다.
      regexr = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
      console.log(regexr.test(targetStr)); // true

      // 특수문자를 제거한다.
      console.log(targetStr.replace(regexr, '')); // abc123
      ```
## arr str obj method

- 재귀함수: 반복적인 호출이 종료되는 조건이 있어야한다.

  - 팩토리얼:

  ```js
  function fac(n) {
    if (n == 0 || n == 1) return 1;
    else return n * fac(n - 1);
  }
  ```

  - 피보나치:

  ```js
  function fibo(n) {
    if (n == 1 || n == 2) return 1;
    else return fibo(n - 1) + fibo(n - 2);
  }
  ```

- `try-catch`: 시도할 블록을 표시하고, 예외가 발생했을때 하나 이상의 반응을 나타낸다.

  - 에러를 회피하기 위해 사용한다.
  - 빠르게 발생한 에러위치를 제공하기 위해 사용한다.
  - 좀더 자세한 에러정보를 제공하기 위해 사용한다.
  - 완성된 앱의 경우 에러를 출력하지 않기 위해 사용한다.

- 알고리즘 문제풀이 테크닉:

  - 배열, 문자열에서 중복을 제거할떄: 자료형 Set을 이용해 중복을 제거한다.

  ```js
  // 배열
  const arr = [1, 3, 2, 4, 3, 1, 5, 6, 2, 1];
  const newArr = [...new Set(arr)];
  console.log(newArr); // [1,3,2,4,5,6] 중복이 제거된 배열을 얻을 수 있다.

  // 문자열
  const str = 'abcdacbe';
  const newStr = [...new Set(str)].join('');
  console.log(newStr); // "abcde" 중복이 제거된 문자열을 얻을 수 있다.
  ```

  - 배열, 문자열에서 유니크한 원소를 뽑아낼때: filter메서드를 이용한다.

  ```js
  const arr = [1, 1, 4, 1, 1];
  arr.filter(el => arr.indexOf(el) === arr.lastIndexOf(el)); // [4]

  const str = '11411';
  str.split('').filter(el => str.indexOf(el) === str.lastIndexOf(el)); // ['4']
  ```

  - 배열, 문자열에서 i번째 인덱스 내용을 삭제하고 싶을떄

    - 원본을 보존하면서 잘라내는 방법

    ```js
    const arr = [1, 2, 3, 4, 5];
    const newArr1 = [...arr.slice(0, 2), ...arr.slice(3)]; // 2번 인덱스 삭제

    console.log(newArr1); // [1,2,4,5]
    console.log(arr); // [1,2,3,4,5]
    ```

    - 원본을 훼손하면서 잘나내는 방법

    ```js
    const arr = [1, 2, 3, 4, 5];
    arr.splice(2, 1); // 2번 인덱스부터 1개를 삭제하겠다는 의미
    console.log(arr); // [1,2,4,5]
    ```

  - boolean으로 결과를 리턴할때

  ```js
  // 이것 대신
  if (조건) {
    return true;
  } else {
    return false;
  }

  // 이것으로
  return 조건;
  ```

  - 배열에 규칙적인 연속된 값 할당하고 싶을떄

  ```js
  Array(5).fill(1); // [1,1,1,1,1]
  Array(5)
    .fill(1)
    .map((el, i) => el + i); // [1,2,3,4,5]
  ```

  - 형변환을 하고 싶을떄

  ```js
  // 문자를 숫자로 변환
  const str = '1234';
  const strToNum = +str;
  console.log(strToNum); // 1234

  // 숫자를 문자로 변환
  const num = 1234;
  const numToStr = '' + num;
  console.log(numToStr); // '1234'
  ```

- 배열 메서드:

  - `isArray()`: 인자에 들어가는 객체가 배열인지 확인할때 사용한다.

  ```js
  Array.isArray({ a: 1, b: 2 }); /// false
  Array.isArray([1, 2, 3]); //true
  ```

  - `concat()`: 인자로 주어진 배열이나 값들을 합쳐서 새로운 배열을 만들 수 있다. 인자에 들어가는 순서대로 배열의 원소가 만들어진다.

  ```js
  const arr = [1, 2, 3];
  arr.concat(4, 5); // [1,2,3,4,5]
  arr.concat([4, 5]); // [1,2,3,4,5]
  arr; // [1,2,3] 원본이 바뀌지 않음
  ```

  - `every(currentValue, index, array)`: 배열의 모든원소가 제공한 함수를 통과하는지 테스트한다.
  - `some(currentValue, index, array)`: 배열의 원소중 하나라도 제공한 함수를 통과하는지 테스트한다.

  ```js
  const arr = [2, 4, 6, 8];
  arr.every(el => el % 2 === 0); // true
  arr.some(el => el % 2); // true
  arr; // [2,4,6,8] 원본이 바뀌지 않음
  ```

  - `fill(value[, start[, end]])`: 배열의 시작 인덱스부터 끝 인덱스까지 정적 값으로 채우는 메서드이다. start의 기본값은 0, end의 기본값은 배열의 길이이다.

  ```js
  const arr = Array(3);
  arr.fill(2); // [2,2,2]
  arr; // [2,2,2] 원본이 바뀜
  ```

  - `filter(callback)`: 배열의 원소중 제공된 함수를 통과하는 원소를 반환한다.

  ```js
  const arr = [1, 2, 3, 4, 5];
  arr.filter(el => el < 3);
  arr; // [1,2,3,4,5] 원본이 바뀌지 않음
  ```

  - `forEach(callback(currentValue, index, array))`: 배열 원소마다 제공한 함수를 실행한다.

  ```js
  const arr = [1, 2, 3];
  arr.forEach(el => console.log(el));
  // 1
  // 2
  // 3
  arr; // [1,2,3] 원본이 바뀌지 않음
  ```

  - `includes(searchElement[, fromIndex])`: 배열에 특정 원소가 포함되어 있는지 여부를 확인해 boolean으로 리턴한다.

  ```js
  const arr = [1, 2, 3, 4];
  arr.includes(3); // true
  arr.includes(1, 1); // false
  arr; // [1,2,3,4] 원본이 바뀌지 않음
  ```

  - `lastIndexOf(searchElement[, fromIndex])`: 배열에 특정 원소가 포함되어 있는지 여부를 확인해 있으면 해당 인덱스를 만약 없다면 -1을 리턴한다.
  - `join(separator)`: 모든 원소를 연결해 하나의 문자열로 만드는 메서드이다.

  ```js
  const arr = [1, 2, 3, 4];
  arr.join(); // "1,2,3,4"
  arr.join('..'); // "1..2..3..4"
  arr; // [1,2,3,4] 원본이 바뀌지 않음
  ```

  - `map(callback(currentValue, index, array))`: 배열 내의 모든 원소에 대해 제공된 함수를 호출하고 결과를 모아 새로운 배열을 리턴한다.

  ```js
  const arr = [1, 2, 3];
  arr.map(el => el * 2); // [2,4,6]
  arr; // [1,2,3] 원본이 바뀌지 않음
  ```

  - `push(item1, item2)`: 배열의 맨 뒤에 새로운 원소를 추가한다.
  - `pop()`: 배열의 맨 뒤 원소를 지운다.
  - `unshift(item1, item2)`: 배열의 맨 앞에 새로운 원소를 추가한다.
  - `shift()`: 배열의 맨 앞 원소를 지운다.

  ```js
  const arr = [1, 2, 3];
  arr.push(5); // 4 ( 배열의 길이 리턴 )
  arr; // [1,2,3,5]
  arr.pop(); // 5 ( 삭제된 원소 리턴 )
  arr; // [1,2,3]
  arr.unshift(2); // 4 ( 배열의 길이 리턴 )
  arr; // [2,1,2,3]
  arr.shift(); // 2 ( 삭제된 원소 리턴 )
  arr; // [1,2,3]
  ```

  - `reduce(callback(accumulator, currentValue, currentIndex, array)[, initialValue])`, `reduceRight()`: 배열의 원소마다 누적 계산값과 함께 함수를 적용해 하나의 값으로 리턴한다. `reduceRight()`는 배열의 오른쪽부터 수행한다.

  ```js
  const arr = [1, 2, 3, 4];
  arr.reduce((a, b) => a + b); // 10
  arr.reduce((a, b) => a + b, 10); // 20
  arr; // [1,2,3,4] 원본이 바뀌지 않음
  ```

  - `reverse()`: 배열의 원소 순서를 반대로 정렬해 반환한다.

  ```js
  const arr = [1, 2, 3];
  arr.reverse(); // [3,2,1]
  arr; // [3,2,1] 원본이 바뀜
  ```

  - `slice([start[, end]])`: 배열의 시작부터 끝까지 얕은 복사를 한다.

  ```js
  const arr = [1, 2, 3, 4, 5];
  arr.slice(2); // [3,4,5]
  arr.slice(1, 3); // [2,3]
  arr; // [1,2,3,4,5] 원본이 바뀌지 않음
  ```

  - `splice(start, deleteCount, item1, item2)`: 배열의 원소를 삭제하거나 새 원소를 추가한다. 시작부터 deleteCount만큼 삭제되고 뒤로 오는 인자들은 삭제된 위치에 추가되는 원소들이다.

  ```js
  let arr = [1, 2, 3];
  arr.splice(2); // [2,3] ( 삭제된 배열 리턴)
  arr; // [1] 원본이 바뀜

  arr = [1, 2, 3];
  arr.splice(1, 1); // [2]
  arr; // [1,3]

  arr = [1, 2, 3];
  arr.splice(1, 1, 3, 4); // [2]
  arr; // [1,3,4,3]
  ```

  - `sort([compareFunction])`: 배열을 정렬할때 사용한다. 인자를 넣지 않으면 기본적으로 유니코드 포인트에 따라 정렬된다.

  ```js
  // 오름차순
  const arrA = [3, 20, 12, 1, 4];
  arrA.sort(); // [1, 12, 20, 3, 4]
  arrA; // [1, 12, 20, 3, 4] 원본이 바뀜

  const arrB = [3, 20, 12, 1, 4];
  arrB.sort((a, b) => a - b); // 오름차순 [1, 3, 4, 12, 20]
  arrB.sort((a, b) => b - a); // 내림차순 [20, 12, 4, 3, 1]
  ```

  - `toString()`: 배열의 원소를 문자열로 반환한다.

- 문자열 메서드: 문자열을 배열과 같이 사용할 수 있기 때문에 배열 메서드도 사용이 가능하다.

  - `charCodeAt(index)`: 주어진 인덱스에 대해 utf-16코드를 나타내는 0부터 65535사이의 정수를 반환한다.

  ```js
  const str = 'abcd';
  str.charCodeAt(0); // 97
  str.charCodeAt(1); // 98
  ```

  - `repeat(count)`: 주어진 문자열을 인자만큼 반복한다.

  ```js
  const str = 'abc';
  str.repeat(2); // 'abcabc'
  ```

  - `replace(pattern, replacement or function)`: 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환한다. 정규식이나 문자열로 패턴을 설정할 수 있다.

  ```js
  const str = 'abcdabcd';
  str.replace('ab', 'kkk'); // 'kkkcdabcd'
  str.replace(/ab/gi, 'kkk'); // 'kkkcdkkkcd'
  ```

  - `split(separator[, limit])`: 문자열을 배열로 변환할때 사용한다.

  ```js
  const str = 'abcde';
  str.split(); // ['abcde']
  str.split(''); // ['a','b','c','d','e']
  str.split('c'); // ['ab','d']
  str.split('', 3); // ['a','b','c']
  ```

  - `toUpperCase()`, `toLowerCase()`: 대소문자로 변형할 시에 사용한다.


## syntax

- BOM(Browser Object Model): 브라우저 객체모델. 웹브라우저의 탭에 관련된 기능을 자바스크립트로 제어할 수 있도록 추상화한 객체의 집합이다. window객체에 연결되어 있다.

  - DOM(Document Object Model): 문서 객체모델. 웹브라우저가 html이나 xml같은 문서를 자바스크립트로 제어할 수 있도록 추상화한 객체의 집합이다. window.document로 접근할 수 있다.
    - node: dom트리를 구성하는 최소단위이다.
      - document node: 문서 자체를 의미하는 최상위 노드이다. window.document
      - element node: 태그를 의미하는 노드이다.
      - attribute node: 태그 노드의 특성 하나하나를 의미하는 노드이다.
      - text node: 태그 노드 안에 있는 텍스트이다.

- 프로토타입: ES6이전의 자바스크립트에서 객체지향 프로그래밍을 구현하기 위해 사용하는 방식이다.

  - 생성자함수, 인스턴스: 인스턴스의 모든 속성은 생성자 함수 안에서 정의가 가능하다.

  ```js
  var Person = function(name) {
   this.name = name; // 인스턴스 속성
   this.speakName = function(number){ // 인스턴스간 공유되지 않는 메소드
      for(var i=0; i < number; i++) {
        console.log("my name is " + this.name);
      }
   }
  };

  var kim = new Person("kim");
  kim.speakName(10);
  }
  ```

  - prototpye객체, 인스턴스 메서드: 생성자 함수의 prototype객체를 통해 인스턴스들이 공유하는 속성을 정의할 수 있다.
    - `kim`객체에서 `kim.speakName`을 찾으면
      - `kim.constructor.prototype.speakName` (`kim.__proto__.speakName` = `Person.prototpye.speakName`)
      - `kim.consturctor.prototpye.consturctor.prototype.speakName` (`kim.__proto__.__proto__.speakName` = `Object.prototype.speakName`)
    - `__proto__`: 인스턴스를 생성할때 내부적으로 설정되는 참조로써 객체의 생성자 함수의 prototype객체를 가리킨다.
    - `kim.__prototype__` -> `Person.prototype (=kim.constructor.prototype)`

  ```js
  var Person = function(name) {
    this.name = name; // 인스턴스 속성
  };

  Person.prototype; // 모든 함수(생성자가 아니여도)에는 prototype Object 객체가 자동으로 붙어 있습니다.

  Person.prototype.speakName = function(number) {
    // 인스턴스간 공유되는 메소드
    for (var i = 0; i < number; i++) {
      console.log('my name is ' + this.name);
    }
  };

  var kim = new Person('kim');
  kim.speakName(10);
  ```

- prototpye객체, 인스턴스 속성: 객체의 속성을 참조할 떄의 우선순위는 프로토타입 체인을 따른다.
  - 인스턴스에 직접 붙은 속성
  - 생성자 함수의 prototype에 붙은 속성
  - Object.prototype에 붙은 속성


- javascript:
  - `reverse()`: 배열의 순서를 반전한다.
  - `substring(start[, end])`: 문자열을에서 원하는 위치를 골라내 사용한다. end값이 지정되지 않으면 문자열의 끝까지를 의미한다. start 인덱스의 값 다음 값부터 사용한다.
  - `Math.max(value1[, value2[, ...]])`: 0이상의 숫자중 가장 큰 숫자를 반환한다.


- javascript:

  - `path.normalize(directory)`: 인자로 전달받은 잘못된 경로를 올바르게 고쳐준다.

  ```js
  path.normalize('c:/abc//def/'); // 'c:\\abc\\def\\'
  ```

  - `path.join(path1[, path2[, ...]])`: 인자로 전달받은 경로를 이어서 하나의 경로로 만든다.
  - `path.resolve([from,] to)`: 인자로 전달받은 경로의 절대경로를 반환한다.

  ```js
  path.resolve('.'); // 'C:\\node'
  path.resolve('../Python34', 'libs'); // 'C:\\Python34\\libs'
  ```

  
- javascript:

  - `toISOString()`: 확장 iso형식의 문자열을 반환한다. 반환값은 언제나 24글자(YYYY-MM-DDTHH:mm:ss.sssZ) 또는 27글자(±YYYYYY-MM-DDTHH:mm:ss.sssZ)이다. 시간대는 언제나 utc이며 접미어 z로 표현한다.
  - `decodeURI()`: 사전에 만들어진 인터넷 식별자를 해독한다.

## engine

- javascript compiler
  - 초기 실행 방식
    - 기본적으로 text형태로 배포된다.
    - text 형태로 배포된 코드를 파싱하여 중간언어로 byte 코드 형태로 전환한다.
    - 이후 native 코드로 변경하기 위해 interpreter와 JITC(Just-In-Time compiler)의 동작방식이 달라진다.
      - interpreter: 반환된 byte코드를 한줄씩 읽어나가며 동작을 수행한다.
      - JITC: 코드 전체를 native코드로 컴파일해서 동작을 수행한다.
  - adaptive JITC 방식
    - 모든 코드를 일괄적으로 같은 수준의 최적화를 진행하는 것이 아닌 반복 수행되는 정도에 따라 유동적으로 다른 최적화 수준을 적용하는 방식이다. 기본적으로 interpreter를 통해 수행하다가 자주 반복되는 코드가 있을 경우 관련 부분에만 JITC를 적용해 native코드로 최적화해 변경 수행한다.

## primitive type

- javascript

  - Number 객체: 숫자 값으로 작업할 수 있게 만들어주는 래퍼객체이다. `Number()`생성자를 사용해서 만든다. 원시 숫자 자료형은 `Number()`함수를 사용해 생성한다.
    - 만약 인수를 숫자로 반환할 수 없으면 NaN을 리턴한다.
    - 생성자로서 사용하지 않으면(new 연산자를 사용하지 않으면) Number를 사용하여 형변환을 할 수 있다.
  - `trim()`: 문자열 양 끝의 공백을 제거한다.

## number 
- javascript: 
  - `toFixed()`: Number 객체를 주어진 인자만큼의 소수점 이하 자리수를 정확하게 갖는 문자열로 반환한다. 소수점 이하가 길면 숫자를 반올림하고, 짧으면 0으로 채운다.

  ## design pattern
  
- javascript 디자인패턴
  - CPS(Continuation-Passing Style): `return`대신에 `cb(null, data)`을 사용한다.  

  ```js
  // Synchronous
  function add(a, b) {
    return a + b;
  }

  console.log(add(2, 2));

  // Asynchronous
  function addAsync(a, b, cb) {
    cb(a + b);
  }

  addAsync(2, 2, function add(result) {
    console.log(result);
  });

  // Or
  addAsync(2, 2, result => console.log(result));

  // Or even
  addAsync(2, 2, console.log);
  ```

  - Observer with EventEmitter
    - 상태를 가지고 있는 주체 객체와 상태의 변경을 알아야하는 관찰 객체가 존재할때, 이들의 관계는 1:1이 될 수도 1:n이 될 수도 있다.
    - 서로의 정보를 넘기고 받는 과정에서 정보의 단위가 클수록 객체의 규모가 클수록 객츠이 관계가 복잡할수록 구현하기 어려워진다.
    - 이런 기능을 할 수 있도록 가이드라인을 제시해주는 것이 옵저버 패턴이다.
    - MVC패러다임과 자주 결합된다.

  ```js
  // Give a list of files all of them which match an extension
  function findFiles (files, extension) {
    const emitter = new EventEmitter()

    if (files.length === 0) {
      // yield an error
      emitter.emit('error', 'no files supplied')
    }

    // Check for matches
    function checkFiles () {
      files.forEach(file => {
        if (path.extname(file) === extension) {
          // yield a result
          emitter.emit('match', file)
        }
      })
    }

    // Ask the event loop to loop through our loop ...
    process.nextTick(checkFiles)

    // For chainability on on()
    return emitter
  }
  ```

  - Strategy
    - 어떤 동작을 하는 로직을 정의하고 이것들을 묶어서 캡슐화하도록 하는 패턴이다. 
    - 로직을 사용하는 객체들은 자기입맛에 맞게 로직을 효율적으로 수정할 수 있다. 
    - 새로운 로직을 추가하거나 변경할때 객체의 종류수만큼 반복하지 않고 한번으로 반영이 가능하다.
    - 핵심은 로직을 정의하는 행동에도 객체를 선언해야 한다.
    - 느슨한 결합을 사용한다. 즉, 상속을 통한 구현이 아닌 구성을 이용한다.

  <img src="https://dzone.com/storage/temp/2442910-strategy.png" width="500">

  - Chain of responsibility
    - 서버사이드에서 미들웨어를 사용할때 사용하는 방식이다.
    - ATM에서 돈을 뺄때의 메카니즘과 똑같다.

    <img src="https://sourcemaking.com/files/v2/content/patterns/Chain_of_responsibility1.png" width="500">

  - Intercepting filter

    <img src="https://www.oracle.com/ocom/groups/public/@otn/documents/digitalasset/149372.jpg" width="500">

  - Proxy

    <img src='https://dzone.com/storage/temp/2442923-proxy.png' width='500'>

  - Decorator

    <img src="https://dzone.com/storage/temp/2440958-decorator.png" width="500">
