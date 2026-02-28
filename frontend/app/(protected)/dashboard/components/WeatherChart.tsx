"use client";

import { useWeatherStore } from "@/store/weatherStore";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function WeatherChart() {
  const { filteredItems, forecast } = useWeatherStore();

  if (!forecast) return null;

  if (filteredItems.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">Graf — {forecast.city}</h2>
        <p className="text-gray-400 text-sm">Nema podataka za odabrani period.</p>
      </div>
    );
  }

  // Formatiraj podatke za Recharts
  const chartData = filteredItems.map((item) => ({
    time: new Date(item.dateTime).toLocaleString("hr-HR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.temp),
    humidity: item.humidity,
    wind: item.windSpeed,
  }));

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-6">Graf — {forecast.city}</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11 }} interval="preserveStartEnd" />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temp" name="Temperatura (°C)" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="humidity" name="Vlažnost (%)" stroke="#10b981" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="wind" name="Vjetar (m/s)" stroke="#f59e0b" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
