namespace backend.DTOs.Search;

public record SearchHistoryDto(
    int Id,
    string City,
    string WeatherCondition,
    double Temperature,
    DateTime PeriodFrom,
    DateTime PeriodTo,
    DateTime SearchedAt
);