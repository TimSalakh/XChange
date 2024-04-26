using API.BLL.DTOs.LetterDTOs;
using API.BLL.DTOs.SpamSTOs;

namespace API.BLL.Services.Interfaces;

public interface IMailService
{
    Task<string> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<IEnumerable<DisplayLetterDto>> LoadInboxAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> LoadBinAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> LoadSpamAsync(Guid userId);
    Task<DisplayLetterDto> LoadLetterAsync(Guid letterId);
    Task ChangeIsReadAsync(Guid letterId);
    Task ChangeIsDeletedByReceiverAsync(Guid letterId);
    Task ChangeIsDeletedBySenderAsync(Guid letterId);
    Task AddToSpamAsync(SpamDto spamDto);
    Task RemoveFromSpamAsync(SpamDto spamDto);
}
