namespace backend.DTOs.Weather;

public record ForecastItemDto(
    DateTime DateTime,
    double Temp,
    int Humidity,
    double WindSpeed,
    string Condition,
    string Description
);
