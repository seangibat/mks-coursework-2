function swap(array, left, right){
  var temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

function quicksort(array, left, right) {
  // console.log("**quicksort: ", "left: ", left, "right: ", right);
  if (left < right - 1) {
    var pivot = left + right >> 1;
    pivot = partition(array, left, right, pivot);
    // quicksort(array, left, pivot);
    // quicksort(array, pivot + 1, right);
  }
  // console.log("qs: ", array);
  return array;
}

function partition(array, left, right, pivot) {
  console.log("--begin: left: ", left, " right: ", right, " pivot: ", pivot, " pivotValue: ", array[pivot]);
  console.log("--begn:", array);

  var pivotValue = array[pivot];
  swap(array, pivot, --right);
  console.log("pswap", array);

  for (var i = left; i < right; ++i) {
    console.log("- i l ---------------------------")
    console.log("s", i, left, array);
    if (array[i] < pivotValue) {
      swap(array, i, left++);
    }
    console.log("f", i, left, array);
  }

  swap(array, left, right);
  
  console.log("--end:", array);
  console.log("--end: left: ", left, " right: ", right, " pivot: ", pivot);
  return left;
}

var arr = [10,3,6,1,5,4,2,8]

var m = quicksort(arr, 0, arr.length);

console.log(m);