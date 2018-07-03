url
===

## url.parse()
```javascript
const url = require('url');

let urlStr = 'https://www.google.com/maps/place/K%C3%B6ln/@50.9573677,6.6871347,10z/data=!3m1!4b1!4m5!3m4!1s0x47bf259169ab2fe5:0x42760fc4a2a77f0!8m2!3d50.9376617!4d6.9598389';
let curUrl = url.parse(urlStr); 
console.dir(curUrl);
```

## 