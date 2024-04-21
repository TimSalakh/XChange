namespace BLL.DTOs.UserDTOs;

public class ResponseUserDto
{
    public string Token { get; set; } = null!;
    public Guid Id { get; set; }
    public string Email { get; set; } = null!;
    public string Name { get; set; } = null!;
    public string Surname { get; set; } = null!;
    public string? Country { get; set; }
    public string? City { get; set; }
    public string? Bio { get; set; }
}
