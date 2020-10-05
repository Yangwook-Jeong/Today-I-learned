---
layout: post
title: Exceljs API와 커스텀 유틸함수로 생산성 올리기
author: Yangeok
categories: Node.js
date: 2020-10-01 09:00
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
  - [파일 I/O](#파일-io)
  - [셀 제어](#셀-제어)
  - [워크시트 제어](#워크시트-제어)
  - [셀 주소 제어](#셀-주소-제어)

## Workbook

엑셀은 **워크북, 워크시트, 셀**로 이뤄져있다고 저번 글에서 잠깐 언급했었죠. 가장 첫 스텝은 워크북을 세팅하는 일입니다.

```ts
const workbook = new Excel.Workbook()
```

2번째 인자에 다양한 옵션을 사용할 수 있습니다. 패키지 관리 파일에서처럼 작성자 및 날짜 정보를 담을 수 있습니다. 인터페이스는 아래와 같은 형태입니다.

```ts
class Workbook {
  creator: string;
  lastModifiedBy: string;
  created: Date;
  modified: Date;
  lastPrinted: Date;

  (...)
}
```

**이미지**

## Worksheet

워크북, 엑셀 파일을 만들었으면 그 안에 들어갈 시트를 만들 차례입니다.

```ts
const sheet = workbook.addWorksheet('Foo')
```

`addWorksheet`의 2번째 인자로 옵션을 담아줄 수도 있고 워크시트를 선언한 이후에 하위 객체로 접근해서 수정할 수도 있습니다.

```ts
const sheet = workbook.addWorksheet('Foo', {
  properties: { outlineLevelCol: 5 } // this.properties.outlineLevelCol = 5
})

sheet.properties.outlineLevelCol = 4 // this.properties.outlineLevelCol = 4
```

**이미지**

참고로 `tabColor`는 deprecated되었으니 사용을 지양해주세요. `lib/docs/workbook.js` 62번 줄에서 아래와 같이 경고를 날립니다.

> tabColor argument is now deprecated. Please use workbook.addWorksheet(name, {properties: {tabColor: {argb: "rbg value"}}

## Cell

행을 통째로 호출해서 제어할 수 있습니다. 참고로 셀 주소의 알파벳에 해당하는 row를 선택하면 column들이 모두 선택됩니다. `currentRow`가 B라면 B에 해당하는 모든 열이 선택되죠.

**이미지**

```ts
const currentRow = 'B'
const columns = worksheet.getColumn(currentRow)
```

모든 열들을 루프 돌릴 수도 있습니다. `includeEmpty` 옵션을 써주지 않으면 비어있는 셀은 건너뛰니 주의하세요.

```ts
columns.eachCell((cell, rowNumber) => {
   cell.value = 'foo'
   (...)
})

columns.eachCell({ includeEmpty: true }, (cell, rowNumber) => {
  (...)
})
```

행을 통째로 호출해서 제어할 수 있습니다. 

```ts
const currentColumn = 5
const rows = worksheet.getRow(currentColumn)
```

마찬가지로 모든 행들을 루프 돌릴 수 있습니다. `includeEmpty` 옵션을 써주지 않으면 비어있는 셀은 건너뛰니 주의하세요.

```ts
rows.eachCell((cell, colNumber) => {
  cell.value = 'bar'
  (...)
})

rows.eachCell({ includeEmpty: true }, (cell, colNumber) => {
  (...)
})
```

각각의 셀을 제어할 수 있습니다.


```ts
const cell = worksheet.getCell('C1')
cell.value = 'foo'
```

셀을 병합해 그 셀을 제어할 수 있습니다.

```ts
const mergedCell = worksheet.mergeCells('C1:D1')
mergedCell.value = 'bar'
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

### 파일 I/O

저는 템플릿 파일을 만들어놓고 사용할거에요. 템플릿 파일과 함께 배포해서 외부 요청하는 경우에 파일 로딩을 빠르게 할 수 있게 캐시를 추가해뒀습니다. `pMemoize`의 2번째 인자로는 캐시 만료 시간을 밀리세컨드 단위로 설정할 수 있는데 기본값이 무한대라고 합니다. 기타 옵션들은 [여기](https://github.com/sindresorhus/mem#options)에서 확인하실 수 있습니다.

```ts
import Excel from 'exceljs'
import pMemoize from 'p-memoize'
import { cloneDeep } from 'lodash'

const readFromExcel = (path: string) => {
  const workbook = new Excel.Workbook()
  await workbook.xlsx.readFile(path)
  return workbook
}
const readStreamFromExcel = (path: string) => {
  const wrokbook = new Excel.stream.xlsx.WorkbookWriter({ filename: path })
  return workbook
}
const memoizedReadFromExcel = (func: function, path: string) => {
  const memoizedResult = await pMemoize(func(path))
  return cloneDeep(memoizedResult)
}
```

### 셀 제어

```ts
const cloneCell = (
  fromCell: Excel.Cell,
  toCell: Excel.Cell,
  options?: {
    dontMergeCell?: boolean
  }
) => {
  toCell.value = fromCell.value
  toCell.alignment = fromCell.alignment
  toCell.style = fromCell.style
  toCell.border = fromCell.border
  toCell.font = fromCell.font

  if (!options?.dontMergeCell) {
    const fromCellRow = Number(fromCell.row)
    const fromCellCol = Number(fromCell.col)

    const fromCellMaster = fromCell.maswter
    const rightFromCellMaster = fromCell.worksheet.getCell(
      fromCellRow,
      fromCellCol + 1
    ).master
    const bottomFromCellMaster = fromCell.worksheet.getCell(
      fromCellRow + 1,
      fromCellCol
    ).master
    const masterDiff = fromCellMaster &&
      rightFromCellMaster !== fromCellMaster &&
      bottomFromCellMaster !== fromCellMaster && {
        diffRow: Number(fromCellMater.row) - fromCellRow,
        diffCol: Number(fromCellMaster.col) - fromCellCol
      }
    
    if (
      masterDiff &&
      (masterDiff.diffRow < 0 || masterDiff.diffCol < 0)
    ) {
      const alreadyMerged = getMergedCells({
        sheet: toCell.worksheet,
        top: Number(toCell.row) + masterDiff.diffRow,
        left: Number(toCell.col) + masterDiff.diffCol,
        bottom: Number(toCell.row),
        right: Number(toCell.col)
      })

      if (alreadyMerged.length > 0) {
        console.error('Has already merged cells')
      }

      toCell.worksheet.mergeCells({
        top: Number(toCell.row) + masterDiff.diffRow,
        left: Number(toCell.col) + masterDiff.diffCol,
        bottom: Number(toCell.row),
        right: Number(toCell.col)
      })
    }
  }
}
```


### 워크시트 제어

템플릿 시트를 만들어두고, 새로운 시트에 템플릿을 복사하는 API는 없더라구요. 아래와 같이 `cloneSheet`를 만들어두고 사용하면 편리하게 템플릿을 갖다 쓸 수 있습니다. 

```ts
const cloneSheet = (
  fromSheet: Excel.Worksheet,
  toSheet: Excel.Worksheet
) => {
  fromSheet.eachRow((row, rowNumber) => {
    row.eachCell({ includeEmpty: true }, (originalCell, colNumber) => {
      const targetcell = toSheet.getCell(rowNumber, colNumber)
      cloneCell(originalCell, targetCell))
    })
  })

  toSheet.columns = fromSheet.columns
  toSheet.views = fromSheet.views
  toSheet.autoFilter = fromSheet.autoFilter
}
```

###

### 셀 주소 제어

아래와 같이 반복문을 돌려야 하는 경우에는 number 타입으로 사용하지만 엑셀에서 사용하는 커서는 행이 string 타입이라 number를 string 타입으로 바꿔줘야 합니다. toExcelColumn을 헬퍼 함수로 사용하면 손쉽게 치환할 수 있습니다.

```ts
const toExcelRow = (column: number) => {
  let temp: number
  let letter: string
  while (coloumn > 0) {
    temp = (column - 1) % 26
    letter = String.fromCharCode(temp +65) + letter
    column = (column - temp - 1) / 26
  }
  return letter
}
```

워크시트에 필터를 거는 경우에도 행이나 열이 고정되지 않은 경우에는 아래와 같이 셀 좌표를 직접 찍어주는데 무리가 있습니다.

```ts
// way 1
worksheet.autoFilter = 'A1:C10'

// way 2
worksheet.autoFilter = {
  from: 'A1', to: 'C10'
}

// way 3
worksheet.autoFilter = {
  from: { row: 1, column: 1 },
  to: { row: 3, column: 10 },
}
```

현재 열을 가리키는 커서 `currentRow`가 있다면 위의 세 가지 방법 중 어떤 방법이건 `toExcelRow` 함수로 손쉽게 사용할 수 있습니다. 가독성은 조금 떨어질 수도 있습니다.

```ts
// way 1
worksheet.autoFilter = `A1:${toExcelRow(currentRow)}${currentColumn}`

// way 2
worksheet.autoFilter = {
  from: 'A1', to: `${toExcelRow(currentRow)}${currentColumn}`
}

// way 3
worksheet.autoFilter = {
  from: { row: 1, column: 1 },
  to: { row: toExcelRow(currentRow), column: currentColumn }
}
```




수정/복제/병합: cloneRows, writeRows, getRows, cloneCell, getMergedCells, cloneSheet, WriteLineCursor