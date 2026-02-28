import { ForecastItem, ForecastResponse, WeatherFilters } from "@/types";
import { create } from "zustand";

interface WeatherState {
  forecast: ForecastResponse | null;
  filteredItems: ForecastItem[];
  filters: WeatherFilters;
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

// Filtrira forecast items prema aktivnim filterima
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
  isLoading: false,
  error: null,

  setForecast: (data) => {
    const filtered = applyFilters(data.items, get().filters);
    set({
      forecast: data,
      filteredItems: filtered,
      error: null,
    });
  },

  // Kad se filteri promijene, automatski ažuriraj filteredItems
  // Grid i graf čitaju filteredItems - oba se automatski ažuriraju
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
      error: null,
    });
  },
}));
