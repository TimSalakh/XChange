﻿using API.DAL.Entites;
using API.BLL.DTOs.LetterDTOs;

namespace API.BLL.Mappers;

public static class LetterMapper
{
    public static Letter ToLetterTable(this ComposeLetterDto composeLetterDto, Guid receiverId)
    {
        return new Letter
        {
            SenderId = composeLetterDto.SenderId,
            ReceiverId = receiverId,
            Date = DateTime.UtcNow.AddHours(7),
            Subject = composeLetterDto.Subject,
            Body = composeLetterDto.Body
        };
    }

    public static DisplayLetterDto ToDisplayLetterDto(this Letter letter)
    {
        return new DisplayLetterDto
        {
            Id = letter.Id,
            SenderId = letter.SenderId,
            Sender = letter.Sender!.Email!,
            ReceiverId = letter.ReceiverId,
            Receiver = letter.Receiver!.Email!,
            Date = letter.Date.ToString("dd.MM.yy HH:mm"),
            Subject = letter.Subject,
            Body = letter.Body,
            IsRead = letter.IsRead,
            IsDeletedByReceiver = letter.IsDeletedByReceiver,
            IsDeletedBySender = letter.IsDeletedBySender
        };
    }
}
