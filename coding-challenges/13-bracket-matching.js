var queuer = function(str){
  var queue = [], x;
  var arr = str.split('');
  for (var i=0,len=arr.length; i<len; i++){
    char = arr[i];
    console.log(queue);
    if (char === "{" || char === "(")
      queue.push(char);
    else if (char === "}") {
      if (queue.length === 0 || queue.pop(char) !== "{")
        return "No closing )";
    }
    else if (char === ")") {
      if (queue.length === 0 || queue.pop(char) !== "(")
        return "No closing }";
    }
  }
  if (queue.length === 0)
    return true;
  else
    return false;
};

var x = queuer("{h(ey( ) man)(sup)}");

console.log(x)