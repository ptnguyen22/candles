const express = require('express');
const app = express();
const path = require('path');
const { pool } = require("./js/db");
const { queryWaxes, queryAll } = require('./js/queryCandle');
const { insertCandle } = require('./js/addCandle')

app.use(express.json());
app.use(express.urlencoded());
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.set("view engine", "ejs");

app.get("/", async function(req, res) {
  let candle = await queryAll();

  res.render(path.join(__dirname, "views/pages/index"),{
    candles: candle
  });
})

app.get("/AddCandle", async function(req, res){
  res.render(path.join(__dirname, "views/pages/newcandle"))
})

app.post("/addtopost", async function(req, res) {
  await insertCandle(req.body);
})
app.listen(3000, async function() {
  
  console.log("Server started on port 3000");
})