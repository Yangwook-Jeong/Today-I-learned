```
onload = () => { 
 // 함수이름은 다른걸로 바꾸면 안된다. 
 // window.onload에서 가져왔기 때문이다.
  let anchors = document.getElementsByTagName('a');

 //  anchor는 마음대로 바꿔도 된다. a는 anchor의 약자이다.
  for (let i=0; i<anchors.length; i++){
    anchors[i].setAttribute('target', '_blank');
  }
} 
onload();
```