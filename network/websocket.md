웹소켓 (Websocket)
====

## 웹소켓?
서버와 클라이언트간의 요청-응답에서 벗어난 양방향 통신기술 AJAX이 2005년 발표됨. 웹소켓 기본 API는 연결(connect), 종료(close), 발신(send), 수신(receive), 로그(log) 정도가 있다. 

```html
<!DOCTYPE html>
<meta charset="utf-8" />
<title>WebSocket 테스트</title>
<script language="javascript" type="text/javascript">
 
    var wsUri = "ws://echo.websocket.org/";
    var output;
 
    function init()
    {
        output = document.getElementById("output");
        testWebSocket();
    }
 
    function testWebSocket()
    {
        websocket = new WebSocket(wsUri);
        websocket.onopen = function(evt) { onOpen(evt) ;};
        websocket.onclose = function(evt) { onClose(evt) };
        websocket.onmessage = function(evt) { onMessage(evt) };
        websocket.onerror = function(evt) { onError(evt) };
    }
 
    function onOpen(evt)
    {
        writeToScreen("연결완료");
        doSend("테스트 메세지"); // network/frame탭에 찍힘
    }
 
    function onClose(evt)
    {
        writeToScreen("연결해제");
    }
 
    function onMessage(evt)
    {
        writeToScreen('<span style="color: blue;">수신: ' + evt.data+'</span>');
        websocket.close();
    }
 
    function onError(evt)
    {
        writeToScreen('<span style="color: red;">에러:</span> ' + evt.data);
    }
 
    function doSend(message)
    {
        writeToScreen("발신: " + message);
        websocket.send(message);
    }
 
    function writeToScreen(message)
    {
        var pre = document.createElement("p"); // p태그 생성
        pre.style.wordWrap = "break-word"; // css 스타일 제어 
        pre.innerHTML = message; // doSend()의 매개변수 message
        output.appendChild(pre); // p태그를 #output의 자식으로 삽입
    }
 
    window.addEventListener("load", init, false);
 
</script>
    <body>
        <h2>WebSocket Test</h2>
        <div id="output"></div> // 웹에 출력
    </body>
</html>
```

## Socket.io
node.js 모듈로 제공되는 웹소켓 api.