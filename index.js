import { buildTree } from "./build-tree.js";
import { Node } from "./node-class.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let res = buildTree(arr, 0, arr.length-1)
//prettyPrint(res);

class Tree {
  constructor(arr) {
    this.root = buildTree(arr, 0, arr.length-1)
    prettyPrint(this.root);
  }

  insert(data) {
    let node = this.root;//Here node has a reference to this.root. It doesn't create a copy of this.root.
    while(true) {
      if (data == node.data) return;
      if (data > node.data) {
        if (node.right == null) {
          node.right = new Node();
          node.right.data = data;
          break;
        }
        node = node.right;
      } else {
        if (node.left == null) {
          node.left = new Node();
          node.left.data = data;
          break;
        }
        node = node.left;
      }
    }
    prettyPrint(this.root)
  }

  delete(data) {
    let node = this.root;
    if (data == node.data) {
      let newNode = this.getSuccessor(node)
      this.delete(newNode.data);
      node.data = newNode.data;
    } else {
      while(true) {
        if (data > node.data) {
          if (node.right.data == data) {
            if (node.right.right == null && node.right.left == null) {
              node.right = null
              break
            }
            if (node.right.right == null) {
              node.right = node.right.left;
              break
            }
            if (node.right.left == null) {
              node.right = node.right.right
              break
            } else {
              let newNode = this.getSuccessor(node.right)
              this.delete(newNode.data);
              node.right.data = newNode.data
              break
            }
          }
          node = node.right
        } else if (data < node.data) {
          if (node.left.data == data) {
            if (node.left.right == null && node.left.left == null) {
              node.left = null
              break
            }
            if (node.left.right == null) {
              node.left = node.left.left;
              break
            }
            if (node.left.left == null) {
              node.left = node.left.right
              break
            } else {
              let newNode = this.getSuccessor(node.left)
              this.delete(newNode.data);
              node.left.data = newNode.data;
              break;
            }
          }
          node = node.left
        }
      }
    }
    prettyPrint(this.root);
  }
  
  find(data) {
    let node = this.root
    while (true) {
      if (node == null) return null
      if (node.data == data) return node;
      if (data > node.data) {
        node = node.right
      }
      if (data < node.data) {
        node = node.left
      }
    }
  }
  
  getSuccessor(node) {
    let newNode = node.right;
    while (newNode !== null && newNode.left !== null) {
      newNode = newNode.left;
    }
    return newNode;
  }
}

let testArr = [2, 3, 4, 5, 6, 7, 8]
let t = new Tree(testArr);
// t.insert(30);
t.insert(5.5);
// t.delete(8)
// t.delete(2)
t.delete(5)
t.insert(5);
t.delete(3)
let node = t.find(7)
console.log(node)
