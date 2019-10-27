---
layout: post
title: AWS Lambda에서 Python 코드 배포 삽질기
author: Yangeok
categories: DevOps
date: 2019-10-30 09:38
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1572139949/logo/posts/pylambci.jpg
---

## 작업환경

- windows 10
- python 3.7

## 목차

- [vanilla python 삽질](#vanilla-python-삽질)
  - [python-lambda-local 삽질](#python-lambda-local-삽질)
- [anaconda 삽질](#anaconda-삽질)
  - [전역 pip 모듈 및 캐시 제거](#전역-pip-모듈-및-캐시-제거)
  - [venv로 가상환경에서 실행](#venv로-가상환경에서-실행)
- [python on docker 삽질](#python-on-docker-삽질)
- [TL;DR](#TL;DR)
- [참조](#참조)

## vanilla python 삽질

빠른 코드 배포를 위해 다른 생각 없이 로컬환경에 python을 설치해 pip로 패키지를 설치했습니다. 로컬과 aws lambda의 리눅스 환경이 차이가 있다는 것을 이 때까지는 인지하지 못하고 있었죠. 며칠동안 펼쳐질 고통을 이 때 미리 깨달았어야 했습니다.

기존에 있던 코드에 살을 덧대는 과정이라 이미 lambda에서 돌아가는 코드라 내가 뭘 추가한들 별 일 있겠냐는 생각이었던 것 같습니다. `jpype`와 c의존 모듈을 실행하기 위해 [jdk](https://www.oracle.com/technetwork/java/javase/downloads/index.html)와 [Microsoft Visual C++ 2015 재배포 가능 패키지 업데이트 3](https://visualstudio.microsoft.com/ko/vs/older-downloads/)을 설치했음에도 에러가 빵빵 터집니다. 고통스럽습니다.

조금 방향을 틀어 [python-lambda-local](https://pypi.org/project/python-lambda-local/)로 로컬환경에서 aws lambda를 실행할 수 있다는 것을 확인했습니다. 로컬 실행중 오류가 발생합니다. [여기](https://github.com/HDE/python-lambda-local/issues/45)에서 확인할 수 있듯이 `fork`메서드가 필요한데, 윈도우에서는 `spawn`메서드밖에 지원하지 않는다는군요.

> On Windows only 'spawn' is available. On Unix 'fork' and 'spawn' are always supported, with 'fork' being the default.

### python-lambda-local 삽질

`python-lambda-local`을 사용할 수 없기 때문에 발생하는 한계점은 fake data가 들어있는 `.json`파일을 연결해 일일이 수정해가면서 디버깅해야 하는 점이었습니다. 그 모듈이 아니면 `.json`를 `handler`함수에 인자로 넣어주는 방법을 몰랐기 때문에 아래와 같은 코드가 될 수밖에 없었습니다.

```py
# using production mode
def handler(event, context):
    datasetId = event['queryStringsParameters']['datasetId']

# using development mode
def handler(event, context):
    with open('../conf/event.json') as json_data:
        data = json.load(json_data)
    datasetId = data['queryStringsParameters']['datasetId']
```

참고로 json파일은 아래와 같이 생겼습니다. `queryStringsParameters`는 lambda 함수가 실행되는 트리거에 어떤 url로 요청을 보낼때 query string에 집어넣는 값이 그대로 전달되는 객체입니다.

```json
{
	"queryStringsParameters": {
		"datasetId": "6a9d03d7-5204-41b0-9e34-03c45b1224d7"
	}
}
```

다시 원점으로 돌아왔습니다. nodejs에서는 `package.json`만 넣어주면 aws lambda에서 알아서 패키지를 설치해주는데 python은 그런게 없나봅니다. 모듈을 빼고 소스코드만 올리니 `ImportError: No module named`가 나옵니다. 모듈까지 같이 올리니 생기는 문제가 아래와 같았습니다.

- 용량이 커져(90mb) s3를 통해서 업로드만 가능하며, s3 버킷에 부하 과중, 업로드 시간 과다로 인한 개발시간 소요
- 3mb 이상이므로 콘솔에서 코드를 조작할 수 없는 문제 존재

그렇습니다. 소스코드 바꿔서 올릴때마다 아주 귀찮습니다. 이것을 해결하기 위해 2018년 12월 경에 나온 layer 기능을 사용할겁니다. 로컬에서 모듈을 모두 로딩만 가능한 상태로 만들고 layer를 사용해야겠습니다.

---

## anaconda 삽질

[matplotlib](https://matplotlib.org/3.1.1/users/installing.html)을 설치하는 과정에서 뭔가를 발견했습니다. [anaconda](https://www.anaconda.com)라는 과학패키지 및 패키지매니저를 제공하는 배포판이었습니다. 일일이 모듈을 설치하다보면 의존성 문제가 생길 수 있어 anaconda를 쓰길 더 추천하더군요. 어차피 같은 환경이니 아까 발생했던 오류들이 똑같이 발생합니다.

---

### 전역 pip 모듈 및 캐시 제거

이 때도 살짝 샛길로 나갔다 들어옵니다. 의존성의 문제란 것을 미처 깨닫지 못한 저는 전역 pip 모듈 및 캐시를 제거하는 행동을 합니다. 네, 역시 안돼요.

---

### venv로 가상환경에서 실행

가상환경에서 실행하면 좀 다르겠다는 생각으로 conda prompt에서 가상환경을 만들어 모듈을 설치합니다. 가상환경 생성은 아래와 같이 입력합니다.

`conda create -n <venvname> python=<version>`

패키지 설치도 마찬가지로 `pip` 대신 `conda`를 사용합니다. 가상환경에 진입 시에는 `activate <venvname>`, 빠져나올 때에는 `deactivate <venvname>`을 입력합니다. 그냥 `deactivate`는 이제 deprecated라고 합니다. 패키지들을 일일이 설치합니다. **로컬**에서 코드를 실행해보니 코드가 돌아갑니다. 기분이 좋아졌어요.

이제 aws lambda에 업로드할 차례입니다. zip파일을 직접 업로드합니다. 용량제한이 걸립니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572169451/python-lambda/py-01.jpg)

s3에 업로드해서 lambda 함수를 저장합니다. 패키지가 디렉토리가 포함된 압축파일을 올리려니 용량제한이 걸립니다. 이래서 layer가 필요하기도 한가봅니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572169450/python-lambda/py-02.jpg)

layer에 패키지를 묶어서 넣어줍니다. 네, 안올라갑니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572169450/python-lambda/py-03.jpg)

venv가 문제인가봅니다. layer에 모듈 종류별로 올리니 10개는 족히 됩니다. 그러고는 함수에서 layer들을 불러옵니다. 안된대요.

![](https://res.cloudinary.com/yangeok/image/upload/v1572169820/python-lambda/py-04.jpg)

venv가 왜 프로젝트 폴더 안에 들어있는지는 잘 모르겠지만 지우고나니 용량제한에 걸리지 않을 것같아 모듈을 한데 모아서 업로드해서 불러오니 layer를 잘 읽어옵니다. 테스트를 합니다. 하지만 에러가 발생합니다.

> ImportError: No module named

공식문서를 찾아보니 layer에 업로드된 파일은 압축을 풀었을 시에 `python` 폴더 안에 모듈들이 들어가 있어야 한다고 합니다. lambda 내부적으로는 `opt/python` 내부에 모듈들이 얹혀진다고 합니다. 폴더구조를 바꿔준 다음 업로드하자 아래와 같은 에러가 나옵니다.

> cannot import name 'WinDLL' from 'ctypes'

드디어 처음 언급한 환경차이를 인지하지 못한 대가를 치루는군요. [이 곳](https://stackoverflow.com/questions/57333103/aws-lambda-python3-7-function-numpy-cannot-import-name-windll)에서 발췌한 내용입니다.

> Yes this seems like a version problem. Linux libraries are sometimes different from windows ones. requests is definitely different

환경차이에 대한 의심이 아직 가시지 않은 저는 lambda 인라인 코드 편집기능을 이용해 로컬과 lambda 함수의 환경을 확인해봅니다.

```py
import os
import platform

print(os.name)
# local: 'nt'
# lambda: 'posix'

print(platform.system())
# local: 'Windows'
# lambda: 'Linux'
```

잘 확인했습니다. 왜 이제야 docker를 쓸 생각을 한걸까요ㅎㅎ

---

## python on docker 삽질

친절하게도 누군가 docker 이미지를 만들어뒀습니다. [lambci/lambda](https://hub.docker.com/r/lambci/lambda/)를 사용하면 바로 실행가능한 모드도, 빌드해서 배포가능한 형태로 가공하기 위한 모드도 사용할 수 있습니다. 저는 3.7 버전을 사용하고 있고, 파일구조를 lambda 함수와 똑같은 구조로 만들어야 하므로 아래와 같은 명령어를 사용했습니다.

```sh
docker run -it \
-v $(pwd -W)/src:/var/task \
-v $(pwd -W)/opt:/opt \
-v $(pwd -W)/conf:/var/conf \
lambci/lambda:build-python3.7 bash
```

`/src`는 소스파일이, `/opt/python`은 패키지파일이 있습니다. `/conf`에는 `event.json`, `aws.config.json`, `requirements.txt`를 컨테이너 생성시 세팅하기 위한 용도로 볼륨을 연결시켜뒀습니다.

리눅스 컨테이너에서 실행하기 때문에 lambda 함수와 똑같은 환경을 사용하고 있습니다. 때문에 기존에 설치한 모듈을 사용하면 위에서 언급한 `WinDLL`이 없다는 에러가 발생합니다. 컨테이너 내부에서 `requirements.txt`를 사용해 패키지를 설치하고 실행해봅니다.

> Unable to locate credentials

aws 인증을 하지 않았습니다. lambci/lambda 이미지는 aws-cli가 설치되어 있기 때문에 계정정보를 바로 `aws configure` 명령어로 연동이 가능합니다.

```sh
aws configure
AWS Access Key ID [None]: <aws_access_key_id>
AWS Secret Access Key [None]: <aws_secret_access_key>
Default region name [None]: <region_name>
Default output format [None]:
```

위와 같이 연결후 코드를 실행해보니 코드가 잘 작동합니다. lambda 함수에 파일을 배포해줄 차례입니다. 제 코드에는 파일을 저장하는 부분이 있어 에러가 터집니다.

> Only `/tmp` seems to be writable in AWS Lambda.

`/tmp` 디렉토리에 파일을 저장하고 테스트해보니 테스트에 성공했단 메시지를 볼 수 있었습니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572172179/python-lambda/py-05.jpg)

---

## TL;DR

인라인 코드 편집기는 10mb 이상이면 사용할 수 없기 때문에 패키지 파일 말고도 용량이 큰 파일이라면, 예컨대 폰트 파일일지라도 layer에 집어넣어줄 수 있습니다. 폰트 혹은 다른 파일을 import할 때 디렉토리 주소를 반드시 `/opt/python/<filename>`와 같이 써주셔야 합니다.

---

## 참조

- [[Python] 파이썬 pip로 pymmssql 설치시 C++ Build Tools 오류](https://dololak.tistory.com/520)
- [Python Read-only file system Error With S3 and Lambda when opening a file for reading](https://stackoverflow.com/questions/39383465/python-read-only-file-system-error-with-s3-and-lambda-when-opening-a-file-for-re)
- [AWS Lambda 신규 기능 – Layers 기반 라이브러리 관리 및 Runtime API를 통한 모든 언어 지원](https://aws.amazon.com/ko/blogs/korea/new-for-aws-lambda-use-any-programming-language-and-share-common-components/)
- [AWS 람다(Lambda)로 Python 서버 API 구현하기 ③ Lambda Layers를 이용해 공통 라이브러리 관리하기](https://ndb796.tistory.com/293)
- [Getting Started with AWS Lambda Layers](https://dev.to/vealkind/getting-started-with-aws-lambda-layers-4ipk)
- [lambci/docker-lambda](https://github.com/lambci/docker-lambda)
