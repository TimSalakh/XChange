using API.BLL.DTOs.UserDTOs;
using API.BLL.Mappers;
using API.BLL.Services.Interfaces;
using API.DAL.Entites;
using API.DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace API.BLL.Services.Implementations;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;

    public UserService(UserManager<User> userManager)
    {
        _userManager = userManager;
    }

    public async Task<bool> DoesUserExistAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);
        return user != null;
    }

    public async Task<DisplayUserDto> LoadUserData(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        return user!.ToDisplayUserDto();
    }
}
