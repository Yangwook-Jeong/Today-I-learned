### 서론

푸시알림 기능을 사용하는 방법을 다양합니다. 제가 알고있는 방법으로는 다음과 같습니다.

- expo push notification
- fcm + apns
- fcm only
- aws amplify

expo 푸시알림을 사용하면 별도의 인증작업이 필요없지만, `expo eject`를 하면 더 이상 expo 푸시알림 기능을 사용할 수 없습니다. 푸시알림을 사용하기 위해서는 어쩔 수 없이 관리포인트가 늘어나지만 위 방법 중 하나를 선택할 수밖에 없습니다. 최대한 빨리 최대한 간단하게 구현하는 것이 가장 중요한 기준이었습니다. aws amplify에서 ios, 안드로이드 푸시알림 기능 통합 서비스를 제공하고 있기도 하고 앱 서버를 aws로 관리하고 있어서 이 방법을 선택하려고 했습니다. 하지만 2018년도부터 제공하는 서비스라 그런지 레퍼런스가 부실해서 제게 빠른 구현을 할 수 있는 선택지는 아니었던 것 같습니다.

fcm, apns로 따로 나눠서 푸시알림을 관리한느 것도 불편해보였습니다. fcm에서는 자체적으로 안드로이드와 ios뿐만 아니라 웹까지도 지원하는 것을 확인했습니다. 웹 확장성까지도 갖는 fcm을 선택하는게 가장 최선이라고 생각해 fcm만으로 안드로이드, ios 푸시알림을 구현하게 되었습니다.

### 디바이스 토큰 저장

현재 디바이스에서 fcm 토큰을 가지고 있고 로그인한 사용자의 fcm 토큰과 일치하지 않는다면, `user.fcmToken`에 토큰을 저장합니다. 원래 받은 토큰이 사라지고 새롭게 생성된 경우도 로그인한 사용자의 fcm 토큰과 일치하는지 확인합니다.
`setFcmToken()` 함수는 graphql 함수이고 구조도 간단하므로 여기서는 자세히 다루지 않겠습니다.

```js
// App.js

const saveTokenToDatabase = useCallback(async (token) => {
  const { error } = await setFcmToken(token);
  if (error) throw Error(error);
}, []);

const saveDeviceToken = useCallback(async () => {
  const currentFcmToken = await firebase.messaging().getToken();
  if (currentFcmToken !== fcmToken) {
    return saveTokenToDatabase(currentFcmToken);
  }

  const refreshedFcmToken = await firebase.messaging().onTokenRefresh();
  if (refreshedFcmToken !== fcmToken) {
    return saveTokenToDatabase(refreshedFcmToken);
  }
}, [fcmToken]);
```

### FCM 콘솔 설정

프로젝트를 생성하고 **Cloud Messaging**으로 들어가 추가하고자 하는 앱을 추가합니다. bundle id를 가져와서 입력하고 네이티브 단에 sdk를 추가시켜줍니다. 아까 얻은 디바이스 토큰을 가지고 콘솔 상에서 푸시를 보내볼 수 있습니다.

### 리스너 패턴

우선 앱의 라이프사이클에 대해서 이야기를 하지 않고 넘어갈 수는 없을 것 같아요. 리스너 api를 라이프사이클에 맞게 사용해봅니다. 함수형 컴포넌트에서는 hooks를 사용할 수 있기때문에 react 라이프사이클을 사용하는데 훨씬 간편하게 사용할 수 있습니다.

### 메시지 전달 API

위 콘솔 상에서 한 테스트는 간단하지만, sdk를 사용해서 프로그램 상에서 푸시를 날리는 것은 조금 더 복잡합니다. legacy http api에 이어서 http api v1이 나와서 저는 이걸 사용합니다. 둘의 차이는 request body의 모양도 다르지만, 인증방식에 가장 큰 차이가 있습니다. fcm 푸시서버에 직접 요청을 때리는 것이기때문에 graphql을 사용하건 http api를 사용하건 본인에게 익숙한 방법을 사용하는 것을 추천합니다. google api에 접근하기 위한 access token을 발급받도록 하겠습니다. http api로 푸시 알림을 보내기 위해 postman으로 테스트해보도록 하겠습니다.

#### legacy api

이전 요청은 아래와 같이 보낼 수 있었습니다.

```sh
POST https://fcm.googleapis.com/fcm/send
```

인증 헤더에 콘솔에서 확인할 수 있는 **서버 키**를 집어넣어주면 요청을 할 수 있습니다.

#### http v1 api

이제 요청을 아래와 같이 보낼 수 있습니다.

```sh
POST https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send
```

v1 요청의 경우 이전 요청에서 사용하는 **서버 키** 대신에 **OAuth 2.0 액세스 토큰**이 필요합니다. 따라서 다른 구글 api를 사용하기 위해 거쳤던 인증과정을 거쳐 받은 토큰으로 인증 헤더에 토큰 값을 다음과 같이 집어넣어줘야 합니다.

```sh
Authorization: Bearer oauth-20-token
```


### 예제

어떤 앱에서 두 명의 사용자를 만들겠습니다. 대신에 사용자가 두 명이 아니라 수 백 명이라고 상상을 해주세요. `userId`가 `1`인 사용자가 글을 작성하면 `userid`가 `2`인 사용자에게 알림이 가게 한다고 가정합시다.

간단한 앱 코드와 백엔드 코드가 필요합니다.

<앱 화면 및 상태 선언>

<백엔드 api 선언>

### v5, v6 비교

#### v5

`react-native-firebase`만 사용합니다. 또한 `react-native link`로 Podfile에 pod을 추가하거나 직접 선언해서 아래와 같이 추가해주어야 합니다.

```ruby
pod 'Firebase'
```

#### v6

`react-native-firebase/app`을 필수로 사용해야 하고 필요한 라이브러리만 받아서 사용할 수 있습니다. 때문에 우리 프로젝트의 용량을 아낄 수 있습니다. unimodules가 v6부터는 자동으로 pod install을 해준다고 명시되어 있습니다. 하지만 Podfile에 따로 호출하는 구문을 작성해주어야 정상적으로 작동합니다.

```ruby
pod 'Firebase/Core'
pod 'Firebase/Messaging'
```

v6에서는 `firebase.initializeApp(config)`를 해주어야 한다. os 별로 해주어야 하는 것 같고, 초기화는 `firebase-admin`

### react-native-firebase v6로 마이그레이션

마이그레이션을 하면서 겪었던 경고 및 에러에 대한 설명을 드리겠습니다.