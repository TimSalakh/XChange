using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Services.Interfaces;

public interface IUserService
{
    public Task<bool> DoesUserExistAsync(string email);
    Task<DisplayUserDto> LoadUserData(Guid id);
}
