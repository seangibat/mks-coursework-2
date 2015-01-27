/**
*
* Generic heap.
* Takes a compare function in the constructor.
* Can therefore be used for max or min heaps.
*
*/


var Heap = function(compare){
  this.store = [];
  this.compare = compare;
};

Heap.prototype.heapify = function(index){
  var len = this.store.length-1, left, right, chosen = index;

  left = 2 * index + 1;
  right = 2 * index + 2;

  if (left <= len && this.compare(this.store[left], this.store[index]))
    chosen = left;
  if (right <= len && this.compare(this.store[right], this.store[chosen]))
    chosen = right;

  if (chosen !== index) {
    var temp = this.store[index];
    this.store[index] = this.store[chosen];
    this.store[chosen] = temp;
    this.heapify(chosen);
  }
}

Heap.prototype.heapAll = function(){
  for (var i=Math.floor(this.store.length/2);i>=0;i -= 1){
    this.heapify(i);
  }
}

Heap.prototype.insert = function(value){
  this.store.push(value);

  this.heapAll();

  return this;
};

Heap.prototype.removeTop = function(){
  if (this.store.length == 1) return this.store.pop();
  var top = this.store[0];
  this.store[0] = this.store.pop();
  this.heapify(0);
  return top;
};

module.exports = Heap;