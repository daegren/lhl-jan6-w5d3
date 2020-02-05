
const throws = () => {
  throw new Error('Something went wrong!');
};

try {
  throws();
} catch (err) {
  console.log(err);
}

console.log('DONE');
