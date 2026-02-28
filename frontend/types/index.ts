// -------------------------
// Auth
// -------------------------

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

// -------------------------
// Weather
// -------------------------

export interface CurrentWeather {
  city: string;
  temp: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
}

export interface ForecastItem {
  dateTime: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  description: string;
}

export interface ForecastResponse {
  city: string;
  items: ForecastItem[];
}

// -------------------------
// Search
// -------------------------

export interface SearchHistoryItem {
  id: number;
  city: string;
  weatherCondition: string;
  temperature: number;
  periodFrom: string;
  periodTo: string;
  searchedAt: string;
}

// -------------------------
// Stats
// -------------------------

export interface TopCity {
  city: string;
  count: number;
}

export interface RecentSearch {
  city: string;
  weatherCondition: string;
  temperature: number;
  searchedAt: string;
}

export interface ConditionDistribution {
  condition: string;
  count: number;
}

export interface Stats {
  topCities: TopCity[];
  recentSearches: RecentSearch[];
  conditionDistribution: ConditionDistribution[];
}

// -------------------------
// Filters
// -------------------------

export interface WeatherFilters {
  city: string;
  periodFrom: string;
  periodTo: string;
}
