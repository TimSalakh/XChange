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

    [HttpGet("user-id/{userId:guid}/inbox/{option}")]
    public async Task<IActionResult> LoadInbox(Guid userId, string option)
    {
        var inbox = await _mailService.LoadInboxAsync(userId, option);
        return Ok(inbox);
    }

    [HttpGet("user-id/{userId:guid}/sent/{option}")]
    public async Task<IActionResult> LoadSent(Guid userId, string option)
    {
        var sent = await _mailService.LoadSentAsync(userId, option);
        return Ok(sent);
    }

    [HttpGet("user-id/{userId:guid}/spam/{option}")]
    public async Task<IActionResult> LoadSpam(Guid userId, string option)
    {
        var spam = await _mailService.LoadSpamAsync(userId, option);
        return Ok(spam);
    }

    [HttpGet("user-id/{userId:guid}/bin/{option}")]
    public async Task<IActionResult> LoadBin(Guid userId, string option)
    {
        var bin = await _mailService.LoadBinAsync(userId, option);
        return Ok(bin);
    }

    [HttpGet("letter/{letterId:guid}")]
    public async Task<IActionResult> LoadLetter(Guid letterId)
    {
        var letter = await _mailService.LoadLetterAsync(letterId);
        return Ok(letter);
    }

    [HttpPut("letter/{letterId:guid}/change-is-read")]
    public async Task<IActionResult> ChangeIsReadStatus(Guid letterId)
    {
        await _mailService.ChangeIsReadAsync(letterId);
        return Ok();
    }

    [HttpPut("letter/{letterId:guid}/change-is-deleted-by-receiver")]
    public async Task<IActionResult> ChangeIsDeletedByReceiverStatus(Guid letterId)
    {
        await _mailService.ChangeIsDeletedByReceiverAsync(letterId);
        return Ok();
    }

    [HttpPut("letter/{letterId:guid}/change-is-deleted-by-sender")]
    public async Task<IActionResult> ChangeIsDeletedBySenderStatus(Guid letterId)
    {
        await _mailService.ChangeIsDeletedBySenderAsync(letterId);
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
