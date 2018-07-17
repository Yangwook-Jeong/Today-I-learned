# initialize project (with koa.js, react.js)
git init
yarn init
eslint --init // .eslintrc.js 생성
yarn add koa koa-router nodemon

// package.json 수정하기
```javascript
"scripts": {
  "start": "node src",
  "start:dev": "nodemon --watch src src/app.js"
}
```

## babel
yarn add -D @babel/core @babel/node @babel/preset-env @babel/cli @babel/polyfill // 개발의존모듈 babel-preset-env를 추천

// .babelrc 생성하기
```javascript
{
    "presets": ["@babel/preset-env"]
}
```

### commands
* npm install --save (=yarn add) : 의존모듈
* npm install --save-dev (=yarn add -D) : 개발의존모듈

### 명령어
* babel -w : 단독으로 사용가능. 변경사항 있을시 자동 transpile
* babel -d toDir originDir : originDir을 toDir로 transpile
* babel originDir --out-dir toDir : originDir을 toDir로 transpile
* babel originFile --out-file toFile : originFile을 toFile로 transpile

### 개발용 세팅
// package.json 수정하기
```javascript
"scripts": {
  "start": "nodemon src/app.js --exec babel-node"
}
```

### 배포용 세팅

### 테스트용 세팅

## mongoose option
yarn add mongoose

* .env 생성하기
```javascript
PORT=****
MONGO_URI=mongodb://localhost/db_name
```

* 환경변수 불러오기, mongoose로 db연결하기
```javascript
require('dotenv').config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
}).then((res) => {
  console.log('Successfully connected to mongodb');
}).catch(e => {
  console.error(e);
});
```

## middleware
yarn add koa-bodyparser

* bodyParser 적용하기
```javascript
app.use(bodyParser());
```

## configure NODE_PATH
yarn add cross-env

* package.json 스크립트 수정하기
```javascript
  "scripts": {
    "start": "cross-env NODE_PATH=src node src",
    "start:dev": "cross-env NODE_PATH=src nodemon --watch src/ src/index.js"
  }
```