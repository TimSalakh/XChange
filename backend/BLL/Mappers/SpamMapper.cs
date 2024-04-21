using API.BLL.DTOs.SpamSTOs;
using API.DAL.Entities;

namespace API.BLL.Mappers;

public static class SpamMapper
{
    public static Spam ToSpamTable(this SpamDto spamDto)
    {
        return new Spam 
        { 
            ReceiverId = spamDto.ReceiverId, 
            SenderId = spamDto.SenderId 
        };
    }
}
