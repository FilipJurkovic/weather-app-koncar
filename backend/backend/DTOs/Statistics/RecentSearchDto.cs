namespace backend.DTOs.Statistics;

public record RecentSearchDto(
    string City,
    string WeatherCondition,
    double Temperature,
    DateTime SearchedAt
);