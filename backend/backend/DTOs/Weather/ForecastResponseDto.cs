namespace backend.DTOs.Weather;

public record ForecastResponseDto(
    string City,
    List<ForecastItemDto> Items
);