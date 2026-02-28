"use client";

import { useWeatherStore } from "@/store/weatherStore";

export default function SearchFilters() {
  const { filters, setFilters, forecast } = useWeatherStore();

  if (!forecast) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Filtriraj rezultate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Od datuma</label>
          <input
            type="datetime-local"
            value={filters.periodFrom}
            onChange={(e) => setFilters({ periodFrom: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Do datuma</label>
          <input
            type="datetime-local"
            value={filters.periodTo}
            onChange={(e) => setFilters({ periodTo: e.target.value })}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      {(filters.periodFrom || filters.periodTo) && (
        <button
          onClick={() => setFilters({ periodFrom: "", periodTo: "" })}
          className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          Resetiraj filtere
        </button>
      )}
    </div>
  );
}
