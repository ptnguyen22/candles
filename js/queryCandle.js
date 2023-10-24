const { pool } = require('./db');

async function queryWaxes(cid){
  querystring = `select * from waxes where cid=${cid}`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function queryWicks(cid){
  querystring = `select * from wicks where cid=${cid}`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function queryFO(cid){
  let querystring = `select * from fo where cid=${cid}`;

  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function queryAll(){
  //get candle cids
  const ret = await new Promise((resolve, reject) => pool.query("select * from candles;", async (err, res)=>{
    if(err){
      reject(err);
    }
    resolve(res);
  }));
  candles = [];
  let promises = ret.rows.map((row) => {
    return queryWrap(row);
  });
  let resolved = await Promise.all(promises);
  return resolved;
}

async function queryWrap(cid){
  let waxes = await queryWaxes(cid.cid);
  let wicks = await queryWicks(cid.cid);
  let fos = await queryFO(cid.cid);
  let obj = {
    cid: cid,
    waxes: waxes,
    wicks: wicks,
    fos: fos
  }
  return obj;
}

module.exports = {queryWaxes, queryAll, queryWicks};