---
layout: post
title: Sequelize 쿼리 미세먼지 꿀팁 사용하기
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1552474849/logo/posts/sequelize.jpg
---

## 목차

- [테이블명 plural옵션 끄고싶을때](#테이블명-plural옵션-끄고싶을-때)
- [FULLTEXT 인덱싱 하고싶을 때](#FULLTEXT-인덱싱-하고싶을-때)
- [fn사용법 예시 substr](#fn사용법-예시-substr)
- [카운터 형태로 기존 값에 새로운 값을 더하고싶을 때](#카운터-형태로-기존-값에-새로운-값을-더하고싶을-때)
- [raw, plain 옵션](#raw,-plain-옵션)
- [참조](#참조)

## 테이블명 plural옵션 끄고싶을 때

### global로 설정하고 싶을때

`config` 파일에서 아래와 같이 `freezeTableName` 옵션을 작성합니다.

```json
"development": {
    "database": "database",
    "username": "root",
    "password": "root",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "freezeTableName": true
}
```

혹은 js파일로 관리하신다면 다음과 같이 객체로 묶어 다른 옵션들과 함께 관리할 수 있습니다.

```js
const define = {
  freezeTableName: true
  // more options
};
```

### 모델별 설정하고 싶을때

`db/models/[모델명.js]`에서 아래와 같이 `tableName: '[단수명]'`을 입력해줍니다. 변수명과 `sequelize.define()`에서 정해준 테이블명이 복수명일지라도 `tableName` 옵션을 준다면 데이터베이스에서는 테이블명이 단수명으로 나올겁니다.

```
{ tableName: 'model' }
```

전체적인 쿼리의 모습은 아래와 같습니다.

```js
'use strict';
module.exports = (sequelize, DataTypes) => {
  const models = sequelize.define(
    'models',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      }
    },
    {
      tableName: 'model'
    }
  );
  models.associate = function(models) {};
  return models;
};
```

---

## FULLTEXT 인덱싱 하고싶을 때

보통 인덱스는 자주 질의하는 컬럼의 검색성능을 높히기 위해 사용합니다. fulltext 인덱스는 한 컬럼에 많은 형태의 데이터가 담겨있어서 효율적으로 데이터를 찾기 위해 사용하는 경우가 일반적입니다. fulltext 인덱스는 sql로 다음과 같이 테이블 컬럼 정의를 다 내린후 마지막에 작성합니다.

```sql
FULLTEXT KEY `idx_ft_product_name_description` (`name`, `description`)
```

위 sql문을 sequelize 모델 정의에서 다음과 같이 작성합니다. 반드시 `/models`에 있는 테이블 정의 파일에서 인덱스를 정의해야합니다. 컬럼 정의를 마친후 `sequelize.define()`의 두번째 인자가 되는 객체에 정의해주어야 함을 잊지말아주세요. 위에서 설명한 [테이블명 plural옵션 끄고 싶을때](#테이블명-plural옵션-끄고-싶을때)에서 옵션을 작성하는 곳과 같은 곳에 `indexes`옵션을 작성해주세요. 옵션은 아래와 같이 사용합니다.

```
indexes: [
      {
        type: 'FULLTEXT',
        fields: ['name', 'description']
      }
    ]
```

전체적인 쿼리의 모습은 아래와 같습니다.

```js
const product = sequelize.define(
  'product',
  {
    product_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      type: DataTypes.STRING(100)
    },
    description: {
      type: DataTypes.STRING(1000)
    }
  },
  {
    indexes: [
      {
        type: 'FULLTEXT',
        fields: ['name', 'description']
      }
    ]
  }
);
```

---

## fn사용법 예시 substr을 사용하고 싶을 떄

sql에서는 데이터를 사용할때 문자열 수를 제한하고 싶을때 데이터베이스 단에서 해결하려면 [`SUBSTR()`](https://www.w3schools.com/sql/func_mysql_substring.asp) 함수를 사용할 수 있습니다.

자바스크립트에서 제공하는 [`substring()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr) 함수와 얼추 같습니다.

사용법은 아래와 같습니다.

```sql
SUBSTRING(string, start, length)
```

혹은

```sql
SUBSTRING(string FROM start FOR length)
```

아래는 `product` 테이블에서 `description` 컬럼의 문자열을 1번째부터 10번째까지로 제한하는 쿼리입니다. 자바스크립트 `substring()`과의 차이점은 첫번째 문자열이 0이 아니라 1이라는겁니다.

```sql
SELECT SUBSTR(description, 1, 10) AS description FROM product;
```

위 sql문을 sequelize 쿼리로 바꾸면 아래와 같이 됩니다.

```js
const data = await product.findAll({
  attributes: [
    sequelize.fn('substring', sequelize.col('description'), 1, 10),
    'description'
  ]
});
```

다른 함수들도 거의 다 사용할 수 있으니 [공식매뉴얼](http://docs.sequelizejs.com/manual/querying.html)을 확인해보세요.

---

## 카운터 형태로 기존 값에 새로운 값을 더하고 싶을 때

카운터를 적용해야 하는 경우에 다음과 같은 sql문을

```sql
UPDATE product SET quantity = quantity + 2 WHERE product_id = 1;
```

을 sequelize 쿼리로 바꾸고싶으면 아래와 같이 작성합니다.

```js
await product.update(
  { field: sequelize.literal('field + 2') },
  { where: { product_id } }
);
```

---

## raw, plain 옵션

두 옵션 모두 배열이나 객체를 백엔드단에서 가공하고 싶은데 쿼리 변수가 `undefined`라고 나올때 사용할 수 있는 옵션입니다. 왜 `undefined`로 나오는지에 대해서도 아셔야합니다. sequelize 쿼리를 콘솔에 찍어보면 우리가 원하는 결과값으로 찍히지 않고 아래와 같이 찍힙니다.

```js
{ dataValues:
  (...)
  __options:
   { timestamps: true,
   (...)
   }
}
```

이런 형태의 데이터는 직접 가공을 할 수가 없어 아래와 같은 옵션을 사용하게 되는겁니다.

### `{ plain: true }`

배열 안에 데이터가 들어있는 경우라면 `data[0]`만 결과값으로 노출이 되기 때문에 `findOne()`을 콘솔에서 json형태로 보고싶거나 가공하고 싶을 때 사용합니다.

### `{ raw: true }`

`findOne()` 및 `findAll()`에서 json형태로 보거나 가공하고 싶을 때 사용합니다. `raw`옵션을 사용하지 않은 결과값은 아래와 같습니다.

```js
{
  'image': 'gallic-cock.gif',
  'shopping_carts': [
    {
      'item_id': 1086
    }
  ]
}
```

`raw`옵션을 사용하면 객체의 중첩은 풀렸지만 객체 키가 사용하기 불편해집니다.

```js
[
  {
    image: 'gallic-cock.gif',
    'shopping_carts.item_id': 1086
  }
];
```

왜냐하면 `data.shopping_carts.item_id`로 사용하지 못하고 대신 `data['shopping_carts.item_id']`의 형태로 사용해야 하기때문에 코드가 지저분해지기 때문이죠.

다른 방법도 있습니다. 쿼리를 넣을때 다음과 같이 할 수도 있습니다.

```js
await product.findAll({}).map(o => o.get({ raw: true }));
```

---

## 참조

- [Performing FULLTEXT search after JOIN operation in sequelize](https://stackoverflow.com/questions/40571881/performing-fulltext-search-after-join-operation-in-sequelize)
- [Is there a way do MySQL FullText search in Sequelize 4?](https://stackoverflow.com/questions/47742180/is-there-a-way-do-mysql-fulltext-search-in-sequelize-4)
- [How to update and increment?](https://github.com/sequelize/sequelize/issues/7268)
- [https://github.com/sequelize/sequelize/issues/6950](Can findAll() directly get plain objects?)
