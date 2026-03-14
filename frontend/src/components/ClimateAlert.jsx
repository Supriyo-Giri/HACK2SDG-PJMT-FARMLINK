import React, { useState, useEffect } from "react";
import './css/ClimateAlert.css';
export const ClimateAlert = () => {
  const [alert, setAlert] = useState(null);
  // const API_KEY = 'YOUR_WEATHERAPI_KEY';
  const API_KEY = "45a0ff375b824b7bb99100320261403";

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=1&alerts=yes`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        // Add this inside your useEffect, right after fetching data
        console.log("Weather API Response:", data);
        if (data.alerts && data.alerts.alert.length > 0) {
          setAlert(data.alerts.alert[0].headline);
        }
      } catch (err) {
        console.error("Weather fetch failed");
      }
    });
  }, []);

  if (!alert) return null;

  // Inline styles object
  // const alertStyle = {
  //   backgroundColor: "#ffcc00", // Yellow background
  //   color: "#000", // Black text
  //   padding: "12px",
  //   textAlign: "center",
  //   fontWeight: "bold",
  //   position: "sticky",
  //   top: 0,
  //   zIndex: 1000,
  //   borderBottom: "2px solid #e6b800",
  //   fontSize: "14px",
  //   fontFamily: "sans-serif",
  // };
  
  return <div>{data}</div>
  // return <div style={alertStyle}>⚠️ Weather Alert: {alert}</div>;
};

// export default ClimateAlert;
