## migration

`sequelize db:migrate` <-> `sequelize db:migrate:undo`

## seeders

- sequelize seeder를 통한 db 테스트:  
  `sequelize seed:create 또는 generate --name NAME`  
  `sequelize db:seed:all`  

## promise


- SequelizeJS: `Promise.all()`을 사용하면 괄호 안에 객체를 써서 두개의 쿼리를 동시에 보낼 수 있다. 다음은 예시이다.

```js
// Serial execution
let users;
let menus;

Promise.all([
  models.User.findAll({
    attributes: ['id', 'name', 'phone', 'address']
  }),
  models.Menu.findAll()
]).then(result => {
  if (!result[0]) throw new Error('Not Found');
  if (!result[1]) throw new Error('Not Found');

  users = result;
  menus = result;

  console.log(users);
  console.log(menus);
});
```

## encoding


- sequelize: 한글 컬럼을 저장하려면

  1. 데이터 문자셋을 변경한다 `ALTER DATABASE [db_name] CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
  2. `migrations`에 저장된 파일에서 `STRING`값을 `STRING(191)`로 수정한다.

## join

- sequelize:

  - sequelize query: `.findOne()` || `.findAll()`
    - LEFT OUTER JOIN: { required: false }
    - INNER JOIN: { required: true }
  - association:
    - 셀프조인으로 1:N관계일때, `.hasMany()` 메소드에 `as`키로 자식으로 올 테이블 자신의 별명을 정한다. 안그럴시, 콘솔에 alias 관련 메시지가 찍힌다.

## nested model

- sequelize:

  - nested model에서 order: 중첩된 모델 이름을 배열 안에 작성한다. 3개 이상의 다중 중첩에도 아래와 같은 예제를 똑같이 사용할 수 있다.

  ```js
  // 테이블 한개만 중첩되고 자식테이블에서 id를 내림차순으로 불러올 때
  Parent.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Child,
        attributes: ['id', 'name']
      }
    ],
    order: [Child, 'id', 'desc']
  });

  // 테이블 두개이 중첩되고 손자테이블에서 id를 내림차순으로 불러올 때
  Parent.findAll({
    attributes: ['id', 'name'],
    include: [
      {
        model: Child,
        attributes: ['id', 'name'],
        include: [
          {
            model: GrandChild,
            attributes: ['id', 'name']
          }
        ]
      }
    ],
    order: [Child, Grandchild, 'id', 'desc']
  });
  ```

  ## join
  
- sequelize:
  - `association`을 설정하면 `include`옵션을 통해서 `left join`을 할 수가 있다.


## hook


- sequelize hooks: 비동기 액션을 가지고 있고 해당 함수는 Promise를 반환해야한다.

  - `define()`을 통한 방법:

  ```js
  var User = sequelize.define(
    'user',
    {
      username: DataTypes.STRING,
      mood: {
        type: DataTypes.ENUM,
        values: ['happy', 'sad', 'neutral']
      }
    },
    {
      hooks: {
        beforeValidate: function(user, options) {
          user.mood = 'happy';
        },
        afterValidate: function(user, options) {
          user.username = 'Toni';
        }
      }
    }
  );
  ```

  - `hook()`을 통한 방법:

  ```js
  User.hook('beforeValidate', function(user, options) {
    user.mood = 'happy';
  });

  User.hook('afterValidate', function(user, options) {
    return sequelize.Promise.reject("I'm afraid I can't let you do that!");
  });
  ```

  - 바로 메서드 사용하는 방법:

  ```js
  User.beforeCreate(function(user, options) {
    return hashPassword(user.password).then(function(hashedPw) {
      user.password = hashedPw;
    });
  });

  User.afterValidate('myHookAfter', function(user, options, fn) {
    user.username = 'Toni';
  });
  ```


- sequelize:

  - `findAndCountAll({where: {}, offset, limit})`: where조건에 맞는 레코드 수를 count객체로 where조건과 limit, offset 범위에 맞는 레코드를 rows객체로 받아올 수 있다.
