using backend.DTOs.Auth;
using backend.Models;

namespace backend.Services.Auth;

public interface IAuthRepository
{
    Task<User?> GetByEmailAsync(string email);
    Task<User> CreateAsync(string username, string email, string passwordHash);

}