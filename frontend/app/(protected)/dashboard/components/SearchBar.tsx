"use client";

import { weatherApi } from "@/services/weatherApi";
import { useWeatherStore } from "@/store/weatherStore";
import { useState } from "react";

export default function SearchBar() {
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setForecast, setFilters } = useWeatherStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim()) return;

    setError(null);
    setIsLoading(true);

    try {
      const data = await weatherApi.getForecast(city.trim());
      setForecast(data);
      setFilters({ city: data.city });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Grad nije pronađen.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Pretraži grad</h2>
      <form onSubmit={handleSearch} className="flex gap-3">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="npr. Zagreb, London, Berlin..."
          className="flex-1 border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isLoading ? "Tražim..." : "Pretraži"}
        </button>
      </form>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
