# Data Structures and Algorithms in JavaScript - Complete Guide

## Table of Contents
1. [Complexity Analysis (Big O)](#complexity-analysis)
2. [Data Structures](#data-structures)
3. [Algorithms](#algorithms)
4. [Problem Solving Patterns](#problem-solving-patterns)

---

## Complexity Analysis

### Q: What is Big O notation?
**A:** Big O notation describes the performance or complexity of an algorithm in terms of time and space requirements relative to input size.

**Examples:**
- O(1): Constant time - accessing array element by index
- O(log n): Logarithmic - binary search
- O(n): Linear - iterating through array
- O(n log n): Linearithmic - merge sort
- O(n²): Quadratic - nested loops
- O(2ⁿ): Exponential - fibonacci recursive

### Q: How do you analyze time and space complexity?
**A:** Count the number of operations for time complexity and memory usage for space complexity as input size grows.

```javascript
// O(1) time, O(1) space
function constantTime(arr) {
    return arr[0]; // Always one operation
}

// O(n) time, O(1) space
function linearTime(arr) {
    for(let i = 0; i < arr.length; i++) {
        console.log(arr[i]); // Operations increase with input size
    }
}

// O(n²) time, O(1) space
function quadraticTime(arr) {
    for(let i = 0; i < arr.length; i++) {
        for(let j = 0; j < arr.length; j++) {
            console.log(arr[i], arr[j]);
        }
    }
}
```

---

## Data Structures

### Arrays & Strings

#### Q: How do you reverse a string efficiently?
**A:** Use two pointers approach for O(n) time and O(1) space.

```javascript
function reverseString(str) {
    let arr = str.split('');
    let left = 0;
    let right = arr.length - 1;
    
    while(left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    
    return arr.join('');
}

console.log(reverseString("hello")); // "olleh"
```

#### Q: How to find the longest substring without repeating characters?
**A:** Use sliding window technique.

```javascript
function lengthOfLongestSubstring(s) {
    let charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for(let right = 0; right < s.length; right++) {
        while(charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb")); // 3 ("abc")
console.log(lengthOfLongestSubstring("bbbbb")); // 1
console.log(lengthOfLongestSubstring("pwwkew")); // 3 ("wke")
```

#### Q: How to check if two strings are anagrams?
**A:** Compare character frequencies or sorted strings.

```javascript
function isAnagram(s, t) {
    if (s.length !== t.length) return false;
    
    const charCount = new Map();
    
    for (let char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    for (let char of t) {
        if (!charCount.has(char)) return false;
        charCount.set(char, charCount.get(char) - 1);
        if (charCount.get(char) === 0) {
            charCount.delete(char);
        }
    }
    
    return charCount.size === 0;
}

// Alternative: Sort and compare
function isAnagramSorted(s, t) {
    return s.split('').sort().join('') === t.split('').sort().join('');
}

console.log(isAnagram("anagram", "nagaram")); // true
console.log(isAnagram("rat", "car")); // false
```

### Linked Lists

#### Q: How to implement a singly linked list?
**A:** Create Node class and LinkedList class with essential methods.

```javascript
class ListNode {
    constructor(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
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
    
    insertAt(index, val) {
        if (index < 0 || index > this.size) return;
        
        if (index === 0) {
            this.prepend(val);
            return;
        }
        
        const newNode = new ListNode(val);
        let current = this.head;
        let prev = null;
        let count = 0;
        
        while (count < index) {
            prev = current;
            current = current.next;
            count++;
        }
        
        prev.next = newNode;
        newNode.next = current;
        this.size++;
    }
    
    delete(val) {
        if (!this.head) return;
        
        if (this.head.val === val) {
            this.head = this.head.next;
            this.size--;
            return;
        }
        
        let current = this.head;
        while (current.next && current.next.val !== val) {
            current = current.next;
        }
        
        if (current.next) {
            current.next = current.next.next;
            this.size--;
        }
    }
    
    find(val) {
        let current = this.head;
        while (current) {
            if (current.val === val) return current;
            current = current.next;
        }
        return null;
    }
    
    print() {
        let current = this.head;
        const result = [];
        while (current) {
            result.push(current.val);
            current = current.next;
        }
        return result;
    }
    
    reverse() {
        let prev = null;
        let current = this.head;
        
        while (current) {
            const nextTemp = current.next;
            current.next = prev;
            prev = current;
            current = nextTemp;
        }
        
        this.head = prev;
    }
}

const ll = new LinkedList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.prepend(0);
console.log(ll.print()); // [0, 1, 2, 3]
ll.reverse();
console.log(ll.print()); // [3, 2, 1, 0]
```

#### Q: How to detect a cycle in a linked list?
**A:** Use Floyd's Cycle Detection (Tortoise and Hare) algorithm.

```javascript
function hasCycle(head) {
    if (!head || !head.next) return false;
    
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) return true;
    }
    
    return false;
}

// Find the start of the cycle
function detectCycleStart(head) {
    if (!head || !head.next) return null;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) break;
    }
    
    if (!fast || !fast.next) return null; // No cycle
    
    // Find start of cycle
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow; // Start of cycle
}
```

#### Q: How to merge two sorted linked lists?
**A:** Use iterative approach with dummy node.

```javascript
function mergeTwoLists(list1, list2) {
    const dummy = new ListNode(0);
    let current = dummy;
    
    while (list1 && list2) {
        if (list1.val <= list2.val) {
            current.next = list1;
            list1 = list1.next;
        } else {
            current.next = list2;
            list2 = list2.next;
        }
        current = current.next;
    }
    
    current.next = list1 || list2;
    return dummy.next;
}
```

### Stacks

#### Q: How to implement a stack with push/pop operations?
**A:** Using array or linked list.

```javascript
class Stack {
    constructor() {
        this.items = [];
    }
    
    push(element) {
        this.items.push(element);
    }
    
    pop() {
        if (this.isEmpty()) return "Underflow";
        return this.items.pop();
    }
    
    peek() {
        if (this.isEmpty()) return "Stack is empty";
        return this.items[this.items.length - 1];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
    
    print() {
        return this.items;
    }
}

const stack = new Stack();
stack.push(10);
stack.push(20);
stack.push(30);
console.log(stack.peek()); // 30
console.log(stack.pop());  // 30
console.log(stack.print()); // [10, 20]
```

#### Q: How to validate parentheses using a stack?
**A:** Match opening and closing brackets.

```javascript
function isValidParentheses(s) {
    const stack = [];
    const pairs = { ')': '(', '}': '{', ']': '[' };
    
    for (let char of s) {
        if (['(', '{', '['].includes(char)) {
            stack.push(char);
        } else if ([')', '}', ']'].includes(char)) {
            if (stack.length === 0 || stack.pop() !== pairs[char]) {
                return false;
            }
        }
    }
    
    return stack.length === 0;
}

console.log(isValidParentheses("()[]{}")); // true
console.log(isValidParentheses("([)]"));   // false
console.log(isValidParentheses("{[]}"));   // true
console.log(isValidParentheses("("));      // false
```

#### Q: How to implement a min stack?
**A:** Track minimum value at each level.

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }
    
    push(val) {
        this.stack.push(val);
        if (this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
            this.minStack.push(val);
        }
    }
    
    pop() {
        if (this.stack.length === 0) return null;
        const popped = this.stack.pop();
        if (popped === this.minStack[this.minStack.length - 1]) {
            this.minStack.pop();
        }
        return popped;
    }
    
    top() {
        return this.stack[this.stack.length - 1] || null;
    }
    
    getMin() {
        return this.minStack[this.minStack.length - 1] || null;
    }
}

const minStack = new MinStack();
minStack.push(3);
minStack.push(5);
console.log(minStack.getMin()); // 3
minStack.push(2);
minStack.push(2);
console.log(minStack.getMin()); // 2
minStack.pop();
console.log(minStack.getMin()); // 2
```

### Queues

#### Q: How to implement a queue with enqueue/dequeue operations?
**A:** Using array or linked list.

```javascript
// Array-based implementation (dequeue is O(n))
class Queue {
    constructor() {
        this.items = [];
    }
    
    enqueue(element) {
        this.items.push(element);
    }
    
    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift(); // O(n)
    }
    
    front() {
        if (this.isEmpty()) return "No elements in Queue";
        return this.items[0];
    }
    
    isEmpty() {
        return this.items.length === 0;
    }
    
    size() {
        return this.items.length;
    }
}

// Better implementation with linked list for O(1) operations
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedListQueue {
    constructor() {
        this.front = null;
        this.rear = null;
        this.length = 0;
    }
    
    enqueue(data) {
        const newNode = new Node(data);
        
        if (this.rear === null) {
            this.front = this.rear = newNode;
        } else {
            this.rear.next = newNode;
            this.rear = newNode;
        }
        this.length++;
    }
    
    dequeue() {
        if (this.front === null) return null;
        
        const temp = this.front;
        this.front = this.front.next;
        
        if (this.front === null) {
            this.rear = null;
        }
        
        this.length--;
        return temp.data;
    }
    
    getFront() {
        if (this.front === null) return null;
        return this.front.data;
    }
    
    isEmpty() {
        return this.front === null;
    }
    
    getSize() {
        return this.length;
    }
}

const queue = new LinkedListQueue();
queue.enqueue(10);
queue.enqueue(20);
queue.enqueue(30);
console.log(queue.getFront()); // 10
console.log(queue.dequeue());  // 10
console.log(queue.getFront()); // 20
```

#### Q: How to implement a queue using two stacks?
**A:** Use one stack for enqueue and another for dequeue.

```javascript
class QueueWithStacks {
    constructor() {
        this.stack1 = []; // For pushing
        this.stack2 = []; // For popping
    }
    
    enqueue(x) {
        this.stack1.push(x);
    }
    
    dequeue() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        
        if (this.stack2.length === 0) return null;
        return this.stack2.pop();
    }
    
    peek() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
        
        if (this.stack2.length === 0) return null;
        return this.stack2[this.stack2.length - 1];
    }
    
    isEmpty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
}

const q = new QueueWithStacks();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
console.log(q.peek());    // 1
console.log(q.dequeue()); // 1
console.log(q.dequeue()); // 2
```

### Hash Tables (Maps/Sets)

#### Q: How to implement a basic hash table?
**A:** Simple implementation with collision handling using chaining.

```javascript
class HashTable {
    constructor(size = 53) {
        this.keyMap = new Array(size);
    }
    
    _hash(key) {
        let total = 0;
        let WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0) - 96;
            total = (total * WEIRD_PRIME + value) % this.keyMap.length;
        }
        return total;
    }
    
    set(key, value) {
        let index = this._hash(key);
        if (!this.keyMap[index]) {
            this.keyMap[index] = [];
        }
        this.keyMap[index].push([key, value]);
    }
    
    get(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    return this.keyMap[index][i][1];
                }
            }
        }
        return undefined;
    }
    
    remove(key) {
        let index = this._hash(key);
        if (this.keyMap[index]) {
            for (let i = 0; i < this.keyMap[index].length; i++) {
                if (this.keyMap[index][i][0] === key) {
                    this.keyMap[index].splice(i, 1);
                    return true;
                }
            }
        }
        return false;
    }
    
    keys() {
        let keysArr = [];
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
        let valuesArr = [];
        let seen = new Set();
        
        for (let i = 0; i < this.keyMap.length; i++) {
            if (this.keyMap[i]) {
                for (let j = 0; j < this.keyMap[i].length; j++) {
                    let key = this.keyMap[i][j][0];
                    if (!seen.has(key)) {
                        seen.add(key);
                        valuesArr.push(this.keyMap[i][j][1]);
                    }
                }
            }
        }
        return valuesArr;
    }
}

const ht = new HashTable();
ht.set("maroon", "#800000");
ht.set("yellow", "#FFFF00");
ht.set("olive", "#808000");
ht.set("salmon", "#FA8072");
console.log(ht.get("maroon")); // "#800000"
console.log(ht.keys()); // ["maroon", "yellow", "olive", "salmon"]
```

#### Q: How to find duplicate elements in an array?
**A:** Use Set or Map for O(n) time complexity.

```javascript
function findDuplicates(arr) {
    const seen = new Set();
    const duplicates = new Set();
    
    for (const num of arr) {
        if (seen.has(num)) {
            duplicates.add(num);
        } else {
            seen.add(num);
        }
    }
    
    return Array.from(duplicates);
}

console.log(findDuplicates([1, 2, 3, 2, 4, 5, 3])); // [2, 3]

// Alternative with Map to count occurrences
function findDuplicatesWithCount(arr) {
    const countMap = new Map();
    
    for (const num of arr) {
        countMap.set(num, (countMap.get(num) || 0) + 1);
    }
    
    const duplicates = [];
    for (const [num, count] of countMap) {
        if (count > 1) duplicates.push({ value: num, count });
    }
    
    return duplicates;
}

console.log(findDuplicatesWithCount([1, 2, 2, 3, 3, 3])); 
// [{ value: 2, count: 2 }, { value: 3, count: 3 }]
```

#### Q: How to find two sum in an array?
**A:** Use hash map for O(n) solution.

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

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
```

### Trees

#### Q: How to implement a binary search tree?
**A:** BST with insertion, search, and traversal methods.

```javascript
class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
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
            if (val === current.val) return undefined;
            
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
    
    find(val) {
        if (!this.root) return undefined;
        
        let current = this.root;
        while (current) {
            if (val === current.val) return current;
            
            if (val < current.val) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        
        return undefined;
    }
    
    contains(val) {
        return this.find(val) !== undefined;
    }
    
    // Depth First Search - Preorder (Root, Left, Right)
    DFSPreOrder() {
        const data = [];
        
        function traverse(node) {
            data.push(node.val);
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
        }
        
        traverse(this.root);
        return data;
    }
    
    // Depth First Search - Inorder (Left, Root, Right) - Returns sorted order
    DFSInOrder() {
        const data = [];
        
        function traverse(node) {
            if (node.left) traverse(node.left);
            data.push(node.val);
            if (node.right) traverse(node.right);
        }
        
        traverse(this.root);
        return data;
    }
    
    // Depth First Search - Postorder (Left, Right, Root)
    DFSPostOrder() {
        const data = [];
        
        function traverse(node) {
            if (node.left) traverse(node.left);
            if (node.right) traverse(node.right);
            data.push(node.val);
        }
        
        traverse(this.root);
        return data;
    }
    
    // Breadth First Search
    BFS() {
        const data = [];
        const queue = [];
        
        if (this.root) queue.push(this.root);
        
        while (queue.length) {
            const node = queue.shift();
            data.push(node.val);
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        return data;
    }
    
    // Find minimum value
    findMin() {
        if (!this.root) return null;
        let current = this.root;
        while (current.left) {
            current = current.left;
        }
        return current.val;
    }
    
    // Find maximum value
    findMax() {
        if (!this.root) return null;
        let current = this.root;
        while (current.right) {
            current = current.right;
        }
        return current.val;
    }
}

const bst = new BinarySearchTree();
bst.insert(10);
bst.insert(5);
bst.insert(15);
bst.insert(7);
bst.insert(14);
console.log(bst.DFSInOrder());  // [5, 7, 10, 14, 15] (sorted order)
console.log(bst.DFSPreOrder()); // [10, 5, 7, 15, 14]
console.log(bst.BFS());         // [10, 5, 15, 7, 14]
console.log(bst.findMin());     // 5
console.log(bst.findMax());     // 15
```

#### Q: How to find the lowest common ancestor in a BST?
**A:** Use the property that values in left subtree are smaller than root.

```javascript
function lowestCommonAncestorBST(root, p, q) {
    if (!root) return null;
    
    // Both nodes are in left subtree
    if (p.val < root.val && q.val < root.val) {
        return lowestCommonAncestorBST(root.left, p, q);
    }
    
    // Both nodes are in right subtree
    if (p.val > root.val && q.val > root.val) {
        return lowestCommonAncestorBST(root.right, p, q);
    }
    
    // Nodes are on different sides, so current node is LCA
    return root;
}

// Iterative version
function lowestCommonAncestorBSTIterative(root, p, q) {
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
```

#### Q: How to validate a binary search tree?
**A:** Check if all nodes satisfy BST property.

```javascript
function isValidBST(root) {
    function validate(node, min, max) {
        if (!node) return true;
        
        if (node.val <= min || node.val >= max) {
            return false;
        }
        
        return validate(node.left, min, node.val) && 
               validate(node.right, node.val, max);
    }
    
    return validate(root, -Infinity, Infinity);
}

// Alternative: Inorder traversal should be sorted
function isValidBSTInorder(root) {
    let prev = -Infinity;
    
    function inorder(node) {
        if (!node) return true;
        
        if (!inorder(node.left)) return false;
        
        if (node.val <= prev) return false;
        prev = node.val;
        
        return inorder(node.right);
    }
    
    return inorder(root);
}
```

#### Q: How to find the height/depth of a binary tree?
**A:** Use recursion to find maximum depth.

```javascript
function maxDepth(root) {
    if (!root) return 0;
    
    const leftDepth = maxDepth(root.left);
    const rightDepth = maxDepth(root.right);
    
    return Math.max(leftDepth, rightDepth) + 1;
}

// Iterative using BFS
function maxDepthIterative(root) {
    if (!root) return 0;
    
    const queue = [root];
    let depth = 0;
    
    while (queue.length) {
        const levelSize = queue.length;
        
        for (let i = 0; i < levelSize; i++) {
            const node = queue.shift();
            
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
        
        depth++;
    }
    
    return depth;
}
```

#### Q: How to serialize and deserialize a binary tree?
**A:** Use preorder traversal with null markers.

```javascript
function serialize(root) {
    const result = [];
    
    function preorder(node) {
        if (!node) {
            result.push('null');
            return;
        }
        
        result.push(String(node.val));
        preorder(node.left);
        preorder(node.right);
    }
    
    preorder(root);
    return result.join(',');
}

function deserialize(data) {
    const values = data.split(',');
    let index = 0;
    
    function buildTree() {
        if (values[index] === 'null') {
            index++;
            return null;
        }
        
        const node = new TreeNode(parseInt(values[index]));
        index++;
        node.left = buildTree();
        node.right = buildTree();
        
        return node;
    }
    
    return buildTree();
}

// Example usage:
const tree = new BinarySearchTree();
tree.insert(5);
tree.insert(3);
tree.insert(8);
const serialized = serialize(tree.root);
console.log(serialized); // "5,3,null,null,8,null,null"
const deserialized = deserialize(serialized);
console.log(deserialized.val); // 5
```

### Heaps

#### Q: How to implement a max heap?
**A:** Complete binary tree where parent is always greater than children.

```javascript
class MaxHeap {
    constructor() {
        this.values = [];
    }
    
    insert(val) {
        this.values.push(val);
        this.bubbleUp();
    }
    
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            
            if (element <= parent) break;
            
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    
    extractMax() {
        if (this.values.length === 0) return null;
        if (this.values.length === 1) return this.values.pop();
        
        const max = this.values[0];
        const end = this.values.pop();
        this.values[0] = end;
        this.sinkDown();
        
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
    
    peek() {
        return this.values[0];
    }
    
    size() {
        return this.values.length;
    }
    
    isEmpty() {
        return this.values.length === 0;
    }
}

const heap = new MaxHeap();
heap.insert(41);
heap.insert(39);
heap.insert(33);
heap.insert(18);
heap.insert(27);
heap.insert(12);
console.log(heap.extractMax()); // 41
console.log(heap.extractMax()); // 39
console.log(heap.peek());       // 33
```

#### Q: How to implement a min heap?
**A:** Complete binary tree where parent is always smaller than children.

```javascript
class MinHeap {
    constructor() {
        this.values = [];
    }
    
    insert(val) {
        this.values.push(val);
        this.bubbleUp();
    }
    
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            
            if (element >= parent) break;
            
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    
    extractMin() {
        if (this.values.length === 0) return null;
        if (this.values.length === 1) return this.values.pop();
        
        const min = this.values[0];
        const end = this.values.pop();
        this.values[0] = end;
        this.sinkDown();
        
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
                if (leftChild < element) {
                    swap = leftChildIdx;
                }
            }
            
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild < element) ||
                    (swap !== null && rightChild < leftChild)
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
    
    peek() {
        return this.values[0];
    }
}

const minHeap = new MinHeap();
minHeap.insert(10);
minHeap.insert(5);
minHeap.insert(20);
minHeap.insert(1);
console.log(minHeap.extractMin()); // 1
console.log(minHeap.extractMin()); // 5
console.log(minHeap.peek());       // 10
```

#### Q: How to find K largest elements using a heap?
**A:** Use min heap of size k.

```javascript
function findKLargest(nums, k) {
    const minHeap = new MinHeap();
    
    for (const num of nums) {
        if (minHeap.size() < k) {
            minHeap.insert(num);
        } else if (num > minHeap.peek()) {
            minHeap.extractMin();
            minHeap.insert(num);
        }
    }
    
    const result = [];
    while (!minHeap.isEmpty()) {
        result.push(minHeap.extractMin());
    }
    
    return result;
}

console.log(findKLargest([3, 2, 1, 5, 6, 4], 2)); // [5, 6]
console.log(findKLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // [4, 5, 5, 6]
```

### Graphs

#### Q: How to implement a graph using adjacency list?
**A:** Most efficient representation for sparse graphs.

```javascript
class Graph {
    constructor() {
        this.adjacencyList = {};
    }
    
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) {
            this.adjacencyList[vertex] = [];
        }
    }
    
    addEdge(v1, v2) {
        this.adjacencyList[v1].push(v2);
        this.adjacencyList[v2].push(v1);
    }
    
    removeEdge(v1, v2) {
        this.adjacencyList[v1] = this.adjacencyList[v1].filter(
            v => v !== v2
        );
        this.adjacencyList[v2] = this.adjacencyList[v2].filter(
            v => v !== v1
        );
    }
    
    removeVertex(vertex) {
        while (this.adjacencyList[vertex].length) {
            const adjacentVertex = this.adjacencyList[vertex].pop();
            this.removeEdge(vertex, adjacentVertex);
        }
        delete this.adjacencyList[vertex];
    }
    
    // Depth First Traversal (Recursive)
    DFSRecursive(start) {
        const result = [];
        const visited = {};
        
        const dfs = (vertex) => {
            if (!vertex) return;
            
            visited[vertex] = true;
            result.push(vertex);
            
            for (let neighbor of this.adjacencyList[vertex]) {
                if (!visited[neighbor]) {
                    dfs(neighbor);
                }
            }
        };
        
        dfs(start);
        return result;
    }
    
    // Depth First Traversal (Iterative)
    DFSIterative(start) {
        const stack = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[start] = true;
        
        while (stack.length) {
            currentVertex = stack.pop();
            result.push(currentVertex);
            
            for (let neighbor of this.adjacencyList[currentVertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    stack.push(neighbor);
                }
            }
        }
        
        return result;
    }
    
    // Breadth First Traversal
    BFS(start) {
        const queue = [start];
        const result = [];
        const visited = {};
        let currentVertex;
        
        visited[start] = true;
        
        while (queue.length) {
            currentVertex = queue.shift();
            result.push(currentVertex);
            
            for (let neighbor of this.adjacencyList[currentVertex]) {
                if (!visited[neighbor]) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        
        return result;
    }
}

const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.addEdge("C", "D");
console.log(g.BFS("A"));           // ["A", "B", "C", "D"]
console.log(g.DFSRecursive("A"));  // ["A", "B", "D", "C"]
console.log(g.DFSIterative("A"));  // ["A", "C", "D", "B"]
```

#### Q: How to find shortest path in unweighted graph?
**A:** Use BFS for shortest path in unweighted graphs.

```javascript
function shortestPath(graph, start, end) {
    const queue = [[start]];
    const visited = new Set([start]);
    
    while (queue.length > 0) {
        const path = queue.shift();
        const node = path[path.length - 1];
        
        if (node === end) {
            return path;
        }
        
        for (const neighbor of graph.adjacencyList[node] || []) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                const newPath = [...path, neighbor];
                queue.push(newPath);
            }
        }
    }
    
    return null; // No path found
}

// Example usage:
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("C", "D");
console.log(shortestPath(graph, "A", "D")); // ["A", "B", "D"] or ["A", "C", "D"]
```

#### Q: How to detect cycle in undirected graph?
**A:** Use DFS with parent tracking.

```javascript
function hasCycleUndirected(graph) {
    const visited = new Set();
    
    function dfs(vertex, parent) {
        visited.add(vertex);
        
        for (const neighbor of graph.adjacencyList[vertex] || []) {
            if (!visited.has(neighbor)) {
                if (dfs(neighbor, vertex)) {
                    return true;
                }
            } else if (neighbor !== parent) {
                return true; // Found a back edge
            }
        }
        
        return false;
    }
    
    for (const vertex in graph.adjacencyList) {
        if (!visited.has(vertex)) {
            if (dfs(vertex, null)) {
                return true;
            }
        }
    }
    
    return false;
}
```

#### Q: How to implement topological sort?
**A:** Use Kahn's algorithm or DFS for directed acyclic graphs.

```javascript
// Kahn's Algorithm (BFS-based)
function topologicalSortKahn(numVertices, edges) {
    const graph = new Map();
    const inDegree = new Array(numVertices).fill(0);
    
    // Initialize graph
    for (let i = 0; i < numVertices; i++) {
        graph.set(i, []);
    }
    
    // Build graph and calculate in-degrees
    for (const [from, to] of edges) {
        graph.get(from).push(to);
        inDegree[to]++;
    }
    
    // Initialize queue with vertices having no incoming edges
    const queue = [];
    for (let i = 0; i < numVertices; i++) {
        if (inDegree[i] === 0) {
            queue.push(i);
        }
    }
    
    const result = [];
    
    while (queue.length > 0) {
        const vertex = queue.shift();
        result.push(vertex);
        
        for (const neighbor of graph.get(vertex)) {
            inDegree[neighbor]--;
            if (inDegree[neighbor] === 0) {
                queue.push(neighbor);
            }
        }
    }
    
    // Check if all vertices were included (no cycle)
    if (result.length !== numVertices) {
        return []; // Cycle detected
    }
    
    return result;
}

// DFS-based approach
function topologicalSortDFS(numVertices, edges) {
    const graph = new Map();
    const visited = new Set();
    const recStack = new Set();
    const result = [];
    
    // Initialize graph
    for (let i = 0; i < numVertices; i++) {
        graph.set(i, []);
    }
    
    // Build graph
    for (const [from, to] of edges) {
        graph.get(from).push(to);
    }
    
    function dfs(vertex) {
        visited.add(vertex);
        recStack.add(vertex);
        
        for (const neighbor of graph.get(vertex)) {
            if (!visited.has(neighbor)) {
                if (!dfs(neighbor)) return false;
            } else if (recStack.has(neighbor)) {
                return false; // Cycle detected
            }
        }
        
        recStack.delete(vertex);
        result.unshift(vertex); // Add to beginning
        return true;
    }
    
    for (let i = 0; i < numVertices; i++) {
        if (!visited.has(i)) {
            if (!dfs(i)) {
                return []; // Cycle detected
            }
        }
    }
    
    return result;
}

// Example: Course scheduling
const numCourses = 4;
const prerequisites = [[1, 0], [2, 0], [3, 1], [3, 2]];
console.log(topologicalSortKahn(numCourses, prerequisites)); // [0, 1, 2, 3] or similar
```

---

## Algorithms

### Sorting

#### Q: How to implement bubble sort?
**A:** Simple comparison-based sorting algorithm.

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
        
        // If no swapping occurred, array is already sorted
        if (!swapped) break;
    }
    
    return arr;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90])); 
// [11, 12, 22, 25, 34, 64, 90]
```

#### Q: How to implement selection sort?
**A:** Find minimum element and place it at beginning.

```javascript
function selectionSort(arr) {
    const n = arr.length;
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }
    
    return arr;
}

console.log(selectionSort([64, 34, 25, 12, 22, 11, 90])); 
// [11, 12, 22, 25, 34, 64, 90]
```

#### Q: How to implement insertion sort?
**A:** Build sorted array one element at a time.

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

console.log(insertionSort([64, 34, 25, 12, 22, 11, 90])); 
// [11, 12, 22, 25, 34, 64, 90]
```

#### Q: How to implement merge sort?
**A:** Divide and conquer algorithm with O(n log n) time complexity.

```javascript
function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    
    return merge(left, right);
}

function merge(left, right) {
    let result = [];
    let leftIdx = 0;
    let rightIdx = 0;
    
    while (leftIdx < left.length && rightIdx < right.length) {
        if (left[leftIdx] < right[rightIdx]) {
            result.push(left[leftIdx]);
            leftIdx++;
        } else {
            result.push(right[rightIdx]);
            rightIdx++;
        }
    }
    
    // Add remaining elements
    return result.concat(left.slice(leftIdx)).concat(right.slice(rightIdx));
}

console.log(mergeSort([38, 27, 43, 3, 9, 82, 10])); 
// [3, 9, 10, 27, 38, 43, 82]
```

#### Q: How to implement quick sort?
**A:** Efficient in-place sorting with average O(n log n) time.

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
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

console.log(quickSort([38, 27, 43, 3, 9, 82, 10])); 
// [3, 9, 10, 27, 38, 43, 82]

// Alternative: Randomized pivot for better average case
function quickSortRandom(arr, low = 0, high = arr.length - 1) {
    if (low < high) {
        const pivotIndex = partitionRandom(arr, low, high);
        quickSortRandom(arr, low, pivotIndex - 1);
        quickSortRandom(arr, pivotIndex + 1, high);
    }
    return arr;
}

function partitionRandom(arr, low, high) {
    const randomIdx = Math.floor(Math.random() * (high - low + 1)) + low;
    [arr[randomIdx], arr[high]] = [arr[high], arr[randomIdx]];
    return partition(arr, low, high);
}
```

#### Q: How to implement counting sort?
**A:** Non-comparison based sorting for integers in a range.

```javascript
function countingSort(arr) {
    if (arr.length === 0) return arr;
    
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    
    // Count occurrences
    for (const num of arr) {
        count[num - min]++;
    }
    
    // Cumulative count
    for (let i = 1; i < count.length; i++) {
        count[i] += count[i - 1];
    }
    
    // Build output array
    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
    }
    
    // Copy to original array
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
    }
    
    return arr;
}

console.log(countingSort([4, 2, 2, 8, 3, 3, 1])); 
// [1, 2, 2, 3, 3, 4, 8]
```

### Searching

#### Q: How to implement binary search?
**A:** Efficient search in sorted arrays with O(log n) time.

```javascript
// Iterative version
function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Recursive version
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) return binarySearchRecursive(arr, target, mid + 1, right);
    return binarySearchRecursive(arr, target, left, mid - 1);
}

console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 7));  // 3
console.log(binarySearch([1, 3, 5, 7, 9, 11, 13], 6));  // -1
```

#### Q: How to find first and last position of element in sorted array?
**A:** Modified binary search.

```javascript
function searchRange(nums, target) {
    function findFirst(nums, target) {
        let left = 0, right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                result = mid;
                right = mid - 1; // Continue searching left
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    function findLast(nums, target) {
        let left = 0, right = nums.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (nums[mid] === target) {
                result = mid;
                left = mid + 1; // Continue searching right
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    return [findFirst(nums, target), findLast(nums, target)];
}

console.log(searchRange([5, 7, 7, 8, 8, 10], 8)); // [3, 4]
console.log(searchRange([5, 7, 7, 8, 8, 10], 6)); // [-1, -1]
```

### Recursion & Backtracking

#### Q: How to generate all permutations of an array?
**A:** Use backtracking to explore all possibilities.

```javascript
function permute(nums) {
    const result = [];
    
    function backtrack(currentPermutation) {
        if (currentPermutation.length === nums.length) {
            result.push([...currentPermutation]);
            return;
        }
        
        for (const num of nums) {
            if (!currentPermutation.includes(num)) {
                currentPermutation.push(num);
                backtrack(currentPermutation);
                currentPermutation.pop();
            }
        }
    }
    
    backtrack([]);
    return result;
}

console.log(permute([1, 2, 3]));
// [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
```

#### Q: How to generate all subsets (power set)?
**A:** Use backtracking or bit manipulation.

```javascript
// Backtracking approach
function subsets(nums) {
    const result = [];
    
    function backtrack(start, currentSubset) {
        result.push([...currentSubset]);
        
        for (let i = start; i < nums.length; i++) {
            currentSubset.push(nums[i]);
            backtrack(i + 1, currentSubset);
            currentSubset.pop();
        }
    }
    
    backtrack(0, []);
    return result;
}

// Bit manipulation approach
function subsetsBitManipulation(nums) {
    const result = [];
    const n = nums.length;
    const totalSubsets = 1 << n; // 2^n
    
    for (let mask = 0; mask < totalSubsets; mask++) {
        const subset = [];
        for (let i = 0; i < n; i++) {
            if ((mask & (1 << i)) !== 0) {
                subset.push(nums[i]);
            }
        }
        result.push(subset);
    }
    
    return result;
}

console.log(subsets([1, 2, 3]));
// [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]
```

#### Q: How to solve the N-Queens problem?
**A:** Place N queens on N×N chessboard without attacking each other.

```javascript
function solveNQueens(n) {
    const result = [];
    const board = Array(n).fill().map(() => Array(n).fill('.'));
    
    function isValid(row, col) {
        // Check column
        for (let i = 0; i < row; i++) {
            if (board[i][col] === 'Q') return false;
        }
        
        // Check diagonal (top-left)
        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }
        
        // Check diagonal (top-right)
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

const solutions = solveNQueens(4);
console.log(`Found ${solutions.length} solutions for 4-Queens`);
console.log(solutions[0]);
```

#### Q: How to solve Sudoku puzzle?
**A:** Use backtracking with validation.

```javascript
function solveSudoku(board) {
    function isValid(row, col, num) {
        // Check row
        for (let j = 0; j < 9; j++) {
            if (board[row][j] === num) return false;
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

// Example usage:
const sudokuBoard = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9']
];

solveSudoku(sudokuBoard);
console.log(sudokuBoard);
```

### Dynamic Programming

#### Q: What is dynamic programming and when to use it?
**A:** DP is an optimization technique for problems with overlapping subproblems and optimal substructure. Use when:
1. Problem can be broken into subproblems
2. Subproblems overlap (same subproblem solved multiple times)
3. Optimal solution depends on optimal solutions of subproblems

#### Q: How to implement Fibonacci with memoization?
**A:** Avoid redundant calculations with caching.

```javascript
// Top-down with memoization
function fibonacciMemo(n, memo = {}) {
    if (n in memo) return memo[n];
    if (n <= 1) return n;
    
    memo[n] = fibonacciMemo(n - 1, memo) + fibonacciMemo(n - 2, memo);
    return memo[n];
}

// Bottom-up with tabulation
function fibonacciTab(n) {
    if (n <= 1) return n;
    
    const dp = [0, 1];
    
    for (let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }
    
    return dp[n];
}

// Space-optimized version
function fibonacciOptimized(n) {
    if (n <= 1) return n;
    
    let prev2 = 0;
    let prev1 = 1;
    
    for (let i = 2; i <= n; i++) {
        const current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    
    return prev1;
}

console.log(fibonacciMemo(10));  // 55
console.log(fibonacciTab(10));   // 55
console.log(fibonacciOptimized(10)); // 55
```

#### Q: How to solve the 0/1 Knapsack problem?
**A:** Maximize value within weight constraint.

```javascript
function knapsack(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]], // Include item
                    dp[i - 1][w]                                   // Exclude item
                );
            } else {
                dp[i][w] = dp[i - 1][w]; // Can't include item
            }
        }
    }
    
    return dp[n][capacity];
}

// To find which items were selected
function knapsackWithPath(weights, values, capacity) {
    const n = weights.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= capacity; w++) {
            if (weights[i - 1] <= w) {
                dp[i][w] = Math.max(
                    values[i - 1] + dp[i - 1][w - weights[i - 1]],
                    dp[i - 1][w]
                );
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    // Backtrack to find selected items
    const selectedItems = [];
    let w = capacity;
    for (let i = n; i > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(i - 1);
            w -= weights[i - 1];
        }
    }
    
    return {
        maxValue: dp[n][capacity],
        selectedItems: selectedItems.reverse()
    };
}

const weights = [2, 1, 3, 2];
const values = [12, 10, 20, 15];
const capacity = 5;
console.log(knapsack(weights, values, capacity)); // 37
console.log(knapsackWithPath(weights, values, capacity)); 
// { maxValue: 37, selectedItems: [1, 2] }
```

#### Q: How to solve Longest Common Subsequence (LCS)?
**A:** Find longest subsequence present in both strings.

```javascript
function longestCommonSubsequence(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
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

// To reconstruct the LCS
function longestCommonSubsequenceWithPath(text1, text2) {
    const m = text1.length;
    const n = text2.length;
    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (text1[i - 1] === text2[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }
    
    // Reconstruct LCS
    let i = m, j = n;
    const lcs = [];
    
    while (i > 0 && j > 0) {
        if (text1[i - 1] === text2[j - 1]) {
            lcs.unshift(text1[i - 1]);
            i--;
            j--;
        } else if (dp[i - 1][j] > dp[i][j - 1]) {
            i--;
        } else {
            j--;
        }
    }
    
    return {
        length: dp[m][n],
        sequence: lcs.join('')
    };
}

console.log(longestCommonSubsequence("abcde", "ace")); // 3
console.log(longestCommonSubsequenceWithPath("abcde", "ace")); 
// { length: 3, sequence: "ace" }
```

#### Q: How to solve Longest Increasing Subsequence (LIS)?
**A:** Find length of longest increasing subsequence.

```javascript
// O(n²) DP solution
function lengthOfLIS(nums) {
    if (nums.length === 0) return 0;
    
    const dp = new Array(nums.length).fill(1);
    
    for (let i = 1; i < nums.length; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i]) {
                dp[i] = Math.max(dp[i], dp[j] + 1);
            }
        }
    }
    
    return Math.max(...dp);
}

// O(n log n) solution with binary search
function lengthOfLISOptimized(nums) {
    if (nums.length === 0) return 0;
    
    const tails = [];
    
    for (const num of nums) {
        let left = 0;
        let right = tails.length;
        
        // Binary search for insertion position
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (tails[mid] < num) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        
        tails[left] = num;
    }
    
    return tails.length;
}

console.log(lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4
console.log(lengthOfLISOptimized([10, 9, 2, 5, 3, 7, 101, 18])); // 4
```

#### Q: How to solve Coin Change problem?
**A:** Find minimum number of coins to make amount.

```javascript
function coinChange(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    
    return dp[amount] === Infinity ? -1 : dp[amount];
}

// To find which coins were used
function coinChangeWithPath(coins, amount) {
    const dp = new Array(amount + 1).fill(Infinity);
    const parent = new Array(amount + 1).fill(-1);
    dp[0] = 0;
    
    for (let i = 1; i <= amount; i++) {
        for (const coin of coins) {
            if (coin <= i && dp[i - coin] + 1 < dp[i]) {
                dp[i] = dp[i - coin] + 1;
                parent[i] = coin;
            }
        }
    }
    
    if (dp[amount] === Infinity) return { count: -1, coins: [] };
    
    // Reconstruct coins used
    const usedCoins = [];
    let current = amount;
    while (current > 0) {
        const coin = parent[current];
        usedCoins.push(coin);
        current -= coin;
    }
    
    return {
        count: dp[amount],
        coins: usedCoins
    };
}

console.log(coinChange([1, 2, 5], 11)); // 3 (5+5+1)
console.log(coinChangeWithPath([1, 2, 5], 11)); 
// { count: 3, coins: [5, 5, 1] }
```

#### Q: How to solve Maximum Subarray problem (Kadane's Algorithm)?
**A:** Find contiguous subarray with maximum sum.

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

// To find the actual subarray
function maxSubArrayWithPath(nums) {
    let maxSoFar = nums[0];
    let maxEndingHere = nums[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] > maxEndingHere + nums[i]) {
            maxEndingHere = nums[i];
            tempStart = i;
        } else {
            maxEndingHere = maxEndingHere + nums[i];
        }
        
        if (maxEndingHere > maxSoFar) {
            maxSoFar = maxEndingHere;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        maxSum: maxSoFar,
        subarray: nums.slice(start, end + 1),
        indices: [start, end]
    };
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArrayWithPath([-2, 1, -3, 4, -1, 2, 1, -5, 4])); 
// { maxSum: 6, subarray: [4, -1, 2, 1], indices: [3, 6] }
```

### Greedy Algorithms

#### Q: How to implement activity selection problem?
**A:** Select maximum number of non-overlapping activities.

```javascript
function activitySelection(start, end) {
    const activities = [];
    
    for (let i = 0; i < start.length; i++) {
        activities.push({ start: start[i], end: end[i], index: i });
    }
    
    // Sort by end time
    activities.sort((a, b) => a.end - b.end);
    
    const selected = [activities[0]];
    let lastEnd = activities[0].end;
    
    for (let i = 1; i < activities.length; i++) {
        if (activities[i].start >= lastEnd) {
            selected.push(activities[i]);
            lastEnd = activities[i].end;
        }
    }
    
    return selected.map(activity => activity.index);
}

const start = [1, 3, 0, 5, 8, 5];
const end = [2, 4, 6, 7, 9, 9];
console.log(activitySelection(start, end)); // [0, 1, 3, 4]
```

#### Q: How to solve Fractional Knapsack problem?
**A:** Take fractions of items to maximize value.

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
    
    // Sort by value/weight ratio (descending)
    items.sort((a, b) => b.ratio - a.ratio);
    
    let totalValue = 0;
    let remainingCapacity = capacity;
    const selected = [];
    
    for (const item of items) {
        if (remainingCapacity >= item.weight) {
            // Take whole item
            totalValue += item.value;
            remainingCapacity -= item.weight;
            selected.push({ index: item.index, fraction: 1 });
        } else {
            // Take fraction of item
            const fraction = remainingCapacity / item.weight;
            totalValue += item.value * fraction;
            selected.push({ index: item.index, fraction });
            remainingCapacity = 0;
            break;
        }
    }
    
    return {
        maxValue: totalValue,
        selected: selected
    };
}

const weights = [10, 20, 30];
const values = [60, 100, 120];
const capacity = 50;
console.log(fractionalKnapsack(weights, values, capacity));
// { maxValue: 240, selected: [...] }
```

#### Q: How to find minimum number of platforms needed for trains?
**A:** Use greedy approach with sorting.

```javascript
function minPlatformsNeeded(arrival, departure) {
    const n = arrival.length;
    
    // Sort arrival and departure times
    arrival.sort((a, b) => a - b);
    departure.sort((a, b) => a - b);
    
    let platformsNeeded = 1;
    let maxPlatforms = 1;
    let i = 1; // Index for arrival
    let j = 0; // Index for departure
    
    while (i < n && j < n) {
        if (arrival[i] <= departure[j]) {
            // Need a new platform
            platformsNeeded++;
            i++;
        } else {
            // A train departed, free a platform
            platformsNeeded--;
            j++;
        }
        
        maxPlatforms = Math.max(maxPlatforms, platformsNeeded);
    }
    
    return maxPlatforms;
}

const arrival = [900, 940, 950, 1100, 1500, 1800];
const departure = [910, 1200, 1120, 1130, 1900, 2000];
console.log(minPlatformsNeeded(arrival, departure)); // 3
```

---

## Problem Solving Patterns

### Sliding Window

#### Q: How to find maximum sum of subarray of size k?
**A:** Use sliding window technique for O(n) solution.

```javascript
function maxSumSubarray(arr, k) {
    if (arr.length < k) return null;
    
    let maxSum = 0;
    let windowSum = 0;
    
    // Calculate sum of first window
    for (let i = 0; i < k; i++) {
        windowSum += arr[i];
    }
    maxSum = windowSum;
    
    // Slide window and update max sum
    for (let i = k; i < arr.length; i++) {
        windowSum = windowSum + arr[i] - arr[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}

console.log(maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9 (5+1+3)
```

#### Q: How to find smallest subarray with sum greater than target?
**A:** Use variable-size sliding window.

```javascript
function minSubArrayLen(target, nums) {
    let minLength = Infinity;
    let currentSum = 0;
    let left = 0;
    
    for (let right = 0; right < nums.length; right++) {
        currentSum += nums[right];
        
        while (currentSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            currentSum -= nums[left];
            left++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}

console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3])); // 2 ([4,3])
```

#### Q: How to find all anagrams in a string?
**A:** Use fixed-size sliding window with character count.

```javascript
function findAnagrams(s, p) {
    const result = [];
    if (s.length < p.length) return result;
    
    const pCount = new Map();
    const sCount = new Map();
    
    // Count characters in p
    for (const char of p) {
        pCount.set(char, (pCount.get(char) || 0) + 1);
    }
    
    const windowSize = p.length;
    
    // Initialize first window
    for (let i = 0; i < windowSize; i++) {
        const char = s[i];
        sCount.set(char, (sCount.get(char) || 0) + 1);
    }
    
    if (mapsEqual(pCount, sCount)) {
        result.push(0);
    }
    
    // Slide window
    for (let i = windowSize; i < s.length; i++) {
        const newChar = s[i];
        const oldChar = s[i - windowSize];
        
        // Add new character
        sCount.set(newChar, (sCount.get(newChar) || 0) + 1);
        
        // Remove old character
        sCount.set(oldChar, sCount.get(oldChar) - 1);
        if (sCount.get(oldChar) === 0) {
            sCount.delete(oldChar);
        }
        
        if (mapsEqual(pCount, sCount)) {
            result.push(i - windowSize + 1);
        }
    }
    
    return result;
}

function mapsEqual(map1, map2) {
    if (map1.size !== map2.size) return false;
    for (const [key, value] of map1) {
        if (map2.get(key) !== value) return false;
    }
    return true;
}

console.log(findAnagrams("cbaebabacd", "abc")); // [0, 6]
```

### Two Pointers

#### Q: How to remove duplicates from sorted array in place?
**A:** Use two pointers approach.

```javascript
function removeDuplicates(nums) {
    if (nums.length === 0) return 0;
    
    let i = 0;
    
    for (let j = 1; j < nums.length; j++) {
        if (nums[j] !== nums[i]) {
            i++;
            nums[i] = nums[j];
        }
    }
    
    return i + 1;
}

const nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4];
const k = removeDuplicates(nums);
console.log(k); // 5
console.log(nums.slice(0, k)); // [0, 1, 2, 3, 4]
```

#### Q: How to move all zeros to end of array?
**A:** Use two pointers to maintain non-zero elements.

```javascript
function moveZeroes(nums) {
    let insertPos = 0;
    
    // Move all non-zero elements to front
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            nums[insertPos++] = nums[i];
        }
    }
    
    // Fill remaining positions with zeros
    while (insertPos < nums.length) {
        nums[insertPos++] = 0;
    }
}

const arr = [0, 1, 0, 3, 12];
moveZeroes(arr);
console.log(arr); // [1, 3, 12, 0, 0]
```

#### Q: How to find two sum in sorted array?
**A:** Use two pointers from both ends.

```javascript
function twoSumSorted(numbers, target) {
    let left = 0;
    let right = numbers.length - 1;
    
    while (left < right) {
        const sum = numbers[left] + numbers[right];
        
        if (sum === target) {
            return [left + 1, right + 1]; // 1-indexed
        } else if (sum < target) {
            left++;
        } else {
            right--;
        }
    }
    
    return [];
}

console.log(twoSumSorted([2, 7, 11, 15], 9)); // [1, 2]
```

### Fast & Slow Pointers

#### Q: How to find middle of linked list?
**A:** Use fast and slow pointers.

```javascript
function middleNode(head) {
    let slow = head;
    let fast = head;
    
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow;
}
```

#### Q: How to detect and find start of cycle in linked list?
**A:** Floyd's algorithm extension.

```javascript
function detectCycleStart(head) {
    if (!head || !head.next) return null;
    
    let slow = head;
    let fast = head;
    
    // Detect cycle
    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
        
        if (slow === fast) break;
    }
    
    if (!fast || !fast.next) return null; // No cycle
    
    // Find start of cycle
    slow = head;
    while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
    }
    
    return slow; // Start of cycle
}
```

### Monotonic Stack

#### Q: How to find next greater element for each element?
**A:** Use monotonic decreasing stack.

```javascript
function nextGreaterElement(arr) {
    const result = new Array(arr.length).fill(-1);
    const stack = [];
    
    for (let i = 0; i < arr.length; i++) {
        while (stack.length && arr[i] > arr[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = arr[i];
        }
        stack.push(i);
    }
    
    return result;
}

console.log(nextGreaterElement([4, 5, 2, 25])); // [5, 25, 25, -1]
```

#### Q: How to find daily temperatures until warmer day?
**A:** Use monotonic stack to track indices.

```javascript
function dailyTemperatures(temperatures) {
    const result = new Array(temperatures.length).fill(0);
    const stack = [];
    
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
            const index = stack.pop();
            result[index] = i - index;
        }
        stack.push(i);
    }
    
    return result;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73])); 
// [1, 1, 4, 2, 1, 1, 0, 0]
```

### Prefix Sum

#### Q: How to find subarray sum equals k?
**A:** Use prefix sum with hash map.

```javascript
function subarraySum(nums, k) {
    let count = 0;
    let sum = 0;
    const prefixSum = new Map();
    prefixSum.set(0, 1); // Base case: sum 0 appears once
    
    for (const num of nums) {
        sum += num;
        
        // Check if (sum - k) exists
        if (prefixSum.has(sum - k)) {
            count += prefixSum.get(sum - k);
        }
        
        // Update prefix sum count
        prefixSum.set(sum, (prefixSum.get(sum) || 0) + 1);
    }
    
    return count;
}

console.log(subarraySum([1, 1, 1], 2)); // 2
console.log(subarraySum([1, 2, 3], 3)); // 2
```

### Bit Manipulation

#### Q: How to find single number in array where every other appears twice?
**A:** Use XOR operation.

```javascript
function singleNumber(nums) {
    let result = 0;
    
    for (const num of nums) {
        result ^= num;
    }
    
    return result;
}

console.log(singleNumber([4, 1, 2, 1, 2])); // 4
```

#### Q: How to count set bits in a number?
**A:** Use Brian Kernighan's algorithm.

```javascript
function countSetBits(n) {
    let count = 0;
    
    while (n > 0) {
        n &= (n - 1); // Clear rightmost set bit
        count++;
    }
    
    return count;
}

console.log(countSetBits(5)); // 2 (binary: 101)
console.log(countSetBits(7)); // 3 (binary: 111)
```

---

## Summary

This comprehensive guide covers essential DSA concepts in JavaScript with practical code examples. Master these patterns and data structures to excel in technical interviews and real-world problem solving.

### Key Takeaways:
1. **Understand Time/Space Complexity**: Always analyze your solutions
2. **Master Core Data Structures**: Arrays, Linked Lists, Stacks, Queues, Trees, Heaps, Graphs, Hash Tables
3. **Learn Algorithm Patterns**: Sorting, Searching, Recursion, DP, Greedy, Backtracking
4. **Practice Problem-Solving Patterns**: Sliding Window, Two Pointers, Fast & Slow Pointers, Monotonic Stack, Prefix Sum
5. **Code Regularly**: Practice on platforms like LeetCode, HackerRank, CodeSignal
