using API.BLL.DTOs.LetterDTOs;
using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Services.Interfaces;

public interface IMailService
{
    Task<string> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<IEnumerable<DisplayLetterDto>> LoadInboxAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(Guid userId);
    Task<DisplayLetterDto> LoadLetter(Guid letterId);
    Task<bool> DoesUserExistAsync(string email);  
    Task<DisplayUserDto> LoadUserData(string email);
}
