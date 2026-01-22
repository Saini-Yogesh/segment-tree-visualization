export const AllCodes = {
    completeCode: `#include <bits/stdc++.h>
using namespace std;

class SGTree
{
public:
    vector<int> seg;

    SGTree(int n)
    {
        seg.assign(4 * n, 0);
    }

    // Build the segment tree
    void build(int idx, int l, int r, const vector<int> &arr)
        {
        if (l == r)
        {
            seg[idx] = arr[l];
            return;
        }

        int mid = (l + r) / 2;

        build(2 * idx + 1, l, mid, arr);
        build(2 * idx + 2, mid + 1, r, arr);

        seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2];
    }

    // Point update
    void pointUpdate(int idx, int l, int r, int pos, int val)
        {
        if (l == r)
        {
            seg[idx] += val;
            return;
        }

        int mid = (l + r) / 2;

        if (pos <= mid)
            pointUpdate(2 * idx + 1, l, mid, pos, val);
        else
            pointUpdate(2 * idx + 2, mid + 1, r, pos, val);

        seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2];
    }

    // Range sum query
    int query(int idx, int l, int r, int ql, int qr)
        {
        if (qr < l || r < ql)
            return 0;

        if (ql <= l && r <= qr)
            return seg[idx];

        int mid = (l + r) / 2;

        int left = query(2 * idx + 1, l, mid, ql, qr);
        int right = query(2 * idx + 2, mid + 1, r, ql, qr);

        return left + right;
    }
};

int main()
{
    vector<int> arr = {1, 2, 3, 4, 5, 6};
    int n = arr.size();

    SGTree st(n);
    st.build(0, 0, n - 1, arr);

    // Initial sum
    cout << st.query(0, 0, n - 1, 0, 4) << endl; // 15

    // Point update: add 2 at index 3
    st.pointUpdate(0, 0, n - 1, 3, 2);
    cout << st.query(0, 0, n - 1, 0, 4) << endl; // 17

    return 0;
}`,
    buildCode: `// Build the segment tree
void build(int idx, int l, int r, const vector<int> &arr)
{
    if (l == r)
    {
        seg[idx] = arr[l];
        return;
    }

    int mid = (l + r) / 2;

    build(2 * idx + 1, l, mid, arr);
    build(2 * idx + 2, mid + 1, r, arr);

    seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2];
}`,
    rangeSumQueryCode: `// Range sum query
int query(int idx, int l, int r, int ql, int qr)
{
    if (qr < l || r < ql)
        return 0;

    if (ql <= l && r <= qr)
        return seg[idx];

    int mid = (l + r) / 2;

    int left = query(2 * idx + 1, l, mid, ql, qr);
    int right = query(2 * idx + 2, mid + 1, r, ql, qr);

    return left + right;
}`,
    pointUpdateCode: `// Point update
void pointUpdate(int idx, int l, int r, int pos, int val)
{
    if (l == r)
    {
        seg[idx] += val;
        return;
    }

    int mid = (l + r) / 2;

    if (pos <= mid)
        pointUpdate(2 * idx + 1, l, mid, pos, val);
    else
        pointUpdate(2 * idx + 2, mid + 1, r, pos, val);
    
    seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2];
}`
};

