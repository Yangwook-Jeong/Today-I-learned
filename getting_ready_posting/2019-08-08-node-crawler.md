---
layout: post
title: Selenium 이용해 크롤러 만들기
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1565253692/logo/posts/selenium.jpg
---

- 준비물

  - [selenium-webdriver v3.6.0](https://www.npmjs.com/package/selenium-webdriver/v/3.6.0)
  - [moment v2.24.0](https://momentjs.com)

- 전략

  - 전체 페이지를 순회 돌면서 링크를 배열에 이어붙여 저장하기
  - 배열을 이용해 링크에 들어가서 크롤링하기

- 순서
  - selenium 브라우저 옵션 설정하기
  - output 파일이름, 주소 및 크롤링할 url 지정하기
  - output 파일에 들어갈 필드 지정하기
  - 검색할 키워드 배열로 담기
  - 키워드를 순서대로 url에 집어넣기
  - 반복 작업하기
    - 이번페이지에서 링크를 수집하기
    - 다음페이지 버튼을 누르기
  - 더 이상 다음페이지가 없으면 수집 종료하기
  - 반복 작업하기
    - 종료와 동시에 배열에 든 링크로 들어가기
    - 필드에 있는 정보들을 담기
    - 정규화시키기
    - output파일에 스트림으로 담기
  - 커맨드라인에서 명령어를 작성해서 실행시킬 수 있도록 하기
    - 검색어, 시작날짜, 종료날짜
  - 조건문에 통과한 데이터만 output파일에 작성하기
