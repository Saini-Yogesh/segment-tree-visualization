export function buildSegmentTree(arr, type) {
    const n = arr.length;
    const tree = new Array(4 * n).fill(0);
    const ranges = new Array(4 * n).fill(0).map(() => [0, 0]);

    function build(node, start, end) {
        ranges[node] = [start, end];
        if (start === end) {
            tree[node] = Number(arr[start]);
            return;
        } else {
            const mid = Math.floor((start + end) / 2);
            const leftChild = 2 * node + 1;
            const rightChild = 2 * node + 2;

            build(leftChild, start, mid);
            build(rightChild, mid + 1, end);

            if (type === "sum") {
                tree[node] = Number(tree[leftChild]) + Number(tree[rightChild]);
            } else if (type === "min") {
                tree[node] = Math.min(Number(tree[leftChild]), Number(tree[rightChild]));
            } else if (type === "max") {
                tree[node] = Math.max(Number(tree[leftChild]), Number(tree[rightChild]));
            }
        }
    }

    build(0, 0, n - 1);
    return { tree, ranges };
}