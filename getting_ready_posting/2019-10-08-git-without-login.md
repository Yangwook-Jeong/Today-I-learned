cloud environment에서 git login 없이 사용하려면

원격저장소명을 ssh식으로

`git remote set-url origin https://<your-access-token>@github.com/username/repo.git`

으로 바꾸거나

`git clone <ssh address>`

를 하거나

[deploy keys](https://developer.github.com/v3/guides/managing-deploy-keys/)를 사용하거나

[참조](https://help.github.com/en/articles/creating-a-personal-access-token-for-the-command-line)

[세팅](https://github.com/settings/tokens)

ec2 비밀번호 로그인하는 방법은

[여기](https://aws.amazon.com/ko/premiumsupport/knowledge-center/ec2-password-login/)
