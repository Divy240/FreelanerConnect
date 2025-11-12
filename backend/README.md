# Backend (Node.js + Express)

Commands:
- npm install
- copy .env.example to .env and fill values (MONGO_URI, JWT_SECRET, STRIPE_SECRET_KEY, FRONTEND_URL)
- npm run dev   (requires nodemon) or npm start

Important routes:
- POST /api/auth/register  { name, email, password, role }
- POST /api/auth/login     { email, password }
- GET  /api/user/me        (protected, requires Authorization: Bearer <token>)
- POST /api/payments/create-checkout-session (protected) { price, freelancerName }
