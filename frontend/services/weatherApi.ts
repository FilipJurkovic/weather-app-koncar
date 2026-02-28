import { CurrentWeather, ForecastResponse } from "@/types";
import { request } from "./api";

export const weatherApi = {
  getCurrent: (lat: number, lon: number) => request<CurrentWeather>(`/api/weather/current?lat=${lat}&lon=${lon}`),

  getForecast: (city: string) => request<ForecastResponse>(`/api/weather/forecast?city=${encodeURIComponent(city)}`),
};
