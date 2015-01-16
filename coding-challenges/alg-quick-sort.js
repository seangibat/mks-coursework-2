function swap(array, left, right){
  var temp = arr[left];
  arr[left] = arr[right];
  arr[right] = temp;
}

var arr = [10,3,6,1,5,4,1,4,2,8]

var qSort = function(array, left, right){
  if (left === undefined){
    left = 0;
    right = array.length-1;
  }

  if (left < right - 1){
    var pivot = Math.ceil((right + left) / 2);
    pivot = qPartition(array, left, right, pivot);
    qSort(array, pivot, right);
    qSort(array, left, --pivot);
  }
  return array;
}


var qPartition = function(array, left, right, pivot){
  console.log(array, left, right, pivot);

  var pivotValue = array[pivot];
  swap(array, pivot, right);

  for (var i=left; i<right; i++){
    if (array[i] < pivotValue){
      swap(array, left++, i);
    }
  }

  swap(array, left, right);

  return left;
}

console.log("quicksort: " + qSort(arr))






var mergeSort = function(array){
  if (array.length <= 1) return array;
  var middle = Math.ceil(array.length/2);
  var left = mergeSort(array.slice(0,middle));
  var right = mergeSort(array.slice(middle,array.length));
  var result = merge(left, right);
  return result;
}

var merge = function(left, right){
  var result = [], l=0, r=0;

  while (l < left.length || r < right.length){
    if (l < left.length && r < right.length){
      if (left[l] < right[r])
        result.push(left[l++]);
      else
        result.push(right[r++]);
    }
    else if (l < left.length)
      result.push(left[l++]);
    else if (r < right.length)
      result.push(right[r++]);
  }

  return result;
}

console.log("merge sort: " + mergeSort(arr));






var bubbleSort = function(array){
  var swapp=true;
  while (swapp){
    swapp = false;
    for (var i=1; i<array.length; i++){
      if (array[i-1] > array[i]){
        swap(array, i, i-1);
        swapp = true;
      }
    }
  }
  return array;
}

console.log("bubble: " + bubbleSort(arr));

































