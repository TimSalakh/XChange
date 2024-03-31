using API.DTOs;
using BLL.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/user")]
[ApiController]
public class UserController : Controller
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterDto userRegisterDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        //lalala
        return Ok("lalala");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserLoginDto userLoginDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        //lalala
        return Ok("lalala");
    }

    [HttpPost("{id:guid}/edit")]
    public async Task<IActionResult> Edit(Guid id, [FromBody] UserEditDto userEditDto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        //lalala
        return Ok("lalala");
    }
}
