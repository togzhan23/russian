const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = 3000;

// API keys
const OPENWEATHER_API_KEY = '5384d72851af6871743325b81870e7be';



// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/city-info', async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required!' });
  }

  try {
    // Weather API
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    const weatherData = weatherResponse.data;

    const weather = {
      temperature: weatherData.main.temp,
      feels_like: weatherData.main.feels_like,
      description: weatherData.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`,
      humidity: weatherData.main.humidity,
      pressure: weatherData.main.pressure,
      wind_speed: weatherData.wind.speed,
      country: weatherData.sys.country,
      coordinates: {
        latitude: weatherData.coord.lat,
        longitude: weatherData.coord.lon,
      },
    };

    // News API
    

    // Exchange Rates API
    

    res.json({ weather});
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from APIs.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
