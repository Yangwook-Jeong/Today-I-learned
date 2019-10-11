- typescript - expected 2 arguments, but got 1 - [How to pass optional parameters while omitting some other optional parameters?] - 빈 칸에 `undefined`를 입력해준다.

[how to pass optional parameters while omitting some other optional parameters? ]: https://stackoverflow.com/questions/30734509/how-to-pass-optional-parameters-while-omitting-some-other-optional-parameters

    - absolute path
    	- yarn add -D babel-plugin-module-resolver
    	- tsconfig.json
    	```json
    	"baseUrl": ".",
    	"paths": {
    		"@/*": ["./src/*"]
    	}
    	```
    	- .babelrc
    	```.babelrc
    	 ["module-resolver", {
    		  "alias": {
    			"@": "./src"
    		  }
    		}]
    	```
