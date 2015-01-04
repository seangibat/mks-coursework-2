var forEach = function(arr, callback){
  var len = arr.length;
  for (var x=0; x<len; x++)
    callback(arr[x]);
}

var map = function(arr, callback){
  var newArr = [];
  forEach(arr, function(element){
    newArr.push(callback(element));
  });
  return newArr;
}


var arr = [1,2,3,4];

forEach(arr, function(el){
  console.log(el);
});

console.log(map(arr,function(el){
  return el*2;
}));