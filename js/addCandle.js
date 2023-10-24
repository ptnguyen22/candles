const { pool } = require("./db");

async function insertCandle(wax_type, wax_brand, jar, fo, wax_weight, wicks, wick_works) {
  const rec = await pool.query("insert into candles values($1, $2, $3, $4, $5, $6, $7);", [wax_type, wax_brand, jar, fo, wax_weight, wicks, wick_works], (err, res)=>{
    if(err){
      console.log(err);
    }
  })
}

module.exports = { insertCandle }