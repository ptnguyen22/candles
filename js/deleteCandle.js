const { pool } = require('./db');

async function deleteMain(cid){
  let querystring = `delete from candles where cid=${Number(cid)};`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function deleteWaxes(cid){
  let querystring = `delete from waxes where cid=${Number(cid)};`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function deleteWicks(cid){
  let querystring = `delete from wicks where cid=${Number(cid)};`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function deleteFO(cid){
  let querystring = `delete from fo where cid=${Number(cid)};`;
  const rec = await new Promise((resolve, reject) => pool.query(querystring, async (err, res) => {
    if(err){
      console.log(err);
      reject(err);
    }
    resolve(res.rows);
  }));
  return rec;
}

async function deleteCandle(cid){
  const client = await pool.connect()
  try{
    await client.query('BEGIN');
    const deletecandles = `delete from candles where cid=${Number(cid)};`;
    const candles_res = await client.query(deletecandles);
    const deletewicks = `delete from wicks where cid=${Number(cid)};`;
    const wicks_res = await client.query(deletewicks);
    const deletewaxes= `delete from waxes where cid=${Number(cid)};`;
    const waxes_res = await client.query(deletewaxes);
    const deletefos = `delete from fo where cid=${Number(cid)};`;
    const fo_res = await client.query(deletefos);
    await client.query('COMMIT');
  }
  catch(e) {
    await client.query('ROLLBACK');
    console.log(e);
  } finally {
    client.release();
  }
}

module.exports = { deleteCandle};