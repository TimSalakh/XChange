using XChange.BLL.DTOs.LetterDTOs;

namespace XChange.BLL.Interfaces;

public interface ILetterService
{
    Task<(bool, string)> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<(IEnumerable<DisplayLetterDto>, string)> LoadReceivedAsync(Guid userId);
    Task<(IEnumerable<DisplayLetterDto>, string)> LoadSentAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> GetAllAsync(); // FOR ADMIN USAGE ONLY
}
