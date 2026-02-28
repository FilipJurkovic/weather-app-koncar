using backend.DTOs.Search;
using backend.DTOs.Statistics;
using backend.Models;
using Dapper;

namespace backend.Repositories.Search;

public class SearchRepository : ISearchRepository
{
    private readonly DbConnectionFactory _connectionFactory;

    public SearchRepository(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task SaveAsync(int userId, SaveSearchDto dto)
    {
        using var connection = _connectionFactory.Create();

        await connection.ExecuteAsync(
            """
            INSERT INTO search_history (user_id, city, weather_condition, temperature, period_from, period_to)
            VALUES (@UserId, @City, @WeatherCondition, @Temperature, @PeriodFrom, @PeriodTo)
            """,
            new
            {
                UserId = userId,
                dto.City,
                dto.WeatherCondition,
                dto.Temperature,
                dto.PeriodFrom,
                dto.PeriodTo
            }
        );
    }

    public async Task<IEnumerable<SearchHistory>> GetHistoryAsync(int userId)
    {
        using var connection = _connectionFactory.Create();

        return await connection.QueryAsync<SearchHistory>(
            """
            SELECT * FROM search_history
            WHERE user_id = @UserId
            ORDER BY searched_at DESC
            """,
            new { UserId = userId }
        );
    }

    public async Task<IEnumerable<TopCityDto>> GetTopCitiesAsync(int userId)
    {
        using var connection = _connectionFactory.Create();

        return await connection.QueryAsync<TopCityDto>(
            """
            SELECT city, COUNT(*) as count
            FROM search_history
            WHERE user_id = @UserId
            GROUP BY city
            ORDER BY count DESC
            LIMIT 3
            """,
            new { UserId = userId }
        );
    }

    public async Task<IEnumerable<RecentSearchDto>> GetRecentSearchesAsync(int userId)
    {
        using var connection = _connectionFactory.Create();

        return await connection.QueryAsync<RecentSearchDto>(
            """
            SELECT city, weather_condition, temperature, searched_at
            FROM search_history
            WHERE user_id = @UserId
            ORDER BY searched_at DESC
            LIMIT 3
            """,
            new { UserId = userId }
        );
    }

    public async Task<IEnumerable<ConditionDistributionDto>> GetConditionDistributionAsync(int userId)
    {
        using var connection = _connectionFactory.Create();

        return await connection.QueryAsync<ConditionDistributionDto>(
            """
            SELECT weather_condition as condition, COUNT(*) as count
            FROM search_history
            WHERE user_id = @UserId
            GROUP BY weather_condition
            ORDER BY count DESC
            """,
            new { UserId = userId }
        );
    }
}
