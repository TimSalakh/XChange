using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using API.BLL.Services.Interfaces;

namespace Web.API.Web.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly IAuthService _userService;

    public AuthController(IAuthService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.RegisterAsync(registerUserDto);

        if (result == null)
            return BadRequest("User with this data already exists.");

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.LoginAsync(loginUserDto);

        if (result == null)
            return Unauthorized("Invalid email/password.");

        return Ok(result);
    }

    [Authorize]
    [HttpGet("secret")]
    public string Secret() => "SUCK MY LEG!";
}
