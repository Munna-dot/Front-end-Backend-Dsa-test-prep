# Complete Guide to DSA, Problem Solving, Logical Thinking & OOP in JavaScript

## Table of Contents
1. [Introduction](#introduction)
2. [Data Structures](#data-structures)
3. [Algorithms](#algorithms)
4. [Problem Solving Framework](#problem-solving-framework)
5. [Logical Thinking Development](#logical-thinking-development)
6. [Object-Oriented Programming in JavaScript](#object-oriented-programming-in-javascript)
7. [Practice Problems & Solutions](#practice-problems--solutions)
8. [Resources & Next Steps](#resources--next-steps)

---

## Introduction

This comprehensive guide covers Data Structures and Algorithms (DSA), problem-solving strategies, logical thinking development, and Object-Oriented Programming (OOP) concepts specifically tailored for JavaScript developers. Whether you're preparing for technical interviews or aiming to improve your coding skills, this guide provides a structured approach to mastering these fundamental concepts.

### Why Learn DSA in JavaScript?

- **Interview Preparation**: Most tech companies test DSA knowledge in interviews
- **Performance Optimization**: Understanding data structures helps write efficient code
- **Problem Solving**: Develops systematic thinking for complex challenges
- **Foundation**: Builds strong fundamentals for advanced programming concepts

---

## Data Structures

### 1. Arrays

Arrays are the most basic data structure in JavaScript, storing collections of elements.

#### Basic Operations
```javascript
// Creation
const arr = [1, 2, 3, 4, 5];
const arr2 = new Array(5);

// Access
console.log(arr[0]); // 1
console.log(arr[arr.length - 1]); // 5

// Modification
arr.push(6); // Add to end
arr.pop(); // Remove from end
arr.unshift(0); // Add to beginning
arr.shift(); // Remove from beginning
arr.splice(2, 1); // Remove at index 2

// Iteration
arr.forEach((item, index) => console.log(`${index}: ${item}`));
const doubled = arr.map(x => x * 2);
const evens = arr.filter(x => x % 2 === 0);
const sum = arr.reduce((acc, curr) => acc + curr, 0);
```

#### Common Array Problems

**Two Sum Problem**
```javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}

// Time: O(n), Space: O(n)
```

**Maximum Subarray (Kadane's Algorithm)**
```javascript
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  
  return maxSoFar;
}

// Time: O(n), Space: O(1)
```

### 2. Strings

Strings are sequences of characters with specialized methods for manipulation.

#### Essential String Methods
```javascript
const str = "Hello World";

// Basic operations
str.length; // 11
str.charAt(0); // "H"
str.substring(0, 5); // "Hello"
str.slice(-5); // "World"
str.split(" "); // ["Hello", "World"]
str.toLowerCase(); // "hello world"
str.toUpperCase(); // "HELLO WORLD"
str.trim(); // Remove whitespace
str.replace("World", "JavaScript"); // "Hello JavaScript"
str.includes("World"); // true
```

#### Common String Problems

**Palindrome Check**
```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// Two-pointer approach (more efficient)
function isPalindromeOptimized(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}
```

**Longest Substring Without Repeating Characters**
```javascript
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0;
  let maxLength = 0;
  
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
}

// Time: O(n), Space: O(min(m,n)) where m is charset size
```

### 3. Linked Lists

Linked lists consist of nodes where each node points to the next node.

#### Implementation
```javascript
class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }
  
  append(val) {
    const newNode = new ListNode(val);
    
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    
    this.size++;
  }
  
  prepend(val) {
    const newNode = new ListNode(val, this.head);
    this.head = newNode;
    this.size++;
  }
  
  delete(val) {
    if (!this.head) return false;
    
    if (this.head.val === val) {
      this.head = this.head.next;
      this.size--;
      return true;
    }
    
    let current = this.head;
    while (current.next) {
      if (current.next.val === val) {
        current.next = current.next.next;
        this.size--;
        return true;
      }
      current = current.next;
    }
    
    return false;
  }
  
  find(val) {
    let current = this.head;
    while (current) {
      if (current.val === val) return current;
      current = current.next;
    }
    return null;
  }
  
  toArray() {
    const result = [];
    let current = this.head;
    while (current) {
      result.push(current.val);
      current = current.next;
    }
    return result;
  }
}
```

#### Common Linked List Problems

**Reverse Linked List**
```javascript
function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}

// Time: O(n), Space: O(1)
```

**Detect Cycle in Linked List**
```javascript
function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head.next;
  
  while (fast && fast.next) {
    if (slow === fast) return true;
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return false;
}

// Time: O(n), Space: O(1)
```

**Merge Two Sorted Linked Lists**
```javascript
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

// Time: O(m+n), Space: O(1)
```

### 4. Stacks and Queues

#### Stack Implementation (LIFO - Last In First Out)
```javascript
class Stack {
  constructor() {
    this.items = [];
  }
  
  push(element) {
    this.items.push(element);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}
```

#### Queue Implementation (FIFO - First In First Out)
```javascript
class Queue {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    const item = this.items[this.frontIndex];
    this.frontIndex++;
    
    // Optimize memory by removing old elements periodically
    if (this.frontIndex > 1000) {
      this.items = this.items.slice(this.frontIndex);
      this.frontIndex = 0;
    }
    
    return item;
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.frontIndex];
  }
  
  isEmpty() {
    return this.items.length - this.frontIndex === 0;
  }
  
  size() {
    return this.items.length - this.frontIndex;
  }
}
```

#### Common Stack/Queue Problems

**Valid Parentheses**
```javascript
function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (const char of s) {
    if (char in map) {
      const top = stack.pop();
      if (top !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }
  
  return stack.length === 0;
}

// Time: O(n), Space: O(n)
```

**Implement Queue using Stacks**
```javascript
class MyQueue {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  
  push(x) {
    this.stack1.push(x);
  }
  
  pop() {
    this.peek(); // Ensure stack2 has elements
    return this.stack2.pop();
  }
  
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) {
        this.stack2.push(this.stack1.pop());
      }
    }
    return this.stack2[this.stack2.length - 1];
  }
  
  empty() {
    return this.stack1.length === 0 && this.stack2.length === 0;
  }
}
```

### 5. Hash Tables (Maps and Sets)

Hash tables provide O(1) average time complexity for insert, delete, and search operations.

#### JavaScript Map and Set
```javascript
// Map
const map = new Map();
map.set('key', 'value');
map.get('key'); // 'value'
map.has('key'); // true
map.delete('key');
map.size;
map.forEach((value, key) => console.log(key, value));

// Set
const set = new Set();
set.add(1);
set.add(2);
set.has(1); // true
set.delete(1);
set.size;
set.forEach(value => console.log(value));
```

#### Custom Hash Table Implementation
```javascript
class HashTable {
  constructor(size = 32) {
    this.buckets = new Array(size);
    this.size = 0;
  }
  
  _hash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.buckets.length;
  }
  
  set(key, value) {
    const index = this._hash(key);
    
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }
    
    const bucket = this.buckets[index];
    const existing = bucket.find(pair => pair[0] === key);
    
    if (existing) {
      existing[1] = value;
    } else {
      bucket.push([key, value]);
      this.size++;
    }
  }
  
  get(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    
    if (!bucket) return undefined;
    
    const pair = bucket.find(p => p[0] === key);
    return pair ? pair[1] : undefined;
  }
  
  delete(key) {
    const index = this._hash(key);
    const bucket = this.buckets[index];
    
    if (!bucket) return false;
    
    const initialLength = bucket.length;
    this.buckets[index] = bucket.filter(pair => pair[0] !== key);
    
    if (this.buckets[index].length < initialLength) {
      this.size--;
      return true;
    }
    
    return false;
  }
  
  has(key) {
    return this.get(key) !== undefined;
  }
}
```

#### Common Hash Table Problems

**Two Sum (Revisited with Hash Map)**
```javascript
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}
```

**Group Anagrams**
```javascript
function groupAnagrams(strs) {
  const map = new Map();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted).push(str);
  }
  
  return Array.from(map.values());
}

// Time: O(n * k log k) where n is number of strings, k is max string length
```

### 6. Trees

Trees are hierarchical data structures with a root node and child nodes.

#### Binary Tree Implementation
```javascript
class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  // Depth-First Search (DFS) - Preorder
  preorderTraversal(root = this.root) {
    const result = [];
    
    function dfs(node) {
      if (!node) return;
      result.push(node.val);
      dfs(node.left);
      dfs(node.right);
    }
    
    dfs(root);
    return result;
  }
  
  // DFS - Inorder
  inorderTraversal(root = this.root) {
    const result = [];
    
    function dfs(node) {
      if (!node) return;
      dfs(node.left);
      result.push(node.val);
      dfs(node.right);
    }
    
    dfs(root);
    return result;
  }
  
  // DFS - Postorder
  postorderTraversal(root = this.root) {
    const result = [];
    
    function dfs(node) {
      if (!node) return;
      dfs(node.left);
      dfs(node.right);
      result.push(node.val);
    }
    
    dfs(root);
    return result;
  }
  
  // Breadth-First Search (BFS) - Level Order
  levelOrderTraversal(root = this.root) {
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
  
  // Calculate height
  getHeight(root = this.root) {
    if (!root) return 0;
    return 1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
  }
  
  // Check if balanced
  isBalanced(root = this.root) {
    function checkHeight(node) {
      if (!node) return 0;
      
      const leftHeight = checkHeight(node.left);
      if (leftHeight === -1) return -1;
      
      const rightHeight = checkHeight(node.right);
      if (rightHeight === -1) return -1;
      
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      
      return 1 + Math.max(leftHeight, rightHeight);
    }
    
    return checkHeight(root) !== -1;
  }
}
```

#### Binary Search Tree (BST)
```javascript
class BST {
  constructor() {
    this.root = null;
  }
  
  insert(val) {
    const newNode = new TreeNode(val);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while (true) {
      if (val < current.val) {
        if (!current.left) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }
  
  search(val) {
    let current = this.root;
    
    while (current) {
      if (val === current.val) return true;
      if (val < current.val) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    
    return false;
  }
  
  findMin(root = this.root) {
    if (!root) return null;
    let current = root;
    while (current.left) {
      current = current.left;
    }
    return current.val;
  }
  
  findMax(root = this.root) {
    if (!root) return null;
    let current = root;
    while (current.right) {
      current = current.right;
    }
    return current.val;
  }
}
```

#### Common Tree Problems

**Maximum Depth of Binary Tree**
```javascript
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// Time: O(n), Space: O(h) where h is height
```

**Invert Binary Tree**
```javascript
function invertTree(root) {
  if (!root) return null;
  
  [root.left, root.right] = [invertTree(root.right), invertTree(root.left)];
  
  return root;
}

// Time: O(n), Space: O(h)
```

**Lowest Common Ancestor in BST**
```javascript
function lowestCommonAncestor(root, p, q) {
  let current = root;
  
  while (current) {
    if (p.val < current.val && q.val < current.val) {
      current = current.left;
    } else if (p.val > current.val && q.val > current.val) {
      current = current.right;
    } else {
      return current;
    }
  }
  
  return null;
}

// Time: O(h), Space: O(1)
```

### 7. Heaps (Priority Queues)

Heaps are complete binary trees that satisfy the heap property.

#### Min Heap Implementation
```javascript
class MinHeap {
  constructor() {
    this.heap = [];
  }
  
  _getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  
  _getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  
  _getRightChildIndex(i) {
    return 2 * i + 2;
  }
  
  _swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }
  
  insert(value) {
    this.heap.push(value);
    this._bubbleUp();
  }
  
  _bubbleUp() {
    let index = this.heap.length - 1;
    
    while (index > 0) {
      const parentIndex = this._getParentIndex(index);
      
      if (this.heap[index] >= this.heap[parentIndex]) break;
      
      this._swap(index, parentIndex);
      index = parentIndex;
    }
  }
  
  extractMin() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this._bubbleDown();
    
    return min;
  }
  
  _bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    
    while (true) {
      const leftChildIndex = this._getLeftChildIndex(index);
      const rightChildIndex = this._getRightChildIndex(index);
      let smallest = index;
      
      if (leftChildIndex < length && 
          this.heap[leftChildIndex] < this.heap[smallest]) {
        smallest = leftChildIndex;
      }
      
      if (rightChildIndex < length && 
          this.heap[rightChildIndex] < this.heap[smallest]) {
        smallest = rightChildIndex;
      }
      
      if (smallest === index) break;
      
      this._swap(index, smallest);
      index = smallest;
    }
  }
  
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  
  size() {
    return this.heap.length;
  }
  
  isEmpty() {
    return this.heap.length === 0;
  }
}
```

#### Common Heap Problems

**Kth Largest Element in Array**
```javascript
function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  
  for (const num of nums) {
    minHeap.insert(num);
    if (minHeap.size() > k) {
      minHeap.extractMin();
    }
  }
  
  return minHeap.peek();
}

// Time: O(n log k), Space: O(k)
```

**Merge K Sorted Lists**
```javascript
function mergeKLists(lists) {
  const minHeap = new MinHeap();
  const dummy = new ListNode(0);
  let current = dummy;
  
  // Add first node from each list to heap
  lists.forEach((list, index) => {
    if (list) {
      minHeap.insert({ val: list.val, index, node: list });
    }
  });
  
  while (!minHeap.isEmpty()) {
    const { val, index, node } = minHeap.extractMin();
    
    current.next = new ListNode(val);
    current = current.next;
    
    if (node.next) {
      minHeap.insert({ 
        val: node.next.val, 
        index, 
        node: node.next 
      });
    }
  }
  
  return dummy.next;
}
```

### 8. Graphs

Graphs consist of vertices (nodes) connected by edges.

#### Graph Implementation
```javascript
class Graph {
  constructor(isDirected = false) {
    this.isDirected = isDirected;
    this.adjacencyList = new Map();
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, []);
    }
  }
  
  addEdge(vertex1, vertex2, weight = 1) {
    this.addVertex(vertex1);
    this.addVertex(vertex2);
    
    this.adjacencyList.get(vertex1).push({ vertex: vertex2, weight });
    
    if (!this.isDirected) {
      this.adjacencyList.get(vertex2).push({ vertex: vertex1, weight });
    }
  }
  
  removeEdge(vertex1, vertex2) {
    if (this.adjacencyList.has(vertex1)) {
      this.adjacencyList.set(
        vertex1,
        this.adjacencyList.get(vertex1).filter(v => v.vertex !== vertex2)
      );
    }
    
    if (!this.isDirected && this.adjacencyList.has(vertex2)) {
      this.adjacencyList.set(
        vertex2,
        this.adjacencyList.get(vertex2).filter(v => v.vertex !== vertex1)
      );
    }
  }
  
  removeVertex(vertex) {
    while (this.adjacencyList.get(vertex)?.length) {
      const adjacentVertex = this.adjacencyList.get(vertex).pop().vertex;
      this.removeEdge(vertex, adjacentVertex);
    }
    this.adjacencyList.delete(vertex);
  }
  
  getVertices() {
    return Array.from(this.adjacencyList.keys());
  }
  
  getEdges(vertex) {
    return this.adjacencyList.get(vertex) || [];
  }
}
```

#### Graph Traversal Algorithms

**Breadth-First Search (BFS)**
```javascript
function bfs(graph, startVertex) {
  const visited = new Set();
  const queue = [startVertex];
  const result = [];
  
  visited.add(startVertex);
  
  while (queue.length > 0) {
    const vertex = queue.shift();
    result.push(vertex);
    
    const edges = graph.getEdges(vertex);
    for (const { vertex: neighbor } of edges) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  
  return result;
}
```

**Depth-First Search (DFS)**
```javascript
function dfs(graph, startVertex) {
  const visited = new Set();
  const result = [];
  
  function traverse(vertex) {
    if (!vertex || visited.has(vertex)) return;
    
    visited.add(vertex);
    result.push(vertex);
    
    const edges = graph.getEdges(vertex);
    for (const { vertex: neighbor } of edges) {
      if (!visited.has(neighbor)) {
        traverse(neighbor);
      }
    }
  }
  
  traverse(startVertex);
  return result;
}
```

**Dijkstra's Algorithm (Shortest Path)**
```javascript
function dijkstra(graph, startVertex) {
  const distances = {};
  const previous = {};
  const unvisited = new Set();
  
  // Initialize
  graph.getVertices().forEach(vertex => {
    distances[vertex] = vertex === startVertex ? 0 : Infinity;
    previous[vertex] = null;
    unvisited.add(vertex);
  });
  
  while (unvisited.size > 0) {
    // Find vertex with minimum distance
    let currentVertex = null;
    let minDistance = Infinity;
    
    for (const vertex of unvisited) {
      if (distances[vertex] < minDistance) {
        minDistance = distances[vertex];
        currentVertex = vertex;
      }
    }
    
    if (currentVertex === null || minDistance === Infinity) break;
    
    unvisited.delete(currentVertex);
    
    // Update distances for neighbors
    const edges = graph.getEdges(currentVertex);
    for (const { vertex: neighbor, weight } of edges) {
      if (unvisited.has(neighbor)) {
        const altDistance = distances[currentVertex] + weight;
        if (altDistance < distances[neighbor]) {
          distances[neighbor] = altDistance;
          previous[neighbor] = currentVertex;
        }
      }
    }
  }
  
  return { distances, previous };
}
```

#### Common Graph Problems

**Number of Islands**
```javascript
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  const rows = grid.length;
  const cols = grid[0].length;
  const visited = new Set();
  let count = 0;
  
  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || 
        grid[r][c] === '0' || visited.has(`${r},${c}`)) {
      return;
    }
    
    visited.add(`${r},${c}`);
    
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1' && !visited.has(`${r},${c}`)) {
        count++;
        dfs(r, c);
      }
    }
  }
  
  return count;
}
```

**Course Schedule (Cycle Detection)**
```javascript
function canFinish(numCourses, prerequisites) {
  const graph = new Map();
  const visited = new Array(numCourses).fill(0); // 0: unvisited, 1: visiting, 2: visited
  
  // Build graph
  for (const [course, prereq] of prerequisites) {
    if (!graph.has(prereq)) {
      graph.set(prereq, []);
    }
    graph.get(prereq).push(course);
  }
  
  function hasCycle(course) {
    if (visited[course] === 1) return true; // Currently visiting -> cycle
    if (visited[course] === 2) return false; // Already visited
    
    visited[course] = 1; // Mark as visiting
    
    const neighbors = graph.get(course) || [];
    for (const neighbor of neighbors) {
      if (hasCycle(neighbor)) return true;
    }
    
    visited[course] = 2; // Mark as visited
    return false;
  }
  
  for (let i = 0; i < numCourses; i++) {
    if (hasCycle(i)) return false;
  }
  
  return true;
}
```

---

## Algorithms

### 1. Sorting Algorithms

#### Bubble Sort
```javascript
function bubbleSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    
    if (!swapped) break; // Optimized: stop if no swaps
  }
  
  return arr;
}

// Time: O(n²), Space: O(1)
```

#### Selection Sort
```javascript
function selectionSort(arr) {
  const n = arr.length;
  
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  
  return arr;
}

// Time: O(n²), Space: O(1)
```

#### Insertion Sort
```javascript
function insertionSort(arr) {
  const n = arr.length;
  
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = key;
  }
  
  return arr;
}

// Time: O(n²), Space: O(1)
```

#### Merge Sort
```javascript
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }
  
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// Time: O(n log n), Space: O(n)
```

#### Quick Sort
```javascript
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}

// Average Time: O(n log n), Worst: O(n²), Space: O(log n)
```

#### Counting Sort (for integers in range)
```javascript
function countingSort(arr, min, max) {
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);
  
  // Count occurrences
  for (const num of arr) {
    count[num - min]++;
  }
  
  // Cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1];
  }
  
  // Build output array
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }
  
  return output;
}

// Time: O(n + k), Space: O(k) where k is range
```

### 2. Searching Algorithms

#### Linear Search
```javascript
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}

// Time: O(n), Space: O(1)
```

#### Binary Search (Iterative)
```javascript
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1;
}

// Time: O(log n), Space: O(1)
```

#### Binary Search (Recursive)
```javascript
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
  if (left > right) return -1;
  
  const mid = Math.floor((left + right) / 2);
  
  if (arr[mid] === target) return mid;
  if (arr[mid] < target) {
    return binarySearchRecursive(arr, target, mid + 1, right);
  } else {
    return binarySearchRecursive(arr, target, left, mid - 1);
  }
}
```

### 3. Dynamic Programming

Dynamic Programming breaks problems into overlapping subproblems and stores results.

#### Fibonacci Sequence
```javascript
// Naive recursive (inefficient)
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}

// Memoization (Top-down)
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Tabulation (Bottom-up)
function fibTab(n) {
  if (n <= 1) return n;
  
  const dp = [0, 1];
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  
  return dp[n];
}

// Space-optimized
function fibOptimized(n) {
  if (n <= 1) return n;
  
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}
```

#### Climbing Stairs
```javascript
function climbStairs(n) {
  if (n <= 2) return n;
  
  let prev2 = 1, prev1 = 2;
  
  for (let i = 3; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  
  return prev1;
}

// Time: O(n), Space: O(1)
```

#### Coin Change Problem
```javascript
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) {
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

// Time: O(amount * coins.length), Space: O(amount)
```

#### Longest Common Subsequence
```javascript
function longestCommonSubsequence(text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  
  return dp[m][n];
}

// Time: O(m*n), Space: O(m*n)
```

#### Maximum Subarray (DP Approach)
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
```

### 4. Greedy Algorithms

Greedy algorithms make locally optimal choices at each step.

#### Activity Selection Problem
```javascript
function activitySelection(start, finish) {
  const activities = [];
  for (let i = 0; i < start.length; i++) {
    activities.push({ start: start[i], finish: finish[i], index: i });
  }
  
  // Sort by finish time
  activities.sort((a, b) => a.finish - b.finish);
  
  const result = [activities[0].index];
  let lastFinish = activities[0].finish;
  
  for (let i = 1; i < activities.length; i++) {
    if (activities[i].start >= lastFinish) {
      result.push(activities[i].index);
      lastFinish = activities[i].finish;
    }
  }
  
  return result;
}
```

#### Fractional Knapsack
```javascript
function fractionalKnapsack(weights, values, capacity) {
  const items = [];
  for (let i = 0; i < weights.length; i++) {
    items.push({
      weight: weights[i],
      value: values[i],
      ratio: values[i] / weights[i],
      index: i
    });
  }
  
  // Sort by value/weight ratio
  items.sort((a, b) => b.ratio - a.ratio);
  
  let totalValue = 0;
  let remainingCapacity = capacity;
  
  for (const item of items) {
    if (remainingCapacity >= item.weight) {
      totalValue += item.value;
      remainingCapacity -= item.weight;
    } else {
      totalValue += item.ratio * remainingCapacity;
      break;
    }
  }
  
  return totalValue;
}
```

#### Jump Game
```javascript
function canJump(nums) {
  let maxReach = 0;
  
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false;
    maxReach = Math.max(maxReach, i + nums[i]);
    if (maxReach >= nums.length - 1) return true;
  }
  
  return true;
}

// Time: O(n), Space: O(1)
```

### 5. Backtracking

Backtracking explores all possible solutions by building candidates incrementally.

#### Permutations
```javascript
function permute(nums) {
  const result = [];
  
  function backtrack(path, used) {
    if (path.length === nums.length) {
      result.push([...path]);
      return;
    }
    
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      
      path.push(nums[i]);
      used[i] = true;
      backtrack(path, used);
      path.pop();
      used[i] = false;
    }
  }
  
  backtrack([], new Array(nums.length).fill(false));
  return result;
}
```

#### Subsets
```javascript
function subsets(nums) {
  const result = [];
  
  function backtrack(start, path) {
    result.push([...path]);
    
    for (let i = start; i < nums.length; i++) {
      path.push(nums[i]);
      backtrack(i + 1, path);
      path.pop();
    }
  }
  
  backtrack(0, []);
  return result;
}
```

#### N-Queens Problem
```javascript
function solveNQueens(n) {
  const result = [];
  const board = Array(n).fill(null).map(() => Array(n).fill('.'));
  
  function isValid(row, col) {
    // Check column
    for (let i = 0; i < row; i++) {
      if (board[i][col] === 'Q') return false;
    }
    
    // Check upper-left diagonal
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
      if (board[i][j] === 'Q') return false;
    }
    
    // Check upper-right diagonal
    for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {
      if (board[i][j] === 'Q') return false;
    }
    
    return true;
  }
  
  function backtrack(row) {
    if (row === n) {
      result.push(board.map(r => r.join('')));
      return;
    }
    
    for (let col = 0; col < n; col++) {
      if (isValid(row, col)) {
        board[row][col] = 'Q';
        backtrack(row + 1);
        board[row][col] = '.';
      }
    }
  }
  
  backtrack(0);
  return result;
}
```

#### Sudoku Solver
```javascript
function solveSudoku(board) {
  function isValid(row, col, num) {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false;
    }
    
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) return false;
    }
    
    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[boxRow + i][boxCol + j] === num) return false;
      }
    }
    
    return true;
  }
  
  function backtrack() {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === '.') {
          for (let num = '1'; num <= '9'; num++) {
            if (isValid(row, col, num)) {
              board[row][col] = num;
              if (backtrack()) return true;
              board[row][col] = '.';
            }
          }
          return false;
        }
      }
    }
    return true;
  }
  
  backtrack();
}
```

---

## Problem Solving Framework

### The U.P.E.S. Method

A systematic approach to solving any coding problem:

#### 1. Understand (U)
- Read the problem carefully multiple times
- Identify inputs, outputs, and constraints
- Clarify edge cases and assumptions
- Restate the problem in your own words

**Questions to ask:**
- What are the input types and ranges?
- What should the output look like?
- Are there any special cases (empty input, single element, etc.)?
- What are the time/space complexity requirements?

#### 2. Plan (P)
- Choose appropriate data structures
- Select the right algorithm approach
- Break down the problem into smaller steps
- Consider multiple approaches and their trade-offs

**Common Strategies:**
- Brute force → Optimize
- Two pointers
- Sliding window
- Divide and conquer
- Dynamic programming
- Greedy approach
- Backtracking
- BFS/DFS for graphs/trees

#### 3. Execute (E)
- Write clean, readable code
- Use meaningful variable names
- Add comments for complex logic
- Handle edge cases explicitly

**Best Practices:**
- Start with pseudocode if needed
- Implement incrementally
- Test with small examples as you go
- Keep code modular

#### 4. Scrutinize (S)
- Test with various inputs including edge cases
- Analyze time and space complexity
- Look for optimizations
- Verify correctness

**Testing Checklist:**
- Empty input
- Single element
- Maximum/minimum values
- Duplicate values
- Negative numbers (if applicable)
- Already sorted/reverse sorted arrays

### Example Walkthrough

**Problem**: Given an array of integers, find two numbers that add up to a specific target.

#### Step 1: Understand
- Input: Array of integers `nums`, integer `target`
- Output: Indices of two numbers that sum to target
- Constraints: Exactly one solution, cannot use same element twice
- Edge cases: Empty array, no solution, negative numbers

#### Step 2: Plan
**Approach 1: Brute Force**
- Check every pair of numbers
- Time: O(n²), Space: O(1)

**Approach 2: Hash Map (Optimized)**
- Store each number and its index in a map
- For each number, check if (target - number) exists in map
- Time: O(n), Space: O(n)

Choose Approach 2 for efficiency.

#### Step 3: Execute
```javascript
function twoSum(nums, target) {
  const numToIndex = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    
    if (numToIndex.has(complement)) {
      return [numToIndex.get(complement), i];
    }
    
    numToIndex.set(nums[i], i);
  }
  
  return []; // Should never reach here per problem constraints
}
```

#### Step 4: Scrutinize
**Test Cases:**
```javascript
twoSum([2, 7, 11, 15], 9); // [0, 1]
twoSum([3, 2, 4], 6); // [1, 2]
twoSum([3, 3], 6); // [0, 1]
twoSum([-1, -2, -3, -4, -5], -8); // [2, 4]
```

**Complexity Analysis:**
- Time: O(n) - single pass through array
- Space: O(n) - hash map stores up to n elements

**Optimization Check:** Can't do better than O(n) since we must examine each element at least once.

---

## Logical Thinking Development

### 1. Pattern Recognition

Develop the ability to recognize common patterns in problems:

#### Common Patterns

**Two Pointers**
- Used for sorted arrays or when comparing elements from both ends
- Examples: Two Sum (sorted), Container With Most Water, Palindrome check

```javascript
// Example: Container With Most Water
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;
  
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    maxArea = Math.max(maxArea, width * h);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}
```

**Sliding Window**
- Fixed or variable size window moving through data
- Examples: Maximum sum subarray of size k, Longest substring without repeating characters

```javascript
// Example: Maximum Sum Subarray of Size K
function maxSumSubarray(arr, k) {
  let windowSum = 0;
  let maxSum = 0;
  
  // Initialize first window
  for (let i = 0; i < k; i++) {
    windowSum += arr[i];
  }
  
  maxSum = windowSum;
  
  // Slide window
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum + arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  
  return maxSum;
}
```

**Fast and Slow Pointers**
- Detect cycles, find middle element
- Examples: Linked list cycle, Middle of linked list

```javascript
// Example: Find Middle of Linked List
function findMiddle(head) {
  let slow = head;
  let fast = head;
  
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  
  return slow;
}
```

**Prefix Sum**
- Precompute cumulative sums for range queries
- Examples: Subarray sum equals k, Range sum query

```javascript
// Example: Subarray Sum Equals K
function subarraySum(nums, k) {
  const prefixSumCount = new Map();
  prefixSumCount.set(0, 1);
  
  let currentSum = 0;
  let count = 0;
  
  for (const num of nums) {
    currentSum += num;
    
    if (prefixSumCount.has(currentSum - k)) {
      count += prefixSumCount.get(currentSum - k);
    }
    
    prefixSumCount.set(currentSum, (prefixSumCount.get(currentSum) || 0) + 1);
  }
  
  return count;
}
```

### 2. Decomposition Strategy

Break complex problems into manageable subproblems:

**Example**: Design a URL shortener

1. **Generate short code**: Hash function or random string generation
2. **Store mapping**: Database with short code → original URL
3. **Redirect**: Lookup short code and redirect to original URL
4. **Analytics**: Track click counts, timestamps, etc.

### 3. Abstraction Skills

Learn to identify the core problem beneath surface details:

**Surface Problem**: "Find the most frequent word in a document"
**Core Problem**: Count frequencies and find maximum → Hash map + iteration

**Surface Problem**: "Schedule meetings without conflicts"
**Core Problem**: Interval overlap detection → Sort intervals + greedy selection

### 4. Mental Models

Develop mental models for different problem types:

#### Recursion Mental Model
1. Base case: When to stop recursing
2. Recursive case: How to break down the problem
3. Combine: How to use recursive results

#### Dynamic Programming Mental Model
1. Define state: What represents a subproblem?
2. State transition: How does one state lead to another?
3. Base cases: What are the simplest states?
4. Order of computation: In what order should states be computed?

#### Graph Mental Model
1. Nodes: What are the entities?
2. Edges: What are the relationships?
3. Traversal: BFS for shortest path, DFS for exploration
4. Special properties: Cycles, connectivity, weights

### 5. Practice Techniques

#### Deliberate Practice
- Focus on weak areas
- Solve problems slightly above current level
- Review and understand solutions thoroughly
- Re-solve problems after a few days

#### Spaced Repetition
- Review problems at increasing intervals
- Use flashcards for patterns and algorithms
- Maintain a problem journal

#### Pair Programming
- Explain your thinking aloud
- Learn from others' approaches
- Practice communication skills

### 6. Common Pitfalls to Avoid

1. **Jumping to code too quickly**: Always plan first
2. **Ignoring edge cases**: Test with boundary conditions
3. **Over-optimizing prematurely**: Get it working first, then optimize
4. **Not asking clarifying questions**: Understand requirements fully
5. **Giving up too soon**: Persist through difficulty

---

## Object-Oriented Programming in JavaScript

### 1. Core OOP Principles

#### Encapsulation
Bundling data and methods that operate on that data within a single unit.

```javascript
class BankAccount {
  #balance = 0; // Private field
  
  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
  }
  
  deposit(amount) {
    if (amount <= 0) throw new Error("Amount must be positive");
    this.#balance += amount;
    return this.#balance;
  }
  
  withdraw(amount) {
    if (amount <= 0 || amount > this.#balance) {
      throw new Error("Invalid withdrawal amount");
    }
    this.#balance -= amount;
    return this.#balance;
  }
  
  getBalance() {
    return this.#balance;
  }
  
  // Getter method
  get balance() {
    return this.#balance;
  }
}

const account = new BankAccount("John", 1000);
account.deposit(500);
console.log(account.balance); // 1500
// account.#balance; // Error: Private field
```

#### Inheritance
Creating new classes based on existing ones.

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    return `${this.name} makes a sound`;
  }
  
  move() {
    return `${this.name} moves`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
  
  // Method overriding
  speak() {
    return `${this.name} barks`;
  }
  
  // New method
  fetch() {
    return `${this.name} fetches the ball`;
  }
}

class Cat extends Animal {
  speak() {
    return `${this.name} meows`;
  }
  
  climb() {
    return `${this.name} climbs a tree`;
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
console.log(dog.speak()); // "Buddy barks"
console.log(dog.move()); // "Buddy moves" (inherited)
console.log(dog.fetch()); // "Buddy fetches the ball"
```

#### Polymorphism
Same interface, different implementations.

```javascript
class Shape {
  area() {
    throw new Error("Must implement area method");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(base, height) {
    super();
    this.base = base;
    this.height = height;
  }
  
  area() {
    return 0.5 * this.base * this.height;
  }
}

// Polymorphic behavior
function printArea(shape) {
  console.log(`Area: ${shape.area()}`);
}

const shapes = [
  new Circle(5),
  new Rectangle(4, 6),
  new Triangle(3, 8)
];

shapes.forEach(shape => printArea(shape));
```

#### Abstraction
Hiding complex implementation details.

```javascript
class Database {
  constructor(connectionString) {
    this.connectionString = connectionString;
    this.connection = null;
  }
  
  async connect() {
    // Complex connection logic hidden
    console.log(`Connecting to ${this.connectionString}`);
    this.connection = { /* connection object */ };
    return this;
  }
  
  async query(sql, params) {
    if (!this.connection) {
      await this.connect();
    }
    // Complex query execution hidden
    console.log(`Executing: ${sql}`);
    return { /* result */ };
  }
  
  async disconnect() {
    if (this.connection) {
      console.log("Disconnecting");
      this.connection = null;
    }
  }
}

// User doesn't need to know connection details
const db = new Database("mysql://localhost:3306/mydb");
await db.query("SELECT * FROM users");
await db.disconnect();
```

### 2. Advanced OOP Concepts

#### Composition over Inheritance
Building objects by combining simpler objects.

```javascript
// Instead of deep inheritance
class Employee {
  constructor(name) {
    this.name = name;
  }
}

class Manager extends Employee {
  manageTeam() {
    return `${this.name} manages team`;
  }
}

class Developer extends Employee {
  code() {
    return `${this.name} writes code`;
  }
}

class TechLead extends Manager {
  code() {
    return `${this.name} writes code`;
  }
}

// Better: Composition
const canManage = {
  manageTeam() {
    return `${this.name} manages team`;
  }
};

const canCode = {
  code() {
    return `${this.name} writes code`;
  }
};

const canTeach = {
  teach() {
    return `${this.name} teaches others`;
  }
};

class Person {
  constructor(name, abilities = []) {
    this.name = name;
    Object.assign(this, ...abilities);
  }
}

const manager = new Person("Alice", [canManage]);
const developer = new Person("Bob", [canCode]);
const techLead = new Person("Charlie", [canManage, canCode, canTeach]);

console.log(manager.manageTeam());
console.log(developer.code());
console.log(techLead.manageTeam());
console.log(techLead.code());
console.log(techLead.teach());
```

#### Mixins
Reusable sets of methods.

```javascript
const EventEmitterMixin = {
  on(event, callback) {
    if (!this._events) this._events = {};
    if (!this._events[event]) this._events[event] = [];
    this._events[event].push(callback);
    return this;
  },
  
  emit(event, data) {
    if (this._events && this._events[event]) {
      this._events[event].forEach(callback => callback(data));
    }
    return this;
  },
  
  off(event, callback) {
    if (this._events && this._events[event]) {
      this._events[event] = this._events[event].filter(cb => cb !== callback);
    }
    return this;
  }
};

const LoggerMixin = {
  log(message) {
    console.log(`[${new Date().toISOString()}] ${message}`);
  },
  
  error(message) {
    console.error(`[ERROR] ${message}`);
  }
};

class UserService {
  constructor() {
    Object.assign(this, EventEmitterMixin, LoggerMixin);
  }
  
  createUser(userData) {
    this.log("Creating user");
    const user = { id: Date.now(), ...userData };
    this.emit('userCreated', user);
    return user;
  }
}

const userService = new UserService();
userService.on('userCreated', user => {
  console.log(`New user created: ${user.id}`);
});

userService.createUser({ name: "John", email: "john@example.com" });
```

#### Factory Pattern
Creating objects without specifying exact class.

```javascript
class Car {
  constructor(type) {
    this.type = type;
  }
  
  drive() {
    return `${this.type} car is driving`;
  }
}

class Truck {
  constructor(type) {
    this.type = type;
  }
  
  haul() {
    return `${this.type} truck is hauling cargo`;
  }
}

class Motorcycle {
  constructor(type) {
    this.type = type;
  }
  
  ride() {
    return `${this.type} motorcycle is riding`;
  }
}

class VehicleFactory {
  static createVehicle(type, category) {
    switch (category.toLowerCase()) {
      case 'car':
        return new Car(type);
      case 'truck':
        return new Truck(type);
      case 'motorcycle':
        return new Motorcycle(type);
      default:
        throw new Error(`Unknown vehicle category: ${category}`);
    }
  }
}

const myCar = VehicleFactory.createVehicle("Sedan", "car");
const myTruck = VehicleFactory.createVehicle("Pickup", "truck");

console.log(myCar.drive());
console.log(myTruck.haul());
```

#### Singleton Pattern
Ensuring only one instance exists.

```javascript
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    
    this.connection = null;
    this.isConnected = false;
    DatabaseConnection.instance = this;
  }
  
  connect(connectionString) {
    if (this.isConnected) {
      console.log("Already connected");
      return this;
    }
    
    console.log(`Connecting to ${connectionString}`);
    this.connection = { /* connection */ };
    this.isConnected = true;
    return this;
  }
  
  disconnect() {
    if (!this.isConnected) return this;
    
    console.log("Disconnecting");
    this.connection = null;
    this.isConnected = false;
    return this;
  }
  
  query(sql) {
    if (!this.isConnected) {
      throw new Error("Not connected to database");
    }
    console.log(`Executing: ${sql}`);
    return { /* result */ };
  }
}

// Both variables reference the same instance
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log(db1 === db2); // true

db1.connect("mysql://localhost:3306/mydb");
db2.query("SELECT * FROM users"); // Uses same connection
```

#### Observer Pattern
One-to-many dependency between objects.

```javascript
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  
  update(data) {
    console.log(`${this.name} received: ${data}`);
  }
}

// Usage
const weatherStation = new Subject();

const phoneDisplay = new Observer("Phone Display");
const tabletDisplay = new Observer("Tablet Display");
const webDashboard = new Observer("Web Dashboard");

weatherStation.subscribe(phoneDisplay);
weatherStation.subscribe(tabletDisplay);
weatherStation.subscribe(webDashboard);

weatherStation.notify("Temperature: 25°C");
weatherStation.notify("Humidity: 60%");

weatherStation.unsubscribe(tabletDisplay);
weatherStation.notify("Pressure: 1013 hPa");
```

### 3. Modern JavaScript OOP Features

#### Class Fields and Static Properties
```javascript
class Counter {
  // Public field
  count = 0;
  
  // Private field
  #privateCount = 0;
  
  // Static property
  static instances = 0;
  
  // Static private field
  static #totalCreated = 0;
  
  constructor(initialValue = 0) {
    this.count = initialValue;
    Counter.instances++;
    Counter.#totalCreated++;
  }
  
  increment() {
    this.count++;
    this.#privateCount++;
  }
  
  getPrivateCount() {
    return this.#privateCount;
  }
  
  static getTotalCreated() {
    return Counter.#totalCreated;
  }
  
  static resetInstances() {
    Counter.instances = 0;
  }
}

const counter1 = new Counter(5);
const counter2 = new Counter(10);

counter1.increment();
console.log(counter1.count); // 6
console.log(counter1.getPrivateCount()); // 1

console.log(Counter.instances); // 2
console.log(Counter.getTotalCreated()); // 2
```

#### Getters and Setters
```javascript
class Person {
  constructor(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
  
  set fullName(value) {
    const [firstName, lastName] = value.split(' ');
    this.firstName = firstName;
    this.lastName = lastName;
  }
  
  get initials() {
    return `${this.firstName[0]}.${this.lastName[0]}.`;
  }
}

const person = new Person("John", "Doe");
console.log(person.fullName); // "John Doe"
console.log(person.initials); // "J.D."

person.fullName = "Jane Smith";
console.log(person.firstName); // "Jane"
console.log(person.lastName); // "Smith"
```

#### Async Methods in Classes
```javascript
class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.token = null;
  }
  
  async authenticate(username, password) {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    
    const data = await response.json();
    this.token = data.token;
    return data;
  }
  
  async fetchData(endpoint) {
    if (!this.token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      headers: { 'Authorization': `Bearer ${this.token}` }
    });
    
    return await response.json();
  }
  
  async postData(endpoint, data) {
    if (!this.token) {
      throw new Error("Not authenticated");
    }
    
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    return await response.json();
  }
}
```

### 4. OOP Design Principles (SOLID)

#### Single Responsibility Principle (SRP)
A class should have only one reason to change.

```javascript
// Bad: Multiple responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() {
    // Save to database
  }
  
  validate() {
    // Validate email format
  }
  
  sendEmail(subject, message) {
    // Send email
  }
}

// Good: Separated responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) {
    // Save to database
  }
}

class UserValidator {
  static validateEmail(email) {
    // Validate email format
  }
}

class EmailService {
  send(to, subject, message) {
    // Send email
  }
}
```

#### Open/Closed Principle (OCP)
Open for extension, closed for modification.

```javascript
// Bad: Need to modify for new shapes
class AreaCalculator {
  calculate(shape) {
    if (shape.type === 'circle') {
      return Math.PI * shape.radius ** 2;
    } else if (shape.type === 'rectangle') {
      return shape.width * shape.height;
    }
    // Need to add more if statements for new shapes
  }
}

// Good: Extend without modifying
class Shape {
  area() {
    throw new Error("Must implement area");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }
}

class AreaCalculator {
  calculate(shape) {
    return shape.area(); // Works with any Shape subclass
  }
}
```

#### Liskov Substitution Principle (LSP)
Subtypes must be substitutable for their base types.

```javascript
// Bad: Violates LSP
class Bird {
  fly() {
    return "Flying";
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly");
  }
}

// Good: Proper hierarchy
class Bird {
  move() {
    throw new Error("Must implement move");
  }
}

class FlyingBird extends Bird {
  fly() {
    return "Flying";
  }
  
  move() {
    return this.fly();
  }
}

class SwimmingBird extends Bird {
  swim() {
    return "Swimming";
  }
  
  move() {
    return this.swim();
  }
}

class Sparrow extends FlyingBird {}
class Penguin extends SwimmingBird {}
```

#### Interface Segregation Principle (ISP)
Clients shouldn't depend on interfaces they don't use.

```javascript
// Bad: Fat interface
class Worker {
  work() {}
  eat() {}
  sleep() {}
}

class Robot implements Worker {
  work() { /* working */ }
  eat() { 
    // Robots don't eat! 
    throw new Error("Robots don't eat");
  }
  sleep() {
    // Robots don't sleep!
    throw new Error("Robots don't sleep");
  }
}

// Good: Segregated interfaces
class Workable {
  work() {}
}

class Eatable {
  eat() {}
}

class Sleepable {
  sleep() {}
}

class HumanWorker extends Workable, Eatable, Sleepable {
  work() { /* working */ }
  eat() { /* eating */ }
  sleep() { /* sleeping */ }
}

class RobotWorker extends Workable {
  work() { /* working */ }
}
```

#### Dependency Inversion Principle (DIP)
Depend on abstractions, not concretions.

```javascript
// Bad: Depends on concrete class
class LightBulb {
  turnOn() {
    console.log("Light on");
  }
  
  turnOff() {
    console.log("Light off");
  }
}

class Switch {
  constructor() {
    this.bulb = new LightBulb(); // Direct dependency
  }
  
  operate() {
    this.bulb.turnOn();
  }
}

// Good: Depends on abstraction
class Switchable {
  turnOn() {}
  turnOff() {}
}

class LightBulb extends Switchable {
  turnOn() {
    console.log("Light on");
  }
  
  turnOff() {
    console.log("Light off");
  }
}

class Fan extends Switchable {
  turnOn() {
    console.log("Fan on");
  }
  
  turnOff() {
    console.log("Fan off");
  }
}

class Switch {
  constructor(device) {
    this.device = device; // Dependency injection
  }
  
  operate() {
    this.device.turnOn();
  }
}

// Can now switch any Switchable device
const lightSwitch = new Switch(new LightBulb());
const fanSwitch = new Switch(new Fan());
```

---

## Practice Problems & Solutions

### Easy Level

#### 1. Reverse String
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Alternative without built-in methods
function reverseStringManual(str) {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
}
```

#### 2. Valid Anagram
```javascript
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  
  const charCount = {};
  
  for (const char of s) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  for (const char of t) {
    if (!charCount[char]) return false;
    charCount[char]--;
  }
  
  return true;
}
```

#### 3. Best Time to Buy and Sell Stock
```javascript
function maxProfit(prices) {
  let minPrice = Infinity;
  let maxProfit = 0;
  
  for (const price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  
  return maxProfit;
}
```

### Medium Level

#### 4. Three Sum
```javascript
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];
  
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // Skip duplicates
    
    let left = i + 1;
    let right = nums.length - 1;
    
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;
        
        left++;
        right--;
      } else if (sum < 0) {
        left++;
      } else {
        right--;
      }
    }
  }
  
  return result;
}
```

#### 5. Group Anagrams
```javascript
function groupAnagrams(strs) {
  const map = new Map();
  
  for (const str of strs) {
    const sorted = str.split('').sort().join('');
    if (!map.has(sorted)) {
      map.set(sorted, []);
    }
    map.get(sorted).push(str);
  }
  
  return Array.from(map.values());
}
```

#### 6. Top K Frequent Elements
```javascript
function topKFrequent(nums, k) {
  const freqMap = new Map();
  
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }
  
  const buckets = [];
  freqMap.forEach((count, num) => {
    if (!buckets[count]) buckets[count] = [];
    buckets[count].push(num);
  });
  
  const result = [];
  for (let i = buckets.length - 1; i >= 0 && result.length < k; i--) {
    if (buckets[i]) {
      result.push(...buckets[i]);
    }
  }
  
  return result.slice(0, k);
}
```

### Hard Level

#### 7. Merge K Sorted Lists
```javascript
function mergeKLists(lists) {
  if (!lists || lists.length === 0) return null;
  
  while (lists.length > 1) {
    const merged = [];
    
    for (let i = 0; i < lists.length; i += 2) {
      if (i + 1 < lists.length) {
        merged.push(mergeTwoLists(lists[i], lists[i + 1]));
      } else {
        merged.push(lists[i]);
      }
    }
    
    lists = merged;
  }
  
  return lists[0];
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
```

#### 8. Regular Expression Matching
```javascript
function isMatch(s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(false));
  
  dp[0][0] = true;
  
  // Handle patterns like a*, a*b*, a*b*c*
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') {
      dp[0][j] = dp[0][j - 2];
    }
  }
  
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        dp[i][j] = dp[i][j - 2]; // Zero occurrence
        
        if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
          dp[i][j] = dp[i][j] || dp[i - 1][j]; // One or more occurrence
        }
      }
    }
  }
  
  return dp[m][n];
}
```

#### 9. Word Ladder
```javascript
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;
  
  const queue = [[beginWord, 1]];
  const visited = new Set([beginWord]);
  
  while (queue.length > 0) {
    const [word, level] = queue.shift();
    
    if (word === endWord) return level;
    
    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) { // a-z
        const char = String.fromCharCode(c);
        const newWord = word.slice(0, i) + char + word.slice(i + 1);
        
        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, level + 1]);
        }
      }
    }
  }
  
  return 0;
}
```

---

## Resources & Next Steps

### Recommended Resources

#### Books
1. **"Cracking the Coding Interview"** by Gayle Laakmann McDowell
2. **"Elements of Programming Interviews"** by Adnan Aziz
3. **"JavaScript: The Good Parts"** by Douglas Crockford
4. **"You Don't Know JS"** series by Kyle Simpson
5. **"Clean Code"** by Robert C. Martin

#### Online Platforms
1. **LeetCode** - Comprehensive problem collection
2. **HackerRank** - Beginner-friendly with tutorials
3. **CodeSignal** - Gamified learning experience
4. **Exercism** - Mentor-guided practice
5. **Codewars** - Community-driven challenges

#### Video Courses
1. **freeCodeCamp** - Free comprehensive courses
2. **Udemy** - "JavaScript Algorithms and Data Structures Masterclass"
3. **Coursera** - "Algorithmic Toolbox" by UC San Diego
4. **YouTube** - Channels like CS Dojo, NeetCode, takeUforward

### Study Plan

#### Week 1-2: Foundations
- Arrays and Strings
- Basic sorting and searching
- Time and space complexity analysis

#### Week 3-4: Linear Data Structures
- Linked Lists
- Stacks and Queues
- Hash Tables

#### Week 5-6: Trees and Graphs
- Binary Trees
- Binary Search Trees
- Graph traversal algorithms

#### Week 7-8: Advanced Algorithms
- Dynamic Programming
- Greedy Algorithms
- Backtracking

#### Week 9-10: Practice and Review
- Mock interviews
- Company-specific problems
- System design basics

### Tips for Success

1. **Consistency Over Intensity**: Practice daily for 1-2 hours rather than cramming
2. **Understand, Don't Memorize**: Focus on understanding patterns and concepts
3. **Write Code by Hand**: Practice writing code without IDE assistance
4. **Explain Your Thinking**: Practice articulating your approach clearly
5. **Review Mistakes**: Keep a journal of mistakes and lessons learned
6. **Build Projects**: Apply DSA concepts in real projects
7. **Join Communities**: Participate in coding communities for support and motivation

### Final Thoughts

Mastering DSA, problem-solving, logical thinking, and OOP is a journey, not a destination. The key is consistent practice, patience, and a growth mindset. Remember:

- Every expert was once a beginner
- Struggle is part of the learning process
- Focus on progress, not perfection
- Enjoy the process of solving problems

Start today, stay consistent, and you'll see remarkable improvement in your coding abilities and problem-solving skills.

Good luck on your coding journey! 🚀
