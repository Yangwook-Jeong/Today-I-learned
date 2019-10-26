- python - [pip easy install](https://bootstrap.pypa.io/ez_setup.py) 다운로드 후 cli에서 실행한다. - pip upgrade - linux: `pip install --upgrade pip` - windows: `python -m pip install --upgrade pip` - 패키지파일 한 번에 설치하려면 - `pip install -r requirements.txt`

## writable directory

https://stackoverflow.com/questions/39383465/python-read-only-file-system-error-with-s3-and-lambda-when-opening-a-file-for-re

https://aws.amazon.com/ko/blogs/korea/new-for-aws-lambda-use-any-programming-language-and-share-common-components/

https://ndb796.tistory.com/293

https://dev.to/vealkind/getting-started-with-aws-lambda-layers-4ipk

- lambda-analytics 로컬 디버깅
- 10/23

  - python-lambda-local로 로컬 실행중 오류 발생
    - `On Windows only 'spawn' is available. On Unix 'fork' and 'spawn' are always supported, with 'fork' being the default.`
    - windows에는 `fork`메서드가 없어 항상 `spawn`메서드로만 실행이 되기때문
    - fake data가 들어있는 `.json`파일을 연결해 일일이 수정해가면서 디버깅해야 하는 한계점 존재
  - 함수를 통째로 올리면 생기는 문제
    - 용량이 커져(90mb) s3를 통해서 업로드만 가능하며, s3 버킷에 부하 과중, 업로드 시간 과다로 인한 개발시간 소요
    - 3mb 이상이므로 콘솔에서 코드를 조작할 수 없는 문제 존재
    - 해결하기 위해 2018/12 이후 나온 layers 기능을 적극 활용
      - layer사용 전 로컬 테스트하는 과정에서 의존성 모듈 관련 에러 발생
      - `pip install -r requirements.txt`시 typed-ast 설치 중 에러 발생
      - test function에서 layer를 import하는 행동은 **성공**
      - 전역 pip 모듈 및 캐시 제거 후 역시 에러 발생
      - venv를 사용한 가상환경에서 실행시 에러 발생
  - 롤백후 local, lambda 콘솔에서도 **사용 가능**

- 10/24
  - wordcloud는 **설치 가능**하지만, matplotlib은 설치중 에러 발생
    - anaconda 설치하니 **성공**까 아주 잘됨
    - src, layer 따로 올려서 실행중 에러 발생
      - layer
        - 크기가 너무 커서(400mb) 업로드 실패
        - import할 모듈 분리 업로드하니 **성공**
      - src
        - `layer가 있음에도 _jpype`를 불러오지 못하는 문제 발생
- 10/25
  - layer가 5개 이상은 불러오지 못하는 문제 발생
    - 액션별로 함수를 묶어 업로드시 `Unknown jpype resource` 에러 발생
    - legacy 모듈 업로드시 requests 모듈 없다는 에러 발생
    - requests 모듈 추가 업로드시 `ctypes.WinDLL` 에러 발생
  - legacy + gen-wordcloud 모듈 업로드시 260mb 초과 에러 발생
  - layer는 legacy, fn은 serverless-work543-analytics 업로드시 `ctypes.WindDLL` 에러 발생
  - konlpy 누락 및 코드 인라인 편집 모듈 하나씩 import시 numpy, PIL에서 에러 발생
  - pillow, wordcloud 누락 및 numpy, matplotlib에서 에러 발생
  - numpy, matplotlib, wordcloud에서 `ctypes.WinDLL` 에러 발생
    - `Yes this seems like a version problem. Linux libraries are sometimes different from windows ones. requests is definitely different`
  - ctypes를 layer에 넣었을 때는 `/opt/python`에서 `__init.py`를 로딩하지만 `ctypes.WinDLL` 에러 발생
    - 가상환경때문도 아니고, 파일은 있는데 클래스에 들어갈 인자가 없어서 실행이 안되는게 이유인듯
    - 혹은 aws lambda와 local의 os가 달라서 그럴 수도 있음
      - `print(os.name)`시
        - local: `nt`
        - aws lambda: `posix`
      - `print(platform.system())`시
      - local: `Windows`
      - aws lambda: `Linux`
    - 환경차이에 의한 오류 발생이 확실해보임
    - 환경마다 같은 명령어로 설치하는 모듈도 차이가 있는지 확인 필요
  - 실장님 가이드: docker 위에서 구동시켜봐라
    - lambci/lambda:python3.7 위에서 구동시킬 시 `src/wordcount`를 못찾는 에러 발생
    - 컨테이너 안에 들어간 모듈이 windows에서 설치한 모듈이므로 똑같은 `WinDLL` 에러 발생
    - 컨테이너 내부에서 `requirements.txt`를 이용해 설치시
    - legacy만 원래꺼 사용하고, addon은 `pip install`로 설치한다면 aws credential 오류 발생
    - credential 정보를 `boto3.client()`에 직접 입력하면 에러 발생
    - docker 이미지 안에 aws-cli 있어서 `aws configure`로 해결
    - container안에서 설치한 linux용 모듈을 layer로 배포하고 테스트하면 cannot open resource 에러 발생
      - 폰트 설치 안된 것이 이유
    - 디렉토리를 환경별로 통일하지 않은 것이 이유
      - lambci 컨테이너에서 `/tmp`, `/var/task`, `/opt` 폴더 위치를 잘 참고하는 것이 중요
    - 폰트를 layer에 넣고 불러오니 **성공**

나중에 글쓸때 참고하기 ㅠㅠ
