# Frontend Oral Test Interview Preparation Guide
## 100 Questions with Answers & Code Examples (Roman Urdu Mein)

---

## **JAVASCRIPT FUNDAMENTALS (Questions 1-20)**

### Q1: JavaScript mein `var`, `let`, aur `const` mein kya farq hai?
**Answer:** 
- `var`: Function scope hota hai, hoisting hoti hai, redeclare kar sakte hain
- `let`: Block scope hota hai, hoisting nahi hoti (TDZ), redeclare nahi kar sakte
- `const`: Block scope, constant value, reassign nahi kar sakte, lekin object/array modify kar sakte hain

```javascript
// var example - function scope
function varExample() {
  if (true) {
    var x = 10; // yeh bahar bhi accessible hai
  }
  console.log(x); // 10 - chal jayega
}

// let example - block scope
function letExample() {
  if (true) {
    let y = 20; // sirf is block mein
  }
  // console.log(y); // Error: y is not defined
}

// const example - constant reference
const z = 30;
// z = 40; // Error: Assignment to constant variable

// Lekin object modify kar sakte hain
const obj = { name: "Ali" };
obj.name = "Ahmed"; // ✅ Chal jayega (reference same hai)
// obj = {}; // ❌ Error
```

### Q2: Closure kya hota hai? Example do.
**Answer:** Closure ek function ke saath uske lexical environment ka combination hota hai. Inner function outer function ke variables ko access kar sakta hai bhale hi outer function execute ho chuka ho.

```javascript
function outerFunction() {
  let count = 0; // Outer function ka variable
  
  // Inner function (closure)
  return function innerFunction() {
    count++; // Outer variable ko access kar raha hai
    return count;
  };
}

const counter = outerFunction(); // outerFunction execute ho gaya
console.log(counter()); // 1 - count abhi bhi accessible hai
console.log(counter()); // 2 - state maintain ho rahi hai
console.log(counter()); // 3

// Real use case: Data privacy
function createPrivateCounter() {
  let privateCount = 0;
  
  return {
    increment: () => ++privateCount,
    decrement: () => --privateCount,
    getCount: () => privateCount
  };
}

const myCounter = createPrivateCounter();
myCounter.increment();
myCounter.increment();
console.log(myCounter.getCount()); // 2
// privateCount directly accessible nahi hai
```

### Q3: Hoisting kya hai?
**Answer:** Hoisting mein JavaScript declarations ko code ke top par move kar deta hai execution se pehle. Sirf declarations hoist hoti hain, initializations nahi.

```javascript
// Variable hoisting
console.log(myVar); // undefined (declaration hoist hua, value nahi)
var myVar = 5;
console.log(myVar); // 5

// Equivalent to:
var myVar;
console.log(myVar); // undefined
myVar = 5;

// Function hoisting
sayHello(); // "Hello!" - pure function hoist hota hai
function sayHello() {
  console.log("Hello!");
}

// Arrow function hoisting nahi hoti
// sayHi(); // Error
const sayHi = () => console.log("Hi");
```

### Q4: `==` aur `===` mein kya farq hai?
**Answer:** 
- `==`: Loose equality, type coercion hoti hai (types convert hote hain)
- `===`: Strict equality, type coercion nahi hoti, value aur type dono check hote hain

```javascript
console.log(5 == "5");   // true (string "5" number 5 mein convert hua)
console.log(5 === "5");  // false (different types)

console.log(0 == false);   // true
console.log(0 === false);  // false

console.log(null == undefined);   // true (special case)
console.log(null === undefined);  // false

// Best practice: Always use ===
```

### Q5: Event Loop kaise kaam karta hai?
**Answer:** Event Loop call stack, Web APIs, aur callback queue ko manage karta hai. Yeh ensure karta hai ki asynchronous operations properly handle hon.

```javascript
console.log("1"); // Sync - Call Stack

setTimeout(() => {
  console.log("2"); // Async - Callback Queue
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // Microtask Queue
});

console.log("4"); // Sync - Call Stack

// Output: 1, 4, 3, 2
// Explanation:
// 1. Sync code execute hota hai (1, 4)
// 2. Microtask queue (Promises) priority pe execute hoti hai (3)
// 3. Macrotask queue (setTimeout) baad mein (2)
```

### Q6: Promise kya hota hai? States kitni hoti hain?
**Answer:** Promise asynchronous operation ka eventual completion/failure represent karta hai. 3 states: Pending, Fulfilled, Rejected.

```javascript
const myPromise = new Promise((resolve, reject) => {
  const success = true;
  
  setTimeout(() => {
    if (success) {
      resolve("Success! Data mil gaya");
    } else {
      reject("Error: Kuch galat ho gaya");
    }
  }, 1000);
});

// Consuming promise
myPromise
  .then((data) => {
    console.log(data); // Success case
  })
  .catch((error) => {
    console.error(error); // Error case
  })
  .finally(() => {
    console.log("Always executes");
  });

// Async/Await (cleaner syntax)
async function fetchData() {
  try {
    const data = await myPromise;
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

### Q7: Call, Apply, Bind mein kya farq hai?
**Answer:** Teenon `this` context set karte hain, lekin usage alag hai.

```javascript
const person = {
  firstName: "Ali",
  lastName: "Khan",
  
  getFullName: function(hobby, age) {
    return `${this.firstName} ${this.lastName} - ${hobby}, ${age} years`;
  }
};

const person2 = {
  firstName: "Ahmed",
  lastName: "Raza"
};

// call - arguments individually pass hote hain, immediately execute
console.log(person.getFullName.call(person2, "Cricket", 25));
// "Ahmed Raza - Cricket, 25 years"

// apply - arguments array mein pass hote hain, immediately execute
console.log(person.getFullName.apply(person2, ["Football", 30]));
// "Ahmed Raza - Football, 30 years"

// bind - new function return karta hai, later execute kar sakte hain
const boundFunc = person.getFullName.bind(person2, "Tennis", 28);
console.log(boundFunc()); // "Ahmed Raza - Tennis, 28 years"

// Real use case: Event listeners mein this preserve karna
class Button {
  constructor(name) {
    this.name = name;
    this.clicks = 0;
  }
  
  handleClick() {
    this.clicks++;
    console.log(`${this.name} clicked ${this.clicks} times`);
  }
}

const btn = new Button("Submit");
// document.querySelector('button').addEventListener('click', btn.handleClick.bind(btn));
```

### Q8: Map, Filter, Reduce explain karo with examples.
**Answer:** Array methods jo functional programming mein use hote hain.

```javascript
const numbers = [1, 2, 3, 4, 5, 6];

// MAP - har element ko transform karta hai, new array return
const doubled = numbers.map(num => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12]

// FILTER - condition ke basis pe elements filter karta hai
const evens = numbers.filter(num => num % 2 === 0);
console.log(evens); // [2, 4, 6]

// REDUCE - array ko single value mein reduce karta hai
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 21

// Complex example
const products = [
  { name: "Laptop", price: 1000, category: "Electronics" },
  { name: "Phone", price: 500, category: "Electronics" },
  { name: "Book", price: 20, category: "Education" }
];

// Electronics products ke names
const electronicsNames = products
  .filter(p => p.category === "Electronics")
  .map(p => p.name);
console.log(electronicsNames); // ["Laptop", "Phone"]

// Total price
const totalPrice = products.reduce((acc, p) => acc + p.price, 0);
console.log(totalPrice); // 1520
```

### Q9: Debouncing aur Throttling kya hai?
**Answer:** Performance optimization techniques jo frequent function calls ko control karti hain.

```javascript
// DEBOUNCING - Last call ke baad certain time wait karta hai
// Use case: Search input, resize events
function debounce(func, delay) {
  let timeoutId;
  
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Example: Search input
const searchInput = document.getElementById('search');
const handleSearch = (e) => {
  console.log("Searching for:", e.target.value);
  // API call yahan
};

searchInput.addEventListener('input', debounce(handleSearch, 500));
// User type karega, 500ms baad hi search hoga

// THROTTLING - Fixed interval pe function execute hota hai
// Use case: Scroll events, button clicks
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

// Example: Scroll event
const handleScroll = () => {
  console.log("Scroll position:", window.scrollY);
};

window.addEventListener('scroll', throttle(handleScroll, 1000));
// Har 1 second mein max 1 baar execute hoga
```

### Q10: Deep Copy vs Shallow Copy?
**Answer:** 
- Shallow Copy: Sirf first level copy hoti hai, nested objects references share karte hain
- Deep Copy: Pure structure ki independent copy banti hai

```javascript
// Shallow Copy
const original = {
  name: "Ali",
  address: { city: "Karachi", zip: 75500 }
};

const shallowCopy = { ...original };
shallowCopy.address.city = "Lahore";

console.log(original.address.city); // "Lahore" - Original bhi change ho gaya!

// Deep Copy methods

// Method 1: JSON parse/stringify (simple cases)
const deepCopy1 = JSON.parse(JSON.stringify(original));
deepCopy1.address.city = "Islamabad";
console.log(original.address.city); // "Lahore" - Safe!

// Method 2: structuredClone (modern browsers)
const deepCopy2 = structuredClone(original);

// Method 3: Manual recursive function
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepClone(item));
  }
  
  const cloned = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }
  return cloned;
}
```

### Q11: Closures ka practical use case batao?
**Answer:** Data privacy, currying, function factories, event handlers.

```javascript
// 1. Data Privacy (Module Pattern)
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable
  
  return {
    deposit: (amount) => {
      balance += amount;
      return balance;
    },
    withdraw: (amount) => {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance: () => balance
  };
}

const account = createBankAccount(1000);
account.deposit(500);
console.log(account.getBalance()); // 1500
// balance directly access nahi kar sakte

// 2. Currying
function multiply(a) {
  return function(b) {
    return function(c) {
      return a * b * c;
    };
  };
}

console.log(multiply(2)(3)(4)); // 24

// 3. Function Factory
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### Q12: `this` keyword kaise kaam karta hai?
**Answer:** `this` ka value depend karta hai calling context pe.

```javascript
// 1. Global context
console.log(this); // Window object (browser)

// 2. Object method
const obj = {
  name: "Ali",
  greet: function() {
    console.log(this.name); // "Ali"
  }
};
obj.greet();

// 3. Constructor function
function Person(name) {
  this.name = name;
  this.greet = function() {
    console.log(`Hello, ${this.name}`);
  };
}
const person = new Person("Ahmed");
person.greet(); // "Hello, Ahmed"

// 4. Arrow functions - lexical this
const obj2 = {
  name: "Ali",
  regularFunc: function() {
    console.log(this.name); // "Ali"
  },
  arrowFunc: () => {
    console.log(this.name); // undefined (Window ka name)
  }
};

// 5. Event listeners
class Button {
  constructor() {
    this.count = 0;
  }
  
  // Wrong - this will be button element
  handleClickWrong() {
    // document.querySelector('btn').addEventListener('click', function() {
    //   this.count++; // this = button element, not class instance
    // });
  }
  
  // Right - bind or arrow function
  handleClickRight() {
    // document.querySelector('btn').addEventListener('click', () => {
    //   this.count++; // this = class instance
    // });
  }
}
```

### Q13: IIFE kya hota hai?
**Answer:** Immediately Invoked Function Expression - define hote hi execute ho jata hai.

```javascript
// Basic IIFE
(function() {
  console.log("IIFE executed!");
})();

// With parameters
(function(name) {
  console.log(`Hello ${name}`);
})("Ali");

// Modern syntax with arrow function
(() => {
  console.log("Arrow IIFE");
})();

// Use case: Variable isolation (before let/const)
(function() {
  let privateVar = "secret";
  // privateVar sirf is scope mein accessible
})();
// console.log(privateVar); // Error

// Use case: Loop mein closure fix
for (var i = 0; i < 3; i++) {
  ((index) => {
    setTimeout(() => {
      console.log(index); // 0, 1, 2
    }, 100);
  })(i);
}
```

### Q14: Generators kya hote hain?
**Answer:** Functions jo pause aur resume ho sakte hain (`function*`).

```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().value); // undefined

// Infinite generator
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value); // 1
console.log(ids.next().value); // 2
console.log(ids.next().value); // 3

// Async generator
async function* asyncDataFetcher() {
  yield await fetch('/api/data1');
  yield await fetch('/api/data2');
  yield await fetch('/api/data3');
}
```

### Q15: Proxy aur Reflect kya hain?
**Answer:** Proxy objects ko intercept aur customize karne ke liye use hota hai.

```javascript
// Proxy example
const target = {
  name: "Ali",
  age: 25
};

const handler = {
  get: function(obj, prop) {
    console.log(`Getting ${prop}`);
    return prop in obj ? obj[prop] : "Property not found";
  },
  set: function(obj, prop, value) {
    console.log(`Setting ${prop} to ${value}`);
    if (prop === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new Error("Age must be positive number");
    }
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);
console.log(proxy.name); // "Getting name" then "Ali"
proxy.age = 30; // "Setting age to 30"
// proxy.age = -5; // Error

// Real use case: Two-way data binding, validation, logging
```

### Q16: Optional Chaining aur Nullish Coalescing?
**Answer:** Modern JavaScript features for safer code.

```javascript
const user = {
  name: "Ali",
  address: {
    city: "Karachi"
  }
};

// Optional Chaining (?.)
console.log(user.address?.city); // "Karachi"
console.log(user.address?.zip); // undefined (error nahi)
console.log(user.profile?.name); // undefined (profile exist nahi karta)

// Without optional chaining
// console.log(user.profile.name); // Error: Cannot read property of undefined

// Nullish Coalescing (??)
const defaultValue = "Guest";
const userName = user.name ?? defaultValue; // "Ali"
const userProfile = user.profile?.name ?? defaultValue; // "Guest"

// Difference from ||
const count = 0;
console.log(count || 10); // 10 (0 falsy hai)
console.log(count ?? 10); // 0 (0 valid value hai, sirf null/undefined pe default)
```

### Q17: Set aur Map kya hain?
**Answer:** Built-in data structures.

```javascript
// SET - Unique values
const uniqueNumbers = new Set([1, 2, 2, 3, 3, 4]);
console.log(uniqueNumbers); // Set(4) {1, 2, 3, 4}

uniqueNumbers.add(5);
uniqueNumbers.delete(2);
console.log(uniqueNumbers.has(3)); // true

// Convert to array
const arr = [...uniqueNumbers];

// MAP - Key-value pairs (any type keys)
const myMap = new Map();
myMap.set("name", "Ali");
myMap.set(1, "number key");
myMap.set({ id: 1 }, "object key");

console.log(myMap.get("name")); // "Ali"
console.log(myMap.size); // 3

// Iterate
myMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

// WeakSet, WeakMap - garbage collection friendly
```

### Q18: Async/Await vs Promises?
**Answer:** Async/await syntactic sugar hai promises ke upar, cleaner code.

```javascript
// Promises
function fetchData() {
  fetch('/api/users')
    .then(response => response.json())
    .then(data => {
      console.log(data);
      return fetch(`/api/users/${data.id}`);
    })
    .then(response => response.json())
    .then(userData => console.log(userData))
    .catch(error => console.error(error));
}

// Async/Await (cleaner)
async function fetchDataAsync() {
  try {
    const response = await fetch('/api/users');
    const data = await response.json();
    console.log(data);
    
    const userResponse = await fetch(`/api/users/${data.id}`);
    const userData = await userResponse.json();
    console.log(userData);
  } catch (error) {
    console.error(error);
  }
}

// Parallel execution
async function fetchAllData() {
  const [users, posts, comments] = await Promise.all([
    fetch('/api/users').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  return { users, posts, comments };
}
```

### Q19: JavaScript mein inheritance kaise implement hota hai?
**Answer:** Prototypal inheritance through prototype chain.

```javascript
// Constructor function approach
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Parent constructor call
  this.breed = breed;
}

// Inherit prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.speak = function() {
  console.log(`${this.name} barks`);
};

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // "Buddy barks"

// ES6 Classes (cleaner syntax)
class Animal2 {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog2 extends Animal2 {
  constructor(name, breed) {
    super(name); // Parent constructor
    this.breed = breed;
  }
  
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog2 = new Dog2("Max", "Labrador");
dog2.speak(); // "Max barks"
```

### Q20: Event Delegation kya hai?
**Answer:** Parent element pe event listener lagana instead of multiple children.

```javascript
// Without delegation (inefficient)
document.querySelectorAll('.item').forEach(item => {
  item.addEventListener('click', (e) => {
    console.log(e.target.textContent);
  });
});

// With delegation (efficient)
document.querySelector('.list').addEventListener('click', (e) => {
  // Check if clicked element is an item
  if (e.target.matches('.item')) {
    console.log(e.target.textContent);
  }
  
  // Or check closest parent
  const item = e.target.closest('.item');
  if (item && list.contains(item)) {
    console.log(item.textContent);
  }
});

// Benefits:
// 1. Kam memory usage
// 2. Dynamically added elements bhi work karenge
// 3. Single event listener
```

---

## **REACT JS (Questions 21-40)**

### Q21: Virtual DOM kya hai aur kaise kaam karta hai?
**Answer:** Virtual DOM ek lightweight copy hai real DOM ki. React changes pehle virtual DOM mein karta hai, phir diffing algorithm se minimum changes real DOM pe apply karta hai.

```javascript
// Process:
// 1. State change hoti hai
// 2. Naya Virtual DOM banta hai
// 3. Diffing algorithm old vs new compare karta hai
// 4. Sirf changed parts real DOM pe update hote hain (Reconciliation)

// Example
function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

// Jab count change hota hai:
// 1. React naya VDOM banata hai
// 2. Compare karta hai: sirf <p> tag ka content change hua
// 3. Sirf text node update hota hai, pura div re-render nahi
```

### Q22: State aur Props mein kya farq hai?
**Answer:** 
- State: Component ke andar manage hoti hai, mutable
- Props: Parent se pass hoti hain, immutable (read-only)

```jsx
// STATE - Internal data
function Counter() {
  const [count, setCount] = useState(0); // State
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}

// PROPS - External data
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>; // Props read-only
}

function App() {
  return (
    <>
      <Welcome name="Ali" />
      <Welcome name="Ahmed" />
    </>
  );
}

// State se props bhejna
function Parent() {
  const [user, setUser] = useState({ name: "Ali" });
  
  return <Child userData={user} />; // State ko props bana ke bheja
}

function Child({ userData }) {
  // userData.name = "New"; // ❌ Error: Can't assign to read-only
  return <div>{userData.name}</div>;
}
```

### Q23: useEffect hook kab use hota hai?
**Answer:** Side effects ke liye (API calls, subscriptions, DOM manipulation).

```jsx
import { useEffect, useState } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  
  // Component mount hone pe execute (dependency array empty)
  useEffect(() => {
    console.log("Component mounted");
    
    return () => {
      console.log("Component unmounted"); // Cleanup
    };
  }, []);
  
  // Dependency change hone pe execute
  useEffect(() => {
    fetchUser(userId);
    
    // Cleanup previous request
    return () => {
      // Abort previous fetch
    };
  }, [userId]); // userId change hone pe run hoga
  
  // Har render pe execute (no dependency array)
  useEffect(() => {
    console.log("Component rendered");
  });
  
  return <div>{user?.name}</div>;
}

// Common patterns:
// 1. API call on mount
// 2. Subscribe/unsubscribe events
// 3. Update document title
// 4. Setup/cleanup timers
```

### Q24: useMemo aur useCallback mein kya farq hai?
**Answer:** 
- useMemo: Expensive calculations ko cache karta hai
- useCallback: Functions ko memoize karta hai (referential equality)

```jsx
import { useMemo, useCallback, useState } from 'react';

function ExpensiveComponent({ items, filter }) {
  const [count, setCount] = useState(0);
  
  // Expensive calculation - sirf items/filter change pe recalculate
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    return items.filter(item => item.category === filter);
  }, [items, filter]);
  
  // Function memoization - referential equality maintain
  const handleClick = useCallback(() => {
    console.log("Clicked!", count);
  }, [count]); // count change hone pe naya function
  
  // Without useCallback, har render pe naya function banta
  // Child components unnecessarily re-render hote
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      <ItemList items={filteredItems} onItemClick={handleClick} />
    </div>
  );
}

// When to use:
// useMemo: Heavy calculations, derived state
// useCallback: Passing functions to optimized child components
```

### Q25: Custom Hooks kaise banate hain?
**Answer:** Reusable logic extract karne ke liye custom hooks banate hain.

```jsx
// Custom Hook: useFetch
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function UserProfile() {
  const { data: user, loading, error } = useFetch('/api/user/1');
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return <div>{user.name}</div>;
}

// Another custom hook: useLocalStorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  
  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };
  
  return [storedValue, setValue];
}

// Usage
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Toggle {theme}
    </button>
  );
}
```

### Q26: Context API kaise kaam karta hai?
**Answer:** Global state management without prop drilling.

```jsx
// 1. Context create karna
const ThemeContext = React.createContext();

// 2. Provider wrap karna
function App() {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consumer (Class component)
class ThemedButton extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme, setTheme }) => (
          <button className={theme}>
            Current theme: {theme}
          </button>
        )}
      </ThemeContext.Consumer>
    );
  }
}

// 4. useContext Hook (Functional component)
function Toolbar() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

// Multiple contexts
const UserContext = React.createContext();
const SettingsContext = React.createContext();

function App() {
  return (
    <UserContext.Provider value={user}>
      <SettingsContext.Provider value={settings}>
        <Profile />
      </SettingsContext.Provider>
    </UserContext.Provider>
  );
}
```

### Q27: React.memo kya hai?
**Answer:** Component ko memoize karta hai, sirf props change hone pe re-render hota hai.

```jsx
// Without React.memo - har parent render pe child bhi render
function Child({ value }) {
  console.log("Child rendered");
  return <div>{value}</div>;
}

function Parent() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={text} onChange={e => setText(e.target.value)} />
      <Child value={text} /> {/* Har baar render hoga */}
    </div>
  );
}

// With React.memo - sirf props change pe render
const MemoizedChild = React.memo(({ value }) => {
  console.log("Child rendered");
  return <div>{value}</div>;
});

function ParentOptimized() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Count: {count}</button>
      <input value={text} onChange={e => setText(e.target.value)} />
      <MemoizedChild value={text} /> {/* Sirf text change pe render */}
    </div>
  );
}

// Custom comparison function
const MemoWithCompare = React.memo(Component, (prevProps, nextProps) => {
  // Return true if props are equal (skip re-render)
  return prevProps.value === nextProps.value;
});
```

### Q28: useRef kab use karte hain?
**Answer:** DOM access, mutable values jo re-render trigger na karein.

```jsx
import { useRef, useEffect, useState } from 'react';

function MyComponent() {
  // 1. DOM Element access
  const inputRef = useRef(null);
  
  // 2. Mutable value without re-render
  const renderCount = useRef(0);
  
  // 3. Store previous value
  const prevValueRef = useRef();
  const [value, setValue] = useState(0);
  
  useEffect(() => {
    prevValueRef.current = value;
  });
  
  // Focus input on mount
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  
  renderCount.current++;
  
  return (
    <div>
      <input ref={inputRef} type="text" />
      <p>Render count: {renderCount.current}</p>
      <p>Current: {value}, Previous: {prevValueRef.current}</p>
      <button onClick={() => setValue(value + 1)}>Increment</button>
    </div>
  );
}

// setInterval cleanup with useRef
function Timer() {
  const intervalRef = useRef();
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      console.log("Tick");
    }, 1000);
    
    return () => clearInterval(intervalRef.current);
  }, []);
  
  return null;
}
```

### Q29: Higher Order Components (HOC) kya hain?
**Answer:** Function jo component leta hai aur enhanced component return karta hai.

```jsx
// HOC: Loading wrapper
function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// Usage
function UserData({ user }) {
  return <div>{user.name}</div>;
}

const UserDataWithLoading = withLoading(UserData);

// App mein
<UserDataWithLoading isLoading={true} user={userData} />

// HOC: Authentication
function withAuth(WrappedComponent) {
  return function AuthComponent(props) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <WrappedComponent {...props} />;
  };
}

// Multiple HOCs
const EnhancedComponent = withAuth(withLoading(MyComponent));

// Note: Hooks ne HOCs ko mostly replace kar diya hai
```

### Q30: Render Props pattern kya hai?
**Answer:** Function as a prop pass karna for code sharing.

```jsx
// Render Prop Component
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
        {/* OR */}
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Usage 1: render prop
<MouseTracker render={({ x, y }) => (
  <h1>Mouse position: {x}, {y}</h1>
)} />

// Usage 2: children as function
<MouseTracker>
  {({ x, y }) => (
    <h1>Mouse position: {x}, {y}</h1>
  )}
</MouseTracker>

// Functional version with Hooks (better)
function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);
  
  return position;
}

// Usage
function MouseDisplay() {
  const { x, y } = useMousePosition();
  return <h1>Mouse: {x}, {y}</h1>;
}
```

### Q31: Error Boundaries kya hain?
**Answer:** Class components jo child components ke errors catch karte hain.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    // Update state so next render shows fallback UI
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Log error to error reporting service
    console.error("Error caught:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Something went wrong.</h1>
          <p>{this.state.error?.toString()}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
<ErrorBoundary fallback={<div>Error!</div>}>
  <ProblematicComponent />
</ErrorBoundary>

// Note: Functional components mein error boundaries nahi ban sakte
// Libraries: react-error-boundary
```

### Q32: Portals kya hain?
**Answer:** Children ko DOM ke different part mein render karna.

```jsx
import { createPortal } from 'react-dom';

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button onClick={onClose}>Close</button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Different DOM node
  );
}

// Usage
function App() {
  const [showModal, setShowModal] = useState(false);
  
  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <h2>Modal Content</h2>
        <p>This is rendered outside the main app div!</p>
      </Modal>
    </div>
  );
}

// Use cases: Modals, Tooltips, Dropdowns, Notifications
```

### Q33: ForwardRef kya hai?
**Answer:** Parent se child component tak ref forward karna.

```jsx
import { forwardRef, useRef, useImperativeHandle } from 'react';

// Functional component accepting ref
const FancyInput = forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

// Custom methods expose karna
const FancyInputWithMethods = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    clear: () => {
      inputRef.current.value = '';
    }
  }));
  
  return <input ref={inputRef} {...props} />;
});

// Usage
function Form() {
  const inputRef = useRef();
  
  const handleSubmit = () => {
    inputRef.current.focus();
    inputRef.current.clear();
  };
  
  return (
    <div>
      <FancyInputWithMethods ref={inputRef} />
      <button onClick={handleSubmit}>Focus & Clear</button>
    </div>
  );
}
```

### Q34: React Fiber Architecture kya hai?
**Answer:** New reconciliation engine jo rendering ko prioritize aur interrupt kar sakta hai.

```javascript
// Key features:
// 1. Incremental Rendering - Break tasks into chunks
// 2. Priority-based Updates - Urgent updates pehle
// 3. Concurrency - Multiple versions of UI maintain kar sakta hai

// Example: Concurrent features
import { startTransition, useTransition } from 'react';

function SearchResults() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Non-urgent update transition mein wrap
    startTransition(() => {
      const filtered = expensiveFilter(value);
      setResults(filtered);
    });
  };
  
  return (
    <div>
      <input value={query} onChange={handleChange} />
      {isPending && <Spinner />}
      {results.map(item => <Item key={item.id} item={item} />)}
    </div>
  );
}

// Suspense for data fetching
<Suspense fallback={<Spinner />}>
  <ProfileDetails />
</Suspense>
```

### Q35: Controlled vs Uncontrolled Components?
**Answer:** 
- Controlled: Form data React state se manage hota hai
- Uncontrolled: Form data DOM se manage hota hai (refs use)

```jsx
// CONTROLLED Component
function ControlledForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// UNCONTROLLED Component
function UncontrolledForm() {
  const nameRef = useRef();
  const emailRef = useRef();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      name: nameRef.current.value,
      email: emailRef.current.value
    });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="name" ref={nameRef} defaultValue="" />
      <input name="email" ref={emailRef} defaultValue="" />
      <button type="submit">Submit</button>
    </form>
  );
}

// When to use:
// Controlled: Validation, conditional disabling, instant feedback
// Uncontrolled: Simple forms, file inputs, integrating with non-React libraries
```

### Q36: useReducer kab use karte hain?
**Answer:** Complex state logic ke liye, multiple sub-values ya next state depends on previous.

```jsx
const initialState = {
  users: [],
  loading: false,
  error: null,
  selectedUser: null
};

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        users: action.payload,
        error: null 
      };
    
    case 'FETCH_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
    
    case 'SELECT_USER':
      return { 
        ...state, 
        selectedUser: action.payload 
      };
    
    default:
      return state;
  }
}

function UserList() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  useEffect(() => {
    dispatch({ type: 'FETCH_START' });
    
    fetch('/api/users')
      .then(res => res.json())
      .then(data => 
        dispatch({ type: 'FETCH_SUCCESS', payload: data })
      )
      .catch(err => 
        dispatch({ type: 'FETCH_ERROR', payload: err.message })
      );
  }, []);
  
  if (state.loading) return <div>Loading...</div>;
  if (state.error) return <div>Error: {state.error}</div>;
  
  return (
    <div>
      {state.users.map(user => (
        <div key={user.id} onClick={() => 
          dispatch({ type: 'SELECT_USER', payload: user })
        }>
          {user.name}
        </div>
      ))}
      {state.selectedUser && (
        <div>Selected: {state.selectedUser.name}</div>
      )}
    </div>
  );
}

// When to use:
// - Complex state with multiple sub-values
// - Next state depends on previous
// - State transitions are complex
```

### Q37: React.StrictMode kya hai?
**Answer:** Development tool jo potential problems highlight karta hai.

```jsx
import { StrictMode } from 'react';

function App() {
  return (
    <StrictMode>
      <div>
        <Header />
        <Main />
        <Footer />
      </div>
    </StrictMode>
  );
}

// What it does:
// 1. Identifies unsafe lifecycles
// 2. Warns about legacy string refs
// 3. Warns about deprecated findDOMNode
// 4. Detects side effects in render
// 5. Detects legacy context API
// 6. Double-invokes components in development (find bugs)

// Production mein koi effect nahi, sirf dev mode mein warnings
```

### Q38: Code Splitting kaise karte hain?
**Answer:** Lazy loading se bundles ko split karna.

```jsx
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

// Dynamic imports with conditions
function ConditionalComponent({ showHeavy }) {
  const [HeavyComponent, setHeavyComponent] = useState(null);
  
  useEffect(() => {
    if (showHeavy) {
      import('./HeavyComponent').then(module => {
        setHeavyComponent(() => module.default);
      });
    }
  }, [showHeavy]);
  
  if (!HeavyComponent) return <div>Loading...</div>;
  return <HeavyComponent />;
}
```

### Q39: Server-Side Rendering (SSR) vs Client-Side Rendering (CSR)?
**Answer:** 
- SSR: Server pe HTML generate hota hai, SEO friendly
- CSR: Browser pe JavaScript se render hota hai

```jsx
// CSR (Create React App)
// Initial HTML: <div id="root"></div>
// Browser downloads JS, then renders content
// Pros: Fast interactions after load
// Cons: Slow initial load, SEO issues

// SSR (Next.js)
// Server sends complete HTML
// Faster first paint, better SEO
// Cons: More server load

// Next.js example
// pages/index.js
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data } };
}

export default function Home({ data }) {
  return <div>{data.title}</div>;
}

// Static Site Generation (SSG)
export async function getStaticProps() {
  const data = await fetchData();
  return { props: { data }, revalidate: 60 }; // ISR
}

// Client-side data fetching (CSR in Next.js)
function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);
  return <div>{data?.name}</div>;
}
```

### Q40: React 18 ke new features?
**Answer:** Concurrent features, automatic batching, transitions.

```jsx
import { 
  useTransition, 
  useDeferredValue, 
  useSyncExternalStore,
  useId,
  startTransition 
} from 'react';
import { createRoot } from 'react-dom/client';

// 1. Automatic Batching
// React 18: Multiple state updates batch hote hain even in promises, timeouts
setTimeout(() => {
  setCount(c => c + 1);
  setFlag(f => !f);
  // Single re-render (React 18)
  // Multiple re-renders (React 17)
});

// 2. Transitions
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState('home');
  
  const selectTab = (newTab) => {
    startTransition(() => {
      setTab(newTab); // Non-urgent update
    });
  };
  
  return (
    <>
      <button onClick={() => selectTab('home')}>Home</button>
      {isPending && <Spinner />}
      <TabContent tab={tab} />
    </>
  );
}

// 3. useDeferredValue
function SearchPage() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  
  const results = useMemo(() => {
    return expensiveSearch(deferredQuery);
  }, [deferredQuery]);
  
  return (
    <>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      {query !== deferredQuery && <div>Updating...</div>}
      <Results data={results} />
    </>
  );
}

// 4. useId - Unique IDs for accessibility
function Form() {
  const id = useId();
  
  return (
    <>
      <label htmlFor={`${id}-name`}>Name</label>
      <input id={`${id}-name`} />
      
      <label htmlFor={`${id}-email`}>Email</label>
      <input id={`${id}-email`} />
    </>
  );
}

// 5. createRoot (new root API)
const root = createRoot(document.getElementById('root'));
root.render(<App />);
```

---

## **NEXT.JS (Questions 41-55)**

### Q41: Next.js kya hai aur iske key features kya hain?
**Answer:** Next.js React ka framework hai jo production-ready features provide karta hai.

```javascript
// Key Features:
// 1. File-based Routing
// 2. Server-Side Rendering (SSR)
// 3. Static Site Generation (SSG)
// 4. API Routes
// 5. Image Optimization
// 6. Automatic Code Splitting
// 7. TypeScript Support
// 8. Fast Refresh

// Folder structure (App Router - Next.js 13+)
/*
app/
  layout.tsx      // Root layout
  page.tsx        // Home page
  about/
    page.tsx      // /about route
  blog/
    [slug]/
      page.tsx    // Dynamic route: /blog/:slug
  api/
    users/
      route.ts    // API endpoint: /api/users
*/
```

### Q42: Pages Router vs App Router mein kya farq hai?
**Answer:** Next.js 13+ mein naya App Router introduce hua hai.

```jsx
// PAGES ROUTER (pages/)
// pages/index.js
export default function Home() {
  return <h1>Home</h1>;
}

// pages/about.js
export default function About() {
  return <h1>About</h1>;
}

// Data fetching methods
export async function getStaticProps() { }  // SSG
export async function getServerSideProps() { }  // SSR
export async function getStaticPaths() { }  // Dynamic SSG

// APP ROUTER (app/)
// app/page.tsx
export default function Home() {
  return <h1>Home</h1>;
}

// Data fetching directly in component (Server Component by default)
async function HomePage() {
  const data = await fetch('https://api.example.com/data', {
    cache: 'force-cache'  // SSG
    // next: { revalidate: 60 }  // ISR
  });
  
  return <div>{/* render data */}</div>;
}

// Key differences:
// 1. Server Components by default in App Router
// 2. Layouts nested ho sakte hain
// 3. Loading/Error UI built-in
// 4. Better caching strategies
```

### Q43: Server Components vs Client Components?
**Answer:** 
- Server Components: Server pe render, no interactivity, direct DB access
- Client Components: Browser pe render, hooks use kar sakte hain, interactivity

```jsx
// SERVER COMPONENT (Default in App Router)
// app/page.tsx
async function ProductPage({ params }) {
  // Direct database query (server pe)
  const product = await db.product.findUnique({
    where: { id: params.id }
  });
  
  // No useState, useEffect, etc. allowed
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      {/* Client Component import kar sakte hain */}
      <AddToCart product={product} />
    </div>
  );
}

// CLIENT COMPONENT
// components/AddToCart.tsx
'use client';  // Must be at top

import { useState } from 'react';

export default function AddToCart({ product }) {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    // Browser APIs use kar sakte hain
    localStorage.setItem('cart', JSON.stringify(product));
  };
  
  return (
    <button onClick={handleAddToCart}>
      Add {quantity} to cart
    </button>
  );
}

// When to use:
// Server: Data fetching, SEO, Security, Bundle size kam
// Client: Interactivity, State, Effects, Browser APIs
```

### Q44: Next.js mein routing kaise kaam karti hai?
**Answer:** File-system based routing.

```jsx
// File structure defines routes
/*
app/
  page.tsx              -> /
  about/
    page.tsx            -> /about
  blog/
    page.tsx            -> /blog
    [slug]/
      page.tsx          -> /blog/:slug (dynamic)
    [...category]/
      page.tsx          -> /blog/a/b/c (catch-all)
    [[...category]]/
      page.tsx          -> Optional catch-all
  dashboard/
    @modal/
      (.)post/
        page.tsx        -> Parallel route
  @sidebar/
    default.tsx         -> Slot for layout
*/

// Dynamic route example
// app/blog/[slug]/page.tsx
export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  
  return <article>{post.content}</article>;
}

// Generate static paths
export async function generateStaticParams() {
  const posts = await getAllPosts();
  
  return posts.map(post => ({
    slug: post.slug
  }));
}

// Linking
import Link from 'next/link';

<Link href="/blog/my-post">Read More</Link>
<Link href={{ pathname: '/blog/[slug]', query: { slug: 'my-post' } }}>
  Read More
</Link>
```

### Q45: getStaticProps, getServerSideProps, getStaticPaths explain karo.
**Answer:** Data fetching methods in Pages Router.

```jsx
// getStaticProps - Build time pe data fetch (SSG)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/posts');
  const posts = await res.json();
  
  return {
    props: { posts },
    revalidate: 60  // ISR: Re-generate every 60 seconds
  };
}

// getServerSideProps - Har request pe server pe fetch (SSR)
export async function getServerSideProps(context) {
  const { req, res, query, params } = context;
  
  // Check authentication
  const token = req.cookies.token;
  if (!token) {
    return { redirect: { destination: '/login', permanent: false } };
  }
  
  const data = await fetchData(token);
  
  return { props: { data } };
}

// getStaticPaths - Dynamic routes ke liye
export async function getStaticPaths() {
  const posts = await getAllPosts();
  
  return {
    paths: posts.map(post => ({
      params: { slug: post.slug }
    })),
    fallback: false  // true, false, or 'blocking'
  };
}

// Fallback options:
// false: 404 for missing paths
// true: Show loading, then generate page
// blocking: Wait on server, then serve generated page
```

### Q46: Next.js API Routes kaise banate hain?
**Answer:** Backend API endpoints banana without separate server.

```typescript
// Pages Router: pages/api/users.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ users: [] });
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    // Save to database
    res.status(201).json({ id: 1, name, email });
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

// App Router: app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  return NextResponse.json({ users: [], query });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  // Validate and save
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function PUT(request: NextRequest) {
  // Update logic
}

export async function DELETE(request: NextRequest) {
  // Delete logic
}

// Dynamic API routes
// app/api/users/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Fetch user by id
}
```

### Q47: Image Optimization in Next.js?
**Answer:** Built-in image optimization with next/image.

```jsx
import Image from 'next/image';

// Basic usage
<Image
  src="/profile.jpg"
  alt="Profile picture"
  width={300}
  height={300}
  priority  // LCP image ke liye
/>

// Remote images
<Image
  src="https://example.com/image.jpg"
  alt="Remote image"
  width={500}
  height={300}
  quality={75}  // 1-100
/>

// next.config.mjs
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080],
    imageSizes: [16, 32, 48, 64]
  }
};

// Fill container (responsive)
<div style={{ position: 'relative', width: '100%', height: '300px' }}>
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    sizes="(max-width: 768px) 100vw, 50vw"
    style={{ objectFit: 'cover' }}
  />
</div>

// Benefits:
// 1. Automatic format conversion (WebP, AVIF)
// 2. Responsive images
// 3. Lazy loading by default
// 4. Blur placeholder
// 5. Prevent layout shift
```

### Q48: Middleware in Next.js?
**Answer:** Request se pehle execute hone wala code.

```typescript
// middleware.ts (root pe)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  // Authentication check
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Locale detection
  const locale = request.headers.get('accept-language')?.split(',')[0];
  const response = NextResponse.next();
  response.headers.set('x-locale', locale || 'en');
  
  return response;
}

// Config - kahan run hoga
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/api/:path*',
    '/((?!_next/static|_next/image|favicon.ico).*)'
  ]
};

// Use cases:
// 1. Authentication/Authorization
// 2. Redirects
// 3. Rewrites
// 4. Headers modification
// 5. A/B testing
// 6. Bot protection
// 7. Geo-location based content
```

### Q49: Incremental Static Regeneration (ISR)?
**Answer:** Static pages ko background mein update karna.

```jsx
// Pages Router
export async function getStaticProps() {
  return {
    props: { data },
    revalidate: 60  // 60 seconds baad re-generate
  };
}

// App Router
async function Page() {
  const data = await fetch('https://api.example.com/data', {
    next: { revalidate: 60 }  // ISR
  });
  
  return <div>{/* render */}</div>;
}

// On-demand revalidation
// app/api/revalidate/route.ts
export async function POST(request: NextRequest) {
  const secret = request.headers.get('x-secret-key');
  
  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: 'Invalid' }, { status: 401 });
  }
  
  // Revalidate specific path
  revalidatePath('/blog');
  revalidatePath('/blog/my-post', 'page');
  
  // Revalidate tag
  revalidateTag('products');
  
  return NextResponse.json({ revalidated: true });
}

// Usage with tags
async function Products() {
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] }
  });
  
  return <div>{/* render */}</div>;
}

// Trigger revalidation when product updates
await fetch('http://localhost:3000/api/revalidate', {
  method: 'POST',
  headers: { 'x-secret-key': process.env.REVALIDATION_SECRET },
  body: JSON.stringify({ tag: 'products' })
});
```

### Q50: Next.js mein authentication kaise implement karte hain?
**Answer:** Multiple approaches available.

```jsx
// Approach 1: NextAuth.js (now Auth.js)
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await validateUser(credentials);
        if (user) return user;
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    }
  }
});

export { handler as GET, handler as POST };

// Client side
import { signIn, signOut, useSession } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  
  if (session) {
    return (
      <button onClick={() => signOut()}>
        Signed in as {session.user.name}
      </button>
    );
  }
  
  return <button onClick={() => signIn()}>Sign In</button>;
}

// Approach 2: Custom JWT with cookies
// app/login/page.tsx
'use client';

async function handleLogin(e) {
  e.preventDefault();
  
  const res = await fetch('/api/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  
  if (res.ok) {
    router.push('/dashboard');
    router.refresh(); // Refresh server components
  }
}

// Server Component mein check
async function Dashboard() {
  const session = await getSession(); // From cookies
  
  if (!session) {
    redirect('/login');
  }
  
  return <div>Protected content</div>;
}
```

### Q51: Layouts aur Templates mein kya farq hai?
**Answer:** Dono reusable UI ke liye hain, lekin behavior alag hai.

```jsx
// LAYOUTS - Preserve state, persistent across navigation
// app/dashboard/layout.tsx
export default function DashboardLayout({ children }) {
  // State maintain rehta hai navigation pe
  const [count, setCount] = useState(0);
  
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <main>{children}</main>
      {/* count value remain same when navigating between dashboard pages */}
    </div>
  );
}

// TEMPLATES - Re-mount on navigation, fresh state
// app/dashboard/template.tsx
export default function DashboardTemplate({ children }) {
  // Har navigation pe naya instance
  const [count, setCount] = useState(0);
  
  return (
    <div className="dashboard-template">
      {children}
      {/* count reset hota hai har navigation pe */}
    </div>
  );
}

// Layout files:
// layout.tsx   - Persistent (default)
// template.tsx - Re-mounted

// Use layouts for: Navigation, Sidebars, Persistent state
// Use templates for: Page transitions animations, Fresh state needed
```

### Q52: Loading aur Error boundaries in App Router?
**Answer:** Built-in support for loading states and errors.

```jsx
// loading.tsx - Automatic loading UI
// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <div className="spinner">
      Loading dashboard...
    </div>
  );
}

// Automatically shown when:
// 1. Navigating between routes
// 2. Waiting for data in Server Components

// error.tsx - Error boundary
// app/dashboard/error.tsx
'use client';

import { useEffect } from 'react';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}

// global-error.tsx - Root level error
// app/global-error.tsx
export default function GlobalError({ error, reset }) {
  return (
    <html>
      <body>
        <h2>Global error!</h2>
        <button onClick={reset}>Retry</button>
      </body>
    </html>
  );
}

// not-found.tsx - 404 page
// app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <Link href="/">Go Home</Link>
    </div>
  );
}

// In page component
import { notFound } from 'next/navigation';

async function PostPage({ params }) {
  const post = await getPost(params.slug);
  
  if (!post) {
    notFound(); // Shows not-found.tsx
  }
  
  return <div>{post.content}</div>;
}
```

### Q53: Next.js caching strategies?
**Answer:** Multiple caching levels.

```jsx
// Fetch cache options
fetch(url, { cache: 'force-cache' })     // Default, cache karo
fetch(url, { cache: 'no-store' })        // Never cache (dynamic)
fetch(url, { next: { revalidate: 60 } }) // ISR: 60 seconds
fetch(url, { next: { revalidate: false } }) // Never revalidate
fetch(url, { next: { tags: ['posts'] } }) // Tag-based caching

// Full example
async function BlogPage() {
  // Static caching
  const posts = await fetch('https://api.example.com/posts', {
    cache: 'force-cache'
  });
  
  // Dynamic (no cache)
  const user = await fetch('https://api.example.com/user', {
    cache: 'no-store'
  });
  
  // ISR
  const comments = await fetch('https://api.example.com/comments', {
    next: { revalidate: 30 }
  });
  
  // Tag-based (can revalidate on demand)
  const products = await fetch('https://api.example.com/products', {
    next: { tags: ['products'] }
  });
  
  return <div>{/* render */}</div>;
}

// Cache manipulation
'use server';

async function updateProduct(data) {
  await db.product.update(data);
  
  // Revalidate cache
  revalidatePath('/products');
  revalidateTag('products');
}
```

### Q54: Server Actions kya hain?
**Answer:** Server-side functions jo directly forms se call ho sakti hain.

```tsx
// app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  // Validation
  if (!title || !content) {
    return { error: 'Missing fields' };
  }
  
  // Database operation
  await db.post.create({ title, content });
  
  // Revalidate and redirect
  revalidatePath('/blog');
  redirect('/blog');
}

export async function deletePost(id: string) {
  'use server';  // Individual function mein bhi declare kar sakte
  
  await db.post.delete(id);
  revalidatePath('/blog');
}

// Form mein usage
// app/blog/new/page.tsx
import { createPost } from '@/app/actions';

export default function NewPostPage() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}

// Progressive enhancement with useFormStatus
'use client';

import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Post'}
    </button>
  );
}

// Optimistic updates
'use client';

import { useOptimistic } from 'react';
import { addComment } from './actions';

function CommentSection({ comments }) {
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (state, newComment) => [...state, newComment]
  );
  
  async function handleSubmit(formData) {
    const comment = formData.get('comment');
    
    addOptimisticComment({ text: comment, id: Date.now() });
    
    await addComment(formData);
  }
  
  return (
    <form action={handleSubmit}>
      {optimisticComments.map(c => <div key={c.id}>{c.text}</div>)}
    </form>
  );
}
```

### Q55: Next.js performance optimization techniques?
**Answer:** Multiple strategies for better performance.

```jsx
// 1. Dynamic Imports (Code splitting)
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <Spinner />,
  ssr: false  // Only on client
});

// 2. Font Optimization
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Layout({ children }) {
  return <div className={inter.className}>{children}</div>;
}

// 3. Script Optimization
import Script from 'next/script';

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"  // after page load
/>

<Script strategy="worker">
  {`console.log('Runs in web worker')`}
</Script>

// 4. Metadata API (SEO)
export const metadata = {
  title: 'My App',
  description: 'Description',
  openGraph: {
    title: 'OG Title',
    images: ['/og-image.jpg']
  },
  twitter: {
    card: 'summary_large_image'
  }
};

// 5. Viewport configuration
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#ffffff'
};

// 6. Partial Prerendering (Experimental)
// Shell static, content dynamic

// 7. Turbopack (faster builds)
// next dev --turbo

// 8. Analyze bundle
// @next/bundle-analyzer
```

---

## **TANSTACK QUERY (REACT QUERY) (Questions 56-65)**

### Q56: TanStack Query kya hai aur kyun use karte hain?
**Answer:** Server state management ke liye library, caching aur background updates provide karti hai.

```javascript
// Problems it solves:
// 1. Caching deduplication
// 2. Background refetching
// 3. Stale-while-revalidate
// 4. Retry logic
// 5. Pagination
// 6. Infinite scroll
// 7. Mutations with invalidation
// 8. DevTools

// Installation
npm install @tanstack/react-query

// Setup
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,  // 5 minutes
      retry: 3,
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
    </QueryClientProvider>
  );
}
```

### Q57: useQuery hook kaise kaam karta hai?
**Answer:** Data fetching ke liye primary hook.

```tsx
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const {
    data,           // Fetched data
    isLoading,      // First fetch loading
    isError,        // Error occurred
    error,          // Error object
    isFetching,     // Any fetch (including background)
    isSuccess,      // Successfully fetched
    refetch,        // Manual refetch function
    dataUpdatedAt,  // Last update timestamp
    fetchStatus     // 'fetching' | 'paused' | 'idle'
  } = useQuery({
    queryKey: ['user', userId],  // Unique key
    queryFn: async () => {
      const response = await fetch(`/api/users/${userId}`);
      if (!response.ok) throw new Error('Failed');
      return response.json();
    },
    staleTime: 5 * 60 * 1000,    // Data kitni der fresh hai
    gcTime: 10 * 60 * 1000,      // Cache retention (formerly cacheTime)
    retry: 3,                    // Retry attempts
    retryDelay: 1000,            // Delay between retries
    enabled: !!userId,           // Conditional fetch
    refetchOnWindowFocus: false, // Disable auto refocus
    select: (data) => data.user  // Transform data
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;
  
  return <div>Hello {data.name}</div>;
}

// Query keys best practices:
['posts']                    // All posts
['posts', 1]                 // Specific post
['posts', 1, 'comments']     // Post comments
['posts', { id: 1, filter: 'active' }]  // With params
```

### Q58: useMutation kaise use karte hain?
**Answer:** Create, update, delete operations ke liye.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreatePost() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(newPost)
      });
      return response.json();
    },
    
    // Variables ko persist karne ke liye
    onMutate: async (newPost) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      
      // Snapshot previous value
      const previousPosts = queryClient.getQueryData(['posts']);
      
      // Optimistically update
      queryClient.setQueryData(['posts'], (old) => [...old, newPost]);
      
      return { previousPosts };
    },
    
    // Success pe kya karein
    onSuccess: (data) => {
      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      
      // Or update specific query
      queryClient.setQueryData(['posts'], (old) => [...old, data]);
    },
    
    // Error pe rollback
    onError: (err, variables, context) => {
      queryClient.setQueryData(['posts'], context.previousPosts);
    },
    
    // Always runs
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    }
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ title: 'New Post', content: '...' });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <button disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create'}
      </button>
      {mutation.isError && <span>Error: {mutation.error.message}</span>}
    </form>
  );
}

// Mutation variables
mutation.mutate({ id: 1, title: 'Updated' });
mutation.mutateAsync({ id: 1 }).then(...).catch(...);

// Reset mutation
mutation.reset();
```

### Q59: Query Invalidation kab aur kaise karte hain?
**Answer:** Jab data change ho jaye aur cache update karna ho.

```tsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function EditPost({ postId }) {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      return fetch(`/api/posts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify(updatedData)
      }).then(res => res.json());
    },
    onSuccess: () => {
      // Invalidate specific query
      queryClient.invalidateQueries({ 
        queryKey: ['posts', postId] 
      });
      
      // Invalidate all posts queries
      queryClient.invalidateQueries({ 
        queryKey: ['posts'] 
      });
      
      // Invalidate with predicate
      queryClient.invalidateQueries({
        predicate: (query) => 
          query.queryKey[0] === 'posts' && 
          query.state.data?.author === 'me'
      });
      
      // Refetch immediately
      queryClient.refetchQueries({ 
        queryKey: ['posts', postId],
        exact: true 
      });
    }
  });
  
  return <button onClick={() => mutation.mutate({ title: 'New' })}>Update</button>;
}

// Manual invalidation
function RefreshButton() {
  const queryClient = useQueryClient();
  
  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['users'] });
    // Or refetch immediately
    await queryClient.refetchQueries({ queryKey: ['users'] });
  };
  
  return <button onClick={handleRefresh}>Refresh</button>;
}

// Invalidating after mutation
const mutation = useMutation({
  mutationFn: createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
  }
});
```

### Q60: Infinite Queries kaise implement karte hain?
**Answer:** Pagination aur infinite scroll ke liye.

```tsx
import { useInfiniteQuery } from '@tanstack/react-query';

function InfinitePosts() {
  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isRefetching
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await fetch(`/api/posts?page=${pageParam}&limit=10`);
      return response.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      // Return next page number or undefined if no more pages
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      return firstPage.page > 1 ? firstPage.page - 1 : undefined;
    }
  });
  
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  
  return (
    <div>
      {data.pages.map((page, i) => (
        <div key={i}>
          {page.posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ))}
      
      <button
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
      >
        {isFetchingNextPage ? 'Loading more...' : 'Load More'}
      </button>
    </div>
  );
}

// Flat list mein convert
const allPosts = data?.pages.flatMap(page => page.posts) ?? [];

// Prefetch next page
queryClient.prefetchInfiniteQuery({
  queryKey: ['posts'],
  queryFn: ...,
  getNextPageParam: ...
});
```

### Q61: QueryClient configuration options?
**Answer:** Global settings configure karna.

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,      // 5 minutes fresh
      gcTime: 1000 * 60 * 10,        // 10 minutes cache retention
      retry: 3,                       // Retry failed requests 3 times
      retryDelay: (attemptIndex) => 
        Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
      refetchOnWindowFocus: false,   // Disable focus refetch
      refetchOnReconnect: true,      // Refetch on reconnect
      refetchOnMount: 'always',      // always | never | if-stale
      networkMode: 'online',         // online | offlineFirst | always
      notifyOnChangeProps: 'all',    // Control re-renders
      structuralSharing: true,       // Keep old references if possible
    },
    mutations: {
      retry: 0,                       // Don't retry mutations by default
      gcTime: 1000 * 60 * 10,
    }
  }
});

// Per-query override
useQuery({
  queryKey: ['user'],
  queryFn: fetchUser,
  staleTime: Infinity,      // Never stale
  gcTime: Infinity,         // Never garbage collect
  retry: false,             // Don't retry
  refetchOnWindowFocus: false
});

// Hydration (SSR)
import { HydrationBoundary } from '@tanstack/react-query';

function App({ dehydratedState }) {
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>
        <MyApp />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
```

### Q62: Dependent Queries kaise handle karte hain?
**Answer:** Jab ek query doosre query pe depend kare.

```tsx
// Sequential queries
function UserPosts({ userId }) {
  // First query
  const { data: user } = useQuery({
    queryKey: ['user', userId],
    queryFn: fetchUser,
    enabled: !!userId  // Only fetch if userId exists
  });
  
  // Second query - depends on first
  const { data: posts } = useQuery({
    queryKey: ['posts', userId],
    queryFn: fetchUserPosts,
    enabled: !!user  // Only fetch after user is loaded
  });
  
  return <div>{/* render */}</div>;
}

// Using select for dependent data
const { data: posts } = useQuery({
  queryKey: ['user', userId],
  queryFn: fetchUserWithPosts,
  select: (user) => user.posts  // Extract posts from user
});

// Combine multiple queries
function Dashboard() {
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers });
  const postsQuery = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });
  const commentsQuery = useQuery({ 
    queryKey: ['comments'], 
    queryFn: fetchComments 
  });
  
  if (usersQuery.isLoading || postsQuery.isLoading || commentsQuery.isLoading) {
    return <div>Loading...</div>;
  }
  
  return <div>{/* render all data */}</div>;
}

// Or use combine (React Query v5)
import { combineQueries } from '@tanstack/react-query';

function Dashboard() {
  const combined = combineQueries([
    useQuery({ queryKey: ['users'], queryFn: fetchUsers }),
    useQuery({ queryKey: ['posts'], queryFn: fetchPosts }),
    useQuery({ queryKey: ['comments'], queryFn: fetchComments })
  ]);
  
  const [users, posts, comments] = combined.map(q => q.data);
}
```

### Q63: Prefetching data kaise karte hain?
**Answer:** Data pehle se load karna before user needs it.

```tsx
// Prefetch on mount
import { useQuery, useQueryClient } from '@tanstack/react-query';

function Project({ projectId }) {
  const queryClient = useQueryClient();
  
  const { data } = useQuery({
    queryKey: ['project', projectId],
    queryFn: fetchProject
  });
  
  // Prefetch related data
  useEffect(() => {
    if (data?.tasksUrl) {
      queryClient.prefetchQuery({
        queryKey: ['tasks', projectId],
        queryFn: () => fetch(data.tasksUrl)
      });
    }
  }, [data, projectId, queryClient]);
  
  return <div>{/* render */}</div>;
}

// Prefetch on hover
function ProjectList({ projects }) {
  const queryClient = useQueryClient();
  
  const prefetchProject = (projectId) => {
    queryClient.prefetchQuery({
      queryKey: ['project', projectId],
      queryFn: () => fetchProject(projectId),
      staleTime: 1000 * 60  // Consider fresh for 1 minute
    });
  };
  
  return (
    <ul>
      {projects.map(project => (
        <li
          key={project.id}
          onMouseEnter={() => prefetchProject(project.id)}
        >
          <Link to={`/projects/${project.id}`}>{project.name}</Link>
        </li>
      ))}
    </ul>
  );
}

// Prefetch in mutation onSuccess
const mutation = useMutation({
  mutationFn: createPost,
  onSuccess: (newPost) => {
    // Prefetch the new post details
    queryClient.prefetchQuery({
      queryKey: ['post', newPost.id],
      queryFn: () => fetchPost(newPost.id)
    });
  }
});

// Cancel prefetch if not needed
const queryKey = ['project', id];
queryClient.prefetchQuery({ queryKey, queryFn });
// Later...
queryClient.removeQueries({ queryKey });
```

### Q64: React Query DevTools kaise use karte hain?
**Answer:** Debugging aur inspection ke liye.

```tsx
// Install
npm install @tanstack/react-query-devtools

// Import and use
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

// Production mein disable
{process.env.NODE_ENV === 'development' && (
  <ReactQueryDevtools initialIsOpen={false} />
)}

// DevTools features:
// 1. Active queries dekhna
// 2. Query state inspect karna
// 3. Manual refetch/invalidate
// 4. Query data edit karna
// 5. Timing information
// 6. Filter queries

// Custom DevTools configuration
<ReactQueryDevtools
  initialIsOpen={false}
  position="bottom"
  toggleButtonProps={{
    style: { opacity: 0.5 }
  }}
/>

// Persist DevTools state
import { persistQueryClient } from '@tanstack/react-query-persist-client';

persistQueryClient({
  queryClient,
  persister: createSyncStoragePersister({
    storage: window.localStorage
  })
});
```

### Q65: Real-world patterns with React Query?
**Answer:** Common use cases aur best practices.

```tsx
// Pattern 1: Optimistic Updates
function TodoList() {
  const queryClient = useQueryClient();
  
  const mutation = useMutation({
    mutationFn: toggleTodo,
    onMutate: async ({ todoId }) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
      
      const previousTodos = queryClient.getQueryData(['todos']);
      
      queryClient.setQueryData(['todos'], (old) => 
        old.map(todo => 
          todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
        )
      );
      
      return { previousTodos };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(['todos'], context.previousTodos);
    }
  });
  
  return <div>{/* render */}</div>;
}

// Pattern 2: Polling
function LiveStats() {
  const { data } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
    refetchInterval: 5000,  // Poll every 5 seconds
    refetchIntervalInBackground: true  // Also poll when tab inactive
  });
  
  return <div>{data.value}</div>;
}

// Pattern 3: Load More with cursor
function Comments({ postId }) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: ({ pageParam }) => fetchComments(postId, pageParam),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage.nextCursor
  });
  
  return (
    <div>
      {data.pages.map(page => page.comments.map(c => <Comment key={c.id} />))}
      <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
        Load More
      </button>
    </div>
  );
}

// Pattern 4: Form with mutation
function EditForm({ postId }) {
  const { data: post } = useQuery({ 
    queryKey: ['post', postId], 
    queryFn: fetchPost 
  });
  
  const mutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    }
  });
  
  const onSubmit = (formData) => {
    mutation.mutate({ id: postId, ...formData });
  };
  
  return <Form defaultValues={post} onSubmit={onSubmit} />;
}

// Pattern 5: Conditional fetching
function SearchResults({ query }) {
  const { data } = useQuery({
    queryKey: ['search', query],
    queryFn: () => search(query),
    enabled: query.length > 2,  // Only search if query > 2 chars
    debounceTime: 300  // Custom debounce
  });
  
  return <div>{/* results */}</div>;
}
```

---

## **TAILWIND CSS (Questions 66-75)**

### Q66: Tailwind CSS kya hai aur iske benefits kya hain?
**Answer:** Utility-first CSS framework jo rapid UI development ke liye use hota hai.

```html
<!-- Traditional CSS -->
<style>
  .btn {
    padding: 0.5rem 1rem;
    background-color: #3b82f6;
    color: white;
    border-radius: 0.25rem;
    font-weight: 600;
  }
  .btn:hover {
    background-color: #2563eb;
  }
</style>
<button class="btn">Click me</button>

<!-- Tailwind CSS -->
<button class="px-4 py-2 bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600">
  Click me
</button>

<!-- Benefits: -->
<!-- 1. Fast development - No need to write custom CSS -->
<!-- 2. Consistent design system - Predefined spacing, colors, etc. -->
<!-- 3. Responsive by default - Mobile-first approach -->
<!-- 4. Small bundle size - PurgeCSS removes unused styles -->
<!-- 5. Customizable - tailwind.config.js mein customize kar sakte hain -->
<!-- 6. No naming conflicts - No need to think of class names -->

<!-- Installation -->
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

<!-- tailwind.config.js -->
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#1DA1F2',
        secondary: '#14171A'
      }
    }
  },
  plugins: []
}
```

### Q67: Tailwind mein responsive design kaise karte hain?
**Answer:** Mobile-first breakpoints use karte hain.

```html
<!-- Breakpoints: -->
<!-- sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px -->

<!-- Mobile-first approach -->
<div class="text-sm md:text-base lg:text-xl xl:text-2xl">
  Responsive Text
</div>

<!-- Grid layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

<!-- Hide/Show elements -->
<div class="hidden md:block">Desktop only</div>
<div class="block md:hidden">Mobile only</div>

<!-- Flex direction change -->
<div class="flex flex-col md:flex-row gap-4">
  <div>Sidebar</div>
  <div>Main Content</div>
</div>

<!-- Padding/Margin responsive -->
<div class="p-2 sm:p-4 md:p-6 lg:p-8">
  Responsive padding
</div>

<!-- Width responsive -->
<div class="w-full md:w-1/2 lg:w-1/3">
  Responsive width
</div>

<!-- Custom breakpoints in config -->
// tailwind.config.js
theme: {
  screens: {
    'xs': '475px',
    'sm': '640px',
    'md': '768px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
    '3xl': '1920px'
  }
}
```

### Q68: Tailwind customization kaise karte hain?
**Answer:** tailwind.config.js mein theme extend karte hain.

```javascript
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // Override default values
    extend: {
      // Custom colors
      colors: {
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1'
        },
        dark: '#0f172a'
      },
      
      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif']
      },
      
      // Custom spacing
      spacing: {
        '128': '32rem',
        '144': '36rem'
      },
      
      // Custom border radius
      borderRadius: {
        '4xl': '2rem',
        'full': '9999px'
      },
      
      // Custom animations
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out'
      },
      
      // Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' }
        }
      },
      
      // Custom box shadows
      boxShadow: {
        'custom': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.5)'
      }
    }
  },
  
  // Custom variants
  variants: {
    extend: {
      backgroundColor: ['active', 'disabled'],
      cursor: ['disabled']
    }
  },
  
  // Plugins
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ]
}

// Usage
<button class="bg-brand-500 hover:bg-brand-600 text-white font-display rounded-4xl shadow-glow animate-fade-in">
  Custom Button
</button>
```

### Q69: Dark mode kaise implement karte hain?
**Answer:** Class-based ya media-based dark mode.

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  theme: {
    extend: {
      colors: {
        background: {
          light: '#ffffff',
          dark: '#1a202c'
        }
      }
    }
  }
}

// HTML with class strategy
<html class="dark">
  <body class="bg-white dark:bg-dark text-gray-900 dark:text-white">
    <div class="bg-background-light dark:bg-background-dark">
      Content
    </div>
  </body>
</html>

// React component for toggle
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);
  
  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? '🌞 Light' : '🌙 Dark'}
    </button>
  );
}

// Dark mode specific styles
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
  border-gray-200 dark:border-gray-700
  hover:bg-gray-100 dark:hover:bg-gray-800
">
  Dark Mode Content
</div>

// System preference detection
useEffect(() => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setIsDark(prefersDark);
}, []);
```

### Q70: Tailwind components kaise reuse karte hain?
**Answer:** @apply directive aur component extraction.

```jsx
// Method 1: @apply directive (in CSS file)
/* styles.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-md font-semibold 
           hover:bg-blue-600 focus:outline-none focus:ring-2 
           focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50;
  }
  
  .card {
    @apply p-6 bg-white rounded-lg shadow-md border border-gray-200;
  }
  
  .input-field {
    @apply w-full px-3 py-2 border border-gray-300 rounded-md 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           focus:border-transparent;
  }
}

// Usage
<button className="btn-primary">Submit</button>
<div className="card">Card content</div>
<input className="input-field" />

// Method 2: React Components
function Button({ variant = 'primary', children, ...props }) {
  const baseStyles = 'px-4 py-2 rounded-md font-semibold transition-colors';
  
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-blue-500 text-blue-500 hover:bg-blue-50'
  };
  
  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {children}
    </button>
  );
}

// Method 3: cva (class-variance-authority)
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'px-4 py-2 rounded-md font-semibold transition-colors',
  {
    variants: {
      variant: {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
      },
      size: {
        sm: 'text-sm px-3 py-1',
        md: 'text-base px-4 py-2',
        lg: 'text-lg px-6 py-3'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

function Button({ variant, size, children }) {
  return (
    <button className={buttonVariants({ variant, size })}>
      {children}
    </button>
  );
}
```

### Q71: Tailwind mein animations kaise banate hain?
**Answer:** Built-in animations aur custom keyframes.

```html
<!-- Built-in animations -->
<div class="animate-spin">Loading...</div>
<div class="animate-pulse">Pulsing...</div>
<div class="animate-bounce">Bouncing...</div>
<div class="animate-ping">Ping...</div>

<!-- Animation duration -->
<div class="animate-spin duration-500">Slow spin</div>
<div class="animate-spin duration-1000">Slower spin</div>

<!-- Animation delay -->
<div class="animate-bounce delay-100">Delay 100ms</div>
<div class="animate-bounce delay-300">Delay 300ms</div>
<div class="animate-bounce delay-700">Delay 700ms</div>

<!-- Custom animation in config -->
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'scale-up': 'scaleUp 0.2s ease-in-out',
        'wiggle': 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    }
  }
}

// Usage
<div class="animate-fade-in">Fade In</div>
<div class="animate-slide-in">Slide In</div>
<div class="animate-wiggle">Wiggle</div>

<!-- Hover animations -->
<button class="transform hover:scale-105 transition-transform duration-300">
  Scale on hover
</button>

<div class="opacity-50 hover:opacity-100 transition-opacity">
  Fade on hover
</div>

<!-- Complex animation with groups -->
<div class="group">
  <div class="group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
    Animated child
  </div>
</div>
```

### Q72: Tailwind Grid aur Flexbox examples?
**Answer:** Layout systems for responsive designs.

```html
<!-- FLEXBOX Examples -->

<!-- Center content both axes -->
<div class="flex items-center justify-center h-screen">
  Centered Content
</div>

<!-- Space between -->
<div class="flex justify-between items-center">
  <div>Left</div>
  <div>Right</div>
</div>

<!-- Equal width columns -->
<div class="flex gap-4">
  <div class="flex-1">Column 1</div>
  <div class="flex-1">Column 2</div>
  <div class="flex-1">Column 3</div>
</div>

<!-- Fixed + Flexible -->
<div class="flex gap-4">
  <div class="w-64 flex-shrink-0">Sidebar</div>
  <div class="flex-1">Main Content</div>
</div>

<!-- Wrap -->
<div class="flex flex-wrap gap-4">
  <div class="w-32">Item 1</div>
  <div class="w-32">Item 2</div>
  <div class="w-32">Item 3</div>
</div>

<!-- GRID Examples -->

<!-- Basic grid -->
<div class="grid grid-cols-3 gap-4">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>

<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  <!-- Cards -->
</div>

<!-- Column span -->
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">Span 2 columns</div>
  <div>Normal</div>
  <div>Normal</div>
</div>

<!-- Row span -->
<div class="grid grid-cols-3 grid-rows-3 gap-4">
  <div class="row-span-2">Tall item</div>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>

<!-- Auto-fit grid (responsive without media queries) -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
  <!-- Automatically adjusts columns based on container width -->
</div>

<!-- Gap utilities -->
<div class="grid grid-cols-3 gap-4">Equal gaps</div>
<div class="grid grid-cols-3 gap-x-8 gap-y-4">Different x/y gaps</div>

<!-- Grid template areas -->
<div class="grid grid-areas-header grid-areas-sidebar-main grid-areas-footer">
  <div class="area-header">Header</div>
  <div class="area-sidebar">Sidebar</div>
  <div class="area-main">Main</div>
  <div class="area-footer">Footer</div>
</div>
```

### Q73: Tailwind performance optimization?
**Answer:** Bundle size kam karne ke techniques.

```javascript
// 1. PurgeCSS (built-in in v3 as tree-shaking)
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html'
  ],
  // Only used classes are included in production build
}

// 2. JIT Mode (Just-In-Time) - Default in v3
// Generates styles on-demand, faster builds

// 3. Disable unused utilities
module.exports = {
  corePlugins: {
    // Disable if not needed
    float: false,
    clear: false,
    placeholderColor: false
  }
}

// 4. Use production build
npm run build  // Creates optimized CSS

// 5. Lazy load heavy components
const HeavyComponent = dynamic(() => import('./Heavy'), {
  ssr: false
});

// 6. Optimize images with next/image
import Image from 'next/image';
<Image src="/img.jpg" width={500} height={300} alt="Optimized" />

// 7. Use proper content paths
// Make sure content array includes all files with Tailwind classes
content: [
  './app/**/*.{js,ts,jsx,tsx}',
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}'
]

// 8. Analyze bundle
npm install -D @fullhuman/postcss-purgecss
```

### Q74: Tailwind best practices?
**Answer:** Code organization aur maintainability.

```jsx
// 1. Use component abstraction for repeated patterns
function Card({ children, className }) {
  return (
    <div className={`p-6 bg-white rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );
}

// 2. Use clsx or classnames for conditional classes
import clsx from 'clsx';

function Button({ variant, isActive }) {
  return (
    <button className={clsx(
      'px-4 py-2 rounded-md transition-colors',
      variant === 'primary' && 'bg-blue-500 text-white',
      variant === 'secondary' && 'bg-gray-200 text-gray-800',
      isActive && 'ring-2 ring-blue-500'
    )}>
      Click
    </button>
  );
}

// 3. Organize classes consistently
// Order: layout → spacing → sizing → typography → visual → interactive
<div className="
  flex items-center justify-center    /* layout */
  p-4 m-2                            /* spacing */
  w-full h-64                        /* sizing */
  text-lg font-bold                  /* typography */
  bg-white rounded-lg shadow-md      /* visual */
  hover:bg-gray-100 cursor-pointer   /* interactive */
">
  Content
</div>

// 4. Use prettier-plugin-tailwindcss for auto-sorting
npm install -D prettier prettier-plugin-tailwindcss

// 5. Extract complex patterns to components
// Bad
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
  <h3 className="text-lg font-semibold text-gray-900">Title</h3>
  <span className="text-sm text-gray-500">Subtitle</span>
</div>

// Good
<Card className="hover:shadow-lg transition-shadow">
  <CardHeader title="Title" subtitle="Subtitle" />
</Card>

// 6. Use CSS variables for dynamic values
<div style={{ '--columns': count }} className="grid grid-cols-[var(--columns)]">
  {/* Dynamic columns */}
</div>
```

### Q75: Common Tailwind patterns?
**Answer:** Reusable UI patterns.

```html
<!-- Container with max-width -->
<div class="container mx-auto px-4">Content</div>

<!-- Aspect ratio -->
<div class="aspect-video">16:9 ratio</div>
<div class="aspect-square">1:1 ratio</div>

<!-- Line clamp (truncate text) -->
<p class="line-clamp-3">Long text that will be truncated after 3 lines</p>

<!-- Sticky header -->
<header class="sticky top-0 z-50 bg-white shadow-md">Header</header>

<!-- Full viewport height -->
<section class="min-h-screen">Full screen section</section>

<!-- Gradient background -->
<div class="bg-gradient-to-r from-blue-500 to-purple-600">Gradient</div>

<!-- Glass morphism effect -->
<div class="bg-white/30 backdrop-blur-md border border-white/20">Glass</div>

<!-- Skeleton loader -->
<div class="animate-pulse space-y-4">
  <div class="h-4 bg-gray-200 rounded w-3/4"></div>
  <div class="h-4 bg-gray-200 rounded"></div>
  <div class="h-4 bg-gray-200 rounded w-5/6"></div>
</div>

<!-- Badge -->
<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
  New
</span>

<!-- Avatar -->
<div class="relative">
  <img class="w-10 h-10 rounded-full" src="/avatar.jpg" />
  <span class="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-400 ring-2 ring-white"></span>
</div>

<!-- Dropdown menu -->
<div class="relative">
  <button class="p-2">Menu</button>
  <div class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 1</a>
    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Option 2</a>
  </div>
</div>

<!-- Modal overlay -->
<div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
    Modal content
  </div>
</div>
```

---

## **RESPONSIVE DESIGN (Questions 76-80)**

### Q76: Responsive design principles kya hain?
**Answer:** Mobile-first approach aur fluid layouts.

```css
/* 1. Mobile-First Approach */
/* Start with mobile styles, then add breakpoints for larger screens */

.base-style {
  /* Mobile styles first */
  font-size: 14px;
  padding: 1rem;
}

@media (min-width: 768px) {
  .base-style {
    /* Tablet styles */
    font-size: 16px;
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .base-style {
    /* Desktop styles */
    font-size: 18px;
    padding: 3rem;
  }
}

/* 2. Fluid Typography */
h1 {
  font-size: clamp(1.5rem, 4vw, 3rem);
  /* Min: 1.5rem, Preferred: 4vw, Max: 3rem */
}

/* 3. Fluid Spacing */
.container {
  padding: clamp(1rem, 3vw, 3rem);
  margin: 0 auto;
  max-width: 1200px;
}

/* 4. Responsive Images */
img {
  max-width: 100%;
  height: auto;
}

picture {
  display: block;
}

/* 5. Flexible Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

/* 6. Container Queries (Modern) */
@container (min-width: 400px) {
  .card {
    display: flex;
  }
}
```

### Q77: Media queries types aur usage?
**Answer:** Different types of media queries for various conditions.

```css
/* Based on viewport width */
@media (max-width: 767px) { /* Mobile */ }
@media (min-width: 768px) and (max-width: 1023px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }

/* Based on device orientation */
@media (orientation: portrait) {
  /* Portrait mode */
}

@media (orientation: landscape) {
  /* Landscape mode */
}

/* Based on pixel density (Retina displays) */
@media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
  /* High DPI screens */
  .logo {
    background-image: url('logo@2x.png');
  }
}

/* Based on user preference */
@media (prefers-color-scheme: dark) {
  /* Dark mode */
  body {
    background: #1a1a1a;
    color: #fff;
  }
}

@media (prefers-reduced-motion: reduce) {
  /* Reduce animations for accessibility */
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* Based on pointer type */
@media (pointer: coarse) {
  /* Touch devices - make buttons larger */
  button {
    min-height: 44px;
    min-width: 44px;
  }
}

@media (pointer: fine) {
  /* Mouse devices - can have smaller targets */
  button {
    min-height: 32px;
  }
}

/* Print styles */
@media print {
  .no-print {
    display: none;
  }
  
  body {
    font-size: 12pt;
    color: black;
    background: white;
  }
  
  a[href]:after {
    content: " (" attr(href) ")";
  }
}

/* Combined conditions */
@media screen and (min-width: 768px) and (orientation: landscape) {
  /* Tablet in landscape */
}
```

### Q78: Responsive images techniques?
**Answer:** Multiple approaches for different scenarios.

```html
<!-- 1. srcset for different resolutions -->
<img 
  src="image-800.jpg"
  srcset="image-400.jpg 400w,
          image-800.jpg 800w,
          image-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px,
         (max-width: 1000px) 800px,
         1200px"
  alt="Responsive image"
/>

<!-- 2. picture element for art direction -->
<picture>
  <source media="(min-width: 1024px)" srcset="desktop.jpg">
  <source media="(min-width: 768px)" srcset="tablet.jpg">
  <img src="mobile.jpg" alt="Art directed image">
</picture>

<!-- 3. Different formats -->
<picture>
  <source srcset="image.webp" type="image/webp">
  <source srcset="image.jpg" type="image/jpeg">
  <img src="image.jpg" alt="Format fallback">
</picture>

<!-- 4. Next.js Image component -->
import Image from 'next/image';

<Image
  src="/photo.jpg"
  alt="Photo"
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
  priority
  quality={75}
/>

<!-- 5. CSS background with media queries -->
<div class="hero-image"></div>

<style>
.hero-image {
  background-image: url('mobile.jpg');
  background-size: cover;
  background-position: center;
  aspect-ratio: 16/9;
}

@media (min-width: 768px) {
  .hero-image {
    background-image: url('tablet.jpg');
  }
}

@media (min-width: 1024px) {
  .hero-image {
    background-image: url('desktop.jpg');
  }
}
</style>

<!-- 6. Lazy loading -->
<img src="image.jpg" loading="lazy" alt="Lazy loaded" />

<!-- 7. SVG for icons/logos -->
<svg viewBox="0 0 100 100" class="w-10 h-10 md:w-16 md:h-16">
  <!-- Vector content -->
</svg>
```

### Q79: Mobile navigation patterns?
**Answer:** Common responsive navigation implementations.

```jsx
// 1. Hamburger Menu
function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="text-xl font-bold">Logo</div>
          
          {/* Hamburger button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6">
              {isOpen ? (
                <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" />
              ) : (
                <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" />
              )}
            </svg>
          </button>
          
          {/* Desktop menu */}
          <ul className="hidden md:flex space-x-6">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <ul className="md:hidden py-4 space-y-4">
            <li><a href="/" className="block">Home</a></li>
            <li><a href="/about" className="block">About</a></li>
            <li><a href="/contact" className="block">Contact</a></li>
          </ul>
        )}
      </div>
    </nav>
  );
}

// 2. Bottom Navigation (Mobile apps style)
<nav className="fixed bottom-0 left-0 right-0 bg-white border-t md:hidden">
  <div className="flex justify-around py-2">
    <a href="/" className="flex flex-col items-center">
      <Icon name="home" />
      <span className="text-xs">Home</span>
    </a>
    <a href="/search" className="flex flex-col items-center">
      <Icon name="search" />
      <span className="text-xs">Search</span>
    </a>
    <a href="/profile" className="flex flex-col items-center">
      <Icon name="user" />
      <span className="text-xs">Profile</span>
    </a>
  </div>
</nav>

// 3. Off-canvas Sidebar
function OffCanvasNav() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <nav className="p-4">
          <button onClick={() => setIsOpen(false)} className="mb-4">✕ Close</button>
          <ul className="space-y-4">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

// 4. Mega Menu (Desktop)
<nav className="hidden lg:block">
  <div className="container mx-auto px-4">
    <ul className="flex space-x-8">
      <li className="relative group">
        <button className="py-4">Products ▾</button>
        <div className="absolute left-0 mt-0 w-full bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
          <div className="grid grid-cols-4 gap-8 p-8">
            {/* Mega menu content */}
          </div>
        </div>
      </li>
    </ul>
  </div>
</nav>
```

### Q80: Responsive tables kaise banate hain?
**Answer:** Tables ko mobile-friendly banana.

```html
<!-- Method 1: Horizontal scroll -->
<div class="overflow-x-auto">
  <table class="min-w-full">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>john@email.com</td>
        <td>123-456</td>
        <td>Street Address</td>
      </tr>
    </tbody>
  </table>
</div>

<!-- Method 2: Card layout on mobile -->
<table class="responsive-table">
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th>Phone</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Name">John Doe</td>
      <td data-label="Email">john@email.com</td>
      <td data-label="Phone">123-456</td>
    </tr>
  </tbody>
</table>

<style>
@media (max-width: 768px) {
  .responsive-table,
  .responsive-table thead,
  .responsive-table tbody,
  .responsive-table th,
  .responsive-table td,
  .responsive-table tr {
    display: block;
  }
  
  .responsive-table thead {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  .responsive-table tr {
    margin-bottom: 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1rem;
  }
  
  .responsive-table td {
    border: none;
    position: relative;
    padding-left: 50%;
  }
  
  .responsive-table td:before {
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    content: attr(data-label);
  }
}
</style>

<!-- Method 3: Hide less important columns -->
<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
      <th class="hidden md:table-cell">Phone</th>
      <th class="hidden lg:table-cell">Address</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John</td>
      <td>john@email.com</td>
      <td class="hidden md:table-cell">123-456</td>
      <td class="hidden lg:table-cell">Address</td>
    </tr>
  </tbody>
</table>

<!-- Method 4: Stack cells -->
@media (max-width: 600px) {
  .stack-table tr {
    display: flex;
    flex-direction: column;
  }
  
  .stack-table td {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
  }
  
  .stack-table td::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 1rem;
  }
}
```

---

## **CSS3 (Questions 81-90)**

### Q81: CSS Grid vs Flexbox mein kya farq hai?
**Answer:** Grid 2D layout ke liye, Flexbox 1D layout ke liye.

```css
/* FLEXBOX - One dimensional (row OR column) */
.container {
  display: flex;
  flex-direction: row; /* or column */
  justify-content: center; /* Main axis alignment */
  align-items: center; /* Cross axis alignment */
  gap: 1rem;
}

/* Best for: */
/* - Navigation bars */
/* - Centering content */
/* - Distributing space among items */
/* - Simple layouts */

/* GRID - Two dimensional (rows AND columns) */
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto 1fr auto;
  gap: 1rem;
}

/* Best for: */
/* - Page layouts */
/* - Complex 2D layouts */
/* - Dashboard grids */
/* - Photo galleries */

/* Combined example */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { 
  grid-area: main;
  display: flex; /* Flex inside grid */
  gap: 1rem;
}
.footer { grid-area: footer; }

/* When to use what: */
/* Use Flexbox when: */
/* - You need to align items in one direction */
/* - Content determines item sizes */
/* - Simple distribution of space */

/* Use Grid when: */
/* - You need precise control over rows AND columns */
/* - Layout is more important than content */
/* - Complex page-level layouts */
```

### Q82: CSS Variables (Custom Properties) kaise use karte hain?
**Answer:** Reusable values define karna.

```css
/* Define variables */
:root {
  --primary-color: #3b82f6;
  --secondary-color: #10b981;
  --text-color: #1f2937;
  --background-color: #ffffff;
  --spacing-unit: 0.25rem;
  --font-size-base: 1rem;
  --border-radius: 0.375rem;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

/* Use variables */
.button {
  background-color: var(--primary-color);
  color: white;
  padding: calc(var(--spacing-unit) * 4) calc(var(--spacing-unit) * 8);
  font-size: var(--font-size-base);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow);
}

/* Fallback values */
.card {
  background-color: var(--card-bg, #ffffff);
}

/* Theme switching */
.dark-theme {
  --primary-color: #60a5fa;
  --text-color: #f9fafb;
  --background-color: #1f2937;
}

/* JavaScript se update */
document.documentElement.style.setProperty('--primary-color', '#ef4444');

/* Computed values */
:root {
  --spacing-sm: calc(var(--spacing-unit) * 2);
  --spacing-md: calc(var(--spacing-unit) * 4);
  --spacing-lg: calc(var(--spacing-unit) * 8);
}

/* Media query mein variables */
@media (min-width: 768px) {
  :root {
    --font-size-base: 1.125rem;
    --spacing-unit: 0.5rem;
  }
}

/* Component-specific variables */
.card {
  --card-padding: 1rem;
  padding: var(--card-padding);
}

.card.large {
  --card-padding: 2rem;
}
```

### Q83: CSS Animations aur Transitions?
**Answer:** Smooth effects create karna.

```css
/* TRANSITIONS - Property changes pe smooth transition */
.button {
  background-color: blue;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.button:hover {
  background-color: darkblue;
  transform: scale(1.05);
}

/* Transition shorthand */
/* property | duration | timing-function | delay */
.element {
  transition: all 0.3s ease-in-out 0.1s;
}

/* Timing functions */
.ease-linear { transition-timing-function: linear; }
.ease-in { transition-timing-function: ease-in; }
.ease-out { transition-timing-function: ease-out; }
.ease-in-out { transition-timing-function: ease-in-out; }
.custom { transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55); }

/* ANIMATIONS - Keyframe-based animations */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.8;
  }
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Apply animation */
.element {
  animation: slideIn 0.5s ease-out forwards;
}

/* Animation properties */
.animated {
  animation-name: slideIn;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-delay: 0.2s;
  animation-iteration-count: infinite; /* or number */
  animation-direction: alternate; /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: forwards; /* none, forwards, backwards, both */
  animation-play-state: running; /* running, paused */
}

/* Shorthand */
.complex-animation {
  animation: slideIn 0.5s ease-out 0.2s infinite alternate forwards;
}

/* Multiple animations */
.multi-animation {
  animation: 
    slideIn 0.5s ease-out,
    pulse 2s ease-in-out infinite,
    changeColor 3s linear infinite;
}

/* Practical examples */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.fade-enter {
  animation: fadeIn 0.3s ease-in;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

### Q84: CSS Pseudo-classes aur Pseudo-elements?
**Answer:** Special selectors for states and generated content.

```css
/* PSEUDO-CLASSES - Element states */

/* User interaction */
a:hover { color: blue; }
a:active { color: red; }
a:focus { outline: 2px solid blue; }
a:visited { color: purple; }

/* Form states */
input:valid { border-color: green; }
input:invalid { border-color: red; }
input:focus:valid { border-color: lime; }
input:disabled { opacity: 0.5; }
input:checked + label { color: blue; }

/* Structural pseudo-classes */
li:first-child { font-weight: bold; }
li:last-child { border-bottom: none; }
li:nth-child(odd) { background: #f0f0f0; }
li:nth-child(even) { background: #ffffff; }
li:nth-child(3n+1) { /* Every 3rd starting from 1 */ }
li:nth-of-type(2) { /* Second of its type */ }

/* Negation */
p:not(.special) { color: gray; }

/* Empty */
div:empty { display: none; }

/* Target */
#section:target { background: yellow; }

/* PSEUDO-ELEMENTS - Generated content/styling */

::before {
  content: "→ ";
  color: blue;
}

::after {
  content: "";
  display: block;
  clear: both;
}

::first-letter {
  font-size: 2em;
  font-weight: bold;
}

::first-line {
  font-weight: bold;
}

::selection {
  background: yellow;
  color: black;
}

::placeholder {
  color: #999;
  font-style: italic;
}

::backdrop {
  background: rgba(0, 0, 0, 0.5);
}

/* Combined examples */
.card {
  position: relative;
}

.card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, rgba(0,0,0,0.1), transparent);
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.card:hover::before {
  opacity: 1;
}

/* List with custom bullets */
ul.custom-list {
  list-style: none;
  padding-left: 0;
}

ul.custom-list li {
  position: relative;
  padding-left: 1.5rem;
}

ul.custom-list li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: green;
  font-weight: bold;
}

/* Quote styling */
blockquote {
  position: relative;
  padding-left: 2rem;
}

blockquote::before {
  content: """;
  font-size: 4rem;
  position: absolute;
  left: 0;
  top: -1rem;
  color: #ccc;
}
```

### Q85: CSS Specificity kaise calculate hoti hai?
**Answer:** Priority rules for conflicting styles.

```css
/* Specificity Hierarchy (from lowest to highest): */

/* 1. Universal selector, combinators */
* , + , > , ~ { specificity: 0,0,0,0 }

/* 2. Type selectors (elements) */
div, p, h1 { specificity: 0,0,0,1 }

/* 3. Class selectors, attributes, pseudo-classes */
.class, [type="text"], :hover { specificity: 0,0,1,0 }

/* 4. ID selectors */
#id { specificity: 0,1,0,0 }

/* 5. Inline styles */
style="color: red" { specificity: 1,0,0,0 }

/* 6. !important (overrides everything except another !important with higher specificity) */
.class { color: blue !important; }

/* Calculation Examples */

div { }                    /* 0,0,0,1 */
div p { }                  /* 0,0,0,2 */
.class { }                 /* 0,0,1,0 */
div.class { }              /* 0,0,1,1 */
#id { }                    /* 0,1,0,0 */
div#id.class { }           /* 0,1,1,1 */
div#id.class:hover { }     /* 0,1,2,1 */

/* Practical Example */
<style>
  /* Specificity: 0,0,0,1 */
  p { color: black; }
  
  /* Specificity: 0,0,1,0 - WINS */
  .text { color: blue; }
  
  /* Specificity: 0,0,1,1 - Would win if applied */
  p.text { color: green; }
  
  /* Specificity: 0,1,0,0 - Would win if applied */
  #main-text { color: red; }
</style>

<p id="main-text" class="text">What color am I?</p>
/* Answer: Blue (because .text has higher specificity than p) */

/* Tips to manage specificity: */
/* 1. Avoid IDs for styling */
/* 2. Use single class when possible */
/* 3. Avoid !important */
/* 4. Use CSS methodology (BEM, OOCSS) */
/* 5. Leverage CSS cascade properly */

/* BEM Example - Low specificity, high clarity */
.block { }              /* 0,0,1,0 */
.block__element { }     /* 0,0,1,0 */
.block--modifier { }    /* 0,0,1,0 */
```

### Q86: CSS Box Model explain karo?
**Answer:** Content, Padding, Border, Margin.

```css
/* Standard Box Model */
.element {
  width: 300px;           /* Content width */
  padding: 20px;          /* Space between content and border */
  border: 5px solid blue; /* Border around padding */
  margin: 10px;           /* Space outside border */
  
  /* Total width = 300 + 20*2 + 5*2 + 10*2 = 370px */
}

/* Box Sizing */
.element {
  box-sizing: content-box; /* Default - width is content only */
}

.element {
  box-sizing: border-box; /* Recommended - width includes padding & border */
  width: 300px;
  padding: 20px;
  border: 5px solid blue;
  /* Total width = 300px (padding and border are inside) */
}

/* Global reset */
*, *::before, *::after {
  box-sizing: border-box;
}

/* Visual representation */
/* 
┌─────────────────────────────┐ ← Margin
│  ┌───────────────────────┐  │
│  │ ┌─────────────────┐   │  │ ← Border
│  │ │ ┌───────────┐   │   │  │
│  │ │ │  Content  │   │   │  │ ← Padding
│  │ │ │           │   │   │  │
│  │ │ └───────────┘   │   │  │
│  │ └─────────────────┘   │  │
│  └───────────────────────┘  │
└─────────────────────────────┘
*/

/* Margin collapsing */
.first { margin-bottom: 20px; }
.second { margin-top: 30px; }
/* Actual space between = 30px (larger margin wins) */

/* Prevent margin collapse */
.parent {
  overflow: hidden; /* or use flex/grid */
}

/* Negative margins */
.overlap {
  margin-top: -20px; /* Pull element up */
}

/* Auto margins for centering */
.centered {
  margin: 0 auto; /* Horizontal centering for block elements */
}
```

### Q87: CSS Position property values?
**Answer:** Element positioning methods.

```css
/* STATIC - Default */
.static {
  position: static;
  /* Not affected by top, right, bottom, left, z-index */
}

/* RELATIVE - Positioned relative to itself */
.relative {
  position: relative;
  top: 10px;    /* Move 10px down from original position */
  left: 20px;   /* Move 20px right */
  /* Still occupies original space */
  /* Used as reference for absolute children */
}

/* ABSOLUTE - Positioned relative to nearest positioned ancestor */
.absolute {
  position: absolute;
  top: 0;
  right: 0;
  /* Removed from document flow */
  /* Parent must have position: relative/fixed/sticky */
}

/* Example */
.parent {
  position: relative; /* Reference point */
  width: 400px;
  height: 300px;
}

.child {
  position: absolute;
  top: 10px;
  left: 10px;
  /* Positioned 10px from parent's top-left */
}

/* FIXED - Positioned relative to viewport */
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  /* Stays in place when scrolling */
  /* Used for navbars, back-to-top buttons */
}

/* STICKY - Hybrid of relative and fixed */
.sticky {
  position: sticky;
  top: 0;
  /* Acts like relative until scroll reaches threshold */
  /* Then becomes fixed */
  /* Parent must not have overflow: hidden/auto */
}

/* Z-index layering */
.layer1 {
  position: relative;
  z-index: 1;
}

.layer2 {
  position: relative;
  z-index: 2; /* Appears above layer1 */
}

/* Common patterns */

/* Center absolutely positioned element */
.centered-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Full-screen overlay */
.overlay {
  position: fixed;
  inset: 0; /* shorthand for top:0; right:0; bottom:0; left:0; */
  background: rgba(0,0,0,0.5);
}

/* Sticky header */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}

/* Tooltip */
.tooltip-container {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  white-space: nowrap;
}
```

### Q88: CSS Transform, Filter, Backdrop-filter?
**Answer:** Visual effects aur transformations.

```css
/* TRANSFORM - 2D/3D transformations */
.transform-example {
  transform: translate(50px, 100px);  /* Move */
  transform: rotate(45deg);           /* Rotate */
  transform: scale(1.5);              /* Scale up */
  transform: skew(10deg, 5deg);       /* Skew */
  transform: matrix(1, 0, 0, 1, 50, 50); /* Matrix transform */
  
  /* Combine multiple transforms */
  transform: translateX(50%) rotate(45deg) scale(1.2);
  
  /* 3D transforms */
  transform: rotateX(45deg);
  transform: rotateY(45deg);
  transform: rotateZ(45deg);
  transform: translateZ(50px);
  transform: perspective(500px) rotateY(45deg);
}

/* Transform origin */
.rotating {
  transform-origin: center center; /* Default */
  transform-origin: top left;
  transform-origin: 50% 50%;
}

/* FILTER - Visual effects */
.filter-example {
  filter: blur(5px);              /* Blur effect */
  filter: brightness(150%);       /* Increase brightness */
  filter: contrast(200%);         /* Increase contrast */
  filter: grayscale(100%);        /* Convert to grayscale */
  filter: hue-rotate(90deg);      /* Rotate hue */
  filter: invert(100%);           /* Invert colors */
  filter: opacity(50%);           /* Change opacity */
  filter: saturate(200%);         /* Increase saturation */
  filter: sepia(100%);            /* Sepia tone */
  
  /* Combine filters */
  filter: blur(2px) brightness(1.2) contrast(1.1);
  
  /* Drop shadow */
  filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.3));
}

/* BACKDROP-FILTER - Effect on area behind element */
.glass-effect {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  backdrop-filter: blur(5px) brightness(1.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

/* Practical examples */

/* Hover card effect */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

/* Image hover zoom */
.image-container {
  overflow: hidden;
}

.image-container img {
  transition: transform 0.5s ease;
}

.image-container:hover img {
  transform: scale(1.1);
}

/* Loading skeleton */
.skeleton {
  background: #f0f0f0;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
  100% { filter: brightness(1); }
}

/* Frosted glass navigation */
.navbar {
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px); /* Safari support */
}

/* Grayscale to color on hover */
.grayscale-hover {
  filter: grayscale(100%);
  transition: filter 0.3s ease;
}

.grayscale-hover:hover {
  filter: grayscale(0%);
}
```

### Q89: CSS Flexbox common patterns?
**Answer:** Practical flexbox layouts.

```css
/* 1. Perfect Centering */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 2. Holy Grail Layout */
.holy-grail {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.hg-header, .hg-footer {
  flex: 0 0 auto;
}

.hg-body {
  display: flex;
  flex: 1;
}

.hg-sidebar {
  flex: 0 0 200px;
}

.hg-main {
  flex: 1;
}

/* 3. Equal Height Columns */
.equal-columns {
  display: flex;
  gap: 1rem;
}

.equal-columns > * {
  flex: 1;
}

/* 4. Sticky Footer */
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.sticky-footer main {
  flex: 1;
}

/* 5. Navigation Bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

/* 6. Media Object */
.media-object {
  display: flex;
  gap: 1rem;
}

.media-image {
  flex: 0 0 100px;
}

.media-content {
  flex: 1;
}

/* 7. Responsive Grid with Flex */
.flex-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.flex-grid-item {
  flex: 1 1 calc(33.333% - 1rem);
  min-width: 250px;
}

/* 8. Order Control */
.order-example {
  display: flex;
}

.order-example > :first-child {
  order: 2;
}

.order-example > :last-child {
  order: 1;
}

/* 9. Align Self Override */
.align-examples {
  display: flex;
  align-items: center;
  height: 200px;
}

.align-examples > :nth-child(2) {
  align-self: flex-start;
}

.align-examples > :nth-child(3) {
  align-self: flex-end;
}

/* 10. Gap Filler */
.gap-filler {
  display: flex;
}

.gap-filler > :first-child {
  margin-right: auto;
}
/* First item pushed left, rest pushed right */
```

### Q90: Advanced CSS Selectors?
**Answer:** Powerful selectors for precise targeting.

```css
/* Attribute Selectors */
input[type="text"] { }           /* Exact match */
input[type^="te"] { }            /* Starts with */
input[type$="xt"] { }            /* Ends with */
input[type*="ex"] { }            /* Contains */
a[href*="example.com"] { }       /* Links to specific domain */
[class~="btn"] { }               /* Word contains (space-separated) */
[lang|="en"] { }                 /* Hyphen-separated starts with */

/* Child Combinators */
parent > child { }               /* Direct children only */
ancestor descendant { }          /* All descendants */
element1 + element2 { }          /* Immediate sibling */
element1 ~ element2 { }          /* All following siblings */

/* :not() negation */
p:not(.special) { }              /* All p except .special */
div:not(:last-child) { }         /* All divs except last */

/* :has() relational (modern browsers) */
div:has(> img) { }               /* Divs that contain direct img */
a:has(> img) { border: none; }   /* Links wrapping images */

/* :where() and :is() specificity helpers */
:where(.card, .panel) { }        /* Zero specificity */
:is(.card, .panel) { }           /* Takes highest specificity */

/* :nth-child() variations */
li:nth-child(odd) { }            /* 1, 3, 5, 7... */
li:nth-child(even) { }           /* 2, 4, 6, 8... */
li:nth-child(3n+1) { }           /* 1, 4, 7, 10... */
li:nth-child(-n+3) { }           /* First 3 items */
li:nth-last-child(2) { }         /* Second from end */

/* :nth-of-type() */
p:nth-of-type(2) { }             /* Second paragraph among siblings */

/* ::selection (already covered) */

/* Full example */
<style>
/* Style external links */
a[href^="http"]:not([href*="mysite.com"])::after {
  content: " ↗";
  font-size: 0.8em;
}

/* Style required fields */
input:required {
  border-left: 3px solid red;
}

/* Style checked checkbox's label */
input[type="checkbox"]:checked + label {
  color: green;
  font-weight: bold;
}

/* First letter of first paragraph */
article > p:first-of-type::first-letter {
  font-size: 2em;
  font-weight: bold;
}

/* Alternating table rows */
tr:nth-child(odd) {
  background: #f5f5f5;
}

/* Highlight search results */
mark {
  background: yellow;
  color: black;
}
</style>
```

---

## **JAVASCRIPT OOP (Questions 91-100)**

### Q91: JavaScript OOP concepts explain karo?
**Answer:** Four pillars of OOP.

```javascript
// 1. ENCAPSULATION - Data hiding
class BankAccount {
  #balance = 0;  // Private field
  
  constructor(owner) {
    this.owner = owner;  // Public field
  }
  
  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
    }
  }
  
  getBalance() {  // Public method to access private data
    return this.#balance;
  }
}

const account = new BankAccount("Ali");
account.deposit(1000);
console.log(account.getBalance()); // 1000
// console.log(account.#balance); // Error: Private field

// 2. INHERITANCE - Code reuse
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  // Method overriding
  speak() {
    console.log(`${this.name} barks`);
  }
  
  fetch() {
    console.log(`${this.name} fetches the ball`);
  }
}

const dog = new Dog("Buddy", "Golden Retriever");
dog.speak(); // "Buddy barks"
dog.fetch(); // "Buddy fetches the ball"

// 3. POLYMORPHISM - Same interface, different implementations
class Bird extends Animal {
  speak() {
    console.log(`${this.name} chirps`);
  }
  
  fly() {
    console.log(`${this.name} flies`);
  }
}

const animals = [
  new Dog("Buddy"),
  new Bird("Tweety"),
  new Animal("Generic")
];

animals.forEach(animal => animal.speak());
// Buddy barks
// Tweety chirps
// Generic makes a sound

// 4. ABSTRACTION - Hide complex implementation
class PaymentProcessor {
  processPayment(amount) {
    this.validateAmount(amount);
    this.connectToGateway();
    this.executeTransaction(amount);
    this.sendReceipt();
  }
  
  validateAmount(amount) { /* ... */ }
  connectToGateway() { /* ... */ }
  executeTransaction(amount) { /* ... */ }
  sendReceipt() { /* ... */ }
}

// User only needs to call one method
const processor = new PaymentProcessor();
processor.processPayment(100);
```

### Q92: Classes vs Constructor Functions?
**Answer:** Modern vs traditional way of creating objects.

```javascript
// CONSTRUCTOR FUNCTION (Traditional)
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Methods on prototype (memory efficient)
Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

// Static method
Person.createAnonymous = function() {
  return new Person("Anonymous", 0);
};

const person1 = new Person("Ali", 25);

// CLASS (ES6 - Syntactic sugar over prototypes)
class PersonClass {
  // Constructor
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  // Instance method (automatically on prototype)
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
  
  // Getter
  get info() {
    return `${this.name}, ${this.age} years old`;
  }
  
  // Setter
  set age(value) {
    if (value < 0) throw new Error("Age can't be negative");
    this._age = value;
  }
  
  // Static method
  static createAnonymous() {
    return new PersonClass("Anonymous", 0);
  }
  
  // Private field (modern)
  #secret = "private data";
  
  getSecret() {
    return this.#secret;
  }
}

const person2 = new PersonClass("Ahmed", 30);

// KEY DIFFERENCES:

// 1. Hoisting
// Constructor functions are hoisted
const p1 = new Person("Test", 20); // Works
function Person(name, age) {
  this.name = name;
}

// Classes are not hoisted
// const p2 = new PersonClass("Test", 20); // Error: Cannot access before initialization
class PersonClass {
  constructor(name, age) {
    this.name = name;
  }
}

// 2. Strict mode
// Classes automatically use strict mode
class MyClass {
  test() {
    // 'this' is undefined if called without context
  }
}

// 3. Non-enumerable methods
// Class methods are non-enumerable
Object.keys(PersonClass.prototype); // []
Object.getOwnPropertyNames(PersonClass.prototype); // ['constructor', 'greet', ...]

// 4. Inheritance syntax
// Constructor function inheritance (complex)
function Student(name, grade) {
  Person.call(this, name);
  this.grade = grade;
}
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

// Class inheritance (clean)
class Student extends PersonClass {
  constructor(name, grade) {
    super(name);
    this.grade = grade;
  }
}
```

### Q93: Prototypal Inheritance kaise kaam karta hai?
**Answer:** Prototype chain se inheritance.

```javascript
// Every object has a __proto__ link to its prototype

// Creating objects with Object.create
const animalPrototype = {
  eats: true,
  walk() {
    console.log("Animal walking");
  }
};

const rabbit = Object.create(animalPrototype);
rabbit.jumps = true;

console.log(rabbit.eats); // true (from prototype)
rabbit.walk(); // "Animal walking" (from prototype)

// Prototype chain
console.log(Object.getPrototypeOf(rabbit) === animalPrototype); // true

// Function prototypes
function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

function Dog(name, breed) {
  Animal.call(this, name); // Inherit properties
  this.breed = breed;
}

// Inherit methods
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

Dog.prototype.speak = function() {
  console.log(`${this.name} barks`);
};

const myDog = new Dog("Buddy", "Labrador");
myDog.speak(); // "Buddy barks"

// Prototype chain visualization
console.log(myDog.__proto__ === Dog.prototype); // true
console.log(Dog.prototype.__proto__ === Animal.prototype); // true
console.log(Animal.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__); // null (end of chain)

// ES6 Classes (cleaner syntax for prototypes)
class Cat {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} meows`);
  }
}

// Under the hood, still uses prototypes
console.log(typeof Cat.prototype.speak); // "function"

// instanceof operator
console.log(myDog instanceof Dog); // true
console.log(myDog instanceof Animal); // true
console.log(myDog instanceof Object); // true

// hasOwnProperty vs in operator
console.log(myDog.hasOwnProperty('name')); // true (own property)
console.log(myDog.hasOwnProperty('speak')); // false (prototype)
console.log('speak' in myDog); // true (checks prototype chain too)
```

### Q94: this binding rules explain karo?
**Answer:** Four rules for determining `this`.

```javascript
// 1. DEFAULT BINDING (global context)
function foo() {
  console.log(this); // Window (browser) or global (Node)
}
foo();

// In strict mode
'use strict';
function bar() {
  console.log(this); // undefined
}
bar();

// 2. IMPLICIT BINDING (object method)
const obj = {
  name: "Ali",
  greet() {
    console.log(`Hello, ${this.name}`);
  }
};
obj.greet(); // "Hello, Ali" - this = obj

// Lost binding
const greetFunc = obj.greet;
greetFunc(); // "Hello, undefined" - this = Window

// 3. NEW BINDING (constructor call)
function Person(name) {
  this.name = name;
}
const person = new Person("Ahmed");
console.log(person.name); // "Ahmed"

// 4. EXPLICIT BINDING (call, apply, bind)
function introduce(greeting) {
  console.log(`${greeting}, I'm ${this.name}`);
}

const user = { name: "Ali" };

introduce.call(user, "Hi"); // "Hi, I'm Ali"
introduce.apply(user, ["Hello"]); // "Hello, I'm Ali"

const boundIntroduce = introduce.bind(user);
boundIntroduce("Hey"); // "Hey, I'm Ali"

// ARROW FUNCTIONS - Lexical this
const outer = {
  name: "Outer",
  regular: function() {
    console.log(this.name); // "Outer"
    
    const inner = function() {
      console.log(this.name); // undefined (Window)
    };
    inner();
  },
  arrow: function() {
    console.log(this.name); // "Outer"
    
    const inner = () => {
      console.log(this.name); // "Outer" (inherits from parent)
    };
    inner();
  }
};

outer.regular();
outer.arrow();

// EVENT LISTENERS
class Counter {
  constructor() {
    this.count = 0;
    
    // Wrong - this = button element
    // button.addEventListener('click', function() {
    //   this.count++; // Error
    // });
    
    // Right - arrow function preserves this
    button.addEventListener('click', () => {
      this.count++;
    });
    
    // Or bind
    // button.addEventListener('click', this.handleClick.bind(this));
  }
}

// setTimeout/Interval
function Timer() {
  this.seconds = 0;
  
  // Arrow function preserves this
  setInterval(() => {
    this.seconds++;
    console.log(this.seconds);
  }, 1000);
}
```

### Q95: Design Patterns in JavaScript?
**Answer:** Common OOP patterns.

```javascript
// 1. SINGLETON PATTERN - Single instance
class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = "Connected";
    Database.instance = this;
  }
  
  query(sql) {
    console.log(`Executing: ${sql}`);
  }
}

const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true

// 2. FACTORY PATTERN - Create objects
class Car {
  constructor(type) {
    this.type = type;
  }
}

class CarFactory {
  static createCar(type) {
    switch(type) {
      case 'sedan':
        return new Sedan();
      case 'suv':
        return new SUV();
      default:
        return new Car(type);
    }
  }
}

// 3. OBSERVER PATTERN - Event handling
class Subject {
  constructor() {
    this.observers = [];
  }
  
  subscribe(observer) {
    this.observers.push(observer);
  }
  
  unsubscribe(observer) {
    this.observers = this.observers.filter(o => o !== observer);
  }
  
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}

class Observer {
  update(data) {
    console.log(`Received: ${data}`);
  }
}

const subject = new Subject();
const obs1 = new Observer();
subject.subscribe(obs1);
subject.notify("Hello");

// 4. MODULE PATTERN - Encapsulation
const CounterModule = (function() {
  let count = 0; // Private
  
  return {
    increment() {
      count++;
    },
    decrement() {
      count--;
    },
    getCount() {
      return count;
    }
  };
})();

CounterModule.increment();
console.log(CounterModule.getCount()); // 1

// 5. STRATEGY PATTERN - Interchangeable algorithms
class PaymentStrategy {
  pay(amount) {}
}

class CreditCardPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} via Credit Card`);
  }
}

class PayPalPayment extends PaymentStrategy {
  pay(amount) {
    console.log(`Paid ${amount} via PayPal`);
  }
}

class ShoppingCart {
  constructor(paymentStrategy) {
    this.paymentStrategy = paymentStrategy;
  }
  
  setPaymentStrategy(strategy) {
    this.paymentStrategy = strategy;
  }
  
  checkout(amount) {
    this.paymentStrategy.pay(amount);
  }
}

const cart = new ShoppingCart(new CreditCardPayment());
cart.checkout(100);
cart.setPaymentStrategy(new PayPalPayment());
cart.checkout(200);

// 6. DECORATOR PATTERN - Add functionality
class Coffee {
  cost() { return 5; }
}

class MilkDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() { return this.coffee.cost() + 2; }
}

class SugarDecorator {
  constructor(coffee) {
    this.coffee = coffee;
  }
  cost() { return this.coffee.cost() + 1; }
}

let myCoffee = new Coffee();
myCoffee = new MilkDecorator(myCoffee);
myCoffee = new SugarDecorator(myCoffee);
console.log(myCoffee.cost()); // 8
```

### Q96: Abstract Classes aur Interfaces (TypeScript)?
**Answer:** Abstraction contracts.

```typescript
// INTERFACE - Contract for shape
interface Flyable {
  fly(): void;
  maxAltitude: number;
}

interface Swimmable {
  swim(): void;
  maxDepth: number;
}

// Class implementing multiple interfaces
class Duck implements Flyable, Swimmable {
  maxAltitude = 100;
  maxDepth = 5;
  
  fly() {
    console.log("Duck flying");
  }
  
  swim() {
    console.log("Duck swimming");
  }
}

// ABSTRACT CLASS - Partial implementation
abstract class Animal {
  protected name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  // Abstract method - must be implemented
  abstract makeSound(): void;
  
  // Concrete method - can be inherited
  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m`);
  }
}

class Dog extends Animal {
  makeSound() {
    console.log("Woof!");
  }
  
  // Additional method
  fetch() {
    console.log(`${this.name} is fetching`);
  }
}

// Can't instantiate abstract class
// const animal = new Animal("Test"); // Error

const dog = new Dog("Buddy");
dog.makeSound(); // "Woof!"
dog.move(10); // "Buddy moved 10m"

// ABSTRACT CLASS with interface
interface Renderable {
  render(): string;
}

abstract class Component implements Renderable {
  protected props: any;
  
  constructor(props: any) {
    this.props = props;
  }
  
  abstract render(): string;
  
  componentDidMount() {
    console.log("Component mounted");
  }
}

class Button extends Component {
  render() {
    return `<button>${this.props.label}</button>`;
  }
}

// TYPE ALIAS vs INTERFACE
type Point = {
  x: number;
  y: number;
};

interface Point2 {
  x: number;
  y: number;
}

// Interface can extend, type can union
interface NamedPoint extends Point {
  name: string;
}

type ColoredPoint = Point & { color: string };
type Shape = Circle | Square; // Union with type
```

### Q97: SOLID Principles explain karo?
**Answer:** Five design principles for maintainable code.

```javascript
// S - SINGLE RESPONSIBILITY PRINCIPLE
// Bad: Multiple responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
  
  save() { /* Save to DB */ }
  sendEmail() { /* Send email */ }
  validate() { /* Validate data */ }
}

// Good: Separate responsibilities
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }
}

class UserRepository {
  save(user) { /* Save to DB */ }
}

class EmailService {
  send(user, message) { /* Send email */ }
}

class UserValidator {
  validate(user) { /* Validate */ }
}

// O - OPEN/CLOSED PRINCIPLE
// Bad: Modify existing code for new features
class AreaCalculator {
  calculate(shape, type) {
    if (type === 'circle') {
      return Math.PI * shape.radius ** 2;
    } else if (type === 'square') {
      return shape.side ** 2;
    }
  }
}

// Good: Extend without modifying
class Shape {
  area() {
    throw new Error("Must implement area()");
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

class Square extends Shape {
  constructor(side) {
    super();
    this.side = side;
  }
  area() {
    return this.side ** 2;
  }
}

class AreaCalculator {
  calculate(shape) {
    return shape.area();
  }
}

// L - LISKOV SUBSTITUTION PRINCIPLE
// Bad: Subclass breaks parent contract
class Bird {
  fly() {
    console.log("Flying");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Penguins can't fly!");
  }
}

// Good: Proper hierarchy
class Bird {
  move() {
    console.log("Moving");
  }
}

class FlyingBird extends Bird {
  fly() {
    console.log("Flying");
  }
}

class SwimmingBird extends Bird {
  swim() {
    console.log("Swimming");
  }
}

class Penguin extends SwimmingBird { }
class Eagle extends FlyingBird { }

// I - INTERFACE SEGREGATION PRINCIPLE
// Bad: Fat interface
class Worker {
  work() {}
  eat() {}
  sleep() {}
}

class Human implements Worker {
  work() {}
  eat() {}
  sleep() {}
}

class Robot implements Worker {
  work() {}
  eat() { throw new Error("Robots don't eat!"); }
  sleep() { throw new Error("Robots don't sleep!"); }
}

// Good: Segregated interfaces
interface Workable {
  work(): void;
}

interface Eatable {
  eat(): void;
}

interface Sleepable {
  sleep(): void;
}

class Human implements Workable, Eatable, Sleepable {
  work() {}
  eat() {}
  sleep() {}
}

class Robot implements Workable {
  work() {}
}

// D - DEPENDENCY INVERSION PRINCIPLE
// Bad: Depend on concrete classes
class MySQLDatabase {
  connect() { }
  query(sql) { }
}

class UserService {
  constructor() {
    this.db = new MySQLDatabase(); // Tight coupling
  }
}

// Good: Depend on abstractions
class Database {
  connect() { }
  query(sql) { }
}

class MySQLDatabase extends Database { }
class PostgresDatabase extends Database { }

class UserService {
  constructor(database) {
    this.db = database; // Dependency injection
  }
}

const service = new UserService(new MySQLDatabase());
```

### Q98: Composition over Inheritance?
**Answer:** Favor composition for flexibility.

```javascript
// INHERITANCE (Can lead to rigid hierarchies)
class Animal {
  eat() { console.log("Eating"); }
}

class Mammal extends Animal {
  walk() { console.log("Walking"); }
}

class Dog extends Mammal {
  bark() { console.log("Barking"); }
}

class FlyingMammal extends Mammal {
  fly() { console.log("Flying"); }
}

class Bat extends FlyingMammal {
  // Problem: Bats are not typical mammals
}

// COMPOSITION (Flexible, reusable)
const EatBehavior = {
  eat() {
    console.log("Eating");
  }
};

const WalkBehavior = {
  walk() {
    console.log("Walking");
  }
};

const FlyBehavior = {
  fly() {
    console.log("Flying");
  }
};

const BarkBehavior = {
  bark() {
    console.log("Barking");
  }
};

// Object.assign for composition
const dog = {
  name: "Buddy",
  ...EatBehavior,
  ...WalkBehavior,
  ...BarkBehavior
};

const bird = {
  name: "Tweety",
  ...EatBehavior,
  ...FlyBehavior
};

// Function composition
function compose(...functions) {
  return function(arg) {
    return functions.reduceRight((acc, fn) => fn(acc), arg);
  };
}

const withEating = (obj) => ({ ...obj, eat: EatBehavior.eat });
const withWalking = (obj) => ({ ...obj, walk: WalkBehavior.walk });
const withFlying = (obj) => ({ ...obj, fly: FlyBehavior.fly });

const createBird = compose(withFlying, withEating);
const bird2 = createBird({ name: "Eagle" });

// Mixin pattern
function canFly(target) {
  return class extends target {
    fly() {
      console.log(`${this.name} is flying`);
    }
  };
}

function canSwim(target) {
  return class extends target {
    swim() {
      console.log(`${this.name} is swimming`);
    }
  };
}

class Bird {
  constructor(name) {
    this.name = name;
  }
}

class Duck extends canSwim(canFly(Bird)) { }

const duck = new Duck("Donald");
duck.fly();
duck.swim();

// React HOC example (Composition)
function withLogging(WrappedComponent) {
  return function(props) {
    console.log(`Rendering ${WrappedComponent.name}`);
    return <WrappedComponent {...props} />;
  };
}

function withAuthentication(WrappedComponent) {
  return function(props) {
    if (!isAuthenticated) return <Login />;
    return <WrappedComponent {...props} />;
  };
}

// Compose multiple HOCs
const EnhancedComponent = withLogging(
  withAuthentication(MyComponent)
);
```

### Q99: Closures in OOP context?
**Answer:** Using closures for encapsulation.

```javascript
// Module pattern with closures
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
    reset: () => { count = 0; }
  };
}

const counter = createCounter();
counter.increment();
console.log(counter.getCount()); // 1
// count is not accessible directly

// Factory function with private methods
function createBankAccount(initialBalance) {
  let balance = initialBalance;
  
  function validateAmount(amount) {
    return amount > 0 && amount <= balance;
  }
  
  function logTransaction(type, amount) {
    console.log(`${type}: $${amount}`);
  }
  
  return {
    deposit(amount) {
      if (amount > 0) {
        balance += amount;
        logTransaction("Deposit", amount);
      }
    },
    
    withdraw(amount) {
      if (validateAmount(amount)) {
        balance -= amount;
        logTransaction("Withdrawal", amount);
      }
    },
    
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
account.deposit(500);
account.withdraw(200);
console.log(account.getBalance()); // 1300

// WeakMap for true privacy
const _privateData = new WeakMap();

class SecureClass {
  constructor(secret) {
    _privateData.set(this, { secret });
  }
  
  getSecret() {
    return _privateData.get(this).secret;
  }
  
  setSecret(value) {
    _privateData.get(this).secret = value;
  }
}

const obj = new SecureClass("my-secret");
console.log(obj.getSecret()); // "my-secret"
// obj.secret is undefined (truly private)

// Revealing Module Pattern
const Calculator = (function() {
  let result = 0;
  
  function add(x) {
    result += x;
    return this;
  }
  
  function subtract(x) {
    result -= x;
    return this;
  }
  
  function multiply(x) {
    result *= x;
    return this;
  }
  
  function getResult() {
    return result;
  }
  
  function reset() {
    result = 0;
    return this;
  }
  
  // Reveal public methods
  return {
    add,
    subtract,
    multiply,
    getResult,
    reset
  };
})();

Calculator.add(5).multiply(2).subtract(3);
console.log(Calculator.getResult()); // 7
```

### Q100: Modern JavaScript OOP best practices?
**Answer:** Current standards and patterns.

```javascript
// 1. Use Classes for stateful objects
class UserService {
  constructor(apiClient) {
    this.apiClient = apiClient;
  }
  
  async getUser(id) {
    return this.apiClient.get(`/users/${id}`);
  }
}

// 2. Prefer Composition over deep inheritance
// Bad
class SmartPhone extends Phone extends ElectronicDevice { }

// Good
class SmartPhone {
  constructor() {
    this.calling = new CallingModule();
    this.internet = new InternetModule();
    this.camera = new CameraModule();
  }
}

// 3. Use # for private fields
class Account {
  #balance = 0;
  #password;
  
  constructor(password) {
    this.#password = password;
  }
  
  get balance() {
    return this.#balance;
  }
}

// 4. Static factory methods
class DateUtil {
  constructor(date) {
    this.date = date;
  }
  
  static now() {
    return new DateUtil(new Date());
  }
  
  static fromTimestamp(ts) {
    return new DateUtil(new Date(ts));
  }
}

const today = DateUtil.now();

// 5. Use getters/setters for computed properties
class Product {
  constructor(price, taxRate) {
    this.price = price;
    this.taxRate = taxRate;
  }
  
  get totalPrice() {
    return this.price * (1 + this.taxRate);
  }
  
  set price(value) {
    if (value < 0) throw new Error("Price can't be negative");
    this._price = value;
  }
  
  get price() {
    return this._price;
  }
}

// 6. Async methods in classes
class DataFetcher {
  constructor(url) {
    this.url = url;
  }
  
  async fetch() {
    const response = await fetch(this.url);
    return response.json();
  }
  
  async *fetchStream() {
    const response = await fetch(this.url);
    const reader = response.body.getReader();
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      yield value;
    }
  }
}

// 7. Immutability patterns
class ImmutablePoint {
  constructor(x, y) {
    Object.freeze(this);
    Object.freeze(this);
    this.x = x;
    this.y = y;
  }
  
  move(dx, dy) {
    return new ImmutablePoint(this.x + dx, this.y + dy);
  }
}

// 8. Mixins for shared behavior
const TimestampMixin = {
  createdAt: null,
  updatedAt: null,
  
  touch() {
    this.updatedAt = new Date();
  },
  
  initialize() {
    this.createdAt = new Date();
    this.touch();
  }
};

class Post {
  constructor(content) {
    this.content = content;
    Object.assign(this, TimestampMixin);
    this.initialize();
  }
}

// 9. Event Emitters pattern
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }
  
  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
  
  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    }
  }
}

// 10. Dependency Injection
class Logger {
  log(message) {
    console.log(`[LOG]: ${message}`);
  }
}

class Application {
  constructor(logger) {
    this.logger = logger;
  }
  
  run() {
    this.logger.log("Application started");
  }
}

const app = new Application(new Logger());
app.run();
```

---

## **CONCLUSION**

Yeh 100 questions aur unke detailed answers aapko Frontend Developer interview ki mukammal tayari mein madad karenge. Har topic ko ache se samjhein aur code examples ko practice karein.

### Quick Revision Tips:
1. **JavaScript**: Closures, Promises, Event Loop, `this` binding
2. **React**: Hooks lifecycle, State management, Performance optimization
3. **Next.js**: SSR/SSG, App Router, Server Components, API Routes
4. **TanStack Query**: Caching, Mutations, Infinite queries
5. **Tailwind**: Responsive utilities, Customization, Dark mode
6. **CSS**: Flexbox, Grid, Animations, Specificity
7. **OOP**: SOLID principles, Design patterns, Prototypes

Best of luck for your oral test! 🚀

