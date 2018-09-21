Koa.js
====

## middleware
### use() method
```javascript
app.use((ctx, next) => {
    console.log(1);
    next();
});

app.use((ctx, next) => {
    ctx.body = 'Hello Koa'; 
});
```
* ctx : 요청, 응답에 대한 정보
* next : 다음 미들웨어 실행

### next()
```javascript
app.use((ctx, next) => {
    console.log(1);
    const started = new Date();
    next().then(() => {
        console.log(new Date() - started + 'ms');
    });
});
```
```next()```다음에 Promise를 바로 연결시킬 수 있다. 

### async/await
```javascript
app.use(async (ctx, next) => {
    console.log(1);
    const started = new Date();
    await next();
    console.log(new Date() - started + 'ms');
});
```
콜백지옥으로부터 해방시켜준다.