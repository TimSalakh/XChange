using API.DAL.Entites;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using API.BLL.DTOs.UserDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;

namespace API.BLL.Services.Implementations;

public class AccountService : IAccountService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly ITokenService _tokenService;

    public AccountService(
        UserManager<User> userManager,
        SignInManager<User> signInManager,
        ITokenService tokenService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _tokenService = tokenService;
    }

    public async Task<ToStoreDto?> RegisterAsync(RegisterUserDto registerUserDto)
    {
        registerUserDto.Email += $"@xchange.ru";
        var userToRegister = registerUserDto.ToUserTable();
        var result = await _userManager
            .CreateAsync(userToRegister, registerUserDto.Password);

        if (!result.Succeeded)
            return default;

        var user = await _userManager.FindByEmailAsync(registerUserDto.Email);
        var token = _tokenService.CreateToken(userToRegister.Email!);

        return new ToStoreDto
        {
            Token = token, 
            Id = user!.Id, 
            Email = user.Email!
        };
    }

    public async Task<ToStoreDto?> LoginAsync(LoginUserDto loginUserDto)
    {
        var targetUser = await _userManager.Users
           .FirstOrDefaultAsync(u => u.Email == loginUserDto.Email);
        if (targetUser == null)
            return default;

        var result = await _signInManager
            .CheckPasswordSignInAsync(targetUser, loginUserDto.Password, false);
        if (!result.Succeeded)
            return default;

        var user = await _userManager.FindByEmailAsync(loginUserDto.Email);
        var token = _tokenService.CreateToken(targetUser.Email!);

        return new ToStoreDto
        { 
            Token = token, 
            Id = targetUser!.Id, 
            Email = targetUser.Email!
        };
    }

    public async Task<bool> DoesAccountExistAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user != null;
    }

    public async Task<DataDto?> LoadAccountData(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        return user?.ToDataDto();
    }
}
