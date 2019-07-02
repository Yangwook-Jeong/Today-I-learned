---
layout: post
title: Sequelize cli 미세먼지 팁
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1552474849/logo/posts/sequelize.jpg
---

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

# Sequelize Many-to-Many 관계 이용하기

## M:N

테이블 3개로 작동하며, 다리테이블은 쿼리에 사용하지 않는다. 하지만 json데이터에는 다리테이블이 찍히니 이걸 제외하고 반환시키고 싶다면 아래와 같은 옵션을 반드시 사용한다.

```js
through: {
  attributes: [];
}
```

## 참조

- [ORM(Object Relation Mapping)을 이용해보자!!! 1편 Sequelize.js](https://real-dongsoo7.tistory.com/63)

## fn사용법 예시는 substr

```sql
SELECT SUBSTR(description, 1, 10) AS description FROM product;
```

를 sequelize 쿼리로 하면

```js
const data = await product.findAll({
  attributes: [
    sequelize.fn('substring', sequelize.col('description'), 1, 10),
    'description'
  ]
});
```

## 기존 값에 값을 더하고싶을떄

```sql
UPDATE "myModel" SET "some_fild"="some_fild" + -2 WHERE "id" = '1';
```

을 sequelize 쿼리로 바꾸고싶으면

```js
Model.update(
  { field: sequelize.literal('field + 2') },
  { where: { id: model_id } }
);
```

## 참조

- [How to update and increment?](https://github.com/sequelize/sequelize/issues/7268)

## raw, plain옵션

- `findOne()`을 콘솔에서 json형태로 보고싶거나 가공하고싶을때는 `{ plain: true }`옵션을 사용하면 데이터가 잘 나온다.

- `findOne()` 및 `findAll()`에서 json형태로 보거나 가공하고싶을때는 `{ raw: true }`옵션을 사용하면 된다. 하지만 다음과 같이 나온다.

```js
// 원래 데이터
{
  'image': 'gallic-cock.gif',
  'shopping_carts': [
    {
      'item_id': 1086
    }
  ]
}

// raw처리한 데이터
[
  {
  'image': 'gallic-cock.gif',
  'shopping_carts.item_id': 1086
  }
]
```

- 다른 방법도 있다. 쿼리를 넣을때 다음과 같이 한다.

```js
await model.findAll({}).map(el => el.get({ plain: true }));
```

위와 같이 쿼리하면 아래처럼 나온다.

```js
// 원래 데이터
{
  'image': 'gallic-cock.gif',
  'shopping_carts': [
    {
      'item_id': 1086
    }
  ]
}
```

## 참조

- [https://github.com/sequelize/sequelize/issues/6950](Can findAll() directly get plain objects?)
