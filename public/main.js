// key = "AIzaSyBNB7g8Yn6lGfnoBuk7Da-oZ4w9HnD-I14"

var map;

function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 40.658240, lng: -74.476327},
    zoom: 12
  });

  $.get("/api", function(data, status){
    populate(data);
  });

  google.maps.event.addListenerOnce(map, 'idle', function(){
    console.log("south latitude: " + map.getBounds().R.R);
    console.log("north latitude: " + map.getBounds().R.j);
    console.log("east longitude: " + map.getBounds().j.R);
    console.log("west longitude: " + map.getBounds().j.j);
  });

}

$(document).ready(function() {

  $("#newSearch").submit(function(event) {
    console.log( $(this).serializeArray() );

    $.post( "/search", $(this).serializeArray() )
      .done(function( data ) {
        clearMap();
        populate(data);
      });
    event.preventDefault();
  });

});

var heatmap;

function populate (data) {
  var heatmapData = [];
  for (var i = data.length - 1; i >= 0; i--) {
    heatmapData.push(new google.maps.LatLng(data[i].Latitude, data[i].Longitude));
  }

  heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatmapData
  });

  heatmap.setMap(map);
  heatmap.set('radius', 22);
}

function clearMap () {
  heatmap.setMap(null);
  heatmap.getData().j = [];
}
