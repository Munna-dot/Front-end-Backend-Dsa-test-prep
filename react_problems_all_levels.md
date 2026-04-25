# 25 React Problems and Solutions (Beginner to Advanced)

This document covers 25 React problems ranging from beginner fundamentals to advanced patterns, performance optimization, and architecture.

---

## 🟢 Beginner Level (Problems 1-8)

### 1. Counter Component
**Problem:** Create a simple counter component with increment, decrement, and reset buttons.

**Solution:**
```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

export default Counter;
```

---

### 2. Toggle Visibility
**Problem:** Create a component that toggles the visibility of a message when a button is clicked.

**Solution:**
```jsx
import React, { useState } from 'react';

function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>
      {isVisible && <p>This is the secret message!</p>}
    </div>
  );
}

export default ToggleMessage;
```

---

### 3. Controlled Input Form
**Problem:** Create a form with a controlled input that displays the user's name in real-time.

**Solution:**
```jsx
import React, { useState } from 'react';

function NameForm() {
  const [name, setName] = useState('');

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Submitted name: ${name}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={handleChange} />
      </label>
      <p>Hello, {name || 'Guest'}!</p>
      <button type="submit">Submit</button>
    </form>
  );
}

export default NameForm;
```

---

### 4. List Rendering
**Problem:** Render a list of items from an array, displaying each item with a unique key.

**Solution:**
```jsx
import React from 'react';

function ItemList({ items }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={item.id || index}>{item.name}</li>
      ))}
    </ul>
  );
}

// Usage
// <ItemList items={[{id: 1, name: 'Apple'}, {id: 2, name: 'Banana'}]} />
export default ItemList;
```

---

### 5. Conditional Rendering
**Problem:** Display different messages based on user login status.

**Solution:**
```jsx
import React from 'react';

function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>Welcome back!</h1>;
  }
  return <h1>Please sign up.</h1>;
}

// Alternative using ternary
function GreetingTernary({ isLoggedIn }) {
  return (
    <h1>{isLoggedIn ? 'Welcome back!' : 'Please sign up.'}</h1>
  );
}

export default Greeting;
```

---

### 6. Simple Todo List
**Problem:** Create a todo list where users can add tasks.

**Solution:**
```jsx
import React, { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (!input.trim()) return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  return (
    <div>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
```

---

### 7. Props Passing
**Problem:** Create a parent component that passes data to a child component via props.

**Solution:**
```jsx
import React from 'react';

function ChildComponent({ title, count }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>Count: {count}</p>
    </div>
  );
}

function ParentComponent() {
  return (
    <div>
      <ChildComponent title="First Item" count={5} />
      <ChildComponent title="Second Item" count={10} />
    </div>
  );
}

export default ParentComponent;
```

---

### 8. Styling Components
**Problem:** Apply inline styles and CSS classes to a component.

**Solution:**
```jsx
import React from 'react';
import './styles.css'; // Assume .btn-primary exists

function StyledButton() {
  const inlineStyle = {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px'
  };

  return (
    <div>
      <button style={inlineStyle}>Inline Style</button>
      <button className="btn-primary">CSS Class</button>
    </div>
  );
}

export default StyledButton;
```

---

## 🟡 Intermediate Level (Problems 9-17)

### 9. useEffect for Data Fetching
**Problem:** Fetch data from an API when the component mounts and display it.

**Solution:**
```jsx
import React, { useState, useEffect } from 'react';

function UserData() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return null;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default UserData;
```

---

### 10. Cleanup in useEffect
**Problem:** Set up a timer that cleans up properly when the component unmounts.

**Solution:**
```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []);

  return <div>Timer: {seconds}s</div>;
}

export default Timer;
```

---

### 11. useReducer for Complex State
**Problem:** Manage complex state logic (like a shopping cart) using `useReducer`.

**Solution:**
```jsx
import React, { useReducer } from 'react';

const initialState = { items: [], total: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM':
      const newItem = { id: Date.now(), name: action.payload, price: 10 };
      return {
        items: [...state.items, newItem],
        total: state.total + newItem.price
      };
    case 'REMOVE_ITEM':
      const itemToRemove = state.items.find(i => i.id === action.payload);
      return {
        items: state.items.filter(i => i.id !== action.payload),
        total: state.total - (itemToRemove?.price || 0)
      };
    default:
      return state;
  }
}

function ShoppingCart() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h3>Total: ${state.total}</h3>
      <button onClick={() => dispatch({ type: 'ADD_ITEM', payload: 'Product' })}>
        Add Item
      </button>
      <ul>
        {state.items.map(item => (
          <li key={item.id}>
            {item.name} 
            <button onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingCart;
```

---

### 12. Custom Hook: useLocalStorage
**Problem:** Create a custom hook to persist state in localStorage.

**Solution:**
```jsx
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current Theme: {theme}
    </button>
  );
}

export default useLocalStorage;
```

---

### 13. Lifting State Up
**Problem:** Share state between two sibling components by lifting it to their common parent.

**Solution:**
```jsx
import React, { useState } from 'react';

function ChildA({ value, onChange }) {
  return <input value={value} onChange={e => onChange(e.target.value)} placeholder="Child A" />;
}

function ChildB({ value }) {
  return <p>Child B sees: {value}</p>;
}

function Parent() {
  const [sharedValue, setSharedValue] = useState('');

  return (
    <div>
      <ChildA value={sharedValue} onChange={setSharedValue} />
      <ChildB value={sharedValue} />
    </div>
  );
}

export default Parent;
```

---

### 14. Form Validation
**Problem:** Implement basic form validation with error messages.

**Solution:**
```jsx
import React, { useState } from 'react';

function LoginForm() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!values.email.includes('@')) newErrors.email = 'Invalid email';
    if (values.password.length < 6) newErrors.password = 'Min 6 chars';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      alert('Form submitted!');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={values.email}
        onChange={e => setValues({...values, email: e.target.value})}
        placeholder="Email"
      />
      {errors.email && <span style={{color: 'red'}}>{errors.email}</span>}
      
      <input 
        type="password"
        value={values.password}
        onChange={e => setValues({...values, password: e.target.value})}
        placeholder="Password"
      />
      {errors.password && <span style={{color: 'red'}}>{errors.password}</span>}
      
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
```

---

### 15. Context API for Theming
**Problem:** Create a global theme context to avoid prop drilling.

**Solution:**
```jsx
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <button 
      onClick={toggleTheme}
      style={{ background: theme === 'light' ? '#fff' : '#333', color: theme === 'light' ? '#000' : '#fff' }}
    >
      Current: {theme}
    </button>
  );
}

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}

export default App;
```

---

### 16. Higher-Order Component (HOC)
**Problem:** Create an HOC that adds loading state handling to any component.

**Solution:**
```jsx
import React from 'react';

function withLoading(WrappedComponent) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...props} />;
  };
}

// Usage
function DataDisplay({ data }) {
  return <div>{JSON.stringify(data)}</div>;
}

const DataDisplayWithLoading = withLoading(DataDisplay);

// <DataDisplayWithLoading isLoading={true} data={{}} />
export default withLoading;
```

---

### 17. Error Boundaries
**Problem:** Create an Error Boundary component to catch errors in child components.

**Solution:**
```jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Usage
// <ErrorBoundary><BuggyComponent /></ErrorBoundary>
export default ErrorBoundary;
```

---

## 🔴 Advanced Level (Problems 18-25)

### 18. Performance Optimization with useMemo & useCallback
**Problem:** Optimize a component that performs expensive calculations and passes callbacks to children.

**Solution:**
```jsx
import React, { useState, useMemo, useCallback } from 'react';

function ExpensiveCalculation({ number }) {
  // Simulate expensive operation
  const result = useMemo(() => {
    console.log('Calculating...');
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) sum += i; 
    return number * 2;
  }, [number]);

  return <div>Result: {result}</div>;
}

function Parent() {
  const [count, setCount] = useState(0);
  const [input, setInput] = useState('');

  // Memoize callback to prevent re-renders of child if props don't change
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <ExpensiveCalculation number={count} />
      <button onClick={handleClick}>Increment Count</button>
    </div>
  );
}

export default Parent;
```

---

### 19. Virtualized List for Large Data
**Problem:** Render a list with thousands of items efficiently without DOM overload.

**Solution:**
```jsx
import React, { useState, useEffect, useRef } from 'react';

function VirtualizedList({ items, itemHeight = 50, containerHeight = 400 }) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  };

  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    items.length,
    startIndex + Math.ceil(containerHeight / itemHeight)
  );

  const visibleItems = items.slice(startIndex, endIndex);
  const totalHeight = items.length * itemHeight;
  const offsetTop = startIndex * itemHeight;

  return (
    <div 
      ref={containerRef}
      onScroll={handleScroll}
      style={{ height: containerHeight, overflow: 'auto', position: 'relative' }}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ 
          position: 'absolute', 
          top: offsetTop, 
          left: 0, 
          right: 0 
        }}>
          {visibleItems.map((item, index) => (
            <div 
              key={item.id} 
              style={{ height: itemHeight, borderBottom: '1px solid #ccc' }}
            >
              {item.name} (Index: {startIndex + index})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Usage with 10,000 items
// const largeData = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));
// <VirtualizedList items={largeData} />
export default VirtualizedList;
```

---

### 20. Compound Components Pattern
**Problem:** Build a flexible Select component using the Compound Components pattern.

**Solution:**
```jsx
import React, { createContext, useContext, useState } from 'react';

const SelectContext = createContext();

function Select({ children, value, onChange }) {
  const [selected, setSelected] = useState(value);

  const handleSelect = (val) => {
    setSelected(val);
    if (onChange) onChange(val);
  };

  return (
    <SelectContext.Provider value={{ selected, handleSelect }}>
      <div className="select-container">{children}</div>
    </SelectContext.Provider>
  );
}

function SelectTrigger({ children }) {
  const { selected } = useContext(SelectContext);
  return (
    <div className="trigger">
      {children || selected}
    </div>
  );
}

function SelectOption({ value, children }) {
  const { selected, handleSelect } = useContext(SelectContext);
  const isSelected = selected === value;

  return (
    <div 
      onClick={() => handleSelect(value)}
      style={{ background: isSelected ? '#eee' : 'transparent', cursor: 'pointer' }}
    >
      {children}
    </div>
  );
}

Select.Trigger = SelectTrigger;
Select.Option = SelectOption;

// Usage
// <Select value="apple" onChange={console.log}>
//   <Select.Trigger />
//   <SelectOption value="apple">Apple</SelectOption>
//   <SelectOption value="banana">Banana</SelectOption>
// </Select>
export default Select;
```

---

### 21. Custom Hook: useFetch with Caching
**Problem:** Create a robust `useFetch` hook that handles caching, retries, and cancellation.

**Solution:**
```jsx
import { useState, useEffect, useCallback } from 'react';

const cache = {};

function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (cache[url]) {
      setData(cache[url]);
      setLoading(false);
      return;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout

      const response = await fetch(url, { 
        ...options, 
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      cache[url] = result;
      setData(result);
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  }, [url, JSON.stringify(options)]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    delete cache[url];
    setLoading(true);
    fetchData();
  };

  return { data, loading, error, refetch };
}

export default useFetch;
```

---

### 22. Infinite Scroll Implementation
**Problem:** Implement infinite scrolling that loads more data as the user reaches the bottom.

**Solution:**
```jsx
import React, { useState, useEffect, useRef } from 'react';

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchMoreData = async () => {
    if (loading) return;
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newItems = Array.from({ length: 20 }, (_, i) => ({
      id: page * 20 + i,
      text: `Item ${page * 20 + i}`
    }));
    
    setItems(prev => [...prev, ...newItems]);
    setPage(prev => prev + 1);
    setLoading(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreData();
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, page]);

  return (
    <div>
      {items.map(item => (
        <div key={item.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
          {item.text}
        </div>
      ))}
      <div ref={loaderRef} style={{ padding: '20px', textAlign: 'center' }}>
        {loading ? 'Loading...' : 'Scroll for more'}
      </div>
    </div>
  );
}

export default InfiniteScroll;
```

---

### 23. Optimistic UI Updates
**Problem:** Update the UI immediately before the server responds, rolling back if the request fails.

**Solution:**
```jsx
import React, { useState } from 'react';

function TodoOptimistic({ initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  const addTodoOptimistic = async (text) => {
    const newTodo = { id: Date.now(), text, completed: false };
    
    // Optimistic update
    const previousTodos = [...todos];
    setTodos(prev => [...prev, newTodo]);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate random failure
          if (Math.random() > 0.8) reject(new Error('Network failed'));
          else resolve();
        }, 500);
      });
      
      // Success: Keep the update (in real app, replace with server response ID)
      console.log('Success');
    } catch (error) {
      // Rollback
      setTodos(previousTodos);
      alert('Failed to add todo. Rolled back.');
    }
  };

  return (
    <div>
      <button onClick={() => addTodoOptimistic('New Task')}>Add Task (Optimistic)</button>
      <ul>
        {todos.map(t => <li key={t.id}>{t.text}</li>)}
      </ul>
    </div>
  );
}

export default TodoOptimistic;
```

---

### 24. State Machine with useReducer
**Problem:** Implement a multi-step wizard form using a finite state machine pattern.

**Solution:**
```jsx
import React, { useReducer } from 'react';

const wizardStates = {
  personal: ['name', 'email'],
  address: ['street', 'city'],
  review: []
};

const steps = ['personal', 'address', 'review'];

function wizardReducer(state, action) {
  switch (action.type) {
    case 'NEXT':
      const currentIndex = steps.indexOf(state.currentStep);
      if (currentIndex < steps.length - 1) {
        return { ...state, currentStep: steps[currentIndex + 1] };
      }
      return state;
    case 'PREV':
      const prevIndex = steps.indexOf(state.currentStep);
      if (prevIndex > 0) {
        return { ...state, currentStep: steps[prevIndex - 1] };
      }
      return state;
    case 'SET_DATA':
      return { 
        ...state, 
        formData: { ...state.formData, [action.field]: action.value } 
      };
    case 'SUBMIT':
      return { ...state, status: 'submitted' };
    default:
      return state;
  }
}

function WizardForm() {
  const [state, dispatch] = useReducer(wizardReducer, {
    currentStep: 'personal',
    formData: {},
    status: 'editing'
  });

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_DATA', field, value });
  };

  if (state.status === 'submitted') {
    return <div>Form Submitted! {JSON.stringify(state.formData)}</div>;
  }

  return (
    <div>
      <h3>Step: {state.currentStep}</h3>
      {wizardStates[state.currentStep].map(field => (
        <input
          key={field}
          placeholder={field}
          value={state.formData[field] || ''}
          onChange={e => handleChange(field, e.target.value)}
        />
      ))}
      
      <div style={{ marginTop: '20px' }}>
        {state.currentStep !== 'personal' && (
          <button onClick={() => dispatch({ type: 'PREV' })}>Previous</button>
        )}
        {state.currentStep === 'review' ? (
          <button onClick={() => dispatch({ type: 'SUBMIT' })}>Submit</button>
        ) : (
          <button onClick={() => dispatch({ type: 'NEXT' })}>Next</button>
        )}
      </div>
    </div>
  );
}

export default WizardForm;
```

---

### 25. Micro-Frontends Integration (Module Federation Concept)
**Problem:** Demonstrate how to dynamically load a remote component (simulating Module Federation).

**Solution:**
```jsx
import React, { Suspense, lazy, useEffect, useState } from 'react';

// Simulating dynamic import of a remote module
function loadRemoteComponent(scope, module) {
  return new Promise((resolve, reject) => {
    // In real MF, this uses __webpack_require__.loadChunk
    // Here we simulate success/fail
    setTimeout(() => {
      if (scope === 'remoteApp' && module === './Button') {
        const RemoteButton = () => <button style={{background: 'purple', color: 'white'}}>Remote Button</button>;
        resolve(RemoteButton);
      } else {
        reject(new Error('Module not found'));
      }
    }, 500);
  });
}

function RemoteComponentLoader({ scope, module }) {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadRemoteComponent(scope, module)
      .then(setComponent)
      .catch(setError);
  }, [scope, module]);

  if (error) return <div>Error loading component: {error.message}</div>;
  if (!Component) return <div>Loading remote component...</div>;

  return <Component />;
}

function HostApp() {
  return (
    <div>
      <h1>Host Application</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <RemoteComponentLoader scope="remoteApp" module="./Button" />
      </Suspense>
    </div>
  );
}

export default HostApp;
```

---

## Summary

| Level | Topics Covered |
|-------|----------------|
| **Beginner** | JSX, Props, State, Events, Lists, Conditionals, Forms |
| **Intermediate** | Hooks (useEffect, useReducer), Context, Custom Hooks, HOCs, Error Boundaries, Validation |
| **Advanced** | Performance (Memoization, Virtualization), Patterns (Compound, State Machine), Optimistic UI, Infinite Scroll, Micro-frontends |

This collection provides a comprehensive path from building simple UI components to architecting scalable, high-performance React applications.
