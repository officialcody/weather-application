import React, { useState } from "react";
import { useEffect } from "react";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_WEATHER_API_URL,
} from "../env.config.js";
import { Dimmer, Loader } from "semantic-ui-react";
import Weather from "./Weather.jsx";
import "./App.css";

const App = () => {
  const [latitude, setLatitude] = useState("30.1718506");
  const [longitude, setLongitude] = useState("77.297967");
  const [data, setData] = useState([]);

  const fetchDataFromApi = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const weatherAPIURL = `${REACT_APP_WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}`;
    await fetch(weatherAPIURL)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [latitude, longitude]);

  return (
    <div className="App">
      {typeof data.main !== "undefined" ? (
        <Weather weatherData={data} />
      ) : (
        <div>
          <Dimmer active>
            <Loader>Loading..</Loader>
          </Dimmer>
        </div>
      )}
    </div>
  );
};

export default App;
