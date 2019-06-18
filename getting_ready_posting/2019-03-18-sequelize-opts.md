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
