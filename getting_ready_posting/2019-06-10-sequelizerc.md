## cli로 migration, seeding하기

반드시 `/config/config.json`이 필요하다. `config.json`을 `config.js`로 치환해서 쓰려면 `.sequelizerc`가 필요한데 다음과 같이 세팅한다.

```js
const path = require('path);

module.exports = {
  'config': path.resolve('config', 'config.js')
}
```

그렇게하면 `.js`에서 환경변수를 `.env` 한군데에서 관리하면서 받아 사용할 수 있고 migration도 가능해진다.
