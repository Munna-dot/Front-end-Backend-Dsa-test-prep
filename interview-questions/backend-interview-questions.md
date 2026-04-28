# Backend Interview Questions - Roman Urdu Mein
## Topics: Node.js, NestJS, MongoDB, SQL, API, Security, DevOps

---

### **Node.js Questions (1-10)**

#### Q1: Node.js kya hai aur ye single-threaded hone ke bawajood asynchronous kaise hai?
**Answer:** 
Node.js ek JavaScript runtime hai jo Chrome ke V8 engine pe chalta hai. Ye single-threaded hai lekin **Event Loop** ki wajah se asynchronous operations handle kar sakta hai. Jab koi async operation (jaise file read, DB query) start hota hai, toh Node.js usay background mein delegate kar deta hai aur main thread dusre kaam continue karta hai. Jab operation complete hota hai, toh callback queue mein add ho jata hai aur event loop usay execute karta hai.

```javascript
// Example: Async operation in Node.js
const fs = require('fs');

// Non-blocking file read
fs.readFile('file.txt', 'utf8', (err, data) => {
    // Yeh callback tab execute hoga jab file read complete ho jayegi
    if (err) throw err;
    console.log(data);
});

console.log('Ye line pehle print hogi kyunki file read non-blocking hai');
// Comment: Pehle 'Ye line...' print hoga, phir file content
```

#### Q2: Event Loop kaise kaam karta hai?
**Answer:**
Event Loop 6 phases mein kaam karta hai:
1. **Timers**: setTimeout/setInterval callbacks
2. **Pending Callbacks**: I/O related callbacks
3. **Idle/Prepare**: Internal use
4. **Poll**: I/O operations ke liye wait karna
5. **Check**: setImmediate callbacks
6. **Close Callbacks**: socket.on('close') jaise events

```javascript
// Event Loop Order Example
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
Promise.resolve().then(() => console.log('promise'));

// Output order: promise -> timeout/immediate (depends)
// Comment: Microtasks (Promise) pehle execute hote hain
```

#### Q3: Callback Hell kya hai aur isay kaise avoid karein?
**Answer:**
Callback Hell tab hota hai jab multiple nested callbacks hon, jis se code padhna mushkil ho jata hai. Isay avoid karne ke liye:
- **Promises** use karein
- **Async/Await** use karein
- Modular functions banayein

```javascript
// ❌ Callback Hell
fs.readFile('a.txt', (err, dataA) => {
    fs.readFile('b.txt', (err, dataB) => {
        fs.readFile('c.txt', (err, dataC) => {
            console.log(dataA, dataB, dataC);
        });
    });
});

// ✅ Async/Await Solution
async function readFiles() {
    const dataA = await fs.promises.readFile('a.txt', 'utf8');
    const dataB = await fs.promises.readFile('b.txt', 'utf8');
    const dataC = await fs.promises.readFile('c.txt', 'utf8');
    console.log(dataA, dataB, dataC);
}
// Comment: Async/await se code linear aur readable ban jata hai
```

#### Q4: Express.js mein middleware kya hota hai?
**Answer:**
Middleware wo functions hain jo request aur response ke beech mein execute hote hain. Ye:
- Request modify kar sakte hain
- Response send kar sakte hain
- Next middleware ko call kar sakte hain

```javascript
const express = require('express');
const app = express();

// Custom Middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    req.requestTime = Date.now();
    next(); // Comment: Next middleware ko call karna zaroori hai
});

// Route specific middleware
app.get('/api/data', (req, res) => {
    res.json({ time: req.requestTime });
});
```

#### Q5: Cluster module kya hai aur kyun use hota hai?
**Answer:**
Node.js single-threaded hai, lekin modern CPUs multi-core hote hain. Cluster module se hum multiple Node.js processes (workers) create kar sakte hain jo sab cores ko utilize karte hain.

```javascript
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
    const numCPUs = os.cpus().length;
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork(); // Comment: Har CPU core ke liye worker process
    }
} else {
    // Worker process - yahan actual server run hoga
    require('./server');
}
```

#### Q6: Stream kya hai aur kitne types ki hoti hain?
**Answer:**
Stream data ko chunks mein process karti hai, poori file/memory load kiye bina. 4 types hain:
1. **Readable**: Data read karne ke liye (fs.createReadStream)
2. **Writable**: Data likhne ke liye (fs.createWriteStream)
3. **Duplex**: Read + Write both (net.Socket)
4. **Transform**: Data modify karte hue pass karna (zlib.createGzip)

```javascript
const { createReadStream, createWriteStream } = require('fs');

// Large file copy without loading entire file in memory
const readStream = createReadStream('large-file.txt');
const writeStream = createWriteStream('copy.txt');

readStream.pipe(writeStream);
// Comment: Pipe automatically data chunks mein transfer karta hai
```

#### Q7: Buffer kya hai?
**Answer:**
Buffer temporary memory space hai jo binary data store karne ke liye use hota hai. Node.js mein Buffer global class hai.

```javascript
const buf = Buffer.from('Hello', 'utf8');
console.log(buf); // <Buffer 48 65 6c 6c 6f>
console.log(buf.toString()); // "Hello"

// Comment: Buffer binary data ko handle karta hai
```

#### Q8: Process.nextTick() vs setImmediate()?
**Answer:**
- **process.nextTick()**: Current operation complete hone ke baad, event loop ke agle phase se pehle execute hota hai (highest priority)
- **setImmediate()**: Check phase mein execute hota hai (Poll phase ke baad)

```javascript
setTimeout(() => console.log('timeout'), 0);
setImmediate(() => console.log('immediate'));
process.nextTick(() => console.log('nextTick'));

// Output: nextTick -> timeout/immediate
// Comment: nextTick sabse pehle execute hota hai
```

#### Q9: Error handling in Node.js best practices?
**Answer:**
- Always use try-catch with async/await
- Use error-first callbacks
- Centralized error handling middleware (Express)
- Uncaught exception handlers

```javascript
// Express error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    process.exit(1);
});
// Comment: Production mein proper logging aur graceful shutdown zaroori hai
```

#### Q10: Package.json mein dependencies vs devDependencies?
**Answer:**
- **dependencies**: Production mein zaroori packages (express, mongoose)
- **devDependencies**: Development/testing mein use hone wale packages (jest, eslint, nodemon)

```json
{
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "jest": "^29.0.0",
    "nodemon": "^3.0.0"
  }
}
// Comment: npm install --production sirf dependencies install karega
```

---

### **NestJS Questions (11-20)**

#### Q11: NestJS kya hai aur iske key features?
**Answer:**
NestJS ek progressive Node.js framework hai jo Angular architecture se inspired hai. Key features:
- TypeScript support
- Dependency Injection
- Modular architecture
- Built-in support for testing
- Decorators

```typescript
// Basic NestJS Module
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
// Comment: Module NestJS ki basic building block hai
```

#### Q12: Dependency Injection (DI) kya hai NestJS mein?
**Answer:**
DI ek design pattern hai jahan objects apne dependencies khud create nahi karte, balki inject kiye jate hain. NestJS built-in DI container provide karta hai.

```typescript
@Injectable()
export class UserService {
  async findAll() {
    return ['User1', 'User2'];
  }
}

@Controller('users')
export class UserController {
  // Constructor mein dependency inject ho rahi hai
  constructor(private userService: UserService) {}
  
  @Get()
  getUsers() {
    return this.userService.findAll();
  }
}
// Comment: @Injectable() decorator class ko injectable banata hai
```

#### Q13: Guards, Interceptors, Pipes, Filters mein difference?
**Answer:**
- **Guards**: Authorization/authentication check (return boolean)
- **Interceptors**: Request/response modify karne ke liye
- **Pipes**: Data transformation/validation
- **Filters**: Exception handling

```typescript
// Guard Example
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !!request.user; // Comment: true/false return karta hai
  }
}

// Pipe Example
@UsePipes(new ValidationPipe())
@Post()
create(@Body() dto: CreateUserDto) {
  return this.service.create(dto);
}
// Comment: Pipe automatically DTO validate karega
```

#### Q14: NestJS mein Custom Decorator kaise banayein?
**Answer:**

```typescript
// Custom decorator for user role
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

// Usage in controller
@Roles('admin')
@Get('admin-only')
getAdminData() {
  return 'Admin data';
}

// Guard mein use karna
const reflector = this.reflector.get<string[]>('roles', context.getHandler());
// Comment: Metadata extract karke authorization logic likh sakte hain
```

#### Q15: Microservices architecture NestJS mein?
**Answer:**
NestJS built-in microservices transporters support karta hai (TCP, Redis, NATS, gRPC, Kafka).

```typescript
// Main app (hybrid)
const app = await NestFactory.create(AppModule);
const microservice = app.connectMicroservice({
  transport: Transport.TCP,
  options: { port: 3001 },
});
await app.startAllMicroservices();
await app.listen(3000);

// Controller mein message pattern
@MessagePattern('user_created')
handleUserCreated(data: any) {
  console.log('User created:', data);
}
// Comment: Microservices communicate via message patterns
```

#### Q16: Configuration Management in NestJS?
**Answer:**
@nestjs/config module use karte hain environment variables manage karne ke liye.

```typescript
// .env file
DATABASE_HOST=localhost
DATABASE_PORT=5432

// ConfigModule setup
@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  })],
})
export class AppModule {}

// Usage in service
constructor(private configService: ConfigService) {
  const dbHost = this.configService.get('DATABASE_HOST');
}
// Comment: ConfigService se type-safe access milta hai
```

#### Q17: Testing in NestJS?
**Answer:**
NestJS testing utilities provide karta hai unit aur e2e testing ke liye.

```typescript
// Unit test example
describe('UserService', () => {
  let service: UserService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
    
    service = module.get<UserService>(UserService);
  });
  
  it('should return users', () => {
    expect(service.findAll()).toBeDefined();
  });
});
// Comment: Test module actual dependencies mock kar sakta hai
```

#### Q18: WebSocket support NestJS mein?
**Answer:**
@nestjs/websockets package use karke WebSocket gateways banate hain.

```typescript
@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  
  @SubscribeMessage('message')
  handleMessage(client: Socket, payload: string): void {
    this.server.emit('response', 'Hello from server');
  }
}
// Comment: Gateway real-time communication enable karta hai
```

#### Q19: Swagger documentation NestJS mein?
**Answer:**
@nestjs/swagger package se auto-generated API docs banate hain.

```typescript
@ApiTags('Users')
@Controller('users')
export class UserController {
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns users array' })
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }
}
// Comment: Swagger UI /api/docs pe access hota hai
```

#### Q20: Lifecycle Hooks in NestJS?
**Answer:**
Modules aur providers ke lifecycle events:
- onModuleInit()
- onApplicationBootstrap()
- onModuleDestroy()
- beforeApplicationShutdown()

```typescript
@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  onModuleInit() {
    console.log('Database connection established');
  }
  
  onModuleDestroy() {
    console.log('Database connection closed');
  }
}
// Comment: Cleanup operations ke liye useful hai
```

---

### **MongoDB & NoSQL Questions (21-30)**

#### Q21: SQL vs NoSQL mein difference?
**Answer:**
| SQL | NoSQL |
|-----|-------|
| Structured data (tables) | Unstructured/semi-structured (documents) |
| Fixed schema | Dynamic schema |
| Vertical scaling | Horizontal scaling |
| ACID properties | BASE properties |
| Joins supported | Joins limited (aggregation) |

```javascript
// MongoDB document example (flexible schema)
{
  name: "Ali",
  age: 25,
  skills: ["Node.js", "MongoDB"], // Array
  address: { city: "Karachi" }     // Nested object
}
// Comment: Same collection mein different structure possible hai
```

#### Q22: MongoDB indexing kaise kaam karti hai?
**Answer:**
Indexing queries ko fast banati hai. Bina index ke MongoDB collection scan karta hai (slow). Index se B-tree use hota hai.

```javascript
// Create index
db.users.createIndex({ email: 1 }); // Ascending
db.users.createIndex({ name: 1, age: -1 }); // Compound index

// Check indexes
db.users.getIndexes();

// Query with index
db.users.find({ email: "ali@example.com" }); // Fast with index
// Comment: Index se O(n) se O(log n) ho jata hai
```

#### Q23: Aggregation Pipeline kya hai?
**Answer:**
Aggregation pipeline documents ko process karne ka framework hai. Multiple stages mein data transform hota hai.

```javascript
db.orders.aggregate([
  { $match: { status: "completed" } },           // Filter
  { $group: { _id: "$customerId", total: { $sum: "$amount" } } }, // Group
  { $sort: { total: -1 } },                      // Sort
  { $limit: 10 },                                // Limit
  { $lookup: { from: "customers", localField: "_id", foreignField: "_id", as: "customer" } } // Join
]);
// Comment: Har stage output next stage ko input deti hai
```

#### Q24: Mongoose ODM kya hai?
**Answer:**
Mongoose MongoDB ke liye Object Document Mapper hai jo:
- Schema define karta hai
- Validation provide karta hai
- Middleware hooks deta hai
- Queries simplify karta hai

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true
  },
  age: { type: Number, min: 18 }
}, { timestamps: true });

// Middleware
userSchema.pre('save', function(next) {
  console.log('Saving user...');
  next();
});

const User = mongoose.model('User', userSchema);
// Comment: Schema se data consistency maintain hoti hai
```

#### Q25: Transactions in MongoDB?
**Answer:**
MongoDB 4.0+ multi-document transactions support karta hai (ACID properties).

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  await User.findByIdAndUpdate(userId, { $inc: { balance: -100 } }, { session });
  await Transaction.create([{ userId, amount: 100, type: 'debit' }], { session });
  
  await session.commitTransaction();
} catch (error) {
  await session.abortTransaction();
  throw error;
} finally {
  session.endSession();
}
// Comment: All-or-nothing approach for data integrity
```

#### Q26: Replication vs Sharding?
**Answer:**
- **Replication**: Same data multiple servers pe (high availability)
  - Primary-Secondary architecture
  - Failover support
  
- **Sharding**: Data distribute across servers (horizontal scaling)
  - Shard key based partitioning
  - Each shard has subset of data

```javascript
// Enable sharding
sh.enableSharding("mydb");

// Shard collection
sh.shardCollection("mydb.users", { country: 1 });
// Comment: Country field ke basis pe data distribute hoga
```

#### Q27: MongoDB connection pooling?
**Answer:**
Connection pooling connections reuse karta hai performance improve karne ke liye.

```javascript
mongoose.connect('mongodb://localhost:27017/mydb', {
  maxPoolSize: 10,        // Max 10 connections
  minPoolSize: 5,         // Min 5 connections keep alive
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
// Comment: New connection create karne ka overhead bachta hai
```

#### Q28: TTL Indexes in MongoDB?
**Answer:**
TTL (Time To Live) indexes automatically documents delete karte hain after specified time.

```javascript
// Create TTL index
db.sessions.createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 });

// Documents will be deleted after 1 hour
{
  userId: 123,
  token: "abc123",
  createdAt: ISODate("2024-01-01T10:00:00Z")
}
// Comment: Session management ke liye useful hai
```

#### Q29: Change Streams in MongoDB?
**Answer:**
Change streams se real-time database changes track kar sakte hain.

```javascript
const changeStream = db.collection('users').watch();

changeStream.on('change', (change) => {
  console.log('Change detected:', change.operationType);
  if (change.operationType === 'insert') {
    console.log('New user:', change.fullDocument);
  }
});
// Comment: Real-time notifications ke liye use hota hai
```

#### Q30: MongoDB performance optimization tips?
**Answer:**
1. Proper indexes use karein
2. Only required fields select karein (projection)
3. Limit results
4. Embedded vs Referenced data wisely choose karein
5. Explain() use karke query analyze karein

```javascript
// Projection - only needed fields
db.users.find({}, { name: 1, email: 1, _id: 0 });

// Explain query performance
db.users.find({ email: "test@example.com" }).explain("executionStats");

// Comment: executionStats se index usage aur scan count pata chalta hai
```

---

### **SQL Questions (31-35)**

#### Q31: Normalization kya hai?
**Answer:**
Normalization database design technique hai jo:
- Data redundancy kam karti hai
- Data integrity improve karti hai
- Tables ko organize karti hai

Forms: 1NF, 2NF, 3NF, BCNF

```sql
-- Before normalization (redundant)
CREATE TABLE orders (
  id INT,
  customer_name VARCHAR(100),
  customer_email VARCHAR(100),
  product_name VARCHAR(100),
  product_price DECIMAL
);

-- After normalization
CREATE TABLE customers (id INT, name VARCHAR(100), email VARCHAR(100));
CREATE TABLE products (id INT, name VARCHAR(100), price DECIMAL);
CREATE TABLE orders (id INT, customer_id INT, product_id INT);
-- Comment: Foreign keys se relationships maintain hoti hain
```

#### Q32: JOINs types explain karein?
**Answer:**
- **INNER JOIN**: Matching rows both tables mein
- **LEFT JOIN**: All left table rows + matching right
- **RIGHT JOIN**: All right table rows + matching left
- **FULL OUTER JOIN**: All rows both tables

```sql
-- INNER JOIN
SELECT u.name, o.order_id 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id;

-- LEFT JOIN (all users even without orders)
SELECT u.name, o.order_id 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id;
-- Comment: LEFT JOIN se unmatched rows NULL aate hain
```

#### Q33: Indexes in SQL kaise kaam karti hain?
**Answer:**
SQL indexes B-tree ya Hash structures use karti hain fast lookup ke liye.

```sql
-- Create index
CREATE INDEX idx_email ON users(email);

-- Composite index
CREATE INDEX idx_name_age ON users(name, age);

-- Analyze query
EXPLAIN SELECT * FROM users WHERE email = 'test@example.com';
-- Comment: EXPLAIN se query execution plan dikhta hai
```

#### Q34: ACID Properties?
**Answer:**
- **Atomicity**: All or nothing (transaction complete ya fail)
- **Consistency**: Database valid state mein rahe
- **Isolation**: Concurrent transactions affect na karein
- **Durability**: Committed data permanent rahe

```sql
BEGIN TRANSACTION;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT; -- Or ROLLBACK on error
-- Comment: Banking transactions ke liye critical hai
```

#### Q35: Stored Procedures vs Functions?
**Answer:**
- **Stored Procedure**: Multiple statements, DML operations, no return value (OUT params possible)
- **Function**: Single expression, must return value, can use in SELECT

```sql
-- Stored Procedure
CREATE PROCEDURE TransferMoney(IN from_id INT, IN to_id INT, IN amount DECIMAL)
BEGIN
  UPDATE accounts SET balance = balance - amount WHERE id = from_id;
  UPDATE accounts SET balance = balance + amount WHERE id = to_id;
END;

-- Function
CREATE FUNCTION GetBalance(user_id INT) RETURNS DECIMAL
BEGIN
  DECLARE bal DECIMAL;
  SELECT balance INTO bal FROM accounts WHERE id = user_id;
  RETURN bal;
END;
-- Comment: Function SELECT mein use ho sakta hai, procedure CALL se
```

---

### **API Questions (36-40)**

#### Q36: REST vs GraphQL?
**Answer:**
| REST | GraphQL |
|------|---------|
| Multiple endpoints | Single endpoint |
| Over/under fetching | Exact data fetch |
| HTTP methods based | Query/Mutation based |
| Caching easy | Caching complex |
| Versioning needed | No versioning |

```javascript
// REST - Multiple requests for related data
GET /users/123
GET /users/123/posts
GET /users/123/followers

// GraphQL - Single request
query {
  user(id: 123) {
    name
    posts { title }
    followers { name }
  }
}
// Comment: GraphQL se network calls kam hote hain
```

#### Q37: HTTP Status Codes categories?
**Answer:**
- **1xx**: Informational
- **2xx**: Success (200 OK, 201 Created, 204 No Content)
- **3xx**: Redirection (301 Moved, 304 Not Modified)
- **4xx**: Client Error (400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found)
- **5xx**: Server Error (500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable)

```javascript
// Express response examples
res.status(200).json({ data: users });      // Success
res.status(201).json({ data: newUser });    // Created
res.status(400).json({ error: 'Invalid input' }); // Bad Request
res.status(401).json({ error: 'Unauthorized' });  // Auth required
res.status(404).json({ error: 'Not found' });     // Resource missing
res.status(500).json({ error: 'Server error' });  // Server issue
// Comment: Proper status codes se client ko clear feedback milta hai
```

#### Q38: API Authentication methods?
**Answer:**
1. **JWT (JSON Web Tokens)**: Stateless, scalable
2. **OAuth 2.0**: Third-party authorization
3. **API Keys**: Simple but less secure
4. **Session-based**: Stateful, server stores session

```javascript
// JWT Implementation
const token = jwt.sign({ userId: user.id }, 'SECRET_KEY', { expiresIn: '1h' });

// Verify token middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  try {
    const decoded = jwt.verify(token, 'SECRET_KEY');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
// Comment: JWT payload mein sensitive data na dalein
```

#### Q39: Rate Limiting kyun aur kaise?
**Answer:**
Rate limiting API abuse prevent karti hai, DDoS attacks se protect karti hai, aur fair usage ensure karti hai.

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

app.use('/api/', limiter);
// Comment: Authentication endpoints pe stricter limit lagayein
```

#### Q40: API Versioning strategies?
**Answer:**
1. **URL Versioning**: `/api/v1/users`, `/api/v2/users`
2. **Header Versioning**: `Accept: application/vnd.api.v1+json`
3. **Query Parameter**: `/api/users?version=1`

```javascript
// URL Versioning in Express
app.use('/api/v1', v1Routes);
app.use('/api/v2', v2Routes);

// NestJS versioning
app.enableVersioning({
  type: VersioningType.URI,
  defaultVersion: '1',
});

@Version('2')
@Get('users')
getUsersV2() {
  return this.service.getUsersV2();
}
// Comment: Breaking changes ke liye new version release karein
```

---

### **Security Questions (41-45)**

#### Q41: Common Web Vulnerabilities (OWASP Top 10)?
**Answer:**
1. **Injection** (SQL, NoSQL, Command)
2. **Broken Authentication**
3. **Sensitive Data Exposure**
4. **XXE (XML External Entities)**
5. **Broken Access Control**
6. **Security Misconfiguration**
7. **XSS (Cross-Site Scripting)**
8. **Insecure Deserialization**
9. **Using Components with Known Vulnerabilities**
10. **Insufficient Logging & Monitoring**

```javascript
// ❌ Vulnerable to SQL Injection
const query = `SELECT * FROM users WHERE email = '${email}'`;

// ✅ Safe with parameterized queries
const query = 'SELECT * FROM users WHERE email = ?';
db.execute(query, [email]);

// Comment: Never concatenate user input directly in queries
```

#### Q42: XSS (Cross-Site Scripting) se kaise bachein?
**Answer:**
XSS mein attacker malicious scripts inject karta hai. Prevention:
- Input sanitization
- Output encoding
- Content Security Policy (CSP)
- HttpOnly cookies

```javascript
// Express with helmet for security headers
import helmet from 'helmet';
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'"],
  },
}));

// Sanitize user input
import DOMPurify from 'dompurify';
const clean = DOMPurify.sanitize(userInput);
// Comment: CSP scripts ko restrict karta hai
```

#### Q43: CSRF (Cross-Site Request Forgery) protection?
**Answer:**
CSRF mein attacker user ki taraf se unauthorized actions perform karwata hai. Protection:
- CSRF tokens
- SameSite cookies
- Origin/Referer header validation

```javascript
import csrf from 'csurf';
const csrfProtection = csrf({ cookie: true });

app.get('/form', csrfProtection, (req, res) => {
  res.render('send', { csrfToken: req.csrfToken() });
});

app.post('/process', csrfProtection, (req, res) => {
  // Token automatically validated
  res.send('data is being processed');
});

// Cookie settings
cookieParser({
  sameSite: 'strict',
  httpOnly: true,
  secure: true
});
// Comment: CSRF token har form mein include karein
```

#### Q44: Password hashing best practices?
**Answer:**
- Never store plain text passwords
- Use bcrypt, argon2, scrypt
- Use salt (bcrypt includes by default)
- Appropriate cost factor

```javascript
import bcrypt from 'bcrypt';

// Hash password
const saltRounds = 12;
const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

// Verify password
const isValid = await bcrypt.compare(plainPassword, hashedPassword);

// Comment: Cost factor increase karein as hardware improves
```

#### Q45: HTTPS and SSL/TLS importance?
**Answer:**
HTTPS encrypts data in transit, prevents man-in-the-middle attacks, ensures data integrity.

```javascript
// Force HTTPS in Express
app.use((req, res, next) => {
  if (!req.secure && process.env.NODE_ENV === 'production') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// HSTS Header
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));
// Comment: HSTS browser ko force karta hai HTTPS use karne ke liye
```

---

### **DevOps Questions (46-50)**

#### Q46: CI/CD Pipeline kya hai?
**Answer:**
- **CI (Continuous Integration)**: Code changes frequently merge, automated tests run
- **CD (Continuous Delivery/Deployment)**: Automated deployment to staging/production

Tools: Jenkins, GitHub Actions, GitLab CI, CircleCI

```yaml
# GitHub Actions Example
name: CI/CD Pipeline

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm test
      
      - name: Build
        run: npm run build
      
      - name: Deploy to production
        run: ./deploy.sh
        env:
          DEPLOY_TOKEN: ${{ secrets.DEPLOY_TOKEN }}
# Comment: Har push pe automated testing aur deployment
```

#### Q47: Docker containers kya hain?
**Answer:**
Docker lightweight, standalone executables hain jo application aur dependencies ko package karte hain.

```dockerfile
# Dockerfile Example
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "dist/main.js"]
# Comment: Alpine image small size ki wajah se preferred hai

# docker-compose.yml
version: '3'
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
# Comment: Multi-container applications easily manage hote hain
```

#### Q48: Kubernetes basics?
**Answer:**
Kubernetes container orchestration platform hai jo:
- Auto-scaling
- Load balancing
- Self-healing
- Rolling updates

provide karta hai.

```yaml
# Kubernetes Deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
      - name: api
        image: myapp:latest
        ports:
        - containerPort: 3000
        resources:
          limits:
            memory: "512Mi"
            cpu: "500m"
---
# Service for load balancing
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
  - port: 80
    targetPort: 3000
  type: LoadBalancer
# Comment: 3 replicas high availability ensure karte hain
```

#### Q49: Monitoring and Logging tools?
**Answer:**
- **Logging**: ELK Stack (Elasticsearch, Logstash, Kibana), Winston, Morgan
- **Monitoring**: Prometheus, Grafana, New Relic, Datadog
- **APM**: Application Performance Monitoring

```javascript
// Winston Logger Setup
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// In production, send to centralized logging
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console());
}
// Comment: Structured logging se querying easy hoti hai
```

#### Q50: Environment Management best practices?
**Answer:**
- Different environments: Development, Staging, Production
- Use .env files (never commit .env)
- Secrets management (AWS Secrets Manager, HashiCorp Vault)
- Infrastructure as Code (Terraform, CloudFormation)

```bash
# .env.example (commit this, not .env)
NODE_ENV=development
PORT=3000
DATABASE_URL=mongodb://localhost:27017/dev
JWT_SECRET=your-secret-key
REDIS_HOST=localhost

# Terraform Example (Infrastructure as Code)
resource "aws_instance" "app_server" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t2.micro"
  
  tags = {
    Name = "app-server"
    Environment = "production"
  }
}
# Comment: IaC se infrastructure version control hota hai
```

---

## **Bonus Tips for Interview:**

1. **Code Examples Yaad Rakhein**: Har concept ke saath practical example dein
2. **Real Projects Discuss Karein**: Apne projects ke challenges share karein
3. **Problem Solving Approach**: Solution se pehle problem samjhein
4. **Questions Puchein**: Company ke tech stack aur challenges ke bare mein puchein
5. **Stay Updated**: Latest versions aur best practices follow karein

---

**Best of Luck for Your Interview! 🚀**
