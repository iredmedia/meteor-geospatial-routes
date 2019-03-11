// Insert trip fixtures if the Trips collection is empty.
Meteor.startup(function() {
  if (Trips.find().count() === 0) {
    var tripFixtures = JSON.parse(
        Assets.getText('fixtures/trips.json'));

    _.each(tripFixtures, function(trip) {
      Trips.insert(trip);
    });
  }
});
