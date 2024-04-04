using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Services.Interfaces;

public interface IUserService
{
    Task<string> RegisterAsync(RegisterUserDto registerUserDto);
    Task<string> LoginAsync(LoginUserDto loginUserDto);
    Task EditAsync(Guid id, EditUserDto editUserDto);
    Task RemoveAsync(Guid id);
}
