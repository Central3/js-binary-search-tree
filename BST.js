function Node(data) {
  let left = null;
  let right = null;

  return { data, left, right };
}

function buildTree(arr) {
  if (arr.length - 1 < 0) return null;
  const mid = Math.floor((0 + arr.length - 1) / 2);

  const root = Node(arr[mid]);
  root.left = buildTree(arr.slice(0, mid));
  root.right = buildTree(arr.slice(mid + 1));

  return root;
}

function Tree(arr) {
  arr = [...new Set(arr)].sort((a, b) => a - b);
  const root = buildTree(arr);
  return root;
}

function preOrder(root) {
  if (root === null) return;
  console.log(root.data);
  preOrder(root.left);
  preOrder(root.right);
}

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

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const root = Tree(arr);
// preOrder(root);
prettyPrint(root);
