```js
// 기존 사용한 중첩 try-catch 블럭
try {
  const getEmptyCartQuery = await shopping_cart.findOne({
    where: {
      [Op.and]: [{ cart_id }, { product_id: null }, { attributes: null }]
    }
  });
  const getEmptyCart = getEmptyCartQuery.get({ plain: true });
  if (getEmptyCart) {
    await shopping_cart.update(
      {
        product_id,
        attributes,
        add_on,
        quantity: 1
      },
      { where: { cart_id } }
    );
  }

  const data = await shopping_cart.findAll({
    where: { cart_id }
  });
  ctx.body = successMessage('cart', data);
} catch (e) {
  try {
    const needsUpdatedQuantityQuery = await shopping_cart.findOne({
      where: {
        [Op.and]: [{ cart_id }, { product_id }, { attributes }]
      }
    });
    const needsUpdatedQuantity = needsUpdatedQuantityQuery.get({
      plain: true
    });
    if (needsUpdatedQuantity) {
      await shopping_cart.update(
        {
          quantity: sequelize.literal('quantity + 1'),
          add_on
        },
        { where: { [Op.and]: [{ cart_id }, { product_id }, { attributes }] } }
      );
    }

    const data = await shopping_cart.findAll({
      where: { cart_id }
    });
    ctx.body = successMessage('cart', data);
  } catch (e) {
    try {
      const needsNewCartQuery = await shopping_cart.findOne({
        where: {
          [Op.and]: [{ cart_id }],
          [Op.or]: [
            { product_id: { [Op.ne]: product_id } },
            { attributes: { [Op.ne]: attributes } }
          ]
        }
      });
      const needsNewCart = needsNewCartQuery.get({ plain: true });

      if (needsNewCart) {
        await shopping_cart.create({
          cart_id,
          product_id,
          attributes,
          quantity: 1,
          add_on
        });
      }

      const data = await shopping_cart.findAll({
        where: { cart_id }
      });
      ctx.body = successMessage('cart', data);
    } catch (e) {
      ctx.status = 400;
      ctx.body = errorMessage(e.message);
    }
  }
}
```

```js
// 변수 안에서 catch 블럭 사용하기
try {
  const getEmptyCartQuery = await shopping_cart
    .findOne({
      where: {
        [Op.and]: [{ cart_id }, { product_id: null }, { attributes: null }]
      }
    })
    .catch(errorMessage('getEmptyCart error'))
    .then(async () => {
      await shopping_cart.update(
        {
          product_id,
          attributes,
          add_on,
          quantity: 1
        },
        { where: { cart_id } }
      );
    });

  const needsUpdatedQuantityQuery = await shopping_cart
    .findOne({
      where: {
        [Op.and]: [{ cart_id }, { product_id }, { attributes }]
      }
    })
    .catch(errorMessage('needsUpdatedQuantity error'))
    .then(async () => {
      await shopping_cart.update(
        {
          quantity: sequelize.literal('quantity + 1'),
          add_on
        },
        { where: { [Op.and]: [{ cart_id }, { product_id }, { attributes }] } }
      );
    });

  const needsNewCartQuery = await shopping_cart
    .findOne({
      where: {
        [Op.and]: [{ cart_id }],
        [Op.or]: [
          { product_id: { [Op.ne]: product_id } },
          { attributes: { [Op.ne]: attributes } }
        ]
      }
    })
    .catch(errorMessage('needsNewCart error'))
    .then(async () => {
      await shopping_cart.create({
        cart_id,
        product_id,
        attributes,
        quantity: 1,
        add_on
      });
    });

  const data = await shopping_cart.findAll({
    where: { cart_id }
  });
  ctx.body = successMessage('cart', data);
} catch (e) {
  ctx.status = 400;
  ctx.body = errorMessage(e.message);
}
```

```js
// Promise.all 사용하기
try {
  const [getEmptyCart, needsUpdatedQuantity, needsNewCart] = await Promise.all([
    shopping_cart.findOne({
      where: {
        [Op.and]: [{ cart_id }, { product_id: null }, { attributes: null }]
      }
    }),
    shopping_cart.findOne({
      where: {
        [Op.and]: [{ cart_id }, { product_id }, { attributes }]
      }
    }),
    shopping_cart.findOne({
      where: {
        [Op.and]: [{ cart_id }],
        [Op.or]: [
          { product_id: { [Op.ne]: product_id } },
          { attributes: { [Op.ne]: attributes } }
        ]
      }
    })
  ]);

  if (getEmptyCart) {
    await shopping_cart.update(
      {
        product_id,
        attributes,
        add_on,
        quantity: 1
      },
      { where: { cart_id } }
    );
  }
  if (needsUpdatedQuantity) {
    await shopping_cart.update(
      {
        quantity: sequelize.literal('quantity + 1'),
        add_on
      },
      { where: { [Op.and]: [{ cart_id }, { product_id }, { attributes }] } }
    );
  }

  if (needsNewCart) {
    await shopping_cart.create({
      cart_id,
      product_id,
      attributes,
      quantity: 1,
      add_on
    });
  }

  const data = await shopping_cart.findAll({
    where: { cart_id }
  });
  ctx.body = successMessage('cart', data);
} catch (e) {
  ctx.body = errorMessage(e.message);
}
```
