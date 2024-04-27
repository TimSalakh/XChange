using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.UserDTOs;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;

namespace Web.API.Web.Controllers;

[Route("api/account")]
[ApiController]
public class AccountController : Controller
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _accountService.RegisterAsync(registerUserDto);
        return result != null ? Ok(result) : BadRequest("User with this data already exists.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _accountService.LoginAsync(loginUserDto);
        return result != null ? Ok(result) : Unauthorized("Invalid email/password.");
    }

    [Authorize]
    [HttpGet("{email}/account-exist")]
    public async Task<IActionResult> DoesUserExist(string email)
    {
        var result = await _accountService.DoesAccountExistAsync(email);
        return result ? Ok() : NotFound();
    }

    [Authorize]
    [HttpGet("{id:guid}/data")]
    public async Task<IActionResult> LoadUserData(Guid id)
    {
        var user = await _accountService.LoadAccountData(id);
        return user == null ? NotFound() : Ok(user);
    }
}
