// Use Leaflet images from bevanhunt:leaflet.
L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

getMapBounds = function(e) {
  return {
    sw: {
      lat: e.target.getBounds().getSouthWest().lat,
      lon: e.target.getBounds().getSouthWest().lng
    },
    ne: {
      lat: e.target.getBounds().getNorthEast().lat,
      lon: e.target.getBounds().getNorthEast().lng
    }
  };
};

handleMarkerClick = function(e) {
  // The clicker marker layer.
  var layer = e.target;

  console.log(layer);

  // The related DOM element in the trip listing.
  var el = $('.trip[data-mongodb-id=\'' + layer.trip._id + '\']');

  // Show pop up balloon with trip name above marker.
  layer.bindPopup(layer.trip.name).openPopup();

  // Highlight trip in listing.
  $('.trip').removeClass('bg-silver');
  el.addClass('bg-silver');

  // Scroll to the trip related to the clicked marker.
  var offset = el.position().top;
  $('.trips .listing').animate({
    scrollTop: $('.trips .listing').scrollTop() + offset
  }, 1000);
};
