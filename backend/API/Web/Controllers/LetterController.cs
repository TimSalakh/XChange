using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Services.Interfaces;

namespace Web.API.Web.Controllers;

[ApiController]
[Route("api/xchangemail")]
public class LetterController : Controller
{
    private readonly ILetterService _letterService;

    public LetterController(ILetterService letterService)
    {
        _letterService = letterService;
    }

    [HttpPost("compose")]
    public async Task<IActionResult> Compose([FromBody] ComposeLetterDto composeLetterDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _letterService.ComposeAsync(composeLetterDto);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok("Letter sent.");
    }

    [HttpGet("{uid:guid}/received")]
    public async Task<IActionResult> LoadReceived(Guid uid)
    {
        var result = await _letterService.LoadReceivedAsync(uid);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok(result.Item1);
    }

    [HttpGet("{uid:guid}/sent")]
    public async Task<IActionResult> LoadSent(Guid uid)
    {
        var result = await _letterService.LoadSentAsync(uid);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok(result.Item1);
    }
}
