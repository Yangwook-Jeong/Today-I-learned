const a = 1;
const b = 'Wow';
const sayYeah = () => {
  alert('Yeah'); 
};
const object2 = {
  sayHello() {
    alert('hello');
  },
  sayYeah,
  [a + 3]: 'four', // 4: 'four'
  ['say' + b]() {
    alert('Wow');
  }  // sayWow() { alert('Wow') }
};