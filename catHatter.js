function catHatter(arr) {
	for (var spot = 1; spot <= arr.length; spot++)
		for (var x = spot-1; x < arr.length; x+=spot)
			arr[x] = !arr[x];
	return arr;
}

function catHats(amount) {
	var y = [];
	for (var x = 0; x < amount; x++)
		y.push(false);
	return y;
}

catHatter(hundredCatHats(100));