

## network 문제

macos에서는 `localhost`, `127.0.0.1` 대신 `host.docker.internal`를 사용해야 함!
- ref: https://github.com/docker/compose/issues/3800#issuecomment-496480571

## Python 버전 문제

에러 메시지에 gcloud에 있는 서브패키지를 import하지 못한다는 로그와 python 버전 문제 관련 로그가 뜨면 아래와 같은 내용을 쉘 rc 파일에 추가한다.

```sh
export CLOUDSDK_PYTHON=python3
```