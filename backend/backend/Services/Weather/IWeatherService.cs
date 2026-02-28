using System.Text.Json;
using backend.DTOs.Weather;

namespace backend.Services.Weather;

public interface IWeatherService
{
    Task<CurrentWeatherDto?> GetCurrentWeatherAsync(double lat, double lon);
    Task<ForecastResponseDto?> GetForecastAsync(string city, int userId);
}