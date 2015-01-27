var generateArray = function(n){
  var result = [];

  for (var i=0;i<n;i++){
    result.push(Math.ceil(Math.random()*100))
  }

  return result;
}

var swap = function(array, left, right){
  var temp = array[left];
  array[left] = array[right];
  array[right] = temp;
}

var timeSortFunction = function(n, func) {
  var arr = generateArray(n);
  var time = new Date().getTime();
  func(arr);
  return new Date().getTime() - time;
};

// ------------ //

function quicksort(array, left, right) {
  if (left < right - 1) {
    var pivot = left + right >> 1;
    pivot = partition(array, left, right, pivot);
    quicksort(array, left, pivot);
    quicksort(array, pivot + 1, right);
  }
  return array;
}

function partition(array, left, right, pivot) {
  var pivotValue = array[pivot];
  swap(array, pivot, --right);
  for (var i = left; i < right; ++i) {
    if (array[i] < pivotValue) {
      swap(array, i, left++);
    }
  }
  swap(array, left, right);
  return left;
}

// ------------ //

var qSort = function(array, left, right){
  if (left === undefined){
    left = 0;
    right = array.length-1;
  }


  if (left < right - 1){
    var pivot = Math.ceil((right + left) / 2);
    pivot = qPartition(array, left, right, pivot);
    qSort(array, left, pivot);
    qSort(array, ++pivot, right);
  }
  return array;
}

var qPartition = function(array, left, right, pivot){

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

// ------ //

var mergeSort = function(array){
  if (array.length <= 1) return array;
  var middle = Math.ceil(array.length/2);
  var left = mergeSort(array.splice(0,middle));
  var right = mergeSort(array);
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

// ---- //

var insertionSort = function(array){
  var item;

  for (var i=1, len=array.length; i<len; i++){
    item = array[i];
    if (item < array[i-1]){
      for (var n=0; n<i; n++){
        if (item < array[n]){
          array.splice(i,1);
          array.splice(n,0,item);
          n = i;
        }
      }
    }
  }

  return arr;
};

var insertionSort2 = function(array){
  var i, idx, smallNum, bigNum; 
  for (i = 0; i < array.length; i++) {
    idx = i;
    while(array[idx] > array[idx + 1]) {
      swap(array, idx, idx+1);
      idx--;
    }
  }
  return array
}

// ----- //

var heapify = function(arr){

  console.log(arr);
  var left, right, parent = Math.floor((arr.length-1-1) / 2);

  for (var i=parent; i >= 0; i--){
    left = 2*i+1;
    right = 2*i+2;

    if (arr[left] > arr[i] && arr[left] > arr[right]){
      swap(arr, left, parent);
    }
    else if (arr[right] > arr[parent]){
      swap(arr, right, parent);
    }
  }

  console.log(arr);
};

heapify(generateArray(10));














