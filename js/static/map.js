//  KARTE **********************************************************************
var scaleFactor = .8;
var map;
function setup(zero_x, zero_y, width, height, opacity) {
  map = L.map('mapid', {
    crs: L.CRS.Simple,
    minZoom: -5.5, // -5.5       -10
    maxZoom: 1.25, // 2        4
    zoomDelta: .25,
    zoomSnap: 0
    //center: [39.73, 104.99],
    //zoom: -1,
    //maxBounds: [[0,0], [800,1200]],
    //maxBoundsViscosity: 1.0
    //fullscreenControl: false
  });

  // STARTBOUNDS
  var start_zero_x = zero_y; // !ACHTUNG! SWITCH HIER STATT XY
  var start_zero_y = zero_x; // !ACHTUNG! SWITCH HIER STATT XY
  var start_width = height; // !ACHTUNG! SWITCH HIER STATT XY
  var start_height = width; // !ACHTUNG! SWITCH HIER STATT XY

  start_zero_x*=scaleFactor;
  start_zero_x*=scaleFactor;
  start_width*=scaleFactor;
  start_height*=scaleFactor;

  start_width+=start_zero_x;
  start_height+=start_zero_y;

  var start_zero = [start_zero_x, start_zero_y];
  var start_size = [start_width, start_height];
  var startBounds = [[start_zero],[start_size]];

  opacity/=100;
  var helper = L.imageOverlay('././style/icons/marker/boundaries.svg', startBounds).addTo(map).setOpacity(opacity); //0.1

  map.fitBounds(startBounds);
}
