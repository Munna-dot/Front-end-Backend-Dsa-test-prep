# 30 JavaScript Real-World Problems to Improve Logical Thinking

This document contains 30 real-world JavaScript problems with solutions and detailed comments to help improve your logical thinking skills.

---

## 1. **Find the Missing Number in an Array**
**Problem:** Given an array containing numbers from 1 to n with one number missing, find the missing number.

```javascript
function findMissingNumber(arr, n) {
  // Calculate expected sum of numbers from 1 to n using formula: n*(n+1)/2
  const expectedSum = (n * (n + 1)) / 2;
  
  // Calculate actual sum of array elements
  const actualSum = arr.reduce((sum, num) => sum + num, 0);
  
  // The difference is the missing number
  return expectedSum - actualSum;
}

// Example: findMissingNumber([1, 2, 4, 5], 5) returns 3
```

---

## 2. **Remove Duplicates from an Array**
**Problem:** Remove duplicate values from an array without using built-in methods like `Set`.

```javascript
function removeDuplicates(arr) {
  const result = [];
  
  // Iterate through each element
  for (let i = 0; i < arr.length; i++) {
    let isDuplicate = false;
    
    // Check if current element exists in result array
    for (let j = 0; j < result.length; j++) {
      if (arr[i] === result[j]) {
        isDuplicate = true;
        break;
      }
    }
    
    // Add only if not a duplicate
    if (!isDuplicate) {
      result.push(arr[i]);
    }
  }
  
  return result;
}

// Example: removeDuplicates([1, 2, 2, 3, 4, 4]) returns [1, 2, 3, 4]
```

---

## 3. **Reverse a String Without Built-in Methods**
**Problem:** Reverse a string without using `split()`, `reverse()`, or `join()`.

```javascript
function reverseString(str) {
  let reversed = '';
  
  // Start from the last character and move backwards
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }
  
  return reversed;
}

// Example: reverseString("hello") returns "olleh"
```

---

## 4. **Check if a String is a Palindrome**
**Problem:** Determine if a string reads the same forwards and backwards (ignore case and spaces).

```javascript
function isPalindrome(str) {
  // Normalize: convert to lowercase and remove spaces
  let normalized = '';
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== ' ') {
      normalized += str[i].toLowerCase();
    }
  }
  
  // Compare characters from both ends moving towards center
  let left = 0;
  let right = normalized.length - 1;
  
  while (left < right) {
    if (normalized[left] !== normalized[right]) {
      return false;
    }
    left++;
    right--;
  }
  
  return true;
}

// Example: isPalindrome("A man a plan a canal Panama") returns true
```

---

## 5. **Find the Second Largest Number**
**Problem:** Find the second largest number in an array without sorting.

```javascript
function findSecondLargest(arr) {
  if (arr.length < 2) return null;
  
  let largest = -Infinity;
  let secondLargest = -Infinity;
  
  for (let i = 0; i < arr.length; i++) {
    // Update largest and secondLargest accordingly
    if (arr[i] > largest) {
      secondLargest = largest;  // Previous largest becomes second
      largest = arr[i];         // New largest found
    } else if (arr[i] > secondLargest && arr[i] !== largest) {
      secondLargest = arr[i];   // Found a new second largest
    }
  }
  
  return secondLargest === -Infinity ? null : secondLargest;
}

// Example: findSecondLargest([10, 5, 20, 8, 20]) returns 10
```

---

## 6. **Count Occurrences of Each Character**
**Problem:** Count how many times each character appears in a string.

```javascript
function countCharacters(str) {
  const charCount = {};
  
  // Iterate through each character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // If character exists in object, increment; otherwise set to 1
    if (charCount[char]) {
      charCount[char]++;
    } else {
      charCount[char] = 1;
    }
  }
  
  return charCount;
}

// Example: countCharacters("hello") returns {h: 1, e: 1, l: 2, o: 1}
```

---

## 7. **Implement a Simple Cache (LRU)**
**Problem:** Create a simple Least Recently Used cache with a maximum size.

```javascript
class SimpleCache {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.cache = [];
  }
  
  get(key) {
    // Find item in cache
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i].key === key) {
        const item = this.cache[i];
        // Move to end (most recently used)
        this.cache.splice(i, 1);
        this.cache.push(item);
        return item.value;
      }
    }
    return null;
  }
  
  put(key, value) {
    // Remove if already exists
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i].key === key) {
        this.cache.splice(i, 1);
        break;
      }
    }
    
    // Add new item
    this.cache.push({ key, value });
    
    // Remove oldest if exceeds max size
    if (this.cache.length > this.maxSize) {
      this.cache.shift();
    }
  }
}

// Example: Use cache to store frequently accessed data
```

---

## 8. **Flatten a Nested Array**
**Problem:** Flatten a multi-dimensional array of any depth without using `flat()`.

```javascript
function flattenArray(arr) {
  const result = [];
  
  for (let i = 0; i < arr.length; i++) {
    // Check if current element is an array
    if (Array.isArray(arr[i])) {
      // Recursively flatten nested arrays
      const flattened = flattenArray(arr[i]);
      // Add all elements to result
      for (let j = 0; j < flattened.length; j++) {
        result.push(flattened[j]);
      }
    } else {
      // Add non-array elements directly
      result.push(arr[i]);
    }
  }
  
  return result;
}

// Example: flattenArray([1, [2, [3, 4], 5]]) returns [1, 2, 3, 4, 5]
```

---

## 9. **Find All Pairs That Sum to Target**
**Problem:** Find all pairs in an array that add up to a specific target value.

```javascript
function findPairsWithSum(arr, target) {
  const pairs = [];
  const seen = {};
  
  for (let i = 0; i < arr.length; i++) {
    const complement = target - arr[i];
    
    // Check if complement exists in seen objects
    if (seen[complement]) {
      pairs.push([complement, arr[i]]);
    }
    
    // Mark current number as seen
    seen[arr[i]] = true;
  }
  
  return pairs;
}

// Example: findPairsWithSum([1, 2, 3, 4, 5], 5) returns [[1, 4], [2, 3]]
```

---

## 10. **Implement Debounce Function**
**Problem:** Create a debounce function that limits how often a function can be called.

```javascript
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    // Clear previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    // Set new timeout
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example: Use for search input to avoid too many API calls
// const searchHandler = debounce((query) => { fetchResults(query); }, 300);
```

---

## 11. **Group Array Elements by Property**
**Problem:** Group array of objects by a specific property value.

```javascript
function groupBy(arr, property) {
  const grouped = {};
  
  for (let i = 0; i < arr.length; i++) {
    const key = arr[i][property];
    
    // Initialize array for this key if it doesn't exist
    if (!grouped[key]) {
      grouped[key] = [];
    }
    
    // Add current object to appropriate group
    grouped[key].push(arr[i]);
  }
  
  return grouped;
}

// Example: groupBy([{name: "John", age: 25}, {name: "Jane", age: 25}], "age")
// Returns: {25: [{name: "John", age: 25}, {name: "Jane", age: 25}]}
```

---

## 12. **Find Longest Word in a Sentence**
**Problem:** Find the longest word in a sentence (ignore punctuation).

```javascript
function findLongestWord(sentence) {
  let longestWord = '';
  let currentWord = '';
  
  for (let i = 0; i < sentence.length; i++) {
    const char = sentence[i];
    
    // Check if character is a letter
    if (/[a-zA-Z]/.test(char)) {
      currentWord += char;
    } else {
      // End of word reached
      if (currentWord.length > longestWord.length) {
        longestWord = currentWord;
      }
      currentWord = '';
    }
  }
  
  // Check last word
  if (currentWord.length > longestWord.length) {
    longestWord = currentWord;
  }
  
  return longestWord;
}

// Example: findLongestWord("The quick brown fox jumped") returns "jumped"
```

---

## 13. **Rotate Array by K Positions**
**Problem:** Rotate an array to the right by k positions.

```javascript
function rotateArray(arr, k) {
  const n = arr.length;
  if (n === 0) return arr;
  
  // Handle cases where k > array length
  k = k % n;
  
  // Create new array with rotated elements
  const result = [];
  
  // Add last k elements first
  for (let i = n - k; i < n; i++) {
    result.push(arr[i]);
  }
  
  // Add remaining elements
  for (let i = 0; i < n - k; i++) {
    result.push(arr[i]);
  }
  
  return result;
}

// Example: rotateArray([1, 2, 3, 4, 5], 2) returns [4, 5, 1, 2, 3]
```

---

## 14. **Validate Parentheses Balance**
**Problem:** Check if parentheses in a string are balanced.

```javascript
function isValidParentheses(str) {
  const stack = [];
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  };
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // If opening bracket, push to stack
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } 
    // If closing bracket
    else if (char === ')' || char === '}' || char === ']') {
      // Check if stack is empty or top doesn't match
      if (stack.length === 0 || stack.pop() !== pairs[char]) {
        return false;
      }
    }
  }
  
  // Stack should be empty if all brackets matched
  return stack.length === 0;
}

// Example: isValidParentheses("({[]})") returns true, "({[})" returns false
```

---

## 15. **Find Intersection of Two Arrays**
**Problem:** Find common elements between two arrays.

```javascript
function findIntersection(arr1, arr2) {
  const intersection = [];
  const seen = {};
  
  // Mark all elements from first array
  for (let i = 0; i < arr1.length; i++) {
    seen[arr1[i]] = true;
  }
  
  // Check which elements from second array exist in first
  for (let i = 0; i < arr2.length; i++) {
    if (seen[arr2[i]]) {
      intersection.push(arr2[i]);
      // Prevent duplicates in result
      delete seen[arr2[i]];
    }
  }
  
  return intersection;
}

// Example: findIntersection([1, 2, 3, 4], [3, 4, 5, 6]) returns [3, 4]
```

---

## 16. **Calculate Factorial Recursively**
**Problem:** Calculate factorial of a number using recursion.

```javascript
function factorial(n) {
  // Base case: factorial of 0 or 1 is 1
  if (n === 0 || n === 1) {
    return 1;
  }
  
  // Recursive case: n! = n * (n-1)!
  return n * factorial(n - 1);
}

// Example: factorial(5) returns 120 (5*4*3*2*1)
```

---

## 17. **Find Maximum Difference in Array**
**Problem:** Find the maximum difference between two elements where larger element comes after smaller.

```javascript
function findMaxDifference(arr) {
  if (arr.length < 2) return 0;
  
  let minElement = arr[0];
  let maxDiff = 0;
  
  for (let i = 1; i < arr.length; i++) {
    // Calculate difference with current minimum
    const diff = arr[i] - minElement;
    
    // Update maximum difference if current is larger
    if (diff > maxDiff) {
      maxDiff = diff;
    }
    
    // Update minimum element if current is smaller
    if (arr[i] < minElement) {
      minElement = arr[i];
    }
  }
  
  return maxDiff;
}

// Example: findMaxDifference([2, 3, 10, 6, 4, 8, 1]) returns 8 (10-2)
```

---

## 18. **Implement Array Chunking**
**Problem:** Split an array into chunks of specified size.

```javascript
function chunkArray(arr, size) {
  const chunks = [];
  
  for (let i = 0; i < arr.length; i += size) {
    const chunk = [];
    
    // Add up to 'size' elements to current chunk
    for (let j = i; j < i + size && j < arr.length; j++) {
      chunk.push(arr[j]);
    }
    
    chunks.push(chunk);
  }
  
  return chunks;
}

// Example: chunkArray([1, 2, 3, 4, 5, 6], 2) returns [[1,2], [3,4], [5,6]]
```

---

## 19. **Find First Non-Repeating Character**
**Problem:** Find the first character in a string that doesn't repeat.

```javascript
function findFirstNonRepeating(str) {
  const charCount = {};
  
  // First pass: count occurrences
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Second pass: find first character with count of 1
  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) {
      return str[i];
    }
  }
  
  return null;
}

// Example: findFirstNonRepeating("swiss") returns "w"
```

---

## 20. **Merge Two Sorted Arrays**
**Problem:** Merge two sorted arrays into one sorted array.

```javascript
function mergeSortedArrays(arr1, arr2) {
  const merged = [];
  let i = 0, j = 0;
  
  // Compare elements from both arrays and add smaller one
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] <= arr2[j]) {
      merged.push(arr1[i]);
      i++;
    } else {
      merged.push(arr2[j]);
      j++;
    }
  }
  
  // Add remaining elements from arr1
  while (i < arr1.length) {
    merged.push(arr1[i]);
    i++;
  }
  
  // Add remaining elements from arr2
  while (j < arr2.length) {
    merged.push(arr2[j]);
    j++;
  }
  
  return merged;
}

// Example: mergeSortedArrays([1, 3, 5], [2, 4, 6]) returns [1, 2, 3, 4, 5, 6]
```

---

## 21. **Check if Two Strings are Anagrams**
**Problem:** Determine if two strings contain the same characters in different orders.

```javascript
function areAnagrams(str1, str2) {
  // Quick check: different lengths means not anagrams
  if (str1.length !== str2.length) {
    return false;
  }
  
  const charCount = {};
  
  // Count characters in first string
  for (let i = 0; i < str1.length; i++) {
    const char = str1[i].toLowerCase();
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Decrement counts for second string
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i].toLowerCase();
    
    // If character doesn't exist or count is 0, not an anagram
    if (!charCount[char]) {
      return false;
    }
    
    charCount[char]--;
  }
  
  return true;
}

// Example: areAnagrams("listen", "silent") returns true
```

---

## 22. **Find Majority Element**
**Problem:** Find the element that appears more than n/2 times in an array.

```javascript
function findMajorityElement(arr) {
  let candidate = null;
  let count = 0;
  
  // Boyer-Moore Voting Algorithm
  for (let i = 0; i < arr.length; i++) {
    if (count === 0) {
      candidate = arr[i];
      count = 1;
    } else if (arr[i] === candidate) {
      count++;
    } else {
      count--;
    }
  }
  
  // Verify candidate is actually majority
  let occurrences = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === candidate) {
      occurrences++;
    }
  }
  
  return occurrences > arr.length / 2 ? candidate : null;
}

// Example: findMajorityElement([3, 3, 4, 2, 3, 3, 3]) returns 3
```

---

## 23. **Implement Throttle Function**
**Problem:** Create a throttle function that ensures a function is called at most once per specified interval.

```javascript
function throttle(func, limit) {
  let inThrottle = false;
  
  return function(...args) {
    // If not in throttle period, execute function
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      
      // Set timeout to allow next execution after limit
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Example: Use for scroll events to limit frequency of execution
// const handleScroll = throttle(() => { updatePosition(); }, 100);
```

---

## 24. **Find All Subsets of an Array**
**Problem:** Generate all possible subsets (power set) of an array.

```javascript
function findAllSubsets(arr) {
  const subsets = [[]];
  
  for (let i = 0; i < arr.length; i++) {
    const currentLength = subsets.length;
    
    // For each existing subset, create a new one with current element
    for (let j = 0; j < currentLength; j++) {
      const newSubset = subsets[j].slice(); // Create copy
      newSubset.push(arr[i]);
      subsets.push(newSubset);
    }
  }
  
  return subsets;
}

// Example: findAllSubsets([1, 2, 3]) returns [[], [1], [2], [1,2], [3], [1,3], [2,3], [1,2,3]]
```

---

## 25. **Capitalize First Letter of Each Word**
**Problem:** Capitalize the first letter of each word in a string.

```javascript
function capitalizeWords(str) {
  let result = '';
  let capitalizeNext = true;
  
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    
    // Check if character is a letter
    if (/[a-zA-Z]/.test(char)) {
      if (capitalizeNext) {
        result += char.toUpperCase();
        capitalizeNext = false;
      } else {
        result += char.toLowerCase();
      }
    } else {
      // Non-letter character, next letter should be capitalized
      result += char;
      capitalizeNext = true;
    }
  }
  
  return result;
}

// Example: capitalizeWords("hello world from javascript") returns "Hello World From Javascript"
```

---

## 26. **Find Peak Element in Array**
**Problem:** Find a peak element (greater than its neighbors) in an array.

```javascript
function findPeakElement(arr) {
  if (arr.length === 0) return -1;
  if (arr.length === 1) return 0;
  
  // Check first element
  if (arr[0] > arr[1]) return 0;
  
  // Check middle elements
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      return i;
    }
  }
  
  // Check last element
  if (arr[arr.length - 1] > arr[arr.length - 2]) {
    return arr.length - 1;
  }
  
  return -1;
}

// Example: findPeakElement([1, 3, 2, 4, 1]) returns 1 or 3 (indices of peaks)
```

---

## 27. **Compress Consecutive Characters**
**Problem:** Compress a string by replacing consecutive repeated characters with character + count.

```javascript
function compressString(str) {
  if (str.length === 0) return '';
  
  let compressed = '';
  let count = 1;
  
  for (let i = 1; i <= str.length; i++) {
    // If current char same as previous, increment count
    if (i < str.length && str[i] === str[i - 1]) {
      count++;
    } else {
      // Add character and count to result
      compressed += str[i - 1] + count;
      count = 1;
    }
  }
  
  // Return compressed only if shorter than original
  return compressed.length < str.length ? compressed : str;
}

// Example: compressString("aaabbbcccc") returns "a3b3c4"
```

---

## 28. **Find Kth Largest Element**
**Problem:** Find the kth largest element in an unsorted array.

```javascript
function findKthLargest(arr, k) {
  // Partition around a pivot
  function partition(left, right, pivotIndex) {
    const pivotValue = arr[pivotIndex];
    // Move pivot to end
    [arr[pivotIndex], arr[right]] = [arr[right], arr[pivotIndex]];
    
    let storeIndex = left;
    for (let i = left; i < right; i++) {
      if (arr[i] > pivotValue) {
        [arr[storeIndex], arr[i]] = [arr[i], arr[storeIndex]];
        storeIndex++;
      }
    }
    
    // Move pivot to final place
    [arr[right], arr[storeIndex]] = [arr[storeIndex], arr[right]];
    return storeIndex;
  }
  
  function select(left, right, kSmallest) {
    if (left === right) {
      return arr[left];
    }
    
    const pivotIndex = Math.floor((left + right) / 2);
    const newIndex = partition(left, right, pivotIndex);
    
    if (kSmallest === newIndex) {
      return arr[newIndex];
    } else if (kSmallest < newIndex) {
      return select(left, newIndex - 1, kSmallest);
    } else {
      return select(newIndex + 1, right, kSmallest);
    }
  }
  
  return select(0, arr.length - 1, k - 1);
}

// Example: findKthLargest([3, 2, 1, 5, 6, 4], 2) returns 5
```

---

## 29. **Implement Promise All**
**Problem:** Implement a simplified version of Promise.all.

```javascript
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completedCount = 0;
    
    // Handle empty array
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(value => {
          results[i] = value;
          completedCount++;
          
          // Resolve when all promises complete
          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch(error => {
          // Reject immediately on first error
          reject(error);
        });
    }
  });
}

// Example: promiseAll([Promise.resolve(1), Promise.resolve(2)]) resolves to [1, 2]
```

---

## 30. **Detect Cycle in Linked List**
**Problem:** Detect if a linked list has a cycle (Floyd's Tortoise and Hare algorithm).

```javascript
class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

function hasCycle(head) {
  if (!head || !head.next) return false;
  
  let slow = head;
  let fast = head;
  
  // Move slow by 1 step and fast by 2 steps
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    
    // If they meet, there's a cycle
    if (slow === fast) {
      return true;
    }
  }
  
  return false;
}

// Example: Create linked list with cycle and detect it
// const node1 = new ListNode(1);
// const node2 = new ListNode(2);
// node1.next = node2;
// node2.next = node1; // Creates cycle
// hasCycle(node1) returns true
```

---

## Tips for Improving Logical Thinking

1. **Break problems down**: Divide complex problems into smaller, manageable parts
2. **Use visual aids**: Draw diagrams or write out examples on paper
3. **Practice regularly**: Consistent practice builds pattern recognition
4. **Understand before coding**: Make sure you fully understand the problem first
5. **Test edge cases**: Consider empty inputs, single elements, and extreme values
6. **Optimize gradually**: Get it working first, then optimize for performance
7. **Learn from others**: Study different approaches to the same problem
8. **Debug systematically**: Use console.log or debugger to trace execution

---

## Conclusion

These 30 problems cover various aspects of JavaScript programming including:
- Array manipulation
- String processing
- Recursion
- Data structures (stacks, queues, hash maps)
- Algorithms (searching, sorting, dynamic programming concepts)
- Asynchronous programming
- Design patterns (debounce, throttle, cache)

Practice these problems regularly, try to solve them without looking at the solutions first, and experiment with different approaches to strengthen your logical thinking skills!
