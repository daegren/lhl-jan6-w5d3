const doLater = (n) => {
  return new Promise((resolve, _reject) => {
    if (n % 2 !== 0) {
      throw new Error('Number is not even');
    }
    resolve(true);
  });
};

doLater(3)
  .then(v => console.log(v));
// .catch(err => console.log(err));

console.log('DONE');
