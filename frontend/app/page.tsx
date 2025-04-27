// pages/Page.tsx
"use client";

import { useState } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";

export default function Page() {
  const [city, setCity] = useState<string>("");
  const [weatherData, setWeatherData] = useState<{
    icon: string;
    temperature: string;
    description: string;
    location: string;
    date: string;
  } | null>(null);
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
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Error fetching weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (city: string) => {
    setCity(city);
    fetchWeatherData(city, isCelsius ? "metric" : "imperial");
  };

  const handleToggleTempUnit = () => {
    setIsCelsius((prev) => {
      const newIsCelsius = !prev;
      if (city) {
        fetchWeatherData(city, newIsCelsius ? "metric" : "imperial");
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
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 to-indigo-500 text-white rounded-2xl shadow-lg p-8 mt-6 w-full max-w-md">
          <CurrentWeather
            icon={weatherData.icon}
            temperature={weatherData.temperature}
            description={weatherData.description}
            location={weatherData.location}
            date={weatherData.date}
          />
        </div>
      )}
    </div>
  );
}
