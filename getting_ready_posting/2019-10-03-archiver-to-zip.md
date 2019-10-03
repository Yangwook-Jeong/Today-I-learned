---
layout: post
title: Archiver로 파일 압축하기
author: Yangeok
categories: Node.js
date: 2019-10-03 09:21
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1570100178/logo/posts/s3chiver.jpg
---

## 서론

여러 키워드로 크롤을 돌린 후 S3에 파일을 올렸다 받을때에는 역시 압축파일로 한 번에 받는게 편하더군요. 작업 순서는 이렇게 됩니다.

1. 키워드 크롤이 끝나고 추출된 데이터는 prefix로 어떤 id를 파일명에 가진채로 S3 버킷에 업로드됩니다.
2. 버킷에서 prefix를 포함하는 객체 리스트를 불러옵니다.
3. archiver, stream을 이용해 스트림으로 파일을 이어붙입니다.
4. S3 버킷에 이어붙인 파일을 업로드합니다.

그 후에 업로드 후에 return하는 `Location`객체에 담긴 파일의 주소를 이용해 브라우저에 보여주면 사용자는 링크에 접근해 다운받을 수가 있게 되는거죠. 물론 위에 숫자로 리스팅한 부분만 다루도록 할겁니다.

---

## 작업환경

- [aws-sdk](https://www.npmjs.com/package/aws-sdk)
- [archiver](https://www.npmjs.com/package/archiver)
- [stream](

---

## 본론

물론 archiver의 내부적인 구조를 살펴본다면 엄청 복잡하겠지만, 우린 그저 누군가가 만들어놓은 도구를 사용하기 때문에 이렇게 간단한 과정으로 압축파일의 형태로 복수의 파일을 다운로드 받을 수가 있게 됐습니다.

뿐만 아니라 네이버 메일, 클라우드에서 복수의 파일을 다운받을 때에도 압축파일로 다운이 되는데 어떤 과정으로 압축해서 다운받게 되는지 느낌적인 느낌이 오죠.

AWS의 Lambda 함수같이 트리거가 있으면 작동하도록 만들 수도 있겠죠? S3 버킷에 파일이 업로드가 되길 listen하고 있다가 업로드가 되면 함수가 작동하고, 업로드된 파일들을 가지고 압축파일을 사용자가 요청하기 전에 미리 만들어둡니다. 아무리 큰 파일이더라도 사용자의 요청이 오자마자 바로 다운받을 수 있도록 준비를 해줄 수가 있겠죠.

---

## 참조
