DOM 제어 - 자식태그
====

```html
<ul>
  <li>HTML</li>
  <li>CSS
    <div>sass</div>
    <a>scss</a>
  </li>
  <li>JAVASCRIPT</li>
</ul>
```

위와 같은 HTML코드에서 

```javascript
const Li = document.getElementsByTagName('li');

const Kinder = Li[1].chilren;
const KindNodes = Li[1].childNodes;

console.log(Kinder);  // (2) [div, p]
console.log(KindNodes); //  (5) [text, div, text, p, text]
```

```children```은 태그만 찾는다
```childNodes```는 태그에 붙어있는 텍스트까지 찾는다. ```li[1]``` 바로 뒤에 빈칸도 텍스트로 인식을 한다.