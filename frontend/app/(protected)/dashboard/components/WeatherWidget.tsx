"use client";

import { useEffect, useState } from "react";
import { weatherApi } from "@/services/weatherApi";
import { CurrentWeather } from "@/types";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Dohvati geolokaciju korisnika
    if (!navigator.geolocation) {
      setError("Geolokacija nije podržana u ovom pregledniku.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const data = await weatherApi.getCurrent(
            position.coords.latitude,
            position.coords.longitude
          );
          setWeather(data);
        } catch {
          setError("Nije moguće dohvatiti trenutno vrijeme.");
        } finally {
          setIsLoading(false);
        }
      },
      () => {
        setError("Pristup lokaciji odbijen.");
        setIsLoading(false);
      }
    );
  }, []);

  // Ikona ovisno o vremenskom uvjetu
  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "clear": return "☀️";
      case "clouds": return "☁️";
      case "rain": return "🌧️";
      case "drizzle": return "🌦️";
      case "thunderstorm": return "⛈️";
      case "snow": return "❄️";
      case "mist":
      case "fog": return "🌫️";
      default: return "🌤️";
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="h-10 bg-gray-200 rounded w-1/2" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400 text-sm">
        {error}
      </div>
    );
  }

  if (!weather) return null;

  return (
    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium">Trenutno vrijeme</p>
          <h2 className="text-2xl font-bold mt-1">{weather.city}</h2>
          <p className="text-blue-100 text-sm capitalize mt-1">{weather.description}</p>
        </div>
        <span className="text-6xl">{getWeatherIcon(weather.condition)}</span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div>
          <p className="text-blue-100 text-xs">Temperatura</p>
          <p className="text-xl font-semibold">{Math.round(weather.temp)}°C</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs">Osjet</p>
          <p className="text-xl font-semibold">{Math.round(weather.feelsLike)}°C</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs">Vlažnost</p>
          <p className="text-xl font-semibold">{weather.humidity}%</p>
        </div>
        <div>
          <p className="text-blue-100 text-xs">Vjetar</p>
          <p className="text-xl font-semibold">{weather.windSpeed} m/s</p>
        </div>
      </div>
    </div>
  );
}