# Fpattern Clothing Brand

Full-stack eCommerce platform built with **React**, **Node.js**, **Express**, and **MongoDB**. Features JWT authentication, Stripe payments, admin dashboard, and responsive UI with Tailwind CSS.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18
- **MongoDB** running locally (or use MongoDB Atlas)

### Installation

1. **Install all dependencies** from the project root:
   ```bash
   cd fpattern-clothing-brand
   npm install
   ```

2. **Configure environment variables**:
   - Root `.env` is already created with defaults
   - Update `MONGO_URI` if using Atlas
   - Add your Stripe keys: `STRIPE_SECRET_KEY` in `.env` and `VITE_STRIPE_PUBLISHABLE_KEY` in `client/.env`
   - Configure SMTP settings for email (optional for testing)

3. **Seed the database** with demo products and admin user:
   ```bash
   cd server
   npm run seed
   ```
   This creates an admin account: `admin@fpattern.com` / `admin123`

4. **Start both servers** (from project root):
   ```bash
   npm start
   ```
   - Backend API: http://localhost:5000
   - Frontend: http://localhost:5173

---

## 📁 Project Structure

```
fpattern-clothing-brand/
├── server/                 # Express API
│   ├── models/            # Mongoose schemas (User, Product, Order, Cart, Newsletter)
│   ├── controllers/       # Business logic
│   ├── routes/            # API endpoints
│   ├── middleware/        # Auth, error handling
│   ├── config/            # Database connection
│   ├── utils/             # Stripe, Nodemailer helpers
│   ├── scripts/           # Seed script
│   └── server.js          # Entry point
│
├── client/                # React + Vite frontend
│   ├── src/
│   │   ├── components/   # Navbar, Footer, ProductCard, etc.
│   │   ├── pages/        # Home, Catalog, ProductDetail, Cart, Checkout, Account, Admin
│   │   ├── context/      # AuthContext, CartContext
│   │   ├── api/          # Axios client
│   │   └── App.jsx       # Router setup
│   ├── public/
│   └── index.html
│
├── .env                   # Backend environment variables
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/fpattern
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:5173
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your@email.com
SMTP_PASS=yourpassword
```

### Frontend (`client/.env`)
```env
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

---

## 🛠️ Available Scripts

### Root
- `npm start` - Run both client and server concurrently
- `npm run server` - Run backend only
- `npm run client` - Run frontend only

### Server (`cd server`)
- `npm run dev` - Start with nodemon (auto-reload)
- `npm run seed` - Seed database with demo data
- `npm start` - Production start

### Client (`cd client`)
- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/me` - Update profile (protected)

### Products
- `GET /api/products` - List products (with filters: `q`, `category`, `gender`, `min`, `max`, `page`, `limit`)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/item` - Update item quantity (protected)
- `DELETE /api/cart/item/:itemId` - Remove item (protected)

### Orders
- `POST /api/orders/create-payment-intent` - Create Stripe payment intent (protected)
- `POST /api/orders/place` - Place order after payment (protected)
- `GET /api/orders/my` - Get user orders (protected)
- `GET /api/orders` - Get all orders (admin only)

### Admin
- `GET /api/admin/stats` - Sales summary (admin only)

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

### Contact
- `POST /api/contact` - Send contact form email

---

## 🎨 Features

### Frontend
- ✅ Responsive design with Tailwind CSS
- ✅ Product catalog with filters (category, gender, price range, search)
- ✅ Product detail page with size selection
- ✅ Shopping cart with quantity management
- ✅ Stripe checkout integration
- ✅ User authentication (register/login)
- ✅ Order history
- ✅ Admin dashboard with sales stats
- ✅ Newsletter subscription
- ✅ Contact form

### Backend
- ✅ RESTful API with Express
- ✅ MongoDB with Mongoose ODM
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Stripe payment processing
- ✅ Email notifications with Nodemailer
- ✅ Security: Helmet, CORS, input validation
- ✅ Error handling middleware

---

## 🚢 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project in Vercel
3. Set root directory to `client`
4. Add environment variables: `VITE_API_URL`, `VITE_STRIPE_PUBLISHABLE_KEY`
5. Deploy

### Backend (Render/Railway/AWS)
1. Set start command: `node server.js`
2. Add all environment variables from `.env`
3. Use MongoDB Atlas for production database
4. Deploy

---

## 🔐 Security Features
- Helmet.js for HTTP headers
- CORS configuration
- JWT token authentication
- Password hashing with bcrypt
- Input validation with express-validator
- Secure cookie handling

---

## 📝 Notes
- UI design inspired by modern eCommerce platforms with clean product grids and hero sections
- Admin credentials after seeding: `admin@fpattern.com` / `admin123`
- For Stripe testing, use test card: `4242 4242 4242 4242`
- SMTP configuration is optional for local development (contact form and order emails will fail gracefully)

---

## 🤝 Contributing
This is a production-ready template. Feel free to customize for your brand!
