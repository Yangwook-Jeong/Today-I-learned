웹팩 (Webpack)
====

## bundler
복잡도가 높은 웹앱들의 파일들을 하나로 합쳐줌. 모듈시스템 적용시켜야 번들링이 가능함. 확장자별로 특정 작업을 실행할 수 있도록 함.   

```javascript
{
    entry: {
        a: 'fileName' // as result as a.js
        b: ['q.js', 'w.js'] // generated q.js + w.js
        c: ['npm module', 'npm module'] // applied npm modules 
    },
    output: {
        path: 'fileDir',
        filename: '[name].js', // must be written [name].js
        publicPath: '/'
    }
}
```

## loader
babel과 같이 사용함. 구형브라우저와 호환시키기 위해 사용함. .jsx를 컴파일 하기 위한 목적.

## plugin
효과적으로 번들링 하기 위해 사용됨. 

## gulp, grunt
## 경쟁자 Parcel