using backend.DTOs.Search;
using backend.DTOs.Statistics;
using backend.Models;

namespace backend.Repositories.Search;

public interface ISearchRepository
{
    Task SaveAsync(int userId, SaveSearchDto dto);
    Task<IEnumerable<SearchHistory>> GetHistoryAsync(int userId);
    Task<IEnumerable<TopCityDto>> GetTopCitiesAsync(int userId);
    Task<IEnumerable<RecentSearchDto>> GetRecentSearchesAsync(int userId);
    Task<IEnumerable<ConditionDistributionDto>> GetConditionDistributionAsync(int userId);
}