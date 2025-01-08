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
root.postOrder((node) => console.log(node.data));
