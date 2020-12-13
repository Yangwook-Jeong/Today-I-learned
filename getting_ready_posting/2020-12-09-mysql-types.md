---
layout: post
title: MySQL 데이터 타입 총정리
author: Yangeok
categories: Typescript
date: 2020-10-01 09:00
comments: true
tags: []
cover: https://res.cloudinary.com/yangeok/image/upload/v1606139412/logo/posts/typeorm.jpg
---- 

## 목차
- [목차](#목차)
- [문자형](#문자형)
  - [CHAR](#char)
  - [BLOB/BINARY/TEXT](#blobbinarytext)
  - [SET/ENUM](#setenum)
- [숫자형](#숫자형)
  - [INT](#int)
  - [NUMERIC/DECIMAL](#numericdecimal)
  - [FLOAT/DOUBLE/REAL](#floatdoublereal)
- [날짜형](#날짜형)
  - [DATE](#date)
  - [TIME](#time)
  - [DATETIME](#datetime)
  - [TIMESTAMP](#timestamp)
- [기타](#기타)
  - [GEOMETRY](#geometry)
    - [POINT](#point)
    - [LINESTRING](#linestring)
    - [POLYGON](#polygon)
    - [MULTIPOINT](#multipoint)
    - [MULTILINESTRING](#multilinestring)
    - [MULTIPOLYGON](#multipolygon)
    - [GEOMETRYCOLLECTION](#geometrycollection)
  - [JSON](#json)

## 문자형

### CHAR

`CHAR`는 아래와 같은 특징을 갖고 있다.

- 고정형 문자열 타입이다. 
- `CHAR(20)`일 때 2byte의 문자를 넣어도 20byte만큼의 데이터를 잡는다. 
- 추후 연산이 필요 없어서 조회속도가 다른 타입보다 월등히 빠르다. 
- 데이터 사이즈가 고정되었을 때 사용하면 효율적으로 데이터를 관리할 수 있다.

`VARCHAR`는 아래와 같은 특징을 갖고 있다.

- 가변형 문자열 타입이다. 
- `VARCHAR(20)`일 때 2byte의 문자를 넣으면 2byte만큼의 데이터만 잡는다. 
- 데이터 길이에 따라 가변적으로 길이가 정해진다. 

`NCHAR`/`NVARCHAR`같은 경우에는 유니코드를 지원하지 않는 character set을 가진 데이터베이스에서 유니코드를 지원하기 위해 설정할 수 있는 타입이다. 한글 이외의 다른 언어를 급히 저장할 필요가 있는 경우 사용하기 좋다.

`NCAHR`는 아래와 같은 특징을 갖고 있다.

- typeorm에서는 `nchar` 혹은 `national char`로 사용한다.

`NVARCHAR`는 아래와 같은 특징을 갖고 있다.

- typeorm에서는 `nvarchar` 혹은 `national varchar`로 사용한다.

### BLOB/BINARY/TEXT

다음은 아래 타입들이 갖는 공통적인 특징이다.
- 조회시 성능문제가 생길 수 있으므로 필요한 경우에만 사용해야 한다.
- 둘 다 대량의 데이터를 저장하는데 사용한다.
- `BLOB`/`BINARY`은 character set, collation을 binary로만 설정할 수 있지만, `TEXT`는 그렇지 않다. 나머지는 대동소이함

`BLOB`는 아래와 같은 특징을 갖고 있다.

- 기본값을 가질 수 없다. 
- Binary Long Object의 약자이다. 
- `BLOB`/`TINYBLOB`/`MEDIUMBLOB`/`LONGBLOB`가 있다. 
  
`BINARY`/`VARBINARY`는 아래와 같은 특징을 갖고 있다. 

- 기본값을 가질 수 없다.
- 바이너리 바이트로 데이터를 저장할 수 있다. 
- 관련된 문자세트가 없는 문자의 전체 바이트를 저장할 때 사용한다.  

`TEXT`/`TINYTEXT`/`MEDIUMTEXT`/`LONGTEXT`는 아래와 같은 특징을 갖고 있다. 

- 기본값을 가질 수 없다. 
- 바이너리를 base64로 인코딩해서 입력하기 위해 사용할 수 있다. 
- 열의 처음 n개의 문자만 인덱싱할 수 있다. 
- 만약 전체 내용을 검색하는 경우에는 `TEXT` 대신 `CHAR`/`VARCHAR`를 사용하는 것이 더 빠르다.

### SET/ENUM

`SET`은 아래와 같은 특징을 갖고 있다.

- 중복되지 않는 여러 값을 갖는 객체 타입이다. 
- `WHERE` 절에서 `FIND_IN_SET()`을 통해 `SET`의 아이템 중 일치하는 멤버를 찾을 수 있다.
- 멤버를 복수 선택하는 것 가능

`ENUM`은 아래와 같은 특징을 갖고 있다.

- 데이터 용량을 적게 차지함. 문자열은 자동으로 숫자로 인코딩되어 저장하기 때문. 유효하지 않은 값은 무효화되므로 데이터의 정합성을 높일 수 있음
- `ORBER BY`절를 하면 추가비용이 발생한다. 
- `ENUM`의 멤버를 변경하는 작업이 수고롭다. 
- 다른 테이블의 `FK`로 사용하는 경우 다른 테이블에 영향을 끼친다. 
- 멤버를 단일 선택하는 것만 가능
- 다른 DBMS로 마이그레이션이 어려워서 일반적으로 사용하지 않길 권장한다. 
- typeorm에서는 mysql과 pgsql에서만 지원하는 타입이다.
- 사용하는 경우는 아래와 같다.
  - 유일하고 변하지 않는 값을 저장하는 경우 (대륙, 호칭 등)
  - 절대로 연관된 정보를 저장할 필요 업는 경우 (스페이드/하트/다이어몬드/클로버 등)
  - 2개 이상 20개 이하의 값을 다루는 경우

## 숫자형

### INT

`INT`/`INTEGER`/`TINYINT`/`SMALLINT`/`MEDIUMINT`/`BIGINT`는 아래와 같은 특징을 갖고 있다.

- 숫자 길이에 따른 타입이름의 차이만 있을 뿐이다.
- typeorm에서는 `int` 혹은 `integer`로 사용한다.

### NUMERIC/DECIMAL

`NUMERIC`/`DECIMAL(m, \[d])`은 다음과 같은 특징을 갖고 있다.

- 고정소수점 숫자를 저장하는 용도로 사용. 내부적으로는 문자형태로 저장됨
- typeorm에서는 `numeric`, `dec` 혹은 `decimal`로 사용한다.
- 전체 자릿수 `m`과 소수점 이하 자릿수 `d`를 가진 타입이다.

### FLOAT/DOUBLE/REAL

`FLOAT`/`DOUBLE`/`REAL`는 다음과 같은 특징을 갖고 있다.

- 부동소수점 숫자를 저장하는 용도로 사용한다.
## 날짜형

### DATE

- `YYYY-MM-DD` 포맷을 사용한다.

```sql
SELECT CAST('2020-12-01 12:00:00' AS DATE) AS 'date';
-- 2020-12-01
```

### TIME

- `HH:MM:SS` 포맷을 사용한다.

```sql
SELECT CAST('2020-12-01 12:00:00' AS TIME) AS 'time';
-- 12:00:00
```

### DATETIME

- `YYYY-MM-DD HH:MM:SS` 포맷을 사용한다.

```sql
SELECT CAST('2020-12-01 12:00:00' AS DATETIME) AS 'datetime';
-- 2020-12-01 12:00:00
```

### TIMESTAMP

- 10자리의 unix timestamp이다.

## 기타

### GEOMETRY

- 실시간 도착알림, 네비게이션, 지하철 앱 등에 사용할 수 있는 좌표를 나타내는 타입이다.

![](https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F0ExKk%2FbtqDurscnn8%2FrK3KBj5ixQNkUdaK6QKit0%2Fimg.png)

#### POINT

- 좌표 공간에서 한 지점의 위치를 표시한다.

```sql
POINT(10 10)
```

#### LINESTRING

- 다수의 `POINT`를 연결해주는 선분을 표시한다.

```sql
LINESTRING(10 10, 20 25, 15 40)
```

#### POLYGON

- 다수의 `LINESTRING`이 연결되어 닫혀있는 상태인 다각형이다.

```sql
POLYGON((10 10, 10 20, 20 20, 20 10, 10 10))
```

#### MULTIPOINT

- 다수의 `POINT`의 집합이다.

```sql
MULTIPOINT(10 10, 30 20)
```

#### MULTILINESTRING

- 다수의 `LINESTRING`의 집합이다.

```sql
MULTILINESTRING((10 10, 20 20), (20 15, 30 40))
```

#### MULTIPOLYGON

- 다수의 `POLYGON`의 집합이다.

```sql
MULTIPOLYGON(((10 10, 15 10, 20 15, 20 25, 15 20, 10 10)), ((40 25, 50 40, 35 35, 25 10, 40 25)))
```

#### GEOMETRYCOLLECTION

- 모든 공간 데이터들의 집합이다.

```sql
GEOMETRYCOLLECTION(POINT(10 10), LINESTRING(20 20, 30 40), POINT(30 15))
```

### JSON

- 배열, 객체 타입 모두 사용 가능하고, 서로 중첩도 가능하다. mysql에서는 `5.7.8` 이후 버전부터 사용 가능하다.
- 내부적으로 `JSON`을 `BINARY` 형태로 저장하기 때문에 이 타입의 정보를 조회할 때 다른 타입보다 리소스를 많이 잡아먹는다.

```sql
INSERT INTO foos VALUES('[99, {"id": "HK500", "cost": 75.99}, ["hot", "cold"]]'); -- OK
INSERT INTO foos VALUES('{"k1": "value", "k2": [10, 20]}'); -- OK
```