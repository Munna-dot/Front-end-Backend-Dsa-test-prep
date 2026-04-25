# Data Structures and Algorithms in JavaScript - 25 Problems (All Levels)

This document covers 25 essential DSA problems in JavaScript, categorized by difficulty: **Beginner**, **Intermediate**, and **Advanced**. Each problem includes a clear statement, an optimal solution, and usage examples.

---

## 🟢 Beginner Level (Foundations)

### 1. Two Sum
**Problem:** Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.
*   **Input:** `nums = [2, 7, 11, 15]`, `target = 9`
*   **Output:** `[0, 1]`

```javascript
function twoSum(nums, target) {
  const map = new Map(); // Value -> Index
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    
    map.set(nums[i], i);
  }
  
  return [];
}

// Usage
console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
```

### 2. Reverse a String
**Problem:** Reverse a given string without using built-in reverse methods.
*   **Input:** `"hello"`
*   **Output:** `"olleh"`

```javascript
function reverseString(str) {
  let left = 0;
  let right = str.length - 1;
  let chars = str.split('');
  
  while (left < right) {
    [chars[left], chars[right]] = [chars[right], chars[left]];
    left++;
    right--;
  }
  
  return chars.join('');
}

// Usage
console.log(reverseString("hello")); // "olleh"
```

### 3. Valid Palindrome
**Problem:** Determine if a string is a palindrome, considering only alphanumeric characters and ignoring cases.
*   **Input:** `"A man, a plan, a canal: Panama"`
*   **Output:** `true`

```javascript
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  
  while (left < right) {
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;
    
    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }
    
    left++;
    right--;
  }
  
  return true;
}

function isAlphaNum(char) {
  return /[a-z0-9]/i.test(char);
}

// Usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
```

### 4. Maximum Subarray (Kadane's Algorithm)
**Problem:** Find the contiguous subarray within an array (containing at least one number) which has the largest sum.
*   **Input:** `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`
*   **Output:** `6` (Subarray: `[4, -1, 2, 1]`)

```javascript
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let currentMax = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    maxSoFar = Math.max(maxSoFar, currentMax);
  }
  
  return maxSoFar;
}

// Usage
console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
```

### 5. Merge Two Sorted Lists
**Problem:** Merge two sorted linked lists and return it as a new sorted list.
*   **Input:** `l1 = [1, 2, 4]`, `l2 = [1, 3, 4]`
*   **Output:** `[1, 1, 2, 3, 4, 4]`

```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  
  current.next = l1 || l2;
  return dummy.next;
}

// Usage
const l1 = new ListNode(1, new ListNode(2, new ListNode(4)));
const l2 = new ListNode(1, new ListNode(3, new ListNode(4)));
// Result structure: 1 -> 1 -> 2 -> 3 -> 4 -> 4
```

### 6. Best Time to Buy and Sell Stock
**Problem:** Given an array prices where `prices[i]` is the price of a given stock on the ith day, maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
*   **Input:** `[7, 1, 5, 3, 6, 4]`
*   **Output:** `5` (Buy at 1, sell at 6)

```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (let price of prices) {
    if (price < minPrice) {
      minPrice = price;
    } else if (price - minPrice > maxProfit) {
      maxProfit = price - minPrice;
    }
  }
  
  return maxProfit;
}

// Usage
console.log(maxProfit([7, 1, 5, 3, 6, 4])); // 5
```

### 7. Contains Duplicate
**Problem:** Given an integer array `nums`, return `true` if any value appears at least twice in the array, and `false` if every element is distinct.
*   **Input:** `[1, 2, 3, 1]`
*   **Output:** `true`

```javascript
function containsDuplicate(nums) {
  const seen = new Set();
  
  for (let num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  
  return false;
}

// Usage
console.log(containsDuplicate([1, 2, 3, 1])); // true
console.log(containsDuplicate([1, 2, 3, 4])); // false
```

### 8. Product of Array Except Self
**Problem:** Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`. Do not use division.
*   **Input:** `[1, 2, 3, 4]`
*   **Output:** `[24, 12, 8, 6]`

```javascript
function productExceptSelf(nums) {
  const n = nums.length;
  const answer = new Array(n).fill(1);
  
  // Calculate prefix products
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    answer[i] = prefix;
    prefix *= nums[i];
  }
  
  // Calculate suffix products and multiply with prefix
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    answer[i] *= suffix;
    suffix *= nums[i];
  }
  
  return answer;
}

// Usage
console.log(productExceptSelf([1, 2, 3, 4])); // [24, 12, 8, 6]
```

---

## 🟡 Intermediate Level (Core Algorithms & Data Structures)

### 9. Group Anagrams
**Problem:** Given an array of strings `strs`, group the anagrams together.
*   **Input:** `["eat", "tea", "tan", "ate", "nat", "bat"]`
*   **Output:** `[["eat","tea","ate"], ["tan","nat"], ["bat"]]`

```javascript
function groupAnagrams(strs) {
  const map = new Map();
  
  for (let str of strs) {
    // Sort characters to create a key
    const sortedStr = str.split('').sort().join('');
    
    if (!map.has(sortedStr)) {
      map.set(sortedStr, []);
    }
    map.get(sortedStr).push(str);
  }
  
  return Array.from(map.values());
}

// Usage
console.log(groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"]));
```

### 10. Longest Substring Without Repeating Characters
**Problem:** Given a string `s`, find the length of the longest substring without repeating characters.
*   **Input:** `"abcabcbb"`
*   **Output:** `3` ("abc")

```javascript
function lengthOfLongestSubstring(s) {
  const charIndexMap = new Map();
  let maxLength = 0;
  let start = 0;
  
  for (let end = 0; end < s.length; end++) {
    const char = s[end];
    
    if (charIndexMap.has(char) && charIndexMap.get(char) >= start) {
      start = charIndexMap.get(char) + 1;
    }
    
    charIndexMap.set(char, end);
    maxLength = Math.max(maxLength, end - start + 1);
  }
  
  return maxLength;
}

// Usage
console.log(lengthOfLongestSubstring("abcabcbb")); // 3
```

### 11. Implement Queue using Stacks
**Problem:** Implement a first-in-first-out (FIFO) queue using only two stacks.
*   **Operations:** `push`, `pop`, `peek`, `empty`

```javascript
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    this.peek(); // Ensure outStack has elements
    return this.outStack.pop();
  }

  peek() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }
}

// Usage
const q = new MyQueue();
q.push(1);
q.push(2);
console.log(q.peek()); // 1
console.log(q.pop());  // 1
console.log(q.empty()); // false
```

### 12. Binary Tree Level Order Traversal
**Problem:** Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).
*   **Input:** `[3, 9, 20, null, null, 15, 7]`
*   **Output:** `[[3], [9, 20], [15, 7]]`

```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    
    result.push(currentLevel);
  }
  
  return result;
}

// Usage
const root = new TreeNode(3, 
  new TreeNode(9), 
  new TreeNode(20, new TreeNode(15), new TreeNode(7))
);
console.log(levelOrder(root)); // [[3], [9, 20], [15, 7]]
```

### 13. Validate Binary Search Tree
**Problem:** Given the root of a binary tree, determine if it is a valid binary search tree (BST).
*   **Constraint:** Left subtree < Node < Right subtree

```javascript
function isValidBST(root) {
  function validate(node, low, high) {
    if (!node) return true;
    
    if ((low !== null && node.val <= low) || 
        (high !== null && node.val >= high)) {
      return false;
    }
    
    return validate(node.left, low, node.val) && 
           validate(node.right, node.val, high);
  }
  
  return validate(root, null, null);
}

// Usage
const bstRoot = new TreeNode(2, new TreeNode(1), new TreeNode(3));
console.log(isValidBST(bstRoot)); // true
```

### 14. Course Schedule (Topological Sort)
**Problem:** There are `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`. Return `true` if you can finish all courses.
*   **Input:** `numCourses = 2`, `prerequisites = [[1, 0]]`
*   **Output:** `true`

```javascript
function canFinish(numCourses, prerequisites) {
  const adjList = new Array(numCourses).fill(null).map(() => []);
  const inDegree = new Array(numCourses).fill(0);
  
  // Build graph
  for (let [course, prereq] of prerequisites) {
    adjList[prereq].push(course);
    inDegree[course]++;
  }
  
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }
  
  let processedCourses = 0;
  
  while (queue.length > 0) {
    const course = queue.shift();
    processedCourses++;
    
    for (let neighbor of adjList[course]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }
  
  return processedCourses === numCourses;
}

// Usage
console.log(canFinish(2, [[1, 0]])); // true
console.log(canFinish(2, [[1, 0], [0, 1]])); // false (Cycle)
```

### 15. Clone Graph
**Problem:** Given a reference of a node in a connected undirected graph, return a deep copy (clone) of the graph.
*   **Structure:** Each node contains a value (`int`) and a list (`List[Node]`) of its neighbors.

```javascript
class GraphNode {
  constructor(val, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return null;
  
  const visited = new Map(); // Old Node -> New Node
  
  function dfs(oldNode) {
    if (visited.has(oldNode)) {
      return visited.get(oldNode);
    }
    
    const newNode = new GraphNode(oldNode.val);
    visited.set(oldNode, newNode);
    
    for (let neighbor of oldNode.neighbors) {
      newNode.neighbors.push(dfs(neighbor));
    }
    
    return newNode;
  }
  
  return dfs(node);
}
```

### 16. Kth Largest Element in an Array
**Problem:** Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.
*   **Input:** `nums = [3, 2, 1, 5, 6, 4]`, `k = 2`
*   **Output:** `5`

```javascript
function findKthLargest(nums, k) {
  // Min-Heap approach (simulated with sort for brevity, but heap is O(N log K))
  // For interview: Use a Min-Heap of size K
  
  // Optimized QuickSelect (Average O(N))
  const pivot = nums[Math.floor(Math.random() * nums.length)];
  const left = nums.filter(x => x > pivot);
  const mid = nums.filter(x => x === pivot);
  const right = nums.filter(x => x < pivot);
  
  if (k <= left.length) {
    return findKthLargest(left, k);
  } else if (k <= left.length + mid.length) {
    return pivot;
  } else {
    return findKthLargest(right, k - left.length - mid.length);
  }
}

// Usage
console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2)); // 5
```

### 17. Word Search
**Problem:** Given an `m x n` grid of characters `board` and a string `word`, return `true` if `word` exists in the grid. The word can be constructed from letters of sequentially adjacent cells.
*   **Input:** `board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]`, `word = "ABCCED"`
*   **Output:** `true`

```javascript
function exist(board, word) {
  const rows = board.length;
  const cols = board[0].length;
  const visited = new Set();

  function dfs(r, c, index) {
    if (index === word.length) return true;
    if (r < 0 || c < 0 || r >= rows || c >= cols || 
        visited.has(`${r},${c}`) || board[r][c] !== word[index]) {
      return false;
    }

    visited.add(`${r},${c}`);
    
    const found = dfs(r + 1, c, index + 1) ||
                  dfs(r - 1, c, index + 1) ||
                  dfs(r, c + 1, index + 1) ||
                  dfs(r, c - 1, index + 1);
    
    visited.delete(`${r},${c}`); // Backtrack
    return found;
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  
  return false;
}

// Usage
const board = [
  ["A","B","C","E"],
  ["S","F","C","S"],
  ["A","D","E","E"]
];
console.log(exist(board, "ABCCED")); // true
```

---

## 🔴 Advanced Level (Complex Patterns & Optimization)

### 18. Median of Two Sorted Arrays
**Problem:** Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays. The overall run time complexity should be `O(log (m+n))`.
*   **Input:** `nums1 = [1, 3]`, `nums2 = [2]`
*   **Output:** `2.0`

```javascript
function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the smaller array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length;
  const n = nums2.length;
  let left = 0;
  let right = m;

  while (left <= right) {
    const partition1 = Math.floor((left + right) / 2);
    const partition2 = Math.floor((m + n + 1) / 2) - partition1;

    const maxLeft1 = (partition1 === 0) ? -Infinity : nums1[partition1 - 1];
    const minRight1 = (partition1 === m) ? Infinity : nums1[partition1];

    const maxLeft2 = (partition2 === 0) ? -Infinity : nums2[partition2 - 1];
    const minRight2 = (partition2 === n) ? Infinity : nums2[partition2];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      if ((m + n) % 2 === 0) {
        return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
      } else {
        return Math.max(maxLeft1, maxLeft2);
      }
    } else if (maxLeft1 > minRight2) {
      right = partition1 - 1;
    } else {
      left = partition1 + 1;
    }
  }
  
  throw new Error("Input arrays are not sorted");
}

// Usage
console.log(findMedianSortedArrays([1, 3], [2])); // 2
console.log(findMedianSortedArrays([1, 2], [3, 4])); // 2.5
```

### 19. Serialize and Deserialize Binary Tree
**Problem:** Design an algorithm to serialize and deserialize a binary tree.
*   **Format:** Comma-separated string using pre-order traversal, using `null` for empty nodes.

```javascript
class Codec {
  constructor() {}

  serialize(root) {
    const result = [];
    
    function dfs(node) {
      if (!node) {
        result.push("null");
        return;
      }
      result.push(node.val.toString());
      dfs(node.left);
      dfs(node.right);
    }
    
    dfs(root);
    return result.join(",");
  }

  deserialize(data) {
    const nodes = data.split(",");
    let index = 0;
    
    function dfs() {
      if (nodes[index] === "null") {
        index++;
        return null;
      }
      
      const node = new TreeNode(parseInt(nodes[index]));
      index++;
      node.left = dfs();
      node.right = dfs();
      
      return node;
    }
    
    return dfs();
  }
}

// Usage
const codec = new Codec();
const serialized = codec.serialize(root); // "3,9,null,null,20,15,null,null,7,null,null"
const deserialized = codec.deserialize(serialized);
```

### 20. Trapping Rain Water
**Problem:** Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.
*   **Input:** `height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`
*   **Output:** `6`

```javascript
function trap(height) {
  if (!height || height.length < 3) return 0;
  
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;
  
  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }
  
  return water;
}

// Usage
console.log(trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
```

### 21. Merge K Sorted Lists
**Problem:** You are given an array of `k` linked-lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list.
*   **Approach:** Use a Min-Heap (Priority Queue).

```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].val >= this.heap[parentIndex].val) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    while (true) {
      let leftChild = 2 * index + 1;
      let rightChild = 2 * index + 2;
      let swap = null;

      if (leftChild < length) {
        if (this.heap[leftChild].val < this.heap[index].val) {
          swap = leftChild;
        }
      }
      if (rightChild < length) {
        if ((swap === null && this.heap[rightChild].val < this.heap[index].val) ||
            (swap !== null && this.heap[rightChild].val < this.heap[swap].val)) {
          swap = rightChild;
        }
      }
      if (swap === null) break;
      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

function mergeKLists(lists) {
  const heap = new MinHeap();
  const dummy = new ListNode(0);
  let current = dummy;

  // Add head of each list to heap
  for (let list of lists) {
    if (list) heap.push(list);
  }

  while (!heap.isEmpty()) {
    const smallest = heap.pop();
    current.next = smallest;
    current = current.next;

    if (smallest.next) {
      heap.push(smallest.next);
    }
  }

  return dummy.next;
}
```

### 22. Regular Expression Matching
**Problem:** Implement regular expression matching with support for `'.'` and `'*'`.
*   `'.'` Matches any single character.
*   `'*'` Matches zero or more of the preceding element.
*   **Input:** `s = "aab"`, `p = "c*a*b"`
*   **Output:** `true`

```javascript
function isMatch(s, p) {
  const memo = new Map();

  function dp(i, j) {
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key);

    if (j === p.length) return i === s.length;

    const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');

    let ans;
    if (j + 1 < p.length && p[j + 1] === '*') {
      // Option 1: Skip the pattern (use * as 0 occurrences)
      // Option 2: Use the pattern (if first match, consume char in s)
      ans = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
    } else {
      ans = firstMatch && dp(i + 1, j + 1);
    }

    memo.set(key, ans);
    return ans;
  }

  return dp(0, 0);
}

// Usage
console.log(isMatch("aab", "c*a*b")); // true
console.log(isMatch("mississippi", "mis*is*p*.")); // false
```

### 23. Sliding Window Maximum
**Problem:** You are given an array of integers `nums`, there is a sliding window of size `k` which is moving from the very left of the array to the very right. Return the max sliding window.
*   **Constraint:** Solve in `O(n)` time.
*   **Approach:** Monotonic Deque.

```javascript
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // Stores indices

  for (let i = 0; i < nums.length; i++) {
    // Remove indices out of the current window
    if (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Maintain decreasing order in deque
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Add max for the current window
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// Usage
console.log(maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3)); // [3, 3, 5, 5, 6, 7]
```

### 24. Find Median from Data Stream
**Problem:** Design a data structure that supports adding a number from a data stream and finding the median from all added numbers so far.
*   **Approach:** Two Heaps (Max-Heap for lower half, Min-Heap for upper half).

```javascript
class MedianFinder {
  constructor() {
    this.maxHeap = []; // Lower half
    this.minHeap = []; // Upper half
  }

  addNum(num) {
    // Push to maxHeap first
    this.maxHeap.push(num);
    this.maxHeap.sort((a, b) => b - a); // Simulate Max Heap push
    
    // Balance: Move largest of lower half to upper half
    this.minHeap.push(this.maxHeap.shift());
    this.minHeap.sort((a, b) => a - b); // Simulate Min Heap push

    // Rebalance sizes
    if (this.minHeap.length > this.maxHeap.length) {
      this.maxHeap.unshift(this.minHeap.shift());
      this.maxHeap.sort((a, b) => b - a);
    }
  }

  findMedian() {
    if (this.maxHeap.length === this.minHeap.length) {
      return (this.maxHeap[0] + this.minHeap[0]) / 2;
    }
    return this.maxHeap[0];
  }
}

// Usage
const mf = new MedianFinder();
mf.addNum(1);
mf.addNum(2);
console.log(mf.findMedian()); // 1.5
mf.addNum(3);
console.log(mf.findMedian()); // 2
```

### 25. Alien Dictionary (Topological Sort with Graph Construction)
**Problem:** There is a new alien language that uses the English alphabet. However, the order among the letters is unknown. You are given a list of strings `words` from the alien dictionary, sorted lexicographically by the rules of this new language. Derive the order of letters.
*   **Input:** `["wrt", "wrf", "er", "ett", "rftt"]`
*   **Output:** `"wertf"` (or any valid permutation)

```javascript
function alienOrder(words) {
  const adj = new Map();
  const inDegree = new Map();
  
  // Initialize graphs
  for (let word of words) {
    for (let char of word) {
      if (!adj.has(char)) adj.set(char, []);
      if (!inDegree.has(char)) inDegree.set(char, 0);
    }
  }

  // Build graph
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i];
    const w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);
    
    // Edge case: Prefix violation (e.g., "abc" before "ab")
    if (w1.length > w2.length && w1.startsWith(w2)) {
      return "";
    }

    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        adj.get(w1[j]).push(w2[j]);
        inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        break;
      }
    }
  }

  // Topological Sort (Kahn's Algorithm)
  const queue = [];
  for (let [char, degree] of inDegree) {
    if (degree === 0) queue.push(char);
  }

  let result = "";
  while (queue.length > 0) {
    const char = queue.shift();
    result += char;
    
    for (let neighbor of adj.get(char)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) {
        queue.push(neighbor);
      }
    }
  }

  // Check for cycles
  if (result.length < inDegree.size) return "";
  
  return result;
}

// Usage
console.log(alienOrder(["wrt", "wrf", "er", "ett", "rftt"])); // "wertf"
```

---

## Summary of Concepts Covered

| Level | Key Concepts |
| :--- | :--- |
| **Beginner** | Arrays, Strings, Hash Maps, Two Pointers, Basic Linked Lists, Kadane's Algo |
| **Intermediate** | Sliding Window, BFS/DFS, Trees (BST, Traversal), Graphs (Topo Sort), Heaps, Backtracking |
| **Advanced** | Binary Search on Answer, Dynamic Programming (Hard), Tries, Monotonic Stack/Queue, Complex Graphs, System Design Primitives |
