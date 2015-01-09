var multiplyMatrices = function(a, b){
  if (a.length !== b[0].length)
    return false;

  var result = [];

  for (var row=0; row<a.length; row++){
    for (var col=0; col<b[0].length; col++){
      if (result[row] == undefined)
        result.push([0])
      else
        result[row].push(0);
    } 
  }

  for (var row=0; row<a.length; row++){
    for (var col=0; col<a[row].length; col++){
      for (var bcol=0; bcol<b[0].length; bcol++){
        result[row][bcol] += a[row][col] * b[col][bcol];
      }
    } 
  }

  return result;
};


var a = [[ 0, 3 ],
         [-2, -1],
         [ 0, 4 ]];

var b = [[1, 0, -2],
         [0, 3, -1]];


console.log(multiplyMatrices(a,b));