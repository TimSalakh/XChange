using BLL.DTOs;
using System.ComponentModel.DataAnnotations;

namespace BLL.Interfaces;

public interface IUserService
{
    Task<Guid> RegisterAsync(UserRegisterDto userRegisterDto);
    Task<Guid> LoginAsync(UserLoginDto userLoginDto);
    Task<bool> EditAsync(UserEditDto userEditDto);
    Task<bool> DeleteAsync(Guid id);
}
