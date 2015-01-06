String.prototype.forEach = function(callback){
  this.valueOf().split('').forEach(callback);
};

String.prototype.map = function(callback){
  return this.valueOf().split('').map(callback).join('');
};

String.prototype.filter = function(callback){
  return this.valueOf().split('').filter(callback).join('');
};

String.prototype.reverse = function(){
  return this.valueOf().split('').reverse().join('');
};

Object.prototype.toString = function(){
  // var recurse = function(obj){
  //   var str = "{";
  //   for (var x in obj) {
  //     // if (this.hasOwnProperty(x)){
  //       str += x + ": ";
  //       if (typeof obj[x] === "number"){
  //         str += obj[x];
  //       }
  //       else if (typeof obj[x] === "string"){
  //         str += '"' + obj[x] + '"';
  //       }
  //       else if (typeof obj[x] === "object"){
  //         str += recurse(obj[x])
  //       }
  //       str += ", "
  //     // }
  //   }
  //   str = str.slice(0,str.length-2);
  //   return str + "}";
  // }
  // return recurse(this);
  return JSON.stringify(this);
};

var obj = {hey: "man", what: "up", some: {yo: "sup", hey: 4}};

console.log(obj.toString());

// var str = "hey man what's up lalala"

// str.forEach(function(s){
//   console.log("the letter: " + s);
// });

// var z = str.filter(function(s){
//   return s > "n";
// });

// var y = str.map(function(s){
//   return s + s;
// });

// console.log(y);
// console.log(z)