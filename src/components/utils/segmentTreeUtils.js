export function buildSegmentTree(arr, type) {
    const n = arr.length;
    const tree = new Array(4 * n).fill(0);
    const ranges = new Array(4 * n).fill(0).map(() => [0, 0]);

    function build(node, start, end) {
        ranges[node] = [start, end];
        if (start === end) {
            tree[node] = Number(arr[start]);
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const left = 2 * node + 1;
        const right = 2 * node + 2;

        build(left, start, mid);
        build(right, mid + 1, end);

        if (type === "sum") tree[node] = tree[left] + tree[right];
        else if (type === "min") tree[node] = Math.min(tree[left], tree[right]);
        else tree[node] = Math.max(tree[left], tree[right]);
    }

    build(0, 0, n - 1);
    return { tree, ranges };
}