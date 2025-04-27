import React from 'react';
import { FaWind } from 'react-icons/fa'; // Importing wind icon
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; // Loading icon

interface WeatherDetailsProps {
  windSpeed: number; // Wind speed in km/h
  humidity: number; // Humidity percentage
  isLoading: boolean; // Boolean to track if data is loading
}

const WeatherDetails: React.FC<WeatherDetailsProps> = ({ windSpeed, humidity, isLoading }) => {
  return (
    <div className="w-full max-w-md mx-auto grid grid-cols-2 gap-4 mt-8">
      {/* Wind Speed Card */}
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <p className="font-semibold text-lg flex items-center justify-center">
          Wind Speed
        </p>
        <p className="text-2xl font-bold">{windSpeed} km/h </p>
        
      </div>

      {/* Humidity Card */}
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <p className="font-semibold text-lg">Humidity</p>
        
        {/* Loading indicator or humidity percentage */}
        <div className="relative">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-500 mx-auto" />
          ) : (
            <div className="w-full bg-gray-300 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full"
                style={{ width: `${humidity}%` }}
              ></div>
            </div>
          )}
        </div>

        <p className="text-2xl font-bold mt-2">{isLoading ? "Loading..." : `${humidity} %`}</p>
      </div>
    </div>
  );
};

export default WeatherDetails;
