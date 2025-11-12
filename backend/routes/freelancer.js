// backend/routes/freelancers.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET all freelancers
router.get('/', async (req, res) => {
  try {
    const freelancers = await User.find({ role: 'freelancer' });
    res.json(freelancers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
