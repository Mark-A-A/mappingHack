var fs = require('fs');
var mongoose = require('mongoose');

var async = require('async');
var calls = [];

mongoose.connect('mongodb://localhost/mapping');
var db = mongoose.connection;

var personData = require(__dirname + '/models/dataPt.js');

var pathToData = 'C:/Users/Alexg2195/Desktop/HackathonV12/data/NJ/';

MaxFileSize = 268435440; // In Bytes

fs.readdir(pathToData, function(err,files){
  console.log("Setting up files to be loaded");
  if(err) throw err;
  files.forEach(function(file){
    calls.push(function(callback) {
      var stats = fs.statSync(pathToData + file);
      var fileSizeInBytes = stats["size"];
      if (fileSizeInBytes < MaxFileSize) {
        var obj = JSON.parse(fs.readFileSync(pathToData + file, 'utf8'));
        personData.collection.insertMany(obj, function(err) {
          if (err) {
            callback(err);
          }
          console.log(file + " Inserted!");
          callback(null, file);
        });
      } else {
        console.log("File '" + file + "' is too large! Will not be inserted...");
        callback(null, null);
      }
    });
  });

  async.series(calls, function(err, result) {
    db.close();
    if (err) {
      return console.log(err);
    }
    console.log(result);
    console.log("The above was inserted into the DB");
    console.log("Please change directory to next folder");
  });

 });
