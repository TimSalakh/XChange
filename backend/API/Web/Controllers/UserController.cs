using Microsoft.AspNetCore.Mvc;
using API.BLL.DTOs.UserDTOs;
using Microsoft.AspNetCore.Authorization;
using API.BLL.Services.Interfaces;

namespace Web.API.Web.Controllers;

[Route("api/user")]
[ApiController]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto registerUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.RegisterAsync(registerUserDto);

        if (string.IsNullOrEmpty(result))
            return BadRequest("Server error.");

        return Ok(result);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.LoginAsync(loginUserDto);

        if (string.IsNullOrEmpty(result))
            return Unauthorized("Invalid email/password.");

        return Ok(result);
    }

    [Authorize]
    [HttpPost("{id:guid}/edit")]
    public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] EditUserDto editUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        await _userService.EditAsync(id, editUserDto);
        return Ok("User successfully updated.");
    }

    [Authorize]
    [HttpDelete("{id:guid}/delete")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        await _userService.RemoveAsync(id);
        return Ok("User successfully deleted.");
    }
}
