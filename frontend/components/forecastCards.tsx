// components/ForecastCards.tsx
import React from "react";

interface ForecastCardProps {
  day: string;
  temperature: string;
  icon: string;
  description: string;
}

interface ForecastCardsProps {
  forecasts: ForecastCardProps[];
}

const ForecastCards: React.FC<ForecastCardsProps> = ({ forecasts }) => {
  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
      {forecasts.map((forecast, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center justify-center"
        >
          <p className="font-semibold">{forecast.day}</p>
          <img src={forecast.icon} alt="Weather Icon" className="w-16 h-16 my-2 animate-bounce" />
          <p className="text-lg font-bold">{forecast.temperature}</p>
          <p className="text-sm capitalize">{forecast.description}</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCards;
