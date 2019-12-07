## config file

- 5.6 이하: `/etc/mysql/my.cnf`
- 5.7 이상: `/etc/mysql/mysql.conf.d/mysqld.cnf`

## 한글설정

`ALTER DATABASE [db_name] CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`

이모지까지가능


- mysql

  - migration: mysql migration toolkit 혹은 workbench를 사용해서 할 수가 있다.
  - error 2002 (hy000)
    - 원인:
      - mysql 데몬이 죽어있다.
      - my.cnf파일 자체가 깨졌을 경우에 해당 메시지가 나타난다.
    - 참고:
      - mysql.sock파일은 원래 비어있는 파일이고 mysql이 실행되면 자동으로 생성된다.
    - 해결책:
      - 완전 삭제 후 재설치를 한다.