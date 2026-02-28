namespace backend.DTOs.Statistics;

public record StatsDto(
    List<TopCityDto> TopCities,
    List<RecentSearchDto> RecentSearches,
    List<ConditionDistributionDto> ConditionDistribution
);