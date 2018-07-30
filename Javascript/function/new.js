const object2 = {
    name: 'Zero',
    friends: ['One', 'Two', 'Three'],
    alertFriends() {     
      this.friends.forEach((friend) => {
        alert(`${this.name} and ${friend}`);
      });
    }
  };
  object2.alertFriends();

  const func2 = (msg = 'hello') => {
    alert(msg);
  };
  func2(); // 'hello'

  const func4 = (x, ...y) => {
    console.log(y.length);
  };
  func4(1, 2, 3, 4) // 3