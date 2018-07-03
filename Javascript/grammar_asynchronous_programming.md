Asynchronous programming
====

## callback
```javascript
asyncTask1(data, function onTask1Done (result1) {
    asyncTask2(result1, function onTask2Done (result2) {
        asyncTask3(result2, function onTask3Done (result3) {
            asyncTask4(result3, function onTask4Done (result4) {
                console.log(`All done! Result is ${result4}`);
            })
        })
    })
});
```
논리적으로 비동그 프로그래밍을 완벽히 구현했지만, 콜백지옥.

## promise
```javascript
const makeRequest = () => 
    getJSON()
    .then(data => {
        console.log(data);
        return 'done';
    })

makeRequest();
```

## async/await
코드양을 줄일 수 있다. ```.then```을 추가할 필요없고, 비동기함수를 따로 만들 필요가 없다. 따라서 함수에 따라오는 ```data```라는 매개변수도 선언할 필요가 없어졌다. 동기, 비동기 에러를 ```try/catch```를 통해 해결할 수 있다.

### 예제1
```javascript
const makeRequest = async () => {
    console.log(await getJSON());
    return 'done';
}

makeRequest();
```
모든 async함수는 promise를 return한다. promise가 함수로부터 return할 값을 resolve한다.

### 예제2
```javascript
let fs = require('fs');

async function writeMergedFile () {
    let fileA = await fs.readFile('fileA.txt', 'utf8');
    let fileB = await fs.readFile('fileB.txt', 'utf8');

    await fs.writeFile('merged.txt', fileA+fileB, 'utf8');

    console.log('All done!')
}
```