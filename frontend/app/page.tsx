// pages/Page.tsx
"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/currentWeather";
import ForecastCards from "@/components/forecastCards";
import WeatherDetails from "../components/weatherDetails";

export default function Page() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<{
    icon: string;
    temperature: string;
    description: string;
    location: string;
    date: string;
    wind_speed: number;
    humidity: number;
  } | null>(null);
  const [forecastData, setForecastData] = useState<any[]>([]); // Forecast data
  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchWeatherData = async (
    city: string,
    unit: "metric" | "imperial" = "metric"
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/weather/${city}/${unit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }

      const data = await response.json();

      setWeatherData({
        icon: `http://openweathermap.org/img/wn/${data.icon}@2x.png`,
        temperature: `${data.temperature}°${unit === "metric" ? "C" : "F"}`,
        description: data.description,
        location: city,
        date: new Date().toLocaleDateString(),
        wind_speed: data.wind_speed,
        humidity: data.humidity,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchForecastData = async (
    city: string,
    unit: "metric" | "imperial" = "metric"
  ) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/forecast/${city}/${unit}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch forecast data");
      }

      const data = await response.json();
      setForecastData(data); // Save forecast data
    } catch (error) {
      console.error("Error fetching forecast data:", error);
    }
  };

  const handleSearch = (city: string) => {
    setCity(city);
    fetchWeatherData(city, isCelsius ? "metric" : "imperial");
    fetchForecastData(city, isCelsius ? "metric" : "imperial");
  };

  const handleToggleTempUnit = () => {
    setIsCelsius((prev) => {
      const newIsCelsius = !prev;
      if (city) {
        fetchWeatherData(city, newIsCelsius ? "metric" : "imperial");
        fetchForecastData(city, newIsCelsius ? "metric" : "imperial");
      }
      return newIsCelsius;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-gray-100">
      <SearchBar
        onSearch={handleSearch}
        onToggleTempUnit={handleToggleTempUnit}
        isCelsius={isCelsius}
      />

      {loading && <div className="mt-6">Loading weather...</div>}

      {weatherData && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mx-auto mt-6">
          {/* Left side: Current Weather */}
          <div className="flex flex-col justify-between bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl shadow-lg p-8">
            <CurrentWeather
              icon={weatherData.icon}
              temperature={weatherData.temperature}
              description={weatherData.description}
              location={weatherData.location}
              date={weatherData.date}
            />
          </div>

          {/* Right side: Forecast Cards and Weather Details */}
          <div className="flex flex-col space-y-8">
            <ForecastCards forecasts={forecastData} />
            <WeatherDetails
              windSpeed={weatherData.wind_speed}
              humidity={weatherData.humidity}
              isLoading={loading}
            />
          </div>
        </div>
      )}
    </div>
  );
}
