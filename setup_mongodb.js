const mongoose = require('mongoose');

// MongoDB Connection - Fixed: Use default URI if env var is not set
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/myapp';

console.log(`Connecting to MongoDB at: ${MONGODB_URI}`);

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err.message);
    if (err.code === 'ECONNREFUSED') {
      console.log('\n💡 Tip: Make sure MongoDB is running on your machine.');
      console.log('   On Windows, you can start it with: net start MongoDB');
      console.log('   Or run: mongod in a separate terminal');
    }
  });

// 1. User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    select: false // Hide from queries by default
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// 2. Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    default: 0,
    min: 0
  },
  images: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// 3. Order Schema
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
  }
}, {
  timestamps: true
});

// 4. Post Schema
const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  likes: {
    type: Number,
    default: 0
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  isPublished: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// 5. Comment Schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  likes: {
    type: Number,
    default: 0
  },
  isEdited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Create Models
const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Post = mongoose.model('Post', postSchema);
const Comment = mongoose.model('Comment', commentSchema);

// Function to insert sample data
async function insertSampleData() {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    await Order.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});
    console.log('Cleared existing data');

    // Create sample users
    const users = await User.create([
      {
        username: 'john_doe',
        email: 'john@example.com',
        password: 'hashed_password_123',
        role: 'user'
      },
      {
        username: 'jane_admin',
        email: 'jane@example.com',
        password: 'hashed_password_456',
        role: 'admin'
      }
    ]);
    console.log(`Created ${users.length} users`);

    // Create sample products
    const products = await Product.create([
      {
        name: 'Laptop',
        description: 'High-performance laptop',
        price: 999.99,
        category: 'Electronics',
        stock: 50,
        images: ['laptop.jpg']
      },
      {
        name: 'Headphones',
        description: 'Wireless noise-cancelling headphones',
        price: 199.99,
        category: 'Electronics',
        stock: 100
      },
      {
        name: 'Coffee Mug',
        description: 'Ceramic coffee mug',
        price: 12.99,
        category: 'Home',
        stock: 200
      }
    ]);
    console.log(`Created ${products.length} products`);

    // Create sample posts
    const posts = await Post.create([
      {
        title: 'Getting Started with MongoDB',
        content: 'MongoDB is a NoSQL database...',
        author: users[0]._id,
        tags: ['mongodb', 'database', 'tutorial'],
        isPublished: true
      },
      {
        title: 'Mongoose Best Practices',
        content: 'Here are some best practices for using Mongoose...',
        author: users[1]._id,
        tags: ['mongoose', 'nodejs', 'tips'],
        isPublished: true
      }
    ]);
    console.log(`Created ${posts.length} posts`);

    // Create sample comments
    const comments = await Comment.create([
      {
        text: 'Great tutorial!',
        author: users[1]._id,
        postId: posts[0]._id
      },
      {
        text: 'Very helpful, thanks!',
        author: users[0]._id,
        postId: posts[1]._id
      }
    ]);
    console.log(`Created ${comments.length} comments`);

    // Create sample order
    const orders = await Order.create([
      {
        user: users[0]._id,
        products: [
          {
            product: products[0]._id,
            quantity: 1,
            price: 999.99
          },
          {
            product: products[2]._id,
            quantity: 2,
            price: 12.99
          }
        ],
        totalAmount: 999.99 + (12.99 * 2),
        status: 'processing',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zip: '10001',
          country: 'USA'
        }
      }
    ]);
    console.log(`Created ${orders.length} orders`);

    console.log('\n✅ Sample data inserted successfully!');
    console.log('\nSummary:');
    console.log(`- Users: ${users.length}`);
    console.log(`- Products: ${products.length}`);
    console.log(`- Posts: ${posts.length}`);
    console.log(`- Comments: ${comments.length}`);
    console.log(`- Orders: ${orders.length}`);

  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    // Close connection
    await mongoose.connection.close();
    console.log('\nDatabase connection closed');
    process.exit(0);
  }
}

// Run the script
insertSampleData();
