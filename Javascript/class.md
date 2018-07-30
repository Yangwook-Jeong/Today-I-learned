Class methods
====

# use function
```javascript
function Apple (type) {
    this.type = type;
    this.color = "red";
    this.getInfo = getAppleInfo;
}
 
function getAppleInfo() {
    return this.color + ' ' + this.type + ' apple';
}

var apple = new Apple('macintosh');
apple.color = "reddish";
alert(apple.getInfo());
```

# define method inside 
```javascript
function Apple(type) {
    this.type = type;
    this.color = "red";
    this.getInfo = function () {
        return this.color + ' ' + this.type + ' apple';
    };
}
```

# add method to prototype 
```javascript
function Apple (type) {
    this.type = type;
    this.color = "red";
}
 
Apple.prototype.getInfo = function() {
    return this.color + ' ' + this.type + ' apple';
};
```

# use object literal
```javascript
var o = {};
var o = new Object();
var a = [];
var a = new Array();

var apple = {
    type: "macintosh",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
};

apple.color = "reddish";
alert(apple.getInfo());
```

# singleton by function
```javascript
var apple = new function() {
    this.type = "macintosh";
    this.color = "red";
    this.getInfo = function () {
        return this.color + ' ' + this.type + ' apple';
    };
};

apple.color = "reddish";
alert(apple.getInfo());
```