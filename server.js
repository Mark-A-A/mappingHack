var express = require('express');
var app = express();
var PORT = 3000;

var logger = require('morgan');
var bodyParser = require("body-parser");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static("public"));



// Note separated out just yet for testing-----------------------------------------------------------
var mongoose = require('mongoose');
var Data = require(__dirname + '/models/dataPt.js');

mongoose.connect('mongodb://localhost/mapping');
var db = mongoose.connection;


app.get("/api", function(req, res){
  var query = Data.find({ 'Income': 'O' }).limit(3000);

  query.exec(function (err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  })
});

app.post("/search", function(req, res){
  console.log(req.body);
  var formInput = req.body;

  var query = Data.find(req.body).limit(1500);

  query.exec(function (err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  })
});

//-----------------------------------------------------------------------------------------------------




app.listen(PORT, function () {
  console.log('App listening on port %s!', PORT);
});
