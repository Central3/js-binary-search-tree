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

  function insert(val) {
    const newNode = Node(val);

    let parent = null;
    let curr = root;

    while (curr !== null) {
      parent = curr;
      if (val < curr.data) curr = curr.left;
      else if (val > curr.data) curr = curr.right;
      else return;
    }

    if (val < parent.data) parent.left = newNode;
    else parent.right = newNode;
  }

  function deleteItem(val) {
    let curr = root;
    let parent = null;

    if (curr === null) return;

    while (curr && curr.data !== val) {
      parent = curr;
      if (val < curr.data) curr = curr.left;
      else curr = curr.right;
    }

    if (curr.left === null || curr.right === null) {
      let newCurr = curr.left ? curr.left : curr.right;

      if (parent.left === curr) parent.left = newCurr;
      else parent.right = newCurr;
    } else {
      let p = null;
      let temp = curr.right;

      while (temp.left !== null) {
        p = temp;
        temp = temp.left;
      }

      if (p) p.left = temp.right;
      else curr.right = temp.right;

      curr.data = temp.data;
    }
  }

  function find(val) {
    let curr = root;

    if (curr === null) return;

    while (curr) {
      if (curr.data > val) {
        curr = curr.left;
      } else if (curr.data < val) {
        curr = curr.right;
      } else {
        return curr;
      }
    }

    return null;
  }

  function levelOrderIter(callbk) {
    if (!callbk || typeof callbk !== "function")
      throw new Error("callback is required");

    if (!root) return;

    let curr = root;
    const queue = [];
    queue.push(curr);

    while (queue.length !== 0) {
      const currNode = queue.shift();
      callbk(currNode);
      if (currNode.left) queue.push(currNode.left);
      if (currNode.right) queue.push(currNode.right);
    }
  }

  function levelOrderRecur(callbk) {
    if (!callbk || typeof callbk !== "function")
      throw new Error("Callback is required");

    if (!root) return;

    function traverseLevel(nodes) {
      if (nodes.length === 0) return;

      const nextLevel = [];
      nodes.forEach((node) => {
        callbk(node);
        if (node.left) nextLevel.push(node.left);
        if (node.right) nextLevel.push(node.right);
      });

      traverseLevel(nextLevel);
    }

    traverseLevel([root]);
  }

  function inOrder(callbk) {
    if (!callbk || typeof callbk !== "function")
      throw new Error("callback is required");

    if (!root) return;

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callbk(node);
      traverse(node.right);
    }

    traverse(root);
  }

  function preOrder(callbk) {
    if (!callbk || typeof callbk !== "function")
      throw new Error("callback is required");

    if (!root) return;

    function traverse(node) {
      if (!node) return;
      callbk(node);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(root);
  }

  function postOrder(callbk) {
    if (!callbk || typeof callbk !== "function")
      throw new Error("callback is required");

    if (!root) return;

    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callbk(node);
    }

    traverse(root);
  }

  function height(root) {
    if (!root) return 0;

    let height = 0;
    const queue = [root];

    while (queue.length !== 0) {
      let levelSize = queue.length;

      for (let i = 0; i < levelSize; i++) {
        const front = queue.shift();
        if (front.left) queue.push(front.left);
        if (front.right) queue.push(front.right);
      }

      height++;
    }

    return height - 1;
  }

  function depth(val) {
    let depthCount = 0;
    let curr = root;

    while (curr) {
      if (val < curr.data) curr = curr.left;
      else if (val > curr.data) curr = curr.right;
      else if (val === curr.data) return depthCount;
      depthCount++;
    }

    return -1;
  }

  function isBalanced() {
    const lHeight = height(root.left);
    const rHeight = height(root.right);

    return Math.abs(lHeight - rHeight) < 2;
  }

  function rebalance() {
    const nodes = [];
    inOrder((node) => nodes.push(node));
    buildTree(nodes);
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrderIter,
    levelOrderRecur,
    inOrder,
    preOrder,
    postOrder,
    height,
    isBalanced,
    rebalance,
    depth,
  };
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
root.insert(2);
prettyPrint(root.root);
console.log(root.depth(2));
