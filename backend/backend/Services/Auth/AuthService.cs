using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.DTOs.Auth;
using backend.Models;
using Microsoft.IdentityModel.Tokens;

namespace backend.Services.Auth;

public class AuthService : IAuthService
{
    private readonly IAuthRepository _authRepository;
    private readonly IConfiguration _config;

    public AuthService(IAuthRepository authRepository, IConfiguration config)
    {
        _authRepository = authRepository;
        _config = config;
    }

    public async Task<AuthResponseDto?> RegisterAsync(RegisterDto dto)
    {
        // Provjeri postoji li korisnik s tim emailom
        var existing = await _authRepository.GetByEmailAsync(dto.Email);
        if (existing != null)
            return null;

        // Hashiraj lozinku - nikad ne čuvamo plain text
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password);

        // Spremi korisnika u bazu
        var user = await _authRepository.CreateAsync(dto.Username, dto.Email, passwordHash);

        return new AuthResponseDto(GenerateToken(user), user.Username, user.Email);
    }

    public async Task<AuthResponseDto?> LoginAsync(LoginDto dto)
    {
        // Pronađi korisnika po emailu
        var user = await _authRepository.GetByEmailAsync(dto.Email);

        // Provjeri postoji li korisnik i je li lozinka ispravna
        if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            return null;

        return new AuthResponseDto(GenerateToken(user), user.Username, user.Email);
    }

    private string GenerateToken(User user)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Secret"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Username)
        };

        var token = new JwtSecurityToken(
            issuer: _config["Jwt:Issuer"],
            audience: _config["Jwt:Audience"],
            claims: claims,
            expires: DateTime.UtcNow.AddDays(7),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}