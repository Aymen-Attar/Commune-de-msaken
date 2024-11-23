import React, { useEffect, useState } from "react";
import axios from "axios";
import './weather.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Fetch weather data
    const fetchData = async () => {
      const apiKey = "";
      const city = "";
      const url = ``;

      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  const { name, main, weather } = weatherData;


  return (
    <div className="weather-container">
        <h2>Météo à {name}</h2>
        <p>Température : {main.temp}°C</p>
        <p>Conditions : {weather[0].description}</p>
        <p>Humidité : {main.humidity}%</p>

    </div>
  );
};

export default Weather;
