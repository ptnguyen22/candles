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
  console.log("RET>ROWS")
  console.log(ret.rows);
  if(!ret.rows) {
    return [];
  }
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
  if(!cid) {
    return
  }
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

async function searchForCandle(str){
  let waxes_query = `select cid from waxes w where '${str}' like '%'||w.type||'%' or '${str}' like '%'||w.brand||'%';`
  let waxes_found = await new Promise((resolve, reject) => pool.query(waxes_query, async (err, res) => {
    if(err){
      reject(err);
    }
    resolve(res.rows);
  }));
  let waxes_matches = [];
  if(waxes_found){
    let promises = waxes_found.map((cid) => {
      return querySingle(cid);
    });
    waxes_matches = await Promise.all(promises);
  }
  let wicks_query = `select cid from wicks w where '${str}' like '%'||w.type||'%' or '${str}' like '%'||w.size||'%';`
  let wicks_found = await new Promise((resolve, reject) => pool.query(wicks_query, async (err, res) => {
    if(err){
      reject(err);
    }
    resolve(res.rows);
  }));
  let wicks_matches = [];
  if(wicks_found){
    let promises = wicks_found.map((cid) => {
      return querySingle(cid);
    });
    wicks_matches = await Promise.all(promises);
  }
  let all = waxes_matches.concat(wicks_matches);
  return all;
}
module.exports = {queryAll, querySingle, getSimilarCandles, searchForCandle};