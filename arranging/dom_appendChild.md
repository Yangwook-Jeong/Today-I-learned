DOM 제어 - appendChild() 메소드
====

```
<ul id="myList">
	<li>1</li>
	<li>2</li>
</ul>
```
다음과 같은 HTML 코드가 있을때 

```javascript
let node = document.createElement('li'); // li태그 생성
let textnode = document.createTextNode('a'); // 텍스트 생성
node.appendChild(textnode); // 텍스트를 li태그에 부착
document.getElementById('myList').appendChild(node); // li태그를 id가 myList인 ul태그에 부착
```

```
<ul id="myList">
	<li>1</li>
	<li>2</li>
	<li>a</li>
</ul>
```
javascript상에서 HTML을 제어할 수 있게 된다. 이 코드를 반복문으로 응용한다면 li태그 밑에 자동으로 같은 코드가 생선되게 만들 수도 있다.

```javascript
let node = document.getElementsByTagName('li'); // 모든 li태그를 불러옴
for (let i = 0; i < node.length; i++) { // 인덱스값 i가 모든 li태그 번만큼 반복됨
	let span = document.createElement('span'); // span태그를 생성
	let txt = document.createTextNode('x'); // 'x'라는 텍스트노드를 생성
	span.appendChild(txt); // 텍스트 'x'를 span태그에 부착
	node[i].appendChild(span); // i번만큼 li태그에 span태그를 부착 
}
```

```
<ul id="myList">
	<li>1
		<span>x</span>
			</li>
	<li>2
		<span>x</span>
			</li>
	<li>a
		<span>x</span>
			</li>
</ul>
```
결과는 다음과 같다.