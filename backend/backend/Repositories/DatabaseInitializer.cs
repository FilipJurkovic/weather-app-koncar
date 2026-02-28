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
        // Pročitaj init.sql skriptu
        var sql = await File.ReadAllTextAsync("Repositories/init.sql");

        // Otvori konekciju i izvrši skriptu
        using var connection = _connectionFactory.Create();
        await connection.ExecuteAsync(sql);
    }
}
