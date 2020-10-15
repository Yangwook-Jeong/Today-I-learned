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


`-i`는 `--interactive`의 약어로 뜻과 같이 대화형으로 rebase를 실행하겠다는 소리이다. `HEAD~4`는 head로부터 4개만큼 띄우겠다는 의미이다. `HEAD^`는 head로부터 1개만큼을 띄우겠다는 소리이다.

## 대화형 rebase 사용하기

### pick

대화형의 기본 옵션 명령어이다. 커밋의 순서를 바꿀 수 있다. 다만 conflict가 발생할 수 있으니 조심해서 쓰는게 좋다.

### reword

커밋 메시지를 바로 수정할 수 있다

### edit

커밋 메시지 뿐만 아니라 커밋의 작업 내용도 변경할 수 있다.

### squash

s 옵션을 입력한 커밋과 바로 위의 커밋을 하나의 커밋으로 합칠 수 있다. s 옵션을 여러 커밋에 써주면 여러개의 커밋을 하나로 합치는 거솓 가능하다.

### fixup

해당 커밋을 이전 커밋과 합치는 기능을 하지만, 커밋 메시지는 합치지 않는다.

### exec

각각 커밋이 적용된 후 shell 명령어를 지정할 수 있다.

### drop

히스토리에서 해당 커밋을 삭제하는 명령어이다. rb 리스트에서 해당 커밋의 라인을 없애도 같은 기능을 한다.

## 같은 브랜치에 여러명이 작업한 경우 Merge branch 커밋이 생긴 경우 해소하기

rebase를 사용해서 fork한 저장소를 최신 원본과 동기화시키기

a 사용자가 1, 3 커밋을, b 사용자가 2 커밋을 시간순서대로 작성한다.

b 사용자가 2 커밋까지 origin에 올린다.

a 사용자가 3 커밋을 push 하면 conflict가 발생한다.

a는 pull을 한다.

git은 auto-merging을 시도하고 실패하면 로그를 아래와 같이 띄우며 충돌 해소를 사용자에게 하라고 한다.

> Automatic merge failed; fix conflicts and then commit the result.

ide나 cli 환경에서 충돌난 부분을 해소시켜준다.

해소시키고 새로운 커밋인 merge 2 and 3를 작성해준다. 그러면 커밋 2는 사라지고 1, 3, merge 2 and 3 커밋이 순서대로 남느낟.

origin에 커밋 2가 이미 올라가있기 때문에 -f 옵션을 붙여 push 해준다.

a 사용자 측은 커밋 로그를 한 줄로 만든채로 origin까지 성공적으로 올렸다.

b 사용자는 local에 있는 커밋 2 때문에 pull을 받으면 커밋이 꼬이며 auto-merging이 merge branch 커밋을 만든다.

로컬에 있는 커밋로그와 origin에 있는 커밋로그가 달라서 발생한 일이다. reset을 --hard 옵션으로 충돌이 일어나지 않을만큼 뒤로 롤백한다.

그 다음 pull을 받으면 a가 강제로 push한 한 줄짜리 커밋로그를 확인할 수 있다.

### cherry-pick

cherry-pick은 옮길 커밋이 여러개인 경우는 사용하기 번거로우니 rebase를 사용할 것을 추천한다.

a 사용자가 커밋 2를 남기고 push한 경우

b 사용자가 커밋 3을 남긴 후 push하려고 하면 conflict가 일어난다

b 사용자는 pull을 받아 merging 상태에 놓인다.

git reset --soft HEAD~1을 한다

git stash로 stash에 담는다

git pull을 한다

git stash pop으로 스테이지로 옮겨온다

커밋을 친다

## 현재 브랜치에 다른 브랜치 커밋로그를 붙이기

## 주의사항

`-f` 옵션을 사용해 저장소에 올려야 하는 경우가 많기때문에 협업시 브랜치를 공유할 때 `git rebase`를 사용하는 것은 지양하는 것이 좋다.