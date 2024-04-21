using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using API.BLL.DTOs.SpamSTOs;

namespace Web.API.Web.Controllers;

[Authorize]
[ApiController]
[Route("api/mail")]
public class MailController : Controller
{
    private readonly IMailService _mailService;

    public MailController(IMailService letterService)
    {
        _mailService = letterService;
    }

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

    [HttpGet("user-id/{uid:guid}/inbox")]
    public async Task<IActionResult> LoadInbox([FromRoute] Guid uid)
    {
        var inbox = await _mailService.LoadInboxAsync(uid);
        return Ok(inbox);
    }

    [HttpGet("user-id/{uid:guid}/sent")]
    public async Task<IActionResult> LoadSent([FromRoute] Guid uid)
    {
        var sent = await _mailService.LoadSentAsync(uid);
        return Ok(sent);
    }

    [HttpGet("user-id/{uid:guid}/spam")]
    public async Task<IActionResult> LoadSpam([FromRoute] Guid uid)
    {
        var spam = await _mailService.LoadSpamAsync(uid);
        return Ok(spam);
    }

    [HttpGet("user-id/{uid:guid}/bin")]
    public async Task<IActionResult> LoadBin([FromRoute] Guid uid)
    {
        var bin = await _mailService.LoadBinAsync(uid);
        return Ok(bin);
    }

    [HttpGet("letter/{lid:guid}")]
    public async Task<IActionResult> LoadLetter([FromRoute] Guid lid)
    {
        var letter = await _mailService.LoadLetterAsync(lid);
        return Ok(letter);
    }

    [HttpPut("letter/{lid:guid}/change-is-read")]
    public async Task<IActionResult> ChangeIsReadStatus([FromRoute] Guid lid)
    {
        await _mailService.ChangeIsReadAsync(lid);
        return Ok();
    }

    [HttpPut("letter/{lid:guid}/change-is-deleted-by-receiver")]
    public async Task<IActionResult> ChangeIsDeletedByReceiverStatus([FromRoute] Guid lid)
    {
        await _mailService.ChangeIsDeletedByReceiverAsync(lid);
        return Ok();
    }

    [HttpPut("letter/{lid:guid}/change-is-deleted-by-sender")]
    public async Task<IActionResult> ChangeIsDeletedBySenderStatus([FromRoute] Guid lid)
    {
        await _mailService.ChangeIsDeletedBySenderAsync(lid);
        return Ok();
    }

    [HttpPost("add-to-spam")]
    public async Task<IActionResult> AddToSpam([FromBody] SpamDto spamDto)
    {
        await _mailService.AddToSpamAsync(spamDto);
        return Ok();
    }

    [HttpPost("remove-from-spam")]
    public async Task<IActionResult> RemoveFromSpam([FromBody] SpamDto spamDto)
    {
        await _mailService.RemoveFromSpamAsync(spamDto);
        return Ok();
    }
}
