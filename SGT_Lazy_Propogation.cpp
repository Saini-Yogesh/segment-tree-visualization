#include <bits/stdc++.h>
using namespace std;

class SGTree
{
public:
    vector<int> seg, lazy;
    SGTree(int n)
    {
        seg.resize(4 * n);
        lazy.resize(4 * n);
    }

    void build(int ind, int start, int end, vector<int> &arr)
    {
        if (start == end)
        {
            seg[ind] = arr[start];
            return;
        }
        int mid = start + (end - start) / 2;
        build(2 * ind + 1, start, mid, arr);
        build(2 * ind + 2, mid + 1, end, arr);

        seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2]; // for sum
    }

    void pointUpdate(int ind, int start, int end, int node, int val)
    {
        // if the node is lazy then make the childres lazy and free the current node
        // in point update is it not nesseary to handle lazy propozatoin
        if (lazy[ind] != 0)
        {
            seg[ind] += (end - start + 1) * lazy[ind];
            if (start != end)
            {
                lazy[2 * ind + 1] += lazy[ind];
                lazy[2 * ind + 2] += lazy[ind];
            }
            lazy[ind] = 0;
        }

        if (start == end)
        {
            seg[ind] += val;
            return;
        }

        int mid = start + (end - start) / 2;
        if (node <= mid)
            pointUpdate(2 * ind + 1, start, mid, node, val);
        else
            pointUpdate(2 * ind + 2, mid + 1, end, node, val);

        seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2];
    }

    void rangeUpdate(int ind, int start, int end, int l, int r, int val)
    {
        // if the node is lazy then make the childres lazy and free the current node
        if (lazy[ind] != 0)
        {
            seg[ind] += (end - start + 1) * lazy[ind];
            if (start != end)
            {
                lazy[2 * ind + 1] += lazy[ind];
                lazy[2 * ind + 2] += lazy[ind];
            }
            lazy[ind] = 0;
        }

        if (l > end || r < start)
            return;

        if (l <= start && end <= r)
        {
            seg[ind] += (end - start + 1) * val;
            if (start != end)
            {
                lazy[2 * ind + 1] += val;
                lazy[2 * ind + 2] += val;
            }
            return;
        }

        int mid = start + (end - start) / 2;

        rangeUpdate(2 * ind + 1, start, mid, l, r, val);
        rangeUpdate(2 * ind + 2, mid + 1, end, l, r, val);

        seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2];
    }

    int query(int ind, int start, int end, int l, int r)
    {
        // if the node is lazy then make the childres lazy and free the current node
        if (lazy[ind] != 0)
        {
            seg[ind] += (end - start + 1) * lazy[ind];
            if (start != end)
            {
                lazy[2 * ind + 1] += lazy[ind];
                lazy[2 * ind + 2] += lazy[ind];
            }
            lazy[ind] = 0;
        }

        if (r < start || end < l)
            return 0;

        if (l <= start && end <= r)
            return seg[ind];

        int mid = start + (end - start) / 2;
        int left = query(2 * ind + 1, start, mid, l, r);
        int right = query(2 * ind + 2, mid + 1, end, l, r);

        return left + right;
    }
};

int main()
{
    vector<int> arr = {1, 2, 3, 4, 5};
    int n = arr.size();
    SGTree st(n);
    st.build(0, 0, n - 1, arr);

    cout << "Initial Sum of [0,4]: " << st.query(0, 0, n - 1, 0, 4) << "\n"; // Output: 15

    st.rangeUpdate(0, 0, n - 1, 1, 3, 2); // Add 2 to elements in [1,3]

    cout << "Sum of [0,4] after range update [1,3] +2: " << st.query(0, 0, n - 1, 0, 4) << "\n"; // Output: 21

    st.pointUpdate(0, 0, n - 1, 2, 3); // Add 3 to index 2

    cout << "Sum of [2,2] after point update +3: " << st.query(0, 0, n - 1, 2, 2) << "\n"; // Output: 8
    cout << "Final Sum of [0,4]: " << st.query(0, 0, n - 1, 0, 4) << "\n";                 // Output: 24
}
