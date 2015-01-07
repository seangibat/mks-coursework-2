
var sortedIndices = function(arr){
  var first=arr.length, last=arr.length, highest, current;

  for (var i=0,len=arr.length; i<len; i++){
    for (var n=0; n < i; n++){
      if (arr[n] > arr[i]){
        if (n < first){
          first = n;
        }
        last = i;
      }
    }
  }

  return [first, last];
};

var arr = [1,18,4,7,10,11,7,12,6,7,16,18,19];

var arr2 = [1,2,4,7,10,11,7,12,6,7,16,18,19]


console.log(sortedIndices(arr2))