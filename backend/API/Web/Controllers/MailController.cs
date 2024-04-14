﻿using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.LetterDTOs;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.ComponentModel.DataAnnotations;

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
    [HttpGet("{uid:guid}/inbox")]
    public async Task<IActionResult> LoadInbox([FromRoute] Guid uid)
    {
        var inbox = await _mailService.LoadInboxAsync(uid);
        return Ok(inbox);
    }

    [Authorize]
    [HttpGet("{uid:guid}/sent")]
    public async Task<IActionResult> LoadSent([FromRoute] Guid uid)
    {
        var sent = await _mailService.LoadSentAsync(uid);
        return Ok(sent);
    }

    [Authorize]
    [HttpGet("letter/{lid:guid}")]
    public async Task<IActionResult> LoadLetter([FromRoute] Guid lid)
    {
        var letter = await _mailService.LoadLetter(lid);
        return Ok(letter);
    }

    [Authorize]
    [HttpGet("user-exist/{email}")]
    public async Task<IActionResult> DoesUserExist([FromRoute] string email)
    {
        var result = await _mailService.DoesUserExistAsync(email);
        return result ? Ok() : BadRequest();
    }

    [Authorize]
    [HttpGet("user-data/{email}")]
    public async Task<IActionResult> LoadUserData([FromRoute] string email)
    {
        var user = await _mailService.LoadUserData(email);
        return Ok(user);
    }
}
