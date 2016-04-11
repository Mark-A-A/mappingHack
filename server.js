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

  var formInput = req.body.form;
  var position = req.body.pos
  var searchParams = [];

  searchParams.push({"Latitude": { $gte: position.south, $lte: position.north }});
  searchParams.push({"Longitude": { $gte: position.west, $lte: position.east }});

  for (var key in formInput) {
    if (formInput.hasOwnProperty(key)) {
      console.log("adding the following key to search params: " + key);
      console.log(formInput[key]);
      switch (formInput[key].name) {
        case "Age":
          if (formInput[key].value !== "Age Group") {
            var rangeLow = formInput[key].value.slice(0,2);
            var rangeHi = formInput[key].value.slice(3,5);
            searchParams.push({"Age": { $gte: rangeLow, $lte: rangeHi }});
          }
          break;
        case "Gender":
          if (formInput[key].value === "M" || formInput[key].value === "F") {
            searchParams.push({"Gender": formInput[key].value});
          }
          break;
        case "EducationLevel":
          switch (formInput[key].value) {
            case "High School":
              searchParams.push({"EducationLevel": 1});
              break;
            case "Some College":
              searchParams.push({"EducationLevel": 2});
              break;
            case "Completed College":
              searchParams.push({"EducationLevel": 3});
              break;
            case "Graduate School":
              searchParams.push({"EducationLevel": 4});
              break;
            default:
              // statements_def
              break;
          }
          break;
        default:
          // statements_def
          break;
      }
    }
  }

  var query = Data.find({ $and: searchParams }).limit(20000);
  console.log("Search params are %s", searchParams);
  console.log(searchParams);
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
