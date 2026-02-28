import { ForecastItem, ForecastResponse, WeatherFilters } from "@/types";
import { create } from "zustand";

interface WeatherState {
  forecast: ForecastResponse | null;
  filteredItems: ForecastItem[];
  filters: WeatherFilters;
  minDate: string;
  maxDate: string;
  isLoading: boolean;
  error: string | null;

  setForecast: (data: ForecastResponse) => void;
  setFilters: (filters: Partial<WeatherFilters>) => void;
  clearForecast: () => void;
}

const defaultFilters: WeatherFilters = {
  city: "",
  periodFrom: "",
  periodTo: "",
};

function toInputFormat(dateStr: string): string {
  const d = new Date(dateStr);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:00`;
}

function applyFilters(items: ForecastItem[], filters: WeatherFilters): ForecastItem[] {
  return items.filter((item) => {
    const date = new Date(item.dateTime);
    if (filters.periodFrom && date < new Date(filters.periodFrom)) return false;
    if (filters.periodTo && date > new Date(filters.periodTo)) return false;
    return true;
  });
}

export const useWeatherStore = create<WeatherState>((set, get) => ({
  forecast: null,
  filteredItems: [],
  filters: defaultFilters,
  minDate: "",
  maxDate: "",
  isLoading: false,
  error: null,

  setForecast: (data) => {
    const first = data.items[0];
    const last = data.items[data.items.length - 1];

    // Postavi defaultne filtere na prvi i zadnji item iz API-ja
    const periodFrom = toInputFormat(first.dateTime);
    const periodTo = toInputFormat(last.dateTime);

    const filters = {
      ...defaultFilters,
      city: data.city,
      periodFrom,
      periodTo,
    };

    set({
      forecast: data,
      filteredItems: applyFilters(data.items, filters),
      filters,
      minDate: periodFrom,
      maxDate: periodTo,
      error: null,
    });
  },

  setFilters: (newFilters) => {
    const filters = { ...get().filters, ...newFilters };
    const forecast = get().forecast;
    const filteredItems = forecast ? applyFilters(forecast.items, filters) : [];
    set({ filters, filteredItems });
  },

  clearForecast: () => {
    set({
      forecast: null,
      filteredItems: [],
      filters: defaultFilters,
      minDate: "",
      maxDate: "",
      error: null,
    });
  },
}));
