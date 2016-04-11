var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
module.exports = personData;
