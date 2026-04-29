# Frontend Interview Questions (50 Questions)

## Table of Contents
1. [JavaScript](#javascript)
2. [Object-Oriented Programming (OOP)](#object-oriented-programming-oop)
3. [Data Structures & Algorithms (DSA)](#data-structures--algorithms-dsa)
4. [React](#react)
5. [Tailwind CSS](#tailwind-css)
6. [CSS3](#css3)
7. [Frontend Security](#frontend-security)

---

## JavaScript

### 1. What is the difference between `let`, `const`, and `var`?
**Answer:** 
- `var`: Function-scoped, can be redeclared and updated, hoisted with initial value `undefined`.
- `let`: Block-scoped, cannot be redeclared in same scope, can be updated, hoisted but not initialized (Temporal Dead Zone).
- `const`: Block-scoped, cannot be redeclared or reassigned, must be initialized at declaration, hoisted but not initialized.

### 2. Explain the event loop in JavaScript.
**Answer:** The event loop is a mechanism that handles asynchronous callbacks. It continuously checks the call stack and the task queue. When the call stack is empty, it pushes tasks from the queue to the stack for execution. It also handles microtasks (promises) with higher priority than macrotasks (setTimeout).

### 3. What is a closure? Provide an example.
**Answer:** A closure is a function that retains access to its outer scope even after the outer function has returned.
```javascript
function outer() {
  let count = 0;
  return function inner() {
    count++;
    return count;
  };
}
const counter = outer();
console.log(counter()); // 1
console.log(counter()); // 2
```

### 4. What is the difference between `==` and `===`?
**Answer:** `==` performs type coercion before comparison, while `===` compares both value and type without coercion.

### 5. Explain `call`, `apply`, and `bind`.
**Answer:** 
- `call(fn, thisArg, arg1, arg2)`: Invokes function immediately with specified `this` and arguments.
- `apply(fn, thisArg, [args])`: Same as call but accepts arguments as an array.
- `bind(fn, thisArg, arg1)`: Returns a new function with bound `this` and partial arguments.

### 6. What are Promises? Explain the different states.
**Answer:** A Promise represents eventual completion/failure of async operation. States:
- **Pending**: Initial state
- **Fulfilled**: Operation completed successfully
- **Rejected**: Operation failed

### 7. What is async/await and how does it work?
**Answer:** `async/await` is syntactic sugar over Promises. `async` makes a function return a Promise, `await` pauses execution until Promise resolves.

### 8. Explain hoisting in JavaScript.
**Answer:** Hoisting is JavaScript's behavior of moving declarations to the top of their scope during compilation. Variables declared with `var` are hoisted and initialized with `undefined`, while `let` and `const` are hoisted but not initialized (TDZ).

### 9. What is the difference between `null` and `undefined`?
**Answer:** 
- `undefined`: Variable declared but not assigned a value
- `null`: Intentional absence of any object value (assigned by developer)

### 10. Explain the concept of `this` in JavaScript.
**Answer:** `this` refers to the context where a function is called:
- Global context: `window` (browser) or `global` (Node)
- Object method: The object itself
- Constructor: The new instance
- Arrow functions: Lexical `this` from enclosing scope
- Explicit binding: Value passed to `call`, `apply`, or `bind`

---

## Object-Oriented Programming (OOP)

### 11. What are the four pillars of OOP?
**Answer:** 
1. **Encapsulation**: Bundling data and methods, restricting direct access
2. **Abstraction**: Hiding complex implementation details
3. **Inheritance**: Creating new classes based on existing ones
4. **Polymorphism**: Objects taking multiple forms (method overriding/overloading)

### 12. How do you implement inheritance in JavaScript?
**Answer:** Using ES6 classes:
```javascript
class Animal {
  speak() { console.log('sound'); }
}
class Dog extends Animal {
  speak() { console.log('bark'); }
}
```

### 13. What is the difference between classical and prototypal inheritance?
**Answer:** 
- **Classical**: Classes define blueprints, objects are instances (Java, C++)
- **Prototypal**: Objects inherit directly from other objects via prototype chain (JavaScript)

### 14. Explain the prototype chain.
**Answer:** When accessing a property, JavaScript first checks the object itself, then its prototype, then the prototype's prototype, until reaching `null`. This chain is the prototype chain.

### 15. What is encapsulation and how do you achieve it in JavaScript?
**Answer:** Encapsulation hides internal state and requires interaction through methods. Achieved via:
- Closures
- Private fields (`#fieldName`)
- WeakMaps
- Symbols

### 16. What is polymorphism? Give an example.
**Answer:** Polymorphism allows objects to be treated as instances of their parent class. Example:
```javascript
class Shape { area() {} }
class Circle extends Shape { area() { return Math.PI * r * r; } }
class Square extends Shape { area() { return side * side; } }
```

### 17. What are getter and setter methods?
**Answer:** Special methods to control access to properties:
```javascript
class Person {
  get name() { return this._name; }
  set name(value) { 
    if (value) this._name = value; 
  }
}
```

### 18. What is the difference between static and instance methods?
**Answer:** 
- **Instance methods**: Called on instances, have access to `this`
- **Static methods**: Called on the class itself, no access to instance `this`

### 19. Explain the concept of abstraction in OOP.
**Answer:** Abstraction hides complex implementation details and shows only essential features. Achieved through abstract classes, interfaces, or hiding private methods.

### 20. What is composition over inheritance?
**Answer:** Composition favors building objects by combining simpler objects rather than inheriting from classes. More flexible and avoids deep inheritance hierarchies.

---

## Data Structures & Algorithms (DSA)

### 21. How do you reverse a string in JavaScript?
**Answer:** 
```javascript
// Method 1
str.split('').reverse().join('');
// Method 2
[...str].reverse().join('');
```

### 22. How do you check if a string is a palindrome?
**Answer:** 
```javascript
function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}
```

### 23. Explain time complexity and Big O notation.
**Answer:** Big O describes the upper bound of algorithm performance relative to input size. Common complexities: O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ).

### 24. How do you find duplicates in an array?
**Answer:** 
```javascript
// Using Set
const duplicates = arr.filter((item, index) => arr.indexOf(item) !== index);
// Or
const seen = new Set();
const duplicates = arr.filter(item => seen.has(item) || !seen.add(item));
```

### 25. Implement a function to flatten a nested array.
**Answer:** 
```javascript
// Recursive
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
// Built-in
arr.flat(Infinity);
```

### 26. How do you implement a debounce function?
**Answer:** 
```javascript
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
```

### 27. Explain the difference between BFS and DFS.
**Answer:** 
- **BFS (Breadth-First Search)**: Explores level by level using a queue
- **DFS (Depth-First Search)**: Explores depth-first using recursion or stack

### 28. How do you find the maximum element in an array?
**Answer:** 
```javascript
Math.max(...arr);
// Or
arr.reduce((max, curr) => curr > max ? curr : max, arr[0]);
```

### 29. Implement binary search.
**Answer:** 
```javascript
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
```

### 30. How do you remove duplicates from an array?
**Answer:** 
```javascript
[...new Set(arr)];
// Or
arr.filter((item, index) => arr.indexOf(item) === index);
```

---

## React

### 31. What is the Virtual DOM and how does it work?
**Answer:** Virtual DOM is a lightweight copy of the real DOM. When state changes, React creates a new VDOM, compares it with previous version (diffing), and updates only changed parts in real DOM (reconciliation).

### 32. Explain the difference between state and props.
**Answer:** 
- **Props**: Read-only, passed from parent to child, immutable within component
- **State**: Mutable, managed within component, triggers re-render when changed

### 33. What are React Hooks? Name some built-in hooks.
**Answer:** Hooks are functions that let you use state and lifecycle features in functional components. Built-in hooks: `useState`, `useEffect`, `useContext`, `useReducer`, `useMemo`, `useCallback`, `useRef`, `useLayoutEffect`.

### 34. Explain the useEffect hook and its dependency array.
**Answer:** `useEffect` handles side effects. Dependency array controls execution:
- `[]`: Runs once on mount
- `[dep]`: Runs when `dep` changes
- No array: Runs on every render
- Return cleanup function for unmount

### 35. What is prop drilling and how do you avoid it?
**Answer:** Prop drilling is passing props through multiple intermediate components. Avoid with:
- Context API
- State management libraries (Redux, Zustand)
- Component composition

### 36. What is the difference between controlled and uncontrolled components?
**Answer:** 
- **Controlled**: Form data handled by React state
- **Uncontrolled**: Form data handled by DOM itself, accessed via refs

### 37. Explain React's reconciliation process.
**Answer:** Reconciliation is React's diffing algorithm that compares VDOM trees to determine minimal updates needed. Uses heuristics like element type comparison and key props for lists.

### 38. What are keys in React and why are they important?
**Answer:** Keys help React identify which items changed, were added, or removed. Should be stable, unique IDs (not array indices) for optimal performance.

### 39. What is the difference between useMemo and useCallback?
**Answer:** 
- `useMemo`: Memoizes computed values
- `useCallback`: Memoizes function references
Both prevent unnecessary recalculations/re-renders.

### 40. How do you handle errors in React?
**Answer:** 
- Error Boundaries (class components with `getDerivedStateFromError`)
- Try-catch in async operations
- Global error handlers
- Libraries like React Query with built-in error handling

---

## Tailwind CSS

### 41. What is Tailwind CSS and how does it differ from traditional CSS?
**Answer:** Tailwind is a utility-first CSS framework providing low-level utility classes. Unlike traditional CSS (semantic class names), Tailwind uses composable utilities directly in HTML.

### 42. How do you customize Tailwind's default theme?
**Answer:** Modify `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: { custom: '#123456' },
      spacing: { '128': '32rem' }
    }
  }
}
```

### 43. Explain responsive design in Tailwind.
**Answer:** Use breakpoint prefixes: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`. Mobile-first approach (unprefixed = mobile, prefixed = larger screens).

### 44. How do you handle hover, focus, and other pseudo-classes?
**Answer:** Prefix utilities: `hover:bg-blue-500`, `focus:ring-2`, `active:scale-95`, `disabled:opacity-50`.

### 45. What is the `@apply` directive and when should you use it?
**Answer:** `@apply` extracts repeated utilities into custom CSS classes. Use sparingly for DRY code, but prefer inline utilities for maintainability.

### 46. How do you implement dark mode in Tailwind?
**Answer:** Enable in config, then use `dark:` prefix:
```javascript
// tailwind.config.js
darkMode: 'class' // or 'media'
```
```html
<div class="bg-white dark:bg-gray-800">
```

### 47. Explain Tailwind's JIT (Just-In-Time) mode.
**Answer:** JIT generates styles on-demand during build, enabling arbitrary values, faster builds, and smaller CSS files by purging unused styles.

### 48. How do you create custom utilities in Tailwind?
**Answer:** Add to `tailwind.config.js`:
```javascript
plugins: [
  function({ addUtilities }) {
    addUtilities({
      '.text-shadow': { 'text-shadow': '0 2px 4px rgba(0,0,0,0.5)' }
    });
  }
]
```

---

## CSS3

### 49. Explain the CSS box model.
**Answer:** Every element is a box with: content → padding → border → margin. `box-sizing: border-box` includes padding/border in width/height calculations.

### 50. What is the difference between Flexbox and Grid?
**Answer:** 
- **Flexbox**: One-dimensional layout (row OR column), ideal for alignment and distribution
- **Grid**: Two-dimensional layout (rows AND columns), ideal for complex layouts

### 51. How do you center an element horizontally and vertically?
**Answer:** 
```css
/* Flexbox */
display: flex; justify-content: center; align-items: center;
/* Grid */
display: grid; place-items: center;
/* Absolute positioning */
position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
```

### 52. Explain CSS specificity and how it's calculated.
**Answer:** Specificity determines which rule applies. Calculation: inline styles (1000) > IDs (100) > classes/attributes/pseudo-classes (10) > elements/pseudo-elements (1).

### 53. What are CSS custom properties (variables)?
**Answer:** Custom properties store reusable values:
```css
:root { --primary-color: #3498db; }
.element { color: var(--primary-color); }
```

### 54. Explain the difference between `display: none`, `visibility: hidden`, and `opacity: 0`.
**Answer:** 
- `display: none`: Removes from layout, not accessible
- `visibility: hidden`: Hidden but occupies space, not accessible
- `opacity: 0`: Visible in layout, accessible, can receive events

### 55. What are CSS transitions and animations?
**Answer:** 
- **Transitions**: Smooth changes between states (`transition: property duration`)
- **Animations**: Keyframe-based sequences (`@keyframes`, `animation` property)

### 56. How do you create a responsive image?
**Answer:** 
```css
img { max-width: 100%; height: auto; }
/* Or use srcset */
<img srcset="small.jpg 500w, large.jpg 1000w" sizes="(max-width: 600px) 500px, 1000px">
```

### 57. Explain CSS positioning (static, relative, absolute, fixed, sticky).
**Answer:** 
- `static`: Default, normal flow
- `relative`: Positioned relative to itself
- `absolute`: Relative to nearest positioned ancestor
- `fixed`: Relative to viewport
- `sticky`: Toggles between relative and fixed based on scroll

### 58. What is the `z-index` property and when does it work?
**Answer:** Controls stacking order of positioned elements. Only works on elements with `position` other than `static`. Higher values appear on top.

---

## Frontend Security

### 59. What is XSS (Cross-Site Scripting) and how do you prevent it?
**Answer:** XSS injects malicious scripts into web pages. Prevention:
- Escape/sanitize user input
- Use Content Security Policy (CSP)
- Avoid `innerHTML`, use `textContent`
- Frameworks like React auto-escape by default

### 60. Explain CSRF (Cross-Site Request Forgery) and mitigation.
**Answer:** CSRF tricks users into executing unwanted actions. Mitigation:
- CSRF tokens
- SameSite cookie attribute
- Verify Origin/Referer headers
- Require authentication for sensitive actions

### 61. What is Content Security Policy (CSP)?
**Answer:** CSP is an HTTP header that prevents XSS by whitelisting allowed sources for scripts, styles, images, etc. Example: `Content-Security-Policy: script-src 'self'`.

### 62. How do you securely store sensitive data on the client?
**Answer:** 
- Avoid storing sensitive data client-side
- Use HttpOnly, Secure, SameSite cookies for tokens
- Never store in localStorage/sessionStorage (XSS vulnerable)
- Encrypt if absolutely necessary

### 63. What are HttpOnly and Secure cookie flags?
**Answer:** 
- `HttpOnly`: Prevents JavaScript access (mitigates XSS)
- `Secure`: Only sent over HTTPS
- `SameSite`: Prevents CSRF (Strict/Lax/None)

### 64. Explain Clickjacking and prevention.
**Answer:** Clickjacking tricks users into clicking hidden elements. Prevention:
- `X-Frame-Options: DENY` or `SAMEORIGIN`
- CSP `frame-ancestors` directive
- Frame-busting JavaScript

### 65. What is CORS and how does it relate to security?
**Answer:** CORS (Cross-Origin Resource Sharing) controls cross-origin requests. Proper configuration prevents unauthorized access. Never use `Access-Control-Allow-Origin: *` with credentials.

### 66. How do you prevent SQL injection in frontend applications?
**Answer:** While primarily backend concern, frontend should:
- Validate input before sending
- Use parameterized queries (backend)
- Never construct SQL from user input
- Sanitize all user inputs

### 67. What is the importance of input validation?
**Answer:** Input validation ensures data integrity and prevents attacks. Validate on both client (UX) and server (security). Use allowlists, validate types, lengths, formats.

### 68. Explain the principle of least privilege in frontend context.
**Answer:** Users and processes should have minimum necessary permissions. Implement role-based access control, hide sensitive features, validate permissions server-side.

---

## Bonus: Practical Scenarios

### 69. How would you optimize a slow React application?
**Answer:** 
- Use `React.memo` for component memoization
- Implement code splitting with `lazy()` and `Suspense`
- Optimize images and assets
- Virtualize long lists
- Debounce/throttle expensive operations
- Profile with React DevTools

### 70. Describe your approach to debugging a production issue.
**Answer:** 
1. Reproduce the issue
2. Check error logs and monitoring tools
3. Use browser DevTools (Console, Network, Sources)
4. Add temporary logging
5. Test in different environments
6. Review recent changes
7. Implement fix with tests
