var express = require('express');
var app = express();
var PORT = 3000;

var logger = require('morgan');
var bodyParser = require("body-parser");

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", express.static("public"));



// Note separated out just yet for testing-----------------------------------------------------------

var mongoose = require('mongoose');
var Data = require(__dirname + '/models/dataPt.js');

mongoose.connect('mongodb://localhost/mapping');
var db = mongoose.connection;


app.get("/api", function(req, res){
  var query = Data.find({}).limit(10000);

  query.exec(function (err, data) {
    if (err) {
      throw err;
    }
    res.send(data);
  })
});

app.post("/search", function(req, res){

  // testing-----------------------------
  var formInput = req.body;
  debugger;
  console.log(formInput);
  console.log(formInput.pos);
  var searchParams = [];
  for (var key in formInput) {
    if (formInput.hasOwnProperty(key)) {
      switch (key) {
        case "pos":
          console.log(formInput[key]);
          break;
        case "Age":
          if (formInput[key] !== "Age Group") {
            var rangeLow = formInput[key].slice(0,2);
            var rangeHi = formInput[key].slice(3,5);
            searchParams.push({"Age": { $gte: rangeLow, $lte: rangeHi }});
          }
          break;
        case "Gender":
          if (formInput[key] === "M" || formInput[key] === "F") {
            searchParams.push({"Gender": formInput[key]});
          }
          break;
        default:
          // statements_def
          break;
      }
    }
  }

  if (searchParams.length > 0) {
    var query = Data.find({ $and: searchParams }).limit(1500);
  } else {
    var query = Data.find({}).limit(10000);
  }

  //  ----------------------------------------

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
