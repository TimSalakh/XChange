using API.BLL.Services.Implementations;
using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Web.Controllers;

[ApiController]
[Route("api/user-service")]
public class UserController : Controller
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [Authorize]
    [HttpGet("user-exist/user-email={email}")]
    public async Task<IActionResult> DoesUserExist([FromRoute] string email)
    {
        var result = await _userService.DoesUserExistAsync(email);
        return result ? Ok() : BadRequest();
    }

    [Authorize]
    [HttpGet("user-data/user-id={id:guid}")]
    public async Task<IActionResult> LoadUserData([FromRoute] Guid id)
    {
        var user = await _userService.LoadUserData(id);
        return Ok(user);
    }
}
