using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Services.Interfaces;

public interface IAccountService
{
    Task<ToStoreDto?> RegisterAsync(RegisterUserDto registerUserDto);
    Task<ToStoreDto?> LoginAsync(LoginUserDto loginUserDto);
    Task<bool> DoesAccountExistAsync(string email);
    Task<DataDto?> LoadAccountData(Guid id);
}
