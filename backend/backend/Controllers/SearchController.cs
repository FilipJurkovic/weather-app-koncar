using System.Security.Claims;
using backend.DTOs.Search;
using backend.Services.Search;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("api/search")]
[Authorize]
public class SearchController : ControllerBase
{
    private readonly ISearchService _searchService;

    public SearchController(ISearchService searchService)
    {
        _searchService = searchService;
    }

    private int GetUserId() =>
        int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
    
    [HttpGet("history")]
    public async Task<ActionResult<List<SearchHistoryDto>>> GetHistory()
    {
        var history = await _searchService.GetHistoryAsync(GetUserId());
        return Ok(history);
    }
}
