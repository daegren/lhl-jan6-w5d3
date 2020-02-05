const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: 'postgres',
  database: 'w5d1_lecture'
});

client.connect();

module.exports = client;
