#include <bits/stdc++.h>
using namespace std;

class SGTree
{
public:
    vector<int> seg, lazy;

    SGTree(int n)
    {
        seg.assign(4 * n, 0);
        lazy.assign(4 * n, 0);
    }

    // Build segment tree
    void build(int idx, int l, int r, vector<int> &arr)
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

    // Push lazy value to children
    void push(int idx, int l, int r)
    {
        if (lazy[idx] == 0)
            return;

        seg[idx] += (r - l + 1) * lazy[idx];
        if (l != r)
        {
            lazy[2 * idx + 1] += lazy[idx];
            lazy[2 * idx + 2] += lazy[idx];
        }
        lazy[idx] = 0;
    }

    // Point update: add val at position pos
    void pointUpdate(int idx, int l, int r, int pos, int val)
    {
        push(idx, l, r);

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

    // Range update: add val in [ql, qr]
    void rangeUpdate(int idx, int l, int r, int ql, int qr, int val)
    {
        push(idx, l, r);

        if (qr < l || r < ql)
            return;

        if (ql <= l && r <= qr)
        {
            lazy[idx] += val;
            push(idx, l, r);
            return;
        }

        int mid = (l + r) / 2;

        rangeUpdate(2 * idx + 1, l, mid, ql, qr, val);
        rangeUpdate(2 * idx + 2, mid + 1, r, ql, qr, val);

        seg[idx] = seg[2 * idx + 1] + seg[2 * idx + 2];
    }

    // Range sum query
    int query(int idx, int l, int r, int ql, int qr)
    {
        push(idx, l, r);

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

    cout << st.query(0, 0, n - 1, 0, 4) << endl; // 15

    st.rangeUpdate(0, 0, n - 1, 1, 3, 2);
    cout << st.query(0, 0, n - 1, 0, 4) << endl; // 21

    st.pointUpdate(0, 0, n - 1, 2, 3);
    cout << st.query(0, 0, n - 1, 0, 4) << endl; // 24
}
