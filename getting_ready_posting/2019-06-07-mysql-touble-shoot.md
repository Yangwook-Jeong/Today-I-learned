## config

- 5.6 이하: `/etc/mysql/my.cnf`
- 5.7 이상: `/etc/mysql/mysql.conf.d/mysqld.cnf`

## Can't connect to local MySQL server through socket '/var/run/mysqld/mysqld.sock' 에러

- 원인:
  - mysql 데몬이 죽어있다.
  - my.cnf파일 자체가 깨졌을 경우에 해당 메시지가 나타난다.
- 참고:
  - mysql.sock파일은 원래 비어있는 파일이고 mysql이 실행되면 자동으로 생성된다.
- 해결책:
  - 완전 삭제 후 재설치를 한다.
