import React, { useState } from "react";
import { Search, Sun, CloudRain, Wind, Droplet, GlassWater } from "lucide-react";
import axios from "axios";
import WeatherBox from "./components/WeatherBox";
import Footer from "./components/Footer";

const popularCities = ["Mumbai", "Delhi", "Pune", "Chennai",
  "New York", "Los Angeles", "Chicago", "Toronto", "Mexico City", 
    "Vancouver", "Montreal", "San Francisco", "Miami", "Washington D.C.",
    "Boston", "Seattle", "Houston", "Dallas", "Atlanta",

    "London", "Paris", "Berlin", "Madrid", "Rome",
    "Amsterdam", "Brussels", "Vienna", "Prague", "Budapest",
    "Warsaw", "Moscow", "Istanbul", "Athens", "Lisbon",
    "Dublin", "Stockholm", "Copenhagen", "Oslo", "Helsinki",
    "Zurich", "Milan", "Barcelona", "Munich", "Frankfurt",
    "Tokyo", "Beijing", "Shanghai", "Hong Kong", "Singapore",
    "Seoul", "Bangkok", "Mumbai", "Delhi", "Bangalore",
    "Dubai", "Abu Dhabi", "Kuala Lumpur", "Jakarta", "Manila",
    "Ho Chi Minh City", "Hanoi", "Taipei", "Osaka", "Kyoto",
    "Sydney", "Melbourne", "Auckland", "Wellington",
    "São Paulo", "Rio de Janeiro", "Buenos Aires", "Lima", "Bogotá",
    "Santiago", "Caracas", "Quito", "Montevideo", "Brasília",
    "New York", "London", "Tokyo", "Hong Kong", "Singapore",
    "Shanghai", "Frankfurt", "Zurich", "Sydney", "Dubai",
    


];

function App() {
  const apiKey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const matches = popularCities
        .filter((c) => c.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 8);
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const getWeatherData = async (cityName = city) => {
    if (!cityName || cityName.trim() === "") {
      alert("Please enter a city name");
      return;
    }

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );

      setWeatherData(response.data);
      console.log(response.data);

      setCity("");
      setSuggestions([]);
    } catch (error) {
      console.log("Error fetching weather data:", error);
      alert("City not found! Please try again.");
    }
  };

  const handleSuggestionClick = (s) => {
    setCity(s);
    getWeatherData(s);
  };

  function getWeatherIcon(main) {
    switch (main) {
      case "Clear":
        return <Sun size={80} strokeWidth={1.5} />;
      case "Clouds":
        return <CloudRain size={80} strokeWidth={1.5} />;
      case "Rain":
      case "Drizzle":
      case "Snow":
      case "Thunderstorm":
        return <CloudRain size={80} strokeWidth={1.5} />;
      case "Mist":
      case "Fog":
        return <Wind size={80} strokeWidth={1.5} />;
      default:
        return <CloudRain size={80} strokeWidth={1.5} />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-weather-gradient">
      {/* ✅ Main content */}
      <div className="flex flex-col flex-grow justify-center items-center px-4">
        <div className="max-w-5xl w-full shadow-2xl p-8 bg-weather-gradient backdrop-blur-sm rounded-2xl space-y-6 border-white/20">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 relative">
            <h1 className="font-bold text-4xl text-white tracking-wide">Weather Pro</h1>

            {/* Search Box */}
            <div className="w-full md:w-auto relative">
              <div className="flex items-center space-x-3">
                <input
                  type="text"
                  className="px-4 py-2 w-full bg-white/20 placeholder-white text-white border-2 border-white rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300"
                  placeholder="City"
                  value={city}
                  onChange={handleSearchChange}
                />
                <button className="p-3 cursor-pointer" onClick={() => getWeatherData()}>
                  <Search size={28} className="text-white" />
                </button>
              </div>

              {/* Suggestions List */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white text-black mt-2 rounded-xl overflow-hidden shadow-md max-h-48 overflow-y-auto">
                  {suggestions.map((s, index) => (
                    <li
                      key={index}
                      onClick={() => handleSuggestionClick(s)}
                      className="px-4 py-2 hover:bg-purple-100 cursor-pointer"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Weather Display */}
          {weatherData && (
            <>
              <div className="flex flex-col md:flex-row justify-between bg-weather-gradient backdrop-blur-sm rounded-xl p-6 shadow-xl space-y-4 md:space-y-0">
                <div className="space-y-2 text-left">
                  <div className="flex items-start justify-start space-x-2">
                    <h2 className="text-7xl md:text-8xl text-white font-bold">
                      {Math.round(weatherData.main.temp)}
                    </h2>
                    <span className="text-3xl md:text-5xl text-white">°C</span>
                  </div>
                  <h3 className="text-white text-xl md:text-2xl font-medium">
                    {`${weatherData.name}, ${weatherData.sys.country}`}
                  </h3>
                  <h4 className="text-white text-lg md:text-xl capitalize">
                    {weatherData.weather[0].main}
                  </h4>
                </div>
                <div className="text-white">
                  {getWeatherIcon(weatherData.weather[0].main)}
                </div>
              </div>

              {/* Info Boxes */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-white">
                <WeatherBox
                  icon={<Droplet size={32} />}
                  title="Humidity"
                  value={`${weatherData.main.humidity}%`}
                />
                <WeatherBox
                  icon={<GlassWater size={32} />}
                  title="Pressure"
                  value={`${weatherData.main.pressure} pHa`}
                />
                <WeatherBox
                  icon={<Wind size={32} />}
                  title="Wind Speed"
                  value={`${weatherData.wind.speed} km/h`}
                />
                <WeatherBox
                  icon={<Sun size={32} />}
                  title="Feels Like"
                  value={`${Math.round(weatherData.main.feels_like)}°C`}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/*  Footer */}
      <Footer />
    </div>
  );
}

export default App;






