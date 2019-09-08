---
layout: post
title: Puppeteer로 크롤러 만들기 - 페이지네이션
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

- [Puppeteer로 크롤러 만들기 - 준비](#)
- [Puppeteer로 크롤러 만들기 - 페이지네이션]()
- [Puppeteer로 크롤러 만들기 - 무한스크롤]()

---

## 목차

- [모듈 불러오기 및 글로벌 스코프 선언하기](#모듈-불러오기-및-글로벌-스코프-선언하기)
- [브라우저 옵션 설정하기](#브라우저-옵션-설정하기)
- [함수 작성하기](#함수-작성하기)
- [모델 작성하기](#모델-작성하기)

---

## 모듈 불러오기 및 글로벌 스코프 선언하기

함수분리 없이 한 파일에서 모든 코드를 작성하도록 하겠습니다.

```js
// ppomppu.js
const fs = require('fs');
const path = require('path');
const moment = require('moment');
const puppeteer = require('puppeteer');
const cheerio = require('cheerio');
```

`fs`에는 스트림 저장을 하기 위해, `moment`는 날짜 검증을 하기 위해 사용합니다. 잠깐, 호스트명을 지정하기에 앞서 모바일뷰에서 긁어오는게 나을지, 데스크톱뷰에서 긁어오는게 나을지 직접 웹페이지에 들어가 확인해봅니다.

데스크톱에서는 전체 게시물 목록은 나오지 않고 전체 페이지 수만 나옵니다.

모바일에서는 전체 게시물 목록, 전체 페이지 수가 전부 다 나옵니다. 결정했습니다. 모바일뷰로 긁어오겠습니다.

```js
const keyword = '구글';
const channel = 'ppomppu';
const host = 'http://m.ppomppu.co.kr';
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
const generateURL = async (currentPage = 1) => {
  const url = `${host}/new/search_result.php?search_type=sub_memo&page_size=20&bbs_id=&order_type=date&bbs_cate=2&page_no=${currentPage}&keyword=${encodeURI(
    keyword
  )}`;
  console.log(url);
  return url;
};
```

페이지를 `page.click()`으로 들어가는 것보다 url을 타고 들어가는게 성능이 훨씬 뛰어나기때문에 url을 만들어주는 함수를 작성합니다.

#### 총 페이지 수를 가져오는 함수

```js
const getPageCount = async (totalPosts, pageSize) => {
    if (totalPosts === NaN) {
      throw new Error('total post count: NAN');
    }
    if (totalPosts % pageSize === 0) {
      return Math.floor(totalPosts / pageSize);
    } else {
      return Math.floor(totalPosts / pageSize) + 1;
    }
  }
};
```

뽐뿌에는 총 페이지 수가 있지만, 다른 커뮤니티에서도 확장해 사용하기 위해 총 페이지 수를 구하는 함수를 작성합니다.

#### 게시물 페이지 목록을 가져오는 함수

```js
const getPostsInfoInListPage = async $ => {
  const infoInListPage = $(infoInListPageSelector)
    .toArray()
    .map((row, index) => {
      return {
        link:
          linkSelector +
          $(row)
            .find(aTagSelector)
            .attr('href'),
        index
      };
    });
  console.log(infoInListPage);
  return infoInListPage;
};
```

브라우저 콘솔에서 `$('.bbsList > li').length`를 해보면, 페이지당 20개씩 게시물이 있는 것을 확인할 수 있습니다. 위 함수가 반환하는 객체에 `index` 값이 있으니 확인할 수 있습니다. 셀렉터 자리에 들어가는 변수들은 따로 객체로 빼서 모아서 관리하려고 합니다.

#### 게시물 내용을 크롤하는 함수

```js
const goToPostPageAndGetInfo = async (page, link) => {
  await page.goto(link);
  const content = await page.content();
  const $ = await cheerio.load(content);
  const item = {
    date: $(dateSelector).text()
    title: filter($(titleSelector).text()),
    user: filter($(userSelector).text()),
    content: filter($(contentSelector).text()),
    click: filter($(clickSelector).text()),
    link
  };
  console.log(item);
  return item;
};
```

추후에 크롤하면서 게시글 안의 html요소의 모양에 따라 문자열 메서드를 이용해 정제를 해줄 예정입니다.

함수로 빼놓음으로써 추후 다른 모델을 추가할때 셀렉터 및 문자열 메서드 부분만 수정해주면 작업속도가 상승하기때문에 함수로 분리해서 처음부터 작성했습니다.

---

#### 문자열 필터 함수

```js
const filter = text =>
  text.trim
    .replace()
    .trim()
    .replace(/\s+/g, ' ')
    .replace(/⠀+/g, ' ')
    .replace(/,/g, ' ')
    .replace(/\,/gi, '')
    .replace(/\,/g, '')
    .replace(/@+/g, '')
    .replace(/(<([^>]+)>)/gi, '');
```

정규식으로 문자열을 바꿔주는 함수를 작성했습니다. 쓸 일이 많을겁니다.

---

## 모델 작성하기

#### 메인 함수

```js
const init = async () => {
  // (...)

  await page.goto(await generateURL());
  const content = await page.content();
  const $ = await cheerio.load(content);
  getItems($, page);
};
```

puppeteer 내장 함수가 나은지 cheerio가 나은지는 아직 잘 모르겠습니다. 페이지네이션은 cheerio로 해보고 무한스크롤은 puppeteer 내장 함수를 사용할 예정입니다.

#### 루프 돌고 날짜 필터링하는 함수

```js
const getItems = ($, page) => {
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
  const totalPostCount = filter($(totalPostCountSelector).text())
    .split('[')[1]
    .split('건')[0];
  const totalPages = await getPageCount(totalPostCount, 20);

  console.log(totalPostCount); // 624181
  console.log(totalPages); // 31210
} catch (err) {}
```

위와 같이 총 게시물 수와 총 페이지 수를 구했습니다.

이제 루프를 돌려 크롤과 동시에 날짜 필터를 할겁니다. 가장 메인이 되는 시나리오는 총 페이지 수만큼 루프를 돌다 `startDate`인 게시물과 만나면 루프를 멈추는 것입니다.

```js
try {
  // (...)

  let hasMetStart = false;
  let doneCrawlFirstMetPage = false;
  let firstMetPostIndex = 0;
  let crawlEnd = false;

  for (
    let currentPage = 1;
    currentPage <= totalPages && !crawlEnd;
    currentPage++
  ) {
    console.log(currentPage);
  }
} catch (err) {
  // (...)
}
```

위와 같이 변수들을 선언하고, 페이지 수만큼, `crawlEnd`가 `true`가 될 때까지 루프를 돌도록 합니다. 콘솔에 `currentPage`를 찍어 반복문이 잘 돌고 있나 확인합니다. 조금 후에 `crawlEnd`를 날짜 필터링하는 부분에서 `startDate`가 아이템의 날짜보다 이후일때 `true`로 바꾸는 부분을 작성하도록 할겁니다.

```js
for (
  let currentPage = 1;
  currentPage <= totalPages && !crawlEnd;
  currentPage++
) {
  // (...)

  await page.goto(await generateURL(currentPage));
  const content = await page.content();
  const $$ = cheerio.load(content);

  console.log(hasMetStart);
  if (!hasMetStart) {
  }

  if (hasMetStart) {
  }
}
```

본격적으로 반복문 안에서 현재 페이지 url을 불러옵니다. `hasMetStart` 변수는 크롤을 시작할 지점을 찾았는지 여부를 확인합니다. 1번째 조건문에서는 크롤을 시작할 지점을 찾기 위해 도는 부분입니다. 여기서 크롤을 시작할 지점을 찾았다면 2번째 조건문을 돌도록 합니다.

우선 1번째 조건문 구조를 보도록 하겠습니다.

```js
if (!hasMetStart) {
  const postsOnPage = await getPostsInfoInListPage($$);
}
```

리스트에서 20개의 게시물 링크와 인덱스를 배열에 담아 가져옵니다. 형태는 아래와 같습니다.

```json
[
  { "link": "url/?page=1", "index": 0 },
  { "link": "url/?page=2", "index": 1 },
  { "link": "url/?page=3", "index": 2 }
  // (...)
]
```

리스트를 읽어왔으면 페이지의 가장 최근 게시물인 1번째 게시물에 접근해 데이터를 뽑아옵니다.

```js
if (!hasMetStart) {
  // (...)

  const firstPostInfoOnPage = await goToPostPageAndGetInfo(
    page,
    postsOnPage[0].link
  );
}
```

1번째 게시물의 날짜가 필요해서 데이터를 뽑아왔습니다. 날짜를 필터합니다. `startDate`가 1번째 게시물의 날짜보다 이후인지 확인합니다. 이후라면 크롤이 무의미하기때문에 여기서 루프를 아래와 같이 중단합니다.

```js
//  (...)

if (moment(startDate, 'YYYY-MM-DD').isAfter(firstPostInfoOnPage.date)) {
  break;
}
```

크롤이 중단되지 않았다면 남은 게시물들로 루프를 돕니다. `endDate`가 루프 도는 게시물 날짜보다 이후라면 크롤을 시작하고, 해당 게시물의 인덱스를 `firstMetPostIndex` 변수에 담습니다.

```js
// (...)

for (let i = 1; i < postsOnPage.length - 1; i++) {
  const postInfo = await goToPostPageAndGetInfo(page, postsOnPage[i].link);

  if (moment(endDate, 'YYYY-MM-DD').isAfter(postInfo.date)) {
    hasMetStart = true;
    firstMetPostIndex = i;
    break;
  }
}
```

`hasMetStart`가 `true`로 바뀌고 해당 반복문은 종료가 됩니다. 이제 다음 조건문 블록으로 넘어갑니다.

```js
// (...)

if (hasMetStart) {
  await page.goto(await generateURL(currentPage));
  const nextPageContent = await page.content();
  const $$$ = await cheerio.load(nextPageContent);

  let postsOnPage = await getPostsInfoInListPage($$$);
  if (!doneCrawlFirstMetPage) {
    postsOnPage = postsOnPage.slice(firstMetPostIndex - 1);
    doneCrawlFirstMetPage = true;
  }
}
```

여기서 크롤을 하려면 아까 크롤을 시작할 지점에서 `firstMetIndex` 변수에 담은 값에서 1을 뺀 만큼의 값으로 `postsOnPage` 배열을 `slice()`합니다. 앞에서부터 배열을 잘라줘야 하기때문에 `slice(start)`만 사용했습니다.

이제 날짜필터가 된 배열을 다시 반복문을 돌려줄겁니다.

```js
// (...)

for (const post of postsOnPage) {
  const item = await goToPostPageAndGetInfo(page, post.link);

  if (!moment(startDate).isAfter(item.date)) {
    await logs.write(
      `${item.date},${item.title},${item.user},${item.content},${item.click},${item.link}\n`
    );
  } else {
    crawlEnd = true;
    break;
  }
}
```

`for-of`문을 사용해 루프를 돕니다. 리스트에 있는 링크를 타고 하나씩 데이터를 긁어옵니다. `startDate`가 게시물의 날짜보다 이후가 아닌 경우에만 스트림으로 저장할 수 있도록 합니다. 게시물의 날짜보다 이후가 된다면 `crawlEnd` 변수를 `true`로 변경해 크롤을 중단하도록 합니다.

---

#### 셀렉터 작성하기

글로벌 스코프에서 객체에 셀렉터를 담아줍니다. 추후에 모델이 많이 생기면 셀렉터 파일을 합쳐서 관리하는 것도 괜찮은 방법일 것 같습니다.

```js
const selector = {
  totalPostCountSelector: '#result-tab2 > h3',
  infoInListPageSelector: '.bbsList > li',
  linkSelector: 'http://m.ppomppu.co.kr',
  aTagSelctor: 'a.noeffect',
  dateSelector: 'h4 > div > span.hi',
  titleSelector: 'div > h4',
  userSelector: '.info > .ct',
  contentSelector: 'div.cont',
  clickSelector: 'div.info'
};
```

셀렉터를 브라우저에서 뽑아오는 과정에서 브라우저 콘솔에 `$()`로 테스트하면서 뽑아보잖아요? 그 과정에서 커스텀 함수인 `filter()`를 쓰기 전에 가공할 수 있는 부분은 아래와 같이 가공해봅니다.

`$('h4 > div > span.hi').text().split(' | ')[1].substring(0, 10)`

가공을 해보고 `goToPostPageAndGetInfo()`에서 반환할 `item` 객체에 작성합니다.

```js
const goToPostPageAndGetInfo = async (page, link) => {
  // (...)

  const item = {
    date: $(dateSelector)
      .text()
      .split(' | ')[1]
      .substring(0, 10),
    title: $(titleSelector)
      .text()
      .split('|')[0]
      .split('\n')[1],
    user: $(userSelector)
      .text()
      .split(' | ')[0],
    content: $(contentSelector).text(),
    click: $(clickSelector)
      .text()
      .split(' | ')[2]
      .split(' / ')[0]
      .split('조회 : ')[1],
    link
  };
  console.log(item);
  return item;
};
```

위와 같은 모습이 될겁니다. 하지만 여기서 멈추기엔 뭔가 찝찝합니다. 저는 `.csv`형태를 띈 `.txt`파일로 추출하고 싶기때문에 데이터 중간에 구분자인 컴마가 포함되거나 개행이 되면 안됩니다. 그래서 아래처럼 `filter()`를 씌워줍니다.

```js
const item = {
  date: $(dateSelector)
    .text()
    .split(' | ')[1]
    .substring(0, 10),
  title: filter(
    $(titleSelector)
      .text()
      .split('|')[0]
      .split('\n')[1]
  ),
  user: filter(
    $(userSelector)
      .text()
      .split(' | ')[0]
  ),
  content: filter($(contentSelector).text()),
  click: filter(
    $(clickSelector)
      .text()
      .split(' | ')[2]
      .split(' / ')[0]
      .split('조회 : ')[1]
  ),
  link
};
```

다 끝났습니다. 파일채로 실행해 크롤이 완료되면 `구글_ppomppu_2019-08-01_2019-08-31.txt`이란 파일명으로 프로젝트 루트 디렉토리에 저장이 될겁니다.

---

한개의 함수 안에서 코드를 쓰려니 호흡이 조금 길어진 것 같습니다. 여기서 브라우저 옵션과 스트림하는 부분을 다른 파일로 분리해서 사용한다면 다른 모델을 개발할때 훨씬 편할 수 있습니다.

혹시라도 코드를 보시다 오류가 있거나 궁금한 점이 있으시면 댓글 혹은 메일 주시면 감사하겠습니다.
