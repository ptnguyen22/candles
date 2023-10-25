const { Pool} = require('pg')

//db connection
const pool = new Pool({
  user: 'candles_db',
  database: 'candles',
  password: 'candles',
  port: 5432,
  host: 'localhost',
})

module.exports = { pool };
