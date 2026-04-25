# 25 JavaScript Problems & Solutions (Beginner to Advanced)

This document covers 25 JavaScript problems ranging from beginner fundamentals to advanced concepts like closures, async/await, and functional programming.

---

## 🟢 Beginner Level (1-8)

### 1. Reverse a String
**Problem:** Write a function that takes a string and returns it reversed.

**Solution:**
```javascript
function reverseString(str) {
  return str.split('').reverse().join('');
}

// Usage
console.log(reverseString("hello")); // "olleh"
console.log(reverseString("JavaScript")); // "tpircSavaJ"
```

### 2. Check for Palindrome
**Problem:** Determine if a given string is a palindrome (reads the same forwards and backwards), ignoring case and non-alphanumeric characters.

**Solution:**
```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversed = cleaned.split('').reverse().join('');
  return cleaned === reversed;
}

// Usage
console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("race a car")); // false
```

### 3. Find the Maximum Number in an Array
**Problem:** Write a function that returns the largest number in an array.

**Solution:**
```javascript
function findMax(arr) {
  if (arr.length === 0) return undefined;
  let max = arr[0];
  for (let num of arr) {
    if (num > max) max = num;
  }
  return max;
}

// Alternative using spread operator
const findMaxModern = (arr) => Math.max(...arr);

// Usage
console.log(findMax([3, 7, 2, 9, 1])); // 9
console.log(findMaxModern([10, 20, 5])); // 20
```

### 4. Remove Duplicates from an Array
**Problem:** Create a function that removes duplicate values from an array.

**Solution:**
```javascript
function removeDuplicates(arr) {
  return [...new Set(arr)];
}

// Usage
console.log(removeDuplicates([1, 2, 2, 3, 4, 4, 5])); // [1, 2, 3, 4, 5]
console.log(removeDuplicates(['apple', 'banana', 'apple'])); // ['apple', 'banana']
```

### 5. FizzBuzz
**Problem:** Print numbers from 1 to n. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".

**Solution:**
```javascript
function fizzBuzz(n) {
  const result = [];
  for (let i = 1; i <= n; i++) {
    if (i % 15 === 0) result.push("FizzBuzz");
    else if (i % 3 === 0) result.push("Fizz");
    else if (i % 5 === 0) result.push("Buzz");
    else result.push(i);
  }
  return result;
}

// Usage
console.log(fizzBuzz(15)); 
// [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
```

### 6. Count Vowels in a String
**Problem:** Write a function that counts the number of vowels (a, e, i, o, u) in a string.

**Solution:**
```javascript
function countVowels(str) {
  const vowels = str.toLowerCase().match(/[aeiou]/g);
  return vowels ? vowels.length : 0;
}

// Usage
console.log(countVowels("Hello World")); // 3
console.log(countVowels("JavaScript")); // 3
```

### 7. Calculate Factorial
**Problem:** Write a function to calculate the factorial of a non-negative integer.

**Solution:**
```javascript
// Iterative approach
function factorial(n) {
  if (n < 0) return undefined;
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// Recursive approach
const factorialRecursive = (n) => n <= 1 ? 1 : n * factorialRecursive(n - 1);

// Usage
console.log(factorial(5)); // 120
console.log(factorialRecursive(5)); // 120
```

### 8. Chunk an Array
**Problem:** Split an array into smaller arrays of a specified size.

**Solution:**
```javascript
function chunkArray(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

// Usage
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7], 3)); 
// [[1, 2, 3], [4, 5, 6], [7]]
```

---

## 🟡 Intermediate Level (9-17)

### 9. Deep Clone an Object
**Problem:** Create a function that performs a deep clone of an object (including nested objects and arrays).

**Solution:**
```javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (obj instanceof Array) return obj.map(item => deepClone(item));
  
  const clonedObj = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = deepClone(obj[key]);
    }
  }
  return clonedObj;
}

// Modern alternative using structuredClone (Node 17+)
// const deepCloneModern = (obj) => structuredClone(obj);

// Usage
const original = { a: 1, b: { c: 2, d: [3, 4] } };
const copy = deepClone(original);
copy.b.c = 999;
console.log(original.b.c); // 2 (unchanged)
console.log(copy.b.c); // 999
```

### 10. Flatten a Nested Array
**Problem:** Write a function that flattens a multi-dimensional array to a single dimension.

**Solution:**
```javascript
function flattenArray(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flattenArray(val)) : acc.concat(val), 
  []);
}

// Usage
console.log(flattenArray([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
console.log([1, [2, [3, 4], 5], 6].flat(Infinity)); // Native method
```

### 11. Debounce Function
**Problem:** Implement a debounce function that delays invoking a function until after wait milliseconds have elapsed since the last time the debounced function was invoked.

**Solution:**
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
const logMessage = (msg) => console.log(`Logged: ${msg}`);
const debouncedLog = debounce(logMessage, 1000);

debouncedLog("Hello"); // Will not log immediately
debouncedLog("World"); // Cancels previous, waits 1s
// After 1 second: "Logged: World"
```

### 12. Throttle Function
**Problem:** Implement a throttle function that ensures a function is called at most once in a specified time interval.

**Solution:**
```javascript
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
const throttledLog = throttle((msg) => console.log(msg), 2000);
throttledLog("First"); // Logs immediately
throttledLog("Second"); // Ignored
setTimeout(() => throttledLog("Third"), 2100); // Logs after 2s
```

### 13. Group By Property
**Problem:** Write a function that groups an array of objects by a specific property.

**Solution:**
```javascript
function groupBy(arr, key) {
  return arr.reduce((result, item) => {
    const groupKey = item[key];
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {});
}

// Usage
const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 25 }
];
console.log(groupBy(people, 'age'));
// { 25: [{name: "Alice", age: 25}, {name: "Charlie", age: 25}], 30: [{name: "Bob", age: 30}] }
```

### 14. Memoization
**Problem:** Create a memoization function that caches the results of expensive function calls.

**Solution:**
```javascript
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const slowSquare = (n) => {
  // Simulate heavy computation
  for(let i = 0; i < 100000000; i++) {} 
  return n * n;
};

const memoizedSquare = memoize(slowSquare);
console.log(memoizedSquare(5)); // Slow first time
console.log(memoizedSquare(5)); // Instant (cached)
```

### 15. Promise All Implementation
**Problem:** Implement your own version of `Promise.all` that takes an array of promises and resolves when all are done.

**Solution:**
```javascript
function myPromiseAll(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Usage
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.resolve(3);

myPromiseAll([p1, p2, p3]).then(console.log); // [1, 2, 3]
```

### 16. Currying
**Problem:** Implement a curry function that transforms a function with multiple arguments into a sequence of functions each taking a single argument.

**Solution:**
```javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    } else {
      return function(...moreArgs) {
        return curried.apply(this, args.concat(moreArgs));
      };
    }
  };
}

// Usage
const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6
```

### 17. Compose Functions
**Problem:** Implement a `compose` function that combines multiple functions into a single function, executing them from right to left.

**Solution:**
```javascript
function compose(...functions) {
  return function(initialValue) {
    return functions.reduceRight((acc, fn) => fn(acc), initialValue);
  };
}

// Usage
const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = compose(square, double, addOne);
// Execution: addOne(3) -> 4, double(4) -> 8, square(8) -> 64
console.log(transform(3)); // 64
```

---

## 🔴 Advanced Level (18-25)

### 18. Async/Await Retry Logic
**Problem:** Create a function that retries an asynchronous operation a specified number of times with a delay between attempts if it fails.

**Solution:**
```javascript
async function retry(fn, retries = 3, delay = 1000) {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    console.log(`Retrying... (${retries} attempts left)`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return retry(fn, retries - 1, delay);
  }
}

// Usage
let attempt = 0;
const flakyFunction = async () => {
  attempt++;
  if (attempt < 3) throw new Error("Failed");
  return "Success!";
};

retry(flakyFunction, 3, 500)
  .then(result => console.log(result)) // "Success!"
  .catch(err => console.error(err));
```

### 19. Event Emitter Class
**Problem:** Implement a simple Event Emitter class with `on`, `off`, and `emit` methods.

**Solution:**
```javascript
class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
    return this;
  }

  off(event, listenerToRemove) {
    if (!this.events.has(event)) return this;
    
    const listeners = this.events.get(event);
    const filtered = listeners.filter(l => l !== listenerToRemove);
    this.events.set(event, filtered);
    return this;
  }

  emit(event, ...args) {
    if (!this.events.has(event)) return false;
    
    this.events.get(event).forEach(listener => listener(...args));
    return true;
  }
}

// Usage
const emitter = new EventEmitter();

const handler = (data) => console.log(`Received: ${data}`);
emitter.on('message', handler);
emitter.emit('message', 'Hello World'); // Received: Hello World

emitter.off('message', handler);
emitter.emit('message', 'Ignored'); // No output
```

### 20. Generator for Range
**Problem:** Create a generator function that yields numbers in a range with a specified step.

**Solution:**
```javascript
function* range(start, end, step = 1) {
  if (step > 0) {
    for (let i = start; i < end; i += step) {
      yield i;
    }
  } else {
    for (let i = start; i > end; i += step) {
      yield i;
    }
  }
}

// Usage
console.log([...range(0, 5)]); // [0, 1, 2, 3, 4]
console.log([...range(0, 10, 2)]); // [0, 2, 4, 6, 8]
console.log([...range(10, 0, -2)]); // [10, 8, 6, 4, 2]

// Memory efficient iteration
for (const num of range(0, 1000000)) {
  if (num > 5) break;
  console.log(num);
}
```

### 21. Proxy for Validation
**Problem:** Use a Proxy to create an object that validates data types upon assignment.

**Solution:**
```javascript
function createValidatedObject(schema) {
  return new Proxy({}, {
    set(target, prop, value) {
      const expectedType = schema[prop];
      
      if (expectedType && typeof value !== expectedType) {
        throw new TypeError(
          `Property '${prop}' must be of type ${expectedType}, got ${typeof value}`
        );
      }
      
      target[prop] = value;
      return true;
    }
  });
}

// Usage
const userSchema = {
  name: 'string',
  age: 'number',
  isActive: 'boolean'
};

const user = createValidatedObject(userSchema);
user.name = "Alice"; // OK
user.age = 25; // OK
user.isActive = true; // OK

try {
  user.age = "twenty"; // Throws TypeError
} catch (e) {
  console.error(e.message);
}
```

### 22. Lazy Loading Images (Intersection Observer)
**Problem:** Implement a utility function that lazy loads images when they enter the viewport using Intersection Observer.

**Solution:**
```javascript
function setupLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

// HTML Usage Example:
// <img class="lazy" data-src="image.jpg" src="placeholder.jpg" alt="Description">

// Simulation for Node environment
class MockImage {
  constructor(datasetSrc) {
    this.dataset = { src: datasetSrc };
    this.src = 'placeholder.jpg';
    this.classList = { remove: () => {} };
  }
}

console.log("Lazy loading setup complete. Images will load when scrolled into view.");
```

### 23. Functional Pipeline with Error Handling
**Problem:** Create a pipeline utility that executes a series of functions asynchronously, stopping immediately if any function throws an error.

**Solution:**
```javascript
async function pipeline(initialValue, ...functions) {
  let result = initialValue;
  
  for (const fn of functions) {
    try {
      result = await fn(result);
    } catch (error) {
      console.error(`Pipeline failed at ${fn.name}: ${error.message}`);
      throw error;
    }
  }
  
  return result;
}

// Usage
const fetchUser = async (id) => {
  if (id < 0) throw new Error("Invalid ID");
  return { id, name: "User" };
};

const enrichUser = async (user) => ({ ...user, role: "admin" });
const saveUser = async (user) => ({ ...user, saved: true });

pipeline(1, fetchUser, enrichUser, saveUser)
  .then(console.log) // { id: 1, name: "User", role: "admin", saved: true }
  .catch(console.error);

pipeline(-1, fetchUser, enrichUser)
  .catch(err => console.log("Caught:", err.message)); // Caught: Invalid ID
```

### 24. WeakMap-based Private Data
**Problem:** Implement a class that uses WeakMap to store truly private data that cannot be accessed even via reflection.

**Solution:**
```javascript
const _privateData = new WeakMap();

class SecureBankAccount {
  constructor(owner, balance) {
    _privateData.set(this, {
      owner,
      balance,
      transactionHistory: []
    });
  }

  deposit(amount) {
    const data = _privateData.get(this);
    if (amount <= 0) throw new Error("Amount must be positive");
    
    data.balance += amount;
    data.transactionHistory.push({ type: 'deposit', amount, date: new Date() });
    return this;
  }

  withdraw(amount) {
    const data = _privateData.get(this);
    if (amount > data.balance) throw new Error("Insufficient funds");
    
    data.balance -= amount;
    data.transactionHistory.push({ type: 'withdrawal', amount, date: new Date() });
    return this;
  }

  getBalance() {
    return _privateData.get(this).balance;
  }

  getHistory() {
    return [..._privateData.get(this).transactionHistory]; // Return copy
  }
}

// Usage
const account = new SecureBankAccount("Alice", 1000);
account.deposit(500).withdraw(200);

console.log(account.getBalance()); // 1300
console.log(account.getHistory()); // Shows transactions

// Trying to access private data directly fails
console.log(account._privateData); // undefined
console.log(Object.keys(account)); // [] - No properties visible
```

### 25. Custom Iterator for Binary Tree
**Problem:** Implement a binary tree class with a custom iterator that performs an in-order traversal.

**Solution:**
```javascript
class TreeNode {
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
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return;
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (!current.left) {
          current.left = newNode;
          break;
        }
        current = current.left;
      } else {
        if (!current.right) {
          current.right = newNode;
          break;
        }
        current = current.right;
      }
    }
  }

  *[Symbol.iterator]() {
    const stack = [];
    let current = this.root;

    while (current || stack.length > 0) {
      while (current) {
        stack.push(current);
        current = current.left;
      }
      
      current = stack.pop();
      yield current.value;
      current = current.right;
    }
  }
}

// Usage
const bst = new BinarySearchTree();
[8, 3, 10, 1, 6, 14, 4, 7, 13].forEach(val => bst.insert(val));

console.log("In-order traversal:");
for (const value of bst) {
  console.log(value); 
  // Output: 1, 3, 4, 6, 7, 8, 10, 13, 14 (Sorted order)
}

console.log("Spread operator:", [...bst]);
```

---

## Summary

| Level | Problems | Key Concepts Covered |
|-------|----------|----------------------|
| **Beginner** | 1-8 | Strings, Arrays, Loops, Conditionals, Basic Math |
| **Intermediate** | 9-17 | Closures, Higher-Order Functions, Promises, Recursion, Design Patterns |
| **Advanced** | 18-25 | Async/Await, Generators, Proxies, WeakMaps, Iterators, Event Emitters |

These problems provide a comprehensive path from JavaScript basics to advanced architectural patterns used in modern development.
