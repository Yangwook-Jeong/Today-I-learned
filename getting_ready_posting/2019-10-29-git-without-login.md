---
layout: post
title: AWS EC2는 비밀번호로 & Git은 비밀번호 없이 사용하기
author: Yangeok
categories: DevOps
date: 2019-10-28 09:24
comments: true
cover: https://res.cloudinary.com/yangeok/image/upload/v1572139949/logo/posts/gitc2.jpg
---

## 작업환경

- windows 10
- git bash

## 목차

- [EC2 비밀번호 설정하기](#EC2-비밀번호-설정하기)
- [git private 저장소 pull시 로그인 생략하기](#git-private-저장소-pull시-로그인-생략하기)
- [참조](#참조)

## EC2 비밀번호 설정하기

`INSTANCES - Instances`로 이동해서 `Launch Instance`를 클릭합니다. E키 페어를 만들어서 `.pem`파일을 다운받거나, 기존에 만들어둔 키 페어를 사용해서 인스턴스를 시작할 수 있습니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572150762/ec2-git/ec2-01.jpg)

`NETWORK & SECURITY - Security Groups`로 이동해서 `Create Security Group`을 클릭합니다. 양쪽으로 ssh 포트를 열어줍니다.

![](https://res.cloudinary.com/yangeok/image/upload/v1572150762/ec2-git/ec2-02.jpg)

이제 외부에서 ssh로 접속할 수 있는 상태가 됐습니다. 저같은 경우에는 git bash를 사용해 접속하려고 합니다.

`ssh -i ./<keyname>.pem <username>@<host>`

위 방법은 키파일을 가지고 인스턴스에 접속하는 방법입니다. 불편함을 해소하고자 putty를 이용해봤는데 putty도 결국 키파일을 이용해서 접속하는 방법이기 때문에 다른 환경에서 접속하기 제한적입니다. 친절하게도 aws에서 해당 이슈를 문서로 지원해주고 있습니다.

인스턴스에서 아래와 같이 비밀번호를 설정할 수 있습니다.

```sh
$ sudo passwd <username>
Changing password for user <username>
New password:
Retype new password:
```

하지만 root 사용자로 들어가서 <username>의 비밀번호를 설정할 경우 설정이 되지 않으니 root 계정에서 나온 다음에 진행하시길 바랍니다.

비밀번호 설정에 성공하면 아래와 같은 로그가 찍힙니다.

> passwd: all authentication tokens updated successfully.

`/etc/ssh/sshd_config` 파일에서 `PasswordAuthentication`을 `yes`로 변경한 다음 ssh를 restart합니다.

`sudo service ssh restart`

인스턴스를 빠져나와 비밀번호 없이 인스턴스에 접속할 수 있게 되었습니다.

`ssh <username>@<host>

## git private 저장소 pull시 로그인 생략하기

인스턴스에서 git 저장소를 가져오려고 할때 private 저장소라면 항상 로그인을 해줘야합니다.

`Settings - Developer settings - Personal access tokens`에서 `Generate new token`을 클릭합니다.
[여기](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)를 클릭해 가이드를 따라하세요.

혹은 토큰을 만드는데까지만 똑같이 한 다음 저장소에 들어가 `Clone or download - Use SSH`를 클릭합니다. 기존에 clone 해왔던 저장소 url을 아래와 같이 바꾸거나

`git remote set-url origin https://<your-access-token>@github.com/username/repo.git`

혹은

`git clone <ssh address>`

를 입력하면 git 계정인증을 매번 할 필요가 없어집니다.

## 참조

- [deploy keys](https://developer.github.com/v3/guides/managing-deploy-keys/)를 사용하거나
- [SSH를 사용하여 EC2 인스턴스에 로그인할 때 키 페어 대신 암호 로그인을 활성화하려면 어떻게 해야 합니까?](https://aws.amazon.com/ko/premiumsupport/knowledge-center/ec2-password-login)
