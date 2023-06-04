const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'school',
  password: '283542',
  port: 5432,
});

module.exports =pool;