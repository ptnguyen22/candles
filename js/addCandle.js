const { pool } = require("./db");
async function createNewCandle(date, weight, total){
  let query = `insert into candles values ((default), '${date}', ${weight}, ${total}) returning cid;`;
  let cid = await new Promise((resolve, reject) => {
    pool.query(query, async(err,res) => {
      if (err) {
        console.log(err);
        resolve(0);
      }
      console.log(res);
      resolve(res.rows[0].cid);
    })
  })
  console.log(cid);
  return cid;
}

async function addWax(cid, type, brand, percent) {
  let query = `insert into waxes values (${cid}, '${type}', '${brand}', ${percent})`
  await new Promise((resolve, reject) => {
    pool.query(query, (err, res) =>{
      if(err){
        console.log(err);
        resolve(0);
      }
      resolve(1);
    })
  })
}
async function insertCandle(data) {
  console.log(data);
  let cid = await createNewCandle(data.datecreated, data.weight, data.totalFOpercent);
  //ERROR adding to candles
  if(!cid){
    return;
  }
  console.log(data.waxtype.length);
}

module.exports = { insertCandle }