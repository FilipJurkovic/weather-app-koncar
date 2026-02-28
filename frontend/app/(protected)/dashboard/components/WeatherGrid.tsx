"use client";

import { useWeatherStore } from "@/store/weatherStore";

export default function WeatherGrid() {
  const { filteredItems, forecast } = useWeatherStore();

  if (!forecast) return null;

  if (filteredItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Prognoza — {forecast.city}</h2>
        <p className="text-gray-400 text-sm">Nema podataka za odabrani period.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Prognoza — {forecast.city}</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-gray-500 text-left">
              <th className="pb-3 pr-4 font-medium">Datum i vrijeme</th>
              <th className="pb-3 pr-4 font-medium">Uvjet</th>
              <th className="pb-3 pr-4 font-medium">Temp (°C)</th>
              <th className="pb-3 pr-4 font-medium">Vlažnost (%)</th>
              <th className="pb-3 font-medium">Vjetar (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item, index) => (
              <tr key={index} className="border-b last:border-0 hover:bg-gray-50 transition">
                <td className="py-3 pr-4 text-gray-700">
                  {new Date(item.dateTime).toLocaleString("hr-HR", {
                    day: "2-digit",
                    month: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="py-3 pr-4">
                  <span className="capitalize text-gray-700">{item.description}</span>
                </td>
                <td className="py-3 pr-4 font-medium">{Math.round(item.temp)}°</td>
                <td className="py-3 pr-4 text-gray-700">{item.humidity}%</td>
                <td className="py-3 text-gray-700">{item.windSpeed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
