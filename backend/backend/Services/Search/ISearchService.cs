using backend.DTOs.Search;
using backend.DTOs.Statistics;

namespace backend.Services.Search;

public interface ISearchService
{
    Task SaveSearchAsync(int userId, SaveSearchDto dto);
    Task<List<SearchHistoryDto>> GetHistoryAsync(int userId);
    Task<StatsDto> GetStatsAsync(int userId); 
}