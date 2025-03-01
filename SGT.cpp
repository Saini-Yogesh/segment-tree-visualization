#include <bits/stdc++.h>
using namespace std;

class ST
{
public:
    vector<int> seg, lazy;
    ST(int n)
    {
        seg.resize(4 * n);
        lazy.resize(4 * n);
    }
    void build(int ind, int low, int high, vector<int> arr)
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
    }
    void update(int ind, int low, int high, int l, int r, int val)
    {
        if (lazy[ind] != 0)
        {
            seg[ind] = lazy[ind] * (high - low + 1);
            if (low != high)
            {
                seg[2 * ind + 1] += lazy[ind];
                seg[2 * ind + 2] += lazy[ind];
            }
            lazy[ind] = 0;
        }
        // not overlaping
        // low high l r || l r low high
        if (high < l || low > r)
            return;

        // partial overlaping
        // l low high r
        if (l <= low && r >= high)
        {
            seg[ind] += val * (high - low + 1);
            if (low != high)
            {
                lazy[2 * ind + 1] += val;
                lazy[2 * ind + 2] += val;
            }
            return;
        }

        int mid = (low + high) / 2;
        update(2 * ind + 1, low, mid, l, r, val);
        update(2 * ind + 2, mid + 1, high, l, r, val);
        seg[ind] = seg[2 * ind + 1] + seg[2 * ind + 2];
    }
    int query(int ind, int low, int high, int l, int r)
    {
        if (lazy[ind] != 0)
        {
            seg[ind] += lazy[ind] * (high - low + 1);
            if (low != high)
            {
                seg[2 * ind + 1] += lazy[ind];
                seg[2 * ind + 2] += lazy[ind];
            }
            lazy[ind] = 0;
        }

        // not overlaping
        // low high l r || l r low high
        if (high < l || low > r)
            return 0;

        // partial overlaping
        // l low high r
        if (l <= low && r >= high)
            return seg[ind];

        int mid = (low + high) / 2;
        int left = query(2 * ind + 1, low, mid, l, r);
        int right = query(2 * ind + 2, mid + 1, high, l, r);
        return left + right;
    }
};

int main()
{
    int n;
    cin >> n;
    vector<int> arr(n);
    for (auto &it : arr)
        cin >> it;
    int q;
    cin >> q;
    ST st(n);
    st.build(0, 0, n - 1, arr);
    while (q--)
    {
        int type;
        cin >> type;
        if (type == 1)
        {
            int l, r;
            cin >> l >> r;
            cout << "sum is : " << st.query(0, 0, n - 1, l, r) << endl;
        }
        else
        {
            int l, r, val;
            cin >> l >> r >> val;
            st.update(0, 0, n - 1, l, r, val);
        }
    }
    return 0;
}
/*
5
1 2 3 4 5
3
1 2 4
2 2 4 -3
1 2 4
*/