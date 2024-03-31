using BLL.DTOs;
using BLL.Interfaces;
using DAL.Models;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace BLL.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;

    public UserService(
        UserManager<User> userManager, 
        SignInManager<User> signInManager)
    {
        _userManager = userManager;
        _signInManager = signInManager;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        if (user == null)
            return false;
        await _userManager.DeleteAsync(user);
        return true;
    }

    public Task EditAsync(UserEditDto userEditDto)
    {
        throw new NotImplementedException();
    }

    public Task LoginAsync(UserLoginDto userLoginDto)
    {
        throw new NotImplementedException();
    }

    public Task RegisterAsync(UserRegisterDto userRegisterDto)
    {
        throw new NotImplementedException();
    }
}
