# Meteor Geospatial Demo

MongoDB's geospatial features make it pretty easy to build a Meteor application
with location based services. This demo shows a
[Leaflet](http://leafletjs.com/)-powered map and a text based listing of
trips, with reactive behavior when the map is updated (dragged, zoomed,
etc.). Using MongoDB's `$geoWithin` geospatial operator (which only works on the
server, *not* with `minimongo`) a trips subscription is created based on
the current GPS bounds of the map.

![Meteor Geospatial Demo (screenshot)](https://i.imgur.com/aBRrlVI.jpg)

## Installation & usage

Install Meteor if haven't done so already:
```
$ curl https://install.meteor.com/ | sh
```
Clone the repository:
```
$ git clone git@github.com:iredmedia/meteor-geospatial-routes.git
```
Change the working directory and run Meteor:
```
$ cd meteor-geospatial-routes
$ meteor
```
Visit the demo at [http://localhost:3000](http://localhost:3000).

## Original project

The original project was at [Meteor Geospatial demo](https://github.com/dstotijn/meteor-geospatial-demo)

### Whats changed

In order to get geospatial queries working with MongoDB, 
we changed some keys in our colelctions and publications:

1. In collections.js, we us `location` as key instead of `location.coordinates`
2. In publications.js, we use `location.coordinates` instead of `location`.

### Whats next 

#### Generalized trip formation
- [x] Switch to use Linestring
- [ ] Integrate [Mapbox Directions](https://docs.mapbox.com/help/how-mapbox-works/directions/) to create a trip
- [ ] Use [Mapbox Map Matching API](https://docs.mapbox.com/help/glossary/mapbox-map-matching-api/) to make pretty trips
- [ ] Allow GPS data to create a trip

### Real world use case
- [ ] Mobile app to create trip from GPS data

## License

[MIT](/LICENSE.md)
