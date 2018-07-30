var sayYeah = function() {
    alert('Yeah');
  };
  var a = 1;
  var b = 'Wow';
  var object = {
    sayHello: function() {
      alert('hello');
    },
    sayYeah: sayYeah
  };
  object[a + 3] = 'four';
  object['say' + b] = function() {
    alert('Wow');
  };