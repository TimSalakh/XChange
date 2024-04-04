using API.BLL.DTOs.LetterDTOs;

namespace API.BLL.Services.Interfaces;

public interface ILetterService
{
    Task<(bool, string)> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<(IEnumerable<DisplayLetterDto>, string)> LoadReceivedAsync(Guid userId);
    Task<(IEnumerable<DisplayLetterDto>, string)> LoadSentAsync(Guid userId);
}
