---
layout: post
title: Puppeteer로 크롤러 만들기
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1566999441/logo/posts/puppeteer.jpg
---

## 작업환경

- [puppeteer v1.19.0](https://www.npmjs.com/package/puppeteer)
- [moment v2.24.0](https://momentjs.com)

## 목차

- 라이브러리 옵션을 설정한다.
- 키워드를 설정한다.
- startDate, endDate를 설정한다.
- 키워드를 url에 대입한다.
- 총 게시물 및 페이지를 확인한다.
- boolean으로 변수에 담는다.
  - 크롤이 끝났는지
  - startDate를 만났는지
  - 크롤의 대상이 되는 지점을 발견했는지
- 대상지점에 도달하지 못한 경우 페이지를 넘기며 날짜를 확인하도록 **반복문** 을 돌린다.
  - 페이지에 있는 리스트를 읽어오는 배열을 만든다.
  - 배열의 첫번째 요소와 날짜를 구한다.
  - 배열의 첫번째 요소가 startDate보다 이전인 경우 크롤을 종료한다.
  - 크롤의 대상이 된다면 배열의 모든 내용을 반복하며 날짜를 확인하도록 **반복문** 을 돌린다.
  - endDate보다 이전인 지점부터 stream에 넣어준다.
    - startDate보다 이전인 지점부터 크롤을 종료한다.
  - 크롤이 끝나면 페이지를 닫고, 프로그램을 종료한다.
