import { Node } from "./node-class.js";

export function buildTree(arr, start, end) {
    if (start > end) return null;
    let mid = Math.floor((start + end)/2);
    let data = arr[mid];
    let node = new Node();
    node.data = data;
    node.left = buildTree(arr, start, mid - 1)
    node.right = buildTree(arr, mid + 1, end)

    return node;
}