아래와 같은 프로토타입으로 만든 헬퍼함수가 있을때

```js
// flatMap
const concat = (x, y) => x.concat(y);
const flatMap = (f, xs) => xs.map(f).reduce(concat, []);
Array.prototype.flatMap = function(f) {
  return flatMap(f, this);
};
```

프로토타입을 `export`하는게 아니라 함수 그자체를 `export`해야한다.

```js
// ES5
module.exports = flatMap;

// ES6
export default flatMap;
```
