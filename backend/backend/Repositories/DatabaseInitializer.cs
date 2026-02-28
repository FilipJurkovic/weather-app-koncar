using Dapper;

namespace backend.Repositories;

public class DatabaseInitializer
{
    private readonly DbConnectionFactory _connectionFactory;

    public DatabaseInitializer(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task InitializeAsync()
    {
        var sql = await File.ReadAllTextAsync(
            Path.Combine(AppContext.BaseDirectory, "init.sql")
        );

        using var connection = _connectionFactory.Create();
        await connection.ExecuteAsync(sql);
    }
}
