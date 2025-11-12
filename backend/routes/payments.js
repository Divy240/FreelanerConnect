const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || '');
const auth = require('../middleware/authMiddleware');

// Create a Stripe Checkout Session (client will redirect)
router.post('/create-checkout-session', auth, async (req,res) => {
  try {
    const { price, freelancerName } = req.body;
    if(!price) return res.status(400).json({ message: 'Price required' });
    // price is in USD, convert to cents
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: `Hire ${freelancerName || 'Freelancer'}` },
          unit_amount: Math.round(Number(price) * 100),
        },
        quantity: 1
      }],
      mode: 'payment',
      success_url: (process.env.FRONTEND_URL || 'http://localhost:3000') + '/payment/success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: (process.env.FRONTEND_URL || 'http://localhost:3000') + '/payment/cancel',
    });
    res.json({ url: session.url });
  } catch(err){
    console.error(err);
    res.status(500).json({ message: 'Stripe error', error: err.message });
  }
});

module.exports = router;
