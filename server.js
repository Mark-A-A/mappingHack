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
        case "HomeOwner":
          switch (formInput[key].value) {
            case "Probable Renter":
              searchParams.push({"HomeOwner": "P"});
              break;
            case "Renter":
              searchParams.push({"HomeOwner": "R"});
              break;
            case "Home Owner":
              searchParams.push({"HomeOwner": "Y"});
              break;
            default:
              // statements_def
              break;
          }
          break;
        case "LanguageCode":
          switch (formInput[key].value) {
            case "Arabic":
              searchParams.push({"LanguageCode": "A"});
              break;
            case "Chinese":
              searchParams.push({"LanguageCode": "C"});
              break;
            case "Pashtu":
              searchParams.push({"LanguageCode": "D"});
              break;
            case "French":
              searchParams.push({"LanguageCode": "F"});
              break;
            case "Greek":
              searchParams.push({"LanguageCode": "G"});
              break;
            case "Hindu":
              searchParams.push({"LanguageCode": "H"});
              break;
            case "Italian":
              searchParams.push({"LanguageCode": "I"});
              break;
            case "Japanese":
              searchParams.push({"LanguageCode": "J"});
              break;
            case "Korean":
              searchParams.push({"LanguageCode": "K"});
              break;
            case "German":
              searchParams.push({"LanguageCode": "N"});
              break;
            case "Polish":
              searchParams.push({"LanguageCode": "P"});
              break;
            case "Russian":
              searchParams.push({"LanguageCode": "R"});
              break;
            case "Polish":
              searchParams.push({"LanguageCode": "P"});
              break;
            case "Spanish":
              searchParams.push({"LanguageCode": "S"});
              break;
            case "Thai":
              searchParams.push({"LanguageCode": "T"});
              break;
            case "Portuguese":
              searchParams.push({"LanguageCode": "U"});
              break;
            case "Vietnamese":
              searchParams.push({"LanguageCode": "V"});
              break;
            case "Hebrew":
              searchParams.push({"LanguageCode": "W"});
              break;
            case "Persian":
              searchParams.push({"LanguageCode": "Z"});
              break;
            default:
              // statements_def
              break;
          }
          break;
        case "Income":
          switch (formInput[key].value) {
            case "Under $10K":
              searchParams.push({"Income": "A"});
              break;
            case "$10K-$20K":
              searchParams.push({"HomeOwner": "B"});
              break;
            case "$20K-$30K":
              searchParams.push({"HomeOwner": "C"});
              break;
            case "$30K-$40K":
              searchParams.push({"HomeOwner": "D"});
              break;
            case "$40K-$50K":
              searchParams.push({"HomeOwner": "E"});
              break;
            case "$50K-$60K":
              searchParams.push({"HomeOwner": "F"});
              break;
            case "$70K-$80K":
              searchParams.push({"HomeOwner": "G"});
              break;
            case "$80K-$90K":
              searchParams.push({"HomeOwner": "H"});
              break;
            case "$100K-$150K":
              searchParams.push({"HomeOwner": "K"});
              break;
            case "$150K-$175K":
              searchParams.push({"HomeOwner": "L"});
              break;
            case "$175K-$200K":
              searchParams.push({"HomeOwner": "M"});
              break;
            case "$200K-$250K":
              searchParams.push({"HomeOwner": "N"});
              break;
            case "$250+":
              searchParams.push({"HomeOwner": "O"});
              break;
            default:
              // statements_def
              break;
          }
          break;
        case "Diets":
          switch (formInput[key].value) {
            case "Diets":
              searchParams.push({"Diets": true});
              break;
            case "Does Not Diet":
              searchParams.push({"Diets": false});
              break;
            default:
              // statements_def
              break;
          }
          break;
        case "CasinoGambler":
          switch (formInput[key].value) {
            case "Gambles":
              searchParams.push({"CasinoGambler": true});
              break;
            case "Does Not Gamble":
              searchParams.push({"CasinoGambler": false});
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
