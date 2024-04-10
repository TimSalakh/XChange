using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Services.Interfaces;

public interface IAuthService
{
    Task<ResponseUserDto?> RegisterAsync(RegisterUserDto registerUserDto);
    Task<ResponseUserDto?> LoginAsync(LoginUserDto loginUserDto);
}
