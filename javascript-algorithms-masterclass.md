# JavaScript Algorithms and Data Structures Masterclass

## Course Overview
A comprehensive guide to mastering algorithms, data structures, and problem-solving patterns in JavaScript. This course progresses from foundational complexity analysis to advanced dynamic programming.

---

## 📑 Table of Contents
1. [Big O Notation](#big-o-notation)
2. [Analyzing Performance](#analyzing-performance-of-arrays-and-objects)
3. [Problem Solving Approach](#problem-solving-approach)
4. [Problem Solving Patterns](#problem-solving-patterns)
5. [Recursion](#recursion)
6. [Searching Algorithms](#searching-algorithms)
7. [Sorting Algorithms](#sorting-algorithms)
8. [Data Structures](#data-structures)
9. [Trees & Heaps](#trees--heaps)
10. [Hash Tables](#hash-tables)
11. [Graphs](#graphs)
12. [Dynamic Programming](#dynamic-programming)

---

## 1. Big O Notation
*Understanding how to measure code efficiency.*

### Key Concepts
- **Time Complexity**: How runtime grows as input size increases.
- **Space Complexity**: How much extra memory is required.
- **Common Complexities**:
  - $O(1)$: Constant time (e.g., accessing an array index).
  - $O(\log n)$: Logarithmic time (e.g., binary search).
  - $O(n)$: Linear time (e.g., simple loop).
  - $O(n \log n)$: Linearithmic time (e.g., efficient sorting).
  - $O(n^2)$: Quadratic time (e.g., nested loops).

### Code Example: Comparing Complexities

```javascript
// O(1) - Constant Time
function accessElement(arr, index) {
  return arr[index];
}

// O(n) - Linear Time
function sumArray(arr) {
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total += arr[i];
  }
  return total;
}

// O(n²) - Quadratic Time
function printAllPairs(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}

// O(log n) - Logarithmic Time (Binary Search)
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### Lectures
- Intro to Big O & Visualizing Time Complexities
- Simplifying Big O Expressions
- Space Complexity Analysis

---

## 2. Analyzing Performance of Arrays and Objects
*When to use which data structure?*

### Objects (Hash Maps)
- **Access/Insert/Delete**: $O(1)$ on average.
- **Best for**: Unordered data, key-value lookups.

### Arrays
- **Access**: $O(1)$.
- **Insert/Delete (start)**: $O(n)$ (requires re-indexing).
- **Insert/Delete (end)**: $O(1)$.
- **Methods**: `push`, `pop` are fast; `shift`, `unshift`, `splice` can be slow.

### Code Example: Object vs Array Performance

```javascript
// Object lookup - O(1)
const userRoles = { admin: true, user: false, guest: false };
console.log(userRoles.admin); // Instant access

// Array search - O(n)
const roles = ['admin', 'user', 'guest'];
const isAdmin = roles.includes('admin'); // Must iterate through array

// When to use which?
// Use Object for: frequency counting, quick lookups
// Use Array for: ordered data, indexed access, iteration
```

---

## 3. Problem Solving Approach
*A systematic 5-step method to tackle any coding challenge.*

1. **Understand The Problem**: Restate inputs/outputs, identify constraints.
2. **Concrete Examples**: Create simple, complex, and edge-case examples.
3. **Break It Down**: Write pseudocode or comments for steps.
4. **Solve/Simplify**: Code the solution; if stuck, solve a simpler version first.
5. **Look Back & Refactor**: Check for errors, optimize time/space, clean up code.

### Code Example: Applying the Approach

```javascript
// Problem: Write a function that takes a string and returns true if it's a palindrome

// Step 1: Understand - Input: string, Output: boolean, Case-insensitive, ignore spaces
// Step 2: Examples - "racecar" → true, "A man a plan" → true, "hello" → false
// Step 3: Break down - Clean string → reverse it → compare with original
// Step 4: Solve
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// Step 5: Refactor - Use two pointers for O(1) space
function isPalindromeOptimized(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  let left = 0;
  let right = cleaned.length - 1;
  
  while (left < right) {
    if (cleaned[left] !== cleaned[right]) return false;
    left++;
    right--;
  }
  return true;
}
```

---

## 4. Problem Solving Patterns
*Reusable templates for common algorithmic problems.*

### Frequency Counter Pattern
Uses objects/sets to store values/frequencies. Avoids nested loops ($O(n^2) \to O(n)$).

```javascript
// Challenge: Check if two strings are valid anagrams
function validAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;
  
  const frequencyCounter = {};
  
  // Count characters in first string
  for (let char of str1) {
    frequencyCounter[char] = (frequencyCounter[char] || 0) + 1;
  }
  
  // Decrement counts for second string
  for (let char of str2) {
    if (!frequencyCounter[char]) return false;
    frequencyCounter[char]--;
  }
  
  return true;
}

console.log(validAnagram('listen', 'silent')); // true
```

### Multiple Pointers Pattern
Creates pointers moving towards each other or in same direction. Great for sorted arrays.

```javascript
// Challenge: Count unique values in a sorted array
function countUniqueValues(arr) {
  if (arr.length === 0) return 0;
  
  let i = 0; // First pointer
  
  for (let j = 1; j < arr.length; j++) { // Second pointer
    if (arr[i] !== arr[j]) {
      i++;
      arr[i] = arr[j];
    }
  }
  
  return i + 1;
}

console.log(countUniqueValues([1, 1, 2, 3, 3, 4])); // 4
```

### Sliding Window Pattern
Maintains a "window" (subarray/string) that slides over data.

```javascript
// Challenge: Find maximum sum of n consecutive elements
function maxSubarraySum(arr, n) {
  if (n > arr.length) return null;
  
  let maxSum = 0;
  let tempSum = 0;
  
  // Calculate initial window sum
  for (let i = 0; i < n; i++) {
    maxSum += arr[i];
  }
  
  tempSum = maxSum;
  
  // Slide the window
  for (let i = n; i < arr.length; i++) {
    tempSum = tempSum - arr[i - n] + arr[i];
    maxSum = Math.max(maxSum, tempSum);
  }
  
  return maxSum;
}

console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5], 3)); // 19 (9+2+8)
```

### Divide And Conquer Pattern
Splits data into smaller chunks, solves them, and combines results.

```javascript
// Challenge: Binary Search (already shown in Big O section)
// Another example: Merge Sort helper - merging two sorted arrays
function merge(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}

console.log(merge([1, 3, 5], [2, 4, 6])); // [1, 2, 3, 4, 5, 6]
```

---

## 5. Recursion
*Functions that call themselves.*

### Core Concepts
- **Base Case**: The condition where recursion stops (prevents stack overflow).
- **Recursive Step**: The function calling itself with modified input.
- **Call Stack**: How the computer keeps track of function calls.

### Code Examples

```javascript
// Example 1: Factorial (Iterative vs Recursive)
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

function factorialRecursive(n) {
  if (n === 0 || n === 1) return 1; // Base case
  return n * factorialRecursive(n - 1); // Recursive step
}

// Example 2: Helper Method Recursion
function collectOddValues(arr) {
  let result = [];
  
  function helper(helperInput) {
    if (helperInput.length === 0) return;
    
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0]);
    }
    
    helper(helperInput.slice(1));
  }
  
  helper(arr);
  return result;
}

// Example 3: Pure Recursion
function collectOddValuesPure(arr) {
  if (arr.length === 0) return [];
  
  if (arr[0] % 2 !== 0) {
    return [arr[0], ...collectOddValuesPure(arr.slice(1))];
  }
  
  return collectOddValuesPure(arr.slice(1));
}

// Example 4: Fibonacci Sequence
function fibonacci(n) {
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example 5: Flatten nested array
function flatten(arr) {
  let result = [];
  
  for (let item of arr) {
    if (Array.isArray(item)) {
      result = result.concat(flatten(item));
    } else {
      result.push(item);
    }
  }
  
  return result;
}

console.log(flatten([1, [2, 3], [4, [5, 6]]])); // [1, 2, 3, 4, 5, 6]
```

---

## 6. Searching Algorithms

| Algorithm | Time Complexity (Avg) | Space Complexity | Description |
| :--- | :--- | :--- | :--- |
| **Linear Search** | $O(n)$ | $O(1)$ | Checks every element sequentially. |
| **Binary Search** | $O(\log n)$ | $O(1)$ | Efficient search on **sorted** arrays by halving the search space. |
| **Naive String Search** | $O(n \cdot m)$ | $O(1)$ | Searches for a substring within a string. |

### Code Examples

```javascript
// Linear Search
function linearSearch(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) return i;
  }
  return -1;
}

// Binary Search (requires sorted array)
function binarySearch(arr, val) {
  let start = 0;
  let end = arr.length - 1;
  let middle = Math.floor((start + end) / 2);
  
  while (arr[middle] !== val && start <= end) {
    if (val < arr[middle]) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
    middle = Math.floor((start + end) / 2);
  }
  
  return arr[middle] === val ? middle : -1;
}

// Naive String Search
function naiveStringSearch(long, pattern) {
  let count = 0;
  
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] !== long[i + j]) break;
      if (j === pattern.length - 1) count++;
    }
  }
  
  return count;
}

console.log(naiveStringSearch("lorie loled", "lo")); // 2
```

---

## 7. Sorting Algorithms

### Basic Sorts ($O(n^2)$)

```javascript
// Bubble Sort
function bubbleSort(arr) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };
  
  for (let i = arr.length; i > 0; i--) {
    let noSwaps = true;
    
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        noSwaps = false;
      }
    }
    
    if (noSwaps) break; // Optimization: stop if already sorted
  }
  
  return arr;
}

// Selection Sort
function selectionSort(arr) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };
  
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }
    
    if (i !== lowest) swap(arr, i, lowest);
  }
  
  return arr;
}

// Insertion Sort
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    let j = i - 1;
    
    while (j >= 0 && arr[j] > currentVal) {
      arr[j + 1] = arr[j];
      j--;
    }
    
    arr[j + 1] = currentVal;
  }
  
  return arr;
}
```

### Advanced Sorts

```javascript
// Merge Sort - O(n log n)
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  
  return merge(left, right);
}

function merge(arr1, arr2) {
  const result = [];
  let i = 0, j = 0;
  
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] < arr2[j]) {
      result.push(arr1[i]);
      i++;
    } else {
      result.push(arr2[j]);
      j++;
    }
  }
  
  return [...result, ...arr1.slice(i), ...arr2.slice(j)];
}

// Quick Sort - O(n log n) average
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const pivotIndex = pivot(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function pivot(arr, start = 0, end = arr.length - 1) {
  const pivot = arr[start];
  let swapIdx = start;
  
  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  
  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }
  
  swap(arr, start, swapIdx);
  return swapIdx;
}

// Radix Sort - O(nk) for numbers
function radixSort(nums) {
  const maxDigitCount = mostDigits(nums);
  
  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => []);
    
    for (let i = 0; i < nums.length; i++) {
      const digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }
    
    nums = [].concat(...digitBuckets);
  }
  
  return nums;
}

function getDigit(num, place) {
  return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums) {
  let maxDigits = 0;
  for (let num of nums) {
    maxDigits = Math.max(maxDigits, digitCount(num));
  }
  return maxDigits;
}
```

---

## 8. Data Structures Implementation

### Singly Linked Lists

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  
  pop() {
    if (!this.head) return undefined;
    
    let current = this.head;
    let newTail = current;
    
    while (current.next) {
      newTail = current;
      current = current.next;
    }
    
    this.tail = newTail;
    this.tail.next = null;
    this.length--;
    
    if (this.length === 0) {
      this.head = null;
      this.tail = null;
    }
    
    return current;
  }
  
  shift() {
    if (!this.head) return undefined;
    
    const currentHead = this.head;
    this.head = currentHead.next;
    this.length--;
    
    if (this.length === 0) {
      this.tail = null;
    }
    
    return currentHead;
  }
  
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
  
  get(index) {
    if (index < 0 || index >= this.length) return null;
    
    let counter = 0;
    let current = this.head;
    
    while (counter !== index) {
      current = current.next;
      counter++;
    }
    
    return current;
  }
  
  set(index, val) {
    const foundNode = this.get(index);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }
  
  insert(index, val) {
    if (index < 0 || index > this.length) return false;
    if (index === this.length) return !!this.push(val);
    if (index === 0) return !!this.unshift(val);
    
    const newNode = new Node(val);
    const prevNode = this.get(index - 1);
    const temp = prevNode.next;
    
    prevNode.next = newNode;
    newNode.next = temp;
    this.length++;
    return true;
  }
  
  remove(index) {
    if (index < 0 || index >= this.length) return undefined;
    if (index === 0) return this.shift();
    if (index === this.length - 1) return this.pop();
    
    const prevNode = this.get(index - 1);
    const removed = prevNode.next;
    prevNode.next = removed.next;
    this.length--;
    return removed;
  }
  
  reverse() {
    let node = this.head;
    this.head = this.tail;
    this.tail = node;
    let next;
    let prev = null;
    
    for (let i = 0; i < this.length; i++) {
      next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    
    return this;
  }
}

// Usage
const list = new SinglyLinkedList();
list.push("HI");
list.push("THERE");
console.log(list);
```

### Doubly Linked Lists

```javascript
class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.prev = this.tail;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }
  
  pop() {
    if (!this.tail) return undefined;
    
    const poppedNode = this.tail;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = poppedNode.prev;
      this.tail.next = null;
      poppedNode.prev = null;
    }
    this.length--;
    return poppedNode;
  }
  
  shift() {
    if (!this.head) return undefined;
    
    const oldHead = this.head;
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = oldHead.next;
      this.head.prev = null;
      oldHead.next = null;
    }
    this.length--;
    return oldHead;
  }
  
  unshift(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.head.prev = newNode;
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
    return this;
  }
}
```

### Stacks (LIFO) & Queues (FIFO)

```javascript
// Stack Implementation using Linked List
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  
  push(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      const temp = this.first;
      this.first = newNode;
      this.first.next = temp;
    }
    return ++this.size;
  }
  
  pop() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}

// Queue Implementation using Linked List
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }
  
  enqueue(val) {
    const newNode = new Node(val);
    if (!this.first) {
      this.first = newNode;
      this.last = newNode;
    } else {
      this.last.next = newNode;
      this.last = newNode;
    }
    return ++this.size;
  }
  
  dequeue() {
    if (!this.first) return null;
    const temp = this.first;
    if (this.first === this.last) {
      this.last = null;
    }
    this.first = this.first.next;
    this.size--;
    return temp.value;
  }
}
```

---

## 9. Trees & Heaps

### Binary Search Trees (BST)

```javascript
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    let current = this.root;
    while (true) {
      if (value === current.value) return undefined; // No duplicates
      
      if (value < current.value) {
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
  
  find(value) {
    if (!this.root) return false;
    
    let current = this.root;
    let found = false;
    
    while (current && !found) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        found = true;
      }
    }
    
    if (!found) return undefined;
    return current;
  }
  
  // Breadth First Search (BFS)
  BFS() {
    const node = this.root;
    const queue = [];
    const data = [];
    
    queue.push(node);
    
    while (queue.length) {
      const currentNode = queue.shift();
      data.push(currentNode.value);
      
      if (currentNode.left) queue.push(currentNode.left);
      if (currentNode.right) queue.push(currentNode.right);
    }
    
    return data;
  }
  
  // Depth First Search - PreOrder
  DFSPreOrder() {
    const data = [];
    
    function traverse(node) {
      if (node) {
        data.push(node.value);
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
      }
    }
    
    traverse(this.root);
    return data;
  }
  
  // Depth First Search - InOrder
  DFSInOrder() {
    const data = [];
    
    function traverse(node) {
      if (node) {
        if (node.left) traverse(node.left);
        data.push(node.value);
        if (node.right) traverse(node.right);
      }
    }
    
    traverse(this.root);
    return data;
  }
  
  // Depth First Search - PostOrder
  DFSPostOrder() {
    const data = [];
    
    function traverse(node) {
      if (node) {
        if (node.left) traverse(node.left);
        if (node.right) traverse(node.right);
        data.push(node.value);
      }
    }
    
    traverse(this.root);
    return data;
  }
}

// Usage
const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
console.log(bst.BFS()); // [10, 5, 15]
console.log(bst.DFSInOrder()); // [5, 10, 15] - Sorted!
```

### Binary Heaps (Max Heap)

```javascript
class MaxBinaryHeap {
  constructor() {
    this.values = [];
  }
  
  insert(val) {
    this.values.push(val);
    this.bubbleUp();
    return this;
  }
  
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parentElement = this.values[parentIdx];
      
      if (element <= parentElement) break;
      
      this.values[parentIdx] = element;
      this.values[idx] = parentElement;
      idx = parentIdx;
    }
  }
  
  extractMax() {
    const max = this.values[0];
    const end = this.values.pop();
    
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    
    return max;
  }
  
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild > element) {
          swap = leftChildIdx;
        }
      }
      
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild > element) ||
          (swap !== null && rightChild > leftChild)
        ) {
          swap = rightChildIdx;
        }
      }
      
      if (swap === null) break;
      
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

// Usage
const heap = new MaxBinaryHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
heap.insert(55);
console.log(heap.values); // [55, 39, 41, 18, 27, 12, 33]
console.log(heap.extractMax()); // 55
```

### Priority Queue

```javascript
class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }
  
  enqueue(val, priority) {
    const newNode = new Node(val, priority);
    this.values.push(newNode);
    this.bubbleUp();
    return this;
  }
  
  bubbleUp() {
    let idx = this.values.length - 1;
    const element = this.values[idx];
    
    while (idx > 0) {
      let parentIdx = Math.floor((idx - 1) / 2);
      let parentElement = this.values[parentIdx];
      
      if (element.priority >= parentElement.priority) break;
      
      this.values[parentIdx] = element;
      this.values[idx] = parentElement;
      idx = parentIdx;
    }
  }
  
  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    
    return min;
  }
  
  sinkDown() {
    let idx = 0;
    const length = this.values.length;
    const element = this.values[0];
    
    while (true) {
      let leftChildIdx = 2 * idx + 1;
      let rightChildIdx = 2 * idx + 2;
      let leftChild, rightChild;
      let swap = null;
      
      if (leftChildIdx < length) {
        leftChild = this.values[leftChildIdx];
        if (leftChild.priority < element.priority) {
          swap = leftChildIdx;
        }
      }
      
      if (rightChildIdx < length) {
        rightChild = this.values[rightChildIdx];
        if (
          (swap === null && rightChild.priority < element.priority) ||
          (swap !== null && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIdx;
        }
      }
      
      if (swap === null) break;
      
      this.values[idx] = this.values[swap];
      this.values[swap] = element;
      idx = swap;
    }
  }
}

// Usage - Emergency Room Example
const ER = new PriorityQueue();
ER.enqueue("common cold", 5);
ER.enqueue("gunshot wound", 1);
ER.enqueue("high fever", 4);
ER.enqueue("broken arm", 2);
console.log(ER.dequeue()); // gunshot wound (priority 1)
console.log(ER.dequeue()); // broken arm (priority 2)
```

---

## 10. Hash Tables

```javascript
class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }
  
  _hash(key) {
    let total = 0;
    const WEIRD_PRIME = 31;
    
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      const char = key[i];
      const value = char.charCodeAt(0) - 96;
      total = (total * WEIRD_PRIME + value) % this.keyMap.length;
    }
    
    return total;
  }
  
  set(key, value) {
    const index = this._hash(key);
    
    if (!this.keyMap[index]) {
      this.keyMap[index] = [];
    }
    
    this.keyMap[index].push([key, value]);
    return this;
  }
  
  get(key) {
    const index = this._hash(key);
    
    if (this.keyMap[index]) {
      for (let i = 0; i < this.keyMap[index].length; i++) {
        if (this.keyMap[index][i][0] === key) {
          return this.keyMap[index][i][1];
        }
      }
    }
    
    return undefined;
  }
  
  keys() {
    const keysArr = [];
    
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!keysArr.includes(this.keyMap[i][j][0])) {
            keysArr.push(this.keyMap[i][j][0]);
          }
        }
      }
    }
    
    return keysArr;
  }
  
  values() {
    const valuesArr = [];
    
    for (let i = 0; i < this.keyMap.length; i++) {
      if (this.keyMap[i]) {
        for (let j = 0; j < this.keyMap[i].length; j++) {
          if (!valuesArr.includes(this.keyMap[i][j][1])) {
            valuesArr.push(this.keyMap[i][j][1]);
          }
        }
      }
    }
    
    return valuesArr;
  }
}

// Usage
const ht = new HashTable(17);
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
console.log(ht.get("yellow")); // #FFFF00
console.log(ht.keys()); // ["maroon", "yellow", "olive", "salmon"]
```

---

## 11. Graphs

### Graph Implementation (Adjacency List)

```javascript
class Graph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
    return this;
  }
  
  addEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1].push(vertex2);
    this.adjacencyList[vertex2].push(vertex1);
    return this;
  }
  
  removeEdge(vertex1, vertex2) {
    this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
      v => v !== vertex2
    );
    this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter(
      v => v !== vertex1
    );
    return this;
  }
  
  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
    return this;
  }
  
  // Depth First Search (Recursive)
  DFSRecursive(start) {
    const result = [];
    const visited = {};
    const adjacencyList = this.adjacencyList;
    
    function dfs(vertex) {
      if (!vertex) return null;
      visited[vertex] = true;
      result.push(vertex);
      
      adjacencyList[vertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          return dfs(neighbor);
        }
      });
    }
    
    dfs(start);
    return result;
  }
  
  // Depth First Search (Iterative)
  DFSIterative(start) {
    const stack = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    
    while (stack.length) {
      const currentVertex = stack.pop();
      result.push(currentVertex);
      
      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    
    return result;
  }
  
  // Breadth First Search
  BFS(start) {
    const queue = [start];
    const result = [];
    const visited = {};
    visited[start] = true;
    
    while (queue.length) {
      const currentVertex = queue.shift();
      result.push(currentVertex);
      
      this.adjacencyList[currentVertex].forEach(neighbor => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.push(neighbor);
        }
      });
    }
    
    return result;
  }
}

// Usage
const graph = new Graph();
graph.addVertex("Tokyo");
graph.addVertex("Dallas");
graph.addVertex("Aspen");
graph.addEdge("Tokyo", "Dallas");
graph.addEdge("Dallas", "Aspen");
graph.addEdge("Tokyo", "Aspen");
console.log(graph.DFSRecursive("Tokyo")); // ["Tokyo", "Dallas", "Aspen"]
console.log(graph.BFS("Tokyo")); // ["Tokyo", "Dallas", "Aspen"]
```

### Dijkstra's Algorithm (Shortest Path)

```javascript
class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }
  
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }
  
  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }
  
  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = [];
    let smallest;
    
    // Build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }
    
    // As long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      
      if (smallest === finish) {
        // We are done building up our path
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // Find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // Calculate new distance to neighbor node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          
          if (candidate < distances[nextNeighbor]) {
            // Updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // Updating previous - How we got to neighbor
            previous[nextNeighbor] = smallest;
            // Enqueue in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    
    // Concatenate path and return
    return path.concat(smallest).reverse();
  }
}

// Usage
const wg = new WeightedGraph();
wg.addVertex("A");
wg.addVertex("B");
wg.addVertex("C");
wg.addVertex("D");
wg.addEdge("A", "B", 4);
wg.addEdge("A", "C", 2);
wg.addEdge("B", "C", 5);
wg.addEdge("B", "D", 10);
wg.addEdge("C", "D", 3);
console.log(wg.Dijkstra("A", "D")); // ["A", "C", "D"]
```

---

## 12. Dynamic Programming

### Memoization (Top-Down)

```javascript
// Fibonacci with Memoization
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

// Coin Change Problem with Memoization
function coinChange(coins, amount) {
  const memo = {};
  
  function findMinCoins(remaining) {
    if (remaining === 0) return 0;
    if (remaining < 0) return Infinity;
    if (remaining in memo) return memo[remaining];
    
    let minCoins = Infinity;
    
    for (let coin of coins) {
      const result = findMinCoins(remaining - coin);
      if (result !== Infinity) {
        minCoins = Math.min(minCoins, result + 1);
      }
    }
    
    memo[remaining] = minCoins;
    return minCoins;
  }
  
  const result = findMinCoins(amount);
  return result === Infinity ? -1 : result;
}

console.log(coinChange([1, 5, 10], 27)); // 5 coins (10+10+5+1+1)
```

### Tabulation (Bottom-Up)

```javascript
// Fibonacci with Tabulation
function fibTabulation(n) {
  if (n <= 2) return 1;
  
  const fibNums = [0, 1, 1];
  
  for (let i = 3; i <= n; i++) {
    fibNums[i] = fibNums[i - 1] + fibNums[i - 2];
  }
  
  return fibNums[n];
}

// Coin Change Problem with Tabulation
function coinChangeTabulation(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (coin <= i) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  
  return dp[amount] === Infinity ? -1 : dp[amount];
}

console.log(coinChangeTabulation([1, 5, 10], 27)); // 5
console.log(fibTabulation(10)); // 55
```

---

## 💡 Study Tips
1. **Code Along**: Don't just watch; type every line.
2. **Visualize**: Draw diagrams for Linked Lists, Trees, and Graphs.
3. **Analyze**: Always ask "What is the Big O?" after solving.
4. **Patterns**: Focus on recognizing patterns (Sliding Window, Two Pointers) rather than memorizing specific problems.
5. **Practice**: Implement each data structure from scratch at least once.
6. **Test Edge Cases**: Empty arrays, single elements, negative numbers, null values.

---

## 🎯 Interview Preparation Checklist
- [ ] Can explain Big O for all algorithms covered
- [ ] Can implement all sorting algorithms from memory
- [ ] Can build Linked Lists, Trees, Graphs without reference
- [ ] Can identify which pattern applies to new problems
- [ ] Can solve recursive problems iteratively and vice versa
- [ ] Understand when to use BFS vs DFS
- [ ] Can optimize brute force solutions using DP
