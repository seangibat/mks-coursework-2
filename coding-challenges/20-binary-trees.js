var Node = function(value, parent){
  this.children = [];
  this.parent = parent || null;
  this.value = value;
};

Node.prototype.isLeaf = function(){
  if (this.children.length === 0)
    return true;
  return false;
};

Node.prototype.add = function(value){
  this.children.push(new Node(value, this));
  return this;
};

var Tree = function(value){
  this.root = new Node(value);
};

Tree.prototype.searchDepthFirst = function(val){
  var search = function(node){
    if (node.value === val)
      console.log(val + " found.");
    node.children.forEach(function(child){
      search(child);
    });
  }
  search(this.root);
};

Tree.prototype.breadthFirstTraversal = function(){
  var queue = [this.root];
  for (var i=0; i<queue.length; i++){
    item = queue[i];
    console.log(item.value);
    queue = queue.concat(item.children);
  }
};

Tree.prototype.breadthFirstSearch = function(val){
  var queue = [];
  queue.push(this.root);
  for (var i=0; i<queue.length; i++){
    item = queue[i];
    if (item.value === val)
      console.log(item.value + " found.");
    queue = queue.concat(item.children);
  }
};

/*------------------*/

var getTestTree = function() {
  var tree = new Tree(2);
  var root = tree.root;
  lvl1 = root.add(7).add(5);
  var node7 = lvl1.children[0];

  node7.add(2).add(6).children[1].add(5).add(11);

  var node5 = lvl1.children[1];
  node5.add(9).children[0].add(4);

  return tree;
}

var tree = getTestTree();

tree.breadthFirstTraversal()
tree.breadthFirstSearch(2);

