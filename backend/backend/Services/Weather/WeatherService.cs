using System.Text.Json;
using backend.DTOs.Weather;

namespace backend.Services.Weather;

public class WeatherService : IWeatherService
{
    private readonly HttpClient _http;
    private readonly string _apiKey;
    private const string BaseUrl = "https://api.openweathermap.org/data/2.5";

    public WeatherService(HttpClient http, IConfiguration config)
    {
        _http = http;
        _apiKey = config["OpenWeather:ApiKey"]!;
    }

    public async Task<CurrentWeatherDto?> GetCurrentWeatherAsync(double lat, double lon)
    {
        var url = $"{BaseUrl}/weather?lat={lat}&lon={lon}&appid={_apiKey}&units=metric";
        var json = await FetchAsync(url);
        if (json == null) return null;

        return new CurrentWeatherDto(
            City: json.Value.GetProperty("name").GetString()!,
            Temp: json.Value.GetProperty("main").GetProperty("temp").GetDouble(),
            FeelsLike: json.Value.GetProperty("main").GetProperty("feels_like").GetDouble(),
            Humidity: json.Value.GetProperty("main").GetProperty("humidity").GetInt32(),
            WindSpeed: json.Value.GetProperty("wind").GetProperty("speed").GetDouble(),
            Condition: json.Value.GetProperty("weather")[0].GetProperty("main").GetString()!,
            Description: json.Value.GetProperty("weather")[0].GetProperty("description").GetString()!
        );
    }

    public async Task<ForecastResponseDto?> GetForecastAsync(string city)
    {
        var url = $"{BaseUrl}/forecast?q={Uri.EscapeDataString(city)}&appid={_apiKey}&units=metric";
        var json = await FetchAsync(url);
        if (json == null) return null;

        var cityName = json.Value.GetProperty("city").GetProperty("name").GetString()!;

        var items = json.Value.GetProperty("list").EnumerateArray().Select(item =>
            new ForecastItemDto(
                DateTime: DateTimeOffset.FromUnixTimeSeconds(item.GetProperty("dt").GetInt64()).UtcDateTime,
                Temp: item.GetProperty("main").GetProperty("temp").GetDouble(),
                Humidity: item.GetProperty("main").GetProperty("humidity").GetInt32(),
                WindSpeed: item.GetProperty("wind").GetProperty("speed").GetDouble(),
                Condition: item.GetProperty("weather")[0].GetProperty("main").GetString()!,
                Description: item.GetProperty("weather")[0].GetProperty("description").GetString()!
            )
        ).ToList();

        return new ForecastResponseDto(cityName, items);
    }

    private async Task<JsonElement?> FetchAsync(string url)
    {
        var response = await _http.GetAsync(url);
        if (!response.IsSuccessStatusCode) return null;

        var json = await response.Content.ReadAsStringAsync();
        return JsonSerializer.Deserialize<JsonElement>(json);
    }
}
