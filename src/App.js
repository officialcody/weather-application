import React, { useState } from "react";
import { useEffect } from "react";
import {
  REACT_APP_WEATHER_API_KEY,
  REACT_APP_WEATHER_API_URL,
} from "../env.config.js";

const App = () => {
  const [latitude, setLatitude] = useState("30.1718506");
  const [longitude, setLongitude] = useState("77.297967");
  const [data, setData] = useState([]);

  const fetchDataFromApi = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const completeURL = `${REACT_APP_WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${REACT_APP_WEATHER_API_KEY}`;
    await fetch(completeURL)
      .then((res) => res.json())
      .then((result) => {
        setData(result);
        console.log(result);
      });
  };

  useEffect(() => {
    fetchDataFromApi();
  }, [latitude, longitude]);

  return <div>Weather Application</div>;
};

export default App;
