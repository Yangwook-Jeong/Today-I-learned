- 클라이언트와 서버 둘 다 같은 app_id로 초기화해준다. 
- 클라이언트에서 firebase 서버에 어떤 email, password로 로그인 요청을 보낸다. 
- 로그인에 성공하면  id_token이 나온다. 
- id_token을 요청헤더에 실어 서버에 보낸다.
- 전달받은 id_token으로 firebase에 유효성 검사 요청을 보낸다.
- id_token이 유효하다면 user 정보를 받을 수  있다. 
- user에 들어있는 uid를 얻을 수 있다.
- uid를 우리 db에 저장한다.
- 다시 클라이언트로 돌아간다. 클라이언트에서 보내는 id_token이 같으면 항상 같은 uid를 얻을 수 있다.
- 따라서 클라이언트에서 요청을 보낼때 항상 헤더에 id_token을 실어 보내면, 서버에서는 미들웨어를 통해 uid를 얻는 경우와 얻지 못하는 경우로 분기해 에러처리를 한다.
- 클라이언트에서 어떤 id_token과 함께 어떤 키워드를 이 사용자가 저장하겠다는 요청을 보낸다. 
- 서버에서는 uid를 firebase 서버에서 받아낸다.
- db에 uid를 가진 사용자를 쿼리한다.
- 해당 사용자가 있으면 그 사용자 정보에 어떤 키워드를 추가한다.