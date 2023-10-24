const express = require('express');
const app = express();
const path = require('path');
const { pool } = require("./js/db");
const { queryWaxes, queryAll } = require('./js/queryCandle');

app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.set("view engine", "ejs");

app.get("/", async function(req, res) {
  let candle = await queryAll();
  // let candlesarray = [];
  // candle.cids.forEach((cid) => {
  //   let waxes = candle.waxes.filter((ele) => ele.cid === cid.cid);
  //   let wicks = candle.wicks.filter((ele) => ele.cid === cid.cid);
  //   let obj = {
  //     cid: cid.cid,
  //     waxes: waxes,
  //     wicks: wicks
  //   }
  //   candlesarray.push(obj);
  // })
  // console.log(candlesarray[0]);
  console.log(candle[0]);
  res.render(path.join(__dirname, "views/pages/index"),{
    candles: candle
  });
})

app.get("/AddCandle", async function(req, res){
       res.render(path.join(__dirname, "views/pages/newcandle"))
})

app.listen(3000, async function() {
  
  console.log("Server started on port 3000");
})