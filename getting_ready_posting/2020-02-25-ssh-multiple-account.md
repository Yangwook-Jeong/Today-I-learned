---
layout: post
title: 머신 한 대에서 GIT 계정 여러개 사용하기
author: Yangeok
categories: ETC
date: 2020-02-13 09:00
comments: true
tags: [ssh, github, multiple account]
cover:
---

목차
- 계정 두개 준비 후, ssh키 두 개 만들기
- 계정마다 ssh키 등록하기
- ~/.ssh/config 파일 작성하기
- 문제발생: 업로드는 되는데 회사계정으로 개인저장소에 커밋 올라감
  - ~/.gitconfig, ~/.gitconfig-* 파일 작성하기



- git-multiple-profile
	- 각 계정명으로 ssh 공개/비밀키를 생성하고, 파일명을 `id_rsa_foo`로 짓는다.
		 ```sh
		 $ ssh-keygen -t rsa -b 4096 -C "foo@example.com"
		 ```
	 - 생성한 키를 daemon에 등록한다.
		 ```sh
		 $ eval "$(ssh-agent -s)" &&\
			ssh-add -K id_rsa_personal		 
		 ```
	- 공개키를 복사해서 github에 계정마다 추가한다.
		```sh
		# 방법 1
		$ pbcoby < id_rsa_personal.pub

		# 방법 2
		$ clip < id_rsa_personal.pub
		```
	- daemon에 추가된 ssh키는 다음과 같이 확인한다.
		```sh
		$ ssh-add -l
		```
	- profile을 관리해주는 `config`파일을 생성한다.
		```sh
		# 개인용 계정
		Host personal
		   HostName github.com
		   User git
		   IdentityFile ~/.ssh/id_rsa_personal

		# 회사용 계정
		Host work
		   HostName github.com
		   User git
		   IdentityFile ~/.ssh/id_rsa_work
		```
	- git 원격 저장소에는 다음과 같은 주소로 연결할 수 있다.
		```sh
		git@{호스트 이름}:{계정 이름}/{저장소 이름}.git
		```


- ssh
	- `ssh -T {user}@{hostname}`: 설정된 ssh를 확인할 수 있다.
		```sh
		Hi Yangeok! You've successfully authenticated, but GitHub does not provide shell access.
		```

- git
  - git remote url을 설정할때 저장소 소유자의 유저명을 다음과 같이 입력해야 함을 주의해야 한다.
		```sh
		# 저장소 소유자명은 foo, 사용자명은 bar, config의 host명은 baz, 저장소명은 faz일때
		$ git remote set-url origin git@baz:foo/faz.git
		```
	- gitconfig: commit 작성자를 폴더별로 자동으로 매핑할 수 있다.
		```sh
		# .gitconfig-work
		[user]
					email = {이메일 주소}
					name = {이름}
		[github]	
					user = {유저명}

		# .gitconfig
		[user]
					name = {이름}
					email = {이메일 주소}
		[includeIf "gitdir:{폴더명}/"]
					path = .gitconfig-work
		```
