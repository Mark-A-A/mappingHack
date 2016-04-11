// key = "AIzaSyBNB7g8Yn6lGfnoBuk7Da-oZ4w9HnD-I14"

var map;

function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: 40.658240, lng: -74.476327},
//     zoom: 8
//   });

//   $.get("/api", function(data, status){
//     for (var i = data.length - 1; i >= 0; i--) {
//       marker = new google.maps.Marker({
//         position: new google.maps.LatLng(data[i].Latitude, data[i].Longitude),
//         map: map
//       });
//     }
//   });



// testing -------------------------------------------------------------

/* Data points defined as an array of LatLng objects */
var heatmapData = [
  new google.maps.LatLng(37.782, -122.447),
  new google.maps.LatLng(37.782, -122.445),
  new google.maps.LatLng(37.782, -122.443),
  new google.maps.LatLng(37.782, -122.441),
  new google.maps.LatLng(37.782, -122.439),
  new google.maps.LatLng(37.782, -122.437),
  new google.maps.LatLng(37.782, -122.435),
  new google.maps.LatLng(37.785, -122.447),
  new google.maps.LatLng(37.785, -122.445),
  new google.maps.LatLng(37.785, -122.443),
  new google.maps.LatLng(37.785, -122.441),
  new google.maps.LatLng(37.785, -122.439),
  new google.maps.LatLng(37.785, -122.437),
  new google.maps.LatLng(37.785, -122.435)
];

var sanFrancisco = new google.maps.LatLng(37.774546, -122.433523);

map = new google.maps.Map(document.getElementById('map'), {
  center: sanFrancisco,
  zoom: 13,
  mapTypeId: google.maps.MapTypeId.SATELLITE
});

var heatmap = new google.maps.visualization.HeatmapLayer({
  data: heatmapData
});
heatmap.setMap(map);


// -------------------------------------------------------------











}






