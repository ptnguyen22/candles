const express = require('express');
const { pool } = require("./js/db");
const multer = require("multer");
const fs = require('fs');
const upload = multer({
  dest: "imageUploads/" // "uploads"
});
const { promisify } = require('util')
const readdir = promisify(require('fs').readdir)
const stat = promisify(require('fs').stat)

const { queryAll, querySingle } = require('./js/queryCandle');
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

app.use(express.static(path.join(__dirname, 'views'))); //pages
app.use(express.static(path.join(__dirname, 'static'))); //static files
app.use(express.static(path.join(__dirname, 'imageUploads')));

app.set("view engine", "ejs");

//Home page
app.get("/", async function(req, res) {
  let candle = await queryAll();
  res.render(path.join(__dirname, "views/pages/index"),{
    candles: candle
  });
})

//Page to add new candle
app.get("/AddCandle", function(req, res){
  res.render(path.join(__dirname, "views/pages/newcandle"))
})

app.get("/ViewCandle", async function (req, res){
  let filenames = await readdir(path.join(__dirname, "imageUploads"));
  let cid = req.query.cid;
  console.log(`CID: ${cid}`);
  let candle = await querySingle({cid: cid});

  const image_found = filenames.filter(str => str.includes(`${cid}_candle`));
  let image_url;
  if(image_found.length){
    image_url = `./${image_found[0]}`;
  }
  else{
    image_url = "./default_candle.jpeg";
  }
  candle.image = image_url;
  console.log(image_url);
  console.log(candle);
  res.render(path.join(__dirname, "views/pages/candleview"),
  {
    candle: candle
  });
})

//endpoint to upload image
app.post("/uploadImage", upload.single("filename"), async function(req, res){
  let cid = req.query.cid;
  console.log("trying to upload image");
  let filenames = await readdir(path.join(__dirname, "imageUploads"));
  const image_found = filenames.filter(str => str.includes(`${cid}_candle`));
  fs.unlink('imageUploads/'+image_found[0], (err) => {
    if (err) throw err;
    console.log(`${image_found[0]} was deleted`);
  });
  
  const tempPath = req.file.path;
  const file_ext = path.extname(req.file.originalname).toLowerCase();
  const targetPath = path.join(__dirname, `imageUploads/${cid}_candle${file_ext}`);

  fs.rename(tempPath, targetPath, err => {
    if (err) return handleError(err, res);

    res
      .status(200)
      .contentType("text/plain")
      .redirect('/ViewCandle?cid='+cid);
  });
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