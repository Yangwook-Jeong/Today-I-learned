docker multi container로 redis, nodejs를 한 번에 띄울 수 있다.

docker-compose.yml을 사용해서 옵션질을 해준다.

redis는 redis.conf 파일을,
nodejs는 .env 파일을 각각 컨테이너 내부로 옮겨줘야한다.
