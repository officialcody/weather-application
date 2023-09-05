import React, { useState } from "react";
import { useEffect } from "react";

const App = () => {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState([]);

  const fetchDataFromApi = async () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    const completeURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=e8f5eb4d5ac847385c220ddc60d5ed29`;
    console.log(completeURL);
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
