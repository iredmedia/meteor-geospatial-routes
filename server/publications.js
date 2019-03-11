Meteor.publish('trips', function(box) {
  check(box, {
    sw: {
      lat: Number,
      lon: Number
    },
    ne: {
      lat: Number,
      lon: Number
    }
  });

  return Trips.find({
    "location.coordinates": {
      $geoWithin: {
        $box: [
          [box.sw.lon, box.sw.lat],
          [box.ne.lon, box.ne.lat]
        ]
      }
    }
  });
});
