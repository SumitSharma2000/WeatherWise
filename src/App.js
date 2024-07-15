import React, { useState } from 'react';

const api = {
  key: "79d1aab171d8b4ea21a38b0f9212d1cf",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  return (
    <div className={(typeof weather.main != "undefined") ? ((weather.main.temp > 16) ? 'app warm' : 'app') : 'app'}>
      <main className="main-content">
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
          <div className="app-name">WeatherWise: Weather App by Sumit Sharma</div>
        </div>
        {(typeof weather.main != "undefined") ? (
        <div className="weather-info">
          <div className="location-box">
            <div className="location">{weather.name},{weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
          <div class="extra-info-container">
            <div className='extra-info '>
            <div>Max Temp: {weather.main.temp_max}°c</div>
            <div>Min Temp: {weather.main.temp_min}°c</div>
            <div>Feels Like: {weather.main.feels_like}°c</div>
            <div>Wind Speed: {weather.wind.speed} m/s</div>
            <div>Pressure: {weather.main.pressure}°c</div>
            <div>Humidity: {weather.main.humidity}°c</div>
            <div>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
            <div>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
            <div>Latitude: {weather.coord.lat}</div>
            <div>Longitude: {weather.coord.lon}</div>
            <div>Timezone: {weather.timezone}</div>
            <div>Visibility: {weather.visibility} meters</div>

            </div>
            </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
