import React, { useState, useEffect } from 'react';
import "./css/Features.css";

const Features = () => {
  // 1. Updated state to hold the full weather object
  const [weatherData, setWeatherData] = useState(null);
  
  // SECRECY NOTE: Use process.env.REACT_APP_WEATHER_API_KEY in production!
  const API_KEY = "45a0ff375b824b7bb99100320261403"; 
  
  useEffect(() => {
    if (!navigator.geolocation) return;
  
    navigator.geolocation.getCurrentPosition(async (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=1&alerts=yes`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("Weather API Response:", data);
        
        // 2. Store the whole data object so we can use temp and location
        setWeatherData(data);
      } catch (err) {
        console.error("Weather fetch failed");
      }
    });
  }, []);

  const coreFeatures = [
    { icon: "🧪", title: "Precision NPK Blends", description: "Customized Nitrogen, Phosphorus, and Potassium ratios specifically for foliage, roots, or blooms." },
    { icon: "🦠", title: "Microbial Catalyst", description: "Our 60-70% organic matter formula activates soil bacteria to unlock locked-away nutrients." },
    { icon: "♻️", title: "Circular Sourcing", description: "100% natural ingredients sourced from sustainable composting, reducing carbon footprints." },
    { icon: "🛡️", title: "Chemical-Free Safety", description: "Zero synthetic fillers. Safe for pets, children, and the beneficial insects in your garden." }
  ];

  return (
    <section className="features-section-wrapper">
      <div className="features-header">
        <span className="features-badge">Our Natural Advantage</span>
        <h2 className="features-main-title">Better for Plants, Better for Earth</h2>
        <div className="title-underline"></div>
      </div>

      <div className="features-grid-container">
        {coreFeatures.map((feature, index) => (
          <div key={index} className="feature-card">
            <div className="card-inner">
              <div className="feature-icon-box">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <div className="card-decoration"></div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="results-banner">
        <p><strong>Visible results in 2–6 weeks</strong> — verified by our growth stage testing.</p>
      </div>

      {/* 3. Weather Display Logic at the end of the section */}
      {/* {weatherData && (
        <div className="weather-update-footer">
          {weatherData.alerts?.alert?.length > 0 ? (
            <div className="weather-alert-box">
              ⚠️ <strong>Alert:</strong> {weatherData.alerts.alert[0].headline}
            </div>
          ) : (
            <div className="weather-info-box">
              🌤️ <strong>Local Garden Weather:</strong> {weatherData.location.name}, {weatherData.current.temp_c}°C ({weatherData.current.condition.text})
            </div>
          )}
        </div>
      )}*/}
      
      {/* {weatherData && (
        <div className="garden-weather-container">
          <div className="weather-header">
            <h3>🌱 Garden Intelligence Dashboard</h3>
            <p className="weather-location">📍 {weatherData.location?.name}, {weatherData.location?.region}</p>
          </div>
      
          <div className="weather-main-grid">
            
            <div className="weather-box current">
              <span className="box-label">Today</span>
              <div className="box-content">
                <span className="big-temp">{weatherData.current?.temp_c}°C</span>
                <p className="condition">{weatherData.current?.condition?.text}</p>
                <div className="weather-stats">
                  <span>💧 {weatherData.current?.humidity}% Humid</span>
                  <span>🌧️ {weatherData.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain}% Rain</span>
                </div>
              </div>
            </div>
      
           
            <div className="weather-box">
              <span className="box-label">In 2 Hours</span>
              {(() => {
                const currentHour = new Date().getHours();
                const targetHour = (currentHour + 2) % 24;
                const dayIdx = (currentHour + 2) > 23 ? 1 : 0;
                const forecast = weatherData.forecast?.forecastday?.[dayIdx]?.hour?.[targetHour];
                
                return forecast ? (
                  <div className="box-content">
                    <span className="small-temp">{forecast.temp_c}°C</span>
                    <p className="condition">{forecast.condition?.text}</p>
                    <p className="stats">🌧️ {forecast.chance_of_rain}% Rain</p>
                  </div>
                ) : <p>Loading...</p>;
              })()}
            </div>
      
         
            <div className="weather-box">
              <span className="box-label">Tomorrow</span>
              {weatherData.forecast?.forecastday?.[1] ? (
                <div className="box-content">
                  <span className="small-temp">{weatherData.forecast.forecastday[1].day?.avgtemp_c}°C</span>
                  <p className="condition">{weatherData.forecast.forecastday[1].day?.condition?.text}</p>
                  <p className="stats">🌧️ {weatherData.forecast.forecastday[1].day?.daily_chance_of_rain}% Rain</p>
                </div>
              ) : <p className="stats">No data</p>}
            </div>
          </div>
      

          <div className="crop-recommendation-card">
            <div className="advice-icon">💡</div>
            <div className="advice-text">
              <h4>Planting Insight</h4>
              <p>Based on current conditions, it's a great time to focus on: 
                <strong> {weatherData.current?.temp_c > 30 
                  ? "Okra, Hot Peppers, and Eggplant." 
                  : weatherData.current?.temp_c > 18 
                  ? "Tomatoes, Lettuce, and Cucumbers." 
                  : "Carrots, Spinach, and Kale."}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}*/}
      
      {weatherData && (
        <div className="garden-weather-container">
          <div className="weather-header">
            <h3>🌱 Garden Intelligence Dashboard</h3>
            <p className="weather-location">📍 {weatherData.location?.name}, {weatherData.location?.region}</p>
          </div>
      
          {/* ALERT SYSTEM LOGIC */}
          {(() => {
            const current = weatherData.current;
            const todayForecast = weatherData.forecast?.forecastday?.[0]?.day;
            const alerts = [];
      
            // Logic for Abnormality Detection
            if (true || current?.temp_c > 35) alerts.push({ type: 'heat', msg: 'Extreme Heat Warning: Water plants deeply now!' });
            if (current?.temp_c < 4) alerts.push({ type: 'frost', msg: 'Frost Risk: Cover sensitive seedlings tonight.' });
            if (current?.wind_kph > 40) alerts.push({ type: 'wind', msg: 'High Winds: Secure tall plants or trellises.' });
            if (todayForecast?.daily_chance_of_rain > 80) alerts.push({ type: 'rain', msg: 'Heavy Rain Expected: Check drainage to avoid root rot.' });
      
            return alerts.length > 0 ? (
              <div className="garden-alerts-section">
                {alerts.map((alert, index) => (
                  <div key={index} className={`alert-banner ${alert.type}`}>
                    <span className="alert-icon">⚠️</span>
                    <p>{alert.msg}</p>
                  </div>
                ))}
              </div>
            ) : null;
          })()}
      
          <div className="weather-main-grid">
            {/* TODAY CARD */}
            <div className="weather-box current">
              <span className="box-label">Today</span>
              <div className="box-content">
                <span className="big-temp">{weatherData.current?.temp_c}°C</span>
                <p className="condition">{weatherData.current?.condition?.text}</p>
                <div className="weather-stats">
                  <span>💧 {weatherData.current?.humidity}% Humid</span>
                  <span>🌧️ {weatherData.forecast?.forecastday?.[0]?.day?.daily_chance_of_rain}% Rain</span>
                </div>
              </div>
            </div>
      
            {/* 2 HOURS CARD */}
            <div className="weather-box">
              <span className="box-label">In 2 Hours</span>
              {(() => {
                const currentHour = new Date().getHours();
                const targetHour = (currentHour + 2) % 24;
                const dayIdx = (currentHour + 2) > 23 ? 1 : 0;
                const forecast = weatherData.forecast?.forecastday?.[dayIdx]?.hour?.[targetHour];
                
                return forecast ? (
                  <div className="box-content">
                    <span className="small-temp">{forecast.temp_c}°C</span>
                    <p className="condition">{forecast.condition?.text}</p>
                    <p className="stats">🌧️ {forecast.chance_of_rain}% Rain</p>
                  </div>
                ) : <p>Loading...</p>;
              })()}
            </div>
      
            {/* 24 HOURS CARD */}
            <div className="weather-box">
              <span className="box-label">Tomorrow</span>
              {weatherData.forecast?.forecastday?.[1] ? (
                <div className="box-content">
                  <span className="small-temp">{weatherData.forecast.forecastday[1].day?.avgtemp_c}°C</span>
                  <p className="condition">{weatherData.forecast.forecastday[1].day?.condition?.text}</p>
                  <p className="stats">🌧️ {weatherData.forecast.forecastday[1].day?.daily_chance_of_rain}% Rain</p>
                </div>
              ) : <p className="stats">No data</p>}
            </div>
          </div>
      
          {/* CROP RECOMMENDATION SECTION */}
          <div className="crop-recommendation-card">
            <div className="advice-icon">💡</div>
            <div className="advice-text">
              <h4>Planting Insight</h4>
              <p>Based on current conditions, it's a great time to focus on: 
                <strong> {weatherData.current?.temp_c > 30 
                  ? "Okra, Hot Peppers, and Eggplant." 
                  : weatherData.current?.temp_c > 18 
                  ? "Tomatoes, Lettuce, and Cucumbers." 
                  : "Carrots, Spinach, and Kale."}
                </strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
