const buildHierarchy = (tree, ranges, nodeIndex) => {
  if (nodeIndex >= tree.length || tree[nodeIndex] === 0) return null; // Skip zero values or null nodes

  const [start, end] = ranges[nodeIndex];

  // Build the node object
  const node = {
    name: `${nodeIndex}`,
    value: `${tree[nodeIndex]}`,
    range: `[${start}, ${end}]`,
    children: [],
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
