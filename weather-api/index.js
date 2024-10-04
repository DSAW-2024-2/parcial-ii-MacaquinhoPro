const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Define the port
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Import routes
const loginRoutes = require('./routes/login');
const weatherRoutes = require('./routes/weather');

// Use routes
app.use('/', loginRoutes);
app.use('/', weatherRoutes);

/**
 * Handle undefined routes
 */
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

/**
 * Handle general errors
 */
app.use((err, req, res, next) => {
  console.error('General error:', err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
