import { useState, useEffect } from "react";
import Autocomplete from "./compoents/AutoComplete/Autocomplete";
import { getWeatherByCity } from "./services/weatherApi";
import "./App.css";
import InfoCard from "./compoents/infoCard/InfoCard";
import FavcityCard from "./compoents/FavcityCard/FavcityCard";
import { addFavorite, removeFavorite, getFavorites } from "./utils/utils";

function App() {
  // States
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = getFavorites();
    setFavorites(storedFavorites);
  }, []);

  // Fetch weather data based on selected city
  const fetchWeather = async (selectedCity) => {
    setLoading(true);
    setError(null);
    setWeatherData(null); // Reset weather data when fetching new data
    try {
      const data = await getWeatherByCity(selectedCity);
      setWeatherData(data);
    } catch (err) {
      setError("Unable to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  // Handles city selection from Autocomplete
  const handleSelectCity = (selectedCity) => {
    if (!selectedCity) return;
    setCity(selectedCity);
    fetchWeather(selectedCity);
  };

  // Handles adding/removing cities to/from favorites
  const handleFavoriteToggle = (city) => {
    if (!city) return;
    const isFavorite = favorites.includes(city);
    if (isFavorite) {
      removeFavorite(city);
    } else {
      addFavorite(city);
    }
    setFavorites(getFavorites()); // Refresh the favorite cities from localStorage
  };

  return (
    <div className="app-container">
      <div className="left-section">
        <Autocomplete onSelect={handleSelectCity} selectedCity={city} />
        
        {loading && <p>Loading weather data...</p>}

        {/* Display weather info */}
        {weatherData && (
          <div className="weather-info">
            <img 
              className="weather-icon" 
              src={weatherData.current?.condition?.icon} 
              alt="Weather icon" 
            />
            <h1 className="temperature">
              {weatherData?.current?.temp_c}<sup>°C</sup>
            </h1>
            <p className="weather-condition">{weatherData.current?.condition?.text}</p>
            <p className="weather-location">
              {weatherData.location.name}, {weatherData.location.country}
            </p>
            <div className="additional-info">
              <InfoCard title="Wind" data={weatherData.current?.wind_kph} unit="km/h" />
              <InfoCard title="Humidity" data={weatherData.current?.humidity} unit="%" />
            </div>
            <button 
              onClick={() => handleFavoriteToggle(city)} 
              className="add-favorite-button"
            >
              {favorites.includes(city) ? 'Remove From Favorites' : 'Add to Favorites'}
            </button>
          </div>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Favorites Section */}
      <div className="right-section">
        <h2 className="fav-heading">Favorite Cities</h2>
        <div className="fav-cities">
          {favorites?.length > 0 ? (
            favorites.map((favCity, idx) => (
              <FavcityCard key={idx} name={favCity} handleClick={handleSelectCity} />
            ))
          ) : (
            <p>No favorite cities added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;