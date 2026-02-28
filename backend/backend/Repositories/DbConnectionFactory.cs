using Npgsql;

namespace backend.Repositories;

public class DbConnectionFactory
{
    private readonly string _connectionString;

    public DbConnectionFactory(IConfiguration configuration)
    {
        _connectionString = configuration.GetConnectionString("Default")!;
    }

    // Svaki servis koji treba bazu pozove ovu metodu da dobije konekciju
    public NpgsqlConnection Create()
    {
        return new NpgsqlConnection(_connectionString);
    }
}
