using XChange.BLL.DTOs.UserDTOs;

namespace BLL.Interfaces;

public interface IUserService
{
    Task<(Guid, string)> RegisterAsync(RegisterUserDto registerUserDto);
    Task<(Guid, string)> LoginAsync(LoginUserDto loginUserDto);
    Task<(bool, string)> EditAsync(Guid id, EditUserDto editUserDto);
    Task<(bool, string)> RemoveAsync(Guid id);
    Task<IEnumerable<DisplayUserDto>> GetAllAsync(); // FOR ADMIN USAGE ONLY
}
