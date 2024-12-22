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
          node.right.right = null;
          node.right.left = null;
          break;
        }
        node = node.right;
      } else {
        if (node.left == null) {
          node.left = new Node();
          node.left.data = data;
          node.left.right = null;
          node.left.left = null;
          break;
        }
        node = node.left;
      }
    }
    prettyPrint(this.root)
  }
}

let t = new Tree(arr);
t.insert(30);
t.insert(10);