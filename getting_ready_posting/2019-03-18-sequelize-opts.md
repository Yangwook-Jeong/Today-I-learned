---
layout: post
title: Sequelize cli 미세먼지 팁
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1552474849/logo/posts/sequelize.jpg
---

sequelize-cli를 써서 명령어 입력할때는

1. 생으로 입력할때: db 디렉토리까지 올라가서 입력해야 한다.
2. package.json에서 스크립트 만들어 입력할때:

- config/options.js를 만든다.

```js
const path = require('path');
module.exports = {
  config: path.join(__dirname, './config.json'),
  'migrations-path': path.join(__dirname, '../migrations'),
  'seeders-path': path.join(__dirname, '../seeders'),
  'models-path': path.join(__dirname, '../models')
};
```

- `sequelize --options-path=[options.js 주소]`를 입력해야 한다.

sequelize 테이블명 plural끄고 싶을때:

- global설정하고 싶을때: config에서 `define.freezeTableName: true`를 한다.
- 모델별 설정하고 싶을때: `/models/[모델명.js]`에서 빈객체에 `tableName: '[단수명]'`을 한다.

sequelize FULLTEXT 인덱싱 하고싶을떄:

```js
{
  indexes: [
    {
      type: 'FULLTEXT',
      fields: ['name', 'description']
    }
  ];
}
```

아래는 sql문으로다가 ㅎㅎ

```sql
FULLTEXT KEY `idx_ft_product_name_description` (`name`, `description`)
```

풀텍스트 데려오는 쿼리는

## 참조

[Performing FULLTEXT search after JOIN operation in sequelize](https://stackoverflow.com/questions/40571881/performing-fulltext-search-after-join-operation-in-sequelize)
[Is there a way do MySQL FullText search in Sequelize 4?](https://stackoverflow.com/questions/47742180/is-there-a-way-do-mysql-fulltext-search-in-sequelize-4)
