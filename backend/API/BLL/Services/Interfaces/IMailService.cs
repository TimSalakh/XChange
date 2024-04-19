﻿using API.BLL.DTOs.LetterDTOs;

namespace API.BLL.Services.Interfaces;

public interface IMailService
{
    Task<string> ComposeAsync(ComposeLetterDto composeLetterDto);
    Task<IEnumerable<DisplayLetterDto>> LoadInboxAsync(Guid userId);
    Task<IEnumerable<DisplayLetterDto>> LoadSentAsync(Guid userId);
    Task<DisplayLetterDto> LoadLetterAsync(Guid letterId);
    Task ChangeIsReadAsync(Guid letterId);
    Task ChangeIsDeletedByReceiverAsync(Guid letterId);
    Task ChangeIsDeletedBySenderAsync(Guid letterId);
}
