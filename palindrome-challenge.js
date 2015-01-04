var palindrome = function(str){
	str = str.replace(/[,\s\.!$?%\&;:\-_]/g,"").toLowerCase();
	return str == str.split('').reverse().join('');
}

var x = "Amy, must I jujitsu my ma?";

console.log(palindrome(x));