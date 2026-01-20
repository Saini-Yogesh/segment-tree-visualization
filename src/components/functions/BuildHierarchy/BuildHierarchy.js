const buildHierarchy = (tree, ranges, nodeIndex) => {
  // ✅ Skip nodes where the range is exactly [0, 0] (invalid range)
  if (nodeIndex >= tree.length || (ranges[nodeIndex][0] === 0 && ranges[nodeIndex][1] === 0 && tree[nodeIndex] === 0 && nodeIndex !== 0)) {
    return null;
  }

  const [start, end] = ranges[nodeIndex];

  // Build the node object
  const node = {
    name: `${nodeIndex}`,
    value: `${tree[nodeIndex]}`,
    range: `[${start}, ${end}]`,
    children: [],
    lazy: 0,
  };

  // Recursively build left and right children
  const leftChild = buildHierarchy(tree, ranges, 2 * nodeIndex + 1);
  const rightChild = buildHierarchy(tree, ranges, 2 * nodeIndex + 2);

  // Only add non-null children
  if (leftChild) node.children.push(leftChild);
  if (rightChild) node.children.push(rightChild);

  return node;
};

export default buildHierarchy;
