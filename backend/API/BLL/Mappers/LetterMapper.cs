using API.DAL.Entites;
using API.BLL.DTOs.LetterDTOs;

namespace API.BLL.Mappers;

public static class LetterMapper
{
    public static Letter ToLetterTable(this ComposeLetterDto composeLetterDto)
    {
        return new Letter
        {
            SenderId = composeLetterDto.Sender,
            ReceiverId = composeLetterDto.Receiver,
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
            Sender = $"{letter.Sender!.Name} {letter.Sender.Surname}",
            Receiver = $"{letter.Receiver!.Name} {letter.Receiver.Surname}",
            Date = letter.Date,
            Subject = letter.Subject,
            Body = letter.Body
        };
    }
}
