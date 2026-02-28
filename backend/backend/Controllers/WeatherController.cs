using System.Security.Claims;
using backend.DTOs.Weather;
using backend.Services.Weather;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/weather")]
[Authorize]
public class WeatherController : ControllerBase
{
    private readonly IWeatherService _weatherService;

    public WeatherController(IWeatherService weatherService)
    {
        _weatherService = weatherService;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet("current")]
    public async Task<ActionResult<CurrentWeatherDto>> GetCurrent([FromQuery] double lat, [FromQuery] double lon)
    {
        var data = await _weatherService.GetCurrentWeatherAsync(lat, lon);

        if (data == null)
            return BadRequest(new { message = "Nije moguće dohvatiti trenutno vrijeme." });

        return Ok(data);
    }

    [HttpGet("forecast")]
    public async Task<ActionResult<ForecastResponseDto>> GetForecast([FromQuery] string city)
    {
        if (string.IsNullOrWhiteSpace(city))
            return BadRequest(new { message = "Naziv grada je obavezan." });

        var data = await _weatherService.GetForecastAsync(city, GetUserId());

        if (data == null)
            return BadRequest(new { message = $"Nije moguće dohvatiti prognozu za: {city}" });

        return Ok(data);
    }
}
