# 50 Interview Questions: NestJS, Next.js, API, Backend & MongoDB

## Table of Contents
1. [NestJS (Questions 1-12)](#nestjs)
2. [Next.js (Questions 13-24)](#nextjs)
3. [API & Backend Concepts (Questions 25-36)](#api--backend)
4. [MongoDB (Questions 37-50)](#mongodb)

---

## NestJS

### 1. What is NestJS and what are its core principles?
**Answer:** NestJS is a progressive Node.js framework for building efficient, reliable, and scalable server-side applications. It uses TypeScript by default and is heavily inspired by Angular's architecture.

**Core Principles:**
- Modular architecture
- Dependency Injection
- Decorator-based metadata
- Built-in support for TypeScript
- Testable code structure

### 2. Explain the difference between Controllers, Providers, and Modules in NestJS.
**Answer:**
- **Controllers**: Handle incoming requests and return responses to clients
- **Providers**: Services, repositories, factories, helpers that can be injected
- **Modules**: Organize code into cohesive blocks using `@Module()` decorator

```typescript
// user.module.ts
@Module({
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

// user.controller.ts
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}

// user.service.ts
@Injectable()
export class UserService {
  findAll() {
    return [{ id: 1, name: 'John' }];
  }
}
```

### 3. How does Dependency Injection work in NestJS?
**Answer:** NestJS has a built-in DI container that automatically resolves dependencies based on TypeScript constructor types.

```typescript
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @Inject('CONFIG_OPTIONS') private config: any
  ) {}
}

// In module
@Module({
  providers: [
    AuthService,
    UserService,
    {
      provide: 'CONFIG_OPTIONS',
      useValue: { secret: 'my-secret' }
    }
  ]
})
```

### 4. What are Guards in NestJS and how do you create a custom guard?
**Answer:** Guards determine whether a request will be handled by the route handler or not, commonly used for authentication/authorization.

```typescript
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    
    if (!token) return false;
    
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
      return true;
    } catch {
      return false;
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

// Usage
@Controller('protected')
@UseGuards(AuthGuard)
export class ProtectedController {
  @Get()
  getProtected(@Request() req) {
    return req.user;
  }
}
```

### 5. Explain Interceptors and provide a use case.
**Answer:** Interceptors tap into the request/response lifecycle to modify data, handle errors, or add metadata.

```typescript
@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next.handle().pipe(
      map(data => ({
        statusCode: context.switchToHttp().getResponse().statusCode,
        timestamp: now,
        path: context.switchToHttp().getRequest().url,
        data
      }))
    );
  }
}

// Global registration
app.useGlobalInterceptors(new TransformInterceptor());
```

### 6. What are Pipes in NestJS? Create a validation pipe example.
**Answer:** Pipes transform input data or validate it before reaching the handler.

```typescript
@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string): number {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}

// With class-validator
@Post()
async create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
  return this.userService.create(createUserDto);
}

// DTO with validation
export class CreateUserDto {
  @IsEmail()
  email: string;
  
  @MinLength(6)
  password: string;
}
```

### 7. How do you handle exceptions in NestJS?
**Answer:** Using Exception Filters and built-in exception classes.

```typescript
// Custom exception filter
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message: exception.message
    });
  }
}

// Built-in exceptions
throw new NotFoundException('User not found');
throw new BadRequestException('Invalid input');
throw new UnauthorizedException('Invalid credentials');
```

### 8. Explain Middleware in NestJS and how to implement it.
**Answer:** Middleware functions have access to request/response objects and can execute code before route handlers.

```typescript
// Functional middleware
export function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
}

// Class-based middleware
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Request...');
    next();
  }
}

// In module
@Module({})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('cats');
  }
}
```

### 9. What is the difference between @Injectable() and @Module()?
**Answer:**
- `@Injectable()`: Marks a class as available for dependency injection
- `@Module()`: Defines a module that organizes controllers, providers, and other modules

```typescript
// Injectable - can be injected
@Injectable()
export class UserService {
  // Can inject other services here
  constructor(private repo: UserRepo) {}
}

// Module - organizes code
@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService] // Make available to other modules
})
export class UserModule {}
```

### 10. How do you implement JWT authentication in NestJS?
**Answer:**

```typescript
// auth.service.ts
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

// auth.strategy.ts
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
```

### 11. How do you configure microservices in NestJS?
**Answer:**

```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // HTTP
  await app.listen(3000);
  
  // Microservice
  const microservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.TCP,
      options: { port: 3001 }
    }
  );
  await microservice.listen();
}

// Controller with message patterns
@Controller()
export class AppController {
  @MessagePattern('sum')
  sum(data: number[]): number {
    return data.reduce((a, b) => a + b, 0);
  }
  
  @EventPattern('notification_created')
  handleNotification(data: any) {
    console.log('Notification:', data);
  }
}
```

### 12. Explain GraphQL integration in NestJS.
**Answer:**

```typescript
// user.resolver.ts
@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [User])
  async users() {
    return this.userService.findAll();
  }

  @Query(returns => User)
  async user(@Args('id') id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(returns => User)
  async createUser(@Args('createUserInput') input: CreateUserInput) {
    return this.userService.create(input);
  }
}

// GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    name: String
  }
  
  type Query {
    users: [User!]!
    user(id: ID!): User
  }
  
  type Mutation {
    createUser(input: CreateUserInput!): User!
  }
`;
```

---

## Next.js

### 13. What is Next.js and what are its main features?
**Answer:** Next.js is a React framework for production-grade applications with features like:
- Server-Side Rendering (SSR)
- Static Site Generation (SSG)
- Incremental Static Regeneration (ISR)
- API Routes
- File-based routing
- Image optimization
- Built-in CSS/Sass support

### 14. Explain the difference between SSR, SSG, and ISR in Next.js.
**Answer:**

```typescript
// SSR - Server-Side Rendering (every request)
export async function getServerSideProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data } };
}

// SSG - Static Site Generation (build time)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { props: { data }, revalidate: false };
}

// ISR - Incremental Static Regeneration (revalidates periodically)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();
  
  return { 
    props: { data },
    revalidate: 60 // Revalidate every 60 seconds
  };
}
```

### 15. How does file-based routing work in Next.js?
**Answer:**

```
pages/
├── index.js              → /
├── about.js              → /about
├── blog/
│   ├── index.js          → /blog
│   └── [slug].js         → /blog/:slug (dynamic)
├── posts/
│   └── [id]/
│       └── [comment].js  → /posts/:id/:comment (nested dynamic)
└── api/
    └── hello.js          → /api/hello
```

```typescript
// pages/blog/[slug].js
export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: 'first-post' } },
      { params: { slug: 'second-post' } }
    ],
    fallback: false // or 'blocking' or true
  };
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(params.slug);
  return { props: { post } };
}
```

### 16. What are API Routes in Next.js? Create an example.
**Answer:** API Routes allow you to build API endpoints within your Next.js application.

```typescript
// pages/api/users/[id].ts
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  
  await dbConnect();
  
  switch (req.method) {
    case 'GET':
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
      res.status(200).json({ success: true, data: user });
      break;
      
    case 'PUT':
      const updated = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true
      });
      res.status(200).json({ success: true, data: updated });
      break;
      
    case 'DELETE':
      await User.findByIdAndDelete(id);
      res.status(200).json({ success: true, data: {} });
      break;
      
    default:
      res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
```

### 17. Explain the App Router vs Pages Router in Next.js 13+.
**Answer:**

**Pages Router (traditional):**
```typescript
// pages/users/[id].tsx
export default function UserPage({ user }) {
  return <div>{user.name}</div>;
}

export async function getServerSideProps() {
  // Data fetching
}
```

**App Router (Next.js 13+):**
```typescript
// app/users/[id]/page.tsx
export default async function UserPage({ params }) {
  const user = await fetchUser(params.id);
  
  return (
    <div>
      <h1>{user.name}</h1>
    </div>
  );
}

// Loading state
export function Loading() {
  return <div>Loading...</div>;
}

// Error handling
export default function Error({ error }) {
  return <div>Error: {error.message}</div>;
}
```

### 18. How do you implement authentication in Next.js?
**Answer:**

```typescript
// Using NextAuth.js
// pages/api/auth/[...nextauth].ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await validateUser(credentials.email, credentials.password);
        if (user) {
          return { id: user.id, email: user.email, name: user.name };
        }
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

// Protected page
import { useSession } from 'next-auth/react';

export default function ProtectedPage() {
  const { data: session, status } = useSession();
  
  if (status === 'loading') return <p>Loading...</p>;
  if (!session) return <p>Access denied</p>;
  
  return <div>Welcome {session.user.name}</div>;
}
```

### 19. What is Image Optimization in Next.js?
**Answer:**

```typescript
import Image from 'next/image';

// Optimized image
<Image
  src="/profile.jpg"
  alt="Profile picture"
  width={500}
  height={300}
  priority={true} // For above-the-fold images
  quality={75}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Remote images configuration
// next.config.js
module.exports = {
  images: {
    domains: ['example.com'],
    formats: ['image/avif', 'image/webp']
  }
}
```

### 20. How do you handle environment variables in Next.js?
**Answer:**

```bash
# .env.local
DATABASE_URL=mongodb://localhost:27017/mydb
API_KEY=secret-key

# Public variables (exposed to browser)
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_ANALYTICS_ID=UA-123456
```

```typescript
// Server-side only
const dbUrl = process.env.DATABASE_URL;
const apiKey = process.env.API_KEY;

// Client-side accessible
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID;

// In component
export default function Component() {
  useEffect(() => {
    // Can access NEXT_PUBLIC_* variables
    console.log(process.env.NEXT_PUBLIC_API_URL);
  }, []);
}
```

### 21. Explain Middleware in Next.js.
**Answer:**

```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Authentication check
  const token = request.cookies.get('token');
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Add custom headers
  const response = NextResponse.next();
  response.headers.set('X-Custom-Header', 'value');
  
  // Locale detection
  const locale = request.headers.get('accept-language')?.split(',')[0];
  if (locale && !request.nextUrl.pathname.startsWith(`/${locale}`)) {
    return NextResponse.redirect(
      new URL(`/${locale}${request.nextUrl.pathname}`, request.url)
    );
  }
  
  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
};
```

### 22. How do you implement internationalization (i18n) in Next.js?
**Answer:**

```typescript
// next.config.js
module.exports = {
  i18n: {
    locales: ['en', 'fr', 'es'],
    defaultLocale: 'en',
    localeDetection: true
  }
}

// pages/_app.tsx
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import messages from '../locales';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const locale = router.locale || router.defaultLocale;
  
  return (
    <IntlProvider 
      locale={locale} 
      messages={messages[locale]}
    >
      <Component {...pageProps} />
    </IntlProvider>
  );
}

// Using translations
import { FormattedMessage } from 'react-intl';

export default function Home() {
  return (
    <div>
      <FormattedMessage id="welcome.message" />
    </div>
  );
}
```

### 23. What are Server Components in Next.js 13+?
**Answer:**

```typescript
// app/page.tsx - Server Component by default
import db from './lib/db';

export default async function HomePage() {
  const users = await db.users.findMany(); // Direct DB access
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <ClientCounter /> {/* Client Component */}
    </div>
  );
}

// app/components/ClientCounter.tsx
'use client'; // Must be at top

import { useState } from 'react';

export default function ClientCounter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}
```

### 24. How do you optimize performance in Next.js applications?
**Answer:**

```typescript
// 1. Dynamic imports (code splitting)
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('../components/Heavy'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable SSR
});

// 2. Script optimization
import Script from 'next/script';

<Script
  src="https://analytics.example.com/script.js"
  strategy="lazyOnload"
/>

// 3. Font optimization
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// 4. Caching headers
export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60
  };
}

// 5. API route caching
export const config = {
  api: {
    responseLimit: '8mb'
  }
};
```

---

## API & Backend Concepts

### 25. What is REST and what are its core principles?
**Answer:** REST (Representational State Transfer) is an architectural style with these principles:
- Client-Server architecture
- Stateless communication
- Cacheable responses
- Uniform interface (resources identified by URIs)
- Layered system
- Code on demand (optional)

```typescript
// RESTful endpoints
GET    /api/users          // List users
POST   /api/users          // Create user
GET    /api/users/:id      // Get user
PUT    /api/users/:id      // Update user
PATCH  /api/users/:id      // Partial update
DELETE /api/users/:id      // Delete user
```

### 26. Explain the difference between PUT and PATCH.
**Answer:**

```typescript
// PUT - Replace entire resource
PUT /api/users/123
{
  "name": "John",
  "email": "john@example.com",
  "age": 30
  // All fields required, missing fields become null
}

// PATCH - Partial update
PATCH /api/users/123
{
  "age": 31
  // Only updates age, other fields remain unchanged
}

// Implementation example
router.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, overwrite: true }
  );
  res.json(user);
});

router.patch('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );
  res.json(user);
});
```

### 27. What is GraphQL and how does it differ from REST?
**Answer:**

```graphql
# GraphQL Query - Client specifies exactly what data they need
query {
  user(id: "123") {
    name
    email
    posts {
      title
      createdAt
    }
  }
}

# REST equivalent - Multiple requests needed
GET /api/users/123
GET /api/users/123/posts

# GraphQL Schema
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String
  author: User!
}

type Query {
  user(id: ID!): User
  users: [User!]!
}

type Mutation {
  createUser(input: CreateUserInput!): User!
}
```

### 28. How do you implement rate limiting in an API?
**Answer:**

```typescript
// Express with express-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);

// Redis-based rate limiting for distributed systems
import Redis from 'ioredis';
const redis = new Redis();

async function rateLimitMiddleware(req, res, next) {
  const key = `rate_limit:${req.ip}`;
  const limit = 100;
  const window = 900; // 15 minutes
  
  const current = await redis.incr(key);
  if (current === 1) {
    await redis.expire(key, window);
  }
  
  res.set('X-RateLimit-Limit', limit);
  res.set('X-RateLimit-Remaining', Math.max(0, limit - current));
  
  if (current > limit) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  
  next();
}
```

### 29. What is CORS and how do you configure it?
**Answer:** CORS (Cross-Origin Resource Sharing) allows restricted resources on a web page to be requested from another domain.

```typescript
// Express CORS configuration
import cors from 'cors';

// Basic
app.use(cors());

// Configured
app.use(cors({
  origin: ['https://example.com', 'https://app.example.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  maxAge: 86400
}));

// Dynamic origin
app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['https://example.com', process.env.FRONTEND_URL];
    if (!origin || allowed.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Manual CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});
```

### 30. Explain different authentication strategies (JWT, OAuth, Session).
**Answer:**

```typescript
// JWT Authentication
import jwt from 'jsonwebtoken';

// Generate token
const token = jwt.sign(
  { userId: user.id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify token
const decoded = jwt.verify(token, process.env.JWT_SECRET);

// OAuth 2.0 with Passport
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  let user = await User.findOne({ googleId: profile.id });
  if (!user) {
    user = await User.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName
    });
  }
  done(null, user);
}));

// Session-based authentication
import session from 'express-session';

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));
```

### 31. How do you implement pagination in APIs?
**Answer:**

```typescript
// Offset-based pagination
router.get('/users', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  
  const [users, total] = await Promise.all([
    User.find().skip(skip).limit(limit),
    User.countDocuments()
  ]);
  
  res.json({
    data: users,
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalItems: total,
      itemsPerPage: limit,
      hasNextPage: page < Math.ceil(total / limit),
      hasPrevPage: page > 1
    }
  });
});

// Cursor-based pagination (better for large datasets)
router.get('/posts', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const cursor = req.query.cursor;
  
  const query = cursor 
    ? { _id: { $lt: cursor } }
    : {};
    
  const posts = await Post.find(query)
    .sort({ _id: -1 })
    .limit(limit + 1);
    
  const hasNextPage = posts.length > limit;
  if (hasNextPage) {
    posts.pop();
  }
  
  res.json({
    data: posts,
    nextCursor: hasNextPage ? posts[posts.length - 1]._id : null
  });
});
```

### 32. What is idempotency and why is it important in APIs?
**Answer:** Idempotency means making multiple identical requests has the same effect as making a single request.

```typescript
// Idempotent operations
GET /users/123      // Safe to call multiple times
PUT /users/123      // Idempotent - same result each time
DELETE /users/123   // Idempotent - already deleted returns same

// Non-idempotent
POST /users         // Creates new user each time

// Implementing idempotency keys
router.post('/payments', async (req, res) => {
  const idempotencyKey = req.headers['x-idempotency-key'];
  
  if (idempotencyKey) {
    const existing = await IdempotencyKey.findOne({ key: idempotencyKey });
    if (existing) {
      return res.json(existing.response);
    }
  }
  
  // Process payment
  const payment = await createPayment(req.body);
  
  if (idempotencyKey) {
    await IdempotencyKey.create({
      key: idempotencyKey,
      response: payment
    });
  }
  
  res.json(payment);
});
```

### 33. How do you handle file uploads in a backend API?
**Answer:**

```typescript
// Express with multer
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only images allowed'));
    }
  }
});

router.post('/upload', upload.single('avatar'), async (req, res) => {
  res.json({
    url: `/uploads/${req.file.filename}`,
    size: req.file.size
  });
});

// Multiple files
router.post('/gallery', upload.array('photos', 10), async (req, res) => {
  const files = req.files.map(file => ({
    url: `/uploads/${file.filename}`,
    size: file.size
  }));
  res.json({ files });
});
```

### 34. Explain WebSockets and when to use them.
**Answer:** WebSockets provide full-duplex communication channels over a single TCP connection.

```typescript
// Socket.io server
import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join room
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });
  
  // Chat message
  socket.on('send_message', (data) => {
    io.to(data.roomId).emit('receive_message', {
      ...data,
      timestamp: new Date()
    });
  });
  
  // Typing indicator
  socket.on('typing', (data) => {
    socket.to(data.roomId).emit('user_typing', {
      userId: socket.id,
      roomId: data.roomId
    });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Client side
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

socket.emit('join_room', 'room1');

socket.on('receive_message', (data) => {
  console.log('New message:', data);
});
```

### 35. What is API versioning and how do you implement it?
**Answer:**

```typescript
// URI Versioning
// /api/v1/users
// /api/v2/users

router.use('/api/v1', v1Routes);
router.use('/api/v2', v2Routes);

// Header Versioning
app.use((req, res, next) => {
  const version = req.headers['api-version'] || 'v1';
  req.apiVersion = version;
  next();
});

// Query Parameter Versioning
// /api/users?version=2

// Express with version-specific routes
const v1Router = express.Router();
const v2Router = express.Router();

v1Router.get('/users', (req, res) => {
  // Old response format
  res.json({ users: [] });
});

v2Router.get('/users', (req, res) => {
  // New response format with pagination
  res.json({ 
    data: [],
    meta: { page: 1, total: 0 }
  });
});

app.use('/api/v1', v1Router);
app.use('/api/v2', v2Router);
```

### 36. How do you implement caching strategies in backend APIs?
**Answer:**

```typescript
// Redis caching
import Redis from 'ioredis';
const redis = new Redis();

// Cache-aside pattern
async function getUser(id) {
  const cacheKey = `user:${id}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from database
  const user = await User.findById(id);
  
  // Store in cache with TTL
  await redis.setex(cacheKey, 3600, JSON.stringify(user));
  
  return user;
}

// Write-through pattern
async function updateUser(id, data) {
  const user = await User.findByIdAndUpdate(id, data, { new: true });
  
  // Update cache
  await redis.setex(`user:${id}`, 3600, JSON.stringify(user));
  
  return user;
}

// HTTP caching headers
router.get('/products', async (req, res) => {
  const products = await Product.find();
  
  res.set({
    'Cache-Control': 'public, max-age=300', // 5 minutes
    'ETag': `"${calculateHash(products)}"`,
    'Last-Modified': new Date().toUTCString()
  });
  
  res.json(products);
});

// Conditional requests
router.get('/products', async (req, res) => {
  const ifNoneMatch = req.headers['if-none-match'];
  const etag = calculateHash(await Product.find());
  
  if (ifNoneMatch === etag) {
    return res.sendStatus(304); // Not Modified
  }
  
  res.set('ETag', etag);
  res.json(products);
});
```

---

## MongoDB

### 37. What is MongoDB and what are its key features?
**Answer:** MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents.

**Key Features:**
- Document-oriented storage (BSON format)
- Horizontal scalability with sharding
- High availability with replica sets
- Flexible schema
- Rich query language
- Indexing support
- Aggregation framework
- GridFS for file storage

### 38. Explain the difference between SQL and NoSQL databases.
**Answer:**

| Aspect | SQL (MySQL, PostgreSQL) | NoSQL (MongoDB) |
|--------|------------------------|-----------------|
| Data Model | Tables with rows/columns | Documents/Collections |
| Schema | Fixed/Rigid | Flexible/Dynamic |
| Scaling | Vertical | Horizontal |
| Joins | Supported | Limited (lookup) |
| ACID | Full support | Eventual consistency |
| Use Case | Complex transactions | Large-scale, flexible data |

```typescript
// SQL
SELECT u.name, p.title 
FROM users u 
JOIN posts p ON u.id = p.user_id 
WHERE u.active = true;

// MongoDB
db.users.aggregate([
  { $match: { active: true } },
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'user_id',
      as: 'posts'
    }
  },
  { $unwind: '$posts' },
  { $project: { name: 1, 'posts.title': 1 } }
]);
```

### 39. How do you design a schema in MongoDB?
**Answer:**

```typescript
// Embedded documents (for one-to-few)
const orderSchema = new Schema({
  customer: {
    name: String,
    email: String,
    address: {
      street: String,
      city: String,
      zip: String
    }
  },
  items: [{
    product: String,
    quantity: Number,
    price: Number
  }],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

// Referenced documents (for one-to-many/many-to-many)
const userSchema = new Schema({
  name: String,
  email: String
});

const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }]
});

// Polymorphic references
const commentSchema = new Schema({
  content: String,
  commentedOn: {
    model: String, // 'Post' or 'Video'
    item: { type: Schema.Types.ObjectId, refPath: 'commentedOn.model' }
  }
});
```

### 40. What are indexes in MongoDB and how do you create them?
**Answer:** Indexes improve query performance by allowing MongoDB to scan fewer documents.

```typescript
// Single field index
db.users.createIndex({ email: 1 });

// Compound index
db.orders.createIndex({ customerId: 1, createdAt: -1 });

// Unique index
db.users.createIndex({ email: 1 }, { unique: true });

// Text index for search
db.products.createIndex({ name: 'text', description: 'text' });

// Geospatial index
db.locations.createIndex({ location: '2dsphere' });

// Partial index
db.users.createIndex(
  { email: 1 },
  { partialFilterExpression: { active: true } }
);

// TTL index (auto-expire)
db.sessions.createIndex(
  { expiresAt: 1 },
  { expireAfterSeconds: 0 }
);

// Check index usage
db.users.find({ email: 'test@example.com' }).explain('executionStats');
```

### 41. Explain MongoDB aggregation pipeline.
**Answer:**

```typescript
// Complex aggregation example
db.orders.aggregate([
  // Match stage
  { $match: { status: 'completed', createdAt: { $gte: new Date('2024-01-01') } } },
  
  // Lookup (join)
  {
    $lookup: {
      from: 'customers',
      localField: 'customerId',
      foreignField: '_id',
      as: 'customer'
    }
  },
  { $unwind: '$customer' },
  
  // Unwind array
  { $unwind: '$items' },
  
  // Group and calculate
  {
    $group: {
      _id: '$customer.region',
      totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } },
      averageOrderValue: { $avg: '$total' },
      orderCount: { $sum: 1 },
      topProducts: { $push: '$items.product' }
    }
  },
  
  // Sort
  { $sort: { totalRevenue: -1 } },
  
  // Limit
  { $limit: 10 },
  
  // Project final shape
  {
    $project: {
      region: '$_id',
      totalRevenue: 1,
      averageOrderValue: { $round: ['$averageOrderValue', 2] },
      orderCount: 1,
      _id: 0
    }
  }
]);
```

### 42. How do you handle transactions in MongoDB?
**Answer:**

```typescript
// Mongoose transaction example
const session = await mongoose.startSession();
session.startTransaction();

try {
  const user = await User.create([{ name: 'John' }], { session });
  
  await Account.updateOne(
    { _id: accountId },
    { $inc: { balance: -100 } },
    { session }
  );
  
  await Transaction.create([{
    userId: user[0]._id,
    amount: 100,
    type: 'debit'
  }], { session });
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}

// MongoDB native driver
const session = client.startSession();
await session.withTransaction(
  async () => {
    const collection = client.db('shop').collection('orders');
    await collection.insertOne({ item: 'abc', qty: 10 }, { session });
  },
  {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  }
);
```

### 43. What is the difference between embedded and referenced documents?
**Answer:**

```typescript
// EMBEDDED - Good for:
// - One-to-few relationships
// - Data accessed together
// - No independent lifecycle

const bookSchema = new Schema({
  title: String,
  author: {
    name: String,
    birthYear: Number,
    nationality: String
  },
  chapters: [{
    title: String,
    content: String,
    pageNumber: Number
  }]
});

// REFERENCED - Good for:
// - One-to-many/many-to-many
// - Independent lifecycle
// - Large arrays
// - Frequently updated child data

const authorSchema = new Schema({
  name: String,
  birthYear: Number
});

const bookSchema = new Schema({
  title: String,
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }]
});

// When to choose:
// Embed if: Read together, small array, no independent access
// Reference if: Large array, independent access, frequent updates to children
```

### 44. How do you perform CRUD operations in MongoDB with Mongoose?
**Answer:**

```typescript
// CREATE
const user = await User.create({ name: 'John', email: 'john@example.com' });
const user2 = new User({ name: 'Jane' });
await user2.save();

// READ
const user = await User.findById(userId);
const users = await User.find({ active: true }).select('name email');
const user = await User.findOne({ email: 'test@example.com' });
const count = await User.countDocuments({ active: true });

// UPDATE
const user = await User.findByIdAndUpdate(
  userId,
  { $set: { name: 'Updated Name' } },
  { new: true, runValidators: true }
);

const result = await User.updateMany(
  { active: false },
  { $set: { status: 'inactive' } }
);

// DELETE
const user = await User.findByIdAndDelete(userId);
await User.deleteOne({ email: 'test@example.com' });
await User.deleteMany({ createdAt: { $lt: oldDate } });

// BULK OPERATIONS
await User.bulkWrite([
  { insertOne: { document: { name: 'Alice' } } },
  { updateOne: { filter: { name: 'Bob' }, update: { $set: { active: true } } } },
  { deleteOne: { filter: { name: 'Charlie' } } }
]);
```

### 45. Explain MongoDB replication and sharding.
**Answer:**

**Replication (High Availability):**
```bash
# Replica Set Configuration
# Primary node handles writes
# Secondary nodes replicate data
# Automatic failover if primary fails

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017", priority: 2 },
    { _id: 1, host: "mongo2:27017", priority: 1 },
    { _id: 2, host: "mongo3:27017", priority: 1 }
  ]
});

// Check replica set status
rs.status();
rs.conf();
```

**Sharding (Horizontal Scaling):**
```bash
# Shard Key selection is critical
sh.enableSharding("mydb");

sh.shardCollection("mydb.users", { country: 1, userId: 1 });

// Chunk distribution
sh.status();

// Zone sharding for geo-distribution
sh.addShardTag("shard1", "US");
sh.addShardTag("shard2", "EU");

sh.addZoneKeyRange(
  "mydb.users",
  { country: "US" },
  { country: "US" },
  "US"
);
```

### 46. How do you optimize MongoDB queries?
**Answer:**

```typescript
// 1. Use projections to limit fields
db.users.find({}, { name: 1, email: 1, _id: 0 });

// 2. Use indexes effectively
db.orders.createIndex({ customerId: 1, date: -1 });
db.orders.find({ customerId: '123' }).sort({ date: -1 });

// 3. Avoid $where and $regex without indexes
// Bad
db.users.find({ $where: "this.age > 25" });

// Good
db.users.find({ age: { $gt: 25 } });

// 4. Use explain() to analyze queries
db.products.find({ category: 'electronics' })
  .explain('executionStats');

// 5. Limit results
db.posts.find().sort({ createdAt: -1 }).limit(10);

// 6. Use covered queries (index-only)
db.users.createIndex({ email: 1, name: 1 });
db.users.find({ email: 'test@example.com' }, { name: 1, _id: 0 });

// 7. Avoid sorting without index
db.logs.find().sort({ timestamp: -1 }); // Needs index

// 8. Use $hint to force index usage
db.orders.find({ status: 'pending' }).hint({ status: 1 });
```

### 47. What are MongoDB Atlas and its key features?
**Answer:** MongoDB Atlas is a managed cloud database service.

**Key Features:**
- Automated backups and point-in-time recovery
- Auto-scaling (vertical and horizontal)
- Built-in monitoring and alerts
- Global clusters with multi-cloud
- Security (VPC peering, encryption)
- Serverless instances
- Data Lake for analytics
- Realm for mobile sync

```typescript
// Connection to Atlas
const uri = "mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority";

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Atlas Search (full-text search)
db.movies.aggregate([
  {
    $search: {
      index: "default",
      text: {
        query: "ghost",
        path: ["title", "plot"]
      }
    }
  },
  {
    $addFields: {
      score: { $meta: "searchScore" }
    }
  },
  {
    $sort: { score: -1 }
  },
  {
    $limit: 10
  }
]);
```

### 48. How do you handle data validation in MongoDB?
**Answer:**

```typescript
// Mongoose Schema Validation
const userSchema = new Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: [8, 'Password must be at least 8 characters'],
    validate: {
      validator: function(v) {
        return /[A-Z]/.test(v) && /[0-9]/.test(v);
      },
      message: 'Password must contain uppercase and number'
    }
  },
  age: {
    type: Number,
    min: [18, 'Must be 18 or older'],
    max: [100, 'Age cannot exceed 100']
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'moderator'],
    default: 'user'
  },
  tags: {
    type: [String],
    validate: [arrayLimit, '{PATH} exceeds 5 tags']
  }
});

function arrayLimit(val) {
  return val.length <= 5;
}

// Custom async validation
userSchema.path('email').validate(async (value) => {
  const count = await this.constructor.countDocuments({ email: value });
  return count === 0;
}, 'Email already exists');

// MongoDB native validation (schema validation)
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'password'],
      properties: {
        email: {
          bsonType: 'string',
          pattern: '^[\\w.-]+@[\\w.-]+\\.[a-zA-Z]{2,}$'
        },
        age: {
          bsonType: 'number',
          minimum: 18,
          maximum: 100
        }
      }
    }
  }
});
```

### 49. Explain change streams in MongoDB.
**Answer:** Change streams allow applications to subscribe to real-time data changes.

```typescript
// Mongoose change streams
const changeStream = User.watch();

changeStream.on('change', (change) => {
  console.log('Change detected:', change);
  
  switch (change.operationType) {
    case 'insert':
      console.log('New user created:', change.fullDocument);
      break;
    case 'update':
      console.log('User updated:', change.documentKey._id);
      break;
    case 'delete':
      console.log('User deleted:', change.documentKey._id);
      break;
  }
});

// Filter specific changes
const changeStream = User.watch([
  { $match: { operationType: 'insert' } },
  { $match: { 'fullDocument.role': 'admin' } }
]);

// Resume tokens for reliability
let resumeToken;
const changeStream = User.watch([], { resumeAfter: resumeToken });

changeStream.on('change', (change) => {
  resumeToken = change._id;
  // Process change
});

// Real-time notifications with Socket.io
io.on('connection', (socket) => {
  const changeStream = Order.watch([
    { $match: { operationType: 'insert' } }
  ]);
  
  changeStream.on('change', (change) => {
    socket.emit('new_order', change.fullDocument);
  });
  
  socket.on('disconnect', () => {
    changeStream.close();
  });
});
```

### 50. How do you backup and restore MongoDB databases?
**Answer:**

```bash
# Backup with mongodump
mongodump --uri="mongodb://localhost:27017" --db=mydb --out=/backup/location

# Backup specific collection
mongodump --db=mydb --collection=users --out=/backup

# Backup with compression
mongodump --gzip --uri="mongodb://localhost:27017/mydb" --out=/backup

# Restore with mongorestore
mongorestore --uri="mongodb://localhost:27017" /backup/location/mydb

# Restore specific database
mongorestore --db=newdb /backup/location/mydb

# Drop and restore
mongorestore --drop --uri="mongodb://localhost:27017" /backup

# MongoDB Atlas backup
# - Continuous backups (point-in-time recovery)
# - Scheduled snapshots
# - Download backup files via UI or API

# Programmatic backup with Node.js
import { exec } from 'child_process';
import util from 'util';
const execPromise = util.promisify(exec);

async function backupDatabase(dbName) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupPath = `/backups/${dbName}_${timestamp}`;
  
  await execPromise(`mongodump --db=${dbName} --out=${backupPath}`);
  
  // Upload to cloud storage (S3, etc.)
  // await uploadToS3(backupPath);
  
  return backupPath;
}

async function restoreDatabase(backupPath, dbName) {
  await execPromise(`mongorestore --db=${dbName} ${backupPath}/${dbName}`);
}
```

---

## Bonus: Best Practices

### General API Best Practices
1. Use consistent naming conventions (RESTful URLs)
2. Implement proper error handling and status codes
3. Version your APIs
4. Document with OpenAPI/Swagger
5. Implement rate limiting
6. Use HTTPS everywhere
7. Validate all inputs
8. Log appropriately (avoid sensitive data)
9. Monitor and alert on errors
10. Implement health checks

### Database Best Practices
1. Design schemas based on query patterns
2. Use appropriate indexes
3. Implement connection pooling
4. Handle transactions properly
5. Regular backups and test restores
6. Monitor slow queries
7. Use read replicas for scaling reads
8. Implement proper data retention policies

### Security Best Practices
1. Hash passwords (bcrypt, argon2)
2. Use JWT with short expiration
3. Implement refresh tokens
4. Sanitize inputs to prevent injection
5. Use parameterized queries
6. Implement CORS properly
7. Rate limit authentication endpoints
8. Keep dependencies updated

---

This comprehensive guide covers 50 essential interview questions across NestJS, Next.js, API/Backend concepts, and MongoDB with practical code examples to help you prepare for technical interviews.
