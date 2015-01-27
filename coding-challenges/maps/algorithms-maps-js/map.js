var Heap = require('./min-heap.js');

module.exports = function(){
  var cities = {};

  var City = function(value){
    this.name = value;
    this.neighbors = [];
  };

  var addCity = function(value){
    cities[value] = new City(value);
  };

  var findPath = function(c1, c2){
    var currentCity;

    if (c1 === c2) return 0;

    var heap = new Heap(function(a,b){
      return a.distance < b.distance;
    });

    for (var c in cities) {
      if (cities.hasOwnProperty(c)) cities[c].distance = 99999;
    }

    cities[c1].distance = 0;
    heap.insert(cities[c1]);

    while (heap.store.length > 0){
      currentCity = heap.removeTop();

      for (var i=0,len=currentCity.neighbors.length; i<len; i++) {
        var neighbor = currentCity.neighbors[i].city;
        if (currentCity.distance + currentCity.neighbors[i].road < cities[neighbor].distance){
          cities[neighbor].distance = currentCity.distance + currentCity.neighbors[i].road;
          heap.insert(cities[neighbor]);
        }
        if (neighbor === c2) {
          return cities[neighbor].distance;
        }
      }
    }

    return null;
  };

  var addRoad = function(c1, c2, distance){
    cities[c1].neighbors.push({
      city: c2,
      road: distance
    });
    cities[c2].neighbors.push({
      city: c1,
      road: distance
    });
  };
  
  return {
    addCity: addCity,
    findPath: findPath,
    addRoad: addRoad,
    cities: cities
  };
}