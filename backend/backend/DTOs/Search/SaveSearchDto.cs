namespace backend.DTOs.Search;

public record SaveSearchDto(
    string City,
    string WeatherCondition,
    double Temperature,
    DateTime PeriodFrom,
    DateTime PeriodTo
);
