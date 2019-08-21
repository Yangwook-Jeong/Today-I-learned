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

## 왜 selenium을 사용하는지

단일 속도는 puppeteer에 비해 떨어지지만, 여러대의 device를 동시에 테스트 하기 위해 이용하는 [selenium grid](https://www.seleniumhq.org/docs/07_selenium_grid.jsp)를 사용할 수 있습니다. 각각 device 별로 설정된 여러 개의 서버를 selenium server가 연결해주는 방식이라고 합니다. javascript에서만 사용할 수 있는 puppeteer에 비해, selenium은 다른 언어에서도 개발이 활발하기 때문에 어떤 언어에서든 사용할 수 있다는 장점이 있습니다.

## selenium 브라우저 옵션 설정하기

selenium은 puppeteer와 다르게 브라우저를 크롬 뿐만 아니라 다른 브라우저로 선택이 가능합니다. 보통은 크롬을 사용하지만 크롬에서 크롤이 되지 않을 경우, 또 다른 선택지가 생겨난다는 장점이 있습니다.

```sh
yarn add selenium-webdriver
```

selenium-webdriver를 설치하고 [chrome driver](https://chromedriver.chromium.org/downloads)를 현재 사용하는 크롬 버전으로 설치해줍니다. 현재 버전은 [여기](chrome://settings/help)에서 확인이 가능합니다.

```js
const webdriver = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const chromeOptions = new chrome.Options();
```

다운받은 모듈을 위와 같이 불러옵니다.

```js
const mobileView = '--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1';
const webView = '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36';
const width = 400, height = 900;
const disableImageLoading = 'prefs.profile.default_content_setting_values.images'
chromeOptions.addArguments(webView);
chromeOptions.addArguments(`--window-size=${width},${height}`);
chromeOptions.addArguments(`--headless`);
chromeDesktop = { disableImageLoading: 2 };
```

mobile view로 볼지, web view로 볼지를 고를 수 있습니다. mobile에서 selector가 사라지는게 아니라면 mobile로 보는게 성능이 더 좋았습니다. `--window-size`옵션으로 브라우저 창 크기를 조정할 수 있습니다. `--headless`옵션으로 브라우저를 띄우지 않고 작업해 성능 향상을 도모할 수 있습니다. 

마지막 옵션은 image loading을 끄는 옵션으로, python에서는 사용이 가능하지만 방법을 몰라 사용하지 못하고 있습니다. stackoverflow에 있는 [관련 글](https://stackoverflow.com/questions/57389778/javascript-want-to-disable-image-loading-in-selenium)입니다. 혹시 이 옵션의 사용법을 아시는 분이 계시면 댓글이나 메일 부탁드리겠습니다.

---

옵션을 `new`키워드를 사용해 아래와 같이 적용시킵니다.

```js
const driver = new webdriver.Builder()
  .withCapabilities(chromeDesktop)
  .setChromeOptions(chromeOptions)
  .forBrowser('chrome')
  .build();
```

방금 선언한 `driver`의 간단한 용법은 이렇습니다.

```js
const { By } = webdriver;

async () => {
  await driver.get(url);
  await driver.findElements(By.css(selector));
  await driver.quit();
}
```

## 본격 크롤러 만들기

이제 어떤 사이트를 크롤한 후 `.csv`파일을 연성해낼겁니다. 전략은 이렇습니다. 

- 어떤 검색어로 검색 후, 결과로 나온 게시판 url로 들어간다.
- 전체 페이지나 전체 게시물 수가 나온 부분을 긁는다.
- 


<!-- 더 작성하자아아아아양우가 -->

## 참조

- [Selenium Grid를 이용한 appium 멀티 실행](https://dejavuqa.tistory.com/129)
- [[jstest] selenium + nodeJS #1](https://www.bsidesoft.com/?p=2196)