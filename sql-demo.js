const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'w5d1_lecture'
});

client.connect();

client.query('SELECT * FROM projects')
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    client.end();
  });




