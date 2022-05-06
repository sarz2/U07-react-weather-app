import React, { useEffect, useState } from "react";
import axios from "axios";

const Forecast = (props) => {
  const [forecast, setForecast] = useState([]);
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("metric");
  const appId = "e3f4c3ac9b20eb9eace376b2dd72bf27";

  useEffect(() => {
    const search = async () => {
      const { data } = await axios.get(
        "https://api.openweathermap.org/data/2.5/forecast",
        {
          params: {
            lat: props.lat,
            lon: props.long,
            units: unit,
            appid: appId,
          },
        }
      );
      setForecast(data.list);
    };
    search();
    todaysDate();
  }, [props.lat, props.long, unit]);

  const renderedForecast = forecast.map((result) => {
    if (result.dt_txt.slice(0, -9) === date) {
      return (
        <>
          <div key={result.weather.id}>{result.dt_txt}</div>
          <div>{result.main.temp}</div>
          <div>{result.wind.speed}</div>
          <div>{result.main.humidity}</div>
        </>
      );
    } else if (result.dt_txt.slice(11) === "12:00:00") {
      return <div>{result.main.temp}</div>;
    }
    return "";
  });

  let todaysDate = () => {
    let today = new Date().toISOString().slice(0, 10);
    setDate(today);
  };

  const unitName = () => {
    if (unit === "imperial") {
      setUnit("metric");
      return <div>Celcius</div>;
    }
    setUnit("imperial");
    return <div>Fahrenheit</div>;
  };

  return (
    <div>
      <div>{renderedForecast}</div>
      <button onClick={unitName}></button>
    </div>
  );
};

export default Forecast;