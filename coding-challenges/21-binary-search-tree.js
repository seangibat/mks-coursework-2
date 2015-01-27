var Node = function(value) {
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
  this.leftDepth = 0;
  this.rightDepth = 0;
};

Node.prototype.getDepth = function(){
  if (this.left)
    this.leftDepth = 1 + (this.left.leftDepth > this.left.rightDepth ? this.left.leftDepth : this.left.rightDepth);
  else
    this.leftDepth = 0;
  if (this.right)
    this.rightDepth = 1 + (this.right.leftDepth > this.right.rightDepth ? this.right.leftDepth : this.right.rightDepth);
  else
    this.rightDepth = 0;
};

Node.prototype.balance = function(){
  var node = this;
  node.getDepth();

  console.log(node);
  
  if (node.rightDepth - node.leftDepth >= 2) {
    if (node.right.leftDepth > node.right.rightDepth){ // right left
      var newRight = node.right.left;
      var oldRight = node.right;
      node.right = newRight;
      oldRight.left = newRight.right;
      newRight.right = oldRight;
      oldRight.parent = newRight;
      newRight.parent = node;
      oldRight.getDepth();
      newRight.getDepth();
    }
    // right right
    var switcher = node.right;
    if (node.parent) node.parent.right = switcher;
    else node.tree.root = switcher;
    switcher.parent = node.parent;
    node.parent = switcher;
    node.right = switcher.left;
    switcher.left = node;
    node.getDepth();
    switcher.getDepth();
    if (switcher.parent) switcher.parent.balance();
  }
  else if (node.leftDepth - node.rightDepth >= 2) {
    if (node.left.rightDepth > node.left.leftDepth){ // left right
      var newLeft = node.left.right;
      var oldLeft = node.left;
      node.left = newLeft;
      oldLeft.right = newLeft.left;
      newLeft.left = oldLeft;
      oldLeft.parent = newLeft;
      newLeft.parent = node;
      oldRight.getDepth();
      newRight.getDepth();
    }
    // left left
    var switcher = node.left;
    if (node.parent) node.parent.left = switcher;
    else node.tree.root = switcher;
    switcher.parent = node.parent;
    node.parent = switcher;
    node.left = switcher.right;
    switcher.right = node;
    node.getDepth();
    switcher.getDepth();
    if (switcher.parent) switcher.parent.balance();
  }
  else {
    if (node.parent) node.parent.balance();
  }

};

var BinaryTree = function(value) {
  this.root = new Node(value);
  this.root.tree = this; 
};

BinaryTree.prototype.insert = function(value) {
  var node = this.root, newNode = new Node(value);

  newNode.tree = this;

  while (true) {
    if (value === node.value) return this;
    if (value > node.value && node.right) node = node.right;
    if (value > node.value && !node.right) {
      node.right = newNode;
      newNode.parent = node;
      node.balance();
      return this;
    }
    if (value < node.value && node.left) node = node.left;
    if (value < node.value && !node.left) {
      node.left = newNode;
      newNode.parent = node;
      node.balance();
      return this;
    }
  }
}


BinaryTree.prototype.search = function(value) {
  var node = this.root;

  while (true) {
    if (value === node.value) return node;
    if (value > node.value && node.right) node = node.right;
    if (value > node.value && !node.right) return null;
    if (value < node.value && node.left) node = node.left;
    if (value < node.value && !node.left) return null;
  }
}

// BinaryTree.prototype.insertArray = function(arr) {
//   var _this = this;
//   arr.forEach(function(item){
//     _this.insert(item);
//   });
//   return this;
// }
// BinaryTree.prototype.remove = function(value) {
//   var node = this.search(value), newNode;

//   while (node) {
//     if (node.left) {
//       newNode = node.left;
//       newNode.right = node.right;
//       if (node.side === "left") {
//         node.parent.left = newNode;
//       }
//       else if (node.side === "right") {
//         node.parent.right = newNode;
//       }
//     }
//     else if (node.right) {
//       newNode = node.left;
//       newNode.right = node.right;
//       if (node.side === "left") {
//         node.parent.left = newNode;
//       }
//       else if (node.side === "right") {
//         node.parent.right = newNode;
//       }
//     }
//     else {
//       if (node.side === "left")
//         node.parent.left = null;
//       else
//         node.parent.right = null;
//     }
//   }

//   return false;
// }

var tree = new BinaryTree(10);

tree.insert(7).insert(5).insert(12).insert(14).insert(13);


console.log(tree);

