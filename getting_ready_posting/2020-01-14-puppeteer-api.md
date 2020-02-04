# Puppeteer API <!-- GEN:version -->Tip-Of-Tree<!-- GEN:stop-->
<!-- GEN:empty-if-release --><!-- GEN:stop -->

- 대화형 문서: https://pptr.dev
- API 번역: [中文|Chinese](https://zhaoqize.github.io/puppeteer-api-zh_CN/#/)
- 고장진단: [troubleshooting.md](https://github.com/puppeteer/puppeteer/blob/master/docs/troubleshooting.md)
- Chromium 버전 별 릴리즈:
  * Chromium 79.0.3942.0 - [Puppeteer v2.0.0](https://github.com/puppeteer/puppeteer/blob/v2.0.0/docs/api.md)
  * Chromium 78.0.3882.0 - [Puppeteer v1.20.0](https://github.com/puppeteer/puppeteer/blob/v1.20.0/docs/api.md)
  * Chromium 77.0.3803.0 - [Puppeteer v1.19.0](https://github.com/puppeteer/puppeteer/blob/v1.19.0/docs/api.md)
  * Chromium 76.0.3803.0 - [Puppeteer v1.17.0](https://github.com/puppeteer/puppeteer/blob/v1.17.0/docs/api.md)
  * Chromium 75.0.3765.0 - [Puppeteer v1.15.0](https://github.com/puppeteer/puppeteer/blob/v1.15.0/docs/api.md)
  * Chromium 74.0.3723.0 - [Puppeteer v1.13.0](https://github.com/puppeteer/puppeteer/blob/v1.13.0/docs/api.md)
  * Chromium 73.0.3679.0 - [Puppeteer v1.12.2](https://github.com/puppeteer/puppeteer/blob/v1.12.2/docs/api.md)
  * [전체 릴리즈](https://github.com/puppeteer/puppeteer/releases)


##### Table of Contents

<!-- GEN:toc -->
- [Overview](#overview)
- [puppeteer vs puppeteer-core](#puppeteer-vs-puppeteer-core)
- [Environment Variables](#environment-variables)
- [Working with Chrome Extensions](#working-with-chrome-extensions)
- [class: Puppeteer](#class-puppeteer)
  * [puppeteer.connect(options)](#puppeteerconnectoptions)
  * [puppeteer.createBrowserFetcher([options])](#puppeteercreatebrowserfetcheroptions)
  * [puppeteer.defaultArgs([options])](#puppeteerdefaultargsoptions)
  * [puppeteer.devices](#puppeteerdevices)
  * [puppeteer.errors](#puppeteererrors)
  * [puppeteer.executablePath()](#puppeteerexecutablepath)
  * [puppeteer.launch([options])](#puppeteerlaunchoptions)
  * [puppeteer.product](#puppeteerproduct)
- [class: BrowserFetcher](#class-browserfetcher)
  * [browserFetcher.canDownload(revision)](#browserfetchercandownloadrevision)
  * [browserFetcher.download(revision[, progressCallback])](#browserfetcherdownloadrevision-progresscallback)
  * [browserFetcher.localRevisions()](#browserfetcherlocalrevisions)
  * [browserFetcher.platform()](#browserfetcherplatform)
  * [browserFetcher.remove(revision)](#browserfetcherremoverevision)
  * [browserFetcher.revisionInfo(revision)](#browserfetcherrevisioninforevision)
- [class: Browser](#class-browser)
  * [event: 'disconnected'](#event-disconnected)
  * [event: 'targetchanged'](#event-targetchanged)
  * [event: 'targetcreated'](#event-targetcreated)
  * [event: 'targetdestroyed'](#event-targetdestroyed)
  * [browser.browserContexts()](#browserbrowsercontexts)
  * [browser.close()](#browserclose)
  * [browser.createIncognitoBrowserContext()](#browsercreateincognitobrowsercontext)
  * [browser.defaultBrowserContext()](#browserdefaultbrowsercontext)
  * [browser.disconnect()](#browserdisconnect)
  * [browser.isConnected()](#browserisconnected)
  * [browser.newPage()](#browsernewpage)
  * [browser.pages()](#browserpages)
  * [browser.process()](#browserprocess)
  * [browser.target()](#browsertarget)
  * [browser.targets()](#browsertargets)
  * [browser.userAgent()](#browseruseragent)
  * [browser.version()](#browserversion)
  * [browser.waitForTarget(predicate[, options])](#browserwaitfortargetpredicate-options)
  * [browser.wsEndpoint()](#browserwsendpoint)
- [class: BrowserContext](#class-browsercontext)
  * [event: 'targetchanged'](#event-targetchanged-1)
  * [event: 'targetcreated'](#event-targetcreated-1)
  * [event: 'targetdestroyed'](#event-targetdestroyed-1)
  * [browserContext.browser()](#browsercontextbrowser)
  * [browserContext.clearPermissionOverrides()](#browsercontextclearpermissionoverrides)
  * [browserContext.close()](#browsercontextclose)
  * [browserContext.isIncognito()](#browsercontextisincognito)
  * [browserContext.newPage()](#browsercontextnewpage)
  * [browserContext.overridePermissions(origin, permissions)](#browsercontextoverridepermissionsorigin-permissions)
  * [browserContext.pages()](#browsercontextpages)
  * [browserContext.targets()](#browsercontexttargets)
  * [browserContext.waitForTarget(predicate[, options])](#browsercontextwaitfortargetpredicate-options)
- [class: Page](#class-page)
  * [event: 'close'](#event-close)
  * [event: 'console'](#event-console)
  * [event: 'dialog'](#event-dialog)
  * [event: 'domcontentloaded'](#event-domcontentloaded)
  * [event: 'error'](#event-error)
  * [event: 'frameattached'](#event-frameattached)
  * [event: 'framedetached'](#event-framedetached)
  * [event: 'framenavigated'](#event-framenavigated)
  * [event: 'load'](#event-load)
  * [event: 'metrics'](#event-metrics)
  * [event: 'pageerror'](#event-pageerror)
  * [event: 'popup'](#event-popup)
  * [event: 'request'](#event-request)
  * [event: 'requestfailed'](#event-requestfailed)
  * [event: 'requestfinished'](#event-requestfinished)
  * [event: 'response'](#event-response)
  * [event: 'workercreated'](#event-workercreated)
  * [event: 'workerdestroyed'](#event-workerdestroyed)
  * [page.$(selector)](#pageselector)
  * [page.$$(selector)](#pageselector-1)
  * [page.$$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args)
  * [page.$eval(selector, pageFunction[, ...args])](#pageevalselector-pagefunction-args-1)
  * [page.$x(expression)](#pagexexpression)
  * [page.accessibility](#pageaccessibility)
  * [page.addScriptTag(options)](#pageaddscripttagoptions)
  * [page.addStyleTag(options)](#pageaddstyletagoptions)
  * [page.authenticate(credentials)](#pageauthenticatecredentials)
  * [page.bringToFront()](#pagebringtofront)
  * [page.browser()](#pagebrowser)
  * [page.browserContext()](#pagebrowsercontext)
  * [page.click(selector[, options])](#pageclickselector-options)
  * [page.close([options])](#pagecloseoptions)
  * [page.content()](#pagecontent)
  * [page.cookies([...urls])](#pagecookiesurls)
  * [page.coverage](#pagecoverage)
  * [page.deleteCookie(...cookies)](#pagedeletecookiecookies)
  * [page.emulate(options)](#pageemulateoptions)
  * [page.emulateMedia(type)](#pageemulatemediatype)
  * [page.emulateMediaFeatures(features)](#pageemulatemediafeaturesfeatures)
  * [page.emulateMediaType(type)](#pageemulatemediatypetype)
  * [page.emulateTimezone(timezoneId)](#pageemulatetimezonetimezoneid)
  * [page.evaluate(pageFunction[, ...args])](#pageevaluatepagefunction-args)
  * [page.evaluateHandle(pageFunction[, ...args])](#pageevaluatehandlepagefunction-args)
  * [page.evaluateOnNewDocument(pageFunction[, ...args])](#pageevaluateonnewdocumentpagefunction-args)
  * [page.exposeFunction(name, puppeteerFunction)](#pageexposefunctionname-puppeteerfunction)
  * [page.focus(selector)](#pagefocusselector)
  * [page.frames()](#pageframes)
  * [page.goBack([options])](#pagegobackoptions)
  * [page.goForward([options])](#pagegoforwardoptions)
  * [page.goto(url[, options])](#pagegotourl-options)
  * [page.hover(selector)](#pagehoverselector)
  * [page.isClosed()](#pageisclosed)
  * [page.keyboard](#pagekeyboard)
  * [page.mainFrame()](#pagemainframe)
  * [page.metrics()](#pagemetrics)
  * [page.mouse](#pagemouse)
  * [page.pdf([options])](#pagepdfoptions)
  * [page.queryObjects(prototypeHandle)](#pagequeryobjectsprototypehandle)
  * [page.reload([options])](#pagereloadoptions)
  * [page.screenshot([options])](#pagescreenshotoptions)
  * [page.select(selector, ...values)](#pageselectselector-values)
  * [page.setBypassCSP(enabled)](#pagesetbypasscspenabled)
  * [page.setCacheEnabled([enabled])](#pagesetcacheenabledenabled)
  * [page.setContent(html[, options])](#pagesetcontenthtml-options)
  * [page.setCookie(...cookies)](#pagesetcookiecookies)
  * [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout)
  * [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout)
  * [page.setExtraHTTPHeaders(headers)](#pagesetextrahttpheadersheaders)
  * [page.setGeolocation(options)](#pagesetgeolocationoptions)
  * [page.setJavaScriptEnabled(enabled)](#pagesetjavascriptenabledenabled)
  * [page.setOfflineMode(enabled)](#pagesetofflinemodeenabled)
  * [page.setRequestInterception(value)](#pagesetrequestinterceptionvalue)
  * [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
  * [page.setViewport(viewport)](#pagesetviewportviewport)
  * [page.tap(selector)](#pagetapselector)
  * [page.target()](#pagetarget)
  * [page.title()](#pagetitle)
  * [page.touchscreen](#pagetouchscreen)
  * [page.tracing](#pagetracing)
  * [page.type(selector, text[, options])](#pagetypeselector-text-options)
  * [page.url()](#pageurl)
  * [page.viewport()](#pageviewport)
  * [page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#pagewaitforselectororfunctionortimeout-options-args)
  * [page.waitForFileChooser([options])](#pagewaitforfilechooseroptions)
  * [page.waitForFunction(pageFunction[, options[, ...args]])](#pagewaitforfunctionpagefunction-options-args)
  * [page.waitForNavigation([options])](#pagewaitfornavigationoptions)
  * [page.waitForRequest(urlOrPredicate[, options])](#pagewaitforrequesturlorpredicate-options)
  * [page.waitForResponse(urlOrPredicate[, options])](#pagewaitforresponseurlorpredicate-options)
  * [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)
  * [page.waitForXPath(xpath[, options])](#pagewaitforxpathxpath-options)
  * [page.workers()](#pageworkers)
- [class: Worker](#class-worker)
  * [worker.evaluate(pageFunction[, ...args])](#workerevaluatepagefunction-args)
  * [worker.evaluateHandle(pageFunction[, ...args])](#workerevaluatehandlepagefunction-args)
  * [worker.executionContext()](#workerexecutioncontext)
  * [worker.url()](#workerurl)
- [class: Accessibility](#class-accessibility)
  * [accessibility.snapshot([options])](#accessibilitysnapshotoptions)
- [class: Keyboard](#class-keyboard)
  * [keyboard.down(key[, options])](#keyboarddownkey-options)
  * [keyboard.press(key[, options])](#keyboardpresskey-options)
  * [keyboard.sendCharacter(char)](#keyboardsendcharacterchar)
  * [keyboard.type(text[, options])](#keyboardtypetext-options)
  * [keyboard.up(key)](#keyboardupkey)
- [class: Mouse](#class-mouse)
  * [mouse.click(x, y[, options])](#mouseclickx-y-options)
  * [mouse.down([options])](#mousedownoptions)
  * [mouse.move(x, y[, options])](#mousemovex-y-options)
  * [mouse.up([options])](#mouseupoptions)
- [class: Touchscreen](#class-touchscreen)
  * [touchscreen.tap(x, y)](#touchscreentapx-y)
- [class: Tracing](#class-tracing)
  * [tracing.start([options])](#tracingstartoptions)
  * [tracing.stop()](#tracingstop)
- [class: FileChooser](#class-filechooser)
  * [fileChooser.accept(filePaths)](#filechooseracceptfilepaths)
  * [fileChooser.cancel()](#filechoosercancel)
  * [fileChooser.isMultiple()](#filechooserismultiple)
- [class: Dialog](#class-dialog)
  * [dialog.accept([promptText])](#dialogacceptprompttext)
  * [dialog.defaultValue()](#dialogdefaultvalue)
  * [dialog.dismiss()](#dialogdismiss)
  * [dialog.message()](#dialogmessage)
  * [dialog.type()](#dialogtype)
- [class: ConsoleMessage](#class-consolemessage)
  * [consoleMessage.args()](#consolemessageargs)
  * [consoleMessage.location()](#consolemessagelocation)
  * [consoleMessage.text()](#consolemessagetext)
  * [consoleMessage.type()](#consolemessagetype)
- [class: Frame](#class-frame)
  * [frame.$(selector)](#frameselector)
  * [frame.$$(selector)](#frameselector-1)
  * [frame.$$eval(selector, pageFunction[, ...args])](#frameevalselector-pagefunction-args)
  * [frame.$eval(selector, pageFunction[, ...args])](#frameevalselector-pagefunction-args-1)
  * [frame.$x(expression)](#framexexpression)
  * [frame.addScriptTag(options)](#frameaddscripttagoptions)
  * [frame.addStyleTag(options)](#frameaddstyletagoptions)
  * [frame.childFrames()](#framechildframes)
  * [frame.click(selector[, options])](#frameclickselector-options)
  * [frame.content()](#framecontent)
  * [frame.evaluate(pageFunction[, ...args])](#frameevaluatepagefunction-args)
  * [frame.evaluateHandle(pageFunction[, ...args])](#frameevaluatehandlepagefunction-args)
  * [frame.executionContext()](#frameexecutioncontext)
  * [frame.focus(selector)](#framefocusselector)
  * [frame.goto(url[, options])](#framegotourl-options)
  * [frame.hover(selector)](#framehoverselector)
  * [frame.isDetached()](#frameisdetached)
  * [frame.name()](#framename)
  * [frame.parentFrame()](#frameparentframe)
  * [frame.select(selector, ...values)](#frameselectselector-values)
  * [frame.setContent(html[, options])](#framesetcontenthtml-options)
  * [frame.tap(selector)](#frametapselector)
  * [frame.title()](#frametitle)
  * [frame.type(selector, text[, options])](#frametypeselector-text-options)
  * [frame.url()](#frameurl)
  * [frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args)
  * [frame.waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args)
  * [frame.waitForNavigation([options])](#framewaitfornavigationoptions)
  * [frame.waitForSelector(selector[, options])](#framewaitforselectorselector-options)
  * [frame.waitForXPath(xpath[, options])](#framewaitforxpathxpath-options)
- [class: ExecutionContext](#class-executioncontext)
  * [executionContext.evaluate(pageFunction[, ...args])](#executioncontextevaluatepagefunction-args)
  * [executionContext.evaluateHandle(pageFunction[, ...args])](#executioncontextevaluatehandlepagefunction-args)
  * [executionContext.frame()](#executioncontextframe)
  * [executionContext.queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle)
- [class: JSHandle](#class-jshandle)
  * [jsHandle.asElement()](#jshandleaselement)
  * [jsHandle.dispose()](#jshandledispose)
  * [jsHandle.evaluate(pageFunction[, ...args])](#jshandleevaluatepagefunction-args)
  * [jsHandle.evaluateHandle(pageFunction[, ...args])](#jshandleevaluatehandlepagefunction-args)
  * [jsHandle.executionContext()](#jshandleexecutioncontext)
  * [jsHandle.getProperties()](#jshandlegetproperties)
  * [jsHandle.getProperty(propertyName)](#jshandlegetpropertypropertyname)
  * [jsHandle.jsonValue()](#jshandlejsonvalue)
- [class: ElementHandle](#class-elementhandle)
  * [elementHandle.$(selector)](#elementhandleselector)
  * [elementHandle.$$(selector)](#elementhandleselector-1)
  * [elementHandle.$$eval(selector, pageFunction[, ...args])](#elementhandleevalselector-pagefunction-args)
  * [elementHandle.$eval(selector, pageFunction[, ...args])](#elementhandleevalselector-pagefunction-args-1)
  * [elementHandle.$x(expression)](#elementhandlexexpression)
  * [elementHandle.asElement()](#elementhandleaselement)
  * [elementHandle.boundingBox()](#elementhandleboundingbox)
  * [elementHandle.boxModel()](#elementhandleboxmodel)
  * [elementHandle.click([options])](#elementhandleclickoptions)
  * [elementHandle.contentFrame()](#elementhandlecontentframe)
  * [elementHandle.dispose()](#elementhandledispose)
  * [elementHandle.evaluate(pageFunction[, ...args])](#elementhandleevaluatepagefunction-args)
  * [elementHandle.evaluateHandle(pageFunction[, ...args])](#elementhandleevaluatehandlepagefunction-args)
  * [elementHandle.executionContext()](#elementhandleexecutioncontext)
  * [elementHandle.focus()](#elementhandlefocus)
  * [elementHandle.getProperties()](#elementhandlegetproperties)
  * [elementHandle.getProperty(propertyName)](#elementhandlegetpropertypropertyname)
  * [elementHandle.hover()](#elementhandlehover)
  * [elementHandle.isIntersectingViewport()](#elementhandleisintersectingviewport)
  * [elementHandle.jsonValue()](#elementhandlejsonvalue)
  * [elementHandle.press(key[, options])](#elementhandlepresskey-options)
  * [elementHandle.screenshot([options])](#elementhandlescreenshotoptions)
  * [elementHandle.select(...values)](#elementhandleselectvalues)
  * [elementHandle.tap()](#elementhandletap)
  * [elementHandle.toString()](#elementhandletostring)
  * [elementHandle.type(text[, options])](#elementhandletypetext-options)
  * [elementHandle.uploadFile(...filePaths)](#elementhandleuploadfilefilepaths)
- [class: Request](#class-request)
  * [request.abort([errorCode])](#requestaborterrorcode)
  * [request.continue([overrides])](#requestcontinueoverrides)
  * [request.failure()](#requestfailure)
  * [request.frame()](#requestframe)
  * [request.headers()](#requestheaders)
  * [request.isNavigationRequest()](#requestisnavigationrequest)
  * [request.method()](#requestmethod)
  * [request.postData()](#requestpostdata)
  * [request.redirectChain()](#requestredirectchain)
  * [request.resourceType()](#requestresourcetype)
  * [request.respond(response)](#requestrespondresponse)
  * [request.response()](#requestresponse)
  * [request.url()](#requesturl)
- [class: Response](#class-response)
  * [response.buffer()](#responsebuffer)
  * [response.frame()](#responseframe)
  * [response.fromCache()](#responsefromcache)
  * [response.fromServiceWorker()](#responsefromserviceworker)
  * [response.headers()](#responseheaders)
  * [response.json()](#responsejson)
  * [response.ok()](#responseok)
  * [response.remoteAddress()](#responseremoteaddress)
  * [response.request()](#responserequest)
  * [response.securityDetails()](#responsesecuritydetails)
  * [response.status()](#responsestatus)
  * [response.statusText()](#responsestatustext)
  * [response.text()](#responsetext)
  * [response.url()](#responseurl)
- [class: SecurityDetails](#class-securitydetails)
  * [securityDetails.issuer()](#securitydetailsissuer)
  * [securityDetails.protocol()](#securitydetailsprotocol)
  * [securityDetails.subjectName()](#securitydetailssubjectname)
  * [securityDetails.validFrom()](#securitydetailsvalidfrom)
  * [securityDetails.validTo()](#securitydetailsvalidto)
- [class: Target](#class-target)
  * [target.browser()](#targetbrowser)
  * [target.browserContext()](#targetbrowsercontext)
  * [target.createCDPSession()](#targetcreatecdpsession)
  * [target.opener()](#targetopener)
  * [target.page()](#targetpage)
  * [target.type()](#targettype)
  * [target.url()](#targeturl)
  * [target.worker()](#targetworker)
- [class: CDPSession](#class-cdpsession)
  * [cdpSession.detach()](#cdpsessiondetach)
  * [cdpSession.send(method[, params])](#cdpsessionsendmethod-params)
- [class: Coverage](#class-coverage)
  * [coverage.startCSSCoverage([options])](#coveragestartcsscoverageoptions)
  * [coverage.startJSCoverage([options])](#coveragestartjscoverageoptions)
  * [coverage.stopCSSCoverage()](#coveragestopcsscoverage)
  * [coverage.stopJSCoverage()](#coveragestopjscoverage)
- [class: TimeoutError](#class-timeouterror)
<!-- GEN:stop -->

### Overview

Puppeteer는 DevTools Protocol 위의 Chromium이나 Chrome을 제어하는 고수준 API를 제공하는 Node 라이브러리입니다.

Puppeteer API는 상속적이며 브라우저 구조를 반영합니다. 

> **참고** 아래의 다이어그램처럼, 희미한 개체는 현재 Puppeteer에 해당하지 않습니다.

![puppeteer overview](https://user-images.githubusercontent.com/746130/40333229-5df5480c-5d0c-11e8-83cb-c3e371de7374.png)

- [`Puppeteer`](#class-puppeteer) [DevTools 프로토콜](https://chromedevtools.github.io/devtools-protocol/)과 통신합니다.
- [`Browser`](#class-browser) 인스턴스는 여러개의 브라우저 컨텍스트를 가질 수 있습니다.
- [`BrowserContext`](#class-browsercontext) 인스턴스는 브라우징 세션을 정의하고 여러개의 페이지를 가질 수 있습니다.
- [`Page`](#class-page) 적어도 한개의 [iframe](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe)이나 [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/frame) 태그로 만들어진 프레임을 가질 수 있습니다.
- [`Frame`](#class-frame) 적어도 한 개의 Javascript가 실행된 곳에서 컨텍스트를 가진다. Frame은 추가적으로 [크롬 확장프로그램](https://developer.chrome.com/extensions)과 연결된 컨텍스트를 가질 수도 있습니다.
- [`Worker`](#class-worker) 한 개의 컨텍스트가 실행되며 [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)와 상호작용합니다.

(다이어그램 소스: [link](https://docs.google.com/drawings/d/1Q_AM6KYs9kbyLZF-Lpp5mtpAWth73Cq8IKCsWYgi8MM/edit?usp=sharing))

### puppeteer vs puppeteer-core

v1.7.0 이후 모든 릴리즈를 두가지 패키지로 배포합니다.
- [puppeteer](https://www.npmjs.com/package/puppeteer)
- [puppeteer-core](https://www.npmjs.com/package/puppeteer-core)


`puppeteer`는 브라우저 자동화를 위한 *제품*입니다. Chromium 버전이 다운로드 되고, 설치되었을 때, 그 다음 `puppeteer-core`로 작동합니다.  
엔드-유저 제품인 `puppeteer`는 `PUPPETEER_*` 환경변수의 행동을 바꿀 수 있도록 여러가지 편리성을 지원합니다.

`puppeteer-core`는 DevTools 프로토콜을 지원하는 어떤 것을 작동하도록 돕는  *라이브러리*입니다. `puppeteer-core`는 설치되었을 때, Chromium을 다운로드하지 않습니다.  라이브러리인 `puppeteer-core`는 프로그램 인터페이스과 모든 `PUPPETEER_*` 환경변수를 무시하는 것을 통해 완전히 작동합니다.

요약하자면, `puppeteer-core`과 `puppeteer`의 유일한 차이점은 아래와 같습니다.
- `puppeteer-core`은 설치되었을 때 자동으로 Chromium을 다운받지 않습니다.
- `puppeteer-core`는 모든 `PUPPETEER_*` 환경변수를 무시합니다.

대부분의 경우, 당신은 `puppeteer` 패키지를 사용하는 것이 좋을 것 입니다.

하지만, 당신이 `puppeteer-core`를 써야하는 경우는 아래와 같습니다.
- 다른 엔드-유저  DevTools 프로토콜의 가장 위에 있는 제품이나 라이브러리를 만드는 경우. 예를 들어, `puppeteer-core`를 사용해 PDF 생성기를 만들 수도 있으며 커스텀 `install.js` 스크립트를 작성할 수도 있습니다. 
- Puppeteer를 추가적인 Chromium 바이너리 다운로드가 필요없는 Chrome Extension과 브라우저에서 DevTools 프로토콜을 사용하기 위해 번들링할 수 있습니다.

`puppeteer-core`를 사용할 때, *아래* 라인을 변경하는 것을 명심하세요.

```js
const puppeteer = require('puppeteer-core');
```

그리고 나서 [`puppeteer.connect([options])`](#puppeteerconnectoptions) 나 [`puppeteer.launch([options])`](#puppeteerlaunchoptions)를  명시적인 `executablePath` 옵션으로 불러와야 합니다.

### Environment Variables

Puppeteer의 작동을 돕기 위해 어떤 [환경 변수](https://en.wikipedia.org/wiki/Environment_variable)를 찾습니다. Puppeteer가 설치 과정에서  변수들을 찾지 못한다면, 이 변수들의 소문자형을 [npm config](https://docs.npmjs.com/cli/config)에서 사용하게 될 것입니다.

- `HTTP_PROXY`, `HTTPS_PROXY`, `NO_PROXY` - Chromium을 다운로드하고 실행하는 HTTP 프록시 설정을 정의합니다.
- `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` - 설치 중에 번들링된 Chromium을 다운받지 않습니다.
- `PUPPETEER_DOWNLOAD_HOST` - Chromium을 다운받는 URL 접두어를 덮어씌웁니다. 주의: 프로토콜을 포함하며 경로 접두어를 포함할 수도 있습니다. 기본 값은 `https://storage.googleapis.com`입니다.
- `PUPPETEER_CHROMIUM_REVISION` - 사용하고 싶은 Puppeteer의 Chromium 버전을 명시합니다. 실행가능한 경로가 어떻게 추론되는지 [puppeteer.launch([options])](#puppeteerlaunchoptions)에서 확인하세요. **주의**: Puppeteer는 번들된 Chromium을 [작업대상으로 보장](https://github.com/puppeteer/puppeteer/#q-why-doesnt-puppeteer-vxxx-work-with-chromium-vyyy)하며, 책임은 본인에게 있습니다.
- `PUPPETEER_EXECUTABLE_PATH` - 실행가능한 경로를 `puppeteer.launch`에서 사용할 것을 명시합니다. 실행가능한 경로가 어떻게 추론되는지 [puppeteer.launch([options])](#puppeteerlaunchoptions)에서 확인하세요. **주의**: Puppeteer는 번들된 Chromium을 [작업대상으로 보장](https://github.com/puppeteer/puppeteer/#q-why-doesnt-puppeteer-vxxx-work-with-chromium-vyyy)하며, 책임은 본인에게 있습니다.
- `PUPPETEER_PRODUCT` - 어떤 브라우저에서 Puppeteer를 사용할지  명시합니다. `chrome`이나 `firefox` 둘 중에 하나여야 합니다. 이 환경변수를 대체하는 [puppeteer.launch([options])](#puppeteerlaunchoptions)에서 `제품`을 프로그래밍적으로 세팅합니다. 제품은 [`puppeteer.product`](#puppeteerproduct)에 노출됩니다.

> **주의** PUPPETEER_* 환경변수는 [`puppeteer-core`](https://www.npmjs.com/package/puppeteer-core) 패키지에 속하지 않습니다.


### Working with Chrome Extensions

Puppeteer는 Chrome Extensions를 테스트하는데 사용합니다.

> **주의** Chrome Extensions나 Chromium은 현재 논-헤드리스 모드에서만 동작합니다.

아래는 소스가 `./my-extension`에 위치한 확장프로그램의 [백그라운드 페이지](https://developer.chrome.com/extensions/background_pages)를 제어하기 위한 코드입니다.
```js
const puppeteer = require('puppeteer');

(async () => {
  const pathToExtension = require('path').join(__dirname, 'my-extension');
  const browser = await puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`
    ]
  });
  const targets = await browser.targets();
  const backgroundPageTarget = targets.find(target => target.type() === 'background_page');
  const backgroundPage = await backgroundPageTarget.page();
  // Test the background page as you would any other page.
  await browser.close();
})();
```

> **주의** 테스트 확장 팝업이나 컨텐츠 스크립트는 아직 불가능합니다. 

### class: Puppeteer

Puppteer 모듈은 Chrome 인스턴스를 실행하기 위한 메서드를 제공합니다.
아래는 Puppeteer를 자동으로 실행하기 위한 모범사례입니다.

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com');
  // other actions...
  await browser.close();
})();
```

#### puppeteer.connect(options)
- `options` <[Object]>
  - `browserWSEndpoint` <?[string]> 연결할 [브라우저 웹소켓 엔드포인트](#browserwsendpoint)입니다.
  - `browserURL` <?[string]> 연결할 브라우저입니다. 포맷은 `http://${host}:${port}`입니다. Puppeteer로 [메타데이터 엔드포인트](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target)에서 `browserWSEndpoint`에서 교체해서 사용하세요. 
  - `ignoreHTTPSErrors` <[boolean]> 브라우징 도중 발생하는 HTTPS 오류를 무시할지 결정합니다. 기본 값은 `false`입니다.
  - `defaultViewport` <?[Object]> 각 페이지마다 일관된 뷰포트를 설정합니다. 기본 값은 800x600 뷰포트입니다.
    - `width` <[number]> 페이지 너비는 픽셀 단위입니다.
    - `height` <[number]> 페이지 높이는 픽셀 단위입니다.
    - `deviceScaleFactor` <[number]> 기기 스케일 팩터를 명시합니다. DPR(Device Pixel Ratio)로도 생각할 수 있습니다. 기본 값은 `1`입니다.
    - `isMobile` <[boolean]> `meta viewport`태그를 사용할지 결정합니다. 기본 값은 `false`입니다. 
    - `hasTouch`<[boolean]> 뷰포트가 터치 이벤트를 지원한다면 명시합니다. 기본 값은 `false`입니다.
    - `isLandscape` <[boolean]> 가로모드 뷰포트라면 명시합니다. 기본 값은 `false`입니다.
  - `slowMo` <[number]> Puppeteer의 작동을 밀리세컨드(ms)만큼 느리게 합니다. 어떤 일이 일어나는지 당신이 볼 수 있어 유용합니다.
  - `transport` <[ConnectionTransport]> **실험기능** Puppeteer를 사용하기 위해 커스텀 transport를 명시합니다.  
- returns: <[Promise]<[Browser]>>

이 메서드는 Puppeteer를 띄워져있는 Chromium 인스턴스에 접착합니다.

#### puppeteer.createBrowserFetcher([options])
- `options` <[Object]>
  - `host` <[string]> 다운로드 호스트가 사용됩니다. 기본 값은 `https://storage.googleapis.com`입니다..
  - `path` <[string]> 다운로드할 폴더 경로입니다. 기본 값은 `<root>`가 퍼펫티어 패키지의 루트 폴더인, `<root>/.local-chromium`입니다.
  - `platform` <[string]> 사용할 수 있는 값은 `mac`, `win32`, `win64`, `linux`입니다. 기본 값은 현재 플랫폼입니다.
- returns: <[BrowserFetcher]>

#### puppeteer.defaultArgs([options])
- `options` <[Object]> 브라우저에 설정할 수 있는 옵션들을 설정합니다. 아래의 필드와 같이 설정할 수 있습니다.
  - `headless` <[boolean]> [헤드리스 모드](https://developers.google.com/web/updates/2017/04/headless-chrome)에서 실행할지 결정합니다. 기본 값은 `devtools` 옵션이 `true`가 아닌 이상 `true`입니다.
  - `args` <[Array]<[string]>> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/).
  - `userDataDir` <[string]> Path to a [User Data Directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md).
  - `devtools` <[boolean]> DevTools 패널을 각각 탭마다 자동으로 열지 결정합니다. 이 옵션이 `true`라면, `headless` 옵션은 `false`로 세팅될 것입니다.
- returns: <[Array]<[string]>>

기본 플래그는 Chromium이 실행될때 같이 작동합니다.

#### puppeteer.devices
- returns: <[Object]>

[`page.emulate(options)`](#pageemulateoptions)에 사용된 디바이스 리스트를 반환합니다. 실제 디바이스 리스트는 [lib/DeviceDescriptors.js](https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js)에서 찾을 수 있습니다.

```js
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com');
  // other actions...
  await browser.close();
})();
```

> **참고** 예전 방법 (Puppeteer 버전 <= v1.14.0) 디바이스를 `require('puppeteer/DeviceDescriptors')`에서 찾을 수 있습니다.

#### puppeteer.errors
- returns: <[Object]>
  - `TimeoutError` <[function]> [TimeoutError]의 클래스입니다.

요청을 수행할 수 없다면 Puppeteer 메서드는 오류를 던질 수도 있습니다. 예를 들어, 주어진 시간동안 셀렉터가 어떤 노드와도 일치하지 않는다면 [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)는 실패할 수 있습니다.

틀림없이 Puppeteer 오류의 타입은 특정한 오류 클래스에 사용합니다. 이 클래스들은 [`puppeteer.errors`](#puppeteererrors)를 통해 사용 가능합니다.

아래는 타임아웃 오류 처리 예시입니다.
```js
try {
  await page.waitForSelector('.foo');
} catch (e) {
  if (e instanceof puppeteer.errors.TimeoutError) {
    // Do something if this is a timeout.
  }
}
```

> **주의** 예전 방법 (Puppeteer 버전 <= v1.14.0) 오류를 `require('puppeteer/Errors')`로 얻을 수 있습니다.

#### puppeteer.executablePath()
- returns: <[string]> Puppeteer가 번들링된 Chromium을 찾길 예상하는 경로입니다. [`PUPPETEER_SKIP_CHROMIUM_DOWNLOAD`](#environment-variables)으로 다운로드를 생략했다면,  Chromium은 그곳에 없을 수도 있습니다.

> **주의** `puppeteer.executablePath()`은 `PUPPETEER_EXECUTABLE_PATH`와 `PUPPETEER_CHROMIUM_REVISION` 환경 변수에 영향을 받습니다. 자세한 내용은 [Environment Variables](#environment-variables)에서 확인하세요.

#### puppeteer.launch([options])
- `options` <[Object]>  설정가능한 옵션 셋을 브라우저에 세팅합니다. 아래와 같은 필드를 입력 할 수 있습니다.
  - `product` <[string]> 현재로서는, `chrome`이나 `firefox`둘 중에 하나로 어떤 브라우저를 실행할지 결정합니다. `PUPPETEER_PRODUCT`를 참고하세요.
  - `ignoreHTTPSErrors` <[boolean]> 네비게이션하는 동안 HTTPS 오류를 무시할지 결정합니다. 기본 값은 `false`입니다.
  - `headless` <[boolean]> [헤드리스 모드](https://developers.google.com/web/updates/2017/04/headless-chrome)에서 실행할지 결정합니다. 기본 값은 `devtools` 옵션이 `true`가 아닌 이상 `true`입니다.
  - `executablePath` <[string]>  번들된 Chromium 대신 실행가능한 브라우저 경로를 입력합니다 만약 `executablePath` 이 상대경로라면, [현재 작동중인 디렉토리](https://nodejs.org/api/process.html#process_process_cwd)와 관련성이 있습니다.. **주의**: Puppeteer는 번들된 Chromium을 [작업대상으로 보장](https://github.com/puppeteer/puppeteer/#q-why-doesnt-puppeteer-vxxx-work-with-chromium-vyyy)하며, 책임은 본인에게 있습니다.
  - `slowMo` <[number]> Puppeteer의 작동을 밀리세컨드(ms)만큼 느리게 합니다. 어떤 일이 일어나는지 당신이 볼 수 있어 유용합니다.
  - `defaultViewport` <?[Object]>  각 페이지마다 일관된 뷰포트를 설정합니다. 기본 값은 800x600 뷰포트입니다. `null`로 입력하면 기본 뷰포트 옵션이 꺼집니다.
    - `width` <[number]> 페이지 너비는 픽셀 단위입니다.
    - `height` <[number]> 페이지 높이는 픽셀 단위입니다.  
    - `deviceScaleFactor` <[number]>  기기 스케일 팩터를 명시합니다. DPR(Device Pixel Ratio)로도 생각할 수 있습니다. 기본 값은 `1`입니다.
    - `isMobile` <[boolean]> `meta viewport` 태그를 사용할지 결정합니다. 기본 값은 `false`입니다.
    - `hasTouch`<[boolean]> 뷰포트가 터치 이벤트를 지원한다면 명시합니다. 기본 값은 `false`입니다.
    - `isLandscape` <[boolean]> 가로모드 뷰포트라면 명시합니다. 기본 값은 `false`입니다.
  - `args` <[Array]<[string]>> 추가 인자를 브라우저 인스턴스로 보냅니다. Chromium 플래그 리스트는 [여기](http://peter.sh/experiments/chromium-command-line-switches/)에서 찾을 수 있으며, 여기는 [Firefox 플래그](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options) 리스트입니다.
  - `ignoreDefaultArgs` <[boolean]|[Array]<[string]>> 만약 `true`라면, [`puppeteer.defaultArgs()`](#puppeteerdefaultargsoptions)는 사용하지 마세요. 만약 배열이 주어졌다면, 주어진 기본 인자를 걸러냅니다. 위험한 옵션이니 사용에 주의를 기울여주세요. 기본 값은 `false`입니다.
  - `handleSIGINT` <[boolean]> 브라우저 프로세스를 Ctrl-C로 닫습니다. 기본 값은 `true`입니다.
  - `handleSIGTERM` <[boolean]> 브라우저 프로세스를 SIGTERM로 닫니다. 기본 값은 `true`입니다.
  - `handleSIGHUP` <[boolean]> 브라우저 프로세스를 SIGHUP로 닫니다. 기본 값은 `true`입니다.
  - `timeout` <[number]> 밀리초동안의 최대시간동안 브라우저 인스턴스를 시작하길 기다립니다. 기본 값은 `30000` (30초)입니다. `0`으로 입력하면 타임아웃을 없앨 수 있습니다.
  - `dumpio` <[boolean]> 브라우저 프로세스가 stdout과 stderr를 `process.stdout`과 `process.stderr`로 보낼지 결정합니다. 기본 값은 `false`입니다.
  - `userDataDir` <[string]> [User Data Directory](https://chromium.googlesource.com/chromium/src/+/master/docs/user_data_dir.md)의 경로를 입력합니다..
  - `env` <[Object]> 브라우저에 보여질 환경변수를 명시합니다. 기본 값은 `process.env`입니다.
  - `devtools` <[boolean]> DevTools 패널을 각각 탭마다 자동으로 열지 결정합니다. 이 옵션이 `true`라면, `headless` 옵션은 `false`로 세팅될 것입니다.
  - `pipe` <[boolean]> WebSocket 대신 브라우저로 접속해 파이프를 지나갑니다. 기본 값은 `false`입니다.
  - `extraPrefsFirefox` <[Object]> Firefox에서 통과할 수 있는 추가적인 [내용](https://developer.mozilla.org/en-US/docs/Mozilla/Preferences/Preference_reference)입니다. (`PUPPETEER_PRODUCT`를 참고하세요.)
- returns: <[Promise]<[Browser]>> 브라우저 인스턴스로 resolve한 Promise 객체입니다.


`ignoreDefaultArgs`을 사용해 `--mute-audio`를 기본 인자에서 필터링할 수 있습니다. :
```js
const browser = await puppeteer.launch({
  ignoreDefaultArgs: ['--mute-audio']
});
```

>
> **주의** Puppeteer는 Chrome 브라우저를 제어하는데에도 사용할 수 있습니다. 하지만 번들링된 Chromium 버전에서 가장 효과적입니다. 어떤 다른 버전에서도 잘 작동한다는 보장은 없습니다. 아주 조심해서 `executablePath` 옵션을 사용하세요.
>
> Google Chrome (Chromium보다는)을 더 선호한다면, [Chrome Canary](https://www.google.com/chrome/browser/canary.html)나 [Dev Channel](https://www.chromium.org/getting-involved/dev-channel)을 추천합니다.
>
> [puppeteer.launch([options])](#puppeteerlaunchoptions)에서 Chromium의 어떤 언급이나 Chrome에서도 적용됩니다.
>
> Chromium과 Chrome의 차이를 설명한 [`이 글`](https://www.howtogeek.com/202825/what%E2%80%99s-the-difference-between-chromium-and-chrome/)을 확인하세요. [`이 글`](https://chromium.googlesource.com/chromium/src/+/lkgr/docs/chromium_browser_vs_google_chrome.md)은 어떤 차이가 있는지 Linux 사용자들을 위한 차이점을 설명합니다.

#### puppeteer.product
- returns: <[string]> 자동화 중인("크롬"이나 "파이어폭스") 브라우저의 이름을 반환합니다.

product는 `PUPPETEER_PRODUCT` 환경변수나 [puppeteer.launch([options])](#puppeteerlaunchoptions)에서 `product`옵션에 의해 세팅되었으며, 기본 값은 `chrome`입니다. Firefox는 실험적으로 제공합니다.

### class: BrowserFetcher

BrowserFetcher는 Chromium의 다른 버전을 다운받고 관리할 수 있습니다.

BrowserFetcher는 Chromium의 정확한 버전을 명시한 revision 문자열을 수정합니다. 예를 들어, `"533271"`이라고 할 수 있습니다. revision 문자열은 [omahaproxy.appspot.com](http://omahaproxy.appspot.com/)에서 얻을 수 있습니다.

특정한 버전의 Chromium을 다운로드하고 Puppeteer를 실행하는 BrowserFetcher의 사용 예시는 아래와 같습니다.

```js
const browserFetcher = puppeteer.createBrowserFetcher();
const revisionInfo = await browserFetcher.download('533271');
const browser = await puppeteer.launch({executablePath: revisionInfo.executablePath})
```

> **주의** BrowserFetcher는 동시에 같은 다운로드 디렉토리를 공유하는 다른 BrowserFetcher의 인스턴스와 작동하기 위해 디자인된 것이 아닙니다. 

#### browserFetcher.canDownload(revision)
- `revision` <[string]> revision을 사용가능한지 확인합니다.
- returns: <[Promise]<[boolean]>> 만약 호스트로부터 revision을 다운로드할 수 있으면 `true`를 반환합니다.

메서드는 revision이 사용가능하다면 체크하기 위해 HEAD 요청을 초기화합니다. 

#### browserFetcher.download(revision[, progressCallback])
- `revision` <[string]> 다운로드할 revision입니다.
- `progressCallback` <[function]([number], [number])> 두 개의 인자를 불러 함수입니다.
  - `downloadedBytes` <[number]> 몇 바이트를 다운로드 했는지 확인합니다.
  - `totalBytes` <[number]> 총 다운로드할 것이 얼마나 큰지 확인합니다.
- returns: <[Promise]<[Object]>> revision이 다운로드 되고 추출되었을 때 revision 정보를 resolve합니다. 
  - `revision` <[string]> 정보가 생성된 revision을 확인할 수 있습니다.
  - `folderPath` <[string]> 추출된 revision 폴더의 경로입니다.
  - `executablePath` <[string]> 실행가능한 revision의 경로입니다.
  - `url` <[string]> revision을 다운로드할 수 있는 URL입니다.
  - `local` <[boolean]> 디스크에서 로컬로 revision을 사용가능한지 불가능한지 알려줍니다.

메서드는 revision을 호스트로부터 다운로드 받기 위해 GET 요청을 초기화합니다.  

#### browserFetcher.localRevisions()
- returns: <[Promise]<[Array]<[string]>>> 디스크에서 로컬로 사용가능한 모든 revision의 리스트입니다.

#### browserFetcher.platform()
- returns: <[string]> `mac`, `linux`, `win32`나 `win64` 중에 하나를 입력합니다.

#### browserFetcher.remove(revision)
- `revision` <[string]> revision을 제거하기 위해 사용합니다. 메서드는 revision이 다운로드 되지 않았다면 던질 것입니다.
- returns: <[Promise]> revision이 제거되었을 때 resolve합니다.

#### browserFetcher.revisionInfo(revision)
- `revision` <[string]> revision을 정보로서 얻습니다.
- returns: <[Object]>
  - `revision` <[string]> 정보가 생성된 revision을 확인할 수 있습니다.
  - `folderPath` <[string]> 추출된 revision 폴더의 경로입니다.
  - `executablePath` <[string]> 실행가능한 revision의 경로입니다.
  - `url` <[string]> revision을 다운로드할 수 있는 URL입니다.
  - `local` <[boolean]> 디스크에서 로컬로 revision을 사용가능한지 불가능한지 알려줍니다.

### class: Browser

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

Browser는 Puppeteer가 Chromium 인스턴스에 연결할나 [`puppeteer.launch`](#puppeteerlaunchoptions)나 [`puppeteer.connect`](#puppeteerconnectoptions)를 통해 생성됩니다.

[Browser]를 사용해 [Page]를 생성하는 예시입니다.
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await browser.close();
})();
```

[Browser]에서 연결해제하고 재연결하는 예시입니다.
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  // Store the endpoint to be able to reconnect to Chromium
  const browserWSEndpoint = browser.wsEndpoint();
  // Disconnect puppeteer from Chromium
  browser.disconnect();

  // Use the endpoint to reestablish a connection
  const browser2 = await puppeteer.connect({browserWSEndpoint});
  // Close Chromium
  await browser2.close();
})();
```

#### event: 'disconnected'
Puppeteer가 Chromium 인스턴스로부터 연결 해제될 때 발생합니다. 아래의 이유 중 하나 때문에 발생할 수도 있습니다.
- Chromium이 닫히거나 충돌하는 경우
- [`browser.disconnect`](#browserdisconnect) 메서드가 호출되었을 경우

#### event: 'targetchanged'
- <[Target]>

타겟의 url이 바뀌었을 때 발생합니다.

> **주의** 시크릿 브라우저 컨텍스트 타겟이 바뀐 것을 포함합니다.

#### event: 'targetcreated'
- <[Target]>

타겟이 생성되었을 때 발생합니다. 예를 들어 새로운 페이지가 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)나 [`browser.newPage`](#browsernewpage)에 의해 열렸을 경우가 있습니다.

> **주의** 시크릿 브라우저 컨텍스트 타겟이 바뀐 것을 포함합니다.

#### event: 'targetdestroyed'
- <[Target]>

타겟이 소실되었을 때 발생합니다. 예를 들어 페이지가 닫힌 경우가 있습니다.

> **주의** 시크릿 브라우저 컨텍스트 타겟이 바뀐 것을 포함합니다.

#### browser.browserContexts()
- returns: <[Array]<[BrowserContext]>>

모든 열린 브라우저 컨텍스트의 배열을 반환합니다. 새롭게 생성된 브라우저에서는 [BrowserContext] 중 하나의 인스턴스만 반환할 것입니다.

#### browser.close()
- returns: <[Promise]>

Chromium과 그 모든 페이지들(어떤 것들이 열렸다면)을 닫습니다. [Browser] 객체는 폐기된 것으로 간주해 더이상 사용할 수 없습니다.

#### browser.createIncognitoBrowserContext()
- returns: <[Promise]<[BrowserContext]>>

새로운 시크릿 브라우저 컨텍스트를 생성합니다. 쿠키, 캐시를 다른 브라우저 컨텍스트와 공유하지 않을 것입니다.

```js
(async () => {
  const browser = await puppeteer.launch();
  // Create a new incognito browser context.
  const context = await browser.createIncognitoBrowserContext();
  // Create a new page in a pristine context.
  const page = await context.newPage();
  // Do stuff
  await page.goto('https://example.com');
})();
```

#### browser.defaultBrowserContext()
- returns: <[BrowserContext]>

기본 브라우저 컨텍스트를 반환합니다. 기본 브라우저 컨텍스트는 닫을 수 있습니다.

#### browser.disconnect()

Puppeteer를 브라우저에서 연결해제하지만, Chromium 프로세스는 계속 동작합니다. `disconnect` 호출 이후에 [Browser] 객체는 폐기된 것으로 간주해 더 이상 사용할 수 없습니다.

#### browser.isConnected()

- returns: <[boolean]>

브라우저가 연결된 것을 표시합니다.

#### browser.newPage()
- returns: <[Promise]<[Page]>>

새로운 [Page] 객체로 resolve하는 프로미스입니다. [Page]는 기본 브라우저 컨텍스트에서 생성됩니다.

#### browser.pages()
- returns: <[Promise]<[Array]<[Page]>>> 모든 열린 페이지의 배열을 resolve하는 프로미스입니다. `"background_page"`같은 보이지 않는 페이지는 리스팅되지 않을 것입니다. [target.page()](#targetpage)을 사용해 그것들을 찾을 수 있습니다.

Browser 내부에 있는 모든 페이지의 배열입니다. 여러 브라우저 컨텍스트의 경우, 메서드가 모든 브라우저 컨텍스트에 있는 모든 페이지를 배열로 반환할 것입니다.

#### browser.process()
- returns: <?[ChildProcess]> 자식 브라우저 프로세스입니다. 브라우저 인스턴스가 [`puppeteer.connect`](#puppeteerconnectoptions) 메서드로 생성되었다면, `null`을 반환합니다.

#### browser.target()
- returns: <[Target]>

브라우저와 연관된 타겟입니다.

#### browser.targets()
- returns: <[Array]<[Target]>>

Browser 내부의 활동하는 모든 타겟의 배열입니다. 여러 브라우저 컨텍스트의 경우, 메서드는 모든 브라우저 컨텍스트에 있는 모든 타겟을 배열로 반환할 것입니다.

#### browser.userAgent()
- returns: <[Promise]<[string]>> 브라우저의 원래 유저 에이전트로 resolve하는 프로미스입니다.

> **주의** 페이지는 브라우저 유저 에이전트를 [page.setUserAgent](#pagesetuseragentuseragent)로 오버라이드할 수 있습니다.

#### browser.version()
- returns: <[Promise]<[string]>> 헤드리스 Chromium에 있어 `HeadlessChrome/61.0.3153.0`과 비슷합니다. 논-헤드리스에서는 `Chrome/61.0.3153.0`과 비슷합니다.

> **주의** `browser.version()`의 포맷은 나중에 나올 Chromium 릴리즈에서 바뀔 수도 있습니다.

#### browser.waitForTarget(predicate[, options])
- `predicate` <[function]\([Target]\):[boolean]> 모든 타겟에 적용되는 함수입니다.
- `options` <[Object]>
  - `timeout` <[number]> 최대 대기시간을 밀리초로 표기합니다. `0`은 타임아웃을 비활성화합니다. 기본 값은 30초입니다.
- returns: <[Promise]<[Target]>> `predicate`과 일치하는 첫 타겟을  찾아 resolve하는 프로미스입니다.

모든 브라우저 컨텍스트에 있는 타겟에 대한 검색입니다.

`window.open`를 통해 열린 페이지에 대한 타겟을 찾는 예시입니다.
```js
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browser.waitForTarget(target => target.url() === 'https://www.example.com/');
```

#### browser.wsEndpoint()
- returns: <[string]> Browser 웹소켓 url입니다.

[puppeteer.connect](#puppeteerconnectoptions)로 인자를 사용할 수 있는 Browser 웹소켓 엔드포인트입니다. 포맷은 `ws://${host}:${port}/devtools/browser/<id>`입니다.

`http://${host}:${port}/json/version`로부터 `webSocketDebuggerUrl`을 찾을 수 있습니다. [개발자도구 프로토콜](https://chromedevtools.github.io/devtools-protocol)과 [브라우저 엔드포인트](https://chromedevtools.github.io/devtools-protocol/#how-do-i-access-the-browser-target)에 대해 더 알아보세요.

### class: BrowserContext

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

BrowserContexts는 여러개의 독립적인 브라우저 세션을 제공할 방법을 제공합니다. 브라우저가 실행중일 때, 한 개의 BrowserContext를 기본적으로 사용합니다. `browser.newPage()` 메서드는 기본 브라우저 컨텍스트에서 페이지를 생성합니다.

페이지가 다른 페이지를 여는 경우, 예를 들어 `window.open`을 호출했을 떄, 팝업은 부모 페이지의 브라우저 컨텍스트에 속합니다.

Puppeteer는 `browser.createIncognitoBrowserContext()` 메서드로 "시크릿" 브라우저 컨텍스트의 생성을 허용합니다.
"시크릿" 브라우저 컨텍스트는 어느 브라우징 데이터를 디스크에 작성하지 않습니다.

```js
// Create a new incognito browser context
const context = await browser.createIncognitoBrowserContext();
// Create a new page inside context.
const page = await context.newPage();
// ... do stuff with page ...
await page.goto('https://example.com');
// Dispose context once it's no longer needed.
await context.close();
```

#### event: 'targetchanged'
- <[Target]>

타겟의 url이 브라우저 컨텍스트 내부에서 바뀔 때 발생합니다.

#### event: 'targetcreated'
- <[Target]>

브라우저 컨텍스트 내부에 새로운 타겟이 생성되었을 때 발생합니다. 예를 들어, 새로운 페이지가 [`window.open`](https://developer.mozilla.org/en-US/docs/Web/API/Window/open)나 [`browserContext.newPage`](#browsercontextnewpage)에 의해 열리는 경우가 있습니다.

#### event: 'targetdestroyed'
- <[Target]>

브라우저 컨텍스트 내부에 타겟이 소실되었을 때 발생합니다. 예를 들어 페이지가 닫혔을 경우가 있습니다.

#### browserContext.browser()
- returns: <[Browser]>

브라우저는 이 브라우저 컨텍스트에 속합니다.

#### browserContext.clearPermissionOverrides()
- returns: <[Promise]>

브라우저 컨텍스트에 대해 모든 권한 오버라이드를 지웁니다.

```js
const context = browser.defaultBrowserContext();
context.overridePermissions('https://example.com', ['clipboard-read']);
// do stuff ..
context.clearPermissionOverrides();
```

#### browserContext.close()
- returns: <[Promise]>

브라우저 컨텍스트를 닫습니다. 브라우저 컨텍스트에 속한 모든 타겟이 닫히게 될 것입니다.

> **주의** 시크릿 브라우저 컨텍스트만 닫을 수 있습니다.

#### browserContext.isIncognito()
- returns: <[boolean]>

BrowserContext가 시크릿인지 아닌지 반환합니다. 기본 브라우저 컨텍스트는 시크릿이 아닌 브라우저 컨텍스트입니다.

> **주의** 기본 브라우저 컨텍스트는 닫을 수 없습니다.

#### browserContext.newPage()
- returns: <[Promise]<[Page]>>

새로운 페이지를 브라우저 컨텍스트에 생성합니다.

#### browserContext.overridePermissions(origin, permissions)
- `origin` <[string]> 권한 허용을 위한 [origin]입니다. 예를 들어 "https://example.com"를 입력할 수 있습니다.
- `permissions` <[Array]<[string]>> 허용하기 위한 권한 배열입니다. 여기에 리스트되지 않은 모든 권한은 여기서 자동으로 거부합니다. 권한들은 아래의 값들 중 하나를 사용할 수 있습니다.
  - `'geolocation'`
  - `'midi'`
  - `'midi-sysex'` (system-exclusive midi)
  - `'notifications'`
  - `'push'`
  - `'camera'`
  - `'microphone'`
  - `'background-sync'`
  - `'ambient-light-sensor'`
  - `'accelerometer'`
  - `'gyroscope'`
  - `'magnetometer'`
  - `'accessibility-events'`
  - `'clipboard-read'`
  - `'clipboard-write'`
  - `'payment-handler'`
- returns: <[Promise]>


```js
const context = browser.defaultBrowserContext();
await context.overridePermissions('https://html5demos.com', ['geolocation']);
```


#### browserContext.pages()
- returns: <[Promise]<[Array]<[Page]>>> 모든 열린 페이지의 배열을 resolve하는 프로미스입니다. `"background_page"`같은 보이지 않는 페이지는 리스팅되지 않을 것입니다. [target.page()](#targetpage)을 사용해 그것들을 찾을 수 있습니다.

브라우저 컨텍스트에 있는 모든 페이지의 배열입니다.

#### browserContext.targets()
- returns: <[Array]<[Target]>>

브라우저 컨텍스트 내부의 활동하는 모든 타겟의 배열입니다. 

#### browserContext.waitForTarget(predicate[, options])
- `predicate` <[function]\([Target]\):[boolean]> 모든 타겟에 적용되는 함수입니다.
- `options` <[Object]>
  - `timeout` <[number]> 최대 대기시간을 밀리초로 표기합니다. `0`은 타임아웃을 비활성화합니다. 기본 값은 30초입니다.
- returns: <[Promise]<[Target]>> `predicate`과 일치하는 첫 타겟을 찾아 resolve하는 프로미스입니다.

모든 브라우저 컨텍스트에 있는 타겟에 대한 검색입니다.

`window.open`를 통해 열린 페이지에 대한 타겟을 찾는 예시입니다.
```js
await page.evaluate(() => window.open('https://www.example.com/'));
const newWindowTarget = await browserContext.waitForTarget(target => target.url() === 'https://www.example.com/');
```

### class: Page

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

Page는 싱글 탭이나 Chromium에 [extension background page](https://developer.chrome.com/extensions/background_pages)과 상호작용하기 위한 메서드들을 제공합니다. 하나의 [Browser] 인스턴스는 여러개의 [Page] 인스턴스를 가질 수도 있다.

이 예제는 페이지를 생성하고, URL로 항해하고, 스크린샷을 저장합니다.
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'screenshot.png'});
  await browser.close();
})();
```

Page 클래스는 `on`, `once`나 `removeListener`같은 Node의 네이티브 [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter) 메서드를 사용해 처리할 수 있는 여러 이벤트들을 발생시킵니다. 

이 예제는 싱글 페이지 `load` 이벤트에 대한 메시지를 기록합니다.
```js
page.once('load', () => console.log('Page loaded!'));
```

`removeListenr` 메서드를 사용해 이벤트로부터 구독해지하기 위한 메서드입니다.

```js
function logRequest(interceptedRequest) {
  console.log('A request was made:', interceptedRequest.url());
}
page.on('request', logRequest);
// Sometime later...
page.removeListener('request', logRequest);
```

#### event: 'close'

페이지가 닫힐때 발생합니다.

#### event: 'console'
- <[ConsoleMessage]>

페이지 내의 Javascript가 console API 메서드 중 하나를 호출하면 발생합니다. 예를 들어 `console.log`나 `console.dir`이 있습니다. 또한 페이지가 오류나 경고를 던진다면 발생합니다.

`console.log`로 전달된 인자들은 이벤트 핸들러에서 인자로 나타납니다.

`console` 이벤트를 다루는 예제입니다.
```js
page.on('console', msg => {
  for (let i = 0; i < msg.args().length; ++i)
    console.log(`${i}: ${msg.args()[i]}`);
});
page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));
```

#### event: 'dialog'
- <[Dialog]>


`alert`,`prompt`,`confirm` 또는`beforeunload`와 같은 Javascript 대화상자가 나타날 때 발생합니다. Puppeteer는  [Dialog]의 [accept] 또는 [dismiss] 메서드를 통해 대화상자에 응답할 수 있습니다.

#### event: 'domcontentloaded'

Javascript [`DOMContentLoaded`](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded) 이벤트가 전달될 때 발생합니다. 

#### event: 'error'
- <[Error]>

페이지가 출동할 때 발생합니다.

> **주의** `error` 이벤트는 Node에서 특별한 의미를 가지고 있습니다. 자세한 내용은 [error events](https://nodejs.org/api/events.html#events_error_events)에서 확인하세요.

#### event: 'frameattached'
- <[Frame]>

프레임에 붙으면 발생합니다.

#### event: 'framedetached'
- <[Frame]>

프레임이 떨어지면 발생합니다.

#### event: 'framenavigated'
- <[Frame]>

프레임이 새로운 url로 항해하면 발생합니다.

#### event: 'load'

Javascript [`load`](https://developer.mozilla.org/en-US/docs/Web/Events/load) 이벤트가 전달되면 발생합니다.

#### event: 'metrics'
- <[Object]>
  - `title` <[string]> title이 `console.timeStamp`로 상속됩니다.
  - `metrics` <[Object]> 객체가 키/밸류쌍인 metrics를 가집니다. metrics의 값은 <[number]> 타입입니다.

`console.timeStamp`로 호출하는 코드를 자바스크립트가 만들때 발생합니다. metrics의 목록에 대해서는 `page.metrics`를 확인하세요.

#### event: 'pageerror'
- <[Error]> 예외 메시지입니다.

잡히지 않은 예외가 페이지 내부에서 일어날때 발생합니다.

#### event: 'popup'
- <[Page]> Page가 "팝업"창과 일치합니다.

Emitted when the page opens a new tab or window.

```js
const [popup] = await Promise.all([
  new Promise(resolve => page.once('popup', resolve)),
  page.click('a[target=_blank]'),
]);
```

```js
const [popup] = await Promise.all([
  new Promise(resolve => page.once('popup', resolve)),
  page.evaluate(() => window.open('https://example.com')),
]);
```

#### event: 'request'
- <[Request]>

Emitted when a page issues a request. The [request] object is read-only.
In order to intercept and mutate requests, see `page.setRequestInterception`.

#### event: 'requestfailed'
- <[Request]>

Emitted when a request fails, for example by timing out.

> **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with [`'requestfinished'`](#event-requestfinished) event and not with [`'requestfailed'`](#event-requestfailed).

#### event: 'requestfinished'
- <[Request]>

Emitted when a request finishes successfully.

#### event: 'response'
- <[Response]>

Emitted when a [response] is received.

#### event: 'workercreated'
- <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is spawned by the page.

#### event: 'workerdestroyed'
- <[Worker]>

Emitted when a dedicated [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) is terminated.

#### page.$(selector)
- `selector` <[string]> A [selector] to query page for
- returns: <[Promise]<?[ElementHandle]>>

The method runs `document.querySelector` within the page. If no element matches the selector, the return value resolves to `null`.

Shortcut for [page.mainFrame().$(selector)](#frameselector).

#### page.$$(selector)
- `selector` <[string]> A [selector] to query page for
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method runs `document.querySelectorAll` within the page. If no elements match the selector, the return value resolves to `[]`.

Shortcut for [page.mainFrame().$$(selector)](#frameselector-1).

#### page.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]\([Array]<[Element]>\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `Array.from(document.querySelectorAll(selector))` within the page and passes it as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `page.$$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const divsCounts = await page.$$eval('div', divs => divs.length);
```

#### page.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]\([Element]\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelector` within the page and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `page.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const searchValue = await page.$eval('#search', el => el.value);
const preloadHref = await page.$eval('link[rel=preload]', el => el.href);
const html = await page.$eval('.main-container', e => e.outerHTML);
```

Shortcut for [page.mainFrame().$eval(selector, pageFunction)](#frameevalselector-pagefunction-args).

#### page.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method evaluates the XPath expression.

Shortcut for [page.mainFrame().$x(expression)](#framexexpression)

#### page.accessibility
- returns: <[Accessibility]>

#### page.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added.
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw JavaScript content to be injected into frame.
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

Shortcut for [page.mainFrame().addScriptTag(options)](#frameaddscripttagoptions).

#### page.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag.
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw CSS content to be injected into frame.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

Shortcut for [page.mainFrame().addStyleTag(options)](#frameaddstyletagoptions).

#### page.authenticate(credentials)
- `credentials` <?[Object]>
  - `username` <[string]>
  - `password` <[string]>
- returns: <[Promise]>

Provide credentials for [HTTP authentication](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication).

To disable authentication, pass `null`.

#### page.bringToFront()

- returns: <[Promise]>

Brings page to front (activates tab).

#### page.browser()

- returns: <[Browser]>

Get the browser the page belongs to.

#### page.browserContext()

- returns: <[BrowserContext]>

Get the browser context that the page belongs to.

#### page.click(selector[, options])
- `selector` <[string]> A [selector] to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to click in the center of the element.
If there's no element matching `selector`, the method throws an error.

Bear in mind that if `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  page.click(selector, clickOptions),
]);
```

Shortcut for [page.mainFrame().click(selector[, options])](#frameclickselector-options).

#### page.close([options])
- `options` <[Object]>
  - `runBeforeUnload` <[boolean]> Defaults to `false`. Whether to run the
    [before unload](https://developer.mozilla.org/en-US/docs/Web/Events/beforeunload)
    page handlers.
- returns: <[Promise]>

By default, `page.close()` **does not** run beforeunload handlers.

> **NOTE** if `runBeforeUnload` is passed as true, a `beforeunload` dialog might be summoned
> and should be handled manually via page's ['dialog'](#event-dialog) event.

#### page.content()
- returns: <[Promise]<[string]>>

Gets the full HTML contents of the page, including the doctype.

#### page.cookies([...urls])
- `...urls` <...[string]>
- returns: <[Promise]<[Array]<[Object]>>>
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `size` <[number]>
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `session` <[boolean]>
  - `sameSite` <"Strict"|"Lax"|"Extended"|"None">

If no URLs are specified, this method returns cookies for the current page URL.
If URLs are specified, only cookies for those URLs are returned.

#### page.coverage

- returns: <[Coverage]>

#### page.deleteCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **required**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
- returns: <[Promise]>

#### page.emulate(options)
- `options` <[Object]>
  - `viewport` <[Object]>
    - `width` <[number]> page width in pixels.
    - `height` <[number]> page height in pixels.
    - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
    - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
    - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
    - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.
  - `userAgent` <[string]>
- returns: <[Promise]>

Emulates given device metrics and user agent. This method is a shortcut for calling two methods:
- [page.setUserAgent(userAgent)](#pagesetuseragentuseragent)
- [page.setViewport(viewport)](#pagesetviewportviewport)

To aid emulation, puppeteer provides a list of device descriptors which can be obtained via the [`puppeteer.devices`](#puppeteerdevices).

`page.emulate` will resize the page. A lot of websites don't expect phones to change size, so you should emulate before navigating to the page.

```js
const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.emulate(iPhone);
  await page.goto('https://www.google.com');
  // other actions...
  await browser.close();
})();
```

List of all available devices is available in the source code: [DeviceDescriptors.js](https://github.com/puppeteer/puppeteer/blob/master/lib/DeviceDescriptors.js).

#### page.emulateMedia(type)
- `type` <?[string]> Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`. Passing `null` disables CSS media emulation.
- returns: <[Promise]>

**Note:** This method is deprecated, and only kept around as an alias for backwards compatibility. Use [`page.emulateMediaType(type)`](#pageemulatemediatypetype) instead.

#### page.emulateMediaFeatures(features)
- `features` <?[Array]<[Object]>> Given an array of media feature objects, emulates CSS media features on the page. Each media feature object must have the following properties:
  - `name` <[string]> The CSS media feature name. Supported names are `'prefers-colors-scheme'` and `'prefers-reduced-motion'`.
  - `value` <[string]> The value for the given CSS media feature.
- returns: <[Promise]>

```js
await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'dark' }]);
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches));
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches));
// → false
await page.evaluate(() => matchMedia('(prefers-color-scheme: no-preference)').matches));
// → false

await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: no-preference)').matches));
// → false

await page.emulateMediaFeatures([
  { name: 'prefers-color-scheme', value: 'dark' },
  { name: 'prefers-reduced-motion', value: 'reduce' },
]);
await page.evaluate(() => matchMedia('(prefers-color-scheme: dark)').matches));
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: light)').matches));
// → false
await page.evaluate(() => matchMedia('(prefers-color-scheme: no-preference)').matches));
// → false
await page.evaluate(() => matchMedia('(prefers-reduced-motion: reduce)').matches));
// → true
await page.evaluate(() => matchMedia('(prefers-color-scheme: no-preference)').matches));
// → false
```

#### page.emulateMediaType(type)
- `type` <?[string]> Changes the CSS media type of the page. The only allowed values are `'screen'`, `'print'` and `null`. Passing `null` disables CSS media emulation.
- returns: <[Promise]>

```js
await page.evaluate(() => matchMedia('screen').matches));
// → true
await page.evaluate(() => matchMedia('print').matches));
// → true

await page.emulateMediaType('print');
await page.evaluate(() => matchMedia('screen').matches));
// → false
await page.evaluate(() => matchMedia('print').matches));
// → true

await page.emulateMediaType(null);
await page.evaluate(() => matchMedia('screen').matches));
// → true
await page.evaluate(() => matchMedia('print').matches));
// → true
```

#### page.emulateTimezone(timezoneId)
- `timezoneId` <?[string]> Changes the timezone of the page. See [ICU’s `metaZones.txt`](https://cs.chromium.org/chromium/src/third_party/icu/source/data/misc/metaZones.txt?rcl=faee8bc70570192d82d2978a71e2a615788597d1) for a list of supported timezone IDs. Passing `null` disables timezone emulation.
- returns: <[Promise]>

#### page.evaluate(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `page.evaluate` returns a [Promise], then `page.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `page.evaluate` returns a non-[Serializable] value, then `page.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

Passing arguments to `pageFunction`:
```js
const result = await page.evaluate(x => {
  return Promise.resolve(8 * x);
}, 7);
console.log(result); // prints "56"
```

A string can also be passed in instead of a function:
```js
console.log(await page.evaluate('1 + 2')); // prints "3"
const x = 10;
console.log(await page.evaluate(`1 + ${x}`)); // prints "11"
```

[ElementHandle] instances can be passed as arguments to the `page.evaluate`:
```js
const bodyHandle = await page.$('body');
const html = await page.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

Shortcut for [page.mainFrame().evaluate(pageFunction, ...args)](#frameevaluatepagefunction-args).

#### page.evaluateHandle(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `page.evaluate` and `page.evaluateHandle` is that `page.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `page.evaluateHandle` returns a [Promise], then `page.evaluateHandle` would wait for the promise to resolve and return its value.

A string can also be passed in instead of a function:
```js
const aHandle = await page.evaluateHandle('document'); // Handle for the 'document'
```

[JSHandle] instances can be passed as arguments to the `page.evaluateHandle`:
```js
const aHandle = await page.evaluateHandle(() => document.body);
const resultHandle = await page.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```

Shortcut for [page.mainFrame().executionContext().evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args).

#### page.evaluateOnNewDocument(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `...args` <...[Serializable]> Arguments to pass to `pageFunction`
- returns: <[Promise]>

Adds a function which would be invoked in one of the following scenarios:
- whenever the page is navigated
- whenever the child frame is attached or navigated. In this case, the function is invoked in the context of the newly attached frame

The function is invoked after the document was created but before any of its scripts were run. This is useful to amend  the JavaScript environment, e.g. to seed `Math.random`.

An example of overriding the navigator.languages property before the page loads:

```js
// preload.js

// overwrite the `languages` property to use a custom getter
Object.defineProperty(navigator, "languages", {
  get: function() {
    return ["en-US", "en", "bn"];
  }
});

// In your puppeteer script, assuming the preload.js file is in same folder of our script
const preloadFile = fs.readFileSync('./preload.js', 'utf8');
await page.evaluateOnNewDocument(preloadFile);
```

#### page.exposeFunction(name, puppeteerFunction)
- `name` <[string]> Name of the function on the window object
- `puppeteerFunction` <[function]> Callback function which will be called in Puppeteer's context.
- returns: <[Promise]>

The method adds a function called `name` on the page's `window` object.
When called, the function executes `puppeteerFunction` in node.js and returns a [Promise] which resolves to the return value of `puppeteerFunction`.

If the `puppeteerFunction` returns a [Promise], it will be awaited.

> **NOTE** Functions installed via `page.exposeFunction` survive navigations.

An example of adding an `md5` function into the page:
```js
const puppeteer = require('puppeteer');
const crypto = require('crypto');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('md5', text =>
    crypto.createHash('md5').update(text).digest('hex')
  );
  await page.evaluate(async () => {
    // use window.md5 to compute hashes
    const myString = 'PUPPETEER';
    const myHash = await window.md5(myString);
    console.log(`md5 of ${myString} is ${myHash}`);
  });
  await browser.close();
})();
```

An example of adding a `window.readfile` function into the page:

```js
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('console', msg => console.log(msg.text()));
  await page.exposeFunction('readfile', async filePath => {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, text) => {
        if (err)
          reject(err);
        else
          resolve(text);
      });
    });
  });
  await page.evaluate(async () => {
    // use window.readfile to read contents of a file
    const content = await window.readfile('/etc/hosts');
    console.log(content);
  });
  await browser.close();
})();
```

#### page.focus(selector)
- `selector` <[string]> A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method throws an error.

Shortcut for [page.mainFrame().focus(selector)](#framefocusselector).

#### page.frames()
- returns: <[Array]<[Frame]>> An array of all frames attached to the page.

#### page.goBack([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go back, resolves to `null`.

Navigate to the previous page in history.

#### page.goForward([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. If
can not go forward, resolves to `null`.

Navigate to the next page in history.

#### page.goto(url[, options])
- `url` <[string]> URL to navigate page to. The url should include scheme, e.g. `https://`.
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](#pagesetextrahttpheadersheaders).
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

`page.goto` will throw an error if:
- there's an SSL error (e.g. in case of self-signed certificates).
- target URL is invalid.
- the `timeout` is exceeded during navigation.
- the remote server does not respond or is unreachable.
- the main resource failed to load.

`page.goto` will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status()](#responsestatus).

> **NOTE** `page.goto` either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.

> **NOTE** Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).

Shortcut for [page.mainFrame().goto(url, options)](#framegotourl-options)

#### page.hover(selector)
- `selector` <[string]> A [selector] to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method throws an error.

Shortcut for [page.mainFrame().hover(selector)](#framehoverselector).

#### page.isClosed()

- returns: <[boolean]>

Indicates that the page has been closed.

#### page.keyboard

- returns: <[Keyboard]>

#### page.mainFrame()
- returns: <[Frame]> The page's main frame.

Page is guaranteed to have a main frame which persists during navigations.

#### page.metrics()
- returns: <[Promise]<[Object]>> Object containing metrics as key/value pairs.
  - `Timestamp` <[number]> The timestamp when the metrics sample was taken.
  - `Documents` <[number]> Number of documents in the page.
  - `Frames` <[number]> Number of frames in the page.
  - `JSEventListeners` <[number]> Number of events in the page.
  - `Nodes` <[number]> Number of DOM nodes in the page.
  - `LayoutCount` <[number]> Total number of full or partial page layout.
  - `RecalcStyleCount` <[number]> Total number of page style recalculations.
  - `LayoutDuration` <[number]> Combined durations of all page layouts.
  - `RecalcStyleDuration` <[number]> Combined duration of all page style recalculations.
  - `ScriptDuration` <[number]> Combined duration of JavaScript execution.
  - `TaskDuration` <[number]> Combined duration of all tasks performed by the browser.
  - `JSHeapUsedSize` <[number]> Used JavaScript heap size.
  - `JSHeapTotalSize` <[number]> Total JavaScript heap size.

> **NOTE** All timestamps are in monotonic time: monotonically increasing time in seconds since an arbitrary point in the past.

#### page.mouse

- returns: <[Mouse]>

#### page.pdf([options])
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the PDF to. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the PDF won't be saved to the disk.
  - `scale` <[number]> Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.
  - `displayHeaderFooter` <[boolean]> Display header and footer. Defaults to `false`.
  - `headerTemplate` <[string]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
    - `date` formatted print date
    - `title` document title
    - `url` document location
    - `pageNumber` current page number
    - `totalPages` total pages in the document
  - `footerTemplate` <[string]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
  - `printBackground` <[boolean]> Print background graphics. Defaults to `false`.
  - `landscape` <[boolean]> Paper orientation. Defaults to `false`.
  - `pageRanges` <[string]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  - `format` <[string]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
  - `width` <[string]|[number]> Paper width, accepts values labeled with units.
  - `height` <[string]|[number]> Paper height, accepts values labeled with units.
  - `margin` <[Object]> Paper margins, defaults to none.
    - `top` <[string]|[number]> Top margin, accepts values labeled with units.
    - `right` <[string]|[number]> Right margin, accepts values labeled with units.
    - `bottom` <[string]|[number]> Bottom margin, accepts values labeled with units.
    - `left` <[string]|[number]> Left margin, accepts values labeled with units.
  - `preferCSSPageSize` <[boolean]> Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size.
- returns: <[Promise]<[Buffer]>> Promise which resolves with PDF buffer.

> **NOTE** Generating a pdf is currently only supported in Chrome headless.

`page.pdf()` generates a pdf of the page with `print` css media. To generate a pdf with `screen` media, call [page.emulateMedia('screen')](#pageemulatemediamediatype) before calling `page.pdf()`:

> **NOTE** By default, `page.pdf()` generates a pdf with modified colors for printing. Use the [`-webkit-print-color-adjust`](https://developer.mozilla.org/en-US/docs/Web/CSS/-webkit-print-color-adjust) property to force rendering of exact colors.

```js
// Generates a PDF with 'screen' media type.
await page.emulateMedia('screen');
await page.pdf({path: 'page.pdf'});
```

The `width`, `height`, and `margin` options accept values labeled with units. Unlabeled values are treated as pixels.

A few examples:
- `page.pdf({width: 100})` - prints with width set to 100 pixels
- `page.pdf({width: '100px'})` - prints with width set to 100 pixels
- `page.pdf({width: '10cm'})` - prints with width set to 10 centimeters.

All possible units are:
- `px` - pixel
- `in` - inch
- `cm` - centimeter
- `mm` - millimeter

The `format` options are:
- `Letter`: 8.5in x 11in
- `Legal`: 8.5in x 14in
- `Tabloid`: 11in x 17in
- `Ledger`: 17in x 11in
- `A0`: 33.1in x 46.8in
- `A1`: 23.4in x 33.1in
- `A2`: 16.54in x 23.4in
- `A3`: 11.7in x 16.54in
- `A4`: 8.27in x 11.7in
- `A5`: 5.83in x 8.27in
- `A6`: 4.13in x 5.83in

> **NOTE** `headerTemplate` and `footerTemplate` markup have the following limitations:
> 1. Script tags inside templates are not evaluated.
> 2. Page styles are not visible inside templates.

#### page.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype.
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a handle to an array of objects with this prototype.

The method iterates the JavaScript heap and finds all the objects with the given prototype.

```js
// Create a Map object
await page.evaluate(() => window.map = new Map());
// Get a handle to the Map object prototype
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// Query all map instances into an array
const mapInstances = await page.queryObjects(mapPrototype);
// Count amount of map objects in heap
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

Shortcut for [page.mainFrame().executionContext().queryObjects(prototypeHandle)](#executioncontextqueryobjectsprototypehandle).

#### page.reload([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

#### page.screenshot([options])
- `options` <[Object]> Options object which might have the following properties:
  - `path` <[string]> The file path to save the image to. The screenshot type will be inferred from file extension. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd). If no path is provided, the image won't be saved to the disk.
  - `type` <[string]> Specify screenshot type, can be either `jpeg` or `png`. Defaults to 'png'.
  - `quality` <[number]> The quality of the image, between 0-100. Not applicable to `png` images.
  - `fullPage` <[boolean]> When true, takes a screenshot of the full scrollable page. Defaults to `false`.
  - `clip` <[Object]> An object which specifies clipping region of the page. Should have the following fields:
    - `x` <[number]> x-coordinate of top-left corner of clip area
    - `y` <[number]> y-coordinate of top-left corner of clip area
    - `width` <[number]> width of clipping area
    - `height` <[number]> height of clipping area
  - `omitBackground` <[boolean]> Hides default white background and allows capturing screenshots with transparency. Defaults to `false`.
  - `encoding` <[string]> The encoding of the image, can be either `base64` or `binary`. Defaults to `binary`.
- returns: <[Promise]<[string]|[Buffer]>> Promise which resolves to buffer or a base64 string (depending on the value of `encoding`) with captured screenshot.

> **NOTE** Screenshots take at least 1/6 second on OS X. See https://crbug.com/741689 for discussion.

#### page.select(selector, ...values)
- `selector` <[string]> A [selector] to query page for
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.
- returns: <[Promise]<[Array]<[string]>>> An array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

```js
page.select('select#colors', 'blue'); // single selection
page.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

Shortcut for [page.mainFrame().select()](#frameselectselector-values)

#### page.setBypassCSP(enabled)
- `enabled` <[boolean]> sets bypassing of page's Content-Security-Policy.
- returns: <[Promise]>

Toggles bypassing page's Content-Security-Policy.

> **NOTE** CSP bypassing happens at the moment of CSP initialization rather then evaluation. Usually this means
that `page.setBypassCSP` should be called before navigating to the domain.

#### page.setCacheEnabled([enabled])
- `enabled` <[boolean]> sets the `enabled` state of the cache.
- returns: <[Promise]>

Toggles ignoring cache for each request based on the enabled state. By default, caching is enabled.

#### page.setContent(html[, options])
- `html` <[string]> HTML markup to assign to the page.
- `options` <[Object]> Parameters which might have the following properties:
  - `timeout` <[number]> Maximum time in milliseconds for resources to load, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider setting markup succeeded, defaults to `load`. Given an array of event strings, setting content is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider setting content to be finished when the `load` event is fired.
    - `domcontentloaded` - consider setting content to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider setting content to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider setting content to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]>

#### page.setCookie(...cookies)
- `...cookies` <...[Object]>
  - `name` <[string]> **required**
  - `value` <[string]> **required**
  - `url` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[number]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` <"Strict"|"Lax">
- returns: <[Promise]>

```js
await page.setCookie(cookieObject1, cookieObject2);
```

#### page.setDefaultNavigationTimeout(timeout)
- `timeout` <[number]> Maximum navigation time in milliseconds

This setting will change the default maximum navigation time for the following methods and related shortcuts:
- [page.goBack([options])](#pagegobackoptions)
- [page.goForward([options])](#pagegoforwardoptions)
- [page.goto(url[, options])](#pagegotourl-options)
- [page.reload([options])](#pagereloadoptions)
- [page.setContent(html[, options])](#pagesetcontenthtml-options)
- [page.waitForNavigation([options])](#pagewaitfornavigationoptions)

> **NOTE** [`page.setDefaultNavigationTimeout`](#pagesetdefaultnavigationtimeouttimeout) takes priority over [`page.setDefaultTimeout`](#pagesetdefaulttimeouttimeout)


#### page.setDefaultTimeout(timeout)
- `timeout` <[number]> Maximum time in milliseconds

This setting will change the default maximum time for the following methods and related shortcuts:
- [page.goBack([options])](#pagegobackoptions)
- [page.goForward([options])](#pagegoforwardoptions)
- [page.goto(url[, options])](#pagegotourl-options)
- [page.reload([options])](#pagereloadoptions)
- [page.setContent(html[, options])](#pagesetcontenthtml-options)
- [page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#pagewaitforselectororfunctionortimeout-options-args)
- [page.waitForFileChooser([options])](#pagewaitforfilechooseroptions)
- [page.waitForFunction(pageFunction[, options[, ...args]])](#pagewaitforfunctionpagefunction-options-args)
- [page.waitForNavigation([options])](#pagewaitfornavigationoptions)
- [page.waitForRequest(urlOrPredicate[, options])](#pagewaitforrequesturlorpredicate-options)
- [page.waitForResponse(urlOrPredicate[, options])](#pagewaitforresponseurlorpredicate-options)
- [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)
- [page.waitForXPath(xpath[, options])](#pagewaitforxpathxpath-options)

> **NOTE** [`page.setDefaultNavigationTimeout`](#pagesetdefaultnavigationtimeouttimeout) takes priority over [`page.setDefaultTimeout`](#pagesetdefaulttimeouttimeout)

#### page.setExtraHTTPHeaders(headers)
- `headers` <[Object]> An object containing additional HTTP headers to be sent with every request. All header values must be strings.
- returns: <[Promise]>

The extra HTTP headers will be sent with every request the page initiates.

> **NOTE** page.setExtraHTTPHeaders does not guarantee the order of headers in the outgoing requests.

#### page.setGeolocation(options)
- `options` <[Object]>
  - `latitude` <[number]> Latitude between -90 and 90.
  - `longitude` <[number]> Longitude between -180 and 180.
  - `accuracy` <[number]> Optional non-negative accuracy value.
- returns: <[Promise]>

Sets the page's geolocation.

```js
await page.setGeolocation({latitude: 59.95, longitude: 30.31667});
```

> **NOTE** Consider using [browserContext.overridePermissions](#browsercontextoverridepermissionsorigin-permissions) to grant permissions for the page to read its geolocation.

#### page.setJavaScriptEnabled(enabled)
- `enabled` <[boolean]> Whether or not to enable JavaScript on the page.
- returns: <[Promise]>

> **NOTE** changing this value won't affect scripts that have already been run. It will take full effect on the next [navigation](#pagegotourl-options).

#### page.setOfflineMode(enabled)
- `enabled` <[boolean]> When `true`, enables offline mode for the page.
- returns: <[Promise]>

#### page.setRequestInterception(value)
- `value` <[boolean]> Whether to enable request interception.
- returns: <[Promise]>

Activating request interception enables `request.abort`, `request.continue` and
`request.respond` methods.  This provides the capability to modify network requests that are made by a page.

Once request interception is enabled, every request will stall unless it's continued, responded or aborted.
An example of a naïve request interceptor that aborts all image requests:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on('request', interceptedRequest => {
    if (interceptedRequest.url().endsWith('.png') || interceptedRequest.url().endsWith('.jpg'))
      interceptedRequest.abort();
    else
      interceptedRequest.continue();
  });
  await page.goto('https://example.com');
  await browser.close();
})();
```

> **NOTE** Enabling request interception disables page caching.

#### page.setUserAgent(userAgent)
- `userAgent` <[string]> Specific user agent to use in this page
- returns: <[Promise]> Promise which resolves when the user agent is set.

#### page.setViewport(viewport)
- `viewport` <[Object]>
  - `width` <[number]> page width in pixels. **required**
  - `height` <[number]> page height in pixels. **required**
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be thought of as dpr). Defaults to `1`.
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
  - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.
- returns: <[Promise]>

> **NOTE** in certain cases, setting viewport will reload the page in order to set the `isMobile` or `hasTouch` properties.

In the case of multiple pages in a single browser, each page can have its own viewport size.

`page.setViewport` will resize the page. A lot of websites don't expect phones to change size, so you should set the viewport before navigating to the page.

```js
const page = await browser.newPage();
await page.setViewport({
  width: 640,
  height: 480,
  deviceScaleFactor: 1,
});
await page.goto('https://example.com');
```

#### page.tap(selector)
- `selector` <[string]> A [selector] to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped.
- returns: <[Promise]>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.touchscreen](#pagetouchscreen) to tap in the center of the element.
If there's no element matching `selector`, the method throws an error.

Shortcut for [page.mainFrame().tap(selector)](#frametapselector).

#### page.target()
- returns: <[Target]> a target this page was created from.

#### page.title()
- returns: <[Promise]<[string]>> The page's title.

Shortcut for [page.mainFrame().title()](#frametitle).

#### page.touchscreen
- returns: <[Touchscreen]>

#### page.tracing
- returns: <[Tracing]>

#### page.type(selector, text[, options])
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

```js
await page.type('#mytextarea', 'Hello'); // Types instantly
await page.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

Shortcut for [page.mainFrame().type(selector, text[, options])](#frametypeselector-text-options).

#### page.url()
- returns: <[string]>

This is a shortcut for [page.mainFrame().url()](#frameurl)

#### page.viewport()
- returns: <?[Object]>
  - `width` <[number]> page width in pixels.
  - `height` <[number]> page height in pixels.
  - `deviceScaleFactor` <[number]> Specify device scale factor (can be though of as dpr). Defaults to `1`.
  - `isMobile` <[boolean]> Whether the `meta viewport` tag is taken into account. Defaults to `false`.
  - `hasTouch`<[boolean]> Specifies if viewport supports touch events. Defaults to `false`
  - `isLandscape` <[boolean]> Specifies if viewport is in landscape mode. Defaults to `false`.

#### page.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> A [selector], predicate or timeout to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden. Defaults to `false`.
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

This method behaves differently with respect to the type of the first parameter:
- if `selectorOrFunctionOrTimeout` is a `string`, then the first argument is treated as a [selector] or [xpath], depending on whether or not it starts with '//', and the method is a shortcut for
  [page.waitForSelector](#pagewaitforselectorselector-options) or [page.waitForXPath](#pagewaitforxpathxpath-options)
- if `selectorOrFunctionOrTimeout` is a `function`, then the first argument is treated as a predicate to wait for and the method is a shortcut for [page.waitForFunction()](#pagewaitforfunctionpagefunction-options-args).
- if `selectorOrFunctionOrTimeout` is a `number`, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout
- otherwise, an exception is thrown

```js
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

To pass arguments from node.js to the predicate of `page.waitFor` function:

```js
const selector = '.foo';
await page.waitFor(selector => !!document.querySelector(selector), {}, selector);
```

Shortcut for [page.mainFrame().waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])](#framewaitforselectororfunctionortimeout-options-args).

#### page.waitForFileChooser([options])
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<[FileChooser]>> A promise that resolves after a page requests a file picker.

> **NOTE** In non-headless Chromium, this method results in the native file picker dialog **not showing up** for the user.

This method is typically coupled with an action that triggers file choosing.
The following example clicks a button that issues a file chooser, and then
responds with `/tmp/myfile.pdf` as if a user has selected this file.

```js
const [fileChooser] = await Promise.all([
  page.waitForFileChooser(),
  page.click('#upload-file-button'), // some button that triggers file selection
]);
await fileChooser.accept(['/tmp/myfile.pdf']);
```

> **NOTE** This must be called *before* the file chooser is launched. It will not return a currently active file chooser.


#### page.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `options` <[Object]> Optional waiting parameters
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const watchDog = page.waitForFunction('window.innerWidth < 100');
  await page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
})();
```

To pass arguments from node.js to the predicate of `page.waitForFunction` function:

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

Shortcut for [page.mainFrame().waitForFunction(pageFunction[, options[, ...args]])](#framewaitforfunctionpagefunction-options-args).

#### page.waitForNavigation([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code
which will indirectly cause the page to navigate. Consider this example:

```js
const [response] = await Promise.all([
  page.waitForNavigation(), // The promise resolves after navigation has finished
  page.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.

Shortcut for [page.mainFrame().waitForNavigation(options)](#framewaitfornavigationoptions).

#### page.waitForRequest(urlOrPredicate[, options])
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<[Request]>> Promise which resolves to the matched request.

```js
const firstRequest = await page.waitForRequest('http://example.com/resource');
const finalRequest = await page.waitForRequest(request => request.url() === 'http://example.com' && request.method() === 'GET');
return firstRequest.url();
```

#### page.waitForResponse(urlOrPredicate[, options])
- `urlOrPredicate` <[string]|[Function]> A URL or predicate to wait for.
- `options` <[Object]> Optional waiting parameters
  - `timeout` <[number]> Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<[Response]>> Promise which resolves to the matched response.

```js
const firstResponse = await page.waitForResponse('https://example.com/resource');
const finalResponse = await page.waitForResponse(response => response.url() === 'https://example.com' && response.status() === 200);
return finalResponse.ok();
```

#### page.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM. Resolves to `null` if waiting for `hidden: true` and selector is not found in DOM.

Wait for the `selector` to appear in page. If at the moment of calling
the method the `selector` already exists, the method will return
immediately. If the selector doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
```
Shortcut for [page.mainFrame().waitForSelector(selector[, options])](#framewaitforselectorselector-options).

#### page.waitForXPath(xpath[, options])
- `xpath` <[string]> A [xpath] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves when element specified by xpath string is added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is not found in DOM.

Wait for the `xpath` to appear in page. If at the moment of calling
the method the `xpath` already exists, the method will return
immediately. If the xpath doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let currentURL;
  page
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
```
Shortcut for [page.mainFrame().waitForXPath(xpath[, options])](#framewaitforxpathxpath-options).

#### page.workers()
- returns: <[Array]<[Worker]>>
This method returns all of the dedicated [WebWorkers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) associated with the page.

> **NOTE** This does not contain ServiceWorkers

### class: Worker

The Worker class represents a [WebWorker](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).
The events `workercreated` and `workerdestroyed` are emitted on the page object to signal the worker lifecycle.

```js
page.on('workercreated', worker => console.log('Worker created: ' + worker.url()));
page.on('workerdestroyed', worker => console.log('Worker destroyed: ' + worker.url()));

console.log('Current workers:');
for (const worker of page.workers())
  console.log('  ' + worker.url());
```

#### worker.evaluate(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in the worker context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `worker.evaluate` returns a [Promise], then `worker.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `worker.evaluate` returns a non-[Serializable] value, then `worker.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

Shortcut for [(await worker.executionContext()).evaluate(pageFunction, ...args)](#executioncontextevaluatepagefunction-args).

#### worker.evaluateHandle(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `worker.evaluate` and `worker.evaluateHandle` is that `worker.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `worker.evaluateHandle` returns a [Promise], then `worker.evaluateHandle` would wait for the promise to resolve and return its value.

Shortcut for [(await worker.executionContext()).evaluateHandle(pageFunction, ...args)](#executioncontextevaluatehandlepagefunction-args).

#### worker.executionContext()
- returns: <[Promise]<[ExecutionContext]>>

#### worker.url()
- returns: <[string]>

### class: Accessibility

The Accessibility class provides methods for inspecting Chromium's accessibility tree. The accessibility tree is used by assistive technology such as [screen readers](https://en.wikipedia.org/wiki/Screen_reader) or [switches](https://en.wikipedia.org/wiki/Switch_access).

Accessibility is a very platform-specific thing. On different platforms, there are different screen readers that might have wildly different output.

Blink - Chrome's rendering engine - has a concept of "accessibility tree", which is then translated into different platform-specific APIs. Accessibility namespace gives users
access to the Blink Accessibility Tree.

Most of the accessibility tree gets filtered out when converting from Blink AX Tree to Platform-specific AX-Tree or by assistive technologies themselves. By default, Puppeteer tries to approximate this filtering, exposing only the "interesting" nodes of the tree.



#### accessibility.snapshot([options])
- `options` <[Object]>
  - `interestingOnly` <[boolean]> Prune uninteresting nodes from the tree. Defaults to `true`.
  - `root` <[ElementHandle]> The root DOM element for the snapshot. Defaults to the whole page.
- returns: <[Promise]<[Object]>> An [AXNode] object with the following properties:
  - `role` <[string]> The [role](https://www.w3.org/TR/wai-aria/#usage_intro).
  - `name` <[string]> A human readable name for the node.
  - `value` <[string]|[number]> The current value of the node.
  - `description` <[string]> An additional human readable description of the node.
  - `keyshortcuts` <[string]> Keyboard shortcuts associated with this node.
  - `roledescription` <[string]> A human readable alternative to the role.
  - `valuetext` <[string]> A description of the current value.
  - `disabled` <[boolean]> Whether the node is disabled.
  - `expanded` <[boolean]> Whether the node is expanded or collapsed.
  - `focused` <[boolean]> Whether the node is focused.
  - `modal` <[boolean]> Whether the node is [modal](https://en.wikipedia.org/wiki/Modal_window).
  - `multiline` <[boolean]> Whether the node text input supports multiline.
  - `multiselectable` <[boolean]> Whether more than one child can be selected.
  - `readonly` <[boolean]> Whether the node is read only.
  - `required` <[boolean]> Whether the node is required.
  - `selected` <[boolean]> Whether the node is selected in its parent node.
  - `checked` <[boolean]|"mixed"> Whether the checkbox is checked, or "mixed".
  - `pressed` <[boolean]|"mixed"> Whether the toggle button is checked, or "mixed".
  - `level` <[number]> The level of a heading.
  - `valuemin` <[number]> The minimum value in a node.
  - `valuemax` <[number]> The maximum value in a node.
  - `autocomplete` <[string]> What kind of autocomplete is supported by a control.
  - `haspopup` <[string]> What kind of popup is currently being shown for a node.
  - `invalid` <[string]> Whether and in what way this node's value is invalid.
  - `orientation` <[string]> Whether the node is oriented horizontally or vertically.
  - `children` <[Array]<[Object]>> Child [AXNode]s of this node, if any.

Captures the current state of the accessibility tree. The returned object represents the root accessible node of the page.

> **NOTE** The Chromium accessibility tree contains nodes that go unused on most platforms and by
most screen readers. Puppeteer will discard them as well for an easier to process tree,
unless `interestingOnly` is set to `false`.

An example of dumping the entire accessibility tree:
```js
const snapshot = await page.accessibility.snapshot();
console.log(snapshot);
```

An example of logging the focused node's name:
```js
const snapshot = await page.accessibility.snapshot();
const node = findFocusedNode(snapshot);
console.log(node && node.name);

function findFocusedNode(node) {
  if (node.focused)
    return node;
  for (const child of node.children || []) {
    const foundNode = findFocusedNode(child);
    return foundNode;
  }
  return null;
}
```

### class: Keyboard

Keyboard provides an api for managing a virtual keyboard. The high level api is [`keyboard.type`](#keyboardtypetext-options), which takes raw characters and generates proper keydown, keypress/input, and keyup events on your page.

For finer control, you can use [`keyboard.down`](#keyboarddownkey-options), [`keyboard.up`](#keyboardupkey), and [`keyboard.sendCharacter`](#keyboardsendcharacterchar) to manually fire events as if they were generated from a real keyboard.

An example of holding down `Shift` in order to select and delete some text:
```js
await page.keyboard.type('Hello World!');
await page.keyboard.press('ArrowLeft');

await page.keyboard.down('Shift');
for (let i = 0; i < ' World'.length; i++)
  await page.keyboard.press('ArrowLeft');
await page.keyboard.up('Shift');

await page.keyboard.press('Backspace');
// Result text will end up saying 'Hello!'
```

An example of pressing `A`
```js
await page.keyboard.down('Shift');
await page.keyboard.press('KeyA');
await page.keyboard.up('Shift');
```

> **NOTE** On MacOS, keyboard shortcuts like `⌘ A` -> Select All do not work. See [#1313](https://github.com/puppeteer/puppeteer/issues/1313)

#### keyboard.down(key[, options])
- `key` <[string]> Name of key to press, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- `options` <[Object]>
  - `text` <[string]> If specified, generates an input event with this text.
- returns: <[Promise]>

Dispatches a `keydown` event.

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated.

If `key` is a modifier key, `Shift`, `Meta`, `Control`, or `Alt`, subsequent key presses will be sent with that modifier active. To release the modifier key, use [`keyboard.up`](#keyboardupkey).

After the key is pressed once, subsequent calls to [`keyboard.down`](#keyboarddownkey-options) will have [repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat) set to true. To release the key, use [`keyboard.up`](#keyboardupkey).

> **NOTE** Modifier keys DO influence `keyboard.down`. Holding down `Shift` will type the text in upper case.

#### keyboard.press(key[, options])
- `key` <[string]> Name of key to press, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- `options` <[Object]>
  - `text` <[string]> If specified, generates an input event with this text.
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also generated. The `text` option can be specified to force an input event to be generated.

> **NOTE** Modifier keys DO effect `keyboard.press`. Holding down `Shift` will type the text in upper case.

Shortcut for [`keyboard.down`](#keyboarddownkey-options) and [`keyboard.up`](#keyboardupkey).

#### keyboard.sendCharacter(char)
- `char` <[string]> Character to send into the page.
- returns: <[Promise]>

Dispatches a `keypress` and `input` event. This does not send a `keydown` or `keyup` event.

```js
page.keyboard.sendCharacter('嗨');
```

> **NOTE** Modifier keys DO NOT effect `keyboard.sendCharacter`. Holding down `Shift` will not type the text in upper case.

#### keyboard.type(text[, options])
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

```js
await page.keyboard.type('Hello'); // Types instantly
await page.keyboard.type('World', {delay: 100}); // Types slower, like a user
```

> **NOTE** Modifier keys DO NOT effect `keyboard.type`. Holding down `Shift` will not type the text in upper case.

#### keyboard.up(key)
- `key` <[string]> Name of key to release, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- returns: <[Promise]>

Dispatches a `keyup` event.

### class: Mouse

The Mouse class operates in main-frame CSS pixels relative to the top-left corner of the viewport.

Every `page` object has its own Mouse, accessible with [`page.mouse`](#pagemouse).

```js
// Using ‘page.mouse’ to trace a 100x100 square.
await page.mouse.move(0, 0);
await page.mouse.down();
await page.mouse.move(0, 100);
await page.mouse.move(100, 100);
await page.mouse.move(100, 0);
await page.mouse.move(0, 0);
await page.mouse.up();
```

#### mouse.click(x, y[, options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

Shortcut for [`mouse.move`](#mousemovex-y-options), [`mouse.down`](#mousedownoptions) and [`mouse.up`](#mouseupoptions).

#### mouse.down([options])
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
- returns: <[Promise]>

Dispatches a `mousedown` event.

#### mouse.move(x, y[, options])
- `x` <[number]>
- `y` <[number]>
- `options` <[Object]>
  - `steps` <[number]> defaults to 1. Sends intermediate `mousemove` events.
- returns: <[Promise]>

Dispatches a `mousemove` event.

#### mouse.up([options])
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
- returns: <[Promise]>

Dispatches a `mouseup` event.

### class: Touchscreen

#### touchscreen.tap(x, y)
- `x` <[number]>
- `y` <[number]>
- returns: <[Promise]>

Dispatches a `touchstart` and `touchend` event.

### class: Tracing

You can use [`tracing.start`](#tracingstartoptions) and [`tracing.stop`](#tracingstop) to create a trace file which can be opened in Chrome DevTools or [timeline viewer](https://chromedevtools.github.io/timeline-viewer/).

```js
await page.tracing.start({path: 'trace.json'});
await page.goto('https://www.google.com');
await page.tracing.stop();
```

#### tracing.start([options])
- `options` <[Object]>
  - `path` <[string]> A path to write the trace file to.
  - `screenshots` <[boolean]> captures screenshots in the trace.
  - `categories` <[Array]<[string]>> specify custom categories to use instead of default.
- returns: <[Promise]>

Only one trace can be active at a time per browser.

#### tracing.stop()
- returns: <[Promise]<[Buffer]>> Promise which resolves to buffer with trace data.

### class: FileChooser

[FileChooser] objects are returned via the ['page.waitForFileChooser'](#pagewaitforfilechooseroptions) method.

File choosers let you react to the page requesting for a file.

An example of using [FileChooser]:

```js
const [fileChooser] = await Promise.all([
  page.waitForFileChooser(),
  page.click('#upload-file-button'), // some button that triggers file selection
]);
await fileChooser.accept(['/tmp/myfile.pdf']);
```

> **NOTE** In browsers, only one file chooser can be opened at a time.
> All file choosers must be accepted or canceled. Not doing so will prevent subsequent file choosers from appearing.

#### fileChooser.accept(filePaths)
- `filePaths` <[Array]<[string]>> Accept the file chooser request with given paths. If some of the  `filePaths` are relative paths, then they are resolved relative to the [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
- returns: <[Promise]>

#### fileChooser.cancel()
- returns: <[Promise]>

Closes the file chooser without selecting any files.

#### fileChooser.isMultiple()
- returns: <[boolean]> Whether file chooser allow for [multiple](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-multiple) file selection.

### class: Dialog

[Dialog] objects are dispatched by page via the ['dialog'](#event-dialog) event.

An example of using `Dialog` class:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  page.on('dialog', async dialog => {
    console.log(dialog.message());
    await dialog.dismiss();
    await browser.close();
  });
  page.evaluate(() => alert('1'));
})();
```

#### dialog.accept([promptText])
- `promptText` <[string]> A text to enter in prompt. Does not cause any effects if the dialog's `type` is not prompt.
- returns: <[Promise]> Promise which resolves when the dialog has been accepted.

#### dialog.defaultValue()
- returns: <[string]> If dialog is prompt, returns default prompt value. Otherwise, returns empty string.

#### dialog.dismiss()
- returns: <[Promise]> Promise which resolves when the dialog has been dismissed.

#### dialog.message()
- returns: <[string]> A message displayed in the dialog.

#### dialog.type()
- returns: <[string]> Dialog's type, can be one of `alert`, `beforeunload`, `confirm` or `prompt`.

### class: ConsoleMessage

[ConsoleMessage] objects are dispatched by page via the ['console'](#event-console) event.

#### consoleMessage.args()
- returns: <[Array]<[JSHandle]>>

#### consoleMessage.location()
- returns: <[Object]>
  - `url` <[string]> URL of the resource if known or `undefined` otherwise.
  - `lineNumber` <[number]> 0-based line number in the resource if known or `undefined` otherwise.
  - `columnNumber` <[number]> 0-based column number in the resource if known or `undefined` otherwise.

#### consoleMessage.text()
- returns: <[string]>

#### consoleMessage.type()
- returns: <[string]>

One of the following values: `'log'`, `'debug'`, `'info'`, `'error'`, `'warning'`, `'dir'`, `'dirxml'`, `'table'`, `'trace'`, `'clear'`, `'startGroup'`, `'startGroupCollapsed'`, `'endGroup'`, `'assert'`, `'profile'`, `'profileEnd'`, `'count'`, `'timeEnd'`.

### class: Frame

At every point of time, page exposes its current frame tree via the [page.mainFrame()](#pagemainframe) and [frame.childFrames()](#framechildframes) methods.

[Frame] object's lifecycle is controlled by three events, dispatched on the page object:
- ['frameattached'](#event-frameattached) - fired when the frame gets attached to the page. A Frame can be attached to the page only once.
- ['framenavigated'](#event-framenavigated) - fired when the frame commits navigation to a different URL.
- ['framedetached'](#event-framedetached) - fired when the frame gets detached from the page.  A Frame can be detached from the page only once.

An example of dumping frame tree:

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.google.com/chrome/browser/canary.html');
  dumpFrameTree(page.mainFrame(), '');
  await browser.close();

  function dumpFrameTree(frame, indent) {
    console.log(indent + frame.url());
    for (const child of frame.childFrames()) {
      dumpFrameTree(child, indent + '  ');
    }
  }
})();
```

An example of getting text from an iframe element:

```js
  const frame = page.frames().find(frame => frame.name() === 'myframe');
  const text = await frame.$eval('.selector', element => element.textContent);
  console.log(text);
```

#### frame.$(selector)
- `selector` <[string]> A [selector] to query frame for
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves to ElementHandle pointing to the frame element.

The method queries frame for the selector. If there's no such element within the frame, the method will resolve to `null`.

#### frame.$$(selector)
- `selector` <[string]> A [selector] to query frame for
- returns: <[Promise]<[Array]<[ElementHandle]>>> Promise which resolves to ElementHandles pointing to the frame elements.

The method runs `document.querySelectorAll` within the frame. If no elements match the selector, the return value resolves to `[]`.

#### frame.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query frame for
- `pageFunction` <[function]\([Array]<[Element]>\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `Array.from(document.querySelectorAll(selector))` within the frame and passes it as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `frame.$$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const divsCounts = await frame.$$eval('div', divs => divs.length);
```

#### frame.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query frame for
- `pageFunction` <[function]\([Element]\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelector` within the frame and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const searchValue = await frame.$eval('#search', el => el.value);
const preloadHref = await frame.$eval('link[rel=preload]', el => el.href);
const html = await frame.$eval('.main-container', e => e.outerHTML);
```

#### frame.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method evaluates the XPath expression.

#### frame.addScriptTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of a script to be added.
  - `path` <[string]> Path to the JavaScript file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw JavaScript content to be injected into frame.
  - `type` <[string]> Script type. Use 'module' in order to load a Javascript ES6 module. See [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) for more details.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the script's onload fires or when the script content was injected into frame.

Adds a `<script>` tag into the page with the desired url or content.

#### frame.addStyleTag(options)
- `options` <[Object]>
  - `url` <[string]> URL of the `<link>` tag.
  - `path` <[string]> Path to the CSS file to be injected into frame. If `path` is a relative path, then it is resolved relative to [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
  - `content` <[string]> Raw CSS content to be injected into frame.
- returns: <[Promise]<[ElementHandle]>> which resolves to the added tag when the stylesheet's onload fires or when the CSS content was injected into frame.

Adds a `<link rel="stylesheet">` tag into the page with the desired url or a `<style type="text/css">` tag with the content.

#### frame.childFrames()
- returns: <[Array]<[Frame]>>

#### frame.click(selector[, options])
- `selector` <[string]> A [selector] to search for element to click. If there are multiple elements satisfying the selector, the first will be clicked.
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully clicked. The Promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to click in the center of the element.
If there's no element matching `selector`, the method throws an error.

Bear in mind that if `click()` triggers a navigation event and there's a separate `page.waitForNavigation()` promise to be resolved, you may end up with a race condition that yields unexpected results. The correct pattern for click and wait for navigation is the following:

```javascript
const [response] = await Promise.all([
  page.waitForNavigation(waitOptions),
  frame.click(selector, clickOptions),
]);
```

#### frame.content()
- returns: <[Promise]<[string]>>

Gets the full HTML contents of the frame, including the doctype.

#### frame.evaluate(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `frame.evaluate` returns a [Promise], then `frame.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `frame.evaluate` returns a non-[Serializable] value, then `frame.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

```js
const result = await frame.evaluate(() => {
  return Promise.resolve(8 * 7);
});
console.log(result); // prints "56"
```

A string can also be passed in instead of a function.

```js
console.log(await frame.evaluate('1 + 2')); // prints "3"
```

[ElementHandle] instances can be passed as arguments to the `frame.evaluate`:
```js
const bodyHandle = await frame.$('body');
const html = await frame.evaluate(body => body.innerHTML, bodyHandle);
await bodyHandle.dispose();
```

#### frame.evaluateHandle(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in the page context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `frame.evaluate` and `frame.evaluateHandle` is that `frame.evaluateHandle` returns in-page object (JSHandle).

If the function, passed to the `frame.evaluateHandle`, returns a [Promise], then `frame.evaluateHandle` would wait for the promise to resolve and return its value.

```js
const aWindowHandle = await frame.evaluateHandle(() => Promise.resolve(window));
aWindowHandle; // Handle for the window object.
```

A string can also be passed in instead of a function.

```js
const aHandle = await frame.evaluateHandle('document'); // Handle for the 'document'.
```

[JSHandle] instances can be passed as arguments to the `frame.evaluateHandle`:
```js
const aHandle = await frame.evaluateHandle(() => document.body);
const resultHandle = await frame.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue());
await resultHandle.dispose();
```


#### frame.executionContext()
- returns: <[Promise]<[ExecutionContext]>>

Returns promise that resolves to the frame's default execution context.

#### frame.focus(selector)
- `selector` <[string]> A [selector] of an element to focus. If there are multiple elements satisfying the selector, the first will be focused.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully focused. The promise will be rejected if there is no element matching `selector`.

This method fetches an element with `selector` and focuses it.
If there's no element matching `selector`, the method throws an error.

#### frame.goto(url[, options])
- `url` <[string]> URL to navigate frame to. The url should include scheme, e.g. `https://`.
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
  - `referer` <[string]> Referer header value. If provided it will take preference over the referer header value set by [page.setExtraHTTPHeaders()](#pagesetextrahttpheadersheaders).
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect.

`frame.goto` will throw an error if:
- there's an SSL error (e.g. in case of self-signed certificates).
- target URL is invalid.
- the `timeout` is exceeded during navigation.
- the remote server does not respond or is unreachable.
- the main resource failed to load.

`frame.goto` will not throw an error when any valid HTTP status code is returned by the remote server, including 404 "Not Found" and 500 "Internal Server Error".  The status code for such responses can be retrieved by calling [response.status()](#responsestatus).

> **NOTE** `frame.goto` either throws an error or returns a main resource response. The only exceptions are navigation to `about:blank` or navigation to the same URL with a different hash, which would succeed and return `null`.

> **NOTE** Headless mode doesn't support navigation to a PDF document. See the [upstream issue](https://bugs.chromium.org/p/chromium/issues/detail?id=761295).


#### frame.hover(selector)
- `selector` <[string]> A [selector] to search for element to hover. If there are multiple elements satisfying the selector, the first will be hovered.
- returns: <[Promise]> Promise which resolves when the element matching `selector` is successfully hovered. Promise gets rejected if there's no element matching `selector`.

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If there's no element matching `selector`, the method throws an error.

#### frame.isDetached()
- returns: <[boolean]>

Returns `true` if the frame has been detached, or `false` otherwise.

#### frame.name()
- returns: <[string]>

Returns frame's name attribute as specified in the tag.

If the name is empty, returns the id attribute instead.

> **NOTE** This value is calculated once when the frame is created, and will not update if the attribute is changed later.

#### frame.parentFrame()
- returns: <?[Frame]> Parent frame, if any. Detached frames and main frames return `null`.

#### frame.select(selector, ...values)
- `selector` <[string]> A [selector] to query frame for
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.
- returns: <[Promise]<[Array]<[string]>>> An array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

```js
frame.select('select#colors', 'blue'); // single selection
frame.select('select#colors', 'red', 'green', 'blue'); // multiple selections
```

#### frame.setContent(html[, options])
- `html` <[string]> HTML markup to assign to the page.
- `options` <[Object]> Parameters which might have the following properties:
  - `timeout` <[number]> Maximum time in milliseconds for resources to load, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider setting markup succeeded, defaults to `load`. Given an array of event strings, setting content is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider setting content to be finished when the `load` event is fired.
    - `domcontentloaded` - consider setting content to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider setting content to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider setting content to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]>

#### frame.tap(selector)
- `selector` <[string]> A [selector] to search for element to tap. If there are multiple elements satisfying the selector, the first will be tapped.
- returns: <[Promise]>

This method fetches an element with `selector`, scrolls it into view if needed, and then uses [page.touchscreen](#pagetouchscreen) to tap in the center of the element.
If there's no element matching `selector`, the method throws an error.

#### frame.title()
- returns: <[Promise]<[string]>> The page's title.

#### frame.type(selector, text[, options])
- `selector` <[string]> A [selector] of an element to type into. If there are multiple elements satisfying the selector, the first will be used.
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`keyboard.press`](#keyboardpresskey-options).

```js
await frame.type('#mytextarea', 'Hello'); // Types instantly
await frame.type('#mytextarea', 'World', {delay: 100}); // Types slower, like a user
```

#### frame.url()
- returns: <[string]>

Returns frame's url.

#### frame.waitFor(selectorOrFunctionOrTimeout[, options[, ...args]])
- `selectorOrFunctionOrTimeout` <[string]|[number]|[function]> A [selector], predicate or timeout to wait for
- `options` <[Object]> Optional waiting parameters
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to a JSHandle of the success value

This method behaves differently with respect to the type of the first parameter:
- if `selectorOrFunctionOrTimeout` is a `string`, then the first argument is treated as a [selector] or [xpath], depending on whether or not it starts with '//', and the method is a shortcut for
  [frame.waitForSelector](#framewaitforselectorselector-options) or [frame.waitForXPath](#framewaitforxpathxpath-options)
- if `selectorOrFunctionOrTimeout` is a `function`, then the first argument is treated as a predicate to wait for and the method is a shortcut for [frame.waitForFunction()](#framewaitforfunctionpagefunction-options-args).
- if `selectorOrFunctionOrTimeout` is a `number`, then the first argument is treated as a timeout in milliseconds and the method returns a promise which resolves after the timeout
- otherwise, an exception is thrown

```js
// wait for selector
await page.waitFor('.foo');
// wait for 1 second
await page.waitFor(1000);
// wait for predicate
await page.waitFor(() => !!document.querySelector('.foo'));
```

To pass arguments from node.js to the predicate of `page.waitFor` function:

```js
const selector = '.foo';
await page.waitFor(selector => !!document.querySelector(selector), {}, selector);
```

#### frame.waitForFunction(pageFunction[, options[, ...args]])
- `pageFunction` <[function]|[string]> Function to be evaluated in browser context
- `options` <[Object]> Optional waiting parameters
  - `polling` <[string]|[number]> An interval at which the `pageFunction` is executed, defaults to `raf`. If `polling` is a number, then it is treated as an interval in milliseconds at which the function would be executed. If `polling` is a string, then it can be one of the following values:
    - `raf` - to constantly execute `pageFunction` in `requestAnimationFrame` callback. This is the tightest polling mode which is suitable to observe styling changes.
    - `mutation` - to execute `pageFunction` on every DOM mutation.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to  `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves when the `pageFunction` returns a truthy value. It resolves to a JSHandle of the truthy value.

The `waitForFunction` can be used to observe viewport size change:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const watchDog = page.mainFrame().waitForFunction('window.innerWidth < 100');
  page.setViewport({width: 50, height: 50});
  await watchDog;
  await browser.close();
})();
```

To pass arguments from node.js to the predicate of `page.waitForFunction` function:

```js
const selector = '.foo';
await page.waitForFunction(selector => !!document.querySelector(selector), {}, selector);
```

#### frame.waitForNavigation([options])
- `options` <[Object]> Navigation parameters which might have the following properties:
  - `timeout` <[number]> Maximum navigation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultNavigationTimeout(timeout)](#pagesetdefaultnavigationtimeouttimeout) or [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) methods.
  - `waitUntil` <[string]|[Array]<[string]>> When to consider navigation succeeded, defaults to `load`. Given an array of event strings, navigation is considered to be successful after all events have been fired. Events can be either:
    - `load` - consider navigation to be finished when the `load` event is fired.
    - `domcontentloaded` - consider navigation to be finished when the `DOMContentLoaded` event is fired.
    - `networkidle0` - consider navigation to be finished when there are no more than 0 network connections for at least `500` ms.
    - `networkidle2` - consider navigation to be finished when there are no more than 2 network connections for at least `500` ms.
- returns: <[Promise]<?[Response]>> Promise which resolves to the main resource response. In case of multiple redirects, the navigation will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to History API usage, the navigation will resolve with `null`.

This resolves when the frame navigates to a new URL. It is useful for when you run code
which will indirectly cause the frame to navigate. Consider this example:

```js
const [response] = await Promise.all([
  frame.waitForNavigation(), // The navigation promise resolves after navigation has finished
  frame.click('a.my-link'), // Clicking the link will indirectly cause a navigation
]);
```

**NOTE** Usage of the [History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API) to change the URL is considered a navigation.


#### frame.waitForSelector(selector[, options])
- `selector` <[string]> A [selector] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves when element specified by selector string is added to DOM. Resolves to `null` if waiting for `hidden: true` and selector is not found in DOM.

Wait for the `selector` to appear in page. If at the moment of calling
the method the `selector` already exists, the method will return
immediately. If the selector doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForSelector('img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
```

#### frame.waitForXPath(xpath[, options])
- `xpath` <[string]> A [xpath] of an element to wait for
- `options` <[Object]> Optional waiting parameters
  - `visible` <[boolean]> wait for element to be present in DOM and to be visible, i.e. to not have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `hidden` <[boolean]> wait for element to not be found in the DOM or to be hidden, i.e. have `display: none` or `visibility: hidden` CSS properties. Defaults to `false`.
  - `timeout` <[number]> maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by using the [page.setDefaultTimeout(timeout)](#pagesetdefaulttimeouttimeout) method.
- returns: <[Promise]<?[ElementHandle]>> Promise which resolves when element specified by xpath string is added to DOM. Resolves to `null` if waiting for `hidden: true` and xpath is not found in DOM.

Wait for the `xpath` to appear in page. If at the moment of calling
the method the `xpath` already exists, the method will return
immediately. If the xpath doesn't appear after the `timeout` milliseconds of waiting, the function will throw.

This method works across navigations:
```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let currentURL;
  page.mainFrame()
    .waitForXPath('//img')
    .then(() => console.log('First URL with image: ' + currentURL));
  for (currentURL of ['https://example.com', 'https://google.com', 'https://bbc.com']) {
    await page.goto(currentURL);
  }
  await browser.close();
})();
```

### class: ExecutionContext

The class represents a context for JavaScript execution. A [Page] might have many execution contexts:
- each [frame](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) has "default" execution context that is
  always created after frame is attached to DOM. This context is returned by the [`frame.executionContext()`](#frameexecutioncontext) method.
- [Extensions](https://developer.chrome.com/extensions)'s content scripts create additional execution contexts.

Besides pages, execution contexts can be found in [workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API).

#### executionContext.evaluate(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in `executionContext`
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

If the function passed to the `executionContext.evaluate` returns a [Promise], then `executionContext.evaluate` would wait for the promise to resolve and return its value.

If the function passed to the `executionContext.evaluate` returns a non-[Serializable] value, then `executionContext.evaluate` resolves to `undefined`. DevTools Protocol also supports transferring some additional values that are not serializable by `JSON`: `-0`, `NaN`, `Infinity`, `-Infinity`, and bigint literals.

```js
const executionContext = await page.mainFrame().executionContext();
const result = await executionContext.evaluate(() => Promise.resolve(8 * 7));
console.log(result); // prints "56"
```

A string can also be passed in instead of a function.

```js
console.log(await executionContext.evaluate('1 + 2')); // prints "3"
```

[JSHandle] instances can be passed as arguments to the `executionContext.evaluate`:
```js
const oneHandle = await executionContext.evaluateHandle(() => 1);
const twoHandle = await executionContext.evaluateHandle(() => 2);
const result = await executionContext.evaluate((a, b) => a + b, oneHandle, twoHandle);
await oneHandle.dispose();
await twoHandle.dispose();
console.log(result); // prints '3'.
```

#### executionContext.evaluateHandle(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated in the `executionContext`
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

The only difference between `executionContext.evaluate` and `executionContext.evaluateHandle` is that `executionContext.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `executionContext.evaluateHandle` returns a [Promise], then `executionContext.evaluateHandle` would wait for the promise to resolve and return its value.

```js
const context = await page.mainFrame().executionContext();
const aHandle = await context.evaluateHandle(() => Promise.resolve(self));
aHandle; // Handle for the global object.
```

A string can also be passed in instead of a function.

```js
const aHandle = await context.evaluateHandle('1 + 2'); // Handle for the '3' object.
```

[JSHandle] instances can be passed as arguments to the `executionContext.evaluateHandle`:
```js
const aHandle = await context.evaluateHandle(() => document.body);
const resultHandle = await context.evaluateHandle(body => body.innerHTML, aHandle);
console.log(await resultHandle.jsonValue()); // prints body's innerHTML
await aHandle.dispose();
await resultHandle.dispose();
```

#### executionContext.frame()
- returns: <?[Frame]> Frame associated with this execution context.

> **NOTE** Not every execution context is associated with a frame. For example, workers and extensions have execution contexts that are not associated with frames.


#### executionContext.queryObjects(prototypeHandle)
- `prototypeHandle` <[JSHandle]> A handle to the object prototype.
- returns: <[Promise]<[JSHandle]>> A handle to an array of objects with this prototype

The method iterates the JavaScript heap and finds all the objects with the given prototype.

```js
// Create a Map object
await page.evaluate(() => window.map = new Map());
// Get a handle to the Map object prototype
const mapPrototype = await page.evaluateHandle(() => Map.prototype);
// Query all map instances into an array
const mapInstances = await page.queryObjects(mapPrototype);
// Count amount of map objects in heap
const count = await page.evaluate(maps => maps.length, mapInstances);
await mapInstances.dispose();
await mapPrototype.dispose();
```

### class: JSHandle

JSHandle represents an in-page JavaScript object. JSHandles can be created with the [page.evaluateHandle](#pageevaluatehandlepagefunction-args) method.

```js
const windowHandle = await page.evaluateHandle(() => window);
// ...
```

JSHandle prevents the referenced JavaScript object being garbage collected unless the handle is [disposed](#jshandledispose). JSHandles are auto-disposed when their origin frame gets navigated or the parent context gets destroyed.

JSHandle instances can be used as arguments in [`page.$eval()`](#pageevalselector-pagefunction-args), [`page.evaluate()`](#pageevaluatepagefunction-args) and [`page.evaluateHandle`](#pageevaluatehandlepagefunction-args) methods.

#### jsHandle.asElement()
- returns: <?[ElementHandle]>

Returns either `null` or the object handle itself, if the object handle is an instance of [ElementHandle].

#### jsHandle.dispose()
- returns: <[Promise]> Promise which resolves when the object handle is successfully disposed.

The `jsHandle.dispose` method stops referencing the element handle.

#### jsHandle.evaluate(pageFunction[, ...args])
- `pageFunction` <[function]\([Object]\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method passes this handle as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `handle.evaluate` would wait for the promise to resolve and return its value.

Examples:
```js
const tweetHandle = await page.$('.tweet .retweets');
expect(await tweetHandle.evaluate(node => node.innerText)).toBe('10');
```

#### jsHandle.evaluateHandle(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

This method passes this handle as the first argument to `pageFunction`.

The only difference between `jsHandle.evaluate` and `jsHandle.evaluateHandle` is that `executionContext.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `jsHandle.evaluateHandle` returns a [Promise], then `jsHandle.evaluateHandle` would wait for the promise to resolve and return its value.

See [Page.evaluateHandle](#pageevaluatehandlepagefunction-args) for more details.

#### jsHandle.executionContext()
- returns: <[ExecutionContext]>

Returns execution context the handle belongs to.

#### jsHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

The method returns a map with property names as keys and JSHandle instances for the property values.

```js
const handle = await page.evaluateHandle(() => ({window, document}));
const properties = await handle.getProperties();
const windowHandle = properties.get('window');
const documentHandle = properties.get('document');
await handle.dispose();
```

#### jsHandle.getProperty(propertyName)
- `propertyName` <[string]> property to get
- returns: <[Promise]<[JSHandle]>>

Fetches a single property from the referenced object.

#### jsHandle.jsonValue()
- returns: <[Promise]<[Object]>>

Returns a JSON representation of the object. If the object has a
[`toJSON`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#toJSON()_behavior)
function, it **will not be called**.

> **NOTE** The method will return an empty JSON object if the referenced object is not stringifiable. It will throw an error if the object has circular references.

### class: ElementHandle
* extends: [JSHandle]

ElementHandle represents an in-page DOM element. ElementHandles can be created with the [page.$](#pageselector) method.

```js
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  const hrefElement = await page.$('a');
  await hrefElement.click();
  // ...
})();
```

ElementHandle prevents DOM element from garbage collection unless the handle is [disposed](#elementhandledispose). ElementHandles are auto-disposed when their origin frame gets navigated.

ElementHandle instances can be used as arguments in [`page.$eval()`](#pageevalselector-pagefunction-args) and [`page.evaluate()`](#pageevaluatepagefunction-args) methods.

#### elementHandle.$(selector)
- `selector` <[string]> A [selector] to query element for
- returns: <[Promise]<?[ElementHandle]>>

The method runs `element.querySelector` within the page. If no element matches the selector, the return value resolves to `null`.

#### elementHandle.$$(selector)
- `selector` <[string]> A [selector] to query element for
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method runs `element.querySelectorAll` within the page. If no elements match the selector, the return value resolves to `[]`.

#### elementHandle.$$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]\([Array]<[Element]>\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelectorAll` within the element and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$$eval` would wait for the promise to resolve and return its value.

Examples:
```html
<div class="feed">
  <div class="tweet">Hello!</div>
  <div class="tweet">Hi!</div>
</div>
```
```js
const feedHandle = await page.$('.feed');
expect(await feedHandle.$$eval('.tweet', nodes => nodes.map(n => n.innerText))).toEqual(['Hello!', 'Hi!']);
```

#### elementHandle.$eval(selector, pageFunction[, ...args])
- `selector` <[string]> A [selector] to query page for
- `pageFunction` <[function]\([Element]\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method runs `document.querySelector` within the element and passes it as the first argument to `pageFunction`. If there's no element matching `selector`, the method throws an error.

If `pageFunction` returns a [Promise], then `frame.$eval` would wait for the promise to resolve and return its value.

Examples:
```js
const tweetHandle = await page.$('.tweet');
expect(await tweetHandle.$eval('.like', node => node.innerText)).toBe('100');
expect(await tweetHandle.$eval('.retweets', node => node.innerText)).toBe('10');
```

#### elementHandle.$x(expression)
- `expression` <[string]> Expression to [evaluate](https://developer.mozilla.org/en-US/docs/Web/API/Document/evaluate).
- returns: <[Promise]<[Array]<[ElementHandle]>>>

The method evaluates the XPath expression relative to the elementHandle. If there are no such elements, the method will resolve to an empty array.

#### elementHandle.asElement()
- returns: <[ElementHandle]>

#### elementHandle.boundingBox()
- returns: <[Promise]<?[Object]>>
  - x <[number]> the x coordinate of the element in pixels.
  - y <[number]> the y coordinate of the element in pixels.
  - width <[number]> the width of the element in pixels.
  - height <[number]> the height of the element in pixels.

This method returns the bounding box of the element (relative to the main frame), or `null` if the element is not visible.

#### elementHandle.boxModel()
- returns: <[Promise]<?[Object]>>
  - content <[Array]<[Object]>> Content box.
    - x <[number]>
    - y <[number]>
  - padding <[Array]<[Object]>> Padding box.
    - x <[number]>
    - y <[number]>
  - border <[Array]<[Object]>> Border box.
    - x <[number]>
    - y <[number]>
  - margin <[Array]<[Object]>> Margin box.
    - x <[number]>
    - y <[number]>
  - width <[number]> Element's width.
  - height <[number]> Element's height.

This method returns boxes of the element, or `null` if the element is not visible. Boxes are represented as an array of points; each Point is an object `{x, y}`. Box points are sorted clock-wise.

#### elementHandle.click([options])
- `options` <[Object]>
  - `button` <"left"|"right"|"middle"> Defaults to `left`.
  - `clickCount` <[number]> defaults to 1. See [UIEvent.detail].
  - `delay` <[number]> Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.
- returns: <[Promise]> Promise which resolves when the element is successfully clicked. Promise gets rejected if the element is detached from DOM.

This method scrolls element into view if needed, and then uses [page.mouse](#pagemouse) to click in the center of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.contentFrame()
- returns: <[Promise]<?[Frame]>> Resolves to the content frame for element handles referencing iframe nodes, or null otherwise

#### elementHandle.dispose()
- returns: <[Promise]> Promise which resolves when the element handle is successfully disposed.

The `elementHandle.dispose` method stops referencing the element handle.

#### elementHandle.evaluate(pageFunction[, ...args])
- `pageFunction` <[function]\([Object]\)> Function to be evaluated in browser context
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[Serializable]>> Promise which resolves to the return value of `pageFunction`

This method passes this handle as the first argument to `pageFunction`.

If `pageFunction` returns a [Promise], then `handle.evaluate` would wait for the promise to resolve and return its value.

Examples:
```js
const tweetHandle = await page.$('.tweet .retweets');
expect(await tweetHandle.evaluate(node => node.innerText)).toBe('10');
```

#### elementHandle.evaluateHandle(pageFunction[, ...args])
- `pageFunction` <[function]|[string]> Function to be evaluated
- `...args` <...[Serializable]|[JSHandle]> Arguments to pass to `pageFunction`
- returns: <[Promise]<[JSHandle]>> Promise which resolves to the return value of `pageFunction` as in-page object (JSHandle)

This method passes this handle as the first argument to `pageFunction`.

The only difference between `evaluateHandle.evaluate` and `evaluateHandle.evaluateHandle` is that `executionContext.evaluateHandle` returns in-page object (JSHandle).

If the function passed to the `evaluateHandle.evaluateHandle` returns a [Promise], then `evaluateHandle.evaluateHandle` would wait for the promise to resolve and return its value.

See [Page.evaluateHandle](#pageevaluatehandlepagefunction-args) for more details.

#### elementHandle.executionContext()
- returns: <[ExecutionContext]>

#### elementHandle.focus()
- returns: <[Promise]>

Calls [focus](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) on the element.

#### elementHandle.getProperties()
- returns: <[Promise]<[Map]<[string], [JSHandle]>>>

The method returns a map with property names as keys and JSHandle instances for the property values.

```js
const listHandle = await page.evaluateHandle(() => document.body.children);
const properties = await listHandle.getProperties();
const children = [];
for (const property of properties.values()) {
  const element = property.asElement();
  if (element)
    children.push(element);
}
children; // holds elementHandles to all children of document.body
```

#### elementHandle.getProperty(propertyName)
- `propertyName` <[string]> property to get
- returns: <[Promise]<[JSHandle]>>

Fetches a single property from the objectHandle.

#### elementHandle.hover()
- returns: <[Promise]> Promise which resolves when the element is successfully hovered.

This method scrolls element into view if needed, and then uses [page.mouse](#pagemouse) to hover over the center of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.isIntersectingViewport()
- returns: <[Promise]<[boolean]>> Resolves to true if the element is visible in the current viewport.

#### elementHandle.jsonValue()
- returns: <[Promise]<[Object]>>

Returns a JSON representation of the object. The JSON is generated by running [`JSON.stringify`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) on the object in page and consequent [`JSON.parse`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) in puppeteer.

> **NOTE** The method will throw if the referenced object is not stringifiable.

#### elementHandle.press(key[, options])
- `key` <[string]> Name of key to press, such as `ArrowLeft`. See [USKeyboardLayout] for a list of all key names.
- `options` <[Object]>
  - `text` <[string]> If specified, generates an input event with this text.
  - `delay` <[number]> Time to wait between `keydown` and `keyup` in milliseconds. Defaults to 0.
- returns: <[Promise]>

Focuses the element, and then uses [`keyboard.down`](#keyboarddownkey-options) and [`keyboard.up`](#keyboardupkey).

If `key` is a single character and no modifier keys besides `Shift` are being held down, a `keypress`/`input` event will also be generated. The `text` option can be specified to force an input event to be generated.

> **NOTE** Modifier keys DO effect `elementHandle.press`. Holding down `Shift` will type the text in upper case.

#### elementHandle.screenshot([options])
- `options` <[Object]> Same options as in [page.screenshot](#pagescreenshotoptions).
- returns: <[Promise]<[string]|[Buffer]>> Promise which resolves to buffer or a base64 string (depending on the value of `options.encoding`) with captured screenshot.

This method scrolls element into view if needed, and then uses [page.screenshot](#pagescreenshotoptions) to take a screenshot of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.select(...values)
- `...values` <...[string]> Values of options to select. If the `<select>` has the `multiple` attribute, all values are considered, otherwise only the first one is taken into account.
- returns: <[Promise]<[Array]<[string]>>> An array of option values that have been successfully selected.

Triggers a `change` and `input` event once all the provided options have been selected.
If there's no `<select>` element matching `selector`, the method throws an error.

```js
handle.select('blue'); // single selection
handle.select('red', 'green', 'blue'); // multiple selections
```

#### elementHandle.tap()
- returns: <[Promise]> Promise which resolves when the element is successfully tapped. Promise gets rejected if the element is detached from DOM.

This method scrolls element into view if needed, and then uses [touchscreen.tap](#touchscreentapx-y) to tap in the center of the element.
If the element is detached from DOM, the method throws an error.

#### elementHandle.toString()
- returns: <[string]>

#### elementHandle.type(text[, options])
- `text` <[string]> A text to type into a focused element.
- `options` <[Object]>
  - `delay` <[number]> Time to wait between key presses in milliseconds. Defaults to 0.
- returns: <[Promise]>

Focuses the element, and then sends a `keydown`, `keypress`/`input`, and `keyup` event for each character in the text.

To press a special key, like `Control` or `ArrowDown`, use [`elementHandle.press`](#elementhandlepresskey-options).

```js
await elementHandle.type('Hello'); // Types instantly
await elementHandle.type('World', {delay: 100}); // Types slower, like a user
```

An example of typing into a text field and then submitting the form:
```js
const elementHandle = await page.$('input');
await elementHandle.type('some text');
await elementHandle.press('Enter');
```

#### elementHandle.uploadFile(...filePaths)
- `...filePaths` <...[string]> Sets the value of the file input to these paths. If some of the  `filePaths` are relative paths, then they are resolved relative to the [current working directory](https://nodejs.org/api/process.html#process_process_cwd).
- returns: <[Promise]>

This method expects `elementHandle` to point to an [input element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input).

### class: Request

Whenever the page sends a request, such as for a network resource, the following events are emitted by puppeteer's page:
- [`'request'`](#event-request) emitted when the request is issued by the page.
- [`'response'`](#event-response) emitted when/if the response is received for the request.
- [`'requestfinished'`](#event-requestfinished) emitted when the response body is downloaded and the request is complete.

If request fails at some point, then instead of `'requestfinished'` event (and possibly instead of 'response' event), the  [`'requestfailed'`](#event-requestfailed) event is emitted.

> **NOTE** HTTP Error responses, such as 404 or 503, are still successful responses from HTTP standpoint, so request will complete with `'requestfinished'` event.

If request gets a 'redirect' response, the request is successfully finished with the 'requestfinished' event, and a new request is  issued to a redirected url.

#### request.abort([errorCode])
- `errorCode` <[string]> Optional error code. Defaults to `failed`, could be
  one of the following:
  - `aborted` - An operation was aborted (due to user action)
  - `accessdenied` - Permission to access a resource, other than the network, was denied
  - `addressunreachable` - The IP address is unreachable. This usually means
    that there is no route to the specified host or network.
  - `blockedbyclient` - The client chose to block the request.
  - `blockedbyresponse` - The request failed because the response was delivered along with requirements which are not met ('X-Frame-Options' and 'Content-Security-Policy' ancestor checks, for instance).
  - `connectionaborted` - A connection timed out as a result of not receiving an ACK for data sent.
  - `connectionclosed` - A connection was closed (corresponding to a TCP FIN).
  - `connectionfailed` - A connection attempt failed.
  - `connectionrefused` - A connection attempt was refused.
  - `connectionreset` - A connection was reset (corresponding to a TCP RST).
  - `internetdisconnected` - The Internet connection has been lost.
  - `namenotresolved` - The host name could not be resolved.
  - `timedout` - An operation timed out.
  - `failed` - A generic failure occurred.
- returns: <[Promise]>

Aborts request. To use this, request interception should be enabled with `page.setRequestInterception`.
Exception is immediately thrown if the request interception is not enabled.

#### request.continue([overrides])
- `overrides` <[Object]> Optional request overwrites, which can be one of the following:
  - `url` <[string]> If set, the request url will be changed. This is not a redirect. The request will be silently forwarded to the new url. For example, the address bar will show the original url.
  - `method` <[string]> If set changes the request method (e.g. `GET` or `POST`)
  - `postData` <[string]> If set changes the post data of request
  - `headers` <[Object]> If set changes the request HTTP headers. Header values will be converted to a string.
- returns: <[Promise]>

Continues request with optional request overrides. To use this, request interception should be enabled with `page.setRequestInterception`.
Exception is immediately thrown if the request interception is not enabled.

```js
await page.setRequestInterception(true);
page.on('request', request => {
  // Override headers
  const headers = Object.assign({}, request.headers(), {
    foo: 'bar', // set "foo" header
    origin: undefined, // remove "origin" header
  });
  request.continue({headers});
});
```

#### request.failure()
- returns: <?[Object]> Object describing request failure, if any
  - `errorText` <[string]> Human-readable error message, e.g. `'net::ERR_FAILED'`.

The method returns `null` unless this request was failed, as reported by
`requestfailed` event.

Example of logging all failed requests:

```js
page.on('requestfailed', request => {
  console.log(request.url() + ' ' + request.failure().errorText);
});
```

#### request.frame()
- returns: <?[Frame]> A [Frame] that initiated this request, or `null` if navigating to error pages.

#### request.headers()
- returns: <[Object]> An object with HTTP headers associated with the request. All header names are lower-case.

#### request.isNavigationRequest()
- returns: <[boolean]>

Whether this request is driving frame's navigation.

#### request.method()
- returns: <[string]> Request's method (GET, POST, etc.)

#### request.postData()
- returns: <[string]> Request's post body, if any.

#### request.redirectChain()
- returns: <[Array]<[Request]>>

A `redirectChain` is a chain of requests initiated to fetch a resource.
- If there are no redirects and the request was successful, the chain will be empty.
- If a server responds with at least a single redirect, then the chain will
contain all the requests that were redirected.

`redirectChain` is shared between all the requests of the same chain.

For example, if the website `http://example.com` has a single redirect to
`https://example.com`, then the chain will contain one request:

```js
const response = await page.goto('http://example.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 1
console.log(chain[0].url()); // 'http://example.com'
```

If the website `https://google.com` has no redirects, then the chain will be empty:
```js
const response = await page.goto('https://google.com');
const chain = response.request().redirectChain();
console.log(chain.length); // 0
```

#### request.resourceType()
- returns: <[string]>

Contains the request's resource type as it was perceived by the rendering engine.
ResourceType will be one of the following: `document`, `stylesheet`, `image`, `media`, `font`, `script`, `texttrack`, `xhr`, `fetch`, `eventsource`, `websocket`, `manifest`, `other`.

#### request.respond(response)
- `response` <[Object]> Response that will fulfill this request
  - `status` <[number]> Response status code, defaults to `200`.
  - `headers` <[Object]> Optional response headers. Header values will be converted to a string.
  - `contentType` <[string]> If set, equals to setting `Content-Type` response header
  - `body` <[string]|[Buffer]> Optional response body
- returns: <[Promise]>

Fulfills request with given response. To use this, request interception should
be enabled with `page.setRequestInterception`. Exception is thrown if
request interception is not enabled.

An example of fulfilling all requests with 404 responses:

```js
await page.setRequestInterception(true);
page.on('request', request => {
  request.respond({
    status: 404,
    contentType: 'text/plain',
    body: 'Not Found!'
  });
});
```

> **NOTE** Mocking responses for dataURL requests is not supported.
> Calling `request.respond` for a dataURL request is a noop.

#### request.response()
- returns: <?[Response]> A matching [Response] object, or `null` if the response has not been received yet.

#### request.url()
- returns: <[string]> URL of the request.

### class: Response

[Response] class represents responses which are received by page.

#### response.buffer()
- returns: <Promise<[Buffer]>> Promise which resolves to a buffer with response body.

#### response.frame()
- returns: <?[Frame]> A [Frame] that initiated this response, or `null` if navigating to error pages.

#### response.fromCache()
- returns: <[boolean]>

True if the response was served from either the browser's disk cache or memory cache.

#### response.fromServiceWorker()
- returns: <[boolean]>

True if the response was served by a service worker.

#### response.headers()
- returns: <[Object]> An object with HTTP headers associated with the response. All header names are lower-case.

#### response.json()
- returns: <Promise<[Object]>> Promise which resolves to a JSON representation of response body.

This method will throw if the response body is not parsable via `JSON.parse`.

#### response.ok()
- returns: <[boolean]>

Contains a boolean stating whether the response was successful (status in the range 200-299) or not.

#### response.remoteAddress()
- returns: <[Object]>
  - `ip` <[string]> the IP address of the remote server
  - `port` <[number]> the port used to connect to the remote server

#### response.request()
- returns: <[Request]> A matching [Request] object.

#### response.securityDetails()
- returns: <?[SecurityDetails]> Security details if the response was received over the secure connection, or `null` otherwise.

#### response.status()
- returns: <[number]>

Contains the status code of the response (e.g., 200 for a success).

#### response.statusText()
- returns: <[string]>

Contains the status text of the response (e.g. usually an "OK" for a success).

#### response.text()
- returns: <[Promise]<[string]>> Promise which resolves to a text representation of response body.

#### response.url()
- returns: <[string]>

Contains the URL of the response.

### class: SecurityDetails

[SecurityDetails] class represents the security details when response was received over the secure connection.

#### securityDetails.issuer()
- returns: <[string]> A string with the name of issuer of the certificate.

#### securityDetails.protocol()
- returns: <[string]> String with the security protocol, eg. "TLS 1.2".

#### securityDetails.subjectName()
- returns: <[string]> Name of the subject to which the certificate was issued to.

#### securityDetails.validFrom()
- returns: <[number]> [UnixTime] stating the start of validity of the certificate.

#### securityDetails.validTo()
- returns: <[number]> [UnixTime] stating the end of validity of the certificate.

### class: Target

#### target.browser()

- returns: <[Browser]>

Get the browser the target belongs to.

#### target.browserContext()

- returns: <[BrowserContext]>

The browser context the target belongs to.

#### target.createCDPSession()
- returns: <[Promise]<[CDPSession]>>

Creates a Chrome Devtools Protocol session attached to the target.

#### target.opener()
- returns: <?[Target]>

Get the target that opened this target. Top-level targets return `null`.

#### target.page()
- returns: <[Promise]<?[Page]>>

If the target is not of type `"page"` or `"background_page"`, returns `null`.

#### target.type()
- returns: <"page"|"background_page"|"service_worker"|"shared_worker"|"other"|"browser">

Identifies what kind of target this is. Can be `"page"`, [`"background_page"`](https://developer.chrome.com/extensions/background_pages), `"service_worker"`, `"shared_worker"`, `"browser"` or `"other"`.

#### target.url()
- returns: <[string]>

#### target.worker()
- returns: <[Promise]<?[Worker]>>

If the target is not of type `"service_worker"` or `"shared_worker"`, returns `null`.

### class: CDPSession

* extends: [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter)

The `CDPSession` instances are used to talk raw Chrome Devtools Protocol:
- protocol methods can be called with `session.send` method.
- protocol events can be subscribed to with `session.on` method.

Useful links:
- Documentation on DevTools Protocol can be found here: [DevTools Protocol Viewer](https://chromedevtools.github.io/devtools-protocol/).
- Getting Started with DevTools Protocol: https://github.com/aslushnikov/getting-started-with-cdp/blob/master/README.md

```js
const client = await page.target().createCDPSession();
await client.send('Animation.enable');
client.on('Animation.animationCreated', () => console.log('Animation created!'));
const response = await client.send('Animation.getPlaybackRate');
console.log('playback rate is ' + response.playbackRate);
await client.send('Animation.setPlaybackRate', {
  playbackRate: response.playbackRate / 2
});
```

#### cdpSession.detach()
- returns: <[Promise]>

Detaches the cdpSession from the target. Once detached, the cdpSession object won't emit any events and can't be used
to send messages.

#### cdpSession.send(method[, params])
- `method` <[string]> protocol method name
- `params` <[Object]> Optional method parameters
- returns: <[Promise]<[Object]>>

### class: Coverage

Coverage gathers information about parts of JavaScript and CSS that were used by the page.

An example of using JavaScript and CSS coverage to get percentage of initially
executed code:

```js
// Enable both JavaScript and CSS coverage
await Promise.all([
  page.coverage.startJSCoverage(),
  page.coverage.startCSSCoverage()
]);
// Navigate to page
await page.goto('https://example.com');
// Disable both JavaScript and CSS coverage
const [jsCoverage, cssCoverage] = await Promise.all([
  page.coverage.stopJSCoverage(),
  page.coverage.stopCSSCoverage(),
]);
let totalBytes = 0;
let usedBytes = 0;
const coverage = [...jsCoverage, ...cssCoverage];
for (const entry of coverage) {
  totalBytes += entry.text.length;
  for (const range of entry.ranges)
    usedBytes += range.end - range.start - 1;
}
console.log(`Bytes used: ${usedBytes / totalBytes * 100}%`);
```

_To output coverage in a form consumable by [Istanbul](https://github.com/istanbuljs),
  see [puppeteer-to-istanbul](https://github.com/istanbuljs/puppeteer-to-istanbul)._

#### coverage.startCSSCoverage([options])
- `options` <[Object]>  Set of configurable options for coverage
  - `resetOnNavigation` <[boolean]> Whether to reset coverage on every navigation. Defaults to `true`.
- returns: <[Promise]> Promise that resolves when coverage is started

#### coverage.startJSCoverage([options])
- `options` <[Object]>  Set of configurable options for coverage
  - `resetOnNavigation` <[boolean]> Whether to reset coverage on every navigation. Defaults to `true`.
  - `reportAnonymousScripts` <[boolean]> Whether anonymous scripts generated by the page should be reported. Defaults to `false`.
- returns: <[Promise]> Promise that resolves when coverage is started

> **NOTE** Anonymous scripts are ones that don't have an associated url. These are scripts that are dynamically created on the page using `eval` or `new Function`. If `reportAnonymousScripts` is set to `true`, anonymous scripts will have `__puppeteer_evaluation_script__` as their URL.

#### coverage.stopCSSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> Promise that resolves to the array of coverage reports for all stylesheets
  - `url` <[string]> StyleSheet URL
  - `text` <[string]> StyleSheet content
  - `ranges` <[Array]<[Object]>> StyleSheet ranges that were used. Ranges are sorted and non-overlapping.
    - `start` <[number]> A start offset in text, inclusive
    - `end` <[number]> An end offset in text, exclusive

> **NOTE** CSS Coverage doesn't include dynamically injected style tags without sourceURLs.

#### coverage.stopJSCoverage()
- returns: <[Promise]<[Array]<[Object]>>> Promise that resolves to the array of coverage reports for all scripts
  - `url` <[string]> Script URL
  - `text` <[string]> Script content
  - `ranges` <[Array]<[Object]>> Script ranges that were executed. Ranges are sorted and non-overlapping.
    - `start` <[number]> A start offset in text, inclusive
    - `end` <[number]> An end offset in text, exclusive

> **NOTE** JavaScript Coverage doesn't include anonymous scripts by default. However, scripts with sourceURLs are
reported.

### class: TimeoutError

* extends: [Error]

TimeoutError는 정확한 실행을 타임아웃때문에 제거할 경우마다 발생합니다.
예를 들어 [page.waitForSelector(selector[, options])](#pagewaitforselectorselector-options)나 [puppeteer.launch([options])](#puppeteerlaunchoptions)에서 발생할 수 있습니다.


[AXNode]: #accessibilitysnapshotoptions "AXNode"
[Accessibility]: #class-accessibility "Accessibility"
[Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array "Array"
[Body]: #class-body  "Body"
[BrowserContext]: #class-browsercontext  "BrowserContext"
[BrowserFetcher]: #class-browserfetcher  "BrowserFetcher"
[Browser]: #class-browser  "Browser"
[Buffer]: https://nodejs.org/api/buffer.html#buffer_class_buffer "Buffer"
[CDPSession]: #class-cdpsession  "CDPSession"
[ChildProcess]: https://nodejs.org/api/child_process.html "ChildProcess"
[ConnectionTransport]: ../lib/WebSocketTransport.js "ConnectionTransport"
[ConsoleMessage]: #class-consolemessage "ConsoleMessage"
[Coverage]: #class-coverage "Coverage"
[Dialog]: #class-dialog "Dialog"
[ElementHandle]: #class-elementhandle "ElementHandle"
[Element]: https://developer.mozilla.org/en-US/docs/Web/API/element "Element"
[Error]: https://nodejs.org/api/errors.html#errors_class_error "Error"
[ExecutionContext]: #class-executioncontext "ExecutionContext"
[FileChooser]: #class-filechooser "FileChooser"
[Frame]: #class-frame "Frame"
[JSHandle]: #class-jshandle "JSHandle"
[Keyboard]: #class-keyboard "Keyboard"
[Map]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map "Map"
[Mouse]: #class-mouse "Mouse"
[Object]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object "Object"
[Page]: #class-page "Page"
[Promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise "Promise"
[Request]: #class-request  "Request"
[Response]: #class-response  "Response"
[SecurityDetails]: #class-securitydetails "SecurityDetails"
[Serializable]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Description "Serializable"
[Target]: #class-target "Target"
[TimeoutError]: #class-timeouterror "TimeoutError"
[Touchscreen]: #class-touchscreen "Touchscreen"
[Tracing]: #class-tracing "Tracing"
[UIEvent.detail]: https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail "UIEvent.detail"
[USKeyboardLayout]: ../lib/USKeyboardLayout.js "USKeyboardLayout"
[UnixTime]: https://en.wikipedia.org/wiki/Unix_time "Unix Time"
[Worker]: #class-worker "Worker"
[boolean]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Boolean_type "Boolean"
[function]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function "Function"
[iterator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols "Iterator"
[number]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#Number_type "Number"
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin "Origin"
[selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors "selector"
[stream.Readable]: https://nodejs.org/api/stream.html#stream_class_stream_readable "stream.Readable"
[string]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures#String_type "String"
[xpath]: https://developer.mozilla.org/en-US/docs/Web/XPath "xpath"

