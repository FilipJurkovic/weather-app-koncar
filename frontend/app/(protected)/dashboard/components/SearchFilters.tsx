"use client";

import { useWeatherStore } from "@/store/weatherStore";

// Format za datetime-local input — minute uvijek :00
function toInputFormat(value: string): string {
  if (!value) return "";
  const d = new Date(value);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
}

// Kad korisnik mijenja vrijednost, zaokruzi minute na :00
function normalizeInput(value: string): string {
  if (!value) return "";
  return value.slice(0, 13) + ":00"; // "YYYY-MM-DDTHH:00"
}

export default function SearchFilters() {
  const { filters, setFilters, forecast, minDate, maxDate } = useWeatherStore();

  if (!forecast) return null;

  const handleChange = (field: "periodFrom" | "periodTo", value: string) => {
    setFilters({ [field]: normalizeInput(value) });
  };

  const handleReset = () => {
    setFilters({ periodFrom: minDate, periodTo: maxDate });
  };

  const isChanged = filters.periodFrom !== minDate || filters.periodTo !== maxDate;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Filtriraj rezultate</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Od datuma</label>
          <input
            type="datetime-local"
            value={toInputFormat(filters.periodFrom)}
            min={minDate}
            max={filters.periodTo || maxDate}
            step={3600} // korak od 1 sat — sprjecava odabir minuta
            onChange={(e) => handleChange("periodFrom", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Do datuma</label>
          <input
            type="datetime-local"
            value={toInputFormat(filters.periodTo)}
            min={filters.periodFrom || minDate}
            max={maxDate}
            step={3600} // korak od 1 sat
            onChange={(e) => handleChange("periodTo", e.target.value)}
            className="w-full border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {isChanged && (
        <button onClick={handleReset} className="mt-3 text-sm text-gray-400 hover:text-gray-600 transition">
          Resetiraj na cijeli period
        </button>
      )}
    </div>
  );
}
