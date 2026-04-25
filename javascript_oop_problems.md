# 25 JavaScript and OOP Problems with Solutions

## Problem 1: Create a Class with Constructor
**Problem:** Create a `Person` class with properties `name` and `age`, and a method `greet()` that returns a greeting string.

**Solution:**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name} and I'm ${this.age} years old.`;
  }
}

// Usage
const person = new Person('Alice', 30);
console.log(person.greet()); // Hello, my name is Alice and I'm 30 years old.
```

---

## Problem 2: Implement Inheritance
**Problem:** Create a `Student` class that extends `Person` and adds a `grade` property and a `study()` method.

**Solution:**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hello, my name is ${this.name}`;
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    return `${this.name} is studying in grade ${this.grade}`;
  }

  // Override parent method
  greet() {
    return `${super.greet()} and I'm a student.`;
  }
}

// Usage
const student = new Student('Bob', 16, 10);
console.log(student.greet()); // Hello, my name is Bob and I'm a student.
console.log(student.study()); // Bob is studying in grade 10
```

---

## Problem 3: Encapsulation with Private Fields
**Problem:** Create a `BankAccount` class with private balance field and public methods to deposit, withdraw, and check balance.

**Solution:**
```javascript
class BankAccount {
  #balance; // Private field

  constructor(initialBalance = 0) {
    this.#balance = initialBalance;
  }

  deposit(amount) {
    if (amount > 0) {
      this.#balance += amount;
      return true;
    }
    return false;
  }

  withdraw(amount) {
    if (amount > 0 && amount <= this.#balance) {
      this.#balance -= amount;
      return true;
    }
    return false;
  }

  getBalance() {
    return this.#balance;
  }
}

// Usage
const account = new BankAccount(100);
account.deposit(50);
console.log(account.getBalance()); // 150
account.withdraw(30);
console.log(account.getBalance()); // 120
// console.log(account.#balance); // Error: Private field
```

---

## Problem 4: Static Methods and Properties
**Problem:** Create a `MathUtils` class with static methods for common operations and a static property.

**Solution:**
```javascript
class MathUtils {
  static PI = Math.PI;

  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) throw new Error('Division by zero');
    return a / b;
  }
}

// Usage
console.log(MathUtils.PI); // 3.14159...
console.log(MathUtils.add(5, 3)); // 8
console.log(MathUtils.multiply(4, 7)); // 28
```

---

## Problem 5: Getters and Setters
**Problem:** Create a `Rectangle` class with getters and setters for width and height, and a computed area property.

**Solution:**
```javascript
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get width() {
    return this._width;
  }

  set width(value) {
    if (value > 0) {
      this._width = value;
    } else {
      throw new Error('Width must be positive');
    }
  }

  get height() {
    return this._height;
  }

  set height(value) {
    if (value > 0) {
      this._height = value;
    } else {
      throw new Error('Height must be positive');
    }
  }

  get area() {
    return this._width * this._height;
  }
}

// Usage
const rect = new Rectangle(5, 10);
console.log(rect.area); // 50
rect.width = 8;
console.log(rect.area); // 80
```

---

## Problem 6: Method Chaining
**Problem:** Create a `Calculator` class that supports method chaining for operations.

**Solution:**
```javascript
class Calculator {
  constructor() {
    this.result = 0;
  }

  add(value) {
    this.result += value;
    return this;
  }

  subtract(value) {
    this.result -= value;
    return this;
  }

  multiply(value) {
    this.result *= value;
    return this;
  }

  divide(value) {
    if (value === 0) throw new Error('Division by zero');
    this.result /= value;
    return this;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
    return this;
  }
}

// Usage
const calc = new Calculator();
const result = calc.add(10).multiply(2).subtract(5).divide(3).getResult();
console.log(result); // 5
```

---

## Problem 7: Abstract Class Pattern
**Problem:** Create an abstract-like `Shape` class with an abstract `area()` method that must be implemented by subclasses.

**Solution:**
```javascript
class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error('Shape is an abstract class and cannot be instantiated');
    }
  }

  area() {
    throw new Error('Method "area()" must be implemented');
  }

  perimeter() {
    throw new Error('Method "perimeter()" must be implemented');
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

  perimeter() {
    return 2 * Math.PI * this.radius;
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

  perimeter() {
    return 4 * this.side;
  }
}

// Usage
const circle = new Circle(5);
console.log(circle.area()); // 78.54

const square = new Square(4);
console.log(square.area()); // 16

// const shape = new Shape(); // Error: Cannot instantiate abstract class
```

---

## Problem 8: Composition over Inheritance
**Problem:** Create a `Car` class using composition instead of inheritance, with engine and wheels as separate objects.

**Solution:**
```javascript
class Engine {
  constructor(horsepower) {
    this.horsepower = horsepower;
  }

  start() {
    return 'Engine started';
  }

  stop() {
    return 'Engine stopped';
  }
}

class Wheel {
  constructor(size) {
    this.size = size;
  }

  rotate() {
    return 'Wheel rotating';
  }
}

class Car {
  constructor(engine, wheels) {
    this.engine = engine;
    this.wheels = wheels;
  }

  drive() {
    return `${this.engine.start()} - ${this.wheels.map(w => w.rotate()).join(', ')}`;
  }

  park() {
    return this.engine.stop();
  }
}

// Usage
const engine = new Engine(200);
const wheels = [new Wheel(18), new Wheel(18), new Wheel(18), new Wheel(18)];
const car = new Car(engine, wheels);
console.log(car.drive()); // Engine started - Wheel rotating, Wheel rotating, ...
console.log(car.park()); // Engine stopped
```

---

## Problem 9: Singleton Pattern
**Problem:** Implement a Singleton pattern for a `Database` class that ensures only one instance exists.

**Solution:**
```javascript
class Database {
  static instance = null;

  constructor() {
    if (Database.instance) {
      return Database.instance;
    }
    this.connection = null;
    Database.instance = this;
  }

  connect() {
    if (!this.connection) {
      this.connection = 'Connected to database';
      console.log(this.connection);
    }
    return this.connection;
  }

  disconnect() {
    this.connection = null;
    console.log('Disconnected from database');
  }
}

// Usage
const db1 = new Database();
const db2 = new Database();
console.log(db1 === db2); // true - Same instance
db1.connect(); // Connected to database
db2.connect(); // No new connection message
```

---

## Problem 10: Factory Pattern
**Problem:** Create a factory function that creates different types of user objects based on input.

**Solution:**
```javascript
class Admin {
  constructor(name, permissions) {
    this.name = name;
    this.permissions = permissions;
    this.role = 'admin';
  }

  canAccess(resource) {
    return this.permissions.includes(resource);
  }
}

class Guest {
  constructor(name) {
    this.name = name;
    this.role = 'guest';
  }

  canAccess() {
    return false;
  }
}

class Member {
  constructor(name, membershipLevel) {
    this.name = name;
    this.membershipLevel = membershipLevel;
    this.role = 'member';
  }

  canAccess(resource) {
    return ['basic', 'premium'].includes(resource);
  }
}

class UserFactory {
  static createUser(type, name, options = {}) {
    switch (type.toLowerCase()) {
      case 'admin':
        return new Admin(name, options.permissions || []);
      case 'guest':
        return new Guest(name);
      case 'member':
        return new Member(name, options.level || 'basic');
      default:
        throw new Error('Unknown user type');
    }
  }
}

// Usage
const admin = UserFactory.createUser('admin', 'Alice', { permissions: ['all'] });
const guest = UserFactory.createUser('guest', 'Bob');
const member = UserFactory.createUser('member', 'Charlie', { level: 'premium' });

console.log(admin.role); // admin
console.log(guest.role); // guest
console.log(member.role); // member
```

---

## Problem 11: Observer Pattern
**Problem:** Implement an Observer pattern where multiple observers can subscribe to and receive updates from a subject.

**Solution:**
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
const subject = new Subject();
const observer1 = new Observer('Observer 1');
const observer2 = new Observer('Observer 2');
const observer3 = new Observer('Observer 3');

subject.subscribe(observer1);
subject.subscribe(observer2);
subject.subscribe(observer3);

subject.notify('First notification');
// Observer 1 received: First notification
// Observer 2 received: First notification
// Observer 3 received: First notification

subject.unsubscribe(observer2);
subject.notify('Second notification');
// Observer 1 received: Second notification
// Observer 3 received: Second notification
```

---

## Problem 12: Module Pattern
**Problem:** Create a module using IIFE (Immediately Invoked Function Expression) with private and public members.

**Solution:**
```javascript
const CounterModule = (function() {
  // Private variables
  let count = 0;
  let history = [];

  // Private methods
  function log(action) {
    history.push(`${action} at ${new Date().toISOString()}`);
  }

  // Public API
  return {
    increment() {
      count++;
      log('incremented');
      return count;
    },

    decrement() {
      count--;
      log('decremented');
      return count;
    },

    getCount() {
      return count;
    },

    getHistory() {
      return [...history];
    },

    reset() {
      count = 0;
      history = [];
      log('reset');
    }
  };
})();

// Usage
CounterModule.increment(); // 1
CounterModule.increment(); // 2
CounterModule.decrement(); // 1
console.log(CounterModule.getCount()); // 1
console.log(CounterModule.getHistory()); // Shows history
```

---

## Problem 13: Prototype Chain Manipulation
**Problem:** Create objects using prototypes and demonstrate prototype chain manipulation.

**Solution:**
```javascript
// Base prototype
const animalPrototype = {
  eat() {
    return `${this.name} is eating`;
  },

  sleep() {
    return `${this.name} is sleeping`;
  }
};

// Extended prototype
const dogPrototype = Object.create(animalPrototype);
dogPrototype.bark = function() {
  return `${this.name} is barking`;
};

dogPrototype.fetch = function(item) {
  return `${this.name} is fetching ${item}`;
};

// Create instances
function createDog(name) {
  const dog = Object.create(dogPrototype);
  dog.name = name;
  return dog;
}

// Usage
const myDog = createDog('Buddy');
console.log(myDog.eat()); // Buddy is eating
console.log(myDog.bark()); // Buddy is barking
console.log(myDog.fetch('ball')); // Buddy is fetching ball
console.log(myDog.sleep()); // Buddy is sleeping

// Verify prototype chain
console.log(Object.getPrototypeOf(myDog) === dogPrototype); // true
console.log(Object.getPrototypeOf(dogPrototype) === animalPrototype); // true
```

---

## Problem 14: Mixin Pattern
**Problem:** Create mixins to add functionality to classes without inheritance.

**Solution:**
```javascript
// Mixins
const LoggerMixin = {
  log(message) {
    console.log(`[${this.name}] ${message}`);
  },

  error(message) {
    console.error(`[${this.name}] ERROR: ${message}`);
  }
};

const SerializableMixin = {
  toJSON() {
    return JSON.stringify(this);
  },

  fromJSON(json) {
    const data = JSON.parse(json);
    Object.assign(this, data);
    return this;
  }
};

const EventEmitterMixin = {
  initEvents() {
    this.events = {};
  },

  on(event, callback) {
    if (!this.events) this.initEvents();
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
  },

  emit(event, data) {
    if (this.events && this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
};

// Helper function to apply mixins
function applyMixins(targetClass, ...mixins) {
  mixins.forEach(mixin => {
    Object.getOwnPropertyNames(mixin).forEach(name => {
      if (name !== 'constructor') {
        targetClass.prototype[name] = mixin[name];
      }
    });
  });
}

// Base class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.initEvents();
  }
}

// Apply mixins
applyMixins(User, LoggerMixin, SerializableMixin, EventEmitterMixin);

// Usage
const user = new User('Alice', 'alice@example.com');
user.log('User created'); // [Alice] User created
console.log(user.toJSON()); // {"name":"Alice","email":"alice@example.com"}

user.on('greet', (data) => {
  console.log(`Greeting received: ${data}`);
});
user.emit('greet', 'Hello!'); // Greeting received: Hello!
```

---

## Problem 15: Deep Clone with Class Instances
**Problem:** Create a method to deep clone objects including class instances.

**Solution:**
```javascript
class Address {
  constructor(street, city, zip) {
    this.street = street;
    this.city = city;
    this.zip = zip;
  }
}

class Person {
  constructor(name, age, address) {
    this.name = name;
    this.age = age;
    this.address = address;
  }

  clone() {
    const addressClone = new Address(
      this.address.street,
      this.address.city,
      this.address.zip
    );
    return new Person(this.name, this.age, addressClone);
  }
}

// Generic deep clone function
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof Array) return obj.map(item => deepClone(item, hash));
  if (obj instanceof Object) {
    if (hash.has(obj)) return hash.get(obj);
    
    const clonedObj = Object.create(Object.getPrototypeOf(obj));
    hash.set(obj, clonedObj);
    
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key], hash);
      }
    }
    return clonedObj;
  }
}

// Usage
const address = new Address('123 Main St', 'New York', '10001');
const person = new Person('John', 30, address);

const clonedPerson = person.clone();
const deepClonedPerson = deepClone(person);

console.log(clonedPerson === person); // false
console.log(clonedPerson.address === address); // false
console.log(deepClonedPerson.name); // John
```

---

## Problem 16: Currying with Classes
**Problem:** Create a curried version of a class method.

**Solution:**
```javascript
class Calculator {
  add(a) {
    return (b) => {
      return (c) => {
        return a + b + c;
      };
    };
  }

  multiply(a) {
    return (b) => {
      return (c) => {
        return a * b * c;
      };
    };
  }

  // Generic curry method
  curry(fn, arity = fn.length) {
    return (function _curry(prevArgs) {
      return function(...args) {
        const allArgs = [...prevArgs, ...args];
        if (allArgs.length >= arity) {
          return fn.apply(this, allArgs);
        }
        return _curry(allArgs);
      };
    }).call(this, []);
  }
}

// Usage
const calc = new Calculator();
const addThree = calc.add(1)(2)(3);
console.log(addThree); // 6

const multiplyThree = calc.multiply(2)(3)(4);
console.log(multiplyThree); // 24

// Using the generic curry
function sum(a, b, c, d) {
  return a + b + c + d;
}

const curriedSum = calc.curry(sum);
console.log(curriedSum(1)(2)(3)(4)); // 10
console.log(curriedSum(1, 2)(3, 4)); // 10
```

---

## Problem 17: Lazy Loading Properties
**Problem:** Create a class with lazily loaded properties that are computed only when accessed.

**Solution:**
```javascript
class DataFetcher {
  constructor(url) {
    this.url = url;
    this._data = null;
    this._loaded = false;
  }

  get data() {
    if (!this._loaded) {
      console.log('Loading data...');
      // Simulate expensive operation
      this._data = this._fetchData();
      this._loaded = true;
    }
    return this._data;
  }

  _fetchData() {
    // Simulate API call
    return { id: 1, name: 'Sample Data', timestamp: Date.now() };
  }

  refresh() {
    this._loaded = false;
    this._data = null;
  }
}

// Usage
const fetcher = new DataFetcher('https://api.example.com/data');
console.log('Object created, no data loaded yet');
console.log(fetcher.data); // Now loads data
console.log(fetcher.data); // Returns cached data
fetcher.refresh();
console.log(fetcher.data); // Loads data again
```

---

## Problem 18: Immutable Class
**Problem:** Create an immutable class where properties cannot be changed after creation.

**Solution:**
```javascript
class ImmutablePoint {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
    Object.freeze(this);
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  translate(dx, dy) {
    return new ImmutablePoint(this.#x + dx, this.#y + dy);
  }

  scale(factor) {
    return new ImmutablePoint(this.#x * factor, this.#y * factor);
  }

  toString() {
    return `Point(${this.#x}, ${this.#y})`;
  }
}

// Usage
const point1 = new ImmutablePoint(5, 10);
console.log(point1.toString()); // Point(5, 10)

const point2 = point1.translate(3, 4);
console.log(point2.toString()); // Point(8, 14)
console.log(point1.toString()); // Point(5, 10) - Original unchanged

const point3 = point1.scale(2);
console.log(point3.toString()); // Point(10, 20)

// Try to modify (will fail silently or throw in strict mode)
// point1.x = 100; // Cannot set property
```

---

## Problem 19: Event Emitter Class
**Problem:** Create a robust Event Emitter class with on, off, emit, and once methods.

**Solution:**
```javascript
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return this;
  }

  off(event, listener) {
    if (!this.events[event]) return this;
    
    if (listener) {
      this.events[event] = this.events[event].filter(l => l !== listener);
    } else {
      delete this.events[event];
    }
    return this;
  }

  emit(event, ...args) {
    if (!this.events[event]) return false;
    
    this.events[event].forEach(listener => {
      try {
        listener.apply(this, args);
      } catch (error) {
        console.error(`Error in event listener for ${event}:`, error);
      }
    });
    return true;
  }

  once(event, listener) {
    const wrapper = (...args) => {
      this.off(event, wrapper);
      listener.apply(this, args);
    };
    wrapper.original = listener;
    return this.on(event, wrapper);
  }

  listeners(event) {
    return this.events[event] || [];
  }

  removeAllListeners(event) {
    if (event) {
      delete this.events[event];
    } else {
      this.events = {};
    }
    return this;
  }
}

// Usage
const emitter = new EventEmitter();

const regularListener = (data) => console.log('Regular:', data);
const onceListener = (data) => console.log('Once:', data);

emitter.on('data', regularListener);
emitter.once('data', onceListener);

emitter.emit('data', 'first');
// Regular: first
// Once: first

emitter.emit('data', 'second');
// Regular: second
// (onceListener not called again)

emitter.off('data', regularListener);
emitter.emit('data', 'third');
// (no output)
```

---

## Problem 20: Promise-based Class Methods
**Problem:** Create a class with methods that return Promises for asynchronous operations.

**Solution:**
```javascript
class FileHandler {
  constructor() {
    this.files = new Map();
  }

  async readFile(filename) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.files.has(filename)) {
          resolve(this.files.get(filename));
        } else {
          reject(new Error(`File ${filename} not found`));
        }
      }, 100);
    });
  }

  async writeFile(filename, content) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          this.files.set(filename, content);
          resolve(`Successfully wrote to ${filename}`);
        } catch (error) {
          reject(error);
        }
      }, 100);
    });
  }

  async deleteFile(filename) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.files.has(filename)) {
          this.files.delete(filename);
          resolve(`Successfully deleted ${filename}`);
        } else {
          reject(new Error(`File ${filename} not found`));
        }
      }, 100);
    });
  }

  async listFiles() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Array.from(this.files.keys()));
      }, 100);
    });
  }
}

// Usage
async function demo() {
  const handler = new FileHandler();
  
  try {
    await handler.writeFile('test.txt', 'Hello World');
    const content = await handler.readFile('test.txt');
    console.log(content); // Hello World
    
    const files = await handler.listFiles();
    console.log(files); // ['test.txt']
    
    await handler.deleteFile('test.txt');
  } catch (error) {
    console.error(error.message);
  }
}

demo();
```

---

## Problem 21: Chainable Async Operations
**Problem:** Create a class with chainable asynchronous methods.

**Solution:**
```javascript
class AsyncPipeline {
  constructor() {
    this.tasks = [];
    this.results = [];
  }

  add(task) {
    this.tasks.push(task);
    return this;
  }

  async execute() {
    for (const task of this.tasks) {
      try {
        const result = await task(this.results[this.results.length - 1]);
        this.results.push(result);
      } catch (error) {
        throw new Error(`Task failed: ${error.message}`);
      }
    }
    return this.results;
  }

  async then(onFulfill, onReject) {
    try {
      const results = await this.execute();
      return onFulfill ? onFulfill(results) : results;
    } catch (error) {
      return onReject ? onReject(error) : Promise.reject(error);
    }
  }

  reset() {
    this.tasks = [];
    this.results = [];
    return this;
  }
}

// Usage
async function demo() {
  const pipeline = new AsyncPipeline();
  
  const results = await pipeline
    .add(() => new Promise(resolve => setTimeout(() => resolve(10), 100)))
    .add(prev => new Promise(resolve => setTimeout(() => resolve(prev * 2), 100)))
    .add(prev => new Promise(resolve => setTimeout(() => resolve(prev + 5), 100)))
    .execute();
  
  console.log(results); // [10, 20, 25]
}

demo();
```

---

## Problem 22: Dependency Injection
**Problem:** Create a class that uses dependency injection for better testability.

**Solution:**
```javascript
// Interface-like base (documentation purpose)
class Logger {
  log(message) {
    throw new Error('Method not implemented');
  }
}

// Concrete implementations
class ConsoleLogger extends Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }
}

class FileLogger extends Logger {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.logs = [];
  }

  log(message) {
    this.logs.push(`[LOG] ${message}`);
  }

  error(message) {
    this.logs.push(`[ERROR] ${message}`);
  }

  getLogs() {
    return this.logs;
  }
}

class Database {
  constructor(logger) {
    this.logger = logger;
  }

  query(sql) {
    this.logger.log(`Executing query: ${sql}`);
    return { id: 1, data: 'result' };
  }
}

class UserService {
  constructor(database, logger) {
    this.database = database;
    this.logger = logger;
  }

  getUser(id) {
    this.logger.log(`Fetching user ${id}`);
    return this.database.query(`SELECT * FROM users WHERE id = ${id}`);
  }
}

// Container for dependency injection
class Container {
  constructor() {
    this.services = new Map();
  }

  register(name, factory) {
    this.services.set(name, factory);
    return this;
  }

  get(name) {
    const factory = this.services.get(name);
    if (!factory) {
      throw new Error(`Service ${name} not registered`);
    }
    return factory(this);
  }
}

// Usage
const container = new Container();

container
  .register('logger', () => new ConsoleLogger())
  .register('database', (c) => new Database(c.get('logger')))
  .register('userService', (c) => new UserService(c.get('database'), c.get('logger')));

const userService = container.get('userService');
userService.getUser(1);
```

---

## Problem 23: Strategy Pattern
**Problem:** Implement the Strategy pattern to allow switching algorithms at runtime.

**Solution:**
```javascript
// Strategy interface
class SortStrategy {
  sort(array) {
    throw new Error('Method not implemented');
  }
}

// Concrete strategies
class BubbleSort extends SortStrategy {
  sort(array) {
    const arr = [...array];
    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  }
}

class QuickSort extends SortStrategy {
  sort(array) {
    const arr = [...array];
    if (arr.length <= 1) return arr;
    
    const pivot = arr[Math.floor(arr.length / 2)];
    const left = arr.filter(x => x < pivot);
    const middle = arr.filter(x => x === pivot);
    const right = arr.filter(x => x > pivot);
    
    return [...this.sort(left), ...middle, ...this.sort(right)];
  }
}

class MergeSort extends SortStrategy {
  sort(array) {
    const arr = [...array];
    if (arr.length <= 1) return arr;
    
    const mid = Math.floor(arr.length / 2);
    const left = this.sort(arr.slice(0, mid));
    const right = this.sort(arr.slice(mid));
    
    return this.merge(left, right);
  }

  merge(left, right) {
    const result = [];
    let i = 0, j = 0;
    
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        result.push(right[j++]);
      }
    }
    
    return [...result, ...left.slice(i), ...right.slice(j)];
  }
}

// Context class
class Sorter {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  sort(array) {
    return this.strategy.sort(array);
  }
}

// Usage
const sorter = new Sorter(new BubbleSort());
const data = [64, 34, 25, 12, 22, 11, 90];

console.log('Bubble Sort:', sorter.sort(data));

sorter.setStrategy(new QuickSort());
console.log('Quick Sort:', sorter.sort(data));

sorter.setStrategy(new MergeSort());
console.log('Merge Sort:', sorter.sort(data));
```

---

## Problem 24: Command Pattern
**Problem:** Implement the Command pattern for undo/redo functionality.

**Solution:**
```javascript
// Command interface
class Command {
  execute() {
    throw new Error('Method not implemented');
  }

  undo() {
    throw new Error('Method not implemented');
  }
}

// Concrete commands
class AddCommand extends Command {
  constructor(receiver, value) {
    super();
    this.receiver = receiver;
    this.value = value;
  }

  execute() {
    this.receiver.add(this.value);
  }

  undo() {
    this.receiver.subtract(this.value);
  }
}

class SubtractCommand extends Command {
  constructor(receiver, value) {
    super();
    this.receiver = receiver;
    this.value = value;
  }

  execute() {
    this.receiver.subtract(this.value);
  }

  undo() {
    this.receiver.add(this.value);
  }
}

class MultiplyCommand extends Command {
  constructor(receiver, value) {
    super();
    this.receiver = receiver;
    this.value = value;
  }

  execute() {
    this.receiver.multiply(this.value);
  }

  undo() {
    this.receiver.divide(this.value);
  }
}

// Receiver
class Calculator {
  constructor() {
    this.value = 0;
    this.history = [];
    this redoStack = [];
  }

  add(value) {
    this.value += value;
  }

  subtract(value) {
    this.value -= value;
  }

  multiply(value) {
    this.value *= value;
  }

  divide(value) {
    if (value === 0) throw new Error('Division by zero');
    this.value /= value;
  }

  getValue() {
    return this.value;
  }

  executeCommand(command) {
    command.execute();
    this.history.push(command);
    this.redoStack = []; // Clear redo stack on new action
  }

  undo() {
    if (this.history.length > 0) {
      const command = this.history.pop();
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const command = this.redoStack.pop();
      command.execute();
      this.history.push(command);
    }
  }
}

// Invoker
class Button {
  constructor(command) {
    this.command = command;
  }

  setCommand(command) {
    this.command = command;
  }

  click() {
    this.command.execute();
  }
}

// Usage
const calculator = new Calculator();

const add5 = new AddCommand(calculator, 5);
const multiply3 = new MultiplyCommand(calculator, 3);
const subtract2 = new SubtractCommand(calculator, 2);

calculator.executeCommand(add5); // 5
calculator.executeCommand(multiply3); // 15
calculator.executeCommand(subtract2); // 13

console.log(calculator.getValue()); // 13

calculator.undo(); // 15
console.log(calculator.getValue()); // 15

calculator.undo(); // 5
console.log(calculator.getValue()); // 5

calculator.redo(); // 15
console.log(calculator.getValue()); // 15
```

---

## Problem 25: Decorator Pattern
**Problem:** Implement the Decorator pattern to add responsibilities to objects dynamically.

**Solution:**
```javascript
// Component interface
class Coffee {
  getDescription() {
    throw new Error('Method not implemented');
  }

  getCost() {
    throw new Error('Method not implemented');
  }
}

// Concrete component
class SimpleCoffee extends Coffee {
  getDescription() {
    return 'Simple coffee';
  }

  getCost() {
    return 2;
  }
}

// Decorator base class
class CoffeeDecorator extends Coffee {
  constructor(coffee) {
    super();
    this.coffee = coffee;
  }

  getDescription() {
    return this.coffee.getDescription();
  }

  getCost() {
    return this.coffee.getCost();
  }
}

// Concrete decorators
class MilkDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  getDescription() {
    return `${this.coffee.getDescription()}, milk`;
  }

  getCost() {
    return this.coffee.getCost() + 0.5;
  }
}

class SugarDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  getDescription() {
    return `${this.coffee.getDescription()}, sugar`;
  }

  getCost() {
    return this.coffee.getCost() + 0.2;
  }
}

class WhipCreamDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  getDescription() {
    return `${this.coffee.getDescription()}, whip cream`;
  }

  getCost() {
    return this.coffee.getCost() + 0.7;
  }
}

class VanillaDecorator extends CoffeeDecorator {
  constructor(coffee) {
    super(coffee);
  }

  getDescription() {
    return `${this.coffee.getDescription()}, vanilla`;
  }

  getCost() {
    return this.coffee.getCost() + 0.3;
  }
}

// Usage
let coffee = new SimpleCoffee();
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
// Simple coffee: $2

coffee = new MilkDecorator(coffee);
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
// Simple coffee, milk: $2.5

coffee = new SugarDecorator(coffee);
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
// Simple coffee, milk, sugar: $2.7

coffee = new WhipCreamDecorator(coffee);
coffee = new VanillaDecorator(coffee);
console.log(`${coffee.getDescription()}: $${coffee.getCost()}`);
// Simple coffee, milk, sugar, whip cream, vanilla: $3.7

// Alternative: Create different combinations
const espresso = new SimpleCoffee();
const latte = new MilkDecorator(new MilkDecorator(espresso));
const cappuccino = new MilkDecorator(new WhipCreamDecorator(espresso));

console.log(`Latte: ${latte.getDescription()} - $${latte.getCost()}`);
console.log(`Cappuccino: ${cappuccino.getDescription()} - $${cappuccino.getCost()}`);
```

---

## Summary

These 25 problems cover essential JavaScript and OOP concepts including:

1. **Basic OOP**: Classes, constructors, methods
2. **Inheritance**: Extends, super, method overriding
3. **Encapsulation**: Private fields, getters/setters
4. **Polymorphism**: Method overriding, abstract classes
5. **Design Patterns**: Singleton, Factory, Observer, Strategy, Command, Decorator, etc.
6. **Advanced Concepts**: Mixins, composition, dependency injection, immutability
7. **Async Programming**: Promises, async/await in classes
8. **Functional-OOP Hybrid**: Currying, method chaining, modules

Each problem demonstrates practical applications of OOP principles in modern JavaScript (ES6+).
