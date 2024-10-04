const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY || '1234'; 
// Hardcoded valid user credentials
const validUser = {
  email: 'admin@admin.com',
  password: 'admin'
};

/**
 * @route   POST /login
 * @desc    Authenticate user and return a JWT token
 * @access  Public
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  // Validate user credentials
  if (email === validUser.email && password === validUser.password) {
    // Payload for the token
    const payload = { email };

    // Generate token with 1-hour expiration
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
