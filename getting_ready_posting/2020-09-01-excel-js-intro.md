---
layout: post
title: Nodejs 엑셀 자동화 라이브러리 비교하기
author: Yangeok
categories: Node.js
date: 2020-09-05 19:30
comments: true
tags: [excel, npm, exceljs, excel.js, xlsx, sheetjs, sheet.js, javascript, typescript]
cover: https://res.cloudinary.com/yangeok/image/upload/v1599281839/logo/posts/excel.jpg
---

## 목차
- [목차](#목차)
- [엑셀 자동화?](#엑셀-자동화)
- [exceljs vs. sheetjs](#exceljs-vs-sheetjs)
  - [NPM Trends](#npm-trends)
  - [Exceljs](#exceljs)
  - [Sheetjs](#sheetjs)
- [비교](#비교)
- [결론](#결론)

<br><hr><br>

## 엑셀 자동화?
**엑셀 사무 자동화, 엑셀 문서 자동화**같은 키워드로 클래스101이나 인프런, 패스트캠퍼스 등에 강의가 종종 올라오고 있습니다. 그 목적은 자주 작업해야하고 실수하기 쉬운 일들을 자동화해 여기에 집중할 떄 필요한 리소스를 다른데 사용하기 위함입니다. 예를 들자면, 구글 스프레드에서 지원하는 API인 `GOOGLEFINANCE()`를 이용해 실시간 주식가를 긁어와서 포트폴리오를 만드는 정도의 작업은 자체 API만으로 가능합니다. 하지만 저수준으로 내려가서 라이브러리를 사용한다면 크롤한 데이터를 가공해서 혹은 DB에서 데이터를 가져와 보고서를 작성하거나 매일 작업해서 나가야 하는 같은 포맷의 n개의 파일을 합치는 등 더 많은 일들을 자동화할 수 있습니다. ✨

엑셀에서 지원하는 VBA도 강력하지만 다른 플랫폼과 통합이 어려울 수 있습니다. 앞서 이야기한 엑셀 사무 자동화 강의는 Python 라이브러리 사용법이 대부분이었습니다. 지금 하고 있는 프로젝트때문이지만 Javascript에서도 엑셀을 조작할 수 있는 라이브러리가 있단 사실을 알게 됐습니다. 바로 [exceljs/exceljs](https://github.com/exceljs/exceljs)와 [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs)입니다. 

<br><hr><br>

## exceljs vs. sheetjs

### NPM Trends
[npm trends](https://www.npmtrends.com/exceljs-vs-xlsx)를 보면 지난 6개월간 라이브러리 다운로드 횟수입니다. sheetjs가 xlsx입니다. xlsx가 설치시 패키지명이라 xlsx로 나오는 점 참고해주세요. 이 글에서는 계속 **sheetjs**라고 명칭하겠습니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1599290331/exceljs/01.jpg)

다운로드 수만 놓고 보자면 sheetjs가 막연히 더 좋으니까 사용자가 많겠지? 할 수도 있겠군요. 스타 수가 **exceljs**는 **6k**, **sheetjs**는 **22k**입니다. 아직 API문서를 보지 않았기때문에 둘 간의 장단점을 확실히 알 수는 없지만 객관적인 지표만 놓고 보자면 sheetjs의 한 판 승입니다.

이슈 수로는 정확한 판단을 내리기는 어렵고, 마지막 릴리즈 날짜는 차이가 별로 나지 않습니다. 프로젝트를 시작한 날짜 차이가 2년이 난다는 것에서는 어떤 점을 유추할 수 있을 것 같습니다. 아직은 정확히 모르겠지만 사용성이나 기능면에서 벤치마킹했을 것 같습니다. 번들 파일 사이즈는 60kb정도 차이가 납니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1599290331/exceljs/02.jpg)

객관적 지표만 보고 어떤 라이브러리를 사용할지 결정하기엔 너무 이릅니다. README 파일을 읽으면서 장단점을 간단하게나마 분석해보려고 합니다.

그 전에 잠깐만요. 셀<sup>Cell</sup>, 워크시트<sup>Work Sheet</sup>, 워크북<sup>Work Book</sup>을 엑셀의 3대 요소라고 하더라고요. 셀이 모여서 워크시트가 되고, 워크시트가 모여서 워크북이 된다는 점 기억해주세요.

### Exceljs

2014년 처음 릴리즈한 프로젝트입니다. 

쓰고 읽기를 지원하는 파일 포맷은 xlsx, csv 두 가지입니다. 여기서는 API를 깊게 보진 않고 파일 I/O, 셀 조작까지만 보고 넘어가겠습니다. 복잡한 세팅 없이 파일 I/O도 스트림으로 읽고 쓸 수 있습니다. 이 방법으로 I/O를 조작하는 것이 일반적인 방법으로 파일을 읽고 쓰는 것보다 20% 빠르다고 합니다. 아래는 xlsx 파일 I/O 방법입니다. `read()`, `readFile()`의 두번째 인자로 파일명이나 압축 여부 등을 설정할 수 있는 [옵션](https://github.com/exceljs/exceljs/blob/master/README.md#streaming-xlsx-writercontents)이 들어갑니다.

```ts
// read from a file
const workbook = new Excel.Workbook()
await workbook.xlsx.readFile(filename)

// read from a stream
const workbook = new Excel.Workbook()
await workbook.xlsx.read(stream)

// write to a file
const workbook = createAndFillWorkbook()
await workbook.xlsx.writeFile(filename)

// write to a stream
const workbook = createAndFillWorkbook()
await workbook.xlsx.write(stream)
```

셀 조작은 아래와 같이 사용할 수 있습니다. `value` 외 `numFmt`, `font` 등의 프로퍼티로 접근해서 셀을 수정할 수 있는 간편하고도 강력한 셀 수정 기능을 제공합니다. 

```ts
// type value
worksheet.getCell(5, 5).value = 'foo' // can be manipulated cell E5
worksheet.getCell('E5').value = 'foo' // can be manipulated cell E5

// type formula
worksheet.getCell(5, 5).value = {
  formula: `SUM(D1:D5)`
}
```

차트 기능을 이야기들은 [#141](https://github.com/exceljs/exceljs/issues/141), [#307](https://github.com/exceljs/exceljs/issues/307)과 같이 나오고 있지만 차트 기능을 따로 개발하고 있는 것으로 보이진 않습니다.

마지막으로 클라이언트 사이드에서도 exceljs의 API를 아래처럼 이용할 수 있습니다. [#768](https://github.com/exceljs/exceljs/issues/768)

```ts
// minified version
import * as Excel from 'exceljs/dist/exceljs.min.js'

// working version
import * as Excel from 'exceljs/dist/exceljs'
```

### Sheetjs

2012년 처음 릴리즈한 프로젝트입니다. bower 설치라던지 엑셀 2007에서 사용하던 xlsb라던지 저장소에 세월의 흔적이 많이 묻어보입니다. 

쓰고 읽기를 지원하는 파일 포맷은 xlsx, csv, txt, html, json까지도 지원합니다. 엑셀 파일을 여는 방법은 exceljs와 비슷합니다.

```ts
const workbook = XLSX.readFile(filename)
```

하지만 스트림 읽기를 사용하는 방법이 복잡합니다. [여기](https://github.com/SheetJS/sheetjs#streaming-read)에서 레거시로 지원하는 포맷때문에 스트림 API를 따로 제공하지 않는다고 합니다. 🤔

  ```js
  const fs = require('fs')
  const XLSX = require('xlsx')
  const process_RS = (stream: ReadStream, cb: (wb: Workbook) => void): void => {
    const buffers = []
    stream.on('data', data => buffers.push(data))
    stream.on('end', () => {
      const buffer = Buffer.concat(buffers)
      const workbook = XLSX.read(buffer, {type:"buffer"})
  
      cb(workbook)
    });
  }
  ```

셀 조작은 아래와 같이 사용할 수 있습니다. `t`는 타입 옵션이고, `v`는 들어갈 데이터입니다. 그 외 옵션으로 들어가는 프로퍼티들이 네이밍이 전부 다음과 같습니다. `w`은 텍스트 포맷, `z`은 숫자타입 포맷, `s`은 셀 스타일 등이 있습니다. 자동완성이 된다고 해도 프로퍼티를 전부 줄여놨으니 호불호가 심하게 갈릴 것 같습니다. 

```ts
worksheet['E5'] = { t: 's', v: 'foo' } // can be manipulated cell E5
worksheet.E5 = { t: 's', v: 'foo' } // can be manipulated cell E5
```

마찬가지로 클라이언트 사이드에서도 sheetjs의 API를 아래처럼 이용할 수 있습니다. 

```ts
import XLSX from 'xlsx'
```

<br><hr><br>

## 비교

ㅤ| exceljs   | sheetjs   |
---| --------- | --------- |
 스트림    | O         | X |
 차트      | X         | X |
 파일 포맷 | xlsx, csv | xlsx, csv, html, json 등 |
 사용편의성 | 👍 | 👎

<br><hr><br>

## 결론

엑셀 포맷이 표준화되지 못한 시절에는 xlsx, xlsm, xlsb, xltx, xltxm, xls, xlt, xlam같은 확장자들이 있었습니다. 예전이라면 sheetjs를 포맷 표준화를 위해 사용했겠지만 지금은 xlsx 포맷 말고는 본적이 없습니다. 때문에 다양한 포맷을 지원한다는 것의 장점을 딱히 느끼진 못했습니다. 

객관적인 지표로는 다운로드 수가 몇 배는 위에 많았기때문에 sheetjs가 더 사용하기 좋겠다고 판단했지만 위의 이유와 더불어 exceljs가 사용방법 면에서 훨씬 사용이 용이했습니다. 

다음 시간에는 exceljs를 더 편하게 사용할 수 있도록 도와주는 헬퍼 함수들 소개하는 글로 찾아오겠습니다. 🚀