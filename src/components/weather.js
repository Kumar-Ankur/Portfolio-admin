import moment from "moment";
import React, { useEffect, useState } from "react";
import FadeLoader from "react-spinners/FadeLoader";

const Weather = () => {
  const [latlong, setLatLong] = useState("28.67,77.22");
  const [region, setRegion] = useState("");
  const [country, setCountry] = useState("");
  const [temp, setTemp] = useState("");
  const [cloudText, setCloudText] = useState("");
  const [cloudImg, setCloudImg] = useState("");
  const [isSpinnerVisible, setIsSpinnerVisisble] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatLong(`${position.coords.latitude},${position.coords.longitude}`);
        getWeatherInfo();
      },
      (err) => {
        console.log(err);
        getWeatherInfo();
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [latlong]);

  const getWeatherInfo = () => {
    setIsSpinnerVisisble(true);
    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${latlong}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": process.env.REACT_APP_RAPID_API_HOST,
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setIsSpinnerVisisble(false);
        setRegion(res.location.region);
        setCountry(res.location.country);
        setTemp(res.forecast.forecastday[0].day.mintemp_c);
        setCloudText(res.forecast.forecastday[0].day.condition.text);
        setCloudImg(`http:${res.forecast.forecastday[0].day.condition.icon}`);
      })
      .catch((err) => {
        setIsSpinnerVisisble(false);
      });
  };

  return (
    <>
      {isSpinnerVisible && (
        <div className="weatherSpinner">
          <div className="weatherSpinner_loading">
            <FadeLoader />
          </div>
        </div>
      )}
      <div className="weather">
        <div className="weather_temp">
          {temp}
          <sup className="weather_temp-degree">°F</sup>
        </div>
        <div className="weather_location">
          {region}, {country}
        </div>
        <img src={cloudImg} alt="cloudImg" className="weather_icon" />
        <div className="weather_text">{cloudText}</div>
        <div className="weather_date">{moment(new Date()).format("MMMM DD")}</div>
      </div>
    </>
  );
};

export default Weather;
