var gCd = function(n1,n2){
  var greatest, lowestN=(n1>n2) ? n2 : n1;
  for (var x=1;x<lowestN;x++)
    if (n1%x===0 && n2%x===0)
      greatest = x;
  return greatest;
}



x = gCd(140,1204162)

console.log(x)