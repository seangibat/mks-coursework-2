exports.uid = function(n){
  var str = "";

  for (var i=0; i<n; i++){
    str += Math.floor(Math.random()*10);
  }

  return str;
}