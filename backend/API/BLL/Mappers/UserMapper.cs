using API.DAL.Entites;
using API.BLL.DTOs.UserDTOs;

namespace API.BLL.Mappers;

public static class UserMapper
{
    public static User ToUserTable(this RegisterUserDto registerUserDto)
    {
        return new User
        {
            Name = registerUserDto.Name,
            Surname = registerUserDto.Surname,
            Email = registerUserDto.Email,
            CreationDate = DateTime.UtcNow.AddHours(7), 
            UserName = registerUserDto.Email 
        };
    }

    public static DisplayUserDto ToDisplayUserDto(this User user)
    {
        return new DisplayUserDto
        {
            Id = user.Id,
            Name = user.Name,
            Surname = user.Surname,
            Email = user.Email!,
            Country = user.Country,
            City = user.City,
            Bio = user.Bio
        };
    }
}
