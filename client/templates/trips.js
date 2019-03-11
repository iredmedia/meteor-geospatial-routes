// Subscription handle used in various Template functions.
var handle;
// The Leaflet marker layers related to trips.
var layers = {};
// Default map bounds which encompass Manhattan.
var BOX = {
  ne: {lat: 37.79421395982296, lon: -122.39247544911538},
  sw: {lat: 37.7671468843928, lon: -122.46568902638589}
};

var subscribeWithBounds = function(template, e) {
  // Manually stop subscription if it exists.
  if (handle) {
    handle.stop();
  }

  // Subscribe to all trips currently displayed on the map.
  handle = template.subscribe('trips', getMapBounds(e));
};

Template.trips.onCreated(function() {
  var template = this;

  handle = template.subscribe('trips', BOX);

  template.trips = function() {
    // Always return all documents from the collection. Because minimongo
    // doesn't support $geoWithin we cannot use client side filtering.
    return Trips.find({}, {sort: {name: 1}});
  };
});

Template.trips.onRendered(function() {
  var template = this;

  // Use Leaflet images from bevanhunt:leaflet.
  L.Icon.Default.imagePath = 'packages/bevanhunt_leaflet/images';

  // Render map with default bounds.
  var map = window.map = L.map('map');

  map.on('load', function(e) {
    subscribeWithBounds(template, e);
  });

  map.fitBounds([
      [BOX.sw.lat, BOX.sw.lon], [BOX.ne.lat, BOX.ne.lon]
  ]);

  // Use tiles from the Standard tile layer of OpenStreetMap.
  L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      detectRetina: true
      }).addTo(map);

  // Leaflet event listener for `moveend` event, which is triggered after the
  // map was dragged or zoomed.
  map.on('moveend', function(e) {
    subscribeWithBounds(template, e);
  });

  template.trips().observeChanges({
    added: function(id, trip) {
      var marker = L.geoJson(trip.location, {
        style: function(feature) {
          return {
            color: "black",
            opacity: 1,
            fillColor: "white",
            fillOpacity: 1
          }
        }
      });
      marker.trip = trip;
      marker.trip._id = id;
      marker.on('click', function(e) {
        handleMarkerClick(e);
      });
      marker.addTo(map);
      layers[id] = marker;
    },
    removed: function(id) {
      map.removeLayer(layers[id]);
      delete layers[id];
    }
  });
});

Template.trips.helpers({
  trips: function() {
    var template = Template.instance();
    return template.trips();
  },
  listIsEmpty: function() {
    var template = Template.instance();
    return (template.trips().count() === 0 && handle.ready());
  }
});
