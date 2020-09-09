---
layout: post
title: Exceljs API와 커스텀 유틸함수로 생산성 올리기
author: Yangeok
categories: Node.js
date: 2020-09-08 09:00
comments: true
tags: [excel]
cover:
---

이 글은 exceljs의 모든 API를 소개하는 글이 아닙니다.

## 목차
- [목차](#목차)
- [Workbook](#workbook)
- [Worksheet](#worksheet)
- [Cell](#cell)
- [File I/O](#file-io)
- [커스텀 헬퍼 함수](#커스텀-헬퍼-함수)

## Workbook

엑셀은 **워크북, 워크시트, 셀**로 이뤄져있다고 저번 글에서 잠깐 언급했었죠. 가장 첫 스텝은 워크북을 세팅하는 일입니다.

```ts
const workbook = new Excel.Workbook()
```

```ts
// lib/exceljs.nodejs.js
const ExcelJS = {
  Workbook: require('./doc/workbook'),

  (...)
}

// lib doc/workbook.js
class Workbook {
  constructor() {
    
  }
}
```

2번째 인자에 다양한 옵션을 사용할 수 있습니다.

```ts
{}
```

## Worksheet

워크북, 엑셀 파일을 만들었으면 그 안에 들어갈 시트를 만들 차례입니다.

```ts
const sheet = workbook.addWorksheet('Foo')
```

2번째 인자에 다양한 옵션을 사용할 수 있습니다.

```ts
{}
```

워크시트를 삭제하거나

```ts
workbook.removeWorksheet(sheet.id)
```

워크시트에 접근해 시트 순서나 상태를 변경한다거나

```ts
worksheet.state = 'visible'
worksheet.state = 'hidden'
worksheet.state = 'veryHidden'
```

프린트 영역이나 시트 레이아웃을 설정한다거나

```ts
```

필터기능을 활성화시킬 수도 있습니다.

```ts
```

## Cell

열에 데이터를 통째로 집어넣거나

```ts
```

행에 데이터를 통째로 집어넣거나

```ts
```

셀 하나하나를 직접 핸들하거나

```ts
```

셀을 병합시킨다거나

```ts
```

열을 삽입시킨다거나

```ts
```

열을 쪼갠다거나

```ts
```

열을 복사한다거나

```ts
```

셀에 들어가는 데이터 타입검사를 한다거나(!)

```ts
```

셀에 코멘트를 단다거나

```ts
```

테이블을 제어한다거나

```ts
```

스타일을 제어한다거나

```ts
```

조건부 서식을 사용한다거나

```ts
```

테두리를 추가한다거나

```ts
```

이미지를 제어한다거나

```ts
```

## File I/O

시트에 함호를 건다거나

```ts
```

xlsx와 csv 타입을 I/O할 수 있습니다.

```ts
```

스트리밍 I/O도 제공하고 있습니다.

```ts
```

## 커스텀 헬퍼 함수

`readFromExcel`

```ts
const readFromExcel = (path: string) => {
  const workbook = new Excel.Workbook()
  await workbook.xlsx.readFile(path)
  return wrokbook
}

const readStreamFromExcel = (path: string) => {
  const wrokbook = new Excel.stream.xlsx.WorkbookWriter({
    filename: path
  })
  return workbook
}

const memoizedReadFromExcel = (path: string) => {
  const memoizedResult = await pMemoize(readFromExcel)
  return cloneDeep(memoizedResult)
}
```

수정/복제/병합: cloneRows, writeRows, getRows, cloneCell, getMergedCells, cloneSheet, WriteLineCursor

셀주소: parseExcelAddress, toExcelColumn