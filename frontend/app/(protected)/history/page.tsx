"use client";

import { useEffect, useState } from "react";
import { searchApi } from "@/services/searchApi";
import { SearchHistoryItem } from "@/types";

export default function HistoryPage() {
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await searchApi.getHistory();
        setHistory(data);
      } catch {
        setError("Nije moguće dohvatiti povijest pretraga.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6 text-red-500 text-sm">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Povijest pretraga</h1>

      {history.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-6 text-gray-400 text-sm">
          Još nema pretraga.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-gray-500 text-left">
                  <th className="pb-3 pr-4 font-medium">Grad</th>
                  <th className="pb-3 pr-4 font-medium">Uvjet</th>
                  <th className="pb-3 pr-4 font-medium">Temp (°C)</th>
                  <th className="pb-3 pr-4 font-medium">Period od</th>
                  <th className="pb-3 pr-4 font-medium">Period do</th>
                  <th className="pb-3 font-medium">Pretraženo</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-3 pr-4 font-medium">{item.city}</td>
                    <td className="py-3 pr-4 text-gray-600">{item.weatherCondition}</td>
                    <td className="py-3 pr-4">{Math.round(item.temperature)}°</td>
                    <td className="py-3 pr-4 text-gray-600">
                      {new Date(item.periodFrom).toLocaleDateString("hr-HR")}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">
                      {new Date(item.periodTo).toLocaleDateString("hr-HR")}
                    </td>
                    <td className="py-3 text-gray-600">
                      {new Date(item.searchedAt).toLocaleString("hr-HR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}