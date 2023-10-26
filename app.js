const express = require('express');
const { pool } = require("./js/db");
const { queryAll } = require('./js/queryCandle');
const { insertCandle } = require('./js/addCandle')
const { deleteCandle } = require('./js/deleteCandle');

const app = express();
const path = require('path');

//To parse req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Bootstrap
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));

app.use(express.static(path.join(__dirname, 'views'))); //ejs files
app.use(express.static(path.join(__dirname, 'static'))); //static files

app.set("view engine", "ejs");

//Home page
app.get("/", async function(req, res) {
  let candle = await queryAll();
  res.render(path.join(__dirname, "views/pages/index"),{
    candles: candle
  });
})

//Page to add new candle
app.get("/AddCandle", async function(req, res){
  res.render(path.join(__dirname, "views/pages/newcandle"))
})

//Process add new candle form data to add to db
app.post("/addtopost", async function(req, res) {
  await insertCandle(req.body);
})

//delete candle endpoint
app.post("/deletecandle", async function(req, res){
  await deleteCandle(req.body.cid);
  res.redirect('back');
})
app.listen(3000, async function() {
  
  console.log("Server started on port 3000");
})