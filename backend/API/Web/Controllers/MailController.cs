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
    [HttpGet("uid={uid:guid}/inbox")]
    public async Task<IActionResult> LoadInbox([FromRoute] Guid uid)
    {
        var inbox = await _mailService.LoadInboxAsync(uid);
        return Ok(inbox);
    }

    [Authorize]
    [HttpGet("uid={uid:guid}/sent")]
    public async Task<IActionResult> LoadSent([FromRoute] Guid uid)
    {
        var sent = await _mailService.LoadSentAsync(uid);
        return Ok(sent);
    }

    [Authorize]
    [HttpGet("letter={lid:guid}")]
    public async Task<IActionResult> LoadLetter([FromRoute] Guid lid)
    {
        var letter = await _mailService.LoadLetter(lid);
        return Ok(letter);
    }
}
