const { pool } = require('./db');

//get all waxes given cid
async function queryWaxes(cid){
  let querystring = `select * from waxes where cid=${cid}`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log('ERROR in queryWaxes');
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

//get all wicks given cid
async function queryWicks(cid){
  let querystring = `select * from wicks where cid=${cid}`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log('ERROR in queryWicks');
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

//get all fragrance oils given cid
async function queryFO(cid){
  let querystring = `select * from fo where cid=${cid}`;

  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log('ERROR in queryFO');
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

//get all candles for main page
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

async function querySingle(cid){
  let querystring = `select * from candles where cid=${cid.cid}`;
  const ret = await new Promise((resolve, reject) => pool.query(querystring, async (err, res)=>{
    if(err){
      reject(err);
    }
    resolve(res);
  }));
  return await queryWrap(ret.rows[0])
}

//get all parts of a candle and package into object
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

module.exports = {queryAll, querySingle};