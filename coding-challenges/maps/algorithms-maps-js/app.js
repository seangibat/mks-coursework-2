var Map = require("./map");

map = new Map();
map.addCity("c1");
map.addCity("c2");
map.addCity("c3");
map.addCity("c4");
map.addCity("c5");
map.addCity("c6");
map.addCity("c7");
map.addCity("c8");
map.addCity("c9");

map.addRoad("c1", "c2", 100);
map.addRoad("c1", "c3", 100);
map.addRoad("c1", "c4", 100);
map.addRoad("c2", "c5", 100);
map.addRoad("c2", "c6", 100);
map.addRoad("c3", "c7", 100);
map.addRoad("c3", "c8", 100);
map.addRoad("c8", "c9", 100);

console.log(map.findPath("c1", "c9"))
// console.log(map.cities);

