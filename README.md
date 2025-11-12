# FreelancerConnect — MERN Starter

This package converts the provided `FreelanerConnect.html` into a full MERN stack application:
- **React frontend** with routing for Login, Register, Dashboard, Payment (Vite-based).
- **Express + Node backend** with MongoDB (Mongoose).
- **JWT authentication** (register/login, protected routes).
- **Stripe Checkout** integration for payments (backend creates Checkout Session; frontend redirects).
- Local frontend copy of the original HTML is included as reference.

## Folder structure
```
/backend    -> Express API (JWT auth, user routes, Stripe payments)
 /models
 /routes
 /middleware
/frontend   -> React app (Vite)
 /src
 /index.html
```

## How it works (high-level)
### Authentication
- **Register**: POST `/api/auth/register` with `name`, `email`, `password`, and optional `role`. Backend saves user (password hashed with bcrypt) and returns a JWT.
- **Login**: POST `/api/auth/login` with `email` and `password`. Backend verifies and returns a JWT.
- **Protected routes**: supply header `Authorization: Bearer <token>` to access `/api/user/me` and payment endpoints. The `authMiddleware` verifies the JWT.

### Payment Flow (Stripe Checkout)
- Frontend calls protected POST `/api/payments/create-checkout-session` with `{ price, freelancerName }`.
- Backend uses Stripe secret key to create a **Checkout Session** with a single line item, and returns `session.url`.
- Frontend redirects the user to `session.url` (Stripe-hosted checkout). On success/cancel, Stripe redirects back to frontend pages `/payment/success` or `/payment/cancel`.

## Example environment variables
- backend/.env:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/freelancerconnect
JWT_SECRET=some_strong_secret
STRIPE_SECRET_KEY=sk_test_...
FRONTEND_URL=http://localhost:3000
```
- frontend/.env:
```
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## To run locally (summary)
1. Start MongoDB (e.g. `mongod`).
2. Backend:
   - cd backend
   - npm install
   - copy `.env.example` to `.env` and fill values
   - npm run dev
3. Frontend:
   - cd frontend
   - npm install
   - copy `.env.example` to `.env` and set VITE_API_URL
   - npm run dev
4. Register a user, login, create freelancer profiles locally (stored in browser localStorage), then hire -> proceed to payment.

## Notes & next steps for production
- Use HTTPS for deployment and secure JWT storage (consider httpOnly cookies).
- Validate price server-side and implement webhook handlers to verify payment success and update records.
- Add user profile persistence for freelancers (store profile objects in MongoDB).
- Use Stripe webhooks to capture payment events and protect against forged redirects.

This package was generated from the user's provided `FreelanerConnect.html` and wired into a simple MERN skeleton ready for development and deployment.
