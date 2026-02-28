namespace backend.DTOs.Weather;

public record CurrentWeatherDto(
    string City,
    double Temp,
    double FeelsLike,
    int Humidity,
    double WindSpeed,
    string Condition,
    string Description
);
