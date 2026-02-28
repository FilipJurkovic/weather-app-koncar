using System.Security.Claims;
using backend.DTOs.Statistics;
using backend.Services.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/stats")]
[Authorize]
public class StatsController : ControllerBase
{
    private readonly ISearchService _searchService;

    public StatsController(ISearchService searchService)
    {
        _searchService = searchService;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

    [HttpGet]
    public async Task<ActionResult<StatsDto>> GetStats()
    {
        var stats = await _searchService.GetStatsAsync(GetUserId());
        return Ok(stats);
    }
}
