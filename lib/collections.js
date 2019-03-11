Trips = new Mongo.Collection('trips');

if (Meteor.isServer) {
  Meteor.startup(function () {
    Trips._ensureIndex({
      'location': '2dsphere'
    });
  });
}
