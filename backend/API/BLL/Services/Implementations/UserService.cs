using API.DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.BLL.DTOs.UserDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;

namespace API.BLL.Services.Implementations;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ITokenService _tokenService;

    public UserService(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    public async Task<string> RegisterAsync(RegisterUserDto userRegisterDto)
    {
        var userToRegister = userRegisterDto.ToUserTable();
        var result = await _userManager
            .CreateAsync(userToRegister, userRegisterDto.Password);

        if (!result.Succeeded)
            return string.Empty;

        return _tokenService.GetToken(userToRegister.Email!);
    }

    public async Task<string> LoginAsync(LoginUserDto userLoginDto)
    {
        var targetUser = await _userManager.Users
           .FirstOrDefaultAsync(u => u.Email == userLoginDto.Email);
        if (targetUser == null)
            return string.Empty;

        var result = await _signInManager
            .CheckPasswordSignInAsync(targetUser, userLoginDto.Password, false);
        if (!result.Succeeded)
            return string.Empty;

        return _tokenService.GetToken(targetUser.Email!);
    }

    public async Task EditAsync(Guid id, EditUserDto userEditDto)
    {
        var targetUser = await _userManager.FindByIdAsync(id.ToString());
        await _userManager.UpdateAsync(userEditDto.ToUserTable(targetUser!));
    }

    public async Task RemoveAsync(Guid id)
    {
        var targetUser = await _userManager.FindByIdAsync(id.ToString());
        await _userManager.DeleteAsync(targetUser!);
    }
}
