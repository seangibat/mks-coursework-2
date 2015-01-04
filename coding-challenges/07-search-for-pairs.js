var searchPairs = function(array){
  var obj = { }, diff, pairs=[];

  array.forEach(function(num){
    diff = 1000-num;
    if (obj[diff] !== undefined) {
      pairs.push(num + ", " + diff);
    }
    obj[num] = true;
  });

  return pairs;
}

var array = [10, 20, 30, 50, 100, 970, 500, 980, 990]

console.log(searchPairs(array));

exports.pairs = searchPairs;