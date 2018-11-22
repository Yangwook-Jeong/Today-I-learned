# html내 모든 a태그를 새 창으로 열리도록 javascript 제어하기

```js
onload = () => {
  // 함수이름은 다른걸로 바꾸면 안된다.
  // window.onload에서 가져왔기 때문이다.
  let anchors = document.getElementsByTagName('a');

  //  anchors는 마음대로 바꿔도 된다. a는 anchors의 약자이다.
  for (let i = 0; i < anchors.length; i++) {
    anchors[i].setAttribute('target', '_blank');
  }
};
onload(); // 함수실행
```

# for문 기본 사용방법

```
for(초기값; 조건식; 증감식) {
 실행구문;
}
```
