using BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;
using XChange.BLL.DTOs.UserDTOs;

namespace API.Controllers;

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

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);
        
        return Ok(result.Item1);
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserDto loginUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.LoginAsync(loginUserDto);

        if (!string.IsNullOrEmpty(result.Item2))
            return Unauthorized(result.Item2);

        return Ok(result.Item1);
    }

    [HttpPost("{id:guid}/edit")]
    public async Task<IActionResult> Edit([FromRoute] Guid id, [FromBody] EditUserDto editUserDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var result = await _userService.EditAsync(id, editUserDto);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok("User successfully updated.");
    }

    [HttpDelete("{id:guid}/delete")]
    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var result = await _userService.RemoveAsync(id);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok("User successfully deleted.");
    }

    [HttpGet("totalusers")] // FOR ADMIN USAGE ONLY
    public async Task<IActionResult> GetAll()
    {
        var total = await _userService.GetAllAsync();
        return Ok(total);
    }
}
