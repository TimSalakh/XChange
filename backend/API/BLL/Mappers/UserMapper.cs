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
            Age = registerUserDto.Age,
            Email = registerUserDto.Email,
            CreationDate = DateTime.UtcNow.AddHours(7), // GMT + 7
            UserName = registerUserDto.Email // dummy 
        };
    }

    public static DisplayUserDto ToDisplayUserDto(this User user)
    {
        return new DisplayUserDto
        {
            Id = user.Id,
            FullName = $"{user.Name} {user.Surname}",
            Age = user.Age,
            Email = user.Email!,
            Country = string.IsNullOrEmpty(user.Country) ? "NONE" : user.Country,
            City = string.IsNullOrEmpty(user.City) ? "NONE" : user.City,
            Bio = string.IsNullOrEmpty(user.Bio) ? "NONE" : user.Bio,
            CreationDate = user.CreationDate 
        };
    }
}
