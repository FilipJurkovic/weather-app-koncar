"use client";

import { statsApi } from "@/services/statsApi";
import { Stats } from "@/types";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function StatsPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await statsApi.getStats();
        setStats(data);
      } catch {
        setError("Nije moguće dohvatiti statistike.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-sm p-6 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-40 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="bg-white rounded-2xl shadow-sm p-6 text-red-500 text-sm">{error}</div>;
  }

  if (!stats) return null;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Statistike</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Top 3 grada */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Top 3 grada</h2>
          {stats.topCities.length === 0 ? (
            <p className="text-gray-400 text-sm">Nema podataka.</p>
          ) : (
            <div className="space-y-3">
              {stats.topCities.map((city, index) => (
                <div key={city.city} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-300">{index + 1}</span>
                    <span className="font-medium">{city.city}</span>
                  </div>
                  <span className="text-sm text-gray-500">{city.count}x pretraženo</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Zadnje 3 pretrage */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Nedavne pretrage</h2>
          {stats.recentSearches.length === 0 ? (
            <p className="text-gray-400 text-sm">Nema podataka.</p>
          ) : (
            <div className="space-y-3">
              {stats.recentSearches.map((search, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{search.city}</span>
                    <span className="text-sm font-medium">{Math.round(search.temperature)}°C</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{search.weatherCondition}</span>
                    <span className="text-xs text-gray-400">
                      {new Date(search.searchedAt).toLocaleString("hr-HR", {
                        day: "2-digit",
                        month: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Distribucija vremenskih uvjeta */}
        <div className="bg-white rounded-2xl shadow-sm p-6 md:col-span-2 xl:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Vremenski uvjeti</h2>
          {stats.conditionDistribution.length === 0 ? (
            <p className="text-gray-400 text-sm">Nema podataka.</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.conditionDistribution}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="condition" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" name="Broj pretraga" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}
