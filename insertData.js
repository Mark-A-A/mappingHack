var fs = require('fs');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mapping');
var db = mongoose.connection;
var Schema = mongoose.Schema

var personSchema = new Schema({
  Latitude: Number,
  Longitude: Number,
  Age: Number,
  Gender: String,
  EducationLevel: Number,
  HomeOwner: String,
  LanguageCode: String,
  Income: String,
  Diets: Boolean,
  CasinoGambler: Boolean,
  InterestedInSports: Boolean,
  CollectsSportsMemorabilia: Boolean,
  InterestedInMovies: Boolean,
  InterestedInVideoGames: Boolean,
  PlaysVideoGames: Boolean,
  PlaysBoardGames: Boolean,
  InterestedInPhotography: Boolean,
  OwnsSimmingPool: Boolean,
  Travels: Boolean,
  ContributesToAnimalCharities: Boolean,
});

var personData = mongoose.model('personData', personSchema);

var obj = JSON.parse(fs.readFileSync('Union.json', 'utf8'));

personData.collection.insertMany(obj, function(err) {
  if (err) {
    throw err;
  }
  db.close();
});
