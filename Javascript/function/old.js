var object = {
    name: 'Zero',
    friends: ['One', 'Two', 'Three'],
    alertFriends: function() {
      var self = this;
      this.friends.forEach(function(friend) {
        alert(self.name + ' and ' + friend);
      });
    }
  };
  object.alertFriends(); // 세 번 알림

  var func = function(msg) {
    alert(msg);
  };
  func(); // undefined

  var func3 = function(x) {
    var args = Array.prototype.slice.call(arguments, 1);
    console.log(args.length);
  };
  func3(1, 2, 3, 4); // 3