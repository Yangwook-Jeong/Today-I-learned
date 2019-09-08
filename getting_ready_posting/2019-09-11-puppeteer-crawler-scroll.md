---
layout: post
title: Puppeteer로 크롤러 만들기 - 무한스크롤
author: Yangeok
categories: Node.js
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1565253692/logo/posts/puppeteer.jpg
---

## 작업환경

- [puppeteer v1.19.0](https://www.npmjs.com/package/puppeteer)
- [moment v2.24.0](https://momentjs.com)

---

## 시리즈

- [Puppeteer로 크롤러 만들기 - 준비]()
- [Puppeteer로 크롤러 만들기 - 페이지네이션]()
- [Puppeteer로 크롤러 만들기 - 무한스크롤](#)

---

## 목차

- [모듈 불러오기 및 글로벌 스코프 선언하기](#모듈-불러오기-및-글로벌-스코프-선언하기)
- [브라우저 옵션 설정하기](#브라우저-옵션-설정하기)
- [함수 작성하기](#함수-작성하기)
- [모델 작성하기](#모델-작성하기)

---

## 코딩

---

## 모듈 불러오기 및 글로벌 스코프 선언하기

이전 편에서 작성한 것처럼 모듈을 불러옵니다. 이번편에서는 cheerio를 쓰지 않고 puppeteer 내장 함수를 사용할겁니다.

```js
// instagram.js
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const puppeteer = require('puppeteer');
```

이번에도 모바일뷰로 할지 데스크톱뷰로 할지 결정합니다.

모바일에서는 리스트에서 게시물로 들어갈때 url을 변경하면서 리스트 목록이 아예 사라져버립니다.

데스크톱에서는 리스트에서 게시물로 들어갈때 url이 변경되지만 리스트 목록이 사라지지 않고 뒤에 남아있습니다. 결정했습니다. 데스크톱뷰로 긁어오겠습니다.

```js
const keyword = '구글';
const channel = 'instagram';
const host = 'http://www.instagram.com';
const startDate = '2019-08-01';
const endDate = '2019-08-31';
const filename = `${keyword}_${channel}_${startDate}_${endDate}.txt`;
const fields = ['date', 'title', 'user', 'content', 'click', 'link'];
const logs = fs.createWriteStream(path.join(__dirname, filename));
logs.write(`${fields.join(',')}\n`);
```

키워드, 채널, 호스트명, 파일명, 컬럼명을 지정합니다. 크롤 함수가 실행되기 전에 미리 파일에 컬럼명만 작성합니다.

---

## 브라우저 옵션 설정하기

```js
const width = 400;
const height = 900;
const options = {
  // headless: false,
  slowMo: true,
  args: [
    `--window-size=${width},${height}`,
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
};
const device = puppeteer.devices['iPhone X'];

const init = async () => {
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  await page.setViewport({
    width,
    height
  });
  // await page.emulate(device);
  // await page.setRequestInterception(true);
  // await page.on('request', req => {
  //   if (
  //     req.resourceType() == 'stylesheet' ||
  //     req.resourceType() == 'font' ||
  //     req.resourceType() == 'image'
  //   ) {
  //     req.abort();
  //   } else {
  //     req.continue();
  //   }
  // });
  // await page.setJavaScriptEnabled(false);
};
```

브라우저를 띄워놓고 테스트해야하므로 나머지 옵션은 켜지 않고 주석처리하도록 하겠습니다.

---

## 함수 작성하기

#### url을 생성하는 함수

```js
const generateURL = async () => {
  const url = `${host}/explore/tags/${encodeURI(keyword)}`;
  console.log(url);
  return url;
};
```

페이지를 `page.click()`으로 들어가는 것보다 url을 타고 들어가는게 성능이 훨씬 뛰어나기때문에 url을 만들어주는 함수를 작성합니다. 여기서는 한 번밖에 쓸 일이 없는 함수지만 만들어둔게 아까워 사용합니다.

#### 페이지 스크롤하는 함수

```js
const pageDown = async page => {
  const scrollHeight = 'document.body.scrollHeight';
  let previousHeight = await page.evaluate(scrollHeight);
  await page.evaluate(`window.scrollTo(0, ${scrollHeight})`);
  await page.waitForFunction(`${scrollHeight} > ${previousHeight}`, {
    timeout: 30000
  });
};
```

더 이상 리스트에 루프 돌지 않은 게시물이 없는 경우에 실행할 함수입니다.

#### 게시물 내용을 크롤하는 함수

```js
const goToPostPageAndGetInfo = async page => {
  const result = await page.evaluate(() => {
    const $ = window.$;
    const targetPost = $($('._9AhH0:not(.done)')[0]);
    targetPost.addClass('done');
    return {
      date: $('._1o9PC.Nzb55')
        .attr('datetime')
        .substring(0, 10),
      title: '',
      user: $('.FPmhX.nJAzx').text(),
      content: $($('.gElp9')[0])
        .find('span')
        .text(),
      click: $('.Nm9Fw')
        .find('span')
        .text(),
      link: targetPost.closest('a').attr('href')
    };
  });
  return result;
};
```

1편에서도 언급했듯이 puppeteer 내장함수를 쓰면 커스텀함수를 그 안에 적용시킬 수가 없고, 셀렉터를 다른 객체로 빼낼 수가 없습니다. 셀렉터를 관리하려면 모델 파일에 셀렉터가 있는 함수블럭까지 직접 찾아가야하는 번거로움이 생길 수가 있습니다.

## 모델 작성하기

#### 메인 함수

```js
const init = async () => {
  // (...)

  await page.goto(await this.generateURL());
  await page.waitFor('._9AhH0', {
    timeout: 30000
  });
  await page.evaluate(() => {
    const $ = window.$;
    $('.EZdmt').remove();
  });
  await getItem(page);
};
```

클래스명이 `EZdmt`인 요소는 리스트에 있는 인기게시물입니다. 루프 안에서 지우면 안되기때문에 루프가 시작하기 전에 요소를 삭제해줬습니다.

#### 루프 돌고 날짜 필터링하는 함수

```js
const loopThroughPosts = async page => {
  try {
  } catch (err) {
    console.log(err);
  } finally {
    await page.close();
    process.exit();
  }
};
```

기본형을 위와 같은 `try-catch-finally`형태로 에러가 나면 바로 크롤을 중단하고 프로그램이 종료되도록 하겠습니다. 주의하실게 `catch`블록에서 멍청하게 `throw err`로만 해놓고 하루종일 에러가 어디서 난지 몰라 삽질한 기억이 납니다. 부디 콘솔에 에러를 찍어주시길 바랍니다.

```js
try {
  let currentPostDate = moment();

  while (moment(this.startDate).isSameOrBefore(currentPostDate)) {}
} catch (err) {}
```

전체 페이지가 정해진게 아니기때문에 `while`문을 써서 루프를 돌리도록 하겠습니다. `startDate`가 현재날짜와 같거나 이전이라면 계속 돌다가 날짜비교가 `false`가 되면 크롤을 멈출겁니다.

이제 반복문 안에서 코드가 어떻게 동작하는지 살펴보겠습니다.

```js
// (...)

while (moment(this.startDate).isSameOrBefore(currentPostDate)) {
  const findTargetPostResult = await page.evaluate(() => {
    const $ = window.$;
    const leftPostsCountOnTheScreen = $('._9AhH0:not(.done)').length;
    console.log(leftPostsCountOnTheScreen);
    if (leftPostsCountOnTheScreen === 0) {
      return false;
    }

    const currentWorkingPost = $('._9AhH0:not(.done)')[0];
    $(currentWorkingPost).click();
    return true;
  });
}
```

`findTargetPostResult`는 boolean을 반환합니다. 클래스명이 `_9AhH0`인 요소들 중 `done`클래스가 들어가있지 않은 요소들인 `leftPostsCountOnTheScreen`의 길이가 0이라면 `false`를 반환하고, 1 이상이면 게시물을 클릭하고 `true`를 반환합니다.

```js
while(
  // (...)
) {
  // (...)

  if (!findTargetPostResult) {
        await this.pageDown(page);
  } else {}
}
```

위에서 언급했듯이 남은 요소의 길이가 0이라면 스크롤바를 내려 다음페이지를 불러옵니다.

```js
if (!findTargetPostResult) {
  // (...)
} else {
  await page.waitForSelector('.Ppjfr');
  const result = await goToPostPageAndGetInfo(page);

  currentPostDate = moment(result.date);
  if (moment(this.endDate).isSameOrAfter(currentPostDate)) {
    this.logs.write(
      `${result.date},${result.title},${filter(result.user)},${filter(
        result.content
      )},${filter(result.click)},${result.link}\n`
    );
  }
}
```

`currentPostDate` 변수에 이번 게시물의 날짜를 담아줍니다. `endDate`가 현재 게시물의 날짜와 같거나 이후인 경우에만 스트림으로 저장할 수 있도록 합니다.

다 끝났습니다. 파일채로 실행해 크롤이 완료되면 `구글_instagram_2019-08-01_2019-08-31.txt`이란 파일명으로 프로젝트 루트 디렉토리에 저장이 될겁니다.

혹시라도 코드를 보시다 오류가 있거나 궁금한 점이 있으시면 댓글 혹은 메일 주시면 감사하겠습니다.

---

## 참조

- [[JavaScript]window객체 - scrollBy(),scrollTo()](https://m.blog.naver.com/PostView.nhn?blogId=seilius&logNo=130166947739&proxyReferer=https%3A%2F%2Fwww.google.com%2F)
