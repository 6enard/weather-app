import React, { useState } from "react";

type SearchBarProps = {
  onSearch: (city: string) => void;
  onToggleTempUnit: () => void;
  isCelsius: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onToggleTempUnit, isCelsius }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city) {
      onSearch(city); // Trigger the search
      setCity(""); // Clear input field
    }
  };

  return (
    <div className="flex items-center justify-between w-full max-w-3xl mx-auto p-4">
      {/* Input Box */}
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Search city"
        className="p-2 border border-gray-300 rounded-md mr-1 w-2/3 focus:outline-none focus:ring-2 focus:ring-blue-500" // Reduced margin-right (mr-2)
      />

      {/* GO Button */}
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        GO
      </button>

      {/* Toggle Button (°C / °F) */}
      <button
        onClick={onToggleTempUnit}
        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-300"
      >
        {isCelsius ? "°C" : "°F"}
      </button>
    </div>
  );
};

export default SearchBar;
