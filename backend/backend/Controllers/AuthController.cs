using backend.DTOs.Auth;
using backend.Services.Auth;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<ActionResult<AuthResponseDto>> Register(RegisterDto dto)
    {
        var result = await _authService.RegisterAsync(dto);

        if (result == null)
            return Conflict(new { message = "Korisnik s tim emailom već postoji." });

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponseDto>> Login(LoginDto dto)
    {
        var result = await _authService.LoginAsync(dto);

        if (result == null)
            return Unauthorized(new { message = "Pogrešan email ili lozinka." });

        return Ok(result);
    }
}
