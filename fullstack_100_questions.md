# 100 Full-Stack Developer Interview Questions & Answers

A comprehensive collection of 100 questions covering Frontend, Backend, React, Next.js, NestJS, MongoDB, Node.js, and JavaScript DSA.

---

## Table of Contents
1. [JavaScript Core & DSA](#1-javascript-core--dsa)
2. [React](#2-react)
3. [Next.js](#3-nextjs)
4. [Node.js](#4-nodejs)
5. [NestJS](#5-nestjs)
6. [MongoDB](#6-mongodb)
7. [Frontend General](#7-frontend-general)
8. [Backend General & System Design](#8-backend-general--system-design)

---

## 1. JavaScript Core & DSA

### Q1: What is the difference between `let`, `const`, and `var`?
**Answer:**
- `var`: Function-scoped, hoisted with initialization `undefined`. Can be re-declared.
- `let`: Block-scoped, hoisted but not initialized (Temporal Dead Zone). Cannot be re-declared in same scope.
- `const`: Block-scoped, must be initialized at declaration. Cannot be reassigned (though objects/arrays can be mutated).

```javascript
var x = 1; 
let y = 2; 
const z = 3;
// z = 4; // Error
```

### Q2: Explain Closures with an example.
**Answer:** A closure is a function that remembers its outer variables even when executed outside its original scope.
```javascript
function createCounter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

### Q3: What is the Event Loop?
**Answer:** The mechanism that handles asynchronous callbacks in JS. It pushes synchronous code to the Call Stack, offloads async operations to Web APIs, moves completed tasks to the Callback Queue, and pushes them to the Call Stack when the stack is empty.

### Q4: Difference between `==` and `===`?
**Answer:** `==` performs type coercion before comparison. `===` checks both value and type strictly.
```javascript
console.log(5 == "5"); // true
console.log(5 === "5"); // false
```

### Q5: How does `this` keyword work?
**Answer:** Depends on execution context:
- Global: `window` (or undefined in strict mode).
- Object method: The object itself.
- Constructor: The new instance.
- Arrow functions: Inherits `this` from surrounding lexical scope.

### Q6: Explain Prototypal Inheritance.
**Answer:** Objects inherit properties/methods from other objects via the prototype chain.
```javascript
const animal = { eats: true };
const rabbit = { jumps: true };
rabbit.__proto__ = animal;
console.log(rabbit.eats); // true (inherited)
```

### Q7: What are Promises and their states?
**Answer:** Objects representing eventual completion/failure of async operations. States: `Pending`, `Fulfilled`, `Rejected`.
```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Done"), 1000);
});
```

### Q8: Async/Await vs Promises?
**Answer:** `async/await` is syntactic sugar over Promises, making async code look synchronous.
```javascript
async function fetchData() {
  const res = await fetch('/api');
  return res.json();
}
```

### Q9: Implement `debounce` function.
**Answer:** Delays function execution until after wait time has elapsed since last call.
```javascript
function debounce(func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}
```

### Q10: Implement `currying`.
**Answer:** Transforming a function with multiple arguments into a sequence of functions each taking one argument.
```javascript
const add = (a) => (b) => a + b;
add(5)(3); // 8
```

### Q11: Reverse a string without built-in methods.
**Answer:**
```javascript
function reverse(str) {
  let rev = "";
  for (let char of str) rev = char + rev;
  return rev;
}
```

### Q12: Find duplicates in an array.
**Answer:**
```javascript
const findDuplicates = (arr) => arr.filter((item, index) => arr.indexOf(item) !== index);
```

### Q13: Flatten a nested array.
**Answer:**
```javascript
function flatten(arr) {
  return arr.reduce((acc, val) => 
    Array.isArray(val) ? acc.concat(flatten(val)) : acc.concat(val), []);
}
```

### Q14: What is Hoisting?
**Answer:** JS behavior where declarations (`var`, `function`) are moved to top of scope during compilation. `let`/`const` are hoisted but not initialized (TDZ).

### Q15: Explain `call`, `apply`, `bind`.
**Answer:** Methods to explicitly set `this`.
- `call(fn, arg1, arg2)`: Invokes immediately.
- `apply(fn, [args])`: Invokes immediately with array args.
- `bind(fn)`: Returns new function with bound `this`.

### Q16: Deep Clone an Object.
**Answer:**
```javascript
// Modern way
const clone = structuredClone(obj);
// Or JSON (loses functions/dates)
const clone = JSON.parse(JSON.stringify(obj));
```

### Q17: What is a Higher-Order Function?
**Answer:** A function that takes another function as argument or returns one. Example: `map`, `filter`, `reduce`.

### Q18: Explain Memoization.
**Answer:** Caching results of expensive function calls.
```javascript
function memoize(fn) {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) return cache[key];
    const res = fn(...args);
    cache[key] = res;
    return res;
  };
}
```

### Q19: Time Complexity of Binary Search?
**Answer:** O(log n). Requires sorted array.

### Q20: Difference between `null` and `undefined`?
**Answer:** `undefined` means variable declared but not assigned. `null` is an intentional absence of value.

---

## 2. React

### Q21: What is Virtual DOM?
**Answer:** Lightweight copy of real DOM. React compares V-DOM snapshots (diffing) and updates only changed nodes in real DOM (reconciliation).

### Q22: `useState` vs `useReducer`?
**Answer:** `useState` for simple state. `useReducer` for complex state logic involving multiple sub-values or next state depends on previous.

### Q23: Explain `useEffect` dependency array.
**Answer:** Controls when effect runs.
- `[]`: Runs once (mount).
- `[dep]`: Runs when `dep` changes.
- No array: Runs every render.

### Q24: What are Keys in Lists?
**Answer:** Unique identifiers helping React identify which items changed/added/removed. Should be stable (not index if list order changes).

### Q25: Controlled vs Uncontrolled Components?
**Answer:**
- Controlled: Form data handled by React state.
- Uncontrolled: Form data handled by DOM itself (using `ref`).

### Q26: What is Prop Drilling and how to avoid it?
**Answer:** Passing data through many layers. Avoid using Context API or State Management (Redux/Zustand).

### Q27: Explain `useMemo` and `useCallback`.
**Answer:**
- `useMemo`: Caches computed value.
- `useCallback`: Caches function definition to prevent re-creation on renders.

### Q28: What are Error Boundaries?
**Answer:** Class components catching JS errors in child component tree. Functional components cannot be error boundaries yet.

### Q29: Custom Hooks?
**Answer:** Reusable logic extracted into functions starting with `use`.
```javascript
function useLocalStorage(key, init) {
  const [val, setVal] = useState(() => localStorage.getItem(key) || init);
  useEffect(() => localStorage.setItem(key, val), [key, val]);
  return [val, setVal];
}
```

### Q30: React Fiber?
**Answer:** New reconciliation engine in React 16 enabling incremental rendering, pausing/resuming work for better performance.

### Q31: Strict Mode?
**Answer:** `<React.StrictMode>` highlights potential problems (deprecated APIs, side effects) in development only.

### Q32: Portals?
**Answer:** Render children into DOM node outside parent hierarchy. `ReactDOM.createPortal(child, container)`.

### Q33: Lazy Loading in React?
**Answer:** `React.lazy(() => import('./Component'))` combined with `<Suspense>`.

### Q34: Synthetic Events?
**Answer:** Cross-browser wrapper around native browser events ensuring consistent behavior.

### Q35: Difference between Shadow DOM and Virtual DOM?
**Answer:** Shadow DOM is browser tech for encapsulated CSS/markup (Web Components). Virtual DOM is JS concept for UI diffing.

---

## 3. Next.js

### Q36: SSR vs SSG vs ISR?
**Answer:**
- SSR (Server-Side Rendering): Page rendered on request (`getServerSideProps`).
- SSG (Static Site Generation): Pre-built at build time (`getStaticProps`).
- ISR (Incremental Static Regeneration): Updates static pages after build using `revalidate`.

### Q37: App Router vs Pages Router?
**Answer:** App Router (Next 13+) uses Server Components by default, nested layouts, and file-system routing in `app/`. Pages Router uses `pages/` and `getInitialProps`.

### Q38: What are Server Components?
**Answer:** Components rendered exclusively on server, reducing bundle size. Cannot use hooks/event listeners directly.

### Q39: How to handle API routes?
**Answer:** Create files in `pages/api` or `app/api/route.ts`. They run on serverless functions.

### Q40: Image Optimization in Next.js?
**Answer:** `<Image />` component automatically resizes, optimizes formats (WebP), and lazy loads images.

### Q41: Middleware in Next.js?
**Answer:** Code running before request completes. Used for auth, redirects, rewriting paths. Located in `middleware.ts`.

### Q42: `getStaticPaths` usage?
**Answer:** Specifies dynamic routes to pre-render during SSG.

### Q43: How to implement SEO in Next.js?
**Answer:** Metadata API in App Router (`export const metadata`) or `next/head` in Pages Router.

### Q44: Incremental Static Regeneration (ISR) example?
**Answer:**
```javascript
export async function getStaticProps() {
  return { props: { data }, revalidate: 60 }; // Revalidate every 60s
}
```

### Q45: Client Component directive?
**Answer:** `'use client'` at top of file marks component as Client-side (allows hooks, interactivity).

---

## 4. Node.js

### Q46: Single Threaded Nature?
**Answer:** Node uses single thread for JS execution but leverages libuv thread pool for I/O ops, enabling non-blocking concurrency.

### Q47: Event Emitter pattern?
**Answer:** Core module for pub/sub.
```javascript
const ee = new EventEmitter();
ee.on('event', () => console.log('Fired'));
ee.emit('event');
```

### Q48: Streams and Types?
**Answer:** Handle large data efficiently. Types: Readable, Writable, Duplex, Transform.

### Q49: Buffer?
**Answer:** Temporary memory storage for binary data.

### Q50: Cluster Module?
**Answer:** Spawns multiple worker processes to utilize multi-core systems.

### Q51: Middleware in Express?
**Answer:** Functions having access to req/res/next. Executed sequentially.
```javascript
app.use((req, res, next) => { console.log('Time:', Date.now()); next(); });
```

### Q52: Handling Uncaught Exceptions?
**Answer:** `process.on('uncaughtException', (err) => { ... })` and `unhandledRejection`.

### Q53: `package.json` lock file purpose?
**Answer:** `package-lock.json` ensures exact dependency versions across environments.

### Q54: CommonJS vs ES Modules?
**Answer:** CommonJS (`require/module.exports`) is default in Node. ES Modules (`import/export`) require `"type": "module"` or `.mjs`.

### Q55: Process vs Global?
**Answer:** `process` provides info/control over current Node process. `global` is global namespace (like `window`).

---

## 5. NestJS

### Q56: Dependency Injection in NestJS?
**Answer:** Core feature. Classes declare dependencies in constructor; Nest resolves and injects them automatically.

### Q57: Decorators usage?
**Answer:** Metadata attached to classes/methods. E.g., `@Controller()`, `@Get()`, `@Injectable()`.

### Q58: Modules?
**Answer:** Organizational unit grouping controllers, providers, imports. Defined by `@Module()`.

### Q59: Guards vs Interceptors vs Filters?
**Answer:**
- Guards: Authorization/Access control (`CanActivate`).
- Interceptors: Logic before/after request (mapping, logging).
- Filters: Exception handling.

### Q60: Pipes?
**Answer:** Transform/validate input data. E.g., `ValidationPipe`.

### Q61: Microservices support?
**Answer:** Built-in transporters (TCP, Redis, MQTT, gRPC) via `@nestjs/microservices`.

### Q62: Configuration Management?
**Answer:** `@nestjs/config` module loads env variables using `ConfigModule.forRoot()`.

### Q63: Testing in NestJS?
**Answer:** Uses Jest by default. Provides `TestingModule` for unit/integration testing.

### Q64: Lifecycle hooks?
**Answer:** `OnModuleInit`, `OnApplicationShutdown`, etc., triggered at specific app stages.

### Q65: Swagger Integration?
**Answer:** `@nestjs/swagger` auto-generates OpenAPI docs from decorators.

---

## 6. MongoDB

### Q66: Document Model?
**Answer:** Data stored as BSON (Binary JSON) documents. Flexible schema.

### Q67: Aggregation Pipeline?
**Answer:** Framework for data processing. Stages: `$match`, `$group`, `$sort`, `$lookup`.
```javascript
db.orders.aggregate([ { $match: { status: "A" } }, { $group: { _id: "$cust_id", total: { $sum: "$amount" } } } ])
```

### Q68: Indexing importance?
**Answer:** Speeds up queries. Without index, full collection scan occurs.

### Q69: Replication?
**Answer:** Maintains multiple copies of data (Primary/Secondaries) for redundancy/high availability.

### Q70: Sharding?
**Answer:** Horizontal scaling distributing data across multiple servers based on shard key.

### Q71: Mongoose ODM?
**Answer:** Library providing schema-based solution to model application data in Node.js.

### Q72: Embedded vs Referenced Documents?
**Answer:** Embed for one-to-few, tight coupling. Reference for one-to-many/many-to-many, independent growth.

### Q73: ACID in MongoDB?
**Answer:** Supports multi-document ACID transactions (v4.0+).

### Q74: `$lookup` operator?
**Answer:** Performs left outer join to another collection.

### Q75: TTL Indexes?
**Answer:** Automatically remove documents after specified time. Useful for sessions/logs.

---

## 7. Frontend General

### Q76: Critical Rendering Path?
**Answer:** Steps browser takes to convert HTML/CSS/JS to pixels: DOM -> CSSOM -> Render Tree -> Layout -> Paint.

### Q77: CORS?
**Answer:** Security feature restricting cross-origin resource requests. Server must send `Access-Control-Allow-Origin`.

### Q78: LocalStorage vs SessionStorage vs Cookies?
**Answer:**
- LocalStorage: Persistent, 5MB.
- SessionStorage: Tab-specific, cleared on close.
- Cookies: Sent with requests, small size (4KB), expiry settings.

### Q79: Content Security Policy (CSP)?
**Answer:** HTTP header preventing XSS by specifying allowed sources for scripts/styles.

### Q80: Reflow vs Repaint?
**Answer:** Reflow: Layout change (geometry). Repaint: Visual change (color) without layout. Reflow is costlier.

### Q81: Web Workers?
**Answer:** Run scripts in background threads to avoid blocking main UI thread.

### Q82: Service Workers?
**Answer:** Proxy between app and network. Enables offline caching, push notifications.

### Q83: Semantic HTML?
**Answer:** Using tags (`<article>`, `<nav>`, `<header>`) conveying meaning for SEO/Accessibility.

### Q84: Accessibility (a11y) basics?
**Answer:** ARIA labels, keyboard navigation, contrast ratios, alt text.

### Q85: CSS Specificity?
**Answer:** Hierarchy: Inline > ID > Class/Attr/Pseudo-class > Element.

---

## 8. Backend General & System Design

### Q86: REST vs GraphQL?
**Answer:** REST: Multiple endpoints, fixed structure, over/under-fetching possible. GraphQL: Single endpoint, client queries exact data.

### Q87: JWT Authentication flow?
**Answer:** User logs in -> Server signs token (HS256/RS256) -> Client stores token -> Sends in `Authorization` header -> Server verifies signature.

### Q88: SQL vs NoSQL?
**Answer:** SQL: Relational, schema-based, ACID. NoSQL: Non-relational, flexible schema, horizontal scaling.

### Q89: Horizontal vs Vertical Scaling?
**Answer:** Vertical: Add power to existing server. Horizontal: Add more servers.

### Q90: Load Balancer?
**Answer:** Distributes incoming traffic across servers to prevent overload.

### Q91: Caching Strategies?
**Answer:** Cache-aside, Write-through, Write-back, TTL-based. Tools: Redis, Memcached.

### Q92: Database Normalization?
**Answer:** Organizing data to reduce redundancy (1NF, 2NF, 3NF).

### Q93: CAP Theorem?
**Answer:** Distributed system can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance.

### Q94: Message Queues?
**Answer:** Async communication buffer (RabbitMQ, Kafka). Decouples services.

### Q95: Docker Containerization?
**Answer:** Packages app with dependencies into standardized units for software development.

### Q96: CI/CD Pipeline?
**Answer:** Automated process: Build -> Test -> Deploy.

### Q97: Rate Limiting?
**Answer:** Restrict number of requests user/IP can make. Prevents abuse/DDoS.

### Q98: Idempotency?
**Answer:** Operation producing same result regardless of how many times executed. Crucial for retries.

### Q99: WebSocket vs HTTP?
**Answer:** HTTP: Request-Response, stateless. WebSocket: Full-duplex persistent connection for real-time.

### Q100: Microservices vs Monolith?
**Answer:** Monolith: Single codebase/deployment. Microservices: Small independent services communicating via API. Pros: Scalability, tech diversity. Cons: Complexity, latency.

---

*End of 100 Questions.*
