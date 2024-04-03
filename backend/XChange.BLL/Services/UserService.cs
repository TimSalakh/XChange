using BLL.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using XChange.BLL.DTOs.UserDTOs;
using XChange.BLL.Mappers;
using XChange.DAL.Repositories.Interfaces;

namespace BLL.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IUserRepository _userRepository;

    public UserService(
        UserManager<User> userManager, 
        SignInManager<User> signInManager,
        IUserRepository userRepository)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _userRepository = userRepository;
    }

    public async Task<(Guid, string)> RegisterAsync(RegisterUserDto userRegisterDto)
    {
        var userToRegister = userRegisterDto.ToUserTable();
        var result = await _userManager
            .CreateAsync(userToRegister, userRegisterDto.Password);

        if (!result.Succeeded)
            return (Guid.Empty, "Invalid values.");

        var user = await _userManager.FindByEmailAsync(userRegisterDto.Email);
        return (user!.Id, string.Empty);
    }

    public async Task<(Guid, string)> LoginAsync(LoginUserDto userLoginDto)
    {
        var targetUser = await _userManager.Users
            .FirstOrDefaultAsync(u => u.Email == userLoginDto.Email);
        if (targetUser == null) 
            return (Guid.Empty, "Invalid email/password.");

        var result = await _signInManager
            .CheckPasswordSignInAsync(targetUser, userLoginDto.Password, false);
        if (!result.Succeeded) 
            return (Guid.Empty, "Invalid email/password.");

        return (targetUser.Id, string.Empty);
    }

    public async Task<(bool, string)> EditAsync(Guid id, EditUserDto userEditDto)
    {
        var targetUser = await _userManager.FindByIdAsync(id.ToString());
        if (targetUser == null)
            return (false, "Invalid user id.");

        await _userManager.UpdateAsync(userEditDto.ToUserTable(targetUser));
        return (true, string.Empty);
    }

    public async Task<(bool, string)> RemoveAsync(Guid id)
    {
        var targetUser = await _userManager.FindByIdAsync(id.ToString());
        if (targetUser == null)
            return (false, "Invalid user id.");
        
        await _userManager.DeleteAsync(targetUser);
        return (true, string.Empty);
    }

    public async Task<IEnumerable<DisplayUserDto>> GetAllAsync()
    {
        var totalUsers = await _userRepository.GetAllAsync();
        return totalUsers.Select(u => u.ToDisplayUserDto());
    }
}
