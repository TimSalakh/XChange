using API.BLL.DTOs.LetterDTOs;
using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Services.Interfaces;

public interface IAdminService
{
    Task<IEnumerable<DisplayUserDto>> GetAllUsersAsync();
    Task<(bool, string)> DeleteUserAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> GetAllLettersAsync();
    Task<(bool, string)> DeleteLetterAsync(Guid letterId);
}
