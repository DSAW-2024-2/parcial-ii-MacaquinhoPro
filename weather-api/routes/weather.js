const express = require('express');
const axios = require('axios');
const authenticateToken = require('../middleware/authenticateToken');

const router = express.Router();

/**
 * @route   GET /weather
 * @desc    Get current temperature based on latitude and longitude
 * @access  Private
 */
router.get('/weather', authenticateToken, async (req, res) => {
  const { latitude, longitude } = req.query;

  // Validate query parameters
  if (!latitude || !longitude) {
    return res.status(400).json({ message: 'Latitude and longitude are required' });
  }

  try {
    // Make request to Open Meteo API
    const response = await axios.get('https://api.open-meteo.com/v1/forecast', {
      params: {
        latitude,
        longitude,
        current_weather: true
      }
    });

    // Check if the response contains weather data
    if (response.data && response.data.current_weather) {
      const temperature = response.data.current_weather.temperature;
      return res.json({ temperature });
    } else {
      return res.status(500).json({ message: 'Unable to retrieve temperature data' });
    }
  } catch (error) {
    // Handle errors from the external API
    console.error('Error fetching data from Open Meteo API:', error.message);
    return res.status(500).json({ message: 'Error fetching data from Open Meteo API', error: error.message });
  }
});

module.exports = router;
