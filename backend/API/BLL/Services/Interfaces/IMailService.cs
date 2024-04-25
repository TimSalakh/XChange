using API.BLL.DTOs.LetterDTOs;
using API.BLL.DTOs.SpamSTOs;
using API.BLL.Helpers;

namespace API.BLL.Services.Interfaces;

public interface IMailService
{
    Task<string> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<IEnumerable<DisplayLetterDto>> LoadInboxAsync(CacheKey cacheKey);
    Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(CacheKey cacheKey);
    Task<IEnumerable<DisplayLetterDto>> LoadBinAsync(CacheKey cacheKey);
    Task<IEnumerable<DisplayLetterDto>> LoadSpamAsync(CacheKey cacheKey);
    Task<DisplayLetterDto> LoadLetterAsync(Guid letterId);
    Task ChangeIsReadAsync(Guid letterId);
    Task ChangeIsDeletedByReceiverAsync(Guid letterId);
    Task ChangeIsDeletedBySenderAsync(Guid letterId);
    Task AddToSpamAsync(SpamDto spamDto);
    Task RemoveFromSpamAsync(SpamDto spamDto);
}
