var example ="aatttgggaqabcccccdddd";

var compress = function(string){
  var newString, x, holder, count, len;
  for (x=0, newString = "", count=1, len=string.length; x <= len; x++){
    if (holder === string[x])
      count++;
    else {
      newString += (holder ? holder : "") + ((count > 1) ? count : "");
      holder = string[x];
      count = 1;
    } 
  }
  return newString;
}

console.log(compress(example));