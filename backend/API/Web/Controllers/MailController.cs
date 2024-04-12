using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Web.API.Web.Controllers;

[ApiController]
[Route("api/xchangemail")]
public class MailController : Controller
{
    private readonly IMailService _mailService;

    public MailController(IMailService letterService)
    {
        _mailService = letterService;
    }

    [Authorize]
    [HttpPost("compose")]
    public async Task<IActionResult> Compose([FromBody] ComposeLetterDto composeLetterDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _mailService.ComposeAsync(composeLetterDto);

        if (!string.IsNullOrEmpty(result))
            return BadRequest(result);

        return Ok("Letter sent.");
    }

    [Authorize]
    [HttpGet("{uid:guid}/received")]
    public async Task<IActionResult> LoadReceived(Guid uid)
    {
        var received = await _mailService.LoadReceivedAsync(uid);
        return Ok(received);
    }

    [Authorize]
    [HttpGet("{uid:guid}/sent")]
    public async Task<IActionResult> LoadSent(Guid uid)
    {
        var sent = await _mailService.LoadSentAsync(uid);
        return Ok(sent);
    }

    [Authorize]
    [HttpGet("letter/{lid:guid}")]
    public async Task<IActionResult> LoadLetter(Guid lid)
    {
        var letter = await _mailService.LoadLetter(lid);
        return Ok(letter);
    }
}
