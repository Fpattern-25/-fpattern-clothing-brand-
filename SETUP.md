# 🚀 Quick Setup Guide

Follow these steps to get Fpattern running on your machine in under 5 minutes.

## Step 1: Install Dependencies
```bash
cd fpattern-clothing-brand
npm install
```

## Step 2: Start MongoDB
Make sure MongoDB is running locally on port 27017, or update `MONGO_URI` in `.env` to point to your MongoDB Atlas cluster.

**Local MongoDB:**
```bash
mongod
```

## Step 3: Seed Database
```bash
cd server
npm run seed
```

This creates:
- 8 demo products (tshirts, kurtis, jackets)
- Admin user: `admin@fpattern.com` / `admin123`

## Step 4: Configure Stripe (Optional)
If you want to test payments:
1. Get test keys from https://dashboard.stripe.com/test/apikeys
2. Update `.env`: `STRIPE_SECRET_KEY=sk_test_...`
3. Update `client/.env`: `VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...`

## Step 5: Start the App
```bash
cd ..
npm start
```

This starts:
- Backend API at http://localhost:5000
- Frontend at http://localhost:5173

## Step 6: Test the App
1. Open http://localhost:5173
2. Browse products on the catalog page
3. Register a new account or login as admin
4. Add items to cart
5. Test checkout (use Stripe test card: `4242 4242 4242 4242`)

## Admin Dashboard
Login with `admin@fpattern.com` / `admin123` and visit http://localhost:5173/admin to:
- View sales statistics
- Manage products (via API endpoints)

## Troubleshooting

**MongoDB connection error?**
- Ensure MongoDB is running: `mongod`
- Check `MONGO_URI` in `.env`

**Port already in use?**
- Change `PORT` in `.env` (backend)
- Change port in `client/vite.config.js` (frontend)

**Stripe errors?**
- Payments will fail without valid Stripe keys
- Use test keys from Stripe dashboard

**Email not sending?**
- SMTP is optional for local dev
- Configure Gmail SMTP or use a service like SendGrid

## Next Steps
- Customize the UI in `client/src/`
- Add more products via the seed script or API
- Deploy to Vercel (frontend) and Render (backend)
- Add your own branding and images

Enjoy building with Fpattern! 🎉
