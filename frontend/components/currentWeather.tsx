// components/CurrentWeather.tsx
import React from 'react';

interface CurrentWeatherProps {
  icon: string;
  temperature: string;
  description: string;
  location: string;
  date: string;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  icon,
  temperature,
  description,
  location,
  date,
}) => {
  return (
    <div className="flex flex-col justify-between h-full ">
      {/* Weather Icon */}
      <div className="flex justify-center">
        <img src={icon} alt="Weather icon" className="w-24 h-24 animate-pulse" />
      </div>

      {/* Temperature */}
      <h2 className="text-5xl font-bold text-center mt-4">{temperature}</h2>

      {/* Description */}
      <p className="text-center capitalize mt-2 text-lg">{description}</p>

      {/* Divider */}
      <div className="border-t border-white opacity-30 my-6"></div>

      {/* Location and Date at the bottom */}
      <div className="text-center text-sm mt-auto">
        <p className="font-semibold">{location}</p>
        <p className="text-xs">{date}</p>
      </div>
    </div>
  );
};

export default CurrentWeather;
