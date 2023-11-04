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

async function getSimilarCandles(cid, waxes, fos){
  let waxesquery = `select cid from waxes w where w.cid!=${cid.cid} and (w.type='${waxes[0].type}' and w.brand='${waxes[0].brand}' and w.percent=${waxes[0].percent})`;
  for(let i=1; i<waxes.length;i++){
    waxesquery += ` or (w.type='${waxes[i].type}' and w.brand='${waxes[i].brand}' and w.percent=${waxes[i].percent})`
  }
  waxesquery += ` group by cid having count(*)=${waxes.length} intersect select cid from waxes w group by cid having count(*)=${waxes.length}`

  let frag_query = `select cid from fo f where f.cid!=${cid.cid} and (f.name='${fos[0].name}' and f.brand='${fos[0].brand}' and f.percent=${fos[0].percent})`;
  for (let i=1; i<fos.length; i++){
    frag_query += ` or (f.name='${fos[i].name}' and f.brand='${fos[i].brand}' and f.percent=${fos[i].percent})`;
  }
  frag_query += ` group by cid having count(*)=${fos.length} intersect select cid from fo f group by cid having count(*)=${waxes.length}`

  let query_string = `(${waxesquery}) intersect (${frag_query});`;
  let matching_cids = await new Promise((resolve, reject) => pool.query(query_string, async (err, res) => {
    if(err){
      reject(err);
    }
    resolve(res.rows);
  }));

  let matching_candles = [];
  for(let i=0; i<matching_cids.length; i++){
    matching_candles.push(await querySingle(matching_cids[i]));
  }
  return matching_candles;
}

module.exports = {queryAll, querySingle, getSimilarCandles};