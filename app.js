const API_URL = '/api/city-info';

async function getCityInfo() {
  const city = document.getElementById('city').value.trim();
  

  if (!city) {
    alert('Please enter city');
    return;
  }

  try {
    const response = await fetch(`${API_URL}?city=${city}`);
    const data = await response.json();

    if (response.ok) {
      displayWeather(data.weather);
      displayMap(data.weather.coordinates);
    } else {
      alert(`Error: ${data.error}`);
    }
  } catch (error) {
    console.error('Error fetching city info:', error);
    alert('Failed to fetch city information.');
  }
}

function displayWeather(weather) {
  const weatherDiv = document.getElementById('weather');
  weatherDiv.innerHTML = `
    <h4>Weather Information</h4>
    <img src="${weather.icon}" alt="${weather.description}">
    <p><strong>Temperature:</strong> ${weather.temperature}°C</p>
    <p><strong>Feels Like:</strong> ${weather.feels_like}°C</p>
    <p><strong>Description:</strong> ${weather.description}</p>
    <p><strong>Humidity:</strong> ${weather.humidity}%</p>
    <p><strong>Pressure:</strong> ${weather.pressure} hPa</p>
    <p><strong>Wind Speed:</strong> ${weather.wind_speed} m/s</p>
    <p><strong>Country:</strong> ${weather.country}</p>
  `;
}


function displayMap(coordinates) {
  if (!coordinates || !coordinates.latitude || !coordinates.longitude) {
    console.error('Coordinates are missing or invalid:', coordinates);
    alert('Unable to display map due to missing location data.');
    return;
  }

  const mapDiv = document.getElementById('map');
  const map = new google.maps.Map(mapDiv, {
    center: { lat: coordinates.latitude, lng: coordinates.longitude },
    zoom: 10,
  });

  new google.maps.Marker({
    position: { lat: coordinates.latitude, lng: coordinates.longitude },
    map: map,
    title: 'City Location',
  });
}


document.getElementById('get-info-btn').addEventListener('click', getCityInfo);
