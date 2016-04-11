var express = require('express');
var app = express();
var PORT = 3000;

var logger = require('morgan');

app.use(logger('dev'));
app.use("/", express.static("public"));



// Note separated out just yet for testing-----------------------------------------------------------
var mongoose = require('mongoose');
var Data = require(__dirname + '/models/dataPt.js');

mongoose.connect('mongodb://localhost/mapping');
var db = mongoose.connection;


app.get("/api", function(req, res){
  var query = Data.find({}).limit(1000);

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
