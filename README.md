# ShopKart - Full-Stack E-Commerce Application

A complete, production-style e-commerce web application similar to Amazon/Flipkart with modern UI/UX, built with React.js, Node.js, Express.js, and MySQL.

## 🚀 Features

### Customer Features
- User registration and login with JWT authentication
- Browse products with search and filters
- Product categories and sorting options
- Product detail pages with reviews
- Shopping cart management
- Wishlist functionality
- Checkout and order placement
- Order tracking and history
- User profile management
- Product reviews and ratings

### Admin Features
- Add, edit, and delete products
- Manage product stock
- View and manage all orders
- Update order status (Pending, Packed, Shipped, Delivered, Cancelled)
- User management
- Revenue statistics and analytics
- Low stock alerts
- Top selling products reports
- User activity reports

### Database Features
- Normalized database design with proper relationships
- Triggers for automatic stock reduction
- Views for top selling products
- Stored procedures for order placement
- Comprehensive analytics queries
- Indexes for optimized performance

## 📁 Project Structure

```
DBMS_P/
├── backend/                 # Node.js + Express backend
│   ├── config/             # Database configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Authentication middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── utils/             # Utility functions
│   ├── server.js          # Express server
│   └── package.json
├── frontend/               # React.js + Tailwind frontend
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context providers
│   │   ├── services/      # API service layer
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── index.html
│   └── package.json
├── database/               # SQL scripts
│   ├── schema.sql         # Database schema
│   ├── seed_data.sql      # Sample data
│   └── queries.sql        # Useful queries
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **bcrypt.js** - Password hashing
- **JSON Web Token** - Authentication
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Database
- **MySQL** - Relational database
- Triggers, Views, Stored Procedures
- Proper indexing and constraints

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v5.7 or higher) or **MySQL Workbench** - [Download](https://www.mysql.com/products/workbench/)
- **npm** or **yarn** package manager

## 🔧 Installation & Setup

### Step 1: Clone the Repository

```bash
cd DBMS_P
```

### Step 2: Database Setup

1. Open MySQL Workbench or MySQL command line
2. Run the schema file to create database and tables:

```bash
mysql -u root -p < database/schema.sql
```

Or in MySQL Workbench:
- Open `database/schema.sql`
- Execute the script (⚡ icon or Ctrl+Shift+Enter)

3. Load sample data:

```bash
mysql -u root -p < database/seed_data.sql
```

Or in MySQL Workbench:
- Open `database/seed_data.sql`
- Execute the script

### Step 3: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file from example
copy .env.example .env

# Edit .env with your MySQL credentials
# Update DB_PASSWORD with your MySQL root password
```

Edit `.env` file:
```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=ecommerce_db
JWT_SECRET=your-secret-key-change-in-production
```

Start backend server:
```bash
npm run dev
```

Backend will run on: **http://localhost:5000**

### Step 4: Frontend Setup

Open a new terminal:

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend will run on: **http://localhost:3000**

## 👤 Default User Accounts

### Admin Account
- **Email:** admin@ecommerce.com
- **Password:** password123

### Customer Accounts
- **Email:** john@example.com
- **Password:** password123

- **Email:** jane@example.com
- **Password:** password123

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update profile (protected)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/categories` - Get all categories

### Cart (Protected)
- `GET /api/cart` - Get user cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Orders (Protected)
- `POST /api/orders/place` - Place order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get order details

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Add review (protected)

### Admin (Admin Only)
- `GET /api/admin/stats` - Get dashboard stats
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id/status` - Update order status
- `GET /api/admin/users` - Get all users
- `POST /api/admin/products` - Add product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product

## 📊 Database Schema

### Tables
1. **users** - User accounts and profiles
2. **categories** - Product categories
3. **products** - Product catalog
4. **cart** - User shopping carts
5. **cart_items** - Items in carts
6. **orders** - Customer orders
7. **order_items** - Items in orders
8. **payments** - Payment records
9. **wishlist** - User wishlists
10. **reviews** - Product reviews

### Database Objects
- **Trigger:** `reduce_stock_after_order` - Automatically reduces stock when order is placed
- **View:** `top_selling_products` - Shows top selling products with revenue
- **Stored Procedure:** `place_order` - Complete order placement process

## 🎨 UI Features

- Modern, Amazon/Flipkart-inspired design
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Toast notifications
- Loading states with skeleton loaders
- Clean navbar with search
- Product cards with hover effects
- Professional color scheme
- Intuitive navigation

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based access control (customer/admin)
- Protected API routes
- Input validation
- SQL injection prevention (parameterized queries)
- CORS configuration

## 📝 Useful SQL Queries

All queries are available in `database/queries.sql`:
1. Top 3 selling products
2. Monthly revenue
3. Users with most orders
4. Products low in stock
5. Products never ordered
6. Highest spending customer
7. Orders placed today
8. Revenue by category
9. Average order value
10. User activity report
11. Order status summary
12. Products with average rating

## 🚦 Running the Application

### Development Mode

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Production Build

```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

## 🐛 Troubleshooting

### MySQL Connection Issues
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database `ecommerce_db` exists

### Port Already in Use
- Change PORT in backend `.env`
- Change port in frontend `vite.config.js`

### Dependencies Not Installing
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## 📚 Learning Resources

This project demonstrates:
- Full-stack web development
- RESTful API design
- Database normalization
- Authentication & authorization
- React hooks and context
- Responsive design
- State management
- Error handling
- SQL features (triggers, views, procedures)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Verify all prerequisites are installed
3. Ensure database is properly set up
4. Check console for error messages

## 📄 License

This project is created for educational purposes.

## 🎯 Future Enhancements

- Payment gateway integration (Stripe/Razorpay)
- Image upload functionality
- Email notifications
- Advanced search with Elasticsearch
- Caching with Redis
- Unit and integration tests
- Docker containerization
- CI/CD pipeline
- Product recommendations
- Inventory management system

---

**Happy Coding! 🚀**
