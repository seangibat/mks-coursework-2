var isPrime = function(num){
  var root = Math.ceil(Math.sqrt(num));

  if (num === 2)
    return true;
  if (num % 2 == 0)
    return false;

  for (var x=3; x<=root; x+=2)
    if (num % x == 0)
      return false;

  return true;
}

var isFactor = function(num, factor){
  return num % factor == 0;
}

var primeFactor = function(num){
  if (isPrime(num))
    return [num];

  var set = [], root = Math.sqrt(num);

  for (var x=2; x<=root; x+=1){
    if (isFactor(num,x) && isPrime(x)){
      set.push(x);
      return set.concat(primeFactor(num/x));
    }
  }
}

var gcd = function(n1,n2){
  var p1 = primeFactor(n1), p2 = primeFactor(n2), set = [], y=0;

  console.log(p1,p2);

  p1.forEach(function(x){
    y=-1;
    do {
      y++;
      if (x === p2[y])
        set.push(x);
    } while (x !== p2[y] && y < n1)
  });

  console.log(set);


  var total=1;
  set.forEach(function(n){
    total *= n;
  });

  return total;
}

var gcd2 = function(n1,n2){
  var largest = 0;
  
  for (var x=0; x<n1; x++)
    if (n1 % x === 0 && n2 % x === 0 && x > largest)
      largest = x;

  return largest;
}

console.log(primeFactor(60))

console.log(gcd(60,36))
