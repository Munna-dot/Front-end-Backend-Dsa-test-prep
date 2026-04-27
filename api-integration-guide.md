# Guide: Consuming Free Public APIs with Express and Next.js

This guide demonstrates how to consume a free public API (we'll use **JSONPlaceholder**, a fake online REST API for testing) using two different approaches:
1.  **Express.js**: A traditional backend-only approach where the server fetches data and serves it to the client.
2.  **Next.js**: A modern full-stack approach utilizing Server Components and API Routes.

---

## Prerequisites

- Node.js installed (v18+ recommended)
- Basic knowledge of JavaScript/TypeScript
- Terminal access

---

## Part 1: The Express.js Approach

In this traditional architecture, your Express server acts as a proxy. The client (browser) requests data from your Express server, and your Express server fetches the data from the external public API, processes it, and sends it back.

**Why do this?**
- To hide API keys (if the public API required authentication).
- To cache responses.
- To transform data before sending it to the frontend.
- To avoid CORS issues in the browser.

### Step 1: Setup the Project

```bash
mkdir express-api-demo
cd express-api-demo
npm init -y
npm install express axios cors
```

### Step 2: Create the Server (`index.js`)

Create a file named `index.js`. We will create an endpoint `/api/posts` that fetches data from `https://jsonplaceholder.typicode.com/posts`.

```javascript
// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS so our frontend can talk to this server
app.use(cors());

// Define the route
app.get('/api/posts', async (req, res) => {
  try {
    console.log('🔄 Express server fetching data from public API...');
    
    // Fetch from the free public API
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    
    // Optional: Transform or filter data here
    const processedData = response.data.map(post => ({
      id: post.id,
      title: post.title.toUpperCase(), // Example transformation
      body: post.body
    }));

    // Send response to client
    res.json({
      source: 'Express Backend',
      timestamp: new Date().toISOString(),
      data: processedData
    });

  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from external API' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Express server running on http://localhost:${PORT}`);
});
```

### Step 3: Run and Test

```bash
node index.js
```

Visit `http://localhost:3001/api/posts` in your browser or use `curl`:
```bash
curl http://localhost:3001/api/posts
```

**Key Takeaway:** The browser talks to *your* Express server, not directly to JSONPlaceholder.

---

## Part 2: The Next.js Approach

Next.js offers two primary ways to handle this:
1.  **Server Components (Recommended)**: Fetch data directly inside the React component during server-side rendering. No separate API route needed for simple fetching.
2.  **API Routes**: Similar to Express, creating a backend endpoint within Next.js (`/pages/api` or `/app/api`).

We will demonstrate the **App Router (Server Components)** method as it is the modern standard, and briefly show the **API Route** method for comparison.

### Step 1: Setup the Project

Go back to the root folder and create a new Next.js app.

```bash
npx create-next-app@latest nextjs-api-demo
# Prompts:
# - TypeScript: Yes (optional, but used in example below)
# - ESLint: Yes
# - Tailwind CSS: Yes
# - App Router: Yes
# - Src directory: No (or Yes, adjust paths accordingly)

cd nextjs-api-demo
npm install axios
```

### Approach A: Direct Fetching in Server Components (Modern Best Practice)

In Next.js App Router, components are server-side by default. You can `await` fetch requests directly in the component.

**File:** `app/page.tsx` (or `app/page.js`)

```tsx
// app/page.tsx
import axios from 'axios';

// Define types if using TypeScript
interface Post {
  id: number;
  title: string;
  body: string;
}

interface ApiResponse {
  source: string;
  timestamp: string;
  data: Post[];
}

// This is a Server Component
export default async function Home() {
  let posts: Post[] = [];
  let error: string | null = null;

  try {
    console.log('🔄 Next.js Server Component fetching data...');
    
    // Direct fetch from public API on the server
    // Note: In Server Components, you can often use native fetch() without axios
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    
    // Transform data (same logic as Express example)
    posts = response.data.map((post: any) => ({
      id: post.id,
      title: post.title.toUpperCase(),
      body: post.body
    }));

  } catch (err: any) {
    error = err.message;
  }

  if (error) {
    return <div className="p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Next.js Server Components</h1>
      <div className="w-full max-w-2xl space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">{post.id}. {post.title}</h2>
            <p className="mt-2 text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-400">Data fetched directly on the server during render.</p>
    </main>
  );
}
```

### Approach B: Next.js API Routes (The "Express-like" way inside Next.js)

If you need a dedicated endpoint (e.g., for a mobile app to consume or to hide complex logic), you can create an API route.

**File:** `app/api/posts/route.ts`

```ts
// app/api/posts/route.ts
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    console.log('🔄 Next.js API Route fetching data...');
    
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5');
    
    const processedData = response.data.map((post: any) => ({
      id: post.id,
      title: post.title.toUpperCase(),
      body: post.body
    }));

    return NextResponse.json({
      source: 'Next.js API Route',
      timestamp: new Date().toISOString(),
      data: processedData
    });

  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch data' }, 
      { status: 500 }
    );
  }
}
```

*To use this API route, you would create a separate Client Component that uses `useEffect` and `fetch('/api/posts')` to get the data, similar to how a React SPA works.*

### Step 3: Run and Test Next.js

```bash
npm run dev
```

Visit `http://localhost:3000`. You will see the list of posts rendered immediately from the server.

---

## Comparison Summary

| Feature | Express Approach | Next.js (Server Components) | Next.js (API Routes) |
| :--- | :--- | :--- | :--- |
| **Architecture** | Decoupled (Backend + Separate Frontend) | Full-stack Monorepo | Full-stack Monorepo |
| **Fetching Location** | Backend Logic File | Inside UI Component | Dedicated API Endpoint |
| **Waterfall Requests** | Possible if not careful | Eliminated (Fetch happens before render) | Possible (Client fetches API, API fetches External) |
| **SEO** | Depends on frontend implementation | Excellent (HTML sent with data) | Depends on client implementation |
| **Setup Complexity** | Moderate (Need 2 repos/servers) | Low (Single project) | Low (Single project) |
| **Best For** | Microservices, Legacy frontends, Pure APIs | Content sites, Dashboards, SEO-critical apps | Mobile backends, Webhooks, Complex middleware |

## Integration Tips

1.  **Environment Variables**: Never hardcode API URLs if they might change or contain secrets.
    *   Express: Use `dotenv`.
    *   Next.js: Use `.env.local` and access via `process.env.API_URL`.
2.  **Error Handling**: Always wrap external API calls in `try/catch` blocks. If the public API is down, your app should degrade gracefully.
3.  **Caching**:
    *   **Express**: Use `node-cache` or Redis to store responses.
    *   **Next.js**: The `fetch` API in Next.js has built-in caching options (`cache: 'force-cache'`, `revalidate: 3600`).
4.  **Timeouts**: Public APIs can be slow. Set timeouts in Axios (`timeout: 5000`) to prevent your server from hanging.

## Conclusion

- Use **Express** if you are building a standalone API service consumed by multiple clients (iOS, Android, Web) or if you prefer a strictly separated architecture.
- Use **Next.js Server Components** if you are building a web application and want the simplest, fastest performance with great SEO.
- Use **Next.js API Routes** if you need a backend endpoint within your Next.js app for specific tasks (like handling Stripe webhooks or proxying requests) without spinning up a separate Express server.
