using backend.DTOs.Search;
using backend.DTOs.Statistics;
using backend.Repositories.Search;

namespace backend.Services.Search;

public class SearchService : ISearchService
{
    private readonly ISearchRepository _searchRepository;

    public SearchService(ISearchRepository searchRepository)
    {
        _searchRepository = searchRepository;
    }

    public async Task SaveSearchAsync(int userId, SaveSearchDto dto)
    {
        await _searchRepository.SaveAsync(userId, dto);
    }

    public async Task<List<SearchHistoryDto>> GetHistoryAsync(int userId)
    {
        var history = await _searchRepository.GetHistoryAsync(userId);

        return history.Select(s => new SearchHistoryDto(
            s.Id,
            s.City,
            s.WeatherCondition,
            s.Temperature,
            s.PeriodFrom,
            s.PeriodTo,
            s.SearchedAt
        )).ToList();
    }

    public async Task<StatsDto> GetStatsAsync(int userId)
    {
        // Dohvaćamo sve paralelno - nema razloga čekati jedno po jedno
        var topCitiesTask = _searchRepository.GetTopCitiesAsync(userId);
        var recentSearchesTask = _searchRepository.GetRecentSearchesAsync(userId);
        var conditionDistributionTask = _searchRepository.GetConditionDistributionAsync(userId);

        await Task.WhenAll(topCitiesTask, recentSearchesTask, conditionDistributionTask);

        return new StatsDto(
            TopCities: topCitiesTask.Result.ToList(),
            RecentSearches: recentSearchesTask.Result.ToList(),
            ConditionDistribution: conditionDistributionTask.Result.ToList()
        );
    }
}
