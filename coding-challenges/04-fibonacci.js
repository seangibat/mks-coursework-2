var fib = function(n){
  var high=1,low=0, holder;
  for (var x = 0; x < n; x++){
    holder = high;
    high += low
    low = holder;
  }
  return low;
}

var fibRecursive = function(n,high,low){
  if (!(high))
    var high=1,low=0;
  return (n==0) ? low : fibRecursive(n-1,high+low,high)
}

var fibList = function(n){
  var arr = [], latestFib=0;
  for (var x=0;latestFib < n;x++){
    latestFib = fibRecursive(x);
    if (latestFib < n)
      arr.push(latestFib);
  }
  return arr;
}

console.log(fibRecursive(7))

console.log(fibList(100))

fibRecursive(2)