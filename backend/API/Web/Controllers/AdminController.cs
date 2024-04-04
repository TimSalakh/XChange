using API.BLL.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Web.API.Web.Controllers;

[ApiController]
[Route("adminpanel")]
public class AdminController : Controller
{
    private readonly IAdminService _adminService;

    public AdminController(IAdminService adminService)
    {
        _adminService = adminService;
    }

    [HttpGet("totalusers")] // add admins's id into the route
    public async Task<IActionResult> GetAllUsers()
    {
        return Ok(await _adminService.GetAllUsersAsync());
    }

    [HttpDelete("deleteuser/{uid:guid}")]
    public async Task<IActionResult> DeleteUser([FromRoute] Guid uid)
    {
        var result = await _adminService.DeleteUserAsync(uid);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok("User successfully deleted.");
    }

    [HttpGet("totalletters")] // add admins's id into the route
    public async Task<IActionResult> GetAllLetters()
    {
        return Ok(await _adminService.GetAllLettersAsync());
    }

    [HttpDelete("deleteletter/{lid:guid}")]
    public async Task<IActionResult> DeleteLetter([FromRoute] Guid lid)
    {
        var result = await _adminService.DeleteLetterAsync(lid);

        if (!string.IsNullOrEmpty(result.Item2))
            return BadRequest(result.Item2);

        return Ok("Letter successfully deleted.");
    }
}
