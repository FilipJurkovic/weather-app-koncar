using backend.DTOs.Auth;
using backend.Models;
using backend.Repositories;
using Dapper;

namespace backend.Services.Auth;

public class AuthRepository : IAuthRepository
{
    private readonly DbConnectionFactory _connectionFactory;

    public AuthRepository(DbConnectionFactory connectionFactory)
    {
        _connectionFactory = connectionFactory;
    }

    public async Task<User?> GetByEmailAsync(string email)
    {
        using var connection = _connectionFactory.Create();

        return await connection.QueryFirstOrDefaultAsync<User>(
            "SELECT * FROM users WHERE email = @Email",
            new { Email = email }
        );
    }

    public async Task<User> CreateAsync(string username, string email, string passwordHash)
    {
        using var connection = _connectionFactory.Create();

        return await connection.QuerySingleAsync<User>(
            """
            INSERT INTO users (username, email, password_hash)
            VALUES (@Username, @Email, @PasswordHash)
            RETURNING *
            """,
            new { Username = username, Email = email, PasswordHash = passwordHash }
        );
    }
}
