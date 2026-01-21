export const AllCodes = {
    completeCode:
        `#include <bits/stdc++.h>
using namespace std;

class SGTree
{
public:
    vector<int> seg;
    SGTree(int n)
    {
        seg.resize(4 * n, INT_MAX);
    }

    void build(int ind, int low, int high, vector<int> &arr)
    {
        if (low == high)
        {
            seg[ind] = arr[low];
            return;
        }
        int mid = (low + high) / 2;

        build(2 * ind + 1, low, mid, arr);
        build(2 * ind + 2, mid + 1, high, arr);

        seg[ind] = min(seg[2 * ind + 1], seg[2 * ind + 2]);
    }

    void update(int index, int val, int low, int high, int ind)
    {
        if (low == high)
        {
            seg[ind] = val;
            return;
        }
        int mid = (low + high) / 2;

        if (index <= mid)
            update(index, val, low, mid, 2 * ind + 1);
        else
            update(index, val, mid + 1, high, 2 * ind + 2);

        seg[ind] = min(seg[2 * ind + 1], seg[2 * ind + 2]);
    }

    int query(int ind, int low, int high, int l, int r)
    {
        if (r < low || high < l)
            return INT_MAX;

        if (low >= l && high <= r)
            return seg[ind];

        int mid = (low + high) / 2;

        int left = query(2 * ind + 1, low, mid, l, r);
        int right = query(2 * ind + 2, mid + 1, high, l, r);
        return min(left, right);
    }

    void printSWTree()
    {
        for (auto it : seg)
            cout << it << " ";
        cout << endl;
    }
};

int main()
{
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &it : arr)
        cin >> it;

    SGTree seg(n);
    seg.build(0, 0, n - 1, arr);
    seg.printSWTree();

    return 0;
}`,
    buildCode:
        `void build(int ind, int low, int high, vector<int> arr)
{
    if (low == high)
    {
        seg[ind] = arr[low];
        return;
    }
    int mid = (low + high) / 2;
    build(2 * ind + 1, low, mid, arr);
    build(2 * ind + 2, mid + 1, high, arr);
    seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2];
}`,
    rangeSumQueryCode:
        `int query(int ind, int low, int high, int l, int r)
{
    if (r < low || high < l)
        return 0;

    if (low >= l && high <= r)
        return seg[ind];

    int mid = (low + high) / 2;

    int left = query(2 * ind + 1, low, mid, l, r);
    int right = query(2 * ind + 2, mid + 1, high, l, r);
    return left + right;
}`,
    pointUpdateCode:
        `void update(int index, int val, int low, int high, int ind)
{
    if (low == high)
    {
        seg[ind] = val;
        return;
    }
    int mid = (low + high) / 2;

    if (index <= mid)
        update(index, val, low, mid, 2 * ind + 1);
    else
        update(index, val, mid + 1, high, 2 * ind + 2);
    
    seg[ind] = min(seg[2 * ind + 1], seg[2 * ind + 2]);
}`,
};

