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
  return await new Promise((resolve, reject) => {
    pool.query(query, (err, res) =>{
      if(err){
        console.log(err);
        resolve(0);
      }
      resolve(1);
    })
  })
}

async function addWick(cid, type, size, num){
  let query = `insert into wicks values (${cid}, '${type}', '${size}', ${num})`;
  return await new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
      if(err){
        console.log(err);
        resolve(0);
      }
      resolve(1);
    })
  })
}

async function addFO(cid, name, brand, percent){
  let query = `insert into fo values (${cid}, '${name}', '${brand}', ${percent})`;
  return await new Promise((resolve, reject) => {
    pool.query(query, (err, res) => {
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
  let waxes = [];
  if(Array.isArray(data.waxtype)){
    for(let i=0; i<data.waxtype.length; i++){
      let res = await addWax(cid, data.waxtype[i], data.waxbrand[i], data.waxpercent[i]);
      if(!res){
        console.log("ERROR ADDING WAX")
        break;
      }
    }
  }
  else {
    await addWax(cid, data.waxtype, data.waxbrand, data.waxpercent);
  }

  if(Array.isArray(data.wicktype)){
    for(let i=0; i<data.wicktype.length; i++){
      let res = await addWick(cid, data.wicktype[i], data.wicksize[i], data.wicknum[i]);
      if(!res){
        console.log("ERROR ADDING WICKS");
        break;
      }
    }
  }
  else{
    await addWick(cid, data.wicktype, data.wicksize, data.wicknum);
  }

  if(Array.isArray(data.fragrancename)){
    for(let i=0; i<data.fragrancename.length; i++){
      let res = await addFO(cid, data.fragrancename[i], data.fragrancebrand[i], data.fragrancepercent[i]);
      if(!res){
        console.log("ERROR ADDING FO");
        break;
      }
    }
  }
  else{
    await addFO(cid, data.fragrancename, data.fragrancebrand, data.fragrancepercent);
  }
}

module.exports = { insertCandle }