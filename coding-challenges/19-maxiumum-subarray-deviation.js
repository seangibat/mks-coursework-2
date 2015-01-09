var process = function(arr, n){
  var store = {}, largestDifference=Math.abs(arr[0]-arr[1]), difference;

  for (var i=0;i<arr.length;i++){
    for (var m=i+1; m<i+n && m<arr.length; m++){
      difference = Math.abs(arr[i] - arr[m]);
      if (difference>largestDifference)
        largestDifference = difference;
    }
  }

  return largestDifference;
};


var array = [1,2,10,5,3];
var answer = process(array, 3);

console.log(answer);