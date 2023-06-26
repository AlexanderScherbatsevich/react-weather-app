import React, { useEffect, useState } from "react";
import ParseWeatherCode from "./ParseWeatherCode";

const Weather = () => {
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [parsedWeathercode, setParsedWeathercode] = useState({});

  const geocodingApi = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;
  const openweatherApi = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&weathercode&current_weather=true`;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        getWeatherCode();
      });
    }
  }, [lat, lon]);

  const searchLocation = () => {
    fetch(geocodingApi)
      .then((res) => res.json())
      .then((data) => {
        const res = { ...data };
        const { name, country } = res.results[0];
        setAddress(`${name}/${country}`);
        setLat(res.results[0].latitude);
        setLon(res.results[0].longitude);
        console.log(res.results[0]);
        getWeatherCode();
      })
      .catch((err) => console.error(err.message));
  };

  const getWeatherCode = () => {
    if (lat !== null && lon !== null) {
      fetch(openweatherApi)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          const { temperature, weathercode } = data.current_weather;
          setTemperature(temperature);
          setParsedWeathercode(ParseWeatherCode(weathercode));
          console.log("weather api");
          console.log(data);
        })
        .catch((err) => console.error(err.message));
    }
  };

  return (
    <div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => {
            setLocation(event.target.value);
            console.log(event.target.value);
          }}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <div>{address ? <p>{address}</p> : null}</div>
            <img src={parsedWeathercode.icon} alt="icon" className="icon" />
          </div>
          <div className="temperature">
            {temperature ? <h2>{temperature}°C</h2> : null}
            <div className="description">
              <p>{parsedWeathercode.weatherDesc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
