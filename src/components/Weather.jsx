import React, { useEffect, useRef, useState } from "react";
import "./weather.css";
import searchIcon from "../Assets/search.png";
import clearIcon from "../Assets/clear.png";
import cloudIcon from "../Assets/cloud.png";
import drizzleIcon from "../Assets/drizzle.png";
import humidityIcon from "../Assets/humidity.png";
import rainIcon from "../Assets/rain.png";
import snowIcon from "../Assets/snow.png";
import windIcon from "../Assets/wind.png";

function Weather() {
  const apiKey = process.env.REACT_APP_API_KEY;
  console.log(apiKey);
  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clearIcon,
    "01n": clearIcon,
    "02d": cloudIcon,
    "02n": cloudIcon,
    "03d": drizzleIcon,
    "03n": drizzleIcon,
    "04d": humidityIcon,
    "04n": humidityIcon,
    "05d": rainIcon,
    "05n": rainIcon,
    "06d": snowIcon,
    "06n": snowIcon,
    "07d": windIcon,
    "07n": windIcon,
  };

  const inputRef = useRef(); //   1

  const search = async (city) => {
    if (city === "") {
      alert(`Please enter a city name `);
      return;
    }
    try {
      //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=f0596009edf904528de2eebe08de1f29`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || clearIcon;
      setWeatherData({
        humidity: data.main.humidity,
        location: data.name,
        windSpeed: data.wind.speed,
        temp: Math.floor(data.main.temp),
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("error:", error);
    }
  };

  useEffect(() => {
    search("bangalore");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input type="text" placeholder="Search" ref={inputRef} />
        {/* 2 */}
        <img
          src={searchIcon}
          onClick={() => search(inputRef.current.value)}
          alt="searchIcon"
        />
        {/* 3 */}
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="clearIcon" className="weatherIcon" />
          <p className="temperature">{weatherData.temp}°c</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidityIcon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={windIcon} alt="humidity" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
