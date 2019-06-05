```js
const eachFeed = async url => {
  const feed = await parser.parseURL(url);
  let arr = [];
  feed.items.forEach(e => {
    return arr.push({
      creator: e.creator
      // title: e.title,
      // link: e.link,
      // pubDate: e.pubDate,
      // contentSnippet: `${e.contentSnippet.substring(0, 128)}...`
    });
  });
  return arr;
};

const combineFeeds = async urls => {
  let a = [];

  // for-in문
  for (url in urls) {
    console.log(url);
    a[url] = await eachFeed(url);
    console.log(a);
  } // 콘솔에는 ECONNREFUSED localhost가 뜨고 json에는 빈배열만 찍힌다. url이 인덱스값이 찍힌다

  // for-of문
  for (url of urls) {
    console.log(url);
    a[url] = await eachFeed(url);
    console.log(a);
  } // 콘솔에는 찍히지만 json에는 빈배열만 찍힌다. url이 url값으로 찍힌다.

  // for문
  for (let i = 0; i < urls.length; i++) {
    console.log(i);
    a[i] = await eachFeed(urls[i]);
    console.log(a);
  } // 콘솔, json 둘다 잘찍힌다.

  return a;
};

const write = async (urls, filename) => {
  writeJsonFile(filename, {
    data: await combineFeeds(urls)
  });
};

write(urls, '../db/blog.feed.json');
```
