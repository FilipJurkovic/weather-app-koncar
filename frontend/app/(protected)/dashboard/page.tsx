import SearchBar from "./components/SearchBar";
import SearchFilters from "./components/SearchFilters";
import WeatherChart from "./components/WeatherChart";
import WeatherGrid from "./components/WeatherGrid";
import WeatherWidget from "./components/WeatherWidget";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <WeatherWidget />
      <SearchBar />
      <SearchFilters />
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <WeatherGrid />
        <WeatherChart />
      </div>
    </div>
  );
}
