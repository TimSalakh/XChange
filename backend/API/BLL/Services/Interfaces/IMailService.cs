using API.BLL.DTOs.LetterDTOs;

namespace API.BLL.Services.Interfaces;

public interface IMailService
{
    Task<string> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<IEnumerable<DisplayLetterDto>> LoadReceivedAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(Guid userId);
    Task<DisplayLetterDto> LoadLetter(Guid letterId);
}
