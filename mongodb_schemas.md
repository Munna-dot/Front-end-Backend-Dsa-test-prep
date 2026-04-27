# MongoDB Basic Schemas

This document contains 5 basic MongoDB schemas created using Mongoose for a typical application.

## 1. User Schema
Represents a user in the system with authentication and profile information.

**Fields:**
- `username`: String (required, unique)
- `email`: String (required, unique, lowercase)
- `password`: String (required, hidden from queries)
- `role`: String (enum: 'user', 'admin', default: 'user')
- `isActive`: Boolean (default: true)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-updated)

**Use Case:** User authentication, profile management, role-based access control.

---

## 2. Product Schema
Represents a product in an e-commerce or inventory system.

**Fields:**
- `name`: String (required)
- `description`: String
- `price`: Number (required, min: 0)
- `category`: String (required)
- `stock`: Number (default: 0, min: 0)
- `images`: Array of Strings
- `isAvailable`: Boolean (default: true)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-updated)

**Use Case:** E-commerce product catalog, inventory management.

---

## 3. Order Schema
Represents a customer order with references to User and Product.

**Fields:**
- `user`: ObjectId (ref: 'User', required)
- `products`: Array of objects containing:
  - `product`: ObjectId (ref: 'Product')
  - `quantity`: Number
  - `price`: Number
- `totalAmount`: Number (required)
- `status`: String (enum: 'pending', 'processing', 'shipped', 'delivered', 'cancelled', default: 'pending')
- `shippingAddress`: Object (street, city, state, zip, country)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-updated)

**Use Case:** Order processing, tracking, and history.

---

## 4. Post Schema
Represents a blog post or social media post.

**Fields:**
- `title`: String (required)
- `content`: String (required)
- `author`: ObjectId (ref: 'User', required)
- `tags`: Array of Strings
- `likes`: Number (default: 0)
- `comments`: Array of objects containing:
  - `user`: ObjectId (ref: 'User')
  - `text`: String
  - `createdAt`: Date
- `isPublished`: Boolean (default: false)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-updated)

**Use Case:** Blogging platform, social media feed, content management.

---

## 5. Comment Schema
Represents a comment on a post or product (standalone for flexibility).

**Fields:**
- `text`: String (required)
- `author`: ObjectId (ref: 'User', required)
- `postId`: ObjectId (ref: 'Post', optional)
- `productId`: ObjectId (ref: 'Product', optional)
- `likes`: Number (default: 0)
- `isEdited`: Boolean (default: false)
- `createdAt`: Date (auto-generated)
- `updatedAt`: Date (auto-updated)

**Use Case:** Commenting system for posts, products, or any entity.

---

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install mongoose
   ```

2. Create a `.env` file with your MongoDB connection string:
   ```
   MONGODB_URI=mongodb://localhost:27017/myapp
   ```

3. Run the schema setup script:
   ```bash
   node setup_mongodb.js
   ```

## Notes
- All schemas include `createdAt` and `updatedAt` timestamps automatically managed by Mongoose.
- References (`ref`) enable population of related documents.
- Validation rules are applied at the schema level.
- Indexes can be added for performance optimization on frequently queried fields.
